// Typing Practice — catalog metadata + sentence selection helpers.
// Categories, difficulties, and the pure logic that turns a test config into
// the exact text a user will type. No React, no localStorage here.

export { getSeedSentences } from "./sentences";
import { getSeedSentences } from "./sentences";
import {
  TypingCategoryId,
  TypingCategoryMeta,
  TypingDifficulty,
  TypingSentence,
  TypingTestConfig,
  TopicSource,
} from "./types";

export const TYPING_CATEGORIES: TypingCategoryMeta[] = [
  { id: "general", label: "General", shortLabel: "GEN" },
  { id: "programming", label: "Programming", shortLabel: "PRG" },
  { id: "python", label: "Python", shortLabel: "PY" },
  { id: "cpp", label: "C++", shortLabel: "C++" },
  { id: "ds", label: "Data Structures", shortLabel: "DSA" },
  { id: "algorithms", label: "Algorithms", shortLabel: "ALG" },
  { id: "dbms", label: "DBMS", shortLabel: "DBMS" },
  { id: "os", label: "Operating Systems", shortLabel: "OS" },
  { id: "networks", label: "Computer Networks", shortLabel: "NET" },
  { id: "aiml", label: "AI / ML", shortLabel: "AI" },
  { id: "webdev", label: "Web Development", shortLabel: "WEB" },
  { id: "security", label: "Cybersecurity", shortLabel: "SEC" },
  { id: "math", label: "Mathematics", shortLabel: "MATH" },
  { id: "csfundamentals", label: "CS Fundamentals", shortLabel: "CSF" },
];

export const TYPING_DIFFICULTIES: { id: TypingDifficulty; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export function categoryMeta(id: TypingCategoryId): TypingCategoryMeta {
  return TYPING_CATEGORIES.find((c) => c.id === id) ?? TYPING_CATEGORIES[0];
}

export function shuffle<T>(input: T[]): T[] {
  const arr = input.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function filterPublished(sentences: TypingSentence[], overrides: Record<string, boolean>): TypingSentence[] {
  return sentences.filter((s) => overrides[s.id] !== false);
}

// The base sentence pool: seed sentences + admin additions, with admin edits
// applied (custom wins on id collision), deletions removed, unpublished hidden.
export function allSentences(
  overrides: Record<string, boolean> = {},
  custom: TypingSentence[] = [],
  edits: Record<string, TypingSentence> = {}
): TypingSentence[] {
  const byId = new Map<string, TypingSentence>();
  for (const s of getSeedSentences()) byId.set(s.id, s);
  for (const s of custom) byId.set(s.id, s);
  for (const [id, edit] of Object.entries(edits)) {
    byId.set(id, { ...(byId.get(id) ?? ({} as TypingSentence)), ...edit, id });
  }
  const deleted = new Set(
    (typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("tkm_typing_deleted") ?? "[]") : []) as string[]
  );
  return filterPublished([...byId.values()], overrides).filter((s) => !deleted.has(s.id));
}

export interface SentenceSource {
  sentences: TypingSentence[];
  label: string;
}

export type { TopicSource };

export function sentencesForCategory(
  category: TypingCategoryId,
  difficulty: TypingDifficulty | "any",
  overrides: Record<string, boolean> = {},
  custom: TypingSentence[] = [],
  edits: Record<string, TypingSentence> = {}
): TypingSentence[] {
  return allSentences(overrides, custom, edits).filter(
    (s) => s.category === category && (difficulty === "any" || s.difficulty === difficulty)
  );
}

export function sentencesContaining(
  chars: string[],
  overrides: Record<string, boolean> = {},
  custom: TypingSentence[] = [],
  edits: Record<string, TypingSentence> = {}
): TypingSentence[] {
  const targets = chars.filter((c) => c.trim() !== "");
  if (targets.length === 0) return [];
  return allSentences(overrides, custom, edits).filter((s) =>
    targets.every((c) => s.sentence.toLowerCase().includes(c.toLowerCase()))
  );
}

export function pickSentences(
  pool: TypingSentence[],
  count: number,
  maxTotalChars = 420
): string {
  const picked: string[] = [];
  const shuffled = shuffle(pool);
  let total = 0;
  for (const s of shuffled) {
    if (picked.length >= count) break;
    total += s.sentence.length + 1;
    if (total > maxTotalChars && picked.length > 0) break;
    picked.push(s.sentence);
  }
  if (picked.length === 0 && pool.length > 0) {
    picked.push(pool[0].sentence);
  }
  return picked.join(" ");
}

// Build the full target text for any non-learning test config.
export function buildTestText(
  config: TypingTestConfig,
  overrides: Record<string, boolean> = {},
  custom: TypingSentence[] = [],
  edits: Record<string, TypingSentence> = {}
): string {
  const pool =
    config.category != null
      ? sentencesForCategory(config.category, config.difficulty ?? "any", overrides, custom, edits)
      : allSentences(overrides, custom, edits);

  switch (config.mode) {
    case "words":
      return pickSentences(pool, config.wordCount ?? 25, 2400);
    case "sentences":
      return pickSentences(pool, config.sentenceCount ?? 5, 4200);
    case "custom":
      return (config.customText ?? "").trim();
    default:
      return pickSentences(pool, 25, 420);
  }
}
