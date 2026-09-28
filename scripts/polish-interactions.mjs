import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const URL = process.env.TARGET ?? "http://127.0.0.1:3112/";
const BASE = new globalThis.URL(URL).origin;
const OUT = "docs/qa/polish";
await mkdir(OUT, { recursive: true });

const b = await chromium.launch();
const results = [];

// ---------- desktop interactions ----------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 150)));
  p.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 150)); });
  p.on("requestfailed", (r) => errs.push("failed: " + r.url().split("/").slice(-2).join("/")));
  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2500);

  // header scroll swap
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(300);
  const h0 = await p.evaluate(() => { const h = document.querySelector("header"); return { pos: getComputedStyle(h).position, h: Math.round(h.getBoundingClientRect().height) }; });
  await p.evaluate(() => scrollTo(0, 400));
  await p.waitForTimeout(600);
  const h1 = await p.evaluate(() => { const h = document.querySelector("header"); return { pos: getComputedStyle(h).position, h: Math.round(h.getBoundingClientRect().height) }; });
  results.push(["header scroll swap", h0.pos === "absolute" && h0.h === 192 && h1.pos === "fixed" && h1.h === 65, `${h0.pos}/${h0.h} -> ${h1.pos}/${h1.h}`]);

  // carousel (scoped to the section: the side-menu <aside> also carries
  // `transition-transform`, so a bare class selector matches the drawer first)
  await p.locator('button[aria-label="Next reviews"]').first().scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  const trackOf = () => p.evaluate(() => {
    const sec = [...document.querySelectorAll("section")].find((s) => /Reviews and Testimonials/.test(s.textContent ?? ""));
    const t = sec?.querySelector("div.flex.items-start.gap-5");
    return t ? getComputedStyle(t).transform : "no-track";
  });
  const c0 = await trackOf();
  await p.locator('button[aria-label="Next reviews"]').first().click();
  await p.waitForTimeout(700);
  const c1 = await trackOf();
  results.push(["reviews carousel advances 304px", c0 !== c1 && c1 === "matrix(1, 0, 0, 1, -304, 0)", `${c0} -> ${c1}`]);

  // read more toggle
  const rm = p.locator("section", { hasText: "Reviews and Testimonials" }).locator("button", { hasText: /read more/i }).first();
  const t0 = (await rm.textContent())?.trim();
  await rm.click();
  await p.waitForTimeout(400);
  const t1 = (await p.locator("button", { hasText: /read (more|less)/i }).first().textContent())?.trim();
  results.push(["review read more toggle", t0 === "Read more" && t1 === "Read less", `${t0} -> ${t1}`]);

  // hover parity with the live source
  const fl = p.locator("footer a", { hasText: "Austin" }).first();
  const cA = await fl.evaluate((e) => getComputedStyle(e).color);
  await fl.hover();
  await p.waitForTimeout(350);
  const cB = await fl.evaluate((e) => getComputedStyle(e).color);
  results.push(["footer link hover -> blue", cA === "rgb(56, 47, 45)" && cB === "rgb(0, 94, 184)", `${cA} -> ${cB}`]);

  const btn = p.locator('a:has-text("Learn More")').first();
  const b0 = await btn.evaluate((e) => { const c = getComputedStyle(e); return c.backgroundColor + "|" + c.color; });
  await btn.hover();
  await p.waitForTimeout(350);
  const b1 = await btn.evaluate((e) => { const c = getComputedStyle(e); return c.backgroundColor + "|" + c.color; });
  results.push(["buttons stay flat on hover (matches source)", b0 === b1, "unchanged" ]);

// link integrity
  const hrefs = await p.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
  const local = [...new Set(hrefs.filter((h) => h && !/^https?:\/\//.test(h) && !/^tel:/.test(h) && h !== "#"))];
  // Phase 1 asserted there were no local links at all, because every link then
  // pointed at the source origin. The site now has real routes, so the invariant
  // is that each local link resolves rather than that none of them exist.
  const broken = [];
  for (const href of local) {
    const res = await p.request
      .get(new globalThis.URL(href, BASE).toString())
      .catch(() => null);
    if (!res || res.status() >= 400) {
      broken.push(`${href} (${res ? res.status() : "no response"})`);
    }
  }
  results.push([
    "every local link resolves",
    broken.length === 0,
    broken.length ? broken.join(", ") : `${local.length} local link(s), all 200`,
  ]);
  results.push(["no console/network errors", errs.length === 0, errs.length ? errs.join(" | ") : "none"]);

  await p.locator("footer").screenshot({ path: path.join(OUT, "after-footer.png"), timeout: 30000 });
  await ctx.close();
}

// ---------- mobile: menu + nav + no overflow ----------
{
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2500);

  const head = await p.evaluate(() => {
    const h = document.querySelector("header");
    const burger = h.querySelector('button[aria-label="Open menu"]').getBoundingClientRect();
    return { headerScrollW: h.scrollWidth, vw: innerWidth, burgerRight: Math.round(burger.right), clipped: burger.right > innerWidth };
  });
  results.push(["header fits at 360 (burger not clipped)", !head.clipped && head.headerScrollW <= head.vw, `headerScrollW=${head.headerScrollW} vw=${head.vw} burgerRight=${head.burgerRight}`]);

  await p.locator('button[aria-label="Open menu"]').first().click();
  await p.waitForTimeout(800);
  const open = await p.evaluate(() => { const a = document.querySelector("aside"); return { x: Math.round(a.getBoundingClientRect().x), ov: document.body.style.overflow }; });
  results.push(["side menu opens at 360", open.x === 110 && open.ov === "hidden", `x=${open.x} (360-250=110) overflow=${open.ov}`]);

  const tog = p.locator("aside button[aria-expanded]").first();
  const box = await tog.boundingBox();
  const inside = box && box.x >= 0 && box.x + box.width <= 360;
  results.push(["chevron hit area 44px and on-screen", Math.round(box.width) === 44 && inside, `${Math.round(box.width)}x${Math.round(box.height)} at x=${Math.round(box.x)}`]);

  await tog.click();
  await p.waitForTimeout(500);
  const exp = await p.locator("aside button[aria-expanded]").first().getAttribute("aria-expanded");
  results.push(["accordion expands", exp === "true", `aria-expanded=${exp}`]);
  await p.screenshot({ path: path.join(OUT, "after-sidemenu-360.png"), timeout: 30000 });

  await p.keyboard.press("Escape");
  await p.waitForTimeout(600);
  const closed = await p.evaluate(() => { const a = document.querySelector("aside"); return { x: Math.round(a.getBoundingClientRect().x), ov: document.body.style.overflow || "(unset)" }; });
  results.push(["escape closes + scroll restored", closed.x === 360 && closed.ov === "(unset)", `x=${closed.x} overflow=${closed.ov}`]);
  await ctx.close();
}

console.log("");
for (const [name, ok, detail] of results) console.log(`  ${ok ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${detail}`);
console.log(`\n  ${results.filter((r) => r[1]).length}/${results.length} passed`);
await b.close();
