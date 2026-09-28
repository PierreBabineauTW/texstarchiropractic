import { chromium } from "playwright";

/** Natural vs rendered size for every image, after a full scroll. */
const BASE = process.env.TARGET ?? "http://127.0.0.1:3112";
const b = await chromium.launch();
const table = new Map();

for (const w of [390, 768, 1024, 1440]) {
  const ctx = await b.newContext({
    viewport: { width: w, height: 900 },
    isMobile: w < 768,
    hasTouch: w < 768,
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(500);
  await p.evaluate(async () => {
    const step = innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(2500);
  const imgs = await p.evaluate(() =>
    [...document.querySelectorAll("img")].map((i) => {
      const r = i.getBoundingClientRect();
      const m = i.currentSrc.match(/url=([^&]+)/);
      return {
        key: (m ? decodeURIComponent(m[1]) : i.currentSrc).split("/").pop().split("?")[0],
        nat: i.naturalWidth,
        css: Math.round(r.width),
        shown: r.width > 0,
        dpr: window.devicePixelRatio,
      };
    })
  );
  for (const i of imgs) {
    if (!table.has(i.key)) table.set(i.key, { nat: i.nat, byW: {} });
    const row = table.get(i.key);
    if (i.shown) row.byW[w] = i.css;
  }
  await ctx.close();
}

console.log(
  "image".padEnd(40) + "natural".padStart(9) + [390, 768, 1024, 1440].map((w) => String(w).padStart(7)).join("")
);
for (const [key, row] of [...table].sort()) {
  console.log(
    key.slice(0, 39).padEnd(40) +
      String(row.nat).padStart(9) +
      [390, 768, 1024, 1440].map((w) => String(row.byW[w] ?? "-").padStart(7)).join("")
  );
}
await b.close();
