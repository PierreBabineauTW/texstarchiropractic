import { readFileSync, writeFileSync } from "node:fs";

const r = JSON.parse(readFileSync("docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/RECON.json", "utf8"));
const p = r.viewports["desktop-1440"].page;
const L = [];
const push = (s = "") => L.push(s);

push("========== PARAGRAPHS (verbatim) ==========");
for (const x of p.paragraphs) push(`[${x.fontSize}/${x.lineHeight} ${x.fontWeight}] ${x.text}`);

push("");
push("========== LINKS (text -> href) ==========");
for (const a of p.links) push(`${JSON.stringify(a.text)} -> ${a.href}   (fs ${a.style.fontSize} fw ${a.style.fontWeight} lh ${a.style.lineHeight} color ${a.style.color})`);

writeFileSync("docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/TEXT-CONTENT.txt", L.join("\n"));
console.log("wrote TEXT-CONTENT.txt");
