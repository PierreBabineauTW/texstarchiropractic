import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const URL = "https://texstarchiropractic.com/";
const ART = "docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2";
const SHOTS = "docs/design-references/texstarchiropractic-com-6d11e6eb/root-8a5edab2";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900, dsf: 1 },
  { name: "tablet-768", width: 768, height: 1024, dsf: 1 },
  { name: "mobile-390", width: 390, height: 844, dsf: 2 },
];

// Beaver Builder sections, keyed by the stable mcb-section-* id class
const SECTIONS = [
  ["01-header", "#mfn-header-template"],
  ["02-hero", "section.mcb-section-beiedfajb"],
  ["03-photo-left-1", "section.mcb-section-4666cc2d3"],
  ["04-dark-1", "section.mcb-section-776947401"],
  ["05-solutions", "section.mcb-section-b08e61f82"],
  ["06-commit", "section.mcb-section-5xnio06og"],
  ["07-map", "section.mcb-section-kbdh2bibb"],
  ["08-local", "section.mcb-section-bekgzsjfu"],
  ["09-dedicate", "section.mcb-section-zhdt1y41o"],
  ["10-review", "section.mcb-section-5c58779c4"],
  ["11-blog", "section.mcb-section-yry5f1s20"],
  ["12-footer-cta", "section.mcb-section-p9hbc90lf"],
  ["13-footer-main", "section.mcb-section-rs3j8ywn7"],
  ["14-footer-nav", "section.mcb-section-93jz56vrl"],
  ["15-footer-bottom", "section.mcb-section-xku1fndsw"],
];

async function settle(page, ms = 3000) {
  await page.waitForLoadState("load").catch(() => {});
  await page.waitForTimeout(ms);
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(1200);
}

const globals = () => {
  const seen = new Map();
  const bump = (k, v) => { if (v && !seen.has(k)) seen.set(k, v); };
  document.querySelectorAll("*").forEach((el) => {
    const cs = getComputedStyle(el);
    bump("ff-" + el.tagName, cs.fontFamily);
    if (el.textContent && el.children.length === 0) {
      bump("fs-" + el.tagName, cs.fontSize + " / " + cs.lineHeight + " / " + cs.fontWeight + " / " + cs.letterSpacing);
    }
    const bg = cs.backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)") bump("bg-" + bg, bg);
    const col = cs.color;
    if (col && col !== "rgb(0, 0, 0)") bump("fg-" + col, col);
    const bi = cs.backgroundImage;
    if (bi && bi !== "none") bump("bgi-" + bi.slice(0, 200), bi.slice(0, 200));
    const br = cs.borderRadius;
    if (br && br !== "0px") bump("br-" + br, br);
    const sh = cs.boxShadow;
    if (sh && sh !== "none") bump("sh-" + sh, sh);
  });
  return [...seen.entries()].map(([k, v]) => k + " => " + v);
};

const PROPS = [
  "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing", "color",
  "textTransform", "textDecoration", "textAlign", "backgroundColor", "backgroundImage",
  "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "margin", "marginTop", "marginRight", "marginBottom", "marginLeft",
  "width", "height", "maxWidth", "minWidth", "maxHeight", "minHeight",
  "display", "flexDirection", "justifyContent", "alignItems", "gap",
  "gridTemplateColumns", "gridTemplateRows", "flexWrap", "alignSelf",
  "borderRadius", "border", "borderTop", "borderRight", "borderBottom", "borderLeft",
  "boxShadow", "overflow", "overflowX", "overflowY", "position", "top", "right", "bottom", "left",
  "zIndex", "opacity", "transform", "transformOrigin", "transition", "animation", "cursor",
  "objectFit", "objectPosition", "mixBlendMode", "filter", "backdropFilter", "clipPath",
  "whiteSpace", "textOverflow", "WebkitLineClamp", "verticalAlign", "listStyleType", "float",
];

// Recursive computed-style walk, injected once and reused per section selector
const walkScript = (selector) => `(() => {
  const PROPS = ${JSON.stringify(PROPS)};
  const el = document.querySelector(${JSON.stringify(selector)});
  if (!el) return { error: 'not found', selector: ${JSON.stringify(selector)} };
  function styles(e) {
    const cs = getComputedStyle(e);
    const o = {};
    for (const p of PROPS) { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== 'normal') o[p] = v; }
    return o;
  }
  function node(e, depth) {
    const b = e.getBoundingClientRect();
    const own = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim();
    return {
      tag: e.tagName.toLowerCase(),
      cls: String(e.className || '').split(' ').filter(Boolean).slice(0, 6).join(' '),
      id: e.id || null,
      text: own ? own.slice(0, 300) : null,
      rect: { w: Math.round(b.width), h: Math.round(b.height) },
      styles: styles(e),
      img: e.tagName === 'IMG' ? { src: e.currentSrc || e.src, alt: e.alt, natural: [e.naturalWidth, e.naturalHeight] } : null,
      svg: e.tagName === 'svg' ? { viewBox: e.getAttribute('viewBox'), html: e.outerHTML.slice(0, 1500) } : null,
      href: e.tagName === 'A' ? e.getAttribute('href') : null,
      kids: depth > 0 ? [...e.children].slice(0, 40).map(c => node(c, depth - 1)) : undefined,
    };
  }
  return { selector: ${JSON.stringify(selector)}, html: el.outerHTML.length, tree: node(el, 6) };
})()`;

const probe = () => {
  const PROPS = [
    "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing", "color",
    "textTransform", "textDecoration", "textAlign", "backgroundColor", "backgroundImage",
    "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
    "margin", "marginTop", "marginRight", "marginBottom", "marginLeft",
    "width", "height", "maxWidth", "minWidth", "maxHeight", "minHeight",
    "display", "flexDirection", "justifyContent", "alignItems", "gap",
    "gridTemplateColumns", "gridTemplateRows", "flexWrap", "alignSelf",
    "borderRadius", "border", "borderTop", "borderRight", "borderBottom", "borderLeft",
    "boxShadow", "overflow", "overflowX", "overflowY", "position", "top", "right", "bottom", "left",
    "zIndex", "opacity", "transform", "transformOrigin", "transition", "animation", "cursor",
    "objectFit", "objectPosition", "mixBlendMode", "filter", "backdropFilter", "clipPath",
    "whiteSpace", "textOverflow", "WebkitLineClamp", "verticalAlign", "listStyleType", "float",
  ];
  const px = (el, props) => {
    const cs = getComputedStyle(el);
    const o = {};
    for (const p of props) o[p] = cs[p];
    return o;
  };
  return {
    docHeight: document.documentElement.scrollHeight,
    innerWidth: window.innerWidth,
    htmlBg: getComputedStyle(document.documentElement).backgroundColor,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    bodyFont: getComputedStyle(document.body).fontFamily,
    bodyFontSize: getComputedStyle(document.body).fontSize,
    bodyColor: getComputedStyle(document.body).color,
    headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => {
      const cs = getComputedStyle(h);
      return { tag: h.tagName, text: h.textContent.trim().replace(/\s+/g, " ").slice(0, 300), fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, lineHeight: cs.lineHeight, color: cs.color, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform, margin: cs.margin, align: cs.textAlign, textShadow: cs.textShadow };
    }),
    paragraphs: [...document.querySelectorAll("p")].map((p) => {
      const cs = getComputedStyle(p);
      return { text: p.textContent.trim().replace(/\s+/g, " ").slice(0, 400), fontSize: cs.fontSize, lineHeight: cs.lineHeight, color: cs.color, fontFamily: cs.fontFamily, margin: cs.margin };
    }).filter((p) => p.text),
    links: [...document.querySelectorAll("a")].map((a) => ({
      href: a.getAttribute("href"), text: a.textContent.trim().replace(/\s+/g, " ").slice(0, 100),
      cls: String(a.className).slice(0, 120), target: a.target,
      style: px(a, ["color", "backgroundColor", "fontSize", "fontWeight", "padding", "borderRadius", "border", "textDecoration", "transition", "display", "gap", "alignItems", "justifyContent", "textTransform", "letterSpacing", "boxShadow", "lineHeight", "fontFamily"]),
    })),
    buttons: [...document.querySelectorAll("button, .button, a.button, [class*='btn']")].map((b) => ({
      tag: b.tagName, text: (b.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100), cls: String(b.className).slice(0, 140),
      style: px(b, [...PROPS.slice(0, 40)]),
    })),
    images: [...document.images].map((i) => {
      const cs = getComputedStyle(i);
      return {
        src: i.currentSrc || i.src, dataSrc: i.getAttribute("data-src") || null, alt: i.alt,
        natural: [i.naturalWidth, i.naturalHeight], display: [i.width, i.height],
        cls: String(i.className).slice(0, 120), parentCls: i.parentElement ? String(i.parentElement.className).slice(0, 120) : null,
        parentImgs: i.parentElement ? i.parentElement.querySelectorAll("img").length : 0,
        pos: cs.position, zIndex: cs.zIndex, objectFit: cs.objectFit, borderRadius: cs.borderRadius, transform: cs.transform,
        srcset: i.getAttribute("srcset"), sizes: i.getAttribute("sizes"), loading: i.getAttribute("loading"),
      };
    }),
    bgImages: [...document.querySelectorAll("*")].map((el) => {
      const bi = getComputedStyle(el).backgroundImage;
      if (!bi || bi === "none") return null;
      const r = el.getBoundingClientRect();
      return { url: bi, sel: el.tagName.toLowerCase() + "." + String(el.className).split(" ").filter(Boolean).slice(0, 3).join("."), w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top + window.scrollY) };
    }).filter(Boolean),
    videos: [...document.querySelectorAll("video")].map((v) => ({ src: v.currentSrc || v.src, poster: v.poster, autoplay: v.autoplay, loop: v.loop, muted: v.muted, cls: String(v.className).slice(0, 80) })),
    svgCount: [...document.querySelectorAll("svg")].length,
    svgSamples: [...document.querySelectorAll("svg")].slice(0, 40).map((s) => ({
      cls: s.getAttribute("class"), parent: s.parentElement ? s.parentElement.tagName.toLowerCase() + "." + String(s.parentElement.className).slice(0, 60) : null,
      viewBox: s.getAttribute("viewBox"), w: s.getAttribute("width"), h: s.getAttribute("height"),
      html: s.outerHTML.slice(0, 900),
    })),
    iframes: [...document.querySelectorAll("iframe")].map((f) => ({ src: f.src, id: f.id, cls: String(f.className).slice(0, 80), w: f.clientWidth, h: f.clientHeight, display: getComputedStyle(f).display, border: getComputedStyle(f).border, borderRadius: getComputedStyle(f).borderRadius })),
    forms: [...document.querySelectorAll("form")].map((f) => ({ id: f.id, cls: String(f.className).slice(0, 100), action: f.action, inputs: [...f.querySelectorAll("input,select,textarea,button")].map((i) => ({ tag: i.tagName, name: i.name, type: i.type, placeholder: i.placeholder, cls: String(i.className).slice(0, 80) })) })),
    icons: [...document.querySelectorAll("[class*='icon'], .mfn-icon, [class*='flaticon']")].slice(0, 40).map((e) => ({ cls: String(e.className).slice(0, 100), w: e.offsetWidth, h: e.offsetHeight })),
  };
};

const libProbe = () => ({
  jquery: typeof window.jQuery ? window.jQuery.fn.jquery : null,
  mfn: typeof window.Mfn, beaver: typeof window.jQuery ? !!window.jQuery.fn.mfnSlider : null,
  flexslider: !!document.querySelector(".flexslider"),
  owl: !!document.querySelector(".owl-carousel"),
  slick: !!document.querySelector(".slick-slider"),
  waypoints: typeof window.Waypoint,
  lenis: !!document.querySelector(".lenis, .locomotive-scroll"),
  bootstrapModal: !!document.querySelector(".modal"),
  stylesheets: [...document.querySelectorAll("link[rel=stylesheet]")].map((l) => l.href),
  fontFaces: [...document.styleSheets].flatMap((ss) => { try { return [...ss.cssRules].filter((r) => r.type === 5).map((r) => r.cssText.slice(0, 300)); } catch { return []; } }),
  webFonts: [...document.fonts].map((f) => f.family + " " + f.weight + " " + f.style + " " + f.status).filter((v, i, a) => a.indexOf(v) === i),
  scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  customProps: (() => { const cs = getComputedStyle(document.documentElement); const o = {}; for (let i = 0; i < cs.length; i++) { const p = cs[i]; if (p.startsWith("--")) o[p] = cs.getPropertyValue(p).trim(); } return o; })(),
  stickyEls: [...document.querySelectorAll("*")].filter((el) => ["fixed", "sticky"].includes(getComputedStyle(el).position)).map((el) => ({ sel: el.tagName.toLowerCase() + "." + String(el.className).slice(0, 70), id: el.id, pos: getComputedStyle(el).position, display: getComputedStyle(el).display, zIndex: getComputedStyle(el).zIndex, top: getComputedStyle(el).top, h: Math.round(el.getBoundingClientRect().height) })),
  animAttrs: [...document.querySelectorAll("[data-aos], [data-animate], [data-waypoint], .animated, [class*=fade], [class*=reveal], [data-parallax]")].slice(0, 50).map((el) => ({ tag: el.tagName, cls: String(el.className).slice(0, 90), dataAos: el.getAttribute("data-aos") })),
  menuTriggers: [...document.querySelectorAll(".menu-icon, .mfn-m-menu, .mobile-menu, [class*='burger'], [class*='hamburger'], .mfn_menu_trigger, #mfn-m-menu")].map((e) => {
    const cs = getComputedStyle(e);
    return { sel: e.tagName.toLowerCase() + "." + String(e.className).slice(0, 80), display: cs.display, pos: cs.position, w: e.offsetWidth, h: e.offsetHeight, html: e.outerHTML.slice(0, 600) };
  }),
  offCanvas: [...document.querySelectorAll("#mfn-m-menu, .mfn-m-menu, .mfn-off-canvas, [class*='off-canvas']")].map((e) => ({ sel: e.tagName.toLowerCase() + "." + String(e.className).slice(0, 80), display: getComputedStyle(e).display, transform: getComputedStyle(e).transform })),
  meta: [...document.querySelectorAll('link[rel*="icon"], meta[property="og:image"]')].map((l) => ({ href: l.href || l.content, rel: l.rel, sizes: l.sizes })),
});

const main = async () => {
  await mkdir(path.join(ART, "sections"), { recursive: true });
  await mkdir(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const report = { url: URL, capturedAt: new Date().toISOString(), viewports: {} };

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dsf,
      isMobile: vp.width < 768,
      hasTouch: vp.width < 768,
      userAgent: vp.width < 768
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        : undefined,
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
    await settle(page);

    await page.screenshot({ path: path.join(SHOTS, `${vp.name}-full.png`), fullPage: true });
    await page.screenshot({ path: path.join(SHOTS, `${vp.name}-fold.png`) });

    for (const [label, sel] of SECTIONS) {
      const el = page.locator(sel).first();
      if ((await el.count()) === 0) { console.log(`  ! missing ${label} ${sel}`); continue; }
      try {
        await el.screenshot({ path: path.join(SHOTS, `${vp.name}-sec-${label}.png`), timeout: 15000 });
      } catch { console.log(`  ! shot failed ${label}`); }
      if (vp.name === "desktop-1440") {
        const tree = await page.evaluate(walkScript(sel)).catch((e) => ({ error: String(e) }));
        await writeFile(path.join(ART, "sections", `${label}.json`), JSON.stringify(tree, null, 2));
      }
    }

    report.viewports[vp.name] = {
      page: await page.evaluate(probe),
      libs: await page.evaluate(libProbe),
      globals: await page.evaluate(globals),
    };
    console.log(`captured ${vp.name}`);
    await ctx.close();
  }

  // ---------- interaction sweep at desktop ----------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await settle(page);
  const behaviors = { scroll: {}, hover: [] };

  const snap = () => page.evaluate(() => [...document.querySelectorAll("*")]
    .filter((el) => ["fixed", "sticky"].includes(getComputedStyle(el).position))
    .map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { sel: el.tagName.toLowerCase() + "." + String(el.className).slice(0, 60), id: el.id, top: Math.round(r.top), h: Math.round(r.height), bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 80), zIndex: cs.zIndex, display: cs.display, boxShadow: cs.boxShadow, transform: cs.transform, opacity: cs.opacity, transition: cs.transition };
    }));

  behaviors.scroll.atTop = await snap();
  for (const y of [150, 400, 900, 1600, 3000, 5000, 7000]) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(800);
    behaviors.scroll["y" + y] = await snap();
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  for (const sel of ["a.button", ".button", "nav a", "header a", "#mfn-header-template a", "section a", "footer a"]) {
    const loc = page.locator(sel).first();
    if ((await loc.count()) === 0) continue;
    const read = () => loc.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { color: cs.color, bg: cs.backgroundColor, transform: cs.transform, boxShadow: cs.boxShadow, textDecoration: cs.textDecoration, transition: cs.transition, borderColor: cs.borderColor, opacity: cs.opacity, letterSpacing: cs.letterSpacing };
    });
    const before = await read();
    await loc.hover().catch(() => {});
    await page.waitForTimeout(500);
    behaviors.hover.push({ sel, before, after: await read() });
  }

  behaviors.sliders = [];
  for (const sel of [".flexslider", ".mfn-slider", ".owl-carousel", ".slick-slider", "[class*=carousel]", "[class*=slider]", "[data-slider]"]) {
    const n = await page.locator(sel).count();
    if (n > 0) behaviors.sliders.push({ sel, count: n, html: (await page.locator(sel).first().evaluate((el) => el.outerHTML)).slice(0, 2500) });
  }

  // mobile menu open behaviour
  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const pm = await ctxM.newPage();
  await pm.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await settle(pm);
  behaviors.mobileMenu = { before: await pm.evaluate(libProbe).then((l) => ({ triggers: l.menuTriggers, offCanvas: l.offCanvas })) };
  for (const sel of [".menu-icon", ".mfn-m-menu", "[class*='burger']", "[class*='hamburger']", ".mobile-menu"]) {
    const t = pm.locator(sel).first();
    if ((await t.count()) === 0) continue;
    await t.click({ timeout: 5000 }).catch(() => {});
    await pm.waitForTimeout(900);
    behaviors.mobileMenu["after-" + sel] = await pm.evaluate(() => {
      const o = {};
      for (const s of ["#mfn-m-menu", ".mfn-m-menu", ".mfn-off-canvas", "body", "html", "#mfn-header-mobile-section"]) {
        const e = document.querySelector(s);
        if (!e) continue;
        const cs = getComputedStyle(e);
        o[s] = { display: cs.display, position: cs.position, transform: cs.transform, width: cs.width, overflow: cs.overflow, transition: cs.transition, visibility: cs.visibility, zIndex: cs.zIndex, left: cs.left };
      }
      return o;
    });
    await pm.screenshot({ path: path.join(SHOTS, "mobile-390-menu-open.png") });
    break;
  }
  await ctxM.close();

  report.behaviors = behaviors;
  await writeFile(path.join(ART, "RECON.json"), JSON.stringify(report, null, 2));
  await ctx.close();
  await browser.close();
  console.log("wrote", path.join(ART, "RECON.json"));
};

main().catch((e) => { console.error(e); process.exit(1); });
