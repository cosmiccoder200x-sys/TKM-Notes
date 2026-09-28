import { subjectId as domainSubjectId } from "@/lib/domain";
import type { ProgramId } from "@/lib/types";
import { applyMasteryEvidence } from "./mastery";
import type {
  EvidenceKind,
  EvidenceResult,
  MistakeRecord,
  StudySessionRecord,
  SubjectLearningState,
  TopicLearningState,
} from "./types";

const STORAGE_KEY = "tkm.v2.learning.v1";
const MAX_SESSIONS = 20;

type Store = Record<string, SubjectLearningState>;

function safeRead(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Store;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function safeWrite(store: Store) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // storage unavailable — degrade silently
  }
}

export function learningSubjectKey(programId: ProgramId, subjectCode: string): string {
  return domainSubjectId(programId, subjectCode);
}

function blankState(programId: ProgramId, subjectCode: string): SubjectLearningState {
  return {
    subjectKey: learningSubjectKey(programId, subjectCode),
    programId,
    subjectCode,
    topics: {},
    mistakes: [],
    sessions: [],
    updatedAt: Date.now(),
  };
}

export function getLearningState(programId: ProgramId, subjectCode: string): SubjectLearningState {
  const state = safeRead()[learningSubjectKey(programId, subjectCode)];
  if (!state) return blankState(programId, subjectCode);
  return { ...blankState(programId, subjectCode), ...state, topics: state.topics ?? {}, mistakes: state.mistakes ?? [], sessions: state.sessions ?? [] };
}

export function saveLearningState(state: SubjectLearningState): SubjectLearningState {
  const store = safeRead();
  const next = { ...state, updatedAt: Date.now() };
  store[next.subjectKey] = next;
  safeWrite(store);
  return next;
}

function newId(): string {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

function transition(
  current: number | null,
  kind: EvidenceKind,
  result: EvidenceResult
): { mastery: number | null; exposed: boolean } {
  return { mastery: applyMasteryEvidence(current, { kind, result }), exposed: true };
}

function ensureTopic(
  state: SubjectLearningState,
  ref: string,
  moduleCode: string,
  topicIndex: number | null,
  title: string
): TopicLearningState {
  const existing = state.topics[ref];
  if (existing) return existing;
  const created: TopicLearningState = {
    ref,
    moduleCode,
    topicIndex,
    title,
    mastery: null,
    exposed: false,
    revisionDueAt: null,
    lastStudiedAt: null,
  };
  state.topics[ref] = created;
  return created;
}

export function recordEvidence(input: {
  programId: ProgramId;
  subjectCode: string;
  topicRef: string;
  moduleCode: string;
  topicIndex: number | null;
  title: string;
  kind: EvidenceKind;
  result: EvidenceResult;
}): SubjectLearningState {
  const state = getLearningState(input.programId, input.subjectCode);
  const topic = ensureTopic(state, input.topicRef, input.moduleCode, input.topicIndex, input.title);
  const { mastery, exposed } = transition(topic.mastery, input.kind, input.result);
  topic.mastery = mastery;
  topic.exposed = topic.exposed || exposed;
  topic.lastStudiedAt = Date.now();
  if (input.kind === "reviewed" || (input.kind === "recall" && input.result === "correct")) {
    topic.revisionDueAt = null;
  }
  return saveLearningState(state);
}

export function markRevisionDue(
  programId: ProgramId,
  subjectCode: string,
  topicRef: string,
  moduleCode: string,
  topicIndex: number | null,
  title: string,
  dueAt: number = Date.now()
): SubjectLearningState {
  const state = getLearningState(programId, subjectCode);
  const topic = ensureTopic(state, topicRef, moduleCode, topicIndex, title);
  topic.revisionDueAt = dueAt;
  return saveLearningState(state);
}

export function logMistake(input: {
  programId: ProgramId;
  subjectCode: string;
  topicRef: string;
  topicTitle: string;
  note: string;
}): MistakeRecord {
  const state = getLearningState(input.programId, input.subjectCode);
  const mistake: MistakeRecord = {
    id: newId(),
    topicRef: input.topicRef,
    topicTitle: input.topicTitle,
    note: input.note,
    createdAt: Date.now(),
    resolved: false,
  };
  state.mistakes = [mistake, ...state.mistakes].slice(0, 50);
  saveLearningState(state);
  return mistake;
}

export function resolveMistake(programId: ProgramId, subjectCode: string, id: string): boolean {
  const state = getLearningState(programId, subjectCode);
  const target = state.mistakes.find((m) => m.id === id);
  if (!target) return false;
  target.resolved = true;
  saveLearningState(state);
  return true;
}

export function openMistakes(state: SubjectLearningState): MistakeRecord[] {
  return state.mistakes.filter((m) => !m.resolved);
}

export function logSession(
  programId: ProgramId,
  subjectCode: string,
  session: Omit<StudySessionRecord, "id" | "startedAt">
): StudySessionRecord {
  const state = getLearningState(programId, subjectCode);
  const existing = state.sessions.find((s) => s.planId === session.planId);
  if (existing) return existing;
  const record: StudySessionRecord = { ...session, id: newId(), startedAt: Date.now() };
  state.sessions = [record, ...state.sessions].slice(0, MAX_SESSIONS);
  saveLearningState(state);
  return record;
}

export function completeSession(
  programId: ProgramId,
  subjectCode: string,
  planId: string,
  finishedAt: number = Date.now()
): boolean {
  const state = getLearningState(programId, subjectCode);
  const record = state.sessions.find((s) => s.planId === planId && s.finishedAt === null);
  if (!record) return false;
  record.finishedAt = finishedAt;
  saveLearningState(state);
  return true;
}
