/** WCAG 2.1 relative-luminance contrast, written out so there is no ambiguity. */
function luminance(hex) {
  const s = hex.replace("#", "");
  const channel = (i) => {
    const v = parseInt(s.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

const PAIRS = [
  ["body on white", "#382F2D", "#FFFFFF"],
  ["muted on white", "#73748C", "#FFFFFF"],
  ["primary blue on white", "#005EB8", "#FFFFFF"],
  ["brand orange on white", "#EA7600", "#FFFFFF"],
  ["white on brand orange", "#FFFFFF", "#EA7600"],
  ["white on primary blue", "#FFFFFF", "#005EB8"],
  ["newsletter btn #D07234 on white", "#D07234", "#FFFFFF"],
  ["white on newsletter btn", "#FFFFFF", "#D07234"],
  ["white on cream bg", "#FFFFFF", "#FDFCFA"],
  ["body on cream bg", "#382F2D", "#FDFCFA"],
  ["muted on cream bg", "#73748C", "#FDFCFA"],
  ["white on footer blue", "#FFFFFF", "#0A4C8B"],
];

console.log("pair".padEnd(34) + "ratio".padStart(8) + "   verdict");
for (const [name, fg, bg] of PAIRS) {
  const r = contrast(fg, bg);
  const v = r >= 4.5 ? "AA" : r >= 3 ? "AA large text only" : "FAIL";
  console.log(name.padEnd(34) + r.toFixed(2).padStart(8) + "   " + v);
}

console.log("\nbrand orange candidates for AA body text on white:");
for (const c of ["#EA7600", "#D26500", "#C25E00", "#B45309", "#A64700"]) {
  const r = contrast(c, "#FFFFFF");
  console.log("  " + c + "  " + r.toFixed(2) + ":1  " + (r >= 4.5 ? "AA" : "large only"));
}

console.log("\nnewsletter SUBMIT button (#D07234) candidates:");
for (const c of ["#D07234", "#BE6626", "#B05E20", "#A85A1C", "#9E5119"]) {
  const r = contrast(c, "#FFFFFF");
  console.log("  " + c + "  " + r.toFixed(2) + ":1  " + (r >= 4.5 ? "AA" : "large only"));
}

console.log("\nmuted #73748C on the cream wash:");
for (const bg of ["#FDFCFA", "#FFFFFF"]) {
  const r = contrast("#73748C", bg);
  console.log("  on " + bg + "  " + r.toFixed(2) + ":1  " + (r >= 4.5 ? "AA" : "large only"));
}
console.log("  #6E6F86 on #FDFCFA  " + contrast("#6E6F86", "#FDFCFA").toFixed(2) + ":1");
