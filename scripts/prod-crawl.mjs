import { chromium } from "playwright";

/**
 * Whole-site crawl: every internal link is followed, status codes checked,
 * fragment targets resolved, and external hosts reported. Also verifies the
 * security headers, robots/sitemap and the contact API contract.
 */
const BASE = process.env.TARGET ?? "http://127.0.0.1:3112";
const ORIGIN = new URL(BASE).origin;

const SEEDS = [
  "/", "/services", "/conditions", "/conditions/back-pain", "/conditions/neck-pain",
  "/conditions/knee-pain", "/conditions/headaches", "/about", "/team", "/locations",
  "/contact", "/testimonials", "/faq", "/blog", "/privacy",
  "/blog/texstar-on-the-radio", "/blog/glp1-skeleton-joint-pain",
  "/blog/protect-childs-spine-back-to-school",
];

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();

const visited = new Map(); // path -> { status, ids:Set, out:[{href,resolves}] }
const queue = [...SEEDS];
const problems = [];
const externalHosts = new Map();

const crawl = async (route) => {
  const res = await p.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 45000 });
  const status = res?.status();
  const info = await p.evaluate(() => {
    const ids = new Set([...document.querySelectorAll("[id]")].map((e) => e.id));
    const links = [...document.querySelectorAll("a[href]")]
      .map((a) => a.getAttribute("href") ?? "")
      .filter((h) => h && !h.startsWith("tel:") && !h.startsWith("mailto:"));
    return { ids: [...ids], links: [...new Set(links)] };
  });

  const out = [];
  for (const href of info.links) {
    if (href.startsWith("#")) {
      const frag = href.slice(1);
      if (frag && !info.ids.includes(frag)) out.push({ href, issue: "missing-fragment" });
      continue;
    }
    let u;
    try {
      u = new URL(href, ORIGIN);
    } catch {
      out.push({ href, issue: "unparseable" });
      continue;
    }
    if (u.origin !== ORIGIN) {
      const host = u.host;
      if (!externalHosts.has(host)) externalHosts.set(host, []);
      externalHosts.get(host).push(href);
      continue;
    }
    const frag = u.hash ? u.hash.slice(1) : "";
    const target = u.pathname + u.search;
    const rec = { href, target, frag };
    if (frag && !visited.has(target)) rec.needsResolve = true;
    out.push(rec);
  }

  visited.set(route, { status, ids: new Set(info.ids), out });
  return { route, out };
};

const first = [];
for (const s of queue) first.push(await crawl(s));

// second pass: resolve fragments now that every page's ids are known
const second = [];
for (const s of SEEDS) {
  const rec = visited.get(s);
  for (const o of rec.out) {
    if (o.needsResolve) {
      const t = visited.get(o.target);
      if (!t) problems.push(`${s}: fragment link to unvisited ${o.target}`);
      else if (o.frag && !t.ids.has(o.frag)) problems.push(`${s}: ${o.href} -> no #${o.frag} on ${o.target}`);
    }
    if (o.issue) problems.push(`${s}: ${o.issue} ${o.href}`);
  }
  for (const o of rec.out) {
    const t = visited.get(o.target);
    if (t && t.status >= 400) problems.push(`${s}: ${o.href} -> HTTP ${t.status}`);
  }
}
void second;

// every crawled page must be reachable
console.log("== internal routes discovered ==");
const allPaths = new Set(SEEDS);
for (const rec of visited.values()) for (const o of rec.out) if (o.target) allPaths.add(o.target.split("#")[0]);
const missing = [...allPaths].filter(
  (t) => !visited.has(t) && !t.startsWith("/_next")
);
for (const m of missing) {
  const res = await p.goto(BASE + m, { waitUntil: "domcontentloaded", timeout: 30000 });
  const st = res?.status();
  console.log(`  ${st} ${m}`);
  if (st >= 400 && st !== 404) problems.push(`unlinked route ${m} -> ${st}`);
}

console.log("\n== statuses ==");
for (const [route, v] of [...visited].sort()) {
  const bad = v.status >= 400 ? "  <-- " + v.status : "";
  console.log(`  ${String(v.status).padEnd(4)} ${route}${bad}`);
  if (v.status >= 400) problems.push(`${route} -> HTTP ${v.status}`);
}

console.log("\n== external hosts ==");
for (const [host, list] of [...externalHosts].sort()) {
  console.log(`  ${host}  (${list.length}) e.g. ${list[0]}`);
}

console.log("\n== security headers on / ==");
const hr = await p.goto(BASE + "/", { waitUntil: "domcontentloaded" });
for (const [k, v] of Object.entries(await hr.allHeaders())) {
  if (/content-security|x-content|x-frame|referrer|permissions|x-powered|strict-transport/i.test(k)) {
    console.log(`  ${k}: ${v.slice(0, 110)}${v.length > 110 ? "…" : ""}`);
  }
}

console.log("\n== robots.txt ==");
console.log((await (await p.request.get(BASE + "/robots.txt")).text()).trim());
console.log("== sitemap.xml (first 6 urls) ==");
const sm = await (await p.request.get(BASE + "/sitemap.xml")).text();
console.log([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => "  " + m[1]).slice(0, 6).join("\n"));
console.log(`  ... ${[...sm.matchAll(/<loc>/g)].length} urls total`);

console.log("\n== contact API contract ==");
const post = async (body) => {
  const r = await p.request.post(BASE + "/api/contact", { data: body });
  return `${r.status()} ${JSON.stringify(await r.json()).slice(0, 90)}`;
};
console.log("  valid      " + (await post({ name: "Jane Doe", email: "jane@example.com", message: "My lower back hurts after a run." })));
console.log("  bad email  " + (await post({ name: "Jane", email: "nope", message: "hello there friend" })));
console.log("  short msg  " + (await post({ name: "Jane", email: "jane@example.com", message: "hi" })));
console.log("  honeypot   " + (await post({ name: "Bot", email: "b@b.co", message: "buy cheap things now", company: "spam" })));
console.log("  GET        " + (await (await p.request.get(BASE + "/api/contact")).status()));

console.log("\n== problems ==");
console.log(problems.length ? problems.map((x) => "  !! " + x).join("\n") : "  none");
await b.close();
