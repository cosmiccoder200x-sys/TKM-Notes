// Branch-aware URL helpers. The branch is always encoded in the path, so the
// route itself (not localStorage) is the authoritative source of truth.
// Program slug/label metadata comes from lib/domain.ts (single source).

import { ProgramId } from "./types";
import { programById, programSlug as domainProgramSlug, programFromSlug as domainProgramFromSlug } from "./domain";

export const PROGRAM_SLUGS: Record<ProgramId, string> = {
  ER: programById("ER")!.slug,
  CS: programById("CS")!.slug,
  CS_AI: programById("CS_AI")!.slug,
};

export const PROGRAM_LABELS: Record<ProgramId, string> = {
  ER: programById("ER")!.label,
  CS: programById("CS")!.label,
  CS_AI: programById("CS_AI")!.label,
};

export const PROGRAM_SHORT_LABELS: Record<ProgramId, string> = {
  ER: programById("ER")!.shortLabel,
  CS: programById("CS")!.shortLabel,
  CS_AI: programById("CS_AI")!.shortLabel,
};

export function programSlug(programId: ProgramId): string {
  return domainProgramSlug(programId);
}

export function programFromSlug(slug: string | undefined): ProgramId | null {
  return domainProgramFromSlug(slug);
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