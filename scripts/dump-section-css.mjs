import { readFileSync } from "node:fs";

const ART = "docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/sections/";
const files = { map: "07-map.json", solutions: "05-solutions.json", reviews: "10-review.json", "14": "14-footer-nav.json" };

for (const [label, f] of Object.entries(files)) {
  const j = JSON.parse(readFileSync(ART + f, "utf8"));
  console.log(`\n===== ${label} (${f}) =====`);
  const walk = (n, d) => {
    if (!n) return;
    if (d <= 2) {
      const s = n.styles ?? {};
      console.log(
        "  ".repeat(d) +
          `<${n.tag} class="${(n.cls ?? "").slice(0, 52)}"> rect=${n.rect.w}x${n.rect.h} ` +
          `pad=${s.padding ?? "-"} mt=${s.marginTop ?? "-"} mb=${s.marginBottom ?? "-"} maxW=${s.maxWidth ?? "-"} ` +
          `h=${s.height ?? "-"} minH=${s.minHeight ?? "-"}` +
          (n.text ? ` TEXT=${JSON.stringify(n.text.slice(0, 40))}` : "")
      );
    }
    for (const k of n.kids ?? []) walk(k, d + 1);
  };
  walk(j.tree, 0);
}
