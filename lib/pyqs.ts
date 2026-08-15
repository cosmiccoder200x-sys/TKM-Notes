import { subjects } from "./content";
import { getSubjectContent } from "./notes";
import type { Weightage } from "./types";

export interface PyqEntry {
  id: string;
  subjectCode: string;
  subjectName: string;
  subjectSlug: string;
  semesterId: string;
  subjectCategory: string;
  moduleIndex: string;
  moduleId: string;
  moduleTitle: string;
  question: string;
  weightage: Weightage;
  note?: string;
}

// Aggregates the exam-focus questions stored in the notes registry into a
// single filterable bank. Metadata shown is constrained to what the data
// actually contains (subject / module / weightage) — no fabricated years,
// marks, or difficulty ratings.
export function getQuestionBank(): PyqEntry[] {
  const entries: PyqEntry[] = [];

  for (const subject of subjects) {
    const content = getSubjectContent(subject.code, subject.programId);
    if (!content) continue;

    content.modules.forEach((mod, mi) => {
      mod.examFocus.forEach((q, qi) => {
        entries.push({
          id: `${subject.code}-${mod.id}-${qi}`,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          subjectCategory: mod.title,
          moduleIndex: String(mi + 1).padStart(2, "0"),
          moduleId: mod.id,
          moduleTitle: mod.title,
          question: q.question,
          weightage: q.weightage,
          note: q.note,
        });
      });
    });
  }

  return entries;
}

export function getQuestionBankStats(bank: PyqEntry[]) {
  const high = bank.filter((q) => q.weightage === "high").length;
  const subjectsWithQuestions = new Set(bank.map((q) => q.subjectCode)).size;
  const semestersCovered = new Set(bank.map((q) => q.semesterId)).size;
  return { total: bank.length, high, subjectsWithQuestions, semestersCovered };
}