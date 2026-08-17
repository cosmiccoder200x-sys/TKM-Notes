import { redirect, notFound } from "next/navigation";
import { findSubject, semesters, subjects } from "@/lib/content";
import { subjectUrl } from "@/lib/urls";

export function generateStaticParams() {
  return subjects.filter((s) => s.programId === "ER").map((s) => ({ semester: s.semesterId, subject: s.slug }));
}

export default function LegacySubjectPage({
  params,
}: {
  params: { semester: string; subject: string };
}) {
  if (!semesters.some((s) => s.id === params.semester)) notFound();
  const subject = findSubject("ER", params.semester, params.subject);
  if (!subject) notFound();
  redirect(subjectUrl("ER", subject.semesterId, subject.slug));
}