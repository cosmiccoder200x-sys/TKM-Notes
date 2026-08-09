// Prompt Lab Utilities

import { StudyPrompt, StudyPromptVariable, FavoritePrompt, RecentPrompt, StudyModeId } from "./types";
import { Subject, Module } from "@/lib/types";
import { subjects, findSubject } from "@/lib/content";
import registry from "@/lib/notes";
import { 
  StudyContext, 
  ContextualPromptVars, 
  buildContextFromParams, 
  enrichContext,
  contextToPromptVars,
  generatePromptLabUrl,
  getSubjectEvaluationCriteria,
  getSubjectProblemGuidance,
  getSubjectAnswerStructure,
  QuickAction,
  MODULE_QUICK_ACTIONS,
  QUESTION_ACTIONS
} from "./context";

// Re-export context utilities
export type { StudyContext, ContextualPromptVars, QuickAction };
export { 
  buildContextFromParams, 
  enrichContext,
  contextToPromptVars,
  generatePromptLabUrl,
  getSubjectEvaluationCriteria,
  getSubjectProblemGuidance,
  getSubjectAnswerStructure,
  MODULE_QUICK_ACTIONS,
  QUESTION_ACTIONS
};

// Populate subject options for select dropdowns
export function getSubjectOptions(): { value: string; label: string }[] {
  return subjects.map(s => ({
    value: s.code,
    label: `${s.name} (${s.code})`,
  }));
}

// Get modules for a subject
export function getModuleOptions(subjectCode: string): { value: string; label: string }[] {
  const content = registry[subjectCode];
  if (!content) return [];
  return content.modules.map((m, i) => ({
    value: m.id,
    label: `Module ${i + 1}: ${m.title}`,
  }));
}

// Get module title by ID
export function getModuleTitle(subjectCode: string, moduleId: string): string {
  const content = registry[subjectCode];
  if (!content) return moduleId;
  const mod = content.modules.find(m => m.id === moduleId);
  return mod ? mod.title : moduleId;
}

// Populate variables with dynamic options
export function populatePromptVariables(prompt: StudyPrompt, subjectCode?: string): StudyPromptVariable[] {
  return prompt.variables.map(v => {
    if (v.key === "subject") {
      return { ...v, options: getSubjectOptions() };
    }
    if (v.key === "module" && subjectCode) {
      return { ...v, options: getModuleOptions(subjectCode) };
    }
    if (v.key === "marks") {
      return { ...v, options: [
        { value: "2", label: "2 marks" },
        { value: "5", label: "5 marks" },
        { value: "8", label: "8 marks" },
        { value: "10", label: "10 marks" },
      ]};
    }
    return v;
  });
}

// Generate prompt from template
export function generatePrompt(prompt: StudyPrompt, variables: Record<string, string>): string {
  return prompt.template(variables);
}

// LocalStorage keys
const FAVORITES_KEY = "tkm-prompt-favorites";
const RECENTS_KEY = "tkm-prompt-recents";

// Favorites management
export function getFavorites(): FavoritePrompt[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(favorite: Omit<FavoritePrompt, "id" | "createdAt">): FavoritePrompt {
  const favorites = getFavorites();
  const newFav: FavoritePrompt = {
    ...favorite,
    id: `${favorite.modeId}-${Date.now()}`,
    createdAt: Date.now(),
  };
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([newFav, ...favorites]));
  return newFav;
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter(f => f.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(modeId: StudyModeId, variables: Record<string, string>): boolean {
  const favorites = getFavorites();
  return favorites.some(f => 
    f.modeId === modeId && 
    JSON.stringify(f.variables) === JSON.stringify(variables)
  );
}

// Recents management
export function getRecents(): RecentPrompt[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(RECENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addRecent(recent: Omit<RecentPrompt, "id" | "usedAt">): RecentPrompt {
  const recents = getRecents();
  // Remove existing entry for same mode+variables
  const filtered = recents.filter(r => 
    !(r.modeId === recent.modeId && JSON.stringify(r.variables) === JSON.stringify(recent.variables))
  );
  const newRecent: RecentPrompt = {
    ...recent,
    id: `${recent.modeId}-${Date.now()}`,
    usedAt: Date.now(),
  };
  localStorage.setItem(RECENTS_KEY, JSON.stringify([newRecent, ...filtered].slice(0, 10)));
  return newRecent;
}

export function clearRecents(): void {
  localStorage.removeItem(RECENTS_KEY);
}

// Copy to clipboard with fallback
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / insecure contexts
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

// Quick prompt presets
export const QUICK_PROMPTS: { label: string; modeId: StudyModeId; defaultVars: Record<string, string> }[] = [
  { label: "Explain my weakest topic", modeId: "learn", defaultVars: {} },
  { label: "Find important PYQs", modeId: "pyq-intelligence", defaultVars: {} },
  { label: "Test me on this module", modeId: "active-recall", defaultVars: {} },
  { label: "Generate an 8-mark answer", modeId: "exam-answer", defaultVars: { marks: "8" } },
  { label: "Evaluate my answer", modeId: "strict-examiner", defaultVars: { marks: "8" } },
  { label: "Give me a mock test", modeId: "mock-exam", defaultVars: { duration: "120", totalMarks: "100", difficulty: "university" } },
  { label: "Revise in 20 minutes", modeId: "revision", defaultVars: { duration: "30" } },
  { label: "Build my 90% strategy", modeId: "score-90-plus", defaultVars: { currentScore: "50", targetScore: "90", daysRemaining: "14", dailyStudyTime: "3" } },
];

// Wizard questions for "What should I use?"
export const WIZARD_QUESTIONS = [
  {
    id: "understand",
    label: "Understand a difficult topic",
    description: "Build deep intuition from fundamentals",
    recommendedModes: ["learn", "active-recall"] as StudyModeId[],
  },
  {
    id: "exam-prep",
    label: "Prepare for an upcoming exam",
    description: "PYQs, answer writing, mock exams",
    recommendedModes: ["pyq-intelligence", "exam-answer", "mock-exam"] as StudyModeId[],
  },
  {
    id: "practice",
    label: "Practice questions / problems",
    description: "Develop problem-solving without spoon-feeding",
    recommendedModes: ["problem-solver", "active-recall"] as StudyModeId[],
  },
  {
    id: "improve-answers",
    label: "Improve my written answers",
    description: "Get evaluated like an examiner would",
    recommendedModes: ["strict-examiner", "exam-answer", "mistake-fixer"] as StudyModeId[],
  },
  {
    id: "revise",
    label: "Revise quickly before exam",
    description: "High-yield review in minutes",
    recommendedModes: ["revision", "pyq-intelligence"] as StudyModeId[],
  },
  {
    id: "weaknesses",
    label: "Find my weaknesses",
    description: "Diagnose gaps and fix mistakes",
    recommendedModes: ["mistake-fixer", "active-recall", "strict-examiner"] as StudyModeId[],
  },
  {
    id: "target-score",
    label: "Target a specific score (90%+)",
    description: "Strategic marks-maximization plan",
    recommendedModes: ["score-90-plus", "mock-exam", "revision"] as StudyModeId[],
  },
];

export function getWizardRecommendation(goalId: string) {
  return WIZARD_QUESTIONS.find(q => q.id === goalId);
}

// Parse URL search params into StudyContext
export function parseContextFromUrl(searchParams: URLSearchParams): StudyContext {
  return buildContextFromParams({
    semester: searchParams.get("semester") || undefined,
    subject: searchParams.get("subject") || undefined,
    module: searchParams.get("module") || undefined,
    topic: searchParams.get("topic") || undefined,
    question: searchParams.get("question") || undefined,
    marks: searchParams.get("marks") || undefined,
    contentType: searchParams.get("contentType") as any,
  });
}

// Get mode from URL
export function getModeFromUrl(searchParams: URLSearchParams): string | null {
  return searchParams.get("mode");
}