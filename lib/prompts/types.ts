// Prompt Lab Types

export type StudyModeCategory = "learn" | "practice" | "exam" | "revision" | "analyze";
export type PromptImportance = "essential" | "high" | "useful" | "specialized";
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
  | "score-90-plus"
  | "syllabus-complete";

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
  bestFor: string;
  whenToUse: string;
  importance: PromptImportance;
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
    modes: ["learn", "active-recall", "syllabus-complete"],
  },
  {
    id: "practice",
    label: "PRACTICE",
    description: "Solve problems & fix mistakes",
    modes: ["problem-solver", "mistake-fixer"],
  },
  {
    id: "exam",
    label: "EXAM",
    description: "Prepare for the actual exam",
    modes: ["pyq-intelligence", "exam-answer", "mock-exam", "score-90-plus"],
  },
  {
    id: "revision",
    label: "REVISION",
    description: "Rapid review before exams",
    modes: ["revision"],
  },
  {
    id: "analyze",
    label: "ANALYZE",
    description: "Evaluate, compare & improve",
    modes: ["strict-examiner"],
  },
];

export const CATEGORY_ORDER: StudyModeCategory[] = ["learn", "practice", "exam", "revision", "analyze"];

export const IMPORTANCE_META: Record<PromptImportance, { label: string; hint: string }> = {
  essential: { label: "ESSENTIAL", hint: "Core prompt every student should use" },
  high: { label: "HIGH VALUE", hint: "Delivers strong results in most situations" },
  useful: { label: "USEFUL", hint: "Helpful for specific study goals" },
  specialized: { label: "SPECIALIZED", hint: "Best when you need a very specific outcome" },
};