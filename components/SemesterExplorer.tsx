"use client";

import { subjectsForSemester } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import SubjectCard from "./SubjectCard";
import { ProgramId } from "@/lib/types";

interface SemesterExplorerProps {
  initialSemester?: string;
  programId?: ProgramId;
}

export default function SemesterExplorer({
  initialSemester = "s3",
  programId = "ER",
}: SemesterExplorerProps) {
  const subjects = subjectsForSemester(initialSemester, programId);
  const withNotes = subjects.filter((s) => getSubjectContent(s.code, s.programId));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {withNotes.map((subject) => (
        <SubjectCard key={`${subject.programId}:${subject.code}`} subject={subject} />
      ))}
    </div>
  );
}