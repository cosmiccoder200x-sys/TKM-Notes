"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { subjectsForSemester } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { ProgramId } from "@/lib/types";
import { normalizeProgramId } from "@/lib/branch";
import { subjectUrl } from "@/lib/urls";

interface SemesterExplorerProps {
  initialSemester?: string;
  programId?: ProgramId;
}

const STORAGE_KEY = "tkm_program_id";

export default function SemesterExplorer({
  initialSemester = "s3",
  programId: initialProgram = "ER",
}: SemesterExplorerProps) {
  const [programId, setProgramId] = useState<ProgramId>(initialProgram);

  useEffect(() => {
    const stored = normalizeProgramId(localStorage.getItem(STORAGE_KEY));
    if (stored) setProgramId(stored);
  }, []);

  const subjects = subjectsForSemester(initialSemester, programId);

  return (
    <div className="space-y-3">
      {subjects.length === 0 && (
        <p className="text-sm text-ink-lo">No subjects for this semester in {programId}.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {subjects.map((subject) => {
          const hasNotes = Boolean(getSubjectContent(subject.code, subject.programId));
          return (
            <Link
              key={`${subject.programId}:${subject.code}`}
              href={subjectUrl(subject.programId, subject.semesterId, subject.slug)}
              className="card flex items-center gap-4 px-5 py-4 group no-underline h-[110px]"
            >
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="font-display font-semibold text-[16px] text-ink-hi leading-snug truncate">
                  {subject.name}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-ink-faint">
                  <span className="text-xs font-mono">{subject.code}</span>
                  <span className="text-xs">· {subject.credits} credits</span>
                  {hasNotes && <span className="chip ml-1 border-signal-dim text-signal">notes</span>}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-ink-faintest shrink-0 group-hover:text-signal group-hover:translate-x-1 transition-all duration-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}