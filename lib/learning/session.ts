import { learningSubjectKey, logSession } from "./state";
import type { RecommendedAction, SessionStep, StudySessionPlan } from "./types";
import type { LearningTask } from "./prompts/types";
import type { ProgramId } from "@/lib/types";

const SHAPES: Record<LearningTask, string[]> = {
  teach: ["Learn core concept", "Recall check", "Guided problem", "Independent problem + check"],
  recall: ["Recall round 1", "Recall round 2", "Mastery summary"],
  practice: ["Problem 1", "Problem 2", "Problem 3 + error review"],
  exam: ["Core + formulas", "PYQ patterns", "Traps + cheat sheet"],
  fix: ["Diagnose the mistake", "Repair the reasoning", "Verify with a variant"],
};

const WEIGHTS: Record<LearningTask, number[]> = {
  teach: [0.35, 0.15, 0.25, 0.25],
  recall: [0.4, 0.35, 0.25],
  practice: [0.3, 0.3, 0.4],
  exam: [0.25, 0.4, 0.35],
  fix: [0.3, 0.4, 0.3],
};

function newId(): string {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

export function planSession(action: RecommendedAction, minutes: number, programId: ProgramId, subjectCode: string): StudySessionPlan {
  const total = Math.max(5, Math.round(minutes));
  const labels = SHAPES[action.task];
  const weights = WEIGHTS[action.task];
  const steps: SessionStep[] = labels.map((label, i) => ({ label, minutes: Math.max(1, Math.round(total * weights[i])) }));
  const diff = total - steps.reduce((n, s) => n + s.minutes, 0);
  steps[steps.length - 1].minutes += diff;
  return {
    id: newId(),
    subjectKey: learningSubjectKey(programId, subjectCode),
    task: action.task,
    topicRef: action.topicRef,
    topicTitle: action.topicTitle,
    minutes: total,
    steps,
    startedAt: Date.now(),
  };
}

export function startSession(
  programId: ProgramId,
  subjectCode: string,
  plan: StudySessionPlan
): StudySessionPlan {
  logSession(programId, subjectCode, {
    task: plan.task,
    topicRef: plan.topicRef,
    topicTitle: plan.topicTitle,
    minutes: plan.minutes,
    finishedAt: null,
  });
  return plan;
}
