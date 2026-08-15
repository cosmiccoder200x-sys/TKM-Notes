// Typing Practice — daily challenge.
// Deterministic per calendar date (no server needed): same challenge for
// everyone on a given day. Completion is stored in localStorage.

import { TYPING_CATEGORIES, sentencesForCategory, pickSentences } from "./catalog";
import { DailyChallenge, TypingDifficulty, TypingResult } from "./types";
import { loadChallenge, saveChallengeAttempt, loadOverrides, loadCustomSentences, loadEdits } from "./storage";

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

export function todayKey(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function getDailyChallenge(): DailyChallenge {
  const date = todayKey();
  const seed = hashString(date);

  const durationOptions = [30, 60, 120];
  const targetOptions = [60, 70, 80];
  const difficultyOptions: TypingDifficulty[] = ["beginner", "intermediate", "advanced"];

  const category = TYPING_CATEGORIES[seed % TYPING_CATEGORIES.length].id;
  const duration = durationOptions[seed % durationOptions.length];
  const targetWpm = targetOptions[Math.floor(seed / 7) % targetOptions.length];
  const difficulty = difficultyOptions[Math.floor(seed / 13) % difficultyOptions.length];

  const pool = sentencesForCategory(category, difficulty, loadOverrides(), loadCustomSentences(), loadEdits());
  const text = pickSentences(pool, 30, 500);

  const stored = loadChallenge();
  const storedResult: TypingResult | undefined =
    stored && stored.date === date && stored.resultId
      ? loadResultById(stored.resultId)
      : undefined;

  return {
    date,
    duration,
    category,
    difficulty,
    targetWpm,
    bestResult: storedResult,
  };
}

function loadResultById(id: string): TypingResult | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem("tkm_typing_results");
    if (!raw) return undefined;
    const list = JSON.parse(raw) as TypingResult[];
    return list.find((r) => r.id === id);
  } catch {
    return undefined;
  }
}

export function isChallengeCompleted(date: string): boolean {
  const stored = loadChallenge();
  return !!stored && stored.date === date && stored.completed;
}

export function recordChallengeResult(date: string, result: TypingResult, completed: boolean): void {
  saveChallengeAttempt(date, result.id, completed);
}
