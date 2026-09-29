export const EXTERNAL_AI = {
  chatgpt: { id: "chatgpt", label: "Open ChatGPT", url: "https://chatgpt.com/" },
  gemini: { id: "gemini", label: "Open Gemini", url: "https://gemini.google.com/" },
  claude: { id: "claude", label: "Open Claude", url: "https://claude.ai/" },
} as const;

export type ExternalAiId = keyof typeof EXTERNAL_AI;

export const EXTERNAL_AI_PROVIDERS = [EXTERNAL_AI.chatgpt, EXTERNAL_AI.gemini, EXTERNAL_AI.claude] as const;

export function externalAiUrl(id: ExternalAiId): string {
  return EXTERNAL_AI[id].url;
}

export type HandoffCopyFn = (text: string) => Promise<boolean>;
export type HandoffOpenFn = (url: string) => void;

export function defaultOpenExternalAi(url: string): void {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function handoffToExternalAi(input: {
  prompt: string;
  provider: ExternalAiId;
  copy: HandoffCopyFn;
  open?: HandoffOpenFn;
}): Promise<{ copied: boolean; url: string }> {
  const url = externalAiUrl(input.provider);
  let copied = false;
  try {
    copied = Boolean(await input.copy(input.prompt));
  } catch {
    copied = false;
  }
  (input.open ?? defaultOpenExternalAi)(url);
  return { copied, url };
}
