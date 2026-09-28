import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SyllabusManager from "@/components/syllabus/SyllabusManager";
import { ProgramId } from "@/lib/types";
import { findSubject, semesters, subjects } from "@/lib/content";
import { programFromSlug } from "@/lib/urls";
import { PROGRAMS } from "@/lib/domain";
import { PRODUCT_NAME } from "@/lib/branch";

export function generateStaticParams() {
  const out: { program: string; semester: string; subject: string }[] = [];
  for (const p of PROGRAMS) {
    const programId = programFromSlug(p.slug);
    if (!programId) continue;
    for (const s of semesters) {
      for (const subject of subjects.filter((x) => x.programId === programId && x.semesterId === s.id)) {
        out.push({ program: p.slug, semester: s.id, subject: subject.slug });
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
  if (!subject) return {};
  return {
    title: `Syllabus source — ${subject.name} — ${PRODUCT_NAME}`,
    description: `Choose the active syllabus for ${subject.name} (${subject.code}): official KTU syllabus or your own pasted version.`,
  };
}

export default function SyllabusSourcePage({
  params,
}: {
  params: { program: string; semester: string; subject: string };
}) {
  const programId: ProgramId | null = programFromSlug(params.program);
  if (!programId) notFound();
  const subject = findSubject(programId, params.semester, params.subject);
  if (!subject) notFound();
  return <SyllabusManager programId={programId} subjectCode={subject.code} subjectName={subject.name} />;
}
