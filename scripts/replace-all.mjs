import { readFileSync, writeFileSync } from "node:fs";

/** Replaces every occurrence of a literal string in a file. */
const [file, from, to] = process.argv.slice(2);
const src = readFileSync(file, "utf8");
const count = src.split(from).length - 1;
if (count === 0) {
  console.error(`FAIL ${file}: not found`);
  process.exit(1);
}
writeFileSync(file, src.split(from).join(to));
console.log(`replaced ${count} in ${file}`);
