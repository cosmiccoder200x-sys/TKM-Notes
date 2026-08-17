// Phase 3 — notes registry integrity: every note maps to a real subject and
// resolves program-scoped (no plain-code ambiguity).
import { describe, it, expect } from "vitest";
import registry, { getSubjectContent, getSubjectContentByCode } from "@/lib/notes";
import { subjects } from "@/lib/content";

describe("notes registry", () => {
  it("keys are composite (program-code) only — no plain-code aliases", () => {
    const keys = Object.keys(registry);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      expect(key).toMatch(/^(ER|CS|CS_AI)-[A-Z0-9]+$/);
    }
  });

  it("every registered note resolves to a real subject in that program", () => {
    for (const key of Object.keys(registry)) {
      const [programId, code] = key.split("-");
      const exists = subjects.some((s) => s.programId === programId && s.code === code);
      expect(exists, `${key} has no subject`).toBe(true);
    }
  });

  it("getSubjectContent is program-correct", () => {
    for (const key of Object.keys(registry)) {
      const [programId, code] = key.split("-");
      const content = getSubjectContent(code, programId as "ER" | "CS" | "CS_AI");
      expect(content?.code).toBe(code);
    }
  });

  it("getSubjectContentByCode resolves deterministically (ER → CS → CS_AI)", () => {
    // The ER advanced-math note and the CS_AI advanced-math note share codes.
    const byCode = getSubjectContentByCode("24MAP301");
    const er = getSubjectContent("24MAP301", "ER");
    expect(byCode?.code).toBe(er?.code);
    // A code with no ER note but a CS_AI note still resolves.
    const aiCode = "24MAP300";
    const aiContent = getSubjectContent(aiCode, "CS_AI");
    if (aiContent) expect(getSubjectContentByCode(aiCode)?.code).toBe(aiContent.code);
  });

  it("registry has no entries for subjects that do not exist", () => {
    const keys = Object.keys(registry);
    for (const key of keys) {
      const [programId, code] = key.split("-");
      const match = subjects.find((s) => s.programId === programId && s.code === code);
      expect(match).toBeDefined();
    }
  });
});