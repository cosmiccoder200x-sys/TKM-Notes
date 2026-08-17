import Link from "next/link";
import type { Subject } from "@/lib/types";
import { getSubjectCategoryMeta } from "@/lib/branch";
import { NavIcon } from "@/components/navigation/navItems";
import { subjectUrl, masteryUrl, semesterUrl, programUrl, programSlug } from "@/lib/urls";

export default function SubjectHeader({
  subject,
  moduleCount,
}: {
  subject: Subject;
  moduleCount: number;
}) {
  const cat = getSubjectCategoryMeta(subject);
  const semesterLabel = subject.semesterId.toUpperCase();

  return (
    <header className="space-y-4 border-b border-bg-border pb-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-ink-faint">
          <li>
            <Link href="/" className="hover:text-signal transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={programUrl(subject.programId)} className="hover:text-signal transition-colors">
              {subject.programId}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={semesterUrl(subject.programId, subject.semesterId)}
              className="hover:text-signal transition-colors"
            >
              {semesterLabel}
            </Link>
          </li>
          <li>/</li>
          <li className="text-ink-hi">{subject.code}</li>
        </ol>
      </nav>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="chip border-signal-dim text-signal">{cat.label}</span>
      </div>

      <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
        {subject.name}
      </h1>

      <p className="text-sm font-mono uppercase tracking-wide text-ink-faint">
        {subject.code} · {semesterLabel} · {subject.credits} credits
      </p>

      <p className="text-base text-ink-lo">
        {moduleCount > 0
          ? `${moduleCount} modules · Practice & PYQs ready`
          : "Official KTU 2024 syllabus subject — study with practice, PYQs and AI tools."}
      </p>

      {moduleCount > 0 && (
        <div className="flex flex-wrap gap-2">
          <Link
            href={masteryUrl(subject.programId, subject.semesterId, subject.slug)}
            className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-md border border-bg-border text-ink-hi hover:border-signal hover:bg-signal/5 hover:text-signal transition-colors"
          >
            ▦ Mastery Map
          </Link>
          <Link
            href={`/night-before?subject=${encodeURIComponent(subject.code)}&program=${programSlug(subject.programId)}&time=60`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-md border border-signal text-signal hover:bg-signal/10 transition-colors"
          >
            <NavIcon name="revision" className="w-4 h-4" /> Night-Before
          </Link>
        </div>
      )}
    </header>
  );
}
