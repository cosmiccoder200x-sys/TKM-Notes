import type { StudyModeId } from "@/lib/prompts/types";
import type { SyllabusSource } from "@/lib/syllabus/types";

export type LearningTask = "teach" | "recall" | "practice" | "exam" | "fix";

export const LEARNING_TASKS: LearningTask[] = ["teach", "recall", "practice", "exam", "fix"];

export interface TaskTopicState {
  ref: string;
  title: string;
  mastery: number | null;
  mistakes: string[];
  revisionDue?: boolean;
}

export interface TaskPyq {
  question: string;
  weightage: "low" | "medium" | "high";
  kind: "actual" | "variation" | "new";
}

export interface TaskPromptContext {
  college?: string;
  university: string;
  scheme: string;
  branch: string;
  semester: string;
  subjectCode: string;
  subjectName: string;
  moduleId: string;
  moduleTitle: string;
  topic?: { ref: string; title: string };
  syllabusTitles?: string[];
  syllabusSource?: SyllabusSource;
  learningTask?: LearningTask;
  topics?: TaskTopicState[];
  mistakes?: string[];
  pyqs?: TaskPyq[];
  topicPriority?: string;
  timeMinutes?: number;
  studentLevel?: string;
}

export interface BuiltTaskPrompt {
  task: LearningTask;
  text: string;
  contextChars: number;
}

export const TASK_FOR_MODE: Record<StudyModeId, LearningTask> = {
  learn: "teach",
  "syllabus-complete": "teach",
  "active-recall": "recall",
  revision: "recall",
  "problem-solver": "practice",
  "mistake-fixer": "fix",
  "strict-examiner": "fix",
  "exam-answer": "exam",
  "mock-exam": "exam",
  "pyq-intelligence": "exam",
  "score-90-plus": "exam",
};
