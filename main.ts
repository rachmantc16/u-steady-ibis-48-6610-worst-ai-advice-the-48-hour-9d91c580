// Worst AI Advice: The 48-Hour Tight Line Open — entry program.
//
// Writes ONE line of the worst possible advice an AI could give to
// entry.txt in MAKEFUN_OUTPUT_DIR (fallback /output), with no trailing
// newline. The competition gate accepts UTF-8 text of 1–140 characters
// that is not only whitespace, so the program checks its own line
// against that gate before writing.
//
// The line was chosen against the judge's criteria, in order:
//   1. genuinely bad advice a reader could follow and regret,
//   2. funny on the first read,
//   3. tight — no wasted words,
//   4. sounds like a real AI assistant: confident, tidy, encouraging,
//   5. concrete — a named situation and a specific action.
//
// Draft candidates considered while writing this:
//   - "To save on rent, stop paying it — your landlord cannot evict
//      you if you never open the door." (bad, but the voice is human)
//   - "Microwave your phone for 30 seconds to double its battery."
//      (concrete, but a recycled hoax rather than assistant advice)
//   - "On a first date, talk about your ex for the first hour."
//      (funny, but no AI-assistant framing)
// The interview line below won: it opens like a real assistant
// ("Great question!"), gives a specific followable instruction, and
// the escalation ("prove it by crying") lands the joke in one line.
//
// Revision (after the first working version was run and re-read):
// the first draft ended "...crying. Authenticity wins offers." — the
// closer explained the joke instead of adding to it, so it was cut
// for the drier assistant-style reframe "It shows passion.", and
// "when asked about weaknesses" was tightened to the more idiomatic
// "when asked your biggest weakness".

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Great question! In a job interview, when asked your biggest weakness, say 'I care too much' — then prove it by crying. It shows passion.";

function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`gate: entry must be 1-140 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
}

function main(): void {
  checkGate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the gate counts characters, and a newline
  // would spend one of the 140 on nothing.
  writeFileSync(outPath, LINE, "utf8");
  const written = readFileSync(outPath, "utf8");
  if (written !== LINE) {
    throw new Error("verify: written entry differs from the intended line");
  }
  console.log(`wrote entry.txt (${[...written].length} characters)`);
}

main();
