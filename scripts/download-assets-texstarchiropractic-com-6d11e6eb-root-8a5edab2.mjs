import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const SITE = "texstarchiropractic-com-6d11e6eb";
const PAGE = "root-8a5edab2";
const OUT = `public/sites/${SITE}/${PAGE}`;
const BASE = "https://texstarchiropractic.com";

// [url, localName]
const ASSETS = [
  // ---- logos & favicons ----
  [`${BASE}/wp-content/uploads/2023/10/TexStar_Logo_White_Horizontal-Hollow-Icon.svg`, "images/logo-texstar-white-horizontal.svg"],
  [`${BASE}/wp-content/uploads/2023/10/TSC_Color_Logomark.svg`, "images/logo-texstar-colormark.svg"],
  [`${BASE}/wp-content/uploads/2024/01/texstar-hollow-spine-icon.png`, "images/logo-texstar-spine-icon.png"],
  [`${BASE}/wp-content/uploads/2023/09/Frame-17.png`, "images/logo-texstar-color-horizontal.png"],
  [`${BASE}/wp-content/uploads/2023/09/cropped-cropped-TexStar-Chiropractic-Icon-32x32.png`, "seo/icon-32x32.png"],
  [`${BASE}/wp-content/uploads/2023/09/cropped-cropped-TexStar-Chiropractic-Icon-192x192.png`, "seo/icon-192x192.png"],
  [`${BASE}/wp-content/uploads/2023/09/cropped-cropped-TexStar-Chiropractic-Icon-180x180.png`, "seo/apple-touch-icon-180x180.png"],
  [`${BASE}/wp-content/uploads/2025/06/DSC03719_webp-scaled.webp`, "seo/og-image.webp"],

  // ---- hero ----
  [`${BASE}/wp-content/uploads/2026/03/Dr-John-and-Amy-Website-Hero-Pic-compressed-for-web-1497x1536.webp`, "images/hero-doctors.webp"],
  [`${BASE}/wp-content/uploads/2026/09/Best-of-Austin-Texas-Chiropractor-TexSTar-1536x1268.webp`, "images/badge-best-of-austin.webp"],

  // ---- root pain ----
  [`${BASE}/wp-content/uploads/2024/05/texstar-01@2x.png`, "images/root-pain-xray.png"],

  // ---- offer box ----
  [`${BASE}/wp-content/uploads/2024/01/Frame-62@2x.png`, "images/offer-starburst.png"],
  [`${BASE}/wp-content/uploads/2024/01/TS-New-Patient-Icon-01.png`, "images/offer-icon-01.png"],
  [`${BASE}/wp-content/uploads/2024/01/TS-New-Patient-Icon-02.png`, "images/offer-icon-02.png"],
  [`${BASE}/wp-content/uploads/2024/01/TS-New-Patient-Icon-03.png`, "images/offer-icon-03.png"],
  [`${BASE}/wp-content/uploads/2024/01/TS-New-Patient-Icon-04.png`, "images/offer-icon-04.png"],

  // ---- solutions cards ----
  [`${BASE}/wp-content/uploads/2023/09/HUMANBACK-1.png`, "images/solution-back-pain.png"],
  [`${BASE}/wp-content/uploads/2023/09/NECK-1.png`, "images/solution-neck-pain.png"],
  [`${BASE}/wp-content/uploads/2023/09/KNEE-1.png`, "images/solution-knee-pain.png"],
  [`${BASE}/wp-content/uploads/2023/09/FRECKLES-1.png`, "images/solution-headaches.png"],

  // ---- commit ----
  [`${BASE}/wp-content/uploads/2023/10/texstar-02@2x.png`, "images/commit-treatment.jpg"],

  // ---- local team ----
  [`${BASE}/wp-content/uploads/2026/02/TexStar-Chiropractic-7.jpg`, "images/local-team.jpg"],

  // ---- dedicate ----
  [`${BASE}/wp-content/uploads/2023/10/texstar-04@2x-1.png`, "images/dedicate-dr-henry.png"],
  [`${BASE}/wp-content/uploads/2023/09/slim-icon-101x500.png`, "images/quote-swoosh.png"],

  // ---- map markers ----
  ["https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/80334eaa-5faa-4464-b12d-aa2e5baff8ab/Star.svg", "images/map-marker-star.svg"],

  // ---- blog thumbnails ----
  [`${BASE}/wp-content/uploads/2026/08/iStock-2273799219-1-960x750.jpg`, "images/blog-child-spine.jpg"],
  [`${BASE}/wp-content/uploads/2026/08/iStock-1354259062-1-960x750.jpg`, "images/blog-radio.jpg"],
  [`${BASE}/wp-content/uploads/2026/06/iStock-930789596-1-960x750.jpg`, "images/blog-glp1.jpg"],

  // ---- footer ----
  [`${BASE}/wp-content/uploads/2026/09/best-of-atx-vector.svg`, "images/badge-best-of-atx.svg"],
  [`${BASE}/wp-content/uploads/2023/09/Google-Reviews-for-TexStar.png`, "images/google-reviews-badge.png"],
];

async function grab(url, rel) {
  const dest = path.join(OUT, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36",
          accept: "*/*",
        },
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 32) throw new Error(`suspiciously small (${buf.length}b)`);
      await writeFile(dest, buf);
      return { rel, bytes: buf.length, ok: true };
    } catch (err) {
      if (attempt === 3) return { rel, bytes: 0, ok: false, error: String(err) };
      await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
}

const results = [];
const queue = [...ASSETS];
async function worker() {
  while (queue.length) {
    const [url, rel] = queue.shift();
    results.push(await grab(url, rel));
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);

const ok = results.filter((r) => r.ok);
const bad = results.filter((r) => !r.ok);
console.log(`downloaded ${ok.length}/${results.length}`);
for (const r of results) {
  const flag = r.ok ? "OK  " : "FAIL";
  console.log(`  ${flag} ${r.rel.padEnd(44)} ${r.ok ? String(r.bytes).padStart(8) + "b" : r.error}`);
}
if (bad.length) process.exitCode = 1;
