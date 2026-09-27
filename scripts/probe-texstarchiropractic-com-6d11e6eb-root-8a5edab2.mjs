import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const URL = "https://texstarchiropractic.com/";
const ART = "docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2";

const PROPS = ["position", "top", "height", "minHeight", "backgroundColor", "backgroundImage",
  "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "margin", "marginBottom",
  "display", "flexDirection", "justifyContent", "alignItems", "gap", "zIndex", "boxShadow",
  "borderBottom", "borderTop", "border", "borderRadius", "width", "maxWidth", "opacity", "transform",
  "transition", "fontSize", "fontWeight", "lineHeight", "color", "letterSpacing", "overflow",
  "visibility", "float", "flexWrap", "textTransform", "textDecoration", "objectFit"];

const styleOf = (el) => {
  const cs = getComputedStyle(el);
  const o = {};
  for (const p of PROPS) o[p] = cs[p];
  const r = el.getBoundingClientRect();
  o._rect = { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) };
  return o;
};

async function settle(page, ms = 3000) {
  await page.waitForLoadState("load").catch(() => {});
  await page.waitForTimeout(ms);
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); }
    window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(1000);
}

const HEADER_SNAP = `(() => {
  const P = ${JSON.stringify(PROPS)};
  const s = (el) => { const cs = getComputedStyle(el); const o = {}; for (const p of P) o[p] = cs[p];
    const r = el.getBoundingClientRect(); o._rect = { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) };
    o._cls = String(el.className).slice(0, 90); o._tag = el.tagName.toLowerCase(); o._text = (el.textContent||'').trim().replace(/\\s+/g,' ').slice(0,60); return o; };
  const pick = (sel) => { const e = document.querySelector(sel); return e ? s(e) : null; };
  const out = {
    scrollY: Math.round(window.scrollY),
    header: pick('#mfn-header-template'),
    headerSections: [...document.querySelectorAll('#mfn-header-template section')].map((e) => s(e)),
    logo: pick('#mfn-header-template .logo'),
    logoImg: pick('#mfn-header-template .logo img'),
    menuUl: pick('#mfn-header-template .mfn-header-menu'),
    navLink: pick('#mfn-header-template .mfn-header-menu > li > a'),
    navLi: pick('#mfn-header-template .mfn-header-menu > li'),
    btn1: pick('#mfn-header-template a.button_size_1'),
    btn2: pick('#mfn-header-template a.button_size_2'),
    burger: pick('#mfn-header-template .mfn-header-menu-burger'),
    stickySection: pick('#mfn-header-sticky-section'),
    mobileSection: pick('#mfn-header-mobile-section'),
    mainSection: pick('#mfn-header-section'),
    submenu: pick('#mfn-header-template .menu-sub'),
  };
  out.allHeaderButtons = [...document.querySelectorAll('#mfn-header-template a.button')].map((e) => s(e));
  out.navItems = [...document.querySelectorAll('#mfn-header-template .mfn-header-menu > li')].map((li) => ({
    text: (li.textContent||'').trim().replace(/\\s+/g,' ').slice(0,40),
    href: li.querySelector('a') ? li.querySelector('a').getAttribute('href') : null,
    hasSub: !!li.querySelector('ul'),
    subItems: [...li.querySelectorAll('ul li a')].map((a) => ({ text: a.textContent.trim().replace(/\\s+/g,' ').slice(0,50), href: a.getAttribute('href') })),
    sub: li.querySelector('ul') ? s(li.querySelector('ul')) : null,
    li: s(li),
  }));
  return out;
})()`;

const main = async () => {
  await mkdir(path.join(ART, "behaviors"), { recursive: true });
  const browser = await chromium.launch();
  const out = {};

  // ---------- 1. header scroll states, desktop ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
    await settle(page);
    out.header = { states: [] };
    // binary-search the exact trigger between 0 and 900
    for (const y of [0, 100, 143, 144, 145, 150, 160, 180, 200, 300, 500, 900, 3000]) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(700);
      const snap = await page.evaluate(HEADER_SNAP);
      snap.requestedY = y;
      snap.headerPos = snap.header ? snap.header.position : null;
      snap.headerH = snap.header ? snap.header._rect.h : null;
      snap.btn1 = snap.btn1 ? { bg: snap.btn1.backgroundColor, border: snap.btn1.border, color: snap.btn1.color, h: snap.btn1._rect.h } : null;
      snap.btn2 = snap.btn2 ? { bg: snap.btn2.backgroundColor, border: snap.btn2.border, color: snap.btn2.color, h: snap.btn2._rect.h } : null;
      snap.stickyDisplay = snap.stickySection ? snap.stickySection.display : null;
      snap.mobileDisplay = snap.mobileSection ? snap.mobileSection.display : null;
      delete snap.navItems; delete snap.allHeaderButtons;
      out.header.states.push(snap);
    }
    // keep full nav structure from the top state
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const full = await page.evaluate(HEADER_SNAP);
    out.header.navItems = full.navItems;
    out.header.atTop = full;
    await ctx.close();
  }

  // ---------- 2. mobile side menu open/close + accordion ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
    await settle(page);

    const SM = `(() => {
      const P = ${JSON.stringify(PROPS)};
      const s = (el) => { if (!el) return null; const cs = getComputedStyle(el); const o = {}; for (const p of P) o[p] = cs[p];
        const r = el.getBoundingClientRect(); o._rect = { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) };
        o._cls = String(el.className).slice(0,90); o._text = (el.textContent||'').trim().replace(/\\s+/g,' ').slice(0,80); return o; };
      const side = document.querySelector('[id^="mfn-sidemenu-tmpl"]');
      return {
        overlay: s(document.querySelector('#body_overlay')),
        side: s(side),
        sideId: side ? side.id : null,
        inner: side ? [...side.querySelectorAll('*')].slice(0, 60).map(s) : [],
        items: side ? [...side.querySelectorAll('li, .mfn-sidemenu-item, a')].slice(0, 40).map((e) => ({ tag: e.tagName, text: (e.textContent||'').trim().replace(/\\s+/g,' ').slice(0,50), cls: String(e.className).slice(0,70), disp: getComputedStyle(e).display })) : [],
        bodyOverflow: getComputedStyle(document.body).overflow,
        bodyClass: document.body.className,
      };
    })()`;

    out.sidemenu = { before: await page.evaluate(SM) };
    await page.locator("a.mfn-header-menu-burger").first().click({ timeout: 8000 }).catch((e) => { out.sidemenu.clickErr = String(e); });
    await page.waitForTimeout(1200);
    out.sidemenu.afterOpen = await page.evaluate(SM);
    await page.screenshot({ path: path.join("docs/design-references/texstarchiropractic-com-6d11e6eb/root-8a5edab2", "mobile-390-sidemenu-open.png") });

    // accordion: click first submenu toggle
    const acc = page.locator('[id^="mfn-sidemenu-tmpl"] .mfn-sidemenu-item-subopen, [id^="mfn-sidemenu-tmpl"] li > a').first();
    if ((await acc.count()) > 0) {
      await acc.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(900);
      out.sidemenu.afterAccordion = await page.evaluate(SM);
      await page.screenshot({ path: path.join("docs/design-references/texstarchiropractic-com-6d11e6eb/root-8a5edab2", "mobile-390-sidemenu-accordion.png") });
    }
    // close
    const close = page.locator('[id^="mfn-sidemenu-tmpl"] .mfn-sidemenu-close, [id^="mfn-sidemenu-tmpl"] .mfn-sidemenu-closebutton a').first();
    if ((await close.count()) > 0) {
      await close.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(900);
      out.sidemenu.afterClose = await page.evaluate(SM);
    }
    await ctx.close();
  }

  // ---------- 3. reviews carousel + map + blog + offer badge structure ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
    await settle(page);

    const walk = (sel) => `(() => {
      const P = ${JSON.stringify(PROPS)};
      const el = document.querySelector(${JSON.stringify(sel)});
      if (!el) return { error: 'not found' };
      const s = (e) => { const cs = getComputedStyle(e); const o = {}; for (const p of P) o[p] = cs[p];
        const r = e.getBoundingClientRect(); o._rect = { w: Math.round(r.width), h: Math.round(r.height) };
        o._cls = String(e.className).slice(0,80); o._text = (e.textContent||'').trim().replace(/\\s+/g,' ').slice(0,120);
        o._img = e.tagName === 'IMG' ? e.currentSrc : null; o._href = e.tagName === 'A' ? e.getAttribute('href') : null;
        return o; };
      const walkFn = (e, d) => ({ ...s(e), kids: d > 0 ? [...e.children].slice(0,25).map((c) => walkFn(c, d-1)) : [] });
      return { selector: ${JSON.stringify(sel)}, tree: walkFn(el, 5), htmlLen: el.outerHTML.length };
    })()`;

    const TARGETS = {
      reviews: "section.mcb-section-5c58779c4",
      map: "section.mcb-section-kbdh2bibb",
      offerBadge: ".mcb-column-inner-18e9a14df",
      offerBox: "section.mcb-section-776947401",
      hero: "section.mcb-section-beiedfajb",
    };
    out.deep = {};
    for (const [k, sel] of Object.entries(TARGETS)) {
      out.deep[k] = await page.evaluate(walk(sel)).catch((e) => ({ error: String(e) }));
    }

    // carousel arrow behaviour
    out.reviewsCarousel = { before: null, after: null };
    const grab = () => page.evaluate(() => {
      const root = document.querySelector("#es-reviews, .eapps-google-reviews, [id^='es-']");
      if (!root) return null;
      const track = root.querySelector('[class*=track], [class*=slides], [class*=swiper]');
      const slides = [...root.querySelectorAll('[class*=item], [class*=slide]')].slice(0, 30).map((e) => {
        const cs = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        return { cls: String(e.className).slice(0, 60), text: (e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 90), transform: cs.transform, left: Math.round(r.left), w: Math.round(r.width), opacity: cs.opacity, transition: cs.transition };
      });
      const btns = [...root.querySelectorAll('button, a, [class*=next], [class*=prev], [class*=arrow]')].slice(0, 15).map((e) => {
        const cs = getComputedStyle(e);
        return { cls: String(e.className).slice(0, 70), text: (e.textContent || "").trim().slice(0, 30), bg: cs.backgroundColor, color: cs.color, br: cs.borderRadius, w: e.offsetWidth, h: e.offsetHeight, pos: cs.position, right: cs.right, transition: cs.transition, aria: e.getAttribute("aria-label") };
      });
      return { rootId: root.id, trackCls: track ? String(track.className).slice(0, 80) : null, trackTransform: track ? getComputedStyle(track).transform : null, trackTransition: track ? getComputedStyle(track).transition : null, slides, btns };
    });
    out.reviewsCarousel.before = await grab();
    for (const sel of ["[class*=next]", "[aria-label*='ext' i]", "button"]) {
      const b = page.locator("section.mcb-section-5c58779c4 " + sel).first();
      if ((await b.count()) > 0) { await b.click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(1200); out.reviewsCarousel["clicked"] = sel; break; }
    }
    out.reviewsCarousel.after = await grab();

    await ctx.close();
  }

  // ---------- 4. responsive layout deltas ----------
  {
    out.responsive = {};
    for (const vp of [{ n: "desktop-1440", w: 1440, h: 900 }, { n: "tablet-768", w: 768, h: 1024 }, { n: "mobile-390", w: 390, h: 844 }]) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.w < 768, hasTouch: vp.w < 768 });
      const page = await ctx.newPage();
      await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
      await settle(page);
      out.responsive[vp.n] = await page.evaluate(() => {
        const secs = [...document.querySelectorAll("main.sections_group > section.section")].map((s) => {
          const r = s.getBoundingClientRect();
          const cs = getComputedStyle(s);
          const inner = s.querySelector(".section_wrapper");
          const ir = inner ? inner.getBoundingClientRect() : null;
          return {
            cls: String(s.className).replace(/mcb-section-\w+/, "").trim().slice(0, 70),
            h: Math.round(r.height), pad: cs.padding,
            innerW: ir ? Math.round(ir.width) : null,
            innerMaxW: ir ? getComputedStyle(inner).maxWidth : null,
            cols: [...s.querySelectorAll(':scope > .section_wrapper > .wrap > .mcb-wrap-inner, :scope > .section_wrapper > .mcb-column')].map((c) => {
              const cr = c.getBoundingClientRect();
              const cc = getComputedStyle(c);
              return { w: Math.round(cr.width), disp: cc.display, flexWrap: cc.flexWrap, gap: cc.gap, cls: String(c.className).slice(0, 50) };
            }),
            bgImg: cs.backgroundImage === "none" ? null : cs.backgroundImage.slice(0, 90),
          };
        });
        const hd = [...document.querySelectorAll("h1,h2,h3,h4,h5")].map((h) => { const cs = getComputedStyle(h); return { t: h.tagName, fs: cs.fontSize, lh: cs.lineHeight, text: h.textContent.trim().replace(/\s+/g, " ").slice(0, 45) }; });
        return { docH: document.documentElement.scrollHeight, secs, headings: hd };
      });
      await ctx.close();
    }
  }

  await writeFile(path.join(ART, "BEHAVIOR-PROBE.json"), JSON.stringify(out, null, 2));
  await browser.close();
  console.log("wrote BEHAVIOR-PROBE.json");
};

main().catch((e) => { console.error(e); process.exit(1); });
