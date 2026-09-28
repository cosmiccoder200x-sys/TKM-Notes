import type { EvidenceKind, EvidenceResult } from "./types";

export const MASTERY_MIN = 0;
export const MASTERY_MAX = 6;

const LABELS = [
  "Not Started",
  "Familiar",
  "Basic Understanding",
  "Standard Problem Solving",
  "Exam Ready",
  "Independent Mastery",
  "Advanced",
] as const;

export function masteryLabel6(mastery: number | null): string {
  if (mastery === null) return "Not Started";
  return LABELS[Math.max(MASTERY_MIN, Math.min(MASTERY_MAX, Math.round(mastery)))] ?? "Not Started";
}

export interface MasteryEvidence {
  kind: EvidenceKind;
  result: EvidenceResult;
  hard?: boolean;
}

function stepFor(evidence: MasteryEvidence): number {
  const { kind, result, hard } = evidence;
  if (kind === "taught" || kind === "reviewed" || result === "done") return 0;
  if (result === "partial") return 0;
  if (result === "incorrect") return -1;
  if (kind === "pyq") return 2;
  if (kind === "practice") return hard ? 2 : 1;
  return 1;
}

export function applyMasteryEvidence(current: number | null, evidence: MasteryEvidence): number | null {
  if (evidence.kind === "taught") return current;
  if (evidence.kind === "reviewed") return current === null ? 1 : current;
  if (evidence.result === "done") return current;
  const base = current ?? 0;
  const next = base + stepFor(evidence);
  if (current === null && evidence.result === "incorrect") return 0;
  return Math.max(MASTERY_MIN, Math.min(MASTERY_MAX, next));
}
