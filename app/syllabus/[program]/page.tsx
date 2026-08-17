import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { subjectsForProgram, semesters } from "@/lib/content";
import { programFromSlug, PROGRAM_LABELS, semesterUrl } from "@/lib/urls";
import { ProgramId } from "@/lib/types";
import { PRODUCT_NAME } from "@/lib/branch";
import { PROGRAMS } from "@/lib/domain";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ program: p.slug }));
}

export function generateMetadata({ params }: { params: { program: string } }): Metadata {
  const programId = programFromSlug(params.program);
  if (!programId) return {};
  return {
    title: `${PROGRAM_LABELS[programId]} — Syllabus — ${PRODUCT_NAME}`,
  };
}

export default function ProgramPage({ params }: { params: { program: string } }) {
  const programId: ProgramId | null = programFromSlug(params.program);
  if (!programId) notFound();

  const subs = subjectsForProgram(programId);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="eyebrow">TKM Notes · Syllabus</span>
        <h1 className="font-display font-bold text-3xl text-ink-hi mt-2">{PROGRAM_LABELS[programId]}</h1>
        <p className="text-sm text-ink-lo mt-1">KTU 2024 scheme · S3–S8 · {subs.length} subjects</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {semesters.map((s) => {
          const count = subs.filter((x) => x.semesterId === s.id).length;
          return (
            <Link
              key={s.id}
              href={semesterUrl(programId, s.id)}
              className="card p-5 no-underline group"
            >
              <div className="flex items-center justify-between">
                <div className="font-display font-semibold text-lg text-ink-hi">{s.label}</div>
                <span className="chip">{count} subjects</span>
              </div>
              <div className="mt-2 text-xs font-mono text-ink-faint uppercase tracking-wide">
                {s.id.toUpperCase()} · open →
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}