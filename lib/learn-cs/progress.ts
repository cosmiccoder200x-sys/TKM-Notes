// Learn CS — localStorage persistence + mutation for learning states.
// Mirrors lib/study/progress.ts so all persistence logic stays out of components.

import { LearnProgress, LearningState, LEARNING_STATE_ORDER } from "./types";

const STORAGE_KEY = "tkm.learncs.progress.v1";

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
