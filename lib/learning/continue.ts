import { generatePromptLabUrl } from "@/lib/prompts/context";
import type { StudyModeId } from "@/lib/prompts/types";
import type { ProgramId } from "@/lib/types";
import { programSlug } from "@/lib/urls";
import type { LearningTask } from "./prompts/types";
import type { RecommendedAction } from "./types";

export const MODE_FOR_TASK: Record<LearningTask, StudyModeId> = {
  teach: "learn",
  recall: "active-recall",
  practice: "problem-solver",
  exam: "exam-answer",
  fix: "mistake-fixer",
};

export const TASK_LABEL: Record<LearningTask, string> = {
  teach: "Learn",
  recall: "Recall",
  practice: "Practice",
  exam: "Exam prep",
  fix: "Fix mistake",
};

export function continueHref(
  action: RecommendedAction,
  programId: ProgramId,
  subjectCode: string,
  subjectSlug?: string
): string {
  return generatePromptLabUrl(
    {
      subjectCode,
      subjectSlug,
      moduleId: action.moduleId ?? undefined,
      moduleName: action.moduleTitle ?? undefined,
      topic: action.topicTitle ?? undefined,
    },
    MODE_FOR_TASK[action.task]
  );
}

export function practiceHref(programId: ProgramId, semesterId: string, subjectCode: string): string {
  return `/practice?program=${programSlug(programId)}&semester=${semesterId}&subject=${encodeURIComponent(subjectCode)}`;
}

export function pyqsHref(programId: ProgramId, semesterId: string, subjectCode: string): string {
  return `/pyqs?program=${programSlug(programId)}&semester=${semesterId}&subject=${encodeURIComponent(subjectCode)}`;
}

export function aiStudyHref(programId: ProgramId, semesterId: string, subjectCode: string): string {
  return `/ai-study?program=${programSlug(programId)}&semester=${semesterId}&subject=${encodeURIComponent(subjectCode)}`;
}

export function revisionHref(programId: ProgramId, subjectCode: string): string {
  return `/night-before?subject=${encodeURIComponent(subjectCode)}&program=${programSlug(programId)}&time=60`;
}
