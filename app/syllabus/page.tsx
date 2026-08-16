import Link from "next/link";
import type { Metadata } from "next";
import { subjects } from "@/lib/content";
import { PROGRAM_SLUGS, PROGRAM_LABELS, programUrl } from "@/lib/urls";
import { ProgramId, Semester } from "@/lib/types";
import { PRODUCT_NAME } from "@/lib/branch";

export const metadata: Metadata = {
  title: `Syllabus — ${PRODUCT_NAME}`,
  description: "Branch-aware KTU 2024 syllabuses for ER, CSE and CSE [AI] programs, semesters S3–S8.",
};

export default function SyllabusIndexPage() {
  const programs: ProgramId[] = ["ER", "CS", "CS_AI"];
  const semesters: Semester[] = [
    { id: "s3", label: "Semester 3" },
    { id: "s4", label: "Semester 4" },
    { id: "s5", label: "Semester 5" },
    { id: "s6", label: "Semester 6" },
    { id: "s7", label: "Semester 7" },
    { id: "s8", label: "Semester 8" },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="border-b border-bg-border pb-6">
        <div className="section-kicker">Syllabus</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          Branch-aware syllabus
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed mt-1.5 max-w-2xl">
          Choose a program to browse its official KTU 2024 subjects for S3–S8. Each branch is fully
          isolated — subjects, modules and progress never mix across programs.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {programs.map((id) => {
          const count = subjects.filter((s) => s.programId === id).length;
          return (
            <Link
              key={id}
              href={programUrl(id)}
              className="card p-5 flex flex-col gap-2 group no-underline hover:border-signal/50 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-signal">{PROGRAM_SLUGS[id]}</span>
              <span className="font-display font-bold text-base text-ink-hi group-hover:text-signal transition-colors">
                {PROGRAM_LABELS[id]}
              </span>
              <span className="text-xs font-mono text-ink-lo">{count} subjects · S3–S8</span>
            </Link>
          );
        })}
      </div>

      <section className="space-y-3">
        <h2 className="font-display font-semibold text-lg text-ink-hi">Semesters</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {semesters.map((s) => (
            <Link
              key={s.id}
              href={`/syllabus/er/${s.id}`}
              className="card px-4 py-3 flex items-center justify-between group no-underline hover:border-signal/50 transition-colors"
            >
              <span className="font-mono text-xs text-ink-hi">{s.id.toUpperCase()}</span>
              <span className="text-xs text-ink-faint">{s.label.replace("Semester ", "Sem ")}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}