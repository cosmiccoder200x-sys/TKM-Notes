import { redirect, notFound } from "next/navigation";
import { semesters } from "@/lib/content";
import { semesterUrl } from "@/lib/urls";

export function generateStaticParams() {
  return semesters.map((s) => ({ semester: s.id }));
}

export default function LegacySemesterPage({ params }: { params: { semester: string } }) {
  if (!semesters.some((s) => s.id === params.semester)) notFound();
  redirect(semesterUrl("ER", params.semester));
}