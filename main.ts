// Have You Tried Turning It Off? — entry program.
// Writes one tech-support line (<=199 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

class SupportLine {
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  codePoints(): number {
    let n = 0;
    for (const _ch of this.text) n += 1;
    return n;
  }

  ensureValid(): void {
    const n = this.codePoints();
    if (n < 1 || n > 199) {
      throw new Error(`line is ${n} chars, outside the 1-199 gate`);
    }
    if (this.text !== this.text.trim()) {
      throw new Error("line must not start or end with whitespace");
    }
    if (this.text.indexOf("\n") !== -1) {
      throw new Error("line must be a single line");
    }
  }

  emit(outPath: string): void {
    this.ensureValid();
    mkdirSync("/output", { recursive: true });
    writeFileSync(outPath, this.text, "utf8");
  }
}

const line = new SupportLine(
  "Have you tried turning it off and on again? I mean you. Unplug yourself for ten seconds, then call back, and we will both pretend this never happened.",
);
line.emit("/output/entry.txt");
console.log(`wrote ${line.codePoints()} chars to /output/entry.txt`);
