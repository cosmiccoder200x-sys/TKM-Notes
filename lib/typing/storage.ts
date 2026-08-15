// Typing Practice — localStorage persistence layer.
// The rest of TKM Notes persists progress the same way (no backend), so results,
// admin sentence edits, weak-key history, and the daily challenge live here.

import { TypingResult, TypingSentence } from "./types";
import { scoreOf } from "./engine";

const KEYS = {
  results: "tkm_typing_results",
  overrides: "tkm_typing_overrides",
  customSentences: "tkm_typing_custom_sentences",
  deletedIds: "tkm_typing_deleted",
  challenge: "tkm_typing_challenge",
  edits: "tkm_typing_sentence_edits",
};

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked — fail silently
  }
}

export function loadResults(): TypingResult[] {
  return readJSON<TypingResult[]>(KEYS.results, []).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  );
}

export function saveResult(result: TypingResult): void {
  const results = loadResults();
  results.push(result);
  writeJSON(KEYS.results, results);
}

export function bestScore(): number {
  const results = loadResults();
  if (results.length === 0) return 0;
  return Math.max(...results.map((r) => scoreOf(r)));
}

export function previousBestWpm(): number {
  const results = loadResults();
  if (results.length === 0) return 0;
  return Math.max(...results.map((r) => r.wpm));
}

// ── Admin content management (published flags) ─────────────────────────────

export function loadOverrides(): Record<string, boolean> {
  return readJSON<Record<string, boolean>>(KEYS.overrides, {});
}

export function setPublished(id: string, published: boolean): void {
  const o = loadOverrides();
  o[id] = published;
  writeJSON(KEYS.overrides, o);
}

export function loadCustomSentences(): TypingSentence[] {
  return readJSON<TypingSentence[]>(KEYS.customSentences, []);
}

export function loadEdits(): Record<string, TypingSentence> {
  return readJSON<Record<string, TypingSentence>>(KEYS.edits, {});
}

export function saveEdit(id: string, sentence: TypingSentence): void {
  const edits = loadEdits();
  edits[id] = { ...sentence, id };
  writeJSON(KEYS.edits, edits);
}

export function removeEdit(id: string): void {
  const edits = loadEdits();
  delete edits[id];
  writeJSON(KEYS.edits, edits);
}

export function addCustomSentence(sentence: TypingSentence): void {
  const list = loadCustomSentences();
  list.push(sentence);
  writeJSON(KEYS.customSentences, list);
}

export function updateCustomSentence(updated: TypingSentence): void {
  const list = loadCustomSentences().map((s) =>
    s.id === updated.id ? updated : s
  );
  writeJSON(KEYS.customSentences, list);
}

export function deleteSentenceById(id: string): void {
  const custom = loadCustomSentences().filter((s) => s.id !== id);
  writeJSON(KEYS.customSentences, custom);
  const edits = loadEdits();
  delete edits[id];
  writeJSON(KEYS.edits, edits);
  const deleted = readJSON<string[]>(KEYS.deletedIds, []);
  if (!deleted.includes(id)) {
    deleted.push(id);
  }
  writeJSON(KEYS.deletedIds, deleted);
  const o = loadOverrides();
  delete o[id];
  writeJSON(KEYS.overrides, o);
}

export function isDeleted(id: string): boolean {
  return readJSON<string[]>(KEYS.deletedIds, []).includes(id);
}

export function loadDeletedIds(): string[] {
  return readJSON<string[]>(KEYS.deletedIds, []);
}

export function restoreSentence(id: string): void {
  const deleted = loadDeletedIds().filter((d) => d !== id);
  writeJSON(KEYS.deletedIds, deleted);
}

// ── Daily challenge ────────────────────────────────────────────────────────

export interface StoredChallenge {
  date: string;
  completed: boolean;
  resultId?: string;
}

export function loadChallenge(): StoredChallenge | null {
  return readJSON<StoredChallenge | null>(KEYS.challenge, null);
}

export function saveChallengeAttempt(date: string, resultId: string, completed: boolean): void {
  writeJSON(KEYS.challenge, { date, completed, resultId });
}
