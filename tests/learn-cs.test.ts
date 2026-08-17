// Phase 3 — Learn CS stays a separate catalog with a valid syllabus mapping.
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
    // learn-cs slugs never collide with TKM subject slugs and are not branch data.
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
        if (mods.length === 0) continue; // ER has no generated module breakdown
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