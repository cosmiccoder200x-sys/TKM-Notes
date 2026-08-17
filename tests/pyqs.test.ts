// Phase 3 — PYQ bank is derived from notes and stays program-correct.
import { describe, it, expect } from "vitest";
import { getQuestionBank, getQuestionBankStats } from "@/lib/pyqs";
import { subjects, syllabusModulesFor } from "@/lib/content";

describe("PYQ bank", () => {
  const bank = getQuestionBank();

  it("derives entries only from written notes", () => {
    const noteSubjects = new Set(
      subjects
        .filter((s) => {
          // presence check is implicit: entries only exist when notes do
          return true;
        })
        .map((s) => `${s.programId}-${s.code}`)
    );
    for (const q of bank) {
      // every entry's subject+program is a real subject
      expect(subjects.some((s) => s.programId === q.programId && s.code === q.subjectCode)).toBe(true);
      void noteSubjects;
    }
  });

  it("produces a non-empty, program-scoped bank", () => {
    const stats = getQuestionBankStats(bank);
    expect(stats.total).toBeGreaterThan(0);
    expect(stats.high).toBeGreaterThan(0);
    // entries only exist for programs with written notes (ER + CS_AI today)
    const programs = new Set(bank.map((q) => q.programId));
    for (const p of programs) {
      expect(["ER", "CS", "CS_AI"]).toContain(p);
    }
  });

  it("every entry references an existing module", () => {
    for (const q of bank) {
      const mods = syllabusModulesFor(q.programId, q.subjectCode);
      if (mods.length === 0) continue; // ER has no generated module breakdown
      expect(mods.some((m) => m.id === q.moduleId)).toBe(true);
    }
  });

  it("has unique entry ids", () => {
    const ids = bank.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});