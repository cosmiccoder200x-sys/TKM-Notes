// Typing Practice — pure calculation engine.
// No React, no localStorage. Everything here is deterministic given inputs,
// so it can be unit-checked and reused between live stats and the result screen.

import { CharStat, TypingResult, TypingSummary, WeakKey } from "./types";

export function computeWpm(correctChars: number, elapsedSeconds: number): number {
  const minutes = elapsedSeconds / 60;
  if (minutes <= 0) return 0;
  return Math.round(correctChars / 5 / minutes);
}

export function computeAccuracy(correctChars: number, totalTyped: number): number {
  if (totalTyped <= 0) return 100;
  return Math.round((correctChars / totalTyped) * 1000) / 10;
}

export interface CharAnalysis {
  stats: CharStat[];
  correct: number;
  incorrect: number;
  errors: number;
}
// Compare what was typed against the target text character by character.
// Backspaces are consumed by the engine, so only final state is analyzed here.
export function analyzeTyped(text: string, typed: string): CharAnalysis {
  const max = Math.min(text.length, typed.length);
  const stats: CharStat[] = [];
  let correct = 0;
  let incorrect = 0;
  for (let i = 0; i < max; i++) {
    const ok = text[i] === typed[i];
    stats.push({ expected: text[i], correct: ok });
    if (ok) correct++;
    else incorrect++;
  }
  return { stats, correct, incorrect, errors: incorrect };
}

// Aggregate error rate per expected character across many char stats.
export function weakKeysFromStats(allStats: CharStat[][]): WeakKey[] {
  const map = new Map<string, { attempted: number; wrong: number }>();
  for (const stats of allStats) {
    for (const s of stats) {
      const entry = map.get(s.expected) ?? { attempted: 0, wrong: 0 };
      entry.attempted++;
      if (!s.correct) entry.wrong++;
      map.set(s.expected, entry);
    }
  }
  const list: WeakKey[] = [];
  for (const [char, v] of map.entries()) {
    if (v.attempted < 3) continue;
    list.push({
      char,
      attempted: v.attempted,
      wrong: v.wrong,
      errorRate: Math.round((v.wrong / v.attempted) * 1000) / 10,
    });
  }
  return list
    .filter((k) => k.char.trim() !== "")
    .sort((a, b) => b.errorRate - a.errorRate)
    .slice(0, 8);
}

export function summarizeResults(results: TypingResult[]): TypingSummary {
  if (results.length === 0) {
    return {
      tests: 0,
      totalSeconds: 0,
      bestWpm: 0,
      bestAccuracy: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      totalCorrectChars: 0,
      totalTypedChars: 0,
    };
  }
  const tests = results.length;
  const totalSeconds = results.reduce((sum, r) => sum + r.duration, 0);
  const totalCorrectChars = results.reduce((sum, r) => sum + r.correctChars, 0);
  const totalTypedChars = results.reduce((sum, r) => sum + r.totalChars, 0);
  const bestWpm = Math.max(...results.map((r) => r.wpm));
  const bestAccuracy = Math.max(...results.map((r) => r.accuracy));
  const averageWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / tests);
  const averageAccuracy = Math.round((results.reduce((sum, r) => sum + r.accuracy, 0) / tests) * 10) / 10;
  return {
    tests,
    totalSeconds,
    bestWpm,
    bestAccuracy,
    averageWpm,
    averageAccuracy,
    totalCorrectChars,
    totalTypedChars,
  };
}

// True personal best score (WPM weighted by accuracy) for result comparison.
export function scoreOf(result: { wpm: number; accuracy: number }): number {
  return Math.round(result.wpm * (result.accuracy / 100) * 10) / 10;
}

export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
