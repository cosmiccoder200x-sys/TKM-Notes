export type {
  EvidenceKind,
  EvidenceResult,
  TopicLearningState,
  MistakeRecord,
  StudySessionRecord,
  SubjectLearningState,
  RecommendedAction,
  SessionStep,
  StudySessionPlan,
} from "./types";
export {
  learningSubjectKey,
  getLearningState,
  saveLearningState,
  recordEvidence,
  markRevisionDue,
  logMistake,
  resolveMistake,
  openMistakes,
  logSession,
  completeSession,
  isSessionFinished,
} from "./state";
export { decideNextAction } from "./decision";
export { planSession, startSession, finishSession } from "./session";
export type { SessionOutcome } from "./session";
export { applyMasteryEvidence, masteryLabel6, MASTERY_MIN, MASTERY_MAX } from "./mastery";
export type { MasteryEvidence } from "./mastery";
export { mapPyqsToTopics, topicPyqCounts } from "./pyqmap";
export type { TopicPyqLink } from "./pyqmap";
export { MODE_FOR_TASK, TASK_LABEL, continueHref, practiceHref, pyqsHref, aiStudyHref, revisionHref } from "./continue";
export * from "./prompts";
export {
  EXTERNAL_AI,
  EXTERNAL_AI_PROVIDERS,
  externalAiUrl,
  handoffToExternalAi,
  defaultOpenExternalAi,
} from "./external-ai";
export type { ExternalAiId, HandoffCopyFn, HandoffOpenFn } from "./external-ai";
