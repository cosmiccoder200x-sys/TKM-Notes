import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { parseSubjectSyllabus, detectSubjects, parseFullSyllabus } from "@/lib/syllabus/parse";
import {
  listVersions,
  getActiveVersion,
  saveVersion,
  activateVersion,
  deleteVersion,
  buildOfficialVersion,
  getEffectiveVersion,
  getEffectiveModules,
} from "@/lib/syllabus/versions";
import { matchSyllabus } from "@/lib/syllabus/match";
import { syllabusToText } from "@/lib/syllabus/export";

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

const SUBJECT_RAW = `Module 1: Introduction
What is DSA
- Arrays
1) Linked lists

Module 2 - Sorting (6 hrs)
Bubble sort
* Merge sort
`;

describe("parseSubjectSyllabus", () => {
  it("detects modules and strips bullets, numbers, hour annotations", () => {
    const { modules, warnings } = parseSubjectSyllabus(SUBJECT_RAW);
    expect(warnings).toEqual([]);
    expect(modules).toHaveLength(2);
    expect(modules[0].title).toBe("Introduction");
    expect(modules[0].topics.map((t) => t.title)).toEqual(["What is DSA", "Arrays", "Linked lists"]);
    expect(modules[1].title).toBe("Sorting");
    expect(modules[1].topics.map((t) => t.title)).toEqual(["Bubble sort", "Merge sort"]);
  });

  it("supports UNIT headers and merges duplicate module numbers", () => {
    const { modules, warnings } = parseSubjectSyllabus("UNIT 2 - Graphs\nBFS\nModule 2\nDFS\n");
    expect(modules).toHaveLength(1);
    expect(modules[0].topics.map((t) => t.title)).toEqual(["BFS", "DFS"]);
    expect(warnings.some((w) => w.includes("Duplicate"))).toBe(true);
  });

  it("warns when no module headers exist and saves nothing parseable", () => {
    const { modules, warnings } = parseSubjectSyllabus("just some random notes\nmore notes");
    expect(modules).toHaveLength(0);
    expect(warnings.length).toBeGreaterThan(0);
  });
});

describe("detectSubjects + parseFullSyllabus", () => {
  it("detects a subject by course code", () => {
    const guesses = detectSubjects("24ERP304 Data Structures and Algorithms\nModule 1\nArrays");
    expect(guesses[0]).toMatchObject({ subjectCode: "24ERP304", confidence: "high" });
  });

  it("segments a full syllabus into per-subject parts", () => {
    const raw = "24ERP304 Data Structures and Algorithms\nModule 1\nArrays\n\n24EST332 Network Theory\nModule 1\nMesh analysis\n";
    const segs = parseFullSyllabus(raw);
    expect(segs).toHaveLength(2);
    expect(segs[0].guess?.subjectCode).toBe("24ERP304");
    expect(segs[0].parsed.modules[0].topics.map((t) => t.title)).toEqual(["Arrays"]);
    expect(segs[1].guess?.subjectCode).toBe("24EST332");
  });

  it("keeps shared codes program-distinct", () => {
    const guesses = detectSubjects("24CSP304\nModule 1\nStacks");
    const programs = guesses.filter((g) => g.subjectCode === "24CSP304").map((g) => g.programId);
    expect(programs).toContain("CS");
    expect(programs).toContain("CS_AI");
  });
});

describe("syllabus versions", () => {
  const mods = [
    { moduleCode: "m1", number: 1, title: "Intro", topics: [{ index: 0, title: "Arrays" }] },
    { moduleCode: "m2", number: 2, title: "Sorting", topics: [] },
  ];

  it("falls back to the official syllabus when nothing is saved", () => {
    expect(getActiveVersion("ER", "24ERP304")).toBeNull();
    const effective = getEffectiveVersion("ER", "24ERP304");
    expect(effective.source).toBe("official");
    expect(effective.modules.length).toBeGreaterThan(0);
    expect(getEffectiveModules("ER", "24ERP304").length).toBe(effective.modules.length);
  });

  it("official builds carry syllabus text as unexpanded modules", () => {
    const official = buildOfficialVersion("CS", "24CSP304");
    expect(official.id).toBe("official");
    expect(official.modules.length).toBeGreaterThan(0);
    expect(official.modules.every((m) => m.unexpanded)).toBe(true);
  });

  it("saving activates and deactivates previous versions", () => {
    const v1 = saveVersion({ programId: "ER", subjectCode: "24ERP304", source: "user_pasted", modules: mods });
    const v2 = saveVersion({ programId: "ER", subjectCode: "24ERP304", source: "user_edited", modules: mods });
    expect(getActiveVersion("ER", "24ERP304")?.id).toBe(v2.id);
    expect(listVersions("ER", "24ERP304")).toHaveLength(2);
    activateVersion("ER", "24ERP304", v1.id);
    expect(getActiveVersion("ER", "24ERP304")?.id).toBe(v1.id);
  });

  it("versions never cross programs for shared codes", () => {
    saveVersion({ programId: "CS", subjectCode: "24CSP304", source: "user_pasted", modules: mods });
    expect(getActiveVersion("CS_AI", "24CSP304")).toBeNull();
    expect(getEffectiveVersion("CS_AI", "24CSP304").source).toBe("official");
  });

  it("deleting the active version falls back to official", () => {
    const v = saveVersion({ programId: "ER", subjectCode: "24ERP304", source: "user_pasted", modules: mods });
    expect(deleteVersion("ER", "24ERP304", v.id)).toBe(true);
    expect(getEffectiveVersion("ER", "24ERP304").source).toBe("official");
  });
});

describe("matchSyllabus", () => {
  it("matches a parsed syllabus against written notes and PYQs", () => {
    const { modules } = parseSubjectSyllabus(SUBJECT_RAW);
    const match = matchSyllabus("ER", "24ERP304", modules);
    expect(match.modulesTotal).toBe(2);
    expect(match.modulesWithNotes).toBeGreaterThan(0);
    expect(match.pyqTotal).toBeGreaterThan(0);
  });

  it("reports zeros honestly for subjects without notes", () => {
    const match = matchSyllabus("CS", "24CSP304", [
      { moduleCode: "m1", number: 1, title: "Intro", topics: [{ index: 0, title: "Stacks" }] },
    ]);
    expect(match.modulesWithNotes).toBe(0);
    expect(match.pyqTotal).toBe(0);
  });
});

describe("syllabusToText", () => {
  it("exports modules and topics as copy-ready text", () => {
    const { modules } = parseSubjectSyllabus(SUBJECT_RAW);
    const text = syllabusToText(
      {
        id: "v1",
        subjectKey: "ER:24ERP304",
        programId: "ER",
        subjectCode: "24ERP304",
        source: "user_pasted",
        createdAt: 1,
        updatedAt: 1,
        active: true,
        modules,
      },
      "Data Structures and Algorithms",
      "24ERP304"
    );
    expect(text).toContain("Data Structures and Algorithms (24ERP304)");
    expect(text).toContain("Module 1: Introduction");
    expect(text).toContain("- Arrays");
    expect(text).not.toMatch(/\bundefined\b/);
  });

  it("falls back to official content text when topics are absent", () => {
    const official = buildOfficialVersion("CS", "24CSP304");
    const text = syllabusToText(official, "Algorithms", "24CSP304");
    expect(text).toContain("Module 1");
    expect(text.length).toBeGreaterThan(50);
  });
});
