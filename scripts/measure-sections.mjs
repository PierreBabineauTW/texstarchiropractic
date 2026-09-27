import { chromium } from "playwright";

const CLONE = process.env.CLONE_URL ?? "http://localhost:3111/";
const REF = { desktop: [192, 826, 593, 1070, 1105, 707, 1006, 735, 629, 545, 912, 264, 383, 317, 123] };
const NAMES = ["header", "hero", "photoLeft", "offer", "solutions", "commit", "map", "local", "dedicate", "reviews", "blog", "newsletter", "footerCols", "footerAbout", "footerBottom"];

const b = await chromium.launch();
const out = {};
for (const vp of [{ k: "desktop", w: 1440, h: 900 }, { k: "tablet", w: 768, h: 1024 }, { k: "mobile", w: 390, h: 844 }]) {
  const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.w < 768, hasTouch: vp.w < 768 });
  const p = await ctx.newPage();
  await p.goto(CLONE, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2200);
  await p.evaluate(async () => {
    const s = innerHeight;
    for (let y = 0; y < 4000; y += s) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
    scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
  });
  await p.waitForTimeout(1000);
  out[vp.k] = await p.evaluate(() => ({
    docH: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
    header: Math.round(document.querySelector("header")?.getBoundingClientRect().height ?? 0),
    sections: [...document.querySelectorAll("main > section, footer > section")].map((s) => {
      const r = s.getBoundingClientRect();
      return { h: Math.round(r.height), t: (s.querySelector("h1,h2,h3,h4,h5,h6")?.textContent ?? "·").trim().replace(/\s+/g, " ").slice(0, 28) };
    }),
  }));
  await ctx.close();
}
await b.close();

console.log("viewport   docH    overflowX  sections(measured) ");
for (const k of Object.keys(out)) {
  const d = out[k];
  console.log(`\n== ${k}: docH=${d.docH}  overflowX=${d.overflowX}  header=${d.header}`);
  d.sections.forEach((s, i) => {
    const ref = k === "desktop" ? REF.desktop[i + 1] : null;
    const delta = ref ? s.h - ref : null;
    const flag = ref === null ? "  " : Math.abs(delta) <= 12 ? "OK" : "!!";
    console.log(`  ${flag} ${NAMES[i + 1].padEnd(14)} clone=${String(s.h).padStart(5)}  ref=${ref === null ? "  -  " : String(ref).padStart(5)}  ${delta === null ? "" : "d=" + (delta > 0 ? "+" : "") + delta}   [${s.t}]`);
  });
}
