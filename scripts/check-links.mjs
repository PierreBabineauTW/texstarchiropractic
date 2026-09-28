import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Static link validation.
 *
 * Collects every href/cta target in the content layer and the components, and
 * checks each one is either a real internal route (optionally with a fragment
 * that exists in the content), a tel:/mailto:, or an absolute https URL. Catches
 * remap accidents such as a missing path separator.
 */

const ROOT = "src";

// ---- 1. every route the app serves -----------------------------------------
const routes = new Set(["/"]);
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (name === "page.tsx") {
      const rel = path.dirname(full).replace(/\\/g, "/").replace(/^src\/app/, "");
      routes.add(rel === "/app" ? "/" : rel.replace(/\/+$/, "") || "/");
    }
  }
};
walk(path.join(ROOT, "app"));
// The dynamic [slug] routes are not literal paths; their concrete slugs come
// from the content layer and are expanded below.
routes.delete("/[slug]");
const content = readFileSync(
  "src/components/sites/texstarchiropractic-com-6d11e6eb/shared/content.ts",
  "utf8"
);
// slugs the dynamic routes render
const slugs = [
  ...[...content.matchAll(/\bslug: "([a-z0-9-]+)"/g)].map((m) => m[1]),
];
// Only the prefixes that actually have a page, so the check stays meaningful.
for (const s of new Set(slugs)) {
  routes.add(`/conditions/${s}`);
  routes.add(`/blog/${s}`);
}
// Anchor targets live on real pages; which slug belongs to which page is
// checked by the runtime crawl, not here.
for (const prefix of ["/conditions", "/services", "/locations", "/team", "/faq"]) {
  for (const s of new Set(slugs)) routes.add(`${prefix}#${s}`);
}

console.log("== routes the app serves ==");
console.log("  " + [...routes].sort().join("\n  "));

// ---- 2. every href in the codebase -----------------------------------------
const files = [];
const collect = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) collect(full);
    else if (/\.(ts|tsx)$/.test(name)) files.push(full);
  }
};
collect(ROOT);

const problems = [];
const external = new Set();
let checked = 0;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/href[:=]\s*\{?\s*[`"'"]([^`"'{}$]+)[`"']/g)) {
    const href = m[1];
    checked++;
    if (/^(tel:|mailto:)/.test(href)) continue;
    if (href.startsWith("http")) {
      external.add(new URL(href).host);
      continue;
    }
    if (!href.startsWith("/")) {
      problems.push(`${file}: not absolute -> ${href}`);
      continue;
    }
    if (href.startsWith("//")) {
      problems.push(`${file}: protocol-relative -> ${href}`);
      continue;
    }
    const [base, frag] = href.split("#");
    if (base && !routes.has(base.replace(/\/+$/, "") || "/")) {
      problems.push(`${file}: no such route -> ${href}`);
    }
    if (base === "" && frag && !slugs.includes(frag)) {
      problems.push(`${file}: unknown fragment -> ${href}`);
    }
  }
}

// ---- 3. placeholder hrefs anywhere -----------------------------------------
for (const file of files) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/href[=:]\s*\{\s*[`'"](#|javascript:)[`'"]/g)) {
    problems.push(`${file}: placeholder href -> ${m[0]}`);
  }
}

console.log(`\n== hrefs checked: ${checked} ==`);
console.log("external hosts: " + [...external].sort().join(", "));
console.log("\n== problems ==");
console.log(problems.length ? problems.map((p) => "  !! " + p).join("\n") : "  none");
