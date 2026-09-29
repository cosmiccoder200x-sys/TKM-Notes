import { describe, it, expect } from "vitest";
import {
  prioritizeTopics,
  buildDayBeforeExamPrompt,
  TIME_BRACKETS,
} from "@/lib/prompts/dayBeforeExam";
import { findSubject } from "@/lib/content";

describe("Day-Before Exam Decision Engine", () => {
  it("prioritizes topics with Priority A, B, and C buckets", () => {
    const priorities = prioritizeTopics("24ERP304", "ER");
    expect(priorities.length).toBeGreaterThan(0);
    expect(priorities.some((p) => p.priority === "A")).toBe(true);
    expect(priorities[0].reasons.length).toBeGreaterThan(0);
  });

  it("handles subjects without pre-authored notes gracefully", () => {
    const priorities = prioritizeTopics("NON_EXISTENT_CODE", "ER");
    expect(priorities.length).toBe(5);
    expect(priorities[0].priority).toBe("A");
  });
});

describe("Day-Before Exam Prompt Generation", () => {
  const subject = findSubject("ER", "s3", "data-structures-and-algorithms") || {
    id: "er-s3-dsa",
    code: "24ERP304",
    name: "Data Structures and Algorithms",
    slug: "data-structures-and-algorithms",
    semesterId: "s3",
    programId: "ER",
    credits: 4,
    modules: [],
  };

  it("generates prompts with core instructions and time adaptation", () => {
    const prompt = buildDayBeforeExamPrompt({
      subject,
      programId: "ER",
      timeBracket: "1-to-3-hours",
    });

    expect(prompt).toContain("MAXIMUM MARKS PER MINUTE");
    expect(prompt).toContain("Data Structures and Algorithms");
    expect(prompt).toContain("TIME AVAILABLE: 1–3 hours");
    expect(prompt).toContain("SYLLABUS VERIFICATION RULE");
    expect(prompt).toContain("PYQ HONESTY");
  });

  it("adapts strategy across all defined time brackets", () => {
    for (const bracket of TIME_BRACKETS) {
      const prompt = buildDayBeforeExamPrompt({
        subject,
        programId: "ER",
        timeBracket: bracket.id,
      });
      expect(prompt).toContain(bracket.label.replace("–", "–"));
    }
  });

  it("includes student-reported weak areas when provided", () => {
    const prompt = buildDayBeforeExamPrompt({
      subject,
      programId: "ER",
      timeBracket: "3-to-6-hours",
      weakModules: ["Trees and Binary Search Trees"],
    });

    expect(prompt).toContain("STUDENT-REPORTED WEAK AREAS:");
    expect(prompt).toContain("Trees and Binary Search Trees");
  });
});
