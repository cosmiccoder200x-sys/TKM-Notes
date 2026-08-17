import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { semesters, subjectsForSemester } from "@/lib/content";
import { programFromSlug, PROGRAM_LABELS, subjectUrl, programUrl } from "@/lib/urls";
import { ProgramId } from "@/lib/types";
import { PRODUCT_NAME } from "@/lib/branch";
import { PROGRAMS } from "@/lib/domain";
import SubjectCard from "@/components/SubjectCard";

export function generateStaticParams() {
  const out: { program: string; semester: string }[] = [];
  for (const p of PROGRAMS) {
    for (const s of semesters) out.push({ program: p.slug, semester: s.id });
  }
  return out;
}

export function generateMetadata({
  params,
}: {
  params: { program: string; semester: string };
}): Metadata {
  const programId = programFromSlug(params.program);
  if (!programId) return {};
  return {
    title: `${PROGRAM_LABELS[programId]} ${params.semester.toUpperCase()} — ${PRODUCT_NAME}`,
  };
}

export default function SemesterPage({
  params,
}: {
  params: { program: string; semester: string };
}) {
  const programId: ProgramId | null = programFromSlug(params.program);
  if (!programId) notFound();

  const semester = semesters.find((s) => s.id === params.semester);
  if (!semester) notFound();

  const subjects = subjectsForSemester(params.semester, programId);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs font-mono text-ink-faint">
        <Link href="/syllabus" className="hover:text-signal transition-colors">
          Syllabus
        </Link>
        <span>/</span>
        <Link href={programUrl(programId)} className="hover:text-signal transition-colors">
          {PROGRAM_LABELS[programId]}
        </Link>
        <span>/</span>
        <span className="text-ink-lo">{semester.id.toUpperCase()}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-hi">{semester.label}</h1>
        <p className="text-sm text-ink-lo mt-1">
          {PROGRAM_LABELS[programId]} · {subjects.length} subjects · KTU 2024
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <Link
            key={subject.code}
            href={subjectUrl(programId, subject.semesterId, subject.slug)}
            className="card flex items-center gap-4 px-5 py-4 group no-underline h-[110px]"
          >
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="font-display font-semibold text-[16px] text-ink-hi leading-snug truncate">
                {subject.name}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-ink-faint">
                <span className="text-xs font-mono">{subject.code}</span>
                <span className="text-xs">· {subject.credits} credits</span>
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
        ))}
      </div>
    </main>
  );
}