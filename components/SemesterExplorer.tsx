"use client";

import { subjectsForSemester } from "@/lib/content";
import registry from "@/lib/notes";
import SubjectCard from "./SubjectCard";

interface SemesterExplorerProps {
  initialSemester?: string;
}

export default function SemesterExplorer({ initialSemester = "s3" }: SemesterExplorerProps) {
  const subjects = subjectsForSemester(initialSemester);
  const withNotes = subjects.filter((s) => registry[s.code]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {withNotes.map((subject) => (
        <SubjectCard key={subject.code} subject={subject} />
      ))}
    </div>
  );
}