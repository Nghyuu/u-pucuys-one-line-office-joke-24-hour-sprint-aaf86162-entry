// Entry point: copies the one-line office joke in entry.txt to the
// output directory given by MAKEFUN_OUTPUT_DIR. The entry must stay a
// single line, so the copy is validated before it is written out.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
const src = join(dir, "entry.txt");
const text = readFileSync(src, "utf8");
if (text.trim().split("\n").length !== 1) {
  throw new Error("entry.txt must contain exactly one line");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.txt"));
