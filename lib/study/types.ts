// Student study-progress model for TKM Notes.
// Kept fully separate from the academic content model (lib/types.ts, lib/notes/).
// Everything is stored locally; stable subject codes + module ids are used as keys.

import type { ProgramId } from "../types";

export type AttemptResult = "correct" | "partial" | "incorrect";

export interface ModuleProgress {
  attempts: number;
  correct: number;
  partial: number;
  incorrect: number;
  reviewed: boolean;
  lastStudied?: number; // epoch ms
}

// subjectCode -> moduleId -> progress
export type ProgressMap = Record<string, Record<string, ModuleProgress>>;

export type MasteryStatus =
  | "strong"
  | "good"
  | "needs-practice"
  | "weak"
  | "not-assessed";

export interface ModuleMastery {
  score: number | null; // null when not assessed
  status: MasteryStatus;
  attempts: number;
  confidence: number; // 0..1, grows with more attempts
}

export type NightBeforeTarget = "pass" | "70" | "80" | "90" | "full";

export type RevisionTier = "must-know" | "high-value" | "if-time";

export type RevisionItemKind =
  | "definitions"
  | "concepts"
  | "formulas"
  | "questions"
  | "diagrams"
  | "revision"
  | "worked-examples"
  | "self-check";

export interface RevisionItem {
  id: string;
  moduleId: string;
  moduleTitle: string;
  tier: RevisionTier;
  kind: RevisionItemKind;
  label: string;
  weightage?: "low" | "medium" | "high";
  index: number; // index of the item within its module's array for that kind
}

export interface RevisionSection {
  id: string;
  order: number;
  title: string;
  minutes: number;
  tier: RevisionTier;
  kinds: RevisionItemKind[];
  items: RevisionItem[];
}

export interface NightBeforePlan {
  subjectCode: string;
  subjectName: string;
  availableMinutes: number;
  target: NightBeforeTarget;
  sections: RevisionSection[];
  totalMinutes: number;
}

export interface NightBeforeConfig {
  minutes: number;
  target: NightBeforeTarget;
}

export interface NightBeforeSession {
  subjectCode: string;
  programId: ProgramId;
  config: NightBeforeConfig;
  plan: NightBeforePlan;
  completedSections: string[];
  reviewedItems: string[];
  startedAt: number;
  finished: boolean;
}
