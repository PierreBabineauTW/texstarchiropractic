import { chromium } from "playwright";

/** Accessibility checks: landmarks, heading order, names, focus, contrast, ARIA. */
const BASE = process.env.TARGET ?? "http://127.0.0.1:3112";
const ROUTES = [
  "/", "/services", "/conditions", "/conditions/back-pain", "/about", "/team",
  "/locations", "/contact", "/testimonials", "/faq", "/blog",
  "/blog/texstar-on-the-radio", "/privacy", "/not-a-real-page",
];

const AUDIT = () => {
  const issues = [];
  const note = (k, d) => issues.push(`${k}: ${d}`);

  // landmarks
  if (!document.querySelector("main")) note("landmark", "no <main>");
  if (!document.querySelector("header")) note("landmark", "no <header>");
  if (!document.querySelector("footer")) note("landmark", "no <footer>");
  if (document.querySelectorAll("main").length > 1) note("landmark", "multiple <main>");

  // headings
  const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
  const h1s = hs.filter((h) => h.tagName === "H1");
  if (h1s.length !== 1) note("h1", `${h1s.length} found`);
  let prev = 0;
  for (const h of hs) {
    const lvl = Number(h.tagName[1]);
    if (prev && lvl > prev + 1) {
      note("heading-order", `h${prev} -> h${lvl} at "${h.textContent.trim().slice(0, 32)}"`);
    }
    prev = lvl;
    if (!h.textContent.trim()) note("heading", `empty ${h.tagName}`);
  }

  // images
  document.querySelectorAll("img").forEach((i) => {
    if (!i.hasAttribute("alt")) note("img-alt", i.currentSrc.split("/").pop());
  });

  // controls need an accessible name
  document.querySelectorAll("a[href], button, input, textarea, select").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") return;
    if (el.closest("[aria-hidden='true']")) return;
    const name = (
      el.getAttribute("aria-label") ||
      el.getAttribute("title") ||
      el.textContent ||
      el.getAttribute("alt") ||
      (el.labels && el.labels.length ? el.labels[0].textContent : "") ||
      ""
    ).trim();
    if (!name) note("name", `${el.tagName.toLowerCase()} "${(el.getAttribute("href") || el.getAttribute("name") || "").slice(0, 30)}"`);
  });

  // aria wiring
  document.querySelectorAll("[aria-expanded]").forEach((el) => {
    if (!el.getAttribute("aria-controls")) note("aria", "aria-expanded without aria-controls");
  });

  // lang + title + description
  if (!document.documentElement.lang) note("html", "no lang");

  return issues;
};

const CONTRAST = [
  ["body on white", "#382F2D", "#FFFFFF"],
  ["muted on white", "#73748C", "#FFFFFF"],
  ["primary on white", "#005EB8", "#FFFFFF"],
  ["orange on white", "#EA7600", "#FFFFFF"],
  ["white on blue", "#FFFFFF", "#005EB8"],
  ["white on orange", "#FFFFFF", "#EA7600"],
  ["body on cream", "#382F2D", "#FDFCFA"],
  ["white on footer blue", "#FFFFFF", "#0A4C8B"],
];

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

console.log("== contrast (WCAG AA needs 4.5 for body, 3.0 for >=24px bold / >=18.66px bold) ==");
for (const [name, fg, bg] of CONTRAST) {
  const r = ratio(fg, bg);
  console.log(`  ${r.toFixed(2).padStart(6)}:1  ${r >= 4.5 ? "AA" : r >= 3 ? "AA-large only" : "FAIL"}  ${name}`);
}

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
let total = 0;
for (const route of ROUTES) {
  await p.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(500);
  const issues = await p.evaluate(AUDIT);
  total += issues.length;
  if (issues.length) {
    console.log(`\n  !! ${route}`);
    issues.forEach((i) => console.log(`       ${i}`));
  }
}
console.log(`\n== total a11y issues: ${total} ==`);

// keyboard: tab through the header and confirm a visible focus ring
console.log("\n== keyboard focus visibility (home, first 14 stops) ==");
await p.goto(BASE + "/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(600);
for (let i = 0; i < 14; i++) {
  await p.keyboard.press("Tab");
  const r = await p.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 26),
      outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`,
      shadow: s.boxShadow === "none" ? "-" : s.boxShadow.slice(0, 40),
    };
  });
  if (r) {
    const visible = r.outline.startsWith("solid") || r.shadow !== "-";
    console.log(`  ${visible ? "ok  " : "NONE"} ${r.tag.padEnd(7)} ${r.text.padEnd(28)} ${r.outline.slice(0, 34)} ${r.shadow}`);
  }
}
await b.close();
