import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  applyMasteryEvidence,
  masteryLabel6,
  mapPyqsToTopics,
  topicPyqCounts,
} from "@/lib/learning";
import { getQuestionBank } from "@/lib/pyqs";
import { saveVersion as saveSyllabusVersion } from "@/lib/syllabus";

const STORE = new Map<string, string>();

function mockLocalStorage() {
  const ls = {
    getItem: (k: string) => (STORE.has(k) ? STORE.get(k)! : null),
    setItem: (k: string, v: string) => {
      STORE.set(k, String(v));
    },
    removeItem: (k: string) => {
      STORE.delete(k);
    },
  };
  (globalThis as Record<string, unknown>).window = { localStorage: ls };
}

beforeEach(() => {
  STORE.clear();
  mockLocalStorage();
});

afterEach(() => {
  delete (globalThis as Record<string, unknown>).window;
});

describe("mastery 0-6 scale", () => {
  it("labels every level honestly", () => {
    expect(masteryLabel6(null)).toBe("Not Started");
    expect(masteryLabel6(0)).toBe("Not Started");
    expect(masteryLabel6(1)).toBe("Familiar");
    expect(masteryLabel6(2)).toBe("Basic Understanding");
    expect(masteryLabel6(3)).toBe("Standard Problem Solving");
    expect(masteryLabel6(4)).toBe("Exam Ready");
    expect(masteryLabel6(5)).toBe("Independent Mastery");
    expect(masteryLabel6(6)).toBe("Advanced");
  });

  it("teaching never inflates mastery", () => {
    expect(applyMasteryEvidence(null, { kind: "taught", result: "done" })).toBeNull();
    expect(applyMasteryEvidence(2, { kind: "taught", result: "done" })).toBe(2);
  });

  it("correct PYQ evidence moves faster than recall", () => {
    expect(applyMasteryEvidence(1, { kind: "pyq", result: "correct" })).toBe(3);
    expect(applyMasteryEvidence(1, { kind: "recall", result: "correct" })).toBe(2);
  });

  it("caps at 6 and floors at 0", () => {
    expect(applyMasteryEvidence(6, { kind: "pyq", result: "correct" })).toBe(6);
    expect(applyMasteryEvidence(0, { kind: "recall", result: "incorrect" })).toBe(0);
    expect(applyMasteryEvidence(null, { kind: "recall", result: "incorrect" })).toBe(0);
  });

  it("partial answers hold level, reviewed marks familiar", () => {
    expect(applyMasteryEvidence(3, { kind: "practice", result: "partial" })).toBe(3);
    expect(applyMasteryEvidence(null, { kind: "reviewed", result: "done" })).toBe(1);
    expect(applyMasteryEvidence(4, { kind: "reviewed", result: "done" })).toBe(4);
  });
});

describe("pyq topic mapping", () => {
  function seedTopics() {
    saveSyllabusVersion({
      programId: "ER",
      subjectCode: "24ERP304",
      source: "user_pasted",
      modules: [
        {
          moduleCode: "m1",
          number: 1,
          title: "Introduction",
          topics: [
            { index: 0, title: "Stack operations and applications" },
            { index: 1, title: "Queue operations and applications" },
          ],
        },
      ],
    });
  }

  it("maps bank questions to topics verbatim — never fabricated", () => {
    seedTopics();
    const bank = getQuestionBank().filter((q) => q.programId === "ER" && q.subjectCode === "24ERP304");
    expect(bank.length).toBeGreaterThan(0);
    const links = mapPyqsToTopics("ER", "24ERP304");
    const bankQuestions = new Set(bank.map((q) => q.question));
    for (const link of links) {
      expect(bankQuestions.has(link.question)).toBe(true);
      expect(link.kind).toBe("actual");
    }
  });

  it("counts PYQs per topic ref", () => {
    seedTopics();
    const counts = topicPyqCounts("ER", "24ERP304");
    const total = [...counts.values()].reduce((n, c) => n + c, 0);
    expect(total).toBe(mapPyqsToTopics("ER", "24ERP304").length);
  });

  it("returns empty honestly where no bank or syllabus exists", () => {
    expect(mapPyqsToTopics("CS", "24CSP304")).toEqual([]);
  });

  it("never crosses programs for shared codes", () => {
    seedTopics();
    expect(mapPyqsToTopics("CS_AI", "24CSP304")).toEqual([]);
  });
});
