// Phase 3 — importer idempotency: regenerating lib/syllabusData.ts from the
// committed data/syllabus/ sources must be byte-identical every run.
import { describe, it, expect, afterAll } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync, copyFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "lib", "syllabusData.ts");
const BACKUP = join(ROOT, "lib", "syllabusData.ts.bak");
const SOURCES = [
  join(ROOT, "data", "syllabus", "CSE_Core_S3-S8_2024_COMPLETE_SYLLABUS.json"),
  join(ROOT, "data", "syllabus", "CSE_AI_S3-S8_2024_COMPLETE_IMPORT.json"),
  join(ROOT, "data", "syllabus", "CSE_AI_S3-S8_2024_ACCURATE_IMPORT.json"),
];

const run = () =>
  execFileSync(process.execPath, [join(ROOT, "scripts", "import-syllabus.mjs")], {
    cwd: ROOT,
    encoding: "utf8",
  });

describe("import-syllabus.mjs", () => {
  it("sources are committed inside the repo", () => {
    for (const src of SOURCES) {
      expect(existsSync(src), src).toBe(true);
    }
  });

  it("is idempotent: two runs produce identical lib/syllabusData.ts", () => {
    const original = readFileSync(OUT, "utf8");
    copyFileSync(OUT, BACKUP);

    try {
      const out1 = run();
      const first = readFileSync(OUT, "utf8");
      const out2 = run();
      const second = readFileSync(OUT, "utf8");

      expect(first).toBe(second);
      expect(first).toBe(original); // committed output already matches
      expect(out1).toContain('"CS": 108');
      expect(out1).toContain('"CS_AI": 113');
    } finally {
      copyFileSync(BACKUP, OUT);
      rmSync(BACKUP, { force: true });
    }
  });

  afterAll(() => {
    // restore whatever the last writer left (belt & suspenders)
    if (existsSync(BACKUP)) {
      copyFileSync(BACKUP, OUT);
      rmSync(BACKUP, { force: true });
    }
  });
});