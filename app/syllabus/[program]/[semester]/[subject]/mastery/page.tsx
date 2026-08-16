import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import MasteryMap from "@/components/mastery/MasteryMap";
import { ProgramId } from "@/lib/types";
import { findSubject, semesters, subjects } from "@/lib/content";
import { programFromSlug, PROGRAM_LABELS, subjectUrl, programUrl, semesterUrl } from "@/lib/urls";
import { PRODUCT_NAME } from "@/lib/branch";

function allSubjectsFor(programId: ProgramId, semesterId: string) {
  return subjects.filter((s) => s.programId === programId && s.semesterId === semesterId);
}

export function generateStaticParams() {
  const programs = [{ program: "er" }, { program: "cse" }, { program: "cse-ai" }];
  const out: { program: string; semester: string; subject: string }[] = [];
  for (const p of programs) {
    for (const s of semesters) {
      const programId = programFromSlug(p.program);
      if (!programId) continue;
      for (const subject of allSubjectsFor(programId, s.id)) {
        out.push({ program: p.program, semester: s.id, subject: subject.slug });
      }
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: { program: string; semester: string; subject: string };
}): Promise<Metadata> {
  const programId = programFromSlug(params.program);
  if (!programId) return {};
  const subject = findSubject(programId, params.semester, params.subject);
  return {
    title: subject ? `${subject.name} — Mastery — ${PRODUCT_NAME}` : "Subject Mastery",
  };
}

export default function MasteryPage({
  params,
}: {
  params: { program: string; semester: string; subject: string };
}) {
  const programId: ProgramId | null = programFromSlug(params.program);
  if (!programId) notFound();
  const subject = findSubject(programId, params.semester, params.subject);
  if (!subject) notFound();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs font-mono text-ink-faint">
        <Link href="/" className="hover:text-signal transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={programUrl(programId)} className="hover:text-signal transition-colors">
          {PROGRAM_LABELS[programId]}
        </Link>
        <span>/</span>
        <Link href={semesterUrl(programId, subject.semesterId)} className="hover:text-signal transition-colors">
          {subject.semesterId.toUpperCase()}
        </Link>
        <span>/</span>
        <Link href={subjectUrl(programId, subject.semesterId, subject.slug)} className="hover:text-signal transition-colors">
          {subject.code}
        </Link>
        <span>/</span>
        <span className="text-ink-lo">mastery</span>
      </nav>

      <MasteryMap
        subjectCode={subject.code}
        subjectName={subject.name}
        subjectSlug={subject.slug}
        semesterId={subject.semesterId}
        programId={programId}
      />
    </main>
  );
}