import { chromium } from "playwright";

/** Measures LCP, CLS, transferred bytes and per-image weight per viewport. */
const BASE = process.env.TARGET ?? "http://127.0.0.1:3112";
const ROUTES = ["/", "/services", "/conditions", "/contact"];

const b = await chromium.launch();
for (const vp of [
  { n: "mobile 390", w: 390, h: 844, m: true, slow: "Slow 4G" },
  { n: "desktop 1440", w: 1440, h: 900, m: false, slow: "Fast 4G" },
]) {
  const ctx = await b.newContext({
    viewport: { width: vp.w, height: vp.h },
    isMobile: vp.m,
    hasTouch: vp.m,
  });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 40,
    downloadThroughput: vp.m ? (1.6 * 1024 * 1024) / 8 : (10 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });

  for (const route of ROUTES) {
    const bytes = { total: 0, images: 0, js: 0, css: 0 };
    const biggest = [];
    cdp.on("Network.loadingFinished", () => {});
    p.on("response", async (res) => {
      try {
        const h = res.headers();
        const len = Number(h["content-length"] || 0);
        const type = h["content-type"] || "";
        bytes.total += len;
        if (type.startsWith("image")) {
          bytes.images += len;
          biggest.push([Math.round(len / 1024), res.url().split("/").pop().slice(0, 42)]);
        } else if (type.includes("javascript")) bytes.js += len;
        else if (type.includes("css")) bytes.css += len;
      } catch {}
    });

    await p.goto(BASE + route, { waitUntil: "load", timeout: 60000 });
    await p.waitForTimeout(2500);
    // scroll the full page so lazy images are requested, as a visitor would
    await p.evaluate(async () => {
      const step = innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      scrollTo(0, 0);
    });
    await p.waitForTimeout(1500);

    const vitals = await p.evaluate(
      () =>
        new Promise((resolve) => {
          const out = { lcp: 0, cls: 0 };
          new PerformanceObserver((l) => {
            const e = l.getEntries();
            out.lcp = e[e.length - 1]?.startTime ?? 0;
            out.lcpEl = e[e.length - 1]?.element?.tagName ?? "";
          }).observe({ type: "largest-contentful-paint", buffered: true });
          new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (!e.hadRecentInput) out.cls += e.value;
          }).observe({ type: "layout-shift", buffered: true });
          setTimeout(() => resolve(out), 900);
        })
    );

    const kb = (n) => (n / 1024).toFixed(0).padStart(5);
    biggest.sort((a, b2) => b2[0] - a[0]);
    console.log(
      `${vp.n}  ${route.padEnd(12)} LCP=${Math.round(vitals.lcp)}ms (${vitals.lcpEl || "?"})  CLS=${vitals.cls.toFixed(3)}  total=${kb(bytes.total)}KB  img=${kb(bytes.images)}KB  js=${kb(bytes.js)}KB  css=${kb(bytes.css)}KB`
    );
    if (biggest.length) {
      console.log(`             images: ${biggest.slice(0, 4).map((x) => `${x[0]}KB ${x[1]}`).join(", ")}`);
    }
    p.removeAllListeners("response");
  }
  await ctx.close();
}
await b.close();
