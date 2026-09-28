import { readFileSync, writeFileSync } from "node:fs";

/**
 * Tiny patch helper: node scripts/patch.mjs <file> <oldFile> <newFile>
 *
 * Applies an exact one-off string replacement, failing loudly if the target text
 * is not found exactly once. Patch files are written with whatever line endings
 * the shell produces, so the target is tried with LF first and then CRLF (some
 * files in this repo are checked out with Windows line endings) and the matched
 * form is what gets written.
 */
const [file, oldFile, newFile] = process.argv.slice(2);
const src = readFileSync(file, "utf8");
const rawFrom = readFileSync(oldFile, "utf8");
const rawTo = readFileSync(newFile, "utf8");

const variants = (raw) => {
  const lf = raw.replace(/\r\n/g, "\n");
  return lf === raw ? [lf] : [lf, lf.replace(/\n/g, "\r\n")];
};

const froms = variants(rawFrom);
const tos = variants(rawTo);

for (let i = 0; i < froms.length; i++) {
  const count = src.split(froms[i]).length - 1;
  if (count === 1) {
    writeFileSync(file, src.replace(froms[i], tos[i]));
    console.log(`patched ${file} (${froms[i].length} -> ${tos[i].length} chars, ${i ? "CRLF" : "LF"})`);
    process.exit(0);
  }
  if (count > 1) {
    console.error(`FAIL: found ${count} occurrences of the target in ${file} (expected 1)`);
    process.exit(1);
  }
}

console.error(`FAIL: target not found in ${file}`);
process.exit(1);
