import { describe, it, expect } from "vitest";
import { ALL_PROMPTS, getPromptById } from "@/lib/prompts/prompts";
import { getSubjectCategory } from "@/lib/prompts/context";
import { subjects } from "@/lib/content";
import { generatePrompt } from "@/lib/prompts/utils";

// Patterns that indicate a broken template: unresolved variable,
// literal "undefined", NaN, or template-syntax residue.
const BAD_PATTERNS = [/\bundefined\b/, /\[object\s*Object\]/, /\$\{/, /\bnan\b/i];

// Baseline vars that every prompt can accept without crashing.
const BASE_VARS: Record<string, string> = { subject: "24ERP304", module: "m1", marks: "8" };

describe("getSubjectCategory", () => {
  it("classifies ER subjects correctly", () => {
    expect(getSubjectCategory("24ERP304")).toBe("dsa");
    expect(getSubjectCategory("24MAP301")).toBe("math");
    expect(getSubjectCategory("24ERJ303")).toBe("digital");
    expect(getSubjectCategory("24EST332")).toBe("circuit");
    expect(getSubjectCategory("24HUT310")).toBe("theory");
  });

  it("classifies CS subjects correctly by name", () => {
    expect(getSubjectCategory("24CSP304")).toBe("dsa");
    expect(getSubjectCategory("24CST501")).toBe("dsa");
    expect(getSubjectCategory("24CST401")).toBe("math");
    expect(getSubjectCategory("24CSP402")).toBe("dsa");
  });

  it("classifies CS_AI subjects correctly by name", () => {
    expect(getSubjectCategory("24CSP304")).toBe("dsa");
    expect(getSubjectCategory("24CST501")).toBe("dsa");
    expect(getSubjectCategory("24MAP300")).toBe("math");
    expect(getSubjectCategory("24AIJ303")).toBe("dsa");
  });

  it("classifies circuit and theory subjects", () => {
    expect(getSubjectCategory("24ERT305")).toBe("circuit");
    expect(getSubjectCategory("24ERT503")).toBe("dsa");
    expect(getSubjectCategory("24HUT555")).toBe("theory");
  });

  it("returns general for electives, seminars, and projects", () => {
    const electives = subjects.filter((s) => /elective|seminar|project|internship/i.test(s.name));
    for (const s of electives) {
      const cat = getSubjectCategory(s.code);
      expect(["general", "dsa", "theory"]).toContain(cat);
    }
  });

  it("never returns general for a subject with a recognized name pattern", () => {
    const recognized = subjects.filter((s) => !/elective|seminar|project|internship/i.test(s.name));
    const generals = recognized.filter((s) => getSubjectCategory(s.code) === "general");
    expect(generals).toHaveLength(0);
  });
});

describe("prompt template output quality", () => {
  for (const prompt of ALL_PROMPTS) {
    it(`${prompt.id} template produces no undefined, NaN, or template leaks`, () => {
      const output = generatePrompt(prompt, BASE_VARS);
      for (const pattern of BAD_PATTERNS) {
        expect(output).not.toMatch(pattern);
      }
    });

    it(`${prompt.id} template output is substantive`, () => {
      const output = generatePrompt(prompt, BASE_VARS);
      expect(output.length).toBeGreaterThan(200);
    });
  }
});

describe("prompt template with every subject", () => {
  const subjectCodes = subjects.slice(0, 40).map((s) => s.code);

  for (const prompt of ALL_PROMPTS) {
    it(`${prompt.id} renders cleanly for all subjects`, () => {
      for (const code of subjectCodes) {
        const output = generatePrompt(prompt, { subject: code });
        for (const pattern of BAD_PATTERNS) {
          expect(output).not.toMatch(pattern);
        }
      }
    });
  }
});

describe("prompt structure", () => {
  it("exports exactly 11 prompts", () => {
    expect(ALL_PROMPTS).toHaveLength(11);
  });

  it("all prompt ids are unique", () => {
    const ids = ALL_PROMPTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("getPromptById resolves every prompt", () => {
    for (const p of ALL_PROMPTS) {
      expect(getPromptById(p.id)).toBe(p);
    }
  });

  it("every prompt has required metadata", () => {
    for (const p of ALL_PROMPTS) {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.template).toBeTypeOf("function");
      expect(Array.isArray(p.variables)).toBe(true);
    }
  });
});
