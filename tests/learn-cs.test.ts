import { describe, it, expect } from "vitest";
import { LEARN_SUBJECTS, subjectTopics, getLearnSubject } from "@/lib/learn-cs";
import { findSubjectByCode, syllabusModulesFor } from "@/lib/content";
import {
  SUBJECT_LINKS,
  TOPIC_LINKS,
  syllabusLinksForSubject,
  syllabusLinksForTopic,
  syllabusLinkHref,
} from "@/lib/learn-cs/syllabus";
import {
  generateLearnAiPrompt,
  generateLearnAiPracticePrompt,
  generateLearnAiRevisionPrompt,
  generateLearnAiMasteryCheckPrompt,
  AI_LEVELS,
  AI_GOALS,
  AI_STYLES,
} from "@/lib/learn-cs/ai";

describe("Learn CS catalog", () => {
  it("has 30 subjects with unique slugs", () => {
    expect(LEARN_SUBJECTS.length).toBe(30);
    const slugs = LEARN_SUBJECTS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every subject has at least one topic", () => {
    for (const s of LEARN_SUBJECTS) {
      expect(subjectTopics(s).length).toBeGreaterThan(0);
    }
  });

  it("learn-cs catalog is separate from the TKM branch catalog", () => {
    expect(getLearnSubject("data-structures-and-algorithms")).toBeDefined();
    expect(getLearnSubject("24CSP304")).toBeUndefined();
  });
});

describe("Learn CS → TKM syllabus mapping", () => {
  it("every subject-level link target exists in the TKM syllabus", () => {
    for (const [learnSlug, targets] of Object.entries(SUBJECT_LINKS)) {
      expect(getLearnSubject(learnSlug), `${learnSlug} unknown learn-cs subject`).toBeDefined();
      for (const t of targets) {
        const subject = findSubjectByCode(t.programId, t.subjectCode);
        expect(subject, `${learnSlug} → ${t.programId}-${t.subjectCode}`).toBeDefined();
      }
    }
  });

  it("resolved links carry the real subject's program/semester/slug", () => {
    const links = syllabusLinksForSubject("data-structures-and-algorithms");
    expect(links.length).toBe(3);
    const cs = links.find((l) => l.programId === "CS");
    const ai = links.find((l) => l.programId === "CS_AI");
    expect(cs?.subjectName).toBe("Algorithms");
    expect(ai?.subjectName).toBe("Data Structures and Algorithms");
  });

  it("every topic-level link target exists (subject, topic, module)", () => {
    for (const [key, targets] of Object.entries(TOPIC_LINKS)) {
      const [learnSlug, topicSlug] = key.split("/");
      const subject = getLearnSubject(learnSlug);
      expect(subject, `${learnSlug} unknown`).toBeDefined();
      const topics = subject ? subjectTopics(subject) : [];
      expect(topics.some((t) => t.slug === topicSlug), `${key} unknown topic`).toBe(true);
      for (const programId of Object.keys(targets) as ("ER" | "CS" | "CS_AI")[]) {
        const target = targets[programId]!;
        const mods = syllabusModulesFor(programId, target.subjectCode);
        if (mods.length === 0) continue;
        expect(
          mods.some((m) => m.id === target.moduleId),
          `${key} → ${programId}:${target.subjectCode}:${target.moduleId}`
        ).toBe(true);
      }
    }
  });

  it("topic links merge module anchors without duplicating subject links", () => {
    const topic = syllabusLinksForTopic("data-structures-and-algorithms", "sorting-algorithms");
    expect(topic.subjectSlug).toBe("data-structures-and-algorithms");
    expect(topic.topicSlug).toBe("sorting-algorithms");
    expect(topic.links.length).toBe(3);
    for (const l of topic.links) {
      if (l.programId === "ER" || l.programId === "CS" || l.programId === "CS_AI") {
        expect(l.moduleId).toBe("m4");
        expect(syllabusLinkHref(l)).toContain(`#${l.moduleId}`);
      }
    }
  });
});

describe("Learn CS AI Prompt Generator (Pedagogical Upgrade)", () => {
  const dsaSubject = getLearnSubject("data-structures-and-algorithms")!;
  const treeTopic = subjectTopics(dsaSubject).find((t) => t.slug === "trees-and-binary-trees") || subjectTopics(dsaSubject)[0];
  const progSubject = getLearnSubject("python-programming") || LEARN_SUBJECTS.find((s) => s.category === "programming")!;
  const progTopic = subjectTopics(progSubject)[0];

  it("generates beginner prompts focusing on foundations & mental models", () => {
    const prompt = generateLearnAiPrompt(dsaSubject, treeTopic, {
      level: "beginner",
      goal: "understand",
      style: "visual",
    });

    expect(prompt).toContain("LEVEL: BEGINNER");
    expect(prompt).toContain("Foundations & Mental Models");
    expect(prompt).toContain("UNIVERSAL CS LEARNING RULES");
    expect(prompt).toContain("ACTIVE RECALL");
  });

  it("generates intermediate prompts optimized for high learning value per minute", () => {
    const prompt = generateLearnAiPrompt(dsaSubject, treeTopic, {
      level: "intermediate",
      goal: "problem-solving",
      style: "code-first",
    });

    expect(prompt).toContain("LEVEL: INTERMEDIATE");
    expect(prompt).toContain("Maximum Learning Value Per Minute");
    expect(prompt).toContain("5-Step CS Problem Solving Framework");
    expect(prompt).toContain("RECOGNITION");
  });

  it("generates advanced prompts with deep systems and trade-off rigor", () => {
    const prompt = generateLearnAiPrompt(dsaSubject, treeTopic, {
      level: "advanced",
      goal: "interview",
      style: "socratic",
    });

    expect(prompt).toContain("LEVEL: ADVANCED");
    expect(prompt).toContain("Deep Reasoning, Systems Trade-offs & Edge Cases");
    expect(prompt).toContain("GOAL: TECHNICAL INTERVIEW READINESS");
  });

  it("applies category-specific domain guidance for programming vs cs-fundamentals", () => {
    const progPrompt = generateLearnAiPrompt(progSubject, progTopic, {
      level: "beginner",
      goal: "understand",
      style: "simple",
    });
    expect(progPrompt).toContain("Stack vs Heap allocation");

    const csPrompt = generateLearnAiPrompt(dsaSubject, treeTopic, {
      level: "intermediate",
      goal: "understand",
      style: "simple",
    });
    expect(csPrompt).toContain("cache locality vs pointer chasing");
  });

  it("generates progressive practice prompts with error repair protocols", () => {
    const practicePrompt = generateLearnAiPracticePrompt(dsaSubject, treeTopic, "intermediate");
    expect(practicePrompt).toContain("PRACTICE PROTOCOL");
    expect(practicePrompt).toContain("Error Repair Protocol");
    expect(practicePrompt).toContain("DO NOT reveal the full solution immediately");
  });

  it("generates rapid revision and mastery evaluation prompts", () => {
    const revPrompt = generateLearnAiRevisionPrompt(dsaSubject, treeTopic);
    expect(revPrompt).toContain("Rapid Spaced Revision");
    expect(revPrompt).toContain("RAPID-FIRE RECALL");

    const masteryPrompt = generateLearnAiMasteryCheckPrompt(dsaSubject, treeTopic);
    expect(masteryPrompt).toContain("Mastery Evaluation");
    expect(masteryPrompt).toContain("5 distinct dimensions");
  });
});
