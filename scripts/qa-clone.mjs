import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "docs/qa/texstarchiropractic-com-6d11e6eb/root-8a5edab2";
const CLONE = "http://127.0.0.1:3111/";

await mkdir(OUT, { recursive: true });
const b = await chromium.launch();
const report = { cloneUrl: CLONE, checks: {} };

for (const vp of [{ n: "desktop-1440", w: 1440, h: 900, m: false }, { n: "tablet-768", w: 768, h: 1024, m: false }, { n: "mobile-390", w: 390, h: 844, m: true }]) {
  const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.m, hasTouch: vp.m, deviceScaleFactor: vp.m ? 2 : 1 });
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
  p.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 160)));
  await p.goto(CLONE, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2500);
  // lazy-load by stepping down once
  await p.evaluate(async () => { const s = innerHeight; for (let y = 0; y < 12000; y += s) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(1500);
  await p.screenshot({ path: path.join(OUT, `${vp.n}-full.png`), fullPage: true, timeout: 60000 });
  await p.screenshot({ path: path.join(OUT, `${vp.n}-fold.png`), timeout: 30000 });
  report.checks[vp.n] = { errors: errs };

  // scrolled header
  await p.evaluate(() => scrollTo(0, 400));
  await p.waitForTimeout(700);
  await p.screenshot({ path: path.join(OUT, `${vp.n}-scrolled.png`), timeout: 30000 });
  report.checks[vp.n].scrolledHeader = await p.evaluate(() => {
    const h = document.querySelector("header");
    const cs = getComputedStyle(h);
    return { pos: cs.position, h: Math.round(h.getBoundingClientRect().height) };
  });

  // side menu
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(400);
  const burger = p.locator('button[aria-label="Open menu"]');
  report.checks[vp.n].hasBurger = (await burger.count()) > 0;
  if (report.checks[vp.n].hasBurger) {
    await burger.first().click({ timeout: 8000 });
    await p.waitForTimeout(900);
    await p.screenshot({ path: path.join(OUT, `${vp.n}-menu-open.png`), timeout: 30000 });
    report.checks[vp.n].menuOpen = await p.evaluate(() => {
      const a = document.querySelector("aside");
      if (!a) return null;
      const r = a.getBoundingClientRect();
      return { left: Math.round(r.left), w: Math.round(r.width), bodyOverflow: document.body.style.overflow || "(unset)" };
    });
    const tog = p.locator("aside button[aria-expanded]").first();
    if ((await tog.count()) > 0) {
      report.checks[vp.n].accordionBefore = await tog.getAttribute("aria-expanded");
      await tog.click({ timeout: 5000 });
      await p.waitForTimeout(700);
      report.checks[vp.n].accordionAfter = await tog.getAttribute("aria-expanded");
      await p.screenshot({ path: path.join(OUT, `${vp.n}-menu-accordion.png`), timeout: 30000 });
    }
    await p.keyboard.press("Escape");
    await p.waitForTimeout(700);
    report.checks[vp.n].menuClosed = await p.evaluate(() => {
      const a = document.querySelector("aside");
      return { left: Math.round(a.getBoundingClientRect().left), bodyOverflow: document.body.style.overflow || "(unset)" };
    });
  }
  await ctx.close();
}

// reviews carousel
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(CLONE, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2500);
  report.checks.carousel = await p.evaluate(async () => {
    const sec = [...document.querySelectorAll("section")].find((s) => /Reviews and Testimonials/.test(s.textContent ?? ""));
    if (!sec) return { found: false };
    const track = sec.querySelector("div[style*='transform'], [class*='transition-transform']");
    const next = sec.querySelector("button[aria-label*='ext' i], button[aria-label*='Next' i]");
    const before = track ? getComputedStyle(track).transform : null;
    const readMore = [...sec.querySelectorAll("button")].find((x) => /read more/i.test(x.textContent ?? ""));
    return {
      found: true,
      hasTrack: !!track, hasNext: !!next, hasReadMore: !!readMore,
      before, cardCount: sec.querySelectorAll("article").length,
    };
  });
  const next = p.locator('button[aria-label*="ext" i]').first();
  if (await next.count()) {
    const before = await p.evaluate(() => { const t = document.querySelector("[style*='translateX'], [class*='transition-transform']"); return t ? getComputedStyle(t).transform : null; });
    await next.click({ timeout: 5000 });
    await p.waitForTimeout(800);
    const after = await p.evaluate(() => { const t = document.querySelector("[style*='translateX'], [class*='transition-transform']"); return t ? getComputedStyle(t).transform : null; });
    report.checks.carouselTransform = { before, after, changed: before !== after };
    await p.locator("section").filter({ hasText: "Reviews and Testimonials" }).first().screenshot({ path: path.join(OUT, "desktop-1440-reviews-clicked.png"), timeout: 30000 });
  }
  await ctx.close();
}

await writeFile(path.join(OUT, "QA-REPORT.json"), JSON.stringify(report, null, 2));
await b.close();
console.log(JSON.stringify(report.checks, null, 1));
