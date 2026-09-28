import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  decideNextAction,
  planSession,
  recordEvidence,
  markRevisionDue,
  logMistake,
  getLearningState,
  learningSubjectKey,
} from "@/lib/learning";
import { saveVersion } from "@/lib/syllabus";
import { topicId } from "@/lib/domain";

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

const MODS = [
  { moduleCode: "m1", number: 1, title: "Intro", topics: [{ index: 0, title: "Arrays" }, { index: 1, title: "Stacks" }] },
  { moduleCode: "m2", number: 2, title: "Sorting", topics: [{ index: 0, title: "Bubble sort" }] },
];

function seed() {
  saveVersion({ programId: "ER", subjectCode: "24ERP304", source: "user_pasted", modules: MODS });
}

function ref(mod: string, i: number) {
  return topicId(learningSubjectKey("ER", "24ERP304"), mod, i);
}

describe("learning state", () => {
  it("keys are program-scoped", () => {
    expect(learningSubjectKey("CS", "24CSP304")).toBe("CS:24CSP304");
    expect(learningSubjectKey("CS", "24CSP304")).not.toBe(learningSubjectKey("CS_AI", "24CSP304"));
  });

  it("teaching exposes without inflating mastery", () => {
    seed();
    const s = recordEvidence({
      programId: "ER", subjectCode: "24ERP304", topicRef: ref("m1", 0),
      moduleCode: "m1", topicIndex: 0, title: "Arrays", kind: "taught", result: "done",
    });
    expect(s.topics[ref("m1", 0)].exposed).toBe(true);
    expect(s.topics[ref("m1", 0)].mastery).toBeNull();
  });

  it("correct recall raises mastery, incorrect lowers it", () => {
    seed();
    let s = recordEvidence({
      programId: "ER", subjectCode: "24ERP304", topicRef: ref("m1", 0),
      moduleCode: "m1", topicIndex: 0, title: "Arrays", kind: "recall", result: "correct",
    });
    expect(s.topics[ref("m1", 0)].mastery).toBe(1);
    s = recordEvidence({
      programId: "ER", subjectCode: "24ERP304", topicRef: ref("m1", 0),
      moduleCode: "m1", topicIndex: 0, title: "Arrays", kind: "recall", result: "incorrect",
    });
    expect(s.topics[ref("m1", 0)].mastery).toBe(0);
  });

  it("CS and CS_AI states never collide", () => {
    recordEvidence({
      programId: "CS", subjectCode: "24CSP304", topicRef: "CS:24CSP304:m1",
      moduleCode: "m1", topicIndex: null, title: "Intro", kind: "recall", result: "correct",
    });
    expect(getLearningState("CS_AI", "24CSP304").topics).toEqual({});
  });
});

describe("decideNextAction", () => {
  it("starts unstarted topics with teach", () => {
    seed();
    const a = decideNextAction("ER", "24ERP304", 45);
    expect(a.task).toBe("teach");
    expect(a.topicTitle).toBe("Arrays");
    expect(a.reason).toContain("syllabus");
  });

  it("routes open mistakes to fix", () => {
    seed();
    recordEvidence({
      programId: "ER", subjectCode: "24ERP304", topicRef: ref("m1", 0),
      moduleCode: "m1", topicIndex: 0, title: "Arrays", kind: "recall", result: "correct",
    });
    logMistake({ programId: "ER", subjectCode: "24ERP304", topicRef: ref("m1", 0), topicTitle: "Arrays", note: "bounds" });
    const a = decideNextAction("ER", "24ERP304", 30);
    expect(a.task).toBe("fix");
    expect(a.topicTitle).toBe("Arrays");
  });

  it("routes due revision to recall", () => {
    seed();
    markRevisionDue("ER", "24ERP304", ref("m1", 1), "m1", 1, "Stacks");
    const a = decideNextAction("ER", "24ERP304", 20);
    expect(a.task).toBe("recall");
    expect(a.topicTitle).toBe("Stacks");
  });

  it("routes weak topics to practice once basics exist", () => {
    seed();
    recordEvidence({
      programId: "ER", subjectCode: "24ERP304", topicRef: ref("m1", 0),
      moduleCode: "m1", topicIndex: 0, title: "Arrays", kind: "recall", result: "correct",
    });
    recordEvidence({
      programId: "ER", subjectCode: "24ERP304", topicRef: ref("m1", 0),
      moduleCode: "m1", topicIndex: 0, title: "Arrays", kind: "recall", result: "correct",
    });
    const a = decideNextAction("ER", "24ERP304", 45);
    expect(a.task).toBe("practice");
    expect(a.topicTitle).toBe("Arrays");
  });

  it("falls back to teach when nothing is saved", () => {
    const a = decideNextAction("CS", "24CSP304", 45);
    expect(a.task).toBe("teach");
    expect(a.reason.length).toBeGreaterThan(0);
  });
});

describe("planSession", () => {
  it("splits minutes across steps that sum exactly", () => {
    seed();
    const a = decideNextAction("ER", "24ERP304", 45);
    const plan = planSession(a, 45, "ER", "24ERP304");
    expect(plan.steps.length).toBeGreaterThanOrEqual(3);
    expect(plan.steps.reduce((n, s) => n + s.minutes, 0)).toBe(45);
    expect(plan.steps.every((s) => s.minutes >= 1)).toBe(true);
  });
});
