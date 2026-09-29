import { describe, it, expect } from "vitest";
import {
  EXTERNAL_AI,
  EXTERNAL_AI_PROVIDERS,
  externalAiUrl,
  handoffToExternalAi,
} from "@/lib/learning/external-ai";
import { sharedStudyInstructions } from "@/lib/learning/prompts/instructions";
import { generatePrompt } from "@/lib/prompts/utils";
import { getPromptById } from "@/lib/prompts/prompts";

describe("external AI destinations", () => {
  it("uses official ChatGPT, Gemini, and Claude URLs", () => {
    expect(externalAiUrl("chatgpt")).toBe("https://chatgpt.com/");
    expect(externalAiUrl("gemini")).toBe("https://gemini.google.com/");
    expect(externalAiUrl("claude")).toBe("https://claude.ai/");
    expect(EXTERNAL_AI.chatgpt.url).toBe("https://chatgpt.com/");
    expect(EXTERNAL_AI.gemini.url).toBe("https://gemini.google.com/");
    expect(EXTERNAL_AI.claude.url).toBe("https://claude.ai/");
  });

  it("does not put prompt text in the destination URL", () => {
    for (const p of EXTERNAL_AI_PROVIDERS) {
      expect(p.url).not.toContain("?");
      expect(p.url).not.toContain("q=");
    }
  });
});

describe("handoffToExternalAi", () => {
  it("opens the selected AI after a successful copy", async () => {
    const opened: string[] = [];
    const result = await handoffToExternalAi({
      prompt: "study prompt",
      provider: "chatgpt",
      copy: async () => true,
      open: (url) => opened.push(url),
    });
    expect(result.copied).toBe(true);
    expect(result.url).toBe("https://chatgpt.com/");
    expect(opened).toEqual(["https://chatgpt.com/"]);
  });

  it("still opens the AI when clipboard write fails", async () => {
    const opened: string[] = [];
    const result = await handoffToExternalAi({
      prompt: "study prompt",
      provider: "gemini",
      copy: async () => false,
      open: (url) => opened.push(url),
    });
    expect(result.copied).toBe(false);
    expect(opened).toEqual(["https://gemini.google.com/"]);
  });

  it("still opens the AI when clipboard throws", async () => {
    const opened: string[] = [];
    const result = await handoffToExternalAi({
      prompt: "study prompt",
      provider: "claude",
      copy: async () => {
        throw new Error("denied");
      },
      open: (url) => opened.push(url),
    });
    expect(result.copied).toBe(false);
    expect(opened).toEqual(["https://claude.ai/"]);
  });

  it("opens only the selected provider", async () => {
    const opened: string[] = [];
    await handoffToExternalAi({
      prompt: "x",
      provider: "chatgpt",
      copy: async () => true,
      open: (url) => opened.push(url),
    });
    expect(opened).toHaveLength(1);
  });
});

describe("shared study instructions", () => {
  it("are composed into Prompt Lab generatePrompt output", () => {
    const prompt = getPromptById("learn");
    expect(prompt).toBeTruthy();
    const out = generatePrompt(prompt!, { subject: "24ERP304" });
    expect(out).toContain(sharedStudyInstructions());
    expect(out).toContain("tkmce.ac.in");
  });
});
