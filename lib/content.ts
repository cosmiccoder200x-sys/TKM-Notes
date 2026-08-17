import { Subject, ProgramId } from "./types";
import { csSubjects, csAiSubjects, syllabusModules } from "./syllabusData";
import type { SyllabusModule } from "./syllabusData";
import { SEMESTERS } from "./domain";
import { subjectId as domainSubjectId } from "./domain";

export { csSubjects, csAiSubjects, syllabusModules };
export type { SyllabusModule };

// Canonical semester table (single source: lib/domain.ts).
export const semesters = SEMESTERS;

const erSubjects: Subject[] = [
  // Semester 3
  { code: "24MAP301", slug: "advanced-linear-algebra-complex-analysis-pde", name: "Advanced Linear Algebra, Complex Analysis & PDE", credits: 5, semesterId: "s3", programId: "ER" },
  { code: "24EST332", slug: "network-theory", name: "Network Theory", credits: 2, semesterId: "s3", programId: "ER" },
  { code: "24ERJ303", slug: "digital-electronics-and-logic-design", name: "Digital Electronics and Logic Design", credits: 5, semesterId: "s3", programId: "ER" },
  { code: "24ERP304", slug: "data-structures-and-algorithms", name: "Data Structures and Algorithms", credits: 4, semesterId: "s3", programId: "ER" },
  { code: "24ERT305", slug: "sensor-and-sensor-circuits", name: "Sensor & Sensor Circuits", credits: 3, semesterId: "s3", programId: "ER" },
  { code: "24HUT310", slug: "life-skills-and-professional-ethics", name: "Life Skills and Professional Ethics", credits: 3, semesterId: "s3", programId: "ER" },
  { code: "24ESP307", slug: "system-simulation-and-virtual-instrumentation-lab", name: "System Simulation & Virtual Instrumentation Lab", credits: 2, semesterId: "s3", programId: "ER" },

  // Semester 4
  { code: "24ERT401", slug: "computer-organization-and-architecture", name: "Computer Organization and Architecture", credits: 4, semesterId: "s4", programId: "ER" },
  { code: "24ERT402", slug: "signals-and-systems", name: "Signals & Systems", credits: 3, semesterId: "s4", programId: "ER" },
  { code: "24ERP403", slug: "electrical-technology", name: "Electrical Technology", credits: 4, semesterId: "s4", programId: "ER" },
  { code: "24ERJ404", slug: "solid-state-electronic-devices-and-circuits", name: "Solid State Electronic Devices and Circuits", credits: 5, semesterId: "s4", programId: "ER" },
  { code: "24HUT435", slug: "engineering-economics", name: "Engineering Economics", credits: 3, semesterId: "s4", programId: "ER" },
  { code: "24MCT406", slug: "environmental-sciences", name: "Environmental Sciences", credits: 0, semesterId: "s4", programId: "ER" },
  { code: "24ERP407", slug: "object-oriented-programming-using-java", name: "Object Oriented Programming Using Java", credits: 2, semesterId: "s4", programId: "ER" },

  // Semester 5
  { code: "24ERT501", slug: "control-systems", name: "Control Systems", credits: 3, semesterId: "s5", programId: "ER" },
  { code: "24ERJ502", slug: "database-management-systems", name: "Database Management Systems", credits: 5, semesterId: "s5", programId: "ER" },
  { code: "24ERT503", slug: "artificial-intelligence-theory-and-applications", name: "Artificial Intelligence: Theory and Applications", credits: 3, semesterId: "s5", programId: "ER" },
  { code: "24ERP504", slug: "operating-systems", name: "Operating Systems", credits: 4, semesterId: "s5", programId: "ER" },
  { code: "24HUT535", slug: "project-management-and-finance", name: "Project Management and Finance", credits: 3, semesterId: "s5", programId: "ER" },
  { code: "24MCT506", slug: "constitution-of-india", name: "Constitution of India", credits: "MOOC", semesterId: "s5", programId: "ER" },
  { code: "24ERT507", slug: "software-engineering", name: "Software Engineering", credits: 2, semesterId: "s5", programId: "ER" },

  // Semester 6
  { code: "24ERP601", slug: "computer-networks", name: "Computer Networks", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERP602", slug: "embedded-system-design-and-iot", name: "Embedded System Design and IoT", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERT603", slug: "power-electronics-and-drives", name: "Power Electronics & Drives", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERE6X4", slug: "professional-elective-1", name: "Professional Elective-I", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERE6X5", slug: "professional-elective-2-industry-elective", name: "Professional Elective-II / Industry Elective", credits: 3, semesterId: "s6", programId: "ER" },
  { code: "24ERS606", slug: "seminar", name: "Seminar", credits: 2, semesterId: "s6", programId: "ER" },
  { code: "24SPJ607", slug: "socially-relevant-project", name: "Socially Relevant Project", credits: 1, semesterId: "s6", programId: "ER" },
  { code: "24ESP608", slug: "cyber-physical-systems", name: "Cyber Physical Systems", credits: 2, semesterId: "s6", programId: "ER" },

  // Semester 7
  { code: "24ERP701", slug: "computer-vision", name: "Computer Vision", credits: 4, semesterId: "s7", programId: "ER" },
  { code: "24ERP702", slug: "energy-systems", name: "Energy Systems", credits: 4, semesterId: "s7", programId: "ER" },
  { code: "24ERE7X3", slug: "professional-elective-3-mooc", name: "Professional Elective-III (MOOC)", credits: 3, semesterId: "s7", programId: "ER" },
  { code: "24ERO7X4", slug: "open-elective-1-industry-elective", name: "Open Elective-I / Industry Elective", credits: 3, semesterId: "s7", programId: "ER" },
  { code: "24ERD705", slug: "major-project-phase-1-internship", name: "Major Project Phase-I / Internship", credits: 7, semesterId: "s7", programId: "ER" },

  // Semester 8
  { code: "24ERE8X1", slug: "professional-elective-4-mooc", name: "Professional Elective-IV / MOOC", credits: 3, semesterId: "s8", programId: "ER" },
  { code: "24ERO8X2", slug: "open-elective-2-mooc", name: "Open Elective-II / MOOC", credits: 3, semesterId: "s8", programId: "ER" },
  { code: "24ERO8X3", slug: "open-elective-3-mooc", name: "Open Elective-III / MOOC", credits: 3, semesterId: "s8", programId: "ER" },
  { code: "24ERD804", slug: "major-project-internship", name: "Major Project / Internship", credits: 7, semesterId: "s8", programId: "ER" },
];

export const subjects: Subject[] = [...erSubjects, ...csSubjects, ...csAiSubjects];

export function subjectsForSemester(semesterId: string, programId?: ProgramId): Subject[] {
  const list = subjects.filter((s) => s.semesterId === semesterId);
  if (programId) return list.filter((s) => s.programId === programId);
  return list;
}

export function findSubject(programId: ProgramId, semesterId: string, slug: string): Subject | undefined {
  const matches = subjects.filter((s) => s.semesterId === semesterId && s.slug === slug);
  return matches.find((s) => s.programId === programId);
}

export function subjectsForProgram(programId: ProgramId): Subject[] {
  return subjects.filter((s) => s.programId === programId);
}

// Official syllabus module breakdown for a subject, keyed programId+code.
export function syllabusModulesFor(programId: ProgramId, subjectCode: string): SyllabusModule[] {
  return syllabusModules[`${programId}-${subjectCode}`] ?? [];
}

// Find a subject by exact course code within a program (canonical id).
export function findSubjectByCode(programId: ProgramId, subjectCode: string): Subject | undefined {
  return subjects.find((s) => s.programId === programId && s.code === subjectCode);
}

// Canonical stable identifier used everywhere (progress, notes, pyqs, practice).
// Implemented by lib/domain.ts; kept here for backward-compatible call sites.
export function subjectKey(programId: ProgramId, subjectCode: string): string {
  return domainSubjectId(programId, subjectCode);
}


