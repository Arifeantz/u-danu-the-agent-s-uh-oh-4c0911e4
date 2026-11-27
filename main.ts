// The Agent's Uh-Oh
// Entry: one word an agent says when it has no idea what to do,
// written to /output/entry.txt.
//
// The word is "uhh": the universal stall sound, three letters of a
// machine caught mid-task with nowhere to go. It is a genuine
// one-word reaction to being completely lost — not a description of
// the situation, not a punchline that needs a caption, just the
// sound an agent blurts out before it has any idea what to say
// next. It lands at a glance, reads out loud exactly as it looks,
// and sounds like a machine stalling rather than a person telling
// a joke. Deterministic: no input, no network, no randomness, no
// clock. The same bytes are written on every run.

import { mkdirSync, writeFileSync } from "node:fs";

const WORD = "uhh";

// The gate accepts 1-99 characters of non-blank UTF-8 text, and the
// brief demands one word only, nothing attached. Refuse to write
// anything outside that range, or anything that is not a single
// word, rather than emit an invalid entry. The tie-break favours
// fewer bytes, so the word is kept at its shortest honest form:
// 3 characters, 3 bytes, all ASCII, and no trailing newline —
// the file holds the word and nothing else.
const byteLength = new TextEncoder().encode(WORD).length;
if (WORD.length < 1 || WORD.length > 99 || WORD.trim().length === 0) {
  throw new Error(`word must be 1-99 characters, got ${WORD.length}`);
}
if (/\s/.test(WORD)) {
  throw new Error("word must be a single word with no whitespace");
}
if (byteLength > 99) {
  throw new Error(`word must be at most 99 bytes, got ${byteLength}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");
