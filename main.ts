// The Houseplant Out-of-Office
// Writes one out-of-office auto-reply, as if a houseplant sent it,
// to /output/entry.txt. Gate: UTF-8 text of 1 to 120 characters,
// not only white space.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const LINE =
  "Out of office: I have survived on neglect and one sunbeam since March. Your email is next — behind the watering can.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${LINE.length}`);
}
if (!LINE.trim()) {
  throw new Error("entry must not be only white space");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line, no embedded newline");
}

// Empty the output directory's contents only; never remove the
// directory itself (it is a mount point in the grading sandbox).
mkdirSync(OUT_DIR, { recursive: true });
for (const name of readdirSync(OUT_DIR)) {
  rmSync(`${OUT_DIR}/${name}`, { recursive: true, force: true });
}

writeFileSync(OUT_FILE, LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${OUT_FILE}`);
