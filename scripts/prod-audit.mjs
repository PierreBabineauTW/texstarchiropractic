import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "docs/qa/production";
const BASE = process.env.TARGET ?? "http://127.0.0.1:3112";

const ROUTES = [
  "/",
  "/services",
  "/conditions",
  "/conditions/back-pain",
  "/conditions/headaches",
  "/about",
  "/team",
  "/locations",
  "/contact",
  "/testimonials",
  "/faq",
  "/blog",
  "/blog/texstar-on-the-radio",
  "/privacy",
  "/not-a-real-page",
];

const VIEWPORTS = [
  { n: "1440x900", w: 1440, h: 900, m: false },
  { n: "1280x800", w: 1280, h: 800, m: false },
  { n: "1024x768", w: 1024, h: 768, m: false },
  { n: "768x1024", w: 768, h: 1024, m: false },
  { n: "430x932", w: 430, h: 932, m: true },
  { n: "390x844", w: 390, h: 844, m: true },
  { n: "375x812", w: 375, h: 812, m: true },
  { n: "360x800", w: 360, h: 800, m: true },
];

const pageAudit = () => {
  /*
   * The offer panel's starburst sits at `left: -7px`, so it deliberately
   * overhangs the panel. At 1024/1280 the 1220px container leaves too little
   * margin and the overhang is clipped by `overflow-x: clip` — the source site
   * behaves identically (measured left=-18 on both at 1280). Ignored so the
   * report stays honest instead of repeating a confirmed non-issue.
   *
   * Note: this function is serialised into the browser by p.evaluate(), so it
   * must not reference module-scope bindings.
   */
  const byDesign = "absolute -left-[7px]";
  const vw = window.innerWidth;
  const out = {
    overflow: [],
    headings: [],
    h1Count: document.querySelectorAll("h1").length,
    imagesMissingAlt: [],
    linkIssues: [],
    smallTargets: [],
    docH: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth - vw,
  };

  // The off-canvas side menu is parked 100% to the right by design
  // (`overflow-x: clip` on html/body keeps it out of the scroll area), so it is
  // not a layout overflow.
  const parked = document.querySelector("aside");
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) return;
    if (getComputedStyle(el).position === "fixed") return;
    if (parked && (parked === el || parked.contains(el))) return;
    // Ignore anything living inside a clipping/scrolling ancestor: a carousel
    // track is wider than the viewport on purpose, and an off-screen honeypot
    // is off-screen on purpose. Only un-clipped content can actually push the
    // document sideways.
    if (el.closest('.sr-only, [class*="9999"], [style*="-9999"]')) return;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const ox = getComputedStyle(a).overflowX;
      if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") return;
    }
    if (r.right > vw + 1 || r.left < -1) {
      if (String(el.className).includes(byDesign)) return;
      out.overflow.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 60),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  });

  out.headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    level: Number(h.tagName[1]),
    text: h.textContent.trim().replace(/\s+/g, " ").slice(0, 48),
  }));

  document.querySelectorAll("img").forEach((i) => {
    if (!i.hasAttribute("alt")) out.imagesMissingAlt.push(i.currentSrc.split("/").pop());
    if (i.complete && i.naturalWidth === 0 && i.currentSrc) {
      out.imagesMissingAlt.push("BROKEN:" + i.currentSrc.split("/").pop());
    }
  });

  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") ?? "";
    if (href === "#" || href === "" || href.startsWith("javascript:")) {
      out.linkIssues.push(`placeholder:${a.textContent.trim().slice(0, 24) || href}`);
    }
    if (/localhost|127\.0\.0\.1|texstarchiropractic\.com/.test(href) && href.startsWith("/")) {
      out.linkIssues.push(`source-or-local:${href}`);
    }
    if (a.target === "_blank" && !(a.rel || "").includes("noopener")) {
      out.linkIssues.push(`missing-noopener:${href.slice(0, 40)}`);
    }
  });

  if (vw < 768) {
    document.querySelectorAll("a, button, input, textarea, select").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") return;
      if (r.height < 24 || r.width < 24) {
        out.smallTargets.push({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 22),
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
      }
    });
  }

  return out;
};

await mkdir(OUT, { recursive: true });
const b = await chromium.launch();
const report = {};
let problems = 0;

for (const vp of VIEWPORTS) {
  const ctx = await b.newContext({
    viewport: { width: vp.w, height: vp.h },
    isMobile: vp.m,
    hasTouch: vp.m,
    deviceScaleFactor: vp.m ? 2 : 1,
  });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
  p.on("console", (m) => {
    const t = m.text();
    // ignore the dev HMR socket and the 404 document request itself
    if (m.type() === "error" && !/WebSocket|hmr|status of 404/i.test(t)) {
      errs.push("console: " + t.slice(0, 160));
    }
  });
  p.on("requestfailed", (r) => errs.push("failed: " + r.url().split("/").slice(-2).join("/")));

  report[vp.n] = {};

  for (const route of ROUTES) {
    const res = await p.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 45000 });
    await p.waitForTimeout(500);
    const a = await p.evaluate(pageAudit);
    const key = route;
    report[vp.n][key] = { status: res?.status(), ...a, errors: [...errs] };
    errs.length = 0;

    const bad = [];
    if (a.overflowX > 0) bad.push(`overflowX=${a.overflowX}`);
    if (a.overflow.length) bad.push(`overflow:${a.overflow.length}`);
    if (a.h1Count !== 1) bad.push(`h1=${a.h1Count}`);
    if (a.imagesMissingAlt.length) bad.push(`alt:${a.imagesMissingAlt.length}`);
    if (a.linkIssues.length) bad.push(`links:${a.linkIssues.length}`);
    if (report[vp.n][key].errors.length) bad.push(`errors:${report[vp.n][key].errors.length}`);
    if (bad.length) {
      problems += bad.length;
      console.log(`  !! ${vp.n.padEnd(9)} ${route.padEnd(34)} ${bad.join(" ")}`);
    }
  }

  if (vp.n === "390x844" || vp.n === "1440x900") {
    for (const route of ["/", "/services", "/conditions", "/contact", "/team", "/locations"]) {
      await p.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 45000 });
      await p.waitForTimeout(700);
      const name = route.replace(/\//g, "-").replace(/^-/, "") || "home";
      await p.screenshot({ path: path.join(OUT, `${vp.n}${name}.png`), fullPage: false });
    }
  }
  await ctx.close();
}

await writeFile(path.join(OUT, "AUDIT.json"), JSON.stringify(report, null, 2));
await b.close();
console.log(`\n  routes x viewports checked: ${ROUTES.length * VIEWPORTS.length}`);
console.log(`  problems: ${problems}`);
