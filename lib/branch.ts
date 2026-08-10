// Branch identity + subject category metadata.
// Electrical & Computer Engineering, TKM College of Engineering.
// Source of truth for branding strings and per-subject discipline grouping.

import { subjects } from "./content";
import { Subject } from "./types";

export const PRODUCT_NAME = "PrepPilot";
export const PRODUCT_TAGLINE = "Your AI exam preparation system.";
export const PRODUCT_POSITIONING = "Study less. Prioritize better.";

export const BRANCH_NAME = "Electrical & Computer Engineering";
export const BRANCH_SHORT = "EC Engineering";
export const BRANCH_RANGE = "S3–S8";
export const BRANCH_TAGLINE = "Exam-focused · No distractions";
export const BRANCH_FULL = "TKM College of Engineering · Electrical & Computer Engineering";

export type SubjectCategoryId = "computer" | "electronics" | "math" | "core";

export interface SubjectCategoryMeta {
  id: SubjectCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}

export const SUBJECT_CATEGORIES: SubjectCategoryMeta[] = [
  {
    id: "computer",
    label: "COMPUTER",
    shortLabel: "CS",
    description: "DSA, programming, operating systems, networks, AI",
  },
  {
    id: "electronics",
    label: "ELECTRONICS",
    shortLabel: "EC",
    description: "Digital, circuits, sensors, embedded systems",
  },
  {
    id: "math",
    label: "MATHEMATICS",
    shortLabel: "MA",
    description: "Engineering mathematics, signals, control",
  },
  {
    id: "core",
    label: "CORE",
    shortLabel: "CE",
    description: "Branch & common core subjects",
  },
];

// Metadata-driven: subject codes → discipline. Fall back to "core" so new
// subjects never crash and always get a bucket.
const CATEGORY_BY_CODE: Record<string, SubjectCategoryId> = {
  // Computer
  "24ERP304": "computer", // DSA
  "24ERP407": "computer", // Java
  "24ERT401": "computer", // COA
  "24ERJ502": "computer", // DBMS
  "24ERT503": "computer", // AI
  "24ERP504": "computer", // OS
  "24ERT507": "computer", // SE
  "24ERP601": "computer", // CN
  "24ERP701": "computer", // CV
  // Electronics
  "24EST332": "electronics", // Network Theory
  "24ERJ303": "electronics", // DELD
  "24ERT305": "electronics", // Sensors
  "24ESP307": "electronics", // VI Lab
  "24ERJ404": "electronics", // Solid State Devices
  "24ERP403": "electronics", // Electrical Technology
  "24ERT603": "electronics", // Power Electronics
  "24ERP602": "electronics", // Embedded + IoT
  "24ESP608": "electronics", // Cyber Physical Systems
  // Mathematics
  "24MAP301": "math", // Advanced Math
  "24ERT402": "math", // Signals & Systems
  "24ERT501": "math", // Control Systems
};

export function getSubjectCategory(subject: Subject | { code: string }): SubjectCategoryId {
  return CATEGORY_BY_CODE[subject.code] ?? "core";
}

export function getSubjectCategoryMeta(subject: Subject | { code: string }): SubjectCategoryMeta {
  const id = getSubjectCategory(subject);
  return SUBJECT_CATEGORIES.find((c) => c.id === id)!;
}

// Only categories that actually contain subjects for a semester.
export function categoriesForSemester(semesterId: string): SubjectCategoryMeta[] {
  const present = new Set<SubjectCategoryId>();
  for (const s of subjects) {
    if (s.semesterId === semesterId) present.add(getSubjectCategory(s));
  }
  return SUBJECT_CATEGORIES.filter((c) => present.has(c.id));
}

export function subjectsForSemesterAndCategory(semesterId: string, category: SubjectCategoryId | "all"): Subject[] {
  return subjects.filter(
    (s) => s.semesterId === semesterId && (category === "all" || getSubjectCategory(s) === category)
  );
}
