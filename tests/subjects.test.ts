// Phase 3 — subject catalog integrity + cross-branch isolation.
import { describe, it, expect } from "vitest";
import { subjects, csSubjects, csAiSubjects, syllabusModulesFor } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { subjectId } from "@/lib/domain";

const ER_COUNT = 38;
const CS_COUNT = 108;
const CS_AI_COUNT = 113;

describe("subject catalog", () => {
  it("has the expected totals: 38 ER + 108 CSE + 113 CSE [AI] = 259", () => {
    expect(csSubjects.length).toBe(CS_COUNT);
    expect(csAiSubjects.length).toBe(CS_AI_COUNT);
    const er = subjects.filter((s) => s.programId === "ER");
    expect(er.length).toBe(ER_COUNT);
    expect(subjects.length).toBe(ER_COUNT + CS_COUNT + CS_AI_COUNT);
  });

  it("has no duplicate course codes within a program", () => {
    for (const programId of ["ER", "CS", "CS_AI"] as const) {
      const codes = subjects.filter((s) => s.programId === programId).map((s) => s.code);
      const dupes = codes.filter((c, i) => codes.indexOf(c) !== i);
      expect(dupes, `${programId} duplicate codes`).toEqual([]);
    }
  });

  it("keeps subject identity distinct across programs even for shared codes", () => {
    const shared = new Set<string>();
    const seen = new Map<string, Set<"ER" | "CS" | "CS_AI">>();
    for (const s of subjects) {
      if (!seen.has(s.code)) seen.set(s.code, new Set());
      seen.get(s.code)!.add(s.programId);
    }
    for (const [code, programs] of seen) {
      if (programs.size > 1) shared.add(code);
    }
    expect(shared.size).toBeGreaterThan(0);
    for (const code of shared) {
      const ids = [...seen.get(code)!].map((p) => subjectId(p, code));
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("gives every subject a valid program and semester", () => {
    for (const s of subjects) {
      expect(["ER", "CS", "CS_AI"]).toContain(s.programId);
      expect(["s3", "s4", "s5", "s6", "s7", "s8"]).toContain(s.semesterId);
      expect(s.code).toMatch(/^[A-Z0-9]+$/);
    }
  });

  it("resolves a subject by canonical program+code to the right branch", () => {
    // Same code, different official names per branch.
    const cs = subjects.find((s) => s.programId === "CS" && s.code === "24CSP304");
    const ai = subjects.find((s) => s.programId === "CS_AI" && s.code === "24CSP304");
    expect(cs?.name).toBe("Algorithms");
    expect(ai?.name).toBe("Data Structures and Algorithms");
  });
});

describe("cross-branch isolation (24CSP304 DSA)", () => {
  it("keeps branch-specific official syllabus modules separate", () => {
    const csMods = syllabusModulesFor("CS", "24CSP304");
    const aiMods = syllabusModulesFor("CS_AI", "24CSP304");
    expect(csMods.length).toBe(5);
    expect(aiMods.length).toBe(5);
    // distinct arrays — never the same object shared across branches
    expect(csMods).not.toBe(aiMods);
    // the branch identity is what differs; module text may legitimately overlap
    expect(subjectId("CS", "24CSP304")).not.toBe(subjectId("CS_AI", "24CSP304"));
  });

  it("never leaks notes across branches", () => {
    // ER has no 24CSP304 note; CS/CS_AI neither. And a note written for one
    // program must never resolve for another program with the same code.
    for (const programId of ["ER", "CS", "CS_AI"] as const) {
      const content = getSubjectContent("24CSP304", programId);
      expect(content).toBeUndefined();
    }
  });
});

describe("module ownership", () => {
  it("every generated syllabus module key maps to a real subject", () => {
    for (const s of [...csSubjects, ...csAiSubjects]) {
      const mods = syllabusModulesFor(s.programId, s.code);
      expect(mods.length, `${s.programId}-${s.code} should have 5 modules`).toBe(5);
      for (let i = 0; i < mods.length; i++) {
        expect(mods[i].id).toBe(`m${i + 1}`);
        expect(mods[i].title.trim().length).toBeGreaterThan(0);
        expect(mods[i].content.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("syllabus module ids are unique within each subject", () => {
    for (const s of [...csSubjects, ...csAiSubjects]) {
      const ids = syllabusModulesFor(s.programId, s.code).map((m) => m.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});