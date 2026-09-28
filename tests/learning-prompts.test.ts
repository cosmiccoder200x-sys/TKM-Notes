import { describe, it, expect } from "vitest";
import { buildTaskPrompt, buildTaskContext, LEARNING_TASKS, TASK_FOR_MODE } from "@/lib/learning/prompts";
import { ALL_PROMPTS } from "@/lib/prompts/prompts";
import type { LearningTask, TaskPromptContext } from "@/lib/learning/prompts";

const BAD = [/\bundefined\b/, /\[object\s*Object\]/, /\$\{/, /\bnan\b/i];

const FULL: TaskPromptContext = {
  university: "TKM College of Engineering",
  scheme: "KTU 2024",
  branch: "Electrical & Computer Engineering",
  semester: "Semester 3",
  subjectCode: "24ERP304",
  subjectName: "Data Structures and Algorithms",
  moduleId: "m1",
  moduleTitle: "Introduction",
  topic: { ref: "ER:24ERP304:m1:0", title: "Arrays" },
  syllabusTitles: ["Introduction", "Sorting", "Graphs"],
  topics: [
    { ref: "ER:24ERP304:m1:0", title: "Arrays", mastery: 2, mistakes: ["off-by-one in binary search"], revisionDue: true },
    { ref: "ER:24ERP304:m1:1", title: "Linked lists", mastery: 5, mistakes: [] },
  ],
  mistakes: ["off-by-one in binary search bounds"],
  pyqs: [
    { question: "Explain binary search with example.", weightage: "high", kind: "actual" },
    { question: "Binary search on rotated arrays.", weightage: "medium", kind: "variation" },
  ],
  topicPriority: "High exam weight + low mastery",
  timeMinutes: 45,
  studentLevel: "basic",
};

const MINIMAL: TaskPromptContext = {
  university: "TKM College of Engineering",
  scheme: "KTU 2024",
  branch: "Computer Science",
  semester: "Semester 3",
  subjectCode: "24CSP304",
  subjectName: "Algorithms",
  moduleId: "m1",
  moduleTitle: "Introduction",
};

describe("learning task prompts", () => {
  for (const task of LEARNING_TASKS) {
    it(`${task} builds cleanly with full context`, () => {
      const out = buildTaskPrompt(task, FULL);
      expect(out.task).toBe(task);
      expect(out.text.length).toBeGreaterThan(500);
      for (const pattern of BAD) expect(out.text).not.toMatch(pattern);
    });

    it(`${task} builds cleanly with minimal context`, () => {
      const out = buildTaskPrompt(task, MINIMAL);
      for (const pattern of BAD) expect(out.text).not.toMatch(pattern);
    });
  }

  it("teach skips reteaching mastered prefixes", () => {
    const out = buildTaskPrompt("teach", FULL);
    expect(out.text).toContain("Linked lists");
  });

  it("exam carries the full prep pack structure", () => {
    const out = buildTaskPrompt("exam", FULL);
    for (const marker of ["30-SECOND CORE IDEA", "EXAMINER TRAPS", "EMERGENCY CHEAT SHEET", "PYQ INTELLIGENCE"]) {
      expect(out.text).toContain(marker);
    }
  });

  it("pyq kinds are labeled honestly, never as history", () => {
    const out = buildTaskPrompt("practice", FULL);
    expect(out.text).toContain("ACTUAL PYQ");
    expect(out.text).toContain("PYQ-BASED VARIATION");
  });

  it("context stays within budget", () => {
    const big: TaskPromptContext = {
      ...FULL,
      syllabusTitles: Array.from({ length: 200 }, (_, i) => `Very long module title number ${i} with extra filler words`),
      pyqs: Array.from({ length: 50 }, (_, i) => ({ question: `Question ${i} `.repeat(40), weightage: "high" as const, kind: "actual" as const })),
    };
    const built = buildTaskContext(big);
    expect(built.chars).toBeLessThanOrEqual(6000);
    const out = buildTaskPrompt("exam", big);
    for (const pattern of BAD) expect(out.text).not.toMatch(pattern);
  });

  it("every legacy mode maps to exactly one task", () => {
    expect(Object.keys(TASK_FOR_MODE).sort()).toEqual(ALL_PROMPTS.map((p) => p.id).sort());
    const tasks = new Set<LearningTask>(Object.values(TASK_FOR_MODE));
    expect(tasks).toEqual(new Set<LearningTask>(["teach", "recall", "practice", "exam", "fix"]));
  });
});
