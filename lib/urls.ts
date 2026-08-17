// Branch-aware URL helpers. The branch is always encoded in the path, so the
// route itself (not localStorage) is the authoritative source of truth.

import { ProgramId } from "./types";

export const PROGRAM_SLUGS: Record<ProgramId, string> = {
  ER: "er",
  CS: "cse",
  CS_AI: "cse-ai",
};

export const PROGRAM_LABELS: Record<ProgramId, string> = {
  ER: "ER / Electrical & Computer Engineering",
  CS: "CSE",
  CS_AI: "CSE [AI]",
};

export const PROGRAM_SHORT_LABELS: Record<ProgramId, string> = {
  ER: "ER",
  CS: "CSE",
  CS_AI: "CSE [AI]",
};

const SLUG_TO_PROGRAM: Record<string, ProgramId> = {
  er: "ER",
  cse: "CS",
  "cse-ai": "CS_AI",
};

export function programSlug(programId: ProgramId): string {
  return PROGRAM_SLUGS[programId];
}

export function programFromSlug(slug: string | undefined): ProgramId | null {
  if (!slug) return null;
  return SLUG_TO_PROGRAM[slug.toLowerCase()] ?? null;
}

export function semesterUrl(programId: ProgramId, semesterId: string): string {
  return `/syllabus/${programSlug(programId)}/${semesterId}`;
}

export function subjectUrl(
  programId: ProgramId,
  semesterId: string,
  subjectSlug: string,
  hash?: string
): string {
  const base = `/syllabus/${programSlug(programId)}/${semesterId}/${subjectSlug}`;
  return hash ? `${base}#${hash}` : base;
}

export function masteryUrl(programId: ProgramId, semesterId: string, subjectSlug: string): string {
  return `/syllabus/${programSlug(programId)}/${semesterId}/${subjectSlug}/mastery`;
}

export function programUrl(programId: ProgramId): string {
  return `/syllabus/${programSlug(programId)}`;
}
