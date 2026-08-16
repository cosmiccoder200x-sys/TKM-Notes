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

// Fine-grained categories for browsing the catalog (spec: 17 categories).
export type LearnFineCategoryId =
  | "programming"
  | "dsa"
  | "algorithms"
  | "dbms"
  | "os"
  | "networks"
  | "coa"
  | "se"
  | "web"
  | "security"
  | "cloud"
  | "ai"
  | "ml"
  | "ds"
  | "math"
  | "toc"
  | "distributed";

export interface LearnFineCategory {
  id: LearnFineCategoryId;
  order: number;
  label: string;
  shortLabel: string;
  description: string;
  difficulty: SubjectDifficulty;
  estimatedHours: number;
  whyItMatters: string;
}

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
  complexity?: string; // one-line time/space complexity note (rendered as-is)
  related?: string[]; // related topic slugs within the same subject
  question?: string; // active-learning prompt for the topic (Question → Think)
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

// Cross-link to a canonical TKM syllabus subject (never duplicated here).
export interface LearnSyllabusLink {
  programId: "ER" | "CS" | "CS_AI";
  subjectCode: string;
  subjectName: string;
  semesterId: string;
  subjectSlug: string;
  moduleId?: string;
}

// A learn-cs topic can point at the TKM subject that covers the same idea.
export interface LearnTopicSyllabusLink {
  subjectSlug: string;
  topicSlug: string;
  links: LearnSyllabusLink[];
}

// Roadmap level (spec: levels 0–5). A level is an ordered set of subjects.
export interface LearnRoadmapLevel {
  level: number;
  title: string;
  description: string;
  subjects: string[]; // learn-cs subject slugs
}

// A learning goal a student can pick on /learn-cs/roadmap.
export interface LearnGoal {
  id: string;
  label: string;
  description: string;
  roadmap: string[]; // ordered subject slugs (subset of the full roadmap)
}

// topicSlug -> state, stored per subject.
export type LearnProgress = Record<string, LearningState>;

// Revision / quiz metadata persisted per (subject, topic).
export interface LearnTopicDetail {
  learnedAt?: number; // epoch ms when first marked learned
  lastRevisedAt?: number; // epoch ms of the most recent revision
  revisionCount: number; // times revised
  quizBest: number; // best quiz score 0..100
  quizAttempts: number; // quizzes taken
  quizCorrect: number; // correct answers across quizzes
  quizTotal: number; // answers answered across quizzes
  quizWeak: string[]; // topic slugs flagged weak (from quiz misses)
}

export type LearnTopicDetailMap = Record<string, LearnTopicDetail>; // `${subjectSlug}/${topicSlug}`

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