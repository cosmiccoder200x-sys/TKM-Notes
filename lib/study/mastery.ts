// Mastery calculation. Deterministic, pure, testable — no API calls.
// Scoring: correct +1, partial +0.5, incorrect +0, unattempted = no score.

import { ModuleProgress, MasteryStatus, ModuleMastery } from "./types";

// Single source of truth for status thresholds (no magic numbers elsewhere).
export const MASTERY_THRESHOLDS: { min: number; status: MasteryStatus; label: string }[] = [
  { min: 90, status: "strong", label: "Strong" },
  { min: 75, status: "good", label: "Good" },
  { min: 50, status: "needs-practice", label: "Needs practice" },
  { min: 1, status: "weak", label: "Weak" },
  { min: 0, status: "not-assessed", label: "Not assessed" },
];

export function statusForScore(score: number | null): MasteryStatus {
  if (score === null) return "not-assessed";
  for (const t of MASTERY_THRESHOLDS) {
    if (score >= t.min) return t.status;
  }
  return "not-assessed";
}

export function masteryLabel(status: MasteryStatus): string {
  const t = MASTERY_THRESHOLDS.find((x) => x.status === status);
  return t ? t.label : "Not assessed";
}

// Confidence: 0..1 based on attempt count (plateaus after a handful of attempts).
export function confidenceForAttempts(attempts: number): number {
  if (attempts <= 0) return 0;
  return Math.min(1, attempts / 5);
}

export function calculateModuleMastery(progress?: ModuleProgress): ModuleMastery {
  if (!progress || progress.attempts <= 0) {
    return { score: null, status: "not-assessed", attempts: 0, confidence: 0 };
  }
  const weighted = progress.correct + progress.partial * 0.5;
  const score = Math.round((weighted / progress.attempts) * 100);
  return {
    score,
    status: statusForScore(score),
    attempts: progress.attempts,
    confidence: confidenceForAttempts(progress.attempts),
  };
}

export interface SubjectMasterySummary {
  overall: number | null; // mean of assessed module scores; null if none assessed
  assessedModules: number;
  totalModules: number;
  needsAttention: number; // assessed modules below "good", plus not-assessed modules
  strong: number; // assessed modules >= 90
  moduleMap: Record<string, ModuleMastery>;
}

export function calculateSubjectMastery(
  subjectCode: string,
  moduleIds: string[],
  progressMap: Record<string, ModuleProgress>
): SubjectMasterySummary {
  const moduleMap: Record<string, ModuleMastery> = {};
  let sum = 0;
  let assessed = 0;
  let strong = 0;
  let needsAttention = 0;

  for (const id of moduleIds) {
    const mastery = calculateModuleMastery(progressMap[id]);
    moduleMap[id] = mastery;
    if (mastery.score !== null) {
      sum += mastery.score;
      assessed += 1;
      if (mastery.status === "strong") strong += 1;
      if (mastery.status === "weak" || mastery.status === "needs-practice") needsAttention += 1;
    } else {
      needsAttention += 1; // not assessed = needs attention
    }
  }

  return {
    overall: assessed > 0 ? Math.round(sum / assessed) : null,
    assessedModules: assessed,
    totalModules: moduleIds.length,
    needsAttention,
    strong,
    moduleMap,
  };
}
