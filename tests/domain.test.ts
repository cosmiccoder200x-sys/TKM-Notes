// Phase 3, Part 1-2 — canonical academic hierarchy + stable IDs.
import { describe, it, expect } from "vitest";
import {
  SCHEME_ID,
  SCHEMES,
  PROGRAMS,
  SEMESTERS,
  SEMESTER_IDS,
  programById,
  isProgramId,
  normalizeProgramId,
  programSlug,
  programFromSlug,
  schemeForProgram,
  subjectId,
  parseSubjectId,
  moduleId,
  parseModuleId,
  topicId,
} from "@/lib/domain";

describe("canonical hierarchy", () => {
  it("exposes a single 2024 scheme", () => {
    expect(SCHEME_ID).toBe("2024");
    expect(SCHEMES.length).toBe(1);
  });

  it("registers exactly ER, CS and CS_AI, each bound to the 2024 scheme", () => {
    expect(PROGRAMS.map((p) => p.id).sort()).toEqual(["CS", "CS_AI", "ER"]);
    for (const p of PROGRAMS) {
      expect(p.schemeId).toBe(SCHEME_ID);
      expect(schemeForProgram(p.id).id).toBe(SCHEME_ID);
    }
  });

  it("has unique program ids and unique route slugs", () => {
    const ids = PROGRAMS.map((p) => p.id);
    const slugs = PROGRAMS.map((p) => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves programs by id and slug, and round-trips", () => {
    for (const p of PROGRAMS) {
      expect(programById(p.id)?.slug).toBe(p.slug);
      expect(programFromSlug(p.slug)).toBe(p.id);
      expect(programFromSlug(p.slug.toUpperCase())).toBe(p.id);
      expect(programSlug(p.id)).toBe(p.slug);
    }
    expect(programFromSlug("nope")).toBeNull();
  });

  it("migrates legacy CSE / CSE_AI values, rejects garbage", () => {
    expect(normalizeProgramId("CSE")).toBe("ER");
    expect(normalizeProgramId("CSE_AI")).toBe("CS_AI");
    expect(normalizeProgramId("ER")).toBe("ER");
    expect(normalizeProgramId("FOO")).toBeNull();
    expect(normalizeProgramId(null)).toBeNull();
    expect(isProgramId("CS")).toBe(true);
    expect(isProgramId("foo")).toBe(false);
  });

  it("exposes the canonical S3–S8 semester table", () => {
    expect(SEMESTERS.length).toBe(6);
    expect(SEMESTER_IDS).toEqual(["s3", "s4", "s5", "s6", "s7", "s8"]);
  });
});

describe("stable identifiers", () => {
  it("subjectId encodes program + code and round-trips", () => {
    expect(subjectId("CS", "24CSP304")).toBe("CS:24CSP304");
    const parts = parseSubjectId("CS:24CSP304");
    expect(parts).toEqual({ programId: "CS", subjectCode: "24CSP304" });
  });

  it("keeps same-code subjects in different programs distinct", () => {
    // 24CSP304 is "Algorithms" (CS) vs "Data Structures and Algorithms" (CS_AI).
    expect(subjectId("CS", "24CSP304")).not.toBe(subjectId("CS_AI", "24CSP304"));
    expect(parseSubjectId(subjectId("CS", "24CSP304"))).toEqual({ programId: "CS", subjectCode: "24CSP304" });
    expect(parseSubjectId(subjectId("CS_AI", "24CSP304"))).toEqual({ programId: "CS_AI", subjectCode: "24CSP304" });
  });

  it("parses legacy CSE-prefixed ids to the ER program", () => {
    expect(parseSubjectId("CSE:24ERP304")).toEqual({ programId: "ER", subjectCode: "24ERP304" });
  });

  it("rejects malformed ids", () => {
    expect(parseSubjectId("")).toBeNull();
    expect(parseSubjectId("noseparator")).toBeNull();
    expect(parseSubjectId("FOO:24ERP304")).toBeNull();
  });

  it("moduleId namespaces module codes under the subject", () => {
    expect(moduleId("ER:24ERP304", "m1")).toBe("ER:24ERP304:m1");
    // m1 in one subject never collides with m1 in another.
    expect(moduleId("ER:24ERP304", "m1")).not.toBe(moduleId("CS_AI:24CSP304", "m1"));
    const parts = parseModuleId("ER:24ERP304:m1");
    expect(parts).toEqual({ subjectId: "ER:24ERP304", moduleCode: "m1" });
    expect(parseModuleId("m1")).toBeNull();
    expect(parseModuleId("")).toBeNull();
  });

  it("topicId slots under module", () => {
    expect(topicId("ER:24ERP304", "m1", 3)).toBe("ER:24ERP304:m1:3");
  });
});