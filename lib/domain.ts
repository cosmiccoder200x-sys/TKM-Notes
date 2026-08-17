// Canonical academic domain model for TKM Notes.
// Single source of truth for the academic hierarchy:
//
//   Program → Scheme → Semester → Subject → Module → Topic
//
// Every subsystem (syllabus, notes, PYQs, practice, revision, progress,
// Prompt Lab, Learn CS cross-links, search, admin) addresses entities with
// the stable identifiers defined here. Nothing else should hard-code the
// program/semester tables or derive ids ad hoc.

import { ProgramId, Semester } from "./types";

// ---------------------------------------------------------------------------
// Scheme
// ---------------------------------------------------------------------------

export const SCHEME_ID = "2024";
export const SCHEME_LABEL = "KTU 2024 Scheme";

export interface Scheme {
  id: string;
  label: string;
  year: string;
}

export const SCHEMES: Scheme[] = [{ id: SCHEME_ID, label: SCHEME_LABEL, year: "2024" }];

// ---------------------------------------------------------------------------
// Program
// ---------------------------------------------------------------------------

export interface ProgramDef {
  id: ProgramId;
  schemeId: string;
  slug: string; // route segment: /syllabus/<slug>
  label: string; // full display label
  shortLabel: string; // compact badge
  name: string; // human branch name
}

export const PROGRAMS: ProgramDef[] = [
  {
    id: "ER",
    schemeId: SCHEME_ID,
    slug: "er",
    label: "ER / Electrical & Computer Engineering",
    shortLabel: "ER",
    name: "Electrical & Computer Engineering",
  },
  {
    id: "CS",
    schemeId: SCHEME_ID,
    slug: "cse",
    label: "CSE",
    shortLabel: "CSE",
    name: "Computer Science",
  },
  {
    id: "CS_AI",
    schemeId: SCHEME_ID,
    slug: "cse-ai",
    label: "CSE [AI]",
    shortLabel: "CSE [AI]",
    name: "Computer Science (Artificial Intelligence)",
  },
];

const PROGRAM_BY_ID = new Map(PROGRAMS.map((p) => [p.id, p]));
const PROGRAM_BY_SLUG = new Map(PROGRAMS.map((p) => [p.slug, p]));

export function programById(id: string | null | undefined): ProgramDef | undefined {
  return id ? PROGRAM_BY_ID.get(id as ProgramId) : undefined;
}

export function isProgramId(value: unknown): value is ProgramId {
  return typeof value === "string" && PROGRAM_BY_ID.has(value as ProgramId);
}

// Normalize any stored value to a valid ProgramId, migrating legacy keys.
// Legacy "CSE" referred to the old ER program and "CSE_AI" to the AI program.
export function normalizeProgramId(value: string | null | undefined): ProgramId | null {
  if (isProgramId(value)) return value;
  if (value === "CSE") return "ER";
  if (value === "CSE_AI") return "CS_AI";
  return null;
}

export function programSlug(programId: ProgramId): string {
  return programById(programId)?.slug ?? programId;
}

export function programFromSlug(slug: string | null | undefined): ProgramId | null {
  if (!slug) return null;
  return PROGRAM_BY_SLUG.get(slug.toLowerCase())?.id ?? null;
}

export function programLabel(programId: ProgramId): string {
  return programById(programId)?.label ?? programId;
}

export function programShortLabel(programId: ProgramId): string {
  return programById(programId)?.shortLabel ?? programId;
}

export function programName(programId: ProgramId): string {
  return programById(programId)?.name ?? programId;
}

export function schemeForProgram(programId: ProgramId): Scheme {
  const schemeId = programById(programId)?.schemeId ?? SCHEME_ID;
  return SCHEMES.find((s) => s.id === schemeId) ?? SCHEMES[0];
}

// Backward-compatible labels used for branch-aware prompt/header text.
export const BRANCH_LABELS: Record<ProgramId, string> = {
  ER: "Electrical & Computer Engineering",
  CS: "Computer Science",
  CS_AI: "Computer Science (Artificial Intelligence)",
};

// ---------------------------------------------------------------------------
// Semester
// ---------------------------------------------------------------------------

export const SEMESTERS: Semester[] = [
  { id: "s3", label: "Semester 3" },
  { id: "s4", label: "Semester 4" },
  { id: "s5", label: "Semester 5" },
  { id: "s6", label: "Semester 6" },
  { id: "s7", label: "Semester 7" },
  { id: "s8", label: "Semester 8" },
];

export const SEMESTER_IDS: string[] = SEMESTERS.map((s) => s.id);

export function semesterById(id: string | null | undefined): Semester | undefined {
  return id ? SEMESTERS.find((s) => s.id === id) : undefined;
}

// ---------------------------------------------------------------------------
// Stable identifiers
// ---------------------------------------------------------------------------

// "ER:24ERP304" — the canonical subject identity used everywhere (progress,
// notes, PYQs, practice, search, admin). A course code is NOT globally unique:
// 24CSP304 exists in both CS ("Algorithms") and CS_AI ("Data Structures and
// Algorithms"), so identity always includes the program.
export function subjectId(programId: ProgramId, subjectCode: string): string {
  return `${programId}:${subjectCode}`;
}

export interface SubjectIdParts {
  programId: ProgramId | null;
  subjectCode: string;
}

export function parseSubjectId(id: string): SubjectIdParts | null {
  const sep = id.indexOf(":");
  if (sep === -1) return null;
  const programId = normalizeProgramId(id.slice(0, sep));
  if (!programId) return null;
  return { programId, subjectCode: id.slice(sep + 1) };
}

// "ER:24ERP304:m1" — module identity, namespaced by subject so module codes
// (m1..m5) never collide across subjects.
export function moduleId(subjectKey: string, moduleCode: string): string {
  return `${subjectKey}:${moduleCode}`;
}

export interface ModuleIdParts {
  subjectId: string;
  moduleCode: string;
}

export function parseModuleId(id: string): ModuleIdParts | null {
  const i = id.lastIndexOf(":");
  if (i <= 0) return null;
  return { subjectId: id.slice(0, i), moduleCode: id.slice(i + 1) };
}

// "ER:24ERP304:m1:3" — optional topic slot (index into a module's topic list).
export function topicId(subjectKey: string, moduleCode: string, topicIndex: number): string {
  return `${moduleId(subjectKey, moduleCode)}:${topicIndex}`;
}