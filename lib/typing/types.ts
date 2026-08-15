// Typing Practice — data model.
// Fully static + localStorage, matching the rest of TKM Notes (no backend).
// Seeded sentences ship as typed data; admin edits live in localStorage.

export type TypingModeId = "timed" | "words" | "sentences" | "learning" | "custom";

export type TypingDifficulty = "beginner" | "intermediate" | "advanced";

export type TypingCategoryId =
  | "general"
  | "programming"
  | "python"
  | "cpp"
  | "ds"
  | "algorithms"
  | "dbms"
  | "os"
  | "networks"
  | "aiml"
  | "webdev"
  | "security"
  | "math"
  | "csfundamentals";

export interface TypingCategoryMeta {
  id: TypingCategoryId;
  label: string;
  shortLabel: string;
}

export interface TypingSentence {
  id: string;
  sentence: string;
  category: TypingCategoryId;
  difficulty: TypingDifficulty;
  subject?: string;
  topic?: string;
  program?: string;
  semester?: string;
  source?: "curated" | "syllabus" | "learn-cs" | "custom";
}

export interface TypingTestConfig {
  mode: TypingModeId;
  duration?: number;
  wordCount?: number;
  sentenceCount?: number;
  category?: TypingCategoryId;
  difficulty?: TypingDifficulty;
  program?: string;
  semester?: string;
  subjectSlug?: string;
  topicSlug?: string;
  customText?: string;
}

export interface CharStat {
  expected: string;
  correct: boolean;
}

export interface TypingResult {
  id: string;
  createdAt: string;
  mode: TypingModeId;
  category?: TypingCategoryId;
  difficulty?: TypingDifficulty;
  program?: string;
  semester?: string;
  subject?: string;
  topic?: string;
  duration: number;
  targetDuration?: number;
  wpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  charStats: CharStat[];
  learningLabel?: string;
}

export interface TypingSummary {
  tests: number;
  totalSeconds: number;
  bestWpm: number;
  bestAccuracy: number;
  averageWpm: number;
  averageAccuracy: number;
  totalCorrectChars: number;
  totalTypedChars: number;
}

export interface WeakKey {
  char: string;
  attempted: number;
  wrong: number;
  errorRate: number; // 0-100
}

export interface TopicSource {
  label: string;
  topic: string;
  source: "curated" | "syllabus" | "learn-cs";
  pool: TypingSentence[];
}

export interface DailyChallenge {
  date: string;
  duration: number;
  category: TypingCategoryId;
  difficulty: TypingDifficulty;
  targetWpm: number;
  bestResult?: TypingResult;
}
