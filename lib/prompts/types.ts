// Prompt Lab Types

export type StudyModeCategory = "learn" | "exam" | "practice" | "revision" | "score";
export type StudyModeId = 
  | "learn"
  | "active-recall"
  | "pyq-intelligence"
  | "exam-answer"
  | "strict-examiner"
  | "problem-solver"
  | "mock-exam"
  | "revision"
  | "mistake-fixer"
  | "score-90-plus";

export interface StudyPromptVariable {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number";
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string; group?: string }[];
  dependsOn?: string; // For conditional fields
}

export interface StudyPrompt {
  id: StudyModeId;
  mode: StudyModeId;
  title: string;
  description: string;
  icon: string;
  category: StudyModeCategory;
  variables: StudyPromptVariable[];
  template: (vars: Record<string, string>) => string;
  defaultSubject?: string;
  defaultModule?: string;
}

export interface PromptBuilderState {
  modeId: StudyModeId | null;
  variables: Record<string, string>;
  generatedPrompt: string;
  isGenerating: boolean;
}

export interface FavoritePrompt {
  id: string;
  modeId: StudyModeId;
  title: string;
  variables: Record<string, string>;
  createdAt: number;
}

export interface RecentPrompt {
  id: string;
  modeId: StudyModeId;
  title: string;
  variables: Record<string, string>;
  usedAt: number;
}

export type CategoryInfo = {
  id: StudyModeCategory;
  label: string;
  description: string;
  modes: StudyModeId[];
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "learn",
    label: "LEARN",
    description: "Build deep understanding",
    modes: ["learn", "active-recall"],
  },
  {
    id: "exam",
    label: "EXAM",
    description: "Exam preparation & answers",
    modes: ["pyq-intelligence", "exam-answer", "strict-examiner", "mock-exam"],
  },
  {
    id: "practice",
    label: "PRACTICE",
    description: "Hands-on problem solving",
    modes: ["problem-solver", "mistake-fixer"],
  },
  {
    id: "revision",
    label: "REVISION",
    description: "Rapid review before exams",
    modes: ["revision"],
  },
  {
    id: "score",
    label: "SCORE BOOST",
    description: "Target high marks",
    modes: ["score-90-plus"],
  },
];

export const CATEGORY_ORDER: StudyModeCategory[] = ["score", "learn", "exam", "practice", "revision"];