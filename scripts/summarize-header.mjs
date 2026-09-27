import { readFileSync, writeFileSync } from "node:fs";

const o = JSON.parse(readFileSync("docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/HEADER-PROBE.json", "utf8"));
const L = [];
const p = (s = "") => L.push(s);

for (const vp of Object.keys(o)) {
  for (const state of ["atTop", "scrolled"]) {
    const d = o[vp][state];
    p("##### " + vp + " / " + state + " #####");
    p("wrapper: " + d.wrapper._cls);
    p("  display=" + d.wrapper.display + " pos=" + d.wrapper.position + " bg=" + d.wrapper.backgroundColor + " rect=" + d.wrapper._rect);
    for (const sec of d.sections) {
      p("  SECTION [" + sec.cls + "]");
      p("    display=" + sec.display + " bg=" + sec.bg + " pad=" + sec.pad + " h=" + sec.h);
      for (const it of sec.items) {
        p("      - " + it._cls.slice(0, 46) + " | " + JSON.stringify(it._text.slice(0, 34)) +
          " | disp=" + it.display + " | bg=" + it.backgroundColor + " | color=" + it.color +
          " | fs=" + it.fontSize + " fw=" + it.fontWeight + " | pad=" + it.padding + " | br=" + it.borderRadius +
          " | rect=" + it._rect + (it._img ? " | IMG " + it._img : "") + (it._href ? " | href " + it._href : ""));
      }
    }
    p("");
  }
}
writeFileSync("docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/HEADER-PROBE.txt", L.join("\n"));
console.log("wrote HEADER-PROBE.txt (" + L.length + " lines)");
