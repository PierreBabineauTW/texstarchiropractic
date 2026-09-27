import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "docs/qa/polish";
const URL = process.env.TARGET ?? "http://127.0.0.1:3111/";

const VIEWPORTS = [
  { n: "430x932", w: 430, h: 932, m: true },
  { n: "390x844", w: 390, h: 844, m: true },
  { n: "375x812", w: 375, h: 812, m: true },
  { n: "360x800", w: 360, h: 800, m: true },
  { n: "768x1024", w: 768, h: 1024, m: false },
  { n: "1280x800", w: 1280, h: 800, m: false },
  { n: "1440x900", w: 1440, h: 900, m: false },
];

const audit = () => {
  const out = { overflow: [], smallText: [], tinyTargets: [], images: [], sections: [], doc: {} };
  const vw = window.innerWidth;

  // horizontal overflow offenders
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    if (r.right > vw + 1 || r.left < -1) {
      const cs = getComputedStyle(el);
      if (cs.position === "fixed") return; // intentionally parked off-canvas
      out.overflow.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 70),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
      });
    }
  });

  // small body text
  document.querySelectorAll("p, li, a, span, h1, h2, h3, h4, h5, h6, label, input, button").forEach((el) => {
    if (!el.textContent || !el.textContent.trim()) return;
    if (el.children.length > 0) return;
    const cs = getComputedStyle(el);
    const fs = parseFloat(cs.fontSize);
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    if (fs < 14 && el.tagName !== "SUP") {
      out.smallText.push({ tag: el.tagName, fs: cs.fontSize, text: el.textContent.trim().slice(0, 40) });
    }
  });

  // touch targets on interactive elements
  if (vw < 768) {
    document.querySelectorAll("a, button, input, [role=button]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") return;
      if (r.height < 40 || r.width < 40) {
        out.tinyTargets.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).slice(0, 50),
          text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 26),
          w: Math.round(r.width), h: Math.round(r.height),
        });
      }
    });
  }

  // images: aspect distortion + alt + loading
  document.querySelectorAll("img").forEach((i) => {
    const r = i.getBoundingClientRect();
    if (r.width === 0) return;
    const natAR = i.naturalHeight ? i.naturalWidth / i.naturalHeight : 0;
    const boxAR = r.width / r.height;
    const distorted = natAR > 0 && Math.abs(natAR - boxAR) / natAR > 0.06;
    out.images.push({
      alt: (i.alt || "").slice(0, 34),
      nat: `${i.naturalWidth}x${i.naturalHeight}`,
      box: `${Math.round(r.width)}x${Math.round(r.height)}`,
      loading: i.getAttribute("loading"),
      hasAlt: i.hasAttribute("alt"),
      distorted,
    });
  });

  out.sections = [...document.querySelectorAll("main > section, footer > section")].map((s) => {
    const r = s.getBoundingClientRect();
    return { h: Math.round(r.height), label: (s.querySelector("h1,h2,h3")?.textContent ?? "·").trim().replace(/\s+/g, " ").slice(0, 26) };
  });

  out.doc = {
    scrollH: document.documentElement.scrollHeight,
    scrollW: document.documentElement.scrollWidth,
    innerW: vw,
    overflowX: document.documentElement.scrollWidth - vw,
  };
  return out;
};

const b = await chromium.launch();
await mkdir(OUT, { recursive: true });
const report = {};

for (const vp of VIEWPORTS) {
  const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.m, hasTouch: vp.m, deviceScaleFactor: vp.m ? 2 : 1 });
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (x) => { if (x.type() === "error") errs.push(x.text().slice(0, 150)); });
  p.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 150)));
  p.on("requestfailed", (r) => errs.push("404/failed: " + r.url().split("/").slice(-2).join("/")));

  await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2200);
  await p.evaluate(async () => { const s = innerHeight; for (let y = 0; y < 16000; y += s) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 35)); } scrollTo(0, 0); });
  await p.waitForTimeout(1400);

  await p.screenshot({ path: path.join(OUT, `${vp.n}-full.png`), fullPage: true, timeout: 60000 });
  await p.screenshot({ path: path.join(OUT, `${vp.n}-fold.png`) });

  report[vp.n] = { ...(await p.evaluate(audit)), errors: [...new Set(errs)] };
  await ctx.close();
}

await writeFile(path.join(OUT, "AUDIT.json"), JSON.stringify(report, null, 2));
await b.close();

for (const [k, r] of Object.entries(report)) {
  console.log(`\n===== ${k} ===== docH=${r.doc.scrollH} overflowX=${r.doc.overflowX} errors=${r.errors.length}`);
  if (r.errors.length) console.log("  errors:", r.errors.join(" | "));
  if (r.overflow.length) console.log("  OVERFLOW:", JSON.stringify(r.overflow.slice(0, 6)));
  if (r.smallText.length) console.log("  SMALL TEXT:", JSON.stringify([...new Set(r.smallText.map((s) => `${s.tag}@${s.fs}`))]));
  if (r.tinyTargets.length) console.log("  TINY TARGETS:", JSON.stringify([...new Set(r.tinyTargets.map((t) => `${t.tag}"${t.text}" ${t.w}x${t.h}`))].slice(0, 10)));
  const dist = r.images.filter((i) => i.distorted);
  if (dist.length) console.log("  DISTORTED IMGS:", JSON.stringify(dist.map((i) => `${i.alt} ${i.nat}->${i.box}`)));
  const noAlt = r.images.filter((i) => !i.hasAlt);
  if (noAlt.length) console.log("  MISSING ALT ATTR:", noAlt.length);
}
