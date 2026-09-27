import { chromium } from "playwright";

const CLONE = process.env.CLONE_URL ?? "http://localhost:3111/";
const vp = { w: Number(process.env.VW ?? 1440), h: Number(process.env.VH ?? 900) };

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1, isMobile: vp.w < 768, hasTouch: vp.w < 768 });
const p = await ctx.newPage();
await p.goto(CLONE, { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(2500);
await p.evaluate(async () => {
  const s = innerHeight;
  for (let y = 0; y < 3000; y += s) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
});
await p.waitForTimeout(1200);

const out = await p.evaluate(() => {
  const pick = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
    return { x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), mt: cs.marginTop, mb: cs.marginBottom, maxW: cs.maxWidth, fs: cs.fontSize, lh: cs.lineHeight, ff: cs.fontFamily.split(",")[0].replace(/"/g, "") }; };
  const secs = [...document.querySelectorAll("main > section")].map((s) => { const r = s.getBoundingClientRect();
    return { y: Math.round(r.top + scrollY), h: Math.round(r.height), first: (s.querySelector("h1,h2,h3")?.textContent ?? "").trim().slice(0, 32) }; });
  return {
    docH: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
    header: pick("header"),
    headerBand: pick("header > div"),
    hero: pick("main > section"),
    h1: pick("main h1"),
    heroP: [...document.querySelectorAll("main h1 ~ p")].map((e) => { const r = e.getBoundingClientRect();
      return { y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), maxW: getComputedStyle(e).maxWidth, fs: getComputedStyle(e).fontSize, lh: getComputedStyle(e).lineHeight }; }),
    heroImgs: [...document.querySelectorAll("main > section:first-child img")].map((i) => { const r = i.getBoundingClientRect();
      return { alt: i.alt, x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; }),
    sections: secs,
  };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
