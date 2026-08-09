import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import SemesterExplorer from "@/components/SemesterExplorer";
import { semesters } from "@/lib/content";

export function generateStaticParams() {
  return semesters.map((s) => ({ semester: s.id }));
}

export function generateMetadata({
  params,
}: {
  params: { semester: string };
}): Metadata {
  const semester = semesters.find((s) => s.id === params.semester);
  if (!semester) return {};
  return {
    title: `${semester.label} — TKM Notes`,
    description: `Exam-focused notes and study tools for ${semester.label} of Electrical & Computer Engineering at TKM College. Subjects, modules, important questions and AI study modes.`,
  };
}

export default function SemesterPage({
  params,
}: {
  params: { semester: string };
}) {
  const semester = semesters.find((s) => s.id === params.semester);
  if (!semester) notFound();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-ink-faint">
            <li>
              <Link href="/" className="hover:text-signal transition-colors">
                TKM Notes
              </Link>
            </li>
            <li>/</li>
            <li className="text-ink-hi">{semester.label}</li>
          </ol>
        </nav>

        <SemesterExplorer initialSemester={semester.id} />
      </main>
    </>
  );
}
