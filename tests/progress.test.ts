// Phase 3 — progress & session persistence isolation across branches.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { progressSubjectKey, getProgress } from "@/lib/study/progress";
import {
  saveNightBeforeSession,
  loadNightBeforeSession,
  clearNightBeforeSession,
} from "@/lib/study/nightBefore";
import type { NightBeforeSession, NightBeforePlan } from "@/lib/study/types";

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

function sessionFor(programId: "ER" | "CS" | "CS_AI", code: string): NightBeforeSession {
  const plan: NightBeforePlan = {
    subjectCode: code,
    subjectName: code,
    availableMinutes: 60,
    target: "pass",
    sections: [],
    totalMinutes: 60,
  };
  return {
    subjectCode: code,
    programId,
    config: { minutes: 60, target: "pass" },
    plan,
    completedSections: [],
    reviewedItems: [],
    startedAt: 1,
    finished: false,
  };
}

describe("progress keys", () => {
  it("progressSubjectKey is program-scoped", () => {
    expect(progressSubjectKey("CS", "24CSP304")).toBe("CS:24CSP304");
    expect(progressSubjectKey("CS", "24CSP304")).not.toBe(progressSubjectKey("CS_AI", "24CSP304"));
    expect(progressSubjectKey("CS_AI", "24CSP304")).toBe("CS_AI:24CSP304");
  });

  it("getProgress is isolated per subject", () => {
    expect(getProgress()).toEqual({});
  });
});

describe("night-before sessions", () => {
  it("saves and loads under a program-scoped key", () => {
    saveNightBeforeSession(sessionFor("CS", "24CSP304"));
    const loaded = loadNightBeforeSession("24CSP304", "CS");
    expect(loaded?.programId).toBe("CS");
    expect(loaded?.subjectCode).toBe("24CSP304");
  });

  it("CS and CS_AI sessions for the same code never collide", () => {
    saveNightBeforeSession(sessionFor("CS", "24CSP304"));
    saveNightBeforeSession(sessionFor("CS_AI", "24CSP304"));

    expect(loadNightBeforeSession("24CSP304", "CS")?.programId).toBe("CS");
    expect(loadNightBeforeSession("24CSP304", "CS_AI")?.programId).toBe("CS_AI");
  });

  it("clears only the targeted program's session", () => {
    saveNightBeforeSession(sessionFor("CS", "24CSP304"));
    saveNightBeforeSession(sessionFor("CS_AI", "24CSP304"));

    clearNightBeforeSession("24CSP304", "CS");
    expect(loadNightBeforeSession("24CSP304", "CS")).toBeNull();
    expect(loadNightBeforeSession("24CSP304", "CS_AI")?.programId).toBe("CS_AI");
  });

  it("falls back to a legacy code-only key (migration safety)", () => {
    // Simulate a session persisted by an older build (code-only key).
    STORE.set("tkm.nightbefore.session.24CSP304", JSON.stringify(sessionFor("CS", "24CSP304")));
    const loaded = loadNightBeforeSession("24CSP304", "CS");
    expect(loaded?.programId).toBe("CS");
    // The program-scoped key takes priority when both exist.
    saveNightBeforeSession(sessionFor("CS_AI", "24CSP304"));
    STORE.set("tkm.nightbefore.session.24CSP304", JSON.stringify(sessionFor("ER", "24CSP304")));
    expect(loadNightBeforeSession("24CSP304", "CS_AI")?.programId).toBe("CS_AI");
  });
});