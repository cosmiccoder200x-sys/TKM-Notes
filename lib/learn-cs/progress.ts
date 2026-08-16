// Learn CS — localStorage persistence + mutation for learning states.
// Mirrors lib/study/progress.ts so all persistence logic stays out of components.

import {
  LearnProgress,
  LearningState,
  LEARNING_STATE_ORDER,
  LearnTopicDetail,
  LearnTopicDetailMap,
} from "./types";

const STORAGE_KEY = "tkm.learncs.progress.v1";
const DETAIL_KEY = "tkm.learncs.detail.v1";

// Spaced-revision intervals in days (spec: 1 / 3 / 7 / 14 / 30).
export const SPACED_INTERVALS_DAYS = [1, 3, 7, 14, 30];

// Quiz performance shortens/stretches the next interval (spec: adapt by quiz).
export function adaptiveIntervalDays(index: number, quizAccuracy: number | undefined): number {
  const base = SPACED_INTERVALS_DAYS[Math.min(index, SPACED_INTERVALS_DAYS.length - 1)];
  if (quizAccuracy === undefined) return base;
  if (quizAccuracy < 0.6) return Math.max(1, Math.round(base / 2)); // weak -> review sooner
  if (quizAccuracy >= 0.9) return Math.round(base * 2); // strong -> stretch
  return base;
}

function safeRead(): Record<string, LearnProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, LearnProgress>;
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed;
  } catch {
    return {};
  }
}

function safeWrite(map: Record<string, LearnProgress>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // storage unavailable — degrade silently
  }
}

export function getLearnProgress(): Record<string, LearnProgress> {
  return safeRead();
}

export function getSubjectLearnProgress(subjectSlug: string): LearnProgress {
  return safeRead()[subjectSlug] ?? {};
}

export function getTopicState(subjectSlug: string, topicSlug: string): LearningState {
  return getSubjectLearnProgress(subjectSlug)[topicSlug] ?? "not-started";
}

export function setTopicState(subjectSlug: string, topicSlug: string, state: LearningState) {
  const map = safeRead();
  const subject = map[subjectSlug] ?? {};
  subject[topicSlug] = state;
  map[subjectSlug] = subject;
  safeWrite(map);
}

export function advanceTopicState(subjectSlug: string, topicSlug: string): LearningState {
  const current = getTopicState(subjectSlug, topicSlug);
  const idx = LEARNING_STATE_ORDER.indexOf(current);
  const next = LEARNING_STATE_ORDER[Math.min(idx + 1, LEARNING_STATE_ORDER.length - 1)];
  setTopicState(subjectSlug, topicSlug, next);
  return next;
}

export function resetSubjectLearn(subjectSlug: string) {
  const map = safeRead();
  delete map[subjectSlug];
  safeWrite(map);

  const details = safeReadDetails();
  for (const key of Object.keys(details)) {
    if (key.startsWith(`${subjectSlug}/`)) delete details[key];
  }
  safeWriteDetails(details);
}

// --- Revision / quiz detail tracking -------------------------------------

function safeReadDetails(): LearnTopicDetailMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(DETAIL_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as LearnTopicDetailMap;
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed;
  } catch {
    return {};
  }
}

function safeWriteDetails(map: LearnTopicDetailMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DETAIL_KEY, JSON.stringify(map));
  } catch {
    // storage unavailable — degrade silently
  }
}

export function topicDetailKey(subjectSlug: string, topicSlug: string): string {
  return `${subjectSlug}/${topicSlug}`;
}

export function getTopicDetail(subjectSlug: string, topicSlug: string): LearnTopicDetail {
  return (
    safeReadDetails()[topicDetailKey(subjectSlug, topicSlug)] ?? {
      revisionCount: 0,
      quizBest: 0,
      quizAttempts: 0,
      quizCorrect: 0,
      quizTotal: 0,
      quizWeak: [],
    }
  );
}

// Mark a topic as learned (first time) — does not overwrite an existing time.
export function markTopicLearned(subjectSlug: string, topicSlug: string) {
  const details = safeReadDetails();
  const key = topicDetailKey(subjectSlug, topicSlug);
  const existing = details[key];
  details[key] = {
    ...(existing ?? { revisionCount: 0, quizBest: 0, quizAttempts: 0, quizCorrect: 0, quizTotal: 0, quizWeak: [] }),
    learnedAt: existing?.learnedAt ?? Date.now(),
  };
  safeWriteDetails(details);
}

// Mark a topic as revised today; bumps the revision counter and timestamp.
export function markTopicRevised(subjectSlug: string, topicSlug: string) {
  const details = safeReadDetails();
  const key = topicDetailKey(subjectSlug, topicSlug);
  const existing = details[key];
  details[key] = {
    ...(existing ?? { revisionCount: 0, quizBest: 0, quizAttempts: 0, quizCorrect: 0, quizTotal: 0, quizWeak: [] }),
    lastRevisedAt: Date.now(),
    revisionCount: (existing?.revisionCount ?? 0) + 1,
  };
  safeWriteDetails(details);
}

export interface QuizResult {
  correct: number;
  total: number;
  weak: string[]; // topic slugs the student missed
}

// Record a quiz outcome and fold accuracy into the spaced-revision schedule.
export function recordQuizResult(subjectSlug: string, topicSlug: string, result: QuizResult) {
  const details = safeReadDetails();
  const key = topicDetailKey(subjectSlug, topicSlug);
  const existing = details[key];
  const accuracy = result.total === 0 ? 0 : result.correct / result.total;
  details[key] = {
    ...(existing ?? { revisionCount: 0, quizAttempts: 0, quizCorrect: 0, quizTotal: 0, quizWeak: [] }),
    quizBest: Math.max(existing?.quizBest ?? 0, Math.round(accuracy * 100)),
    quizAttempts: (existing?.quizAttempts ?? 0) + 1,
    quizCorrect: (existing?.quizCorrect ?? 0) + result.correct,
    quizTotal: (existing?.quizTotal ?? 0) + result.total,
    lastRevisedAt: existing?.lastRevisedAt,
    quizWeak: result.weak,
  };
  safeWriteDetails(details);
}

export interface RevisionDue {
  status: "due" | "not-due" | "unstarted";
  daysSinceLast: number;
  nextDueIn: number; // days from now; <= 0 means due today
}

// Whether a topic is due for spaced revision, based on its revision history.
export function revisionDueStatus(
  subjectSlug: string,
  topicSlug: string,
  now: number = Date.now()
): RevisionDue {
  const detail = getTopicDetail(subjectSlug, topicSlug);
  const last = detail.lastRevisedAt ?? detail.learnedAt;
  if (!last) return { status: "unstarted", daysSinceLast: 0, nextDueIn: 1 };
  const days = (now - last) / 86_400_000;
  const index = Math.min(Math.max(detail.revisionCount - 1, 0), SPACED_INTERVALS_DAYS.length - 1);
  const accuracy =
    detail.quizTotal === 0 ? undefined : detail.quizCorrect / detail.quizTotal;
  const interval = adaptiveIntervalDays(index, accuracy);
  return {
    status: days >= interval ? "due" : "not-due",
    daysSinceLast: days,
    nextDueIn: Math.max(0, interval - days),
  };
}

// Aggregate revision/quiz stats across all tracked topics.
export interface LearnDetailStats {
  learned: number;
  revised: number; // total revision events
  topicsRevised: number; // distinct topics revised at least once
  quizAttempts: number;
  quizCorrect: number;
  quizTotal: number;
  quizAccuracy: number; // 0..100, 0 when no quizzes
}

export function computeLearnDetailStats(map: Record<string, LearnProgress>): LearnDetailStats {
  const stats: LearnDetailStats = {
    learned: 0,
    revised: 0,
    topicsRevised: 0,
    quizAttempts: 0,
    quizCorrect: 0,
    quizTotal: 0,
    quizAccuracy: 0,
  };
  const details = safeReadDetails();
  for (const subjectSlug of Object.keys(map)) {
    for (const topicSlug of Object.keys(map[subjectSlug])) {
      const detail = details[topicDetailKey(subjectSlug, topicSlug)];
      if (!detail) continue;
      if (detail.learnedAt) stats.learned += 1;
      stats.revised += detail.revisionCount;
      if (detail.revisionCount > 0) stats.topicsRevised += 1;
      stats.quizAttempts += detail.quizAttempts;
      stats.quizCorrect += detail.quizCorrect;
      stats.quizTotal += detail.quizTotal;
    }
  }
  stats.quizAccuracy = stats.quizTotal === 0 ? 0 : Math.round((stats.quizCorrect / stats.quizTotal) * 100);
  return stats;
}

// Overall statistics across all tracked subjects.
export interface LearnStats {
  totalTopics: number;
  started: number;
  understood: number;
  practiced: number;
  mastered: number;
  completed: number; // practiced + mastered
  percent: number; // 0..100
}

export function computeLearnStats(map: Record<string, LearnProgress>): LearnStats {
  let totalTopics = 0;
  let started = 0;
  let understood = 0;
  let practiced = 0;
  let mastered = 0;

  for (const subject of Object.values(map)) {
    for (const state of Object.values(subject)) {
      totalTopics += 1;
      if (state === "learning") started += 1;
      else if (state === "understood") understood += 1;
      else if (state === "practiced") practiced += 1;
      else if (state === "mastered") mastered += 1;
    }
  }

  const completed = practiced + mastered;
  return {
    totalTopics,
    started,
    understood,
    practiced,
    mastered,
    completed,
    percent: totalTopics === 0 ? 0 : Math.round((completed / totalTopics) * 100),
  };
}
