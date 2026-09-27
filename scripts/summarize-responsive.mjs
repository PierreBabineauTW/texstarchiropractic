import { readFileSync, writeFileSync } from "node:fs";

const o = JSON.parse(readFileSync("docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/BEHAVIOR-PROBE.json", "utf8"));
const L = [];
const p = (s = "") => L.push(s);

p("================ RESPONSIVE ================");
for (const vp of Object.keys(o.responsive)) {
  const d = o.responsive[vp];
  p("--- " + vp + "  docH=" + d.docH);
  for (const s of d.secs) {
    p("  [" + s.cls + "]");
    p("     h=" + s.h + " pad=" + s.pad + " innerW=" + s.innerW + " maxW=" + s.innerMaxW);
    p("     bg=" + (s.bgImg || "none"));
    for (const c of s.cols) p("     col w=" + c.w + " disp=" + c.disp + " wrap=" + c.flexWrap + " gap=" + c.gap + " [" + c.cls + "]");
  }
  p("  -- headings");
  for (const h of d.headings) p("     " + h.t + " " + h.fs + "/" + h.lh + "  " + JSON.stringify(h.text));
  p("");
}

p("================ SIDEMENU STYLE DETAIL ================");
const sm = o.sidemenu;
if (sm.afterOpen) {
  for (const el of sm.afterOpen.inner.slice(0, 40)) {
    if (!el._rect || el._rect.w === 0) continue;
    p("  <" + el._tag + " [" + el._cls + "]> " + JSON.stringify(el._text.slice(0, 44)));
    p("     disp=" + el.display + " pos=" + el.position + " bg=" + el.backgroundColor + " color=" + el.color +
      " fs=" + el.fontSize + " fw=" + el.fontWeight + " lh=" + el.lineHeight + " pad=" + el.padding +
      " br=" + el.borderRadius + " border=" + (el.border || "").slice(0, 34) + " rect=" + JSON.stringify(el._rect) +
      " transition=" + el.transition);
  }
}

p("");
p("================ REVIEWS CAROUSEL ================");
const rc = o.reviewsCarousel;
if (rc.before) {
  p("rootId=" + rc.before.rootId + " trackCls=" + rc.before.trackCls);
  p("trackTransform=" + rc.before.trackTransform + " trackTransition=" + rc.before.trackTransition);
  p("BTNS:");
  for (const b of rc.before.btns) p("  [" + b.cls + "] " + JSON.stringify(b.text) + " aria=" + b.aria + " bg=" + b.bg + " color=" + b.color + " br=" + b.br + " size=" + b.w + "x" + b.h + " pos=" + b.pos + " right=" + b.right);
  p("SLIDES (" + rc.before.slides.length + "):");
  for (const s of rc.before.slides.slice(0, 12)) p("  [" + s.cls + "] left=" + s.left + " w=" + s.w + " op=" + s.opacity + " " + JSON.stringify(s.text.slice(0, 60)));
}
if (rc.after) {
  p("AFTER click (" + rc.clicked + ") trackTransform=" + rc.after.trackTransform);
  p("  first 6 slides left: " + rc.after.slides.slice(0, 6).map((s) => s.left).join(", "));
}

writeFileSync("docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/RESPONSIVE-AND-MENU.txt", L.join("\n"));
console.log("wrote RESPONSIVE-AND-MENU.txt (" + L.length + " lines)");
