// Entry point: copies the one-line office joke in entry.txt to the
// make.fun output directory. Node standard library only. The joke must
// stay a single line of 1-200 code points, so validate before copying.
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const source = join(scriptDir, "entry.txt");
const text = await readFile(source, "utf8");
const line = text.replace(/\n$/, "");
if (line.length === 0 || [...line].length > 200 || line.includes("\n")) {
  throw new Error("entry.txt must be one non-empty line of at most 200 code points");
}
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "output");
await mkdir(outputDir, { recursive: true });
await copyFile(source, join(outputDir, "entry.txt"));
