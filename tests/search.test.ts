// Phase 3 — unified search: TKM hits are branch-tagged; Learn CS hits are
// explicitly labeled as learn-cs so they are never treated as branch data.
import { describe, it, expect } from "vitest";
import { searchAll } from "@/lib/search";

describe("unified search", () => {
  it("TKM subject hits carry their real programId", () => {
    const hits = searchAll("Algorithms");
    const tkm = hits.filter((h) => h.source !== "learn-cs" && h.matchType === "subject");
    // CS "Algorithms" (24CSP304) and CS_AI "Data Structures and Algorithms" (24CSP304)
    expect(tkm.some((h) => h.programId === "CS" && h.subjectCode === "24CSP304")).toBe(true);
    expect(tkm.some((h) => h.programId === "CS_AI" && h.subjectCode === "24CSP304")).toBe(true);
    for (const h of tkm) {
      expect(["ER", "CS", "CS_AI"]).toContain(h.programId);
      expect(h.source === undefined || h.source === "tkm").toBe(true);
    }
  });

  it("learn-cs hits are labeled source=learn-cs and never resolve as branch data", () => {
    const hits = searchAll("binary search");
    const learn = hits.filter((h) => h.source === "learn-cs");
    expect(learn.length).toBeGreaterThan(0);
    for (const h of learn) {
      expect(h.href).toMatch(/^\/learn-cs\//);
      expect(h.semesterId).toBe("learn-cs");
    }
    // A learn-cs hit must not be routed through the TKM subjectUrl path.
    for (const h of learn) {
      expect(h.href).toBeDefined();
    }
  });

  it("a shared course code produces hits for every program that owns it", () => {
    const hits = searchAll("24CSP304");
    const programs = new Set(hits.filter((h) => h.subjectCode === "24CSP304").map((h) => h.programId));
    expect(programs.has("CS")).toBe(true);
    expect(programs.has("CS_AI")).toBe(true);
  });

  it("returns nothing for an empty query", () => {
    expect(searchAll("")).toEqual([]);
    expect(searchAll("   ")).toEqual([]);
  });
});