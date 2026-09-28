import type { ProgramId } from "@/lib/types";
import type { LearningTask } from "./prompts/types";

export type EvidenceKind = "taught" | "recall" | "practice" | "pyq" | "selfcheck" | "reviewed";
export type EvidenceResult = "correct" | "partial" | "incorrect" | "done";

export interface TopicLearningState {
  ref: string;
  moduleCode: string;
  topicIndex: number | null;
  title: string;
  mastery: number | null;
  exposed: boolean;
  revisionDueAt: number | null;
  lastStudiedAt: number | null;
}

export interface MistakeRecord {
  id: string;
  topicRef: string;
  topicTitle: string;
  note: string;
  createdAt: number;
  resolved: boolean;
}

export interface StudySessionRecord {
  id: string;
  planId: string;
  task: LearningTask;
  topicRef: string | null;
  topicTitle: string | null;
  minutes: number;
  startedAt: number;
  finishedAt: number | null;
}

export interface SubjectLearningState {
  subjectKey: string;
  programId: ProgramId;
  subjectCode: string;
  topics: Record<string, TopicLearningState>;
  mistakes: MistakeRecord[];
  sessions: StudySessionRecord[];
  updatedAt: number;
}

export interface RecommendedAction {
  task: LearningTask;
  topicRef: string | null;
  topicTitle: string | null;
  moduleId: string | null;
  moduleTitle: string | null;
  reason: string;
  sessionMinutes: number;
}

export interface SessionStep {
  label: string;
  minutes: number;
}

export interface StudySessionPlan {
  id: string;
  subjectKey: string;
  task: LearningTask;
  topicRef: string | null;
  topicTitle: string | null;
  minutes: number;
  steps: SessionStep[];
  startedAt: number;
}
