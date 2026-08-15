// Learn CS — data model.
// A self-directed, beyond-college computer science curriculum.
// Kept fully separate from the TKM syllabus model (lib/types.ts) so the two
// learning experiences stay distinct: TKM Syllabus = what the college teaches,
// Learn CS = structured, stage-based CS learning for any student.

export type LearnCategoryId =
  | "programming"
  | "cs-fundamentals"
  | "math"
  | "development"
  | "ai-data"
  | "advanced";

export type LearnStageId =
  | "fundamentals"
  | "core"
  | "intermediate"
  | "advanced"
  | "practice"
  | "projects"
  | "interview";

export type TopicDifficulty = "beginner" | "intermediate" | "advanced";
export type SubjectDifficulty = "beginner" | "intermediate" | "advanced";

// Persisted learning state for a single topic.
export type LearningState = "not-started" | "learning" | "understood" | "practiced" | "mastered";

export interface LearnCategory {
  id: LearnCategoryId;
  order: number;
  label: string;
  shortLabel: string;
  description: string;
}

export interface LearnStage {
  id: LearnStageId;
  order: number;
  title: string;
  subtitle: string;
}

export interface LearnTopic {
  slug: string;
  title: string;
  difficulty: TopicDifficulty;
  estimatedMinutes: number;
  summary: string;
  whyMatters?: string;
  keyIdea?: string;
  example?: string;
  intuition?: string;
  commonMistakes?: string[];
  practice?: string[];
  quickRevision?: string[];
  prerequisites?: string[];
}

export interface LearnSubjectStage {
  stage: LearnStageId;
  topics: LearnTopic[];
}

export interface LearnSubject {
  slug: string;
  name: string;
  category: LearnCategoryId;
  icon: string;
  description: string;
  difficulty: SubjectDifficulty;
  estimatedHours: number;
  prerequisites?: string[];
  stages: LearnSubjectStage[];
}

// topicSlug -> state, stored per subject.
export type LearnProgress = Record<string, LearningState>;

export const LEARNING_STATE_ORDER: LearningState[] = [
  "not-started",
  "learning",
  "understood",
  "practiced",
  "mastered",
];

export const DIFFICULTY_META: Record<TopicDifficulty, { label: string; hint: string }> = {
  beginner: { label: "BEGINNER", hint: "Foundations — no prior knowledge assumed" },
  intermediate: { label: "INTERMEDIATE", hint: "Needs core concepts first" },
  advanced: { label: "ADVANCED", hint: "For deep mastery and interviews" },
};