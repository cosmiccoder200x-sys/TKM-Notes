import type { ProgramId } from "@/lib/types";

export type SyllabusSource = "official" | "user_pasted" | "user_edited";

export interface SyllabusTopic {
  index: number;
  title: string;
  details?: string;
}

export interface SyllabusModule {
  moduleCode: string;
  number: number;
  title: string;
  topics: SyllabusTopic[];
  content?: string;
  unexpanded?: boolean;
}

export interface SyllabusVersion {
  id: string;
  subjectKey: string;
  programId: ProgramId;
  subjectCode: string;
  source: SyllabusSource;
  createdAt: number;
  updatedAt: number;
  active: boolean;
  modules: SyllabusModule[];
}

export interface ParsedSyllabus {
  modules: SyllabusModule[];
  warnings: string[];
}

export interface SubjectGuess {
  programId: ProgramId;
  subjectCode: string;
  subjectName: string;
  confidence: "high" | "medium" | "low";
}

export interface SegmentedSyllabus {
  guess: SubjectGuess | null;
  parsed: ParsedSyllabus;
  raw: string;
}

export interface SyllabusMatch {
  modulesTotal: number;
  modulesWithNotes: number;
  topicsTotal: number;
  pyqTotal: number;
  perModule: { moduleCode: string; title: string; hasNotes: boolean; pyqs: number; topics: number }[];
}
