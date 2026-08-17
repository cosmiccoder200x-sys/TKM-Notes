// LocalStorage persistence + mutation for student study progress.
// Isolated here so no progress logic lives inside React components.
// Progress is isolated per (program, subject) via subjectKey(programId, code):
// CSE "Algorithms" (24CSP304) and CSE[AI] "DSA" (24CSP304) never share data.

import { ProgressMap, ModuleProgress, AttemptResult } from "./types";

const STORAGE_KEY = "tkm.study.progress.v1";

// Canonical storage key for a subject scoped to its program.
export function progressSubjectKey(programId: string, subjectCode: string): string {
  return `${programId}:${subjectCode}`;
}

function safeRead(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

function safeWrite(map: ProgressMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // storage unavailable (private mode / quota) — degrade silently
  }
}

export function getProgress(): ProgressMap {
  return safeRead();
}

export function getSubjectProgress(subjectKey: string): Record<string, ModuleProgress> {
  return safeRead()[subjectKey] ?? {};
}

export function getModuleProgress(subjectKey: string, moduleId: string): ModuleProgress | undefined {
  return getSubjectProgress(subjectKey)[moduleId];
}

export function recordAttempt(subjectKey: string, moduleId: string, result: AttemptResult) {
  const map = safeRead();
  const subject = map[subjectKey] ?? {};
  const rec = subject[moduleId] ?? { attempts: 0, correct: 0, partial: 0, incorrect: 0, reviewed: false };

  rec.attempts += 1;
  if (result === "correct") rec.correct += 1;
  else if (result === "partial") rec.partial += 1;
  else rec.incorrect += 1;
  rec.lastStudied = Date.now();

  subject[moduleId] = rec;
  map[subjectKey] = subject;
  safeWrite(map);
}

export function markModuleReviewed(subjectKey: string, moduleId: string) {
  const map = safeRead();
  const subject = map[subjectKey] ?? {};
  const rec = subject[moduleId] ?? { attempts: 0, correct: 0, partial: 0, incorrect: 0, reviewed: false };
  rec.reviewed = true;
  rec.lastStudied = Date.now();
  subject[moduleId] = rec;
  map[subjectKey] = subject;
  safeWrite(map);
}

export function resetSubject(subjectKey: string) {
  const map = safeRead();
  delete map[subjectKey];
  safeWrite(map);
}

export function totalAssessedModules(map: ProgressMap): number {
  let n = 0;
  for (const subject of Object.values(map)) {
    for (const rec of Object.values(subject)) {
      if (rec.attempts > 0) n += 1;
    }
  }
  return n;
}