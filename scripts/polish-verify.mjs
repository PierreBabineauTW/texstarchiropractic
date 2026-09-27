import { chromium } from "playwright";

const REF = [192, 826, 593, 1070, 1105, 707, 1006, 735, 629, 545, 912, 264, 383, 317, 123];
const NAMES = ["header", "hero", "photoLeft", "offer", "solutions", "commit", "map", "local", "dedicate", "reviews", "blog", "newsletter", "footerCols", "footerAbout", "footerBottom"];
const URL = process.env.TARGET ?? "http://127.0.0.1:3111/";

const b = await chromium.launch();

// 1. section parity at 1440
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2200);
  await p.evaluate(async () => { const s = innerHeight; for (let y = 0; y < 12000; y += s) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() => ({
    docH: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth - innerWidth,
    header: Math.round(document.querySelector("header").getBoundingClientRect().height),
    secs: [...document.querySelectorAll("main > section, footer > section")].map((s) => Math.round(s.getBoundingClientRect().height)),
  }));
  console.log("=== SECTION PARITY @1440 (ref total 9202) ===");
  console.log("  docH:", r.docH, " overflowX:", r.overflowX, " header:", r.header);
  r.secs.forEach((h, i) => {
    const ref = REF[i + 1];
    const d = h - ref;
    console.log(`  ${Math.abs(d) <= 12 ? "OK " : "!! "} ${NAMES[i + 1].padEnd(13)} clone=${String(h).padStart(5)} ref=${String(ref).padStart(5)} d=${d > 0 ? "+" : ""}${d}`);
  });
  await ctx.close();
}

// 2. focus ring
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2000);
  console.log("\n=== FOCUS RING (keyboard) ===");
  for (let i = 0; i < 5; i++) {
    await p.keyboard.press("Tab");
    const o = await p.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return { tag: el.tagName.toLowerCase(), text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 20), ow: cs.outlineWidth, os: cs.outlineStyle, oc: cs.outlineColor, off: cs.outlineOffset };
    });
    if (o) console.log(`  <${o.tag}> "${o.text}" outline=${o.os} ${o.ow} offset=${o.off} color=${o.oc}`);
  }
  // mouse click should NOT leave a ring
  await p.mouse.click(700, 400);
  await p.waitForTimeout(200);
  const afterMouse = await p.evaluate(() => { const cs = getComputedStyle(document.activeElement); return cs.outlineStyle + " " + cs.outlineWidth; });
  console.log("  after mouse click on non-focusable:", afterMouse);
  await ctx.close();
}

// 3. reduced motion
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2000);
  const r = await p.evaluate(() => {
    let maxTrans = 0, offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      const d = parseFloat(cs.transitionDuration) || 0;
      if (d > maxTrans) maxTrans = d;
      if (d > 0.02 && el.offsetParent !== null) offenders.push(String(el.className).slice(0, 40) + " " + cs.transitionDuration);
    });
    return { matches: matchMedia("(prefers-reduced-motion: reduce)").matches, maxTrans, count: offenders.length, sample: offenders.slice(0, 4) };
  });
  console.log("\n=== REDUCES MOTION ===");
  console.log("  media matches:", r.matches, "| longest transition still active:", r.maxTrans + "s", "| offenders:", r.count, r.sample);
  await ctx.close();
}
await b.close();
