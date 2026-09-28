import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

/** Reports every absolute URL used in the shipped source, and asset weights. */

const files = [];
const collect = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) collect(full);
    else if (/\.(ts|tsx)$/.test(name)) files.push(full);
  }
};
collect("src");

const urls = new Map();
for (const file of files) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/https?:\/\/[^\s"'`)]+/g)) {
    const u = m[0];
    if (!urls.has(u)) urls.set(u, new Set());
    urls.get(u).add(path.basename(file));
  }
}
console.log("== absolute URLs in src ==");
for (const [u, where] of [...urls].sort()) {
  console.log(`  ${u}`);
  console.log(`      ${[...where].join(", ")}`);
}

const assets = [];
const walkAssets = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walkAssets(full);
    else assets.push({ full, size: statSync(full).size });
  }
};
walkAssets("public");
assets.sort((a, b) => b.size - a.size);
const total = assets.reduce((n, a) => n + a.size, 0);
console.log(`\n== public assets: ${assets.length} files, ${(total / 1048576).toFixed(2)} MB ==`);
for (const a of assets.slice(0, 12)) {
  console.log(`  ${(a.size / 1024).toFixed(0).padStart(6)} KB  ${a.full.replace(/\\/g, "/")}`);
}
console.log(`  ... ${(total / 1048576 - assets.slice(0, 12).reduce((n, a) => n + a.size, 0) / 1048576).toFixed(2)} MB in the remaining ${assets.length - 12} files`);

// which of those big files are actually rendered, and are they eager?
console.log("\n== <Image> usage ==");
for (const file of files) {
  const src = readFileSync(file, "utf8");
  const n = [...src.matchAll(/<Image\b/g)].length;
  const priority = [...src.matchAll(/\bpriority\b/g)].length;
  const sizes = [...src.matchAll(/\bsizes=/g)].length;
  if (n) console.log(`  ${String(n).padStart(2)} Image, ${priority} priority, ${sizes} sizes  ${file.replace(/\\/g, "/")}`);
}
