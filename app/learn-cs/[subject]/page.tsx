import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getLearnSubject, totalTopics, totalMinutes, LEARN_SUBJECTS } from "@/lib/learn-cs";
import { getLearnCategory, getLearnFineCategory, roadmapLevelFor } from "@/lib/learn-cs/categories";
import type { LearnSubject } from "@/lib/learn-cs/types";
import { NavIcon } from "@/components/navigation/navItems";
import LearningPath from "@/components/learn-cs/LearningPath";
import SubjectReadiness from "@/components/learn-cs/SubjectReadiness";
import { PRODUCT_NAME } from "@/lib/branch";

export function generateStaticParams() {
  return LEARN_SUBJECTS.map((s) => ({ subject: s.slug }));
}

export function generateMetadata({ params }: { params: { subject: string } }): Metadata {
  const subject = getLearnSubject(params.subject);
  if (!subject) return {};
  return {
    title: `${subject.name} — Learn CS — ${PRODUCT_NAME}`,
    description: subject.description,
  };
}

const DIFFICULTY_STYLE: Record<string, string> = {
  beginner: "text-signal border-signal-dim bg-signal/10",
  intermediate: "text-weight border-weight-dim bg-weight/10",
  advanced: "text-critical border-critical/40 bg-critical/10",
};

export default function LearnSubjectPage({ params }: { params: { subject: string } }) {
  const subject = getLearnSubject(params.subject);
  if (!subject) notFound();

  const category = getLearnCategory(subject.category);
  const fine = getLearnFineCategory(subject.slug);
  const level = roadmapLevelFor(subject.slug);
  const whyMatters =
    fine?.whyItMatters ??
    "This subject builds the core mental models the rest of your CS work leans on.";
  const prerequisites: LearnSubject[] = (subject.prerequisites ?? [])
    .map((slug) => getLearnSubject(slug))
    .filter((s): s is LearnSubject => Boolean(s));

  return (
    <main className="max-w-4xl mx-auto py-4 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] font-mono text-ink-faint uppercase tracking-wider">
        <Link href="/learn-cs" className="hover:text-signal transition-colors">Learn CS</Link>
        <span>/</span>
        <span className="text-ink-lo">{category?.shortLabel ?? "CS"}</span>
      </nav>

      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-start gap-4">
          <span className="icon-box w-12 h-12 shrink-0">
            <NavIcon name={subject.icon} className="w-6 h-6 text-signal" />
          </span>
          <div className="space-y-1.5">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
              {subject.name}
            </h1>
            <p className="text-sm sm:text-base text-ink-lo leading-relaxed max-w-2xl font-light">
              {subject.description}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2">
          <span className={`chip ${DIFFICULTY_STYLE[subject.difficulty]}`}>{subject.difficulty}</span>
          <span className="chip">~{subject.estimatedHours} hours</span>
          <span className="chip">{totalTopics(subject)} topics</span>
          <span className="chip">~{Math.round(totalMinutes(subject) / 60)}h of lessons</span>
          {level >= 0 && (
            <Link href="/learn-cs/roadmap" className="chip border border-signal-dim text-signal bg-signal/10 hover:bg-signal/20 transition-colors">
              Roadmap Level {level}
            </Link>
          )}
        </div>

        {/* Why learn it */}
        <p className="text-sm text-ink-lo leading-relaxed max-w-2xl">
          {whyMatters}
        </p>

        {/* Subject readiness (prerequisite gate) */}
        <SubjectReadiness subject={subject} />

        {/* Prerequisites */}
        {prerequisites.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Prerequisites:</span>
            {prerequisites.map((p) => (
              <Link
                key={p.slug}
                href={`/learn-cs/${p.slug}`}
                className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 7-stage learning path */}
      <section className="space-y-4 pt-2">
        <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border/40 pb-3">
          <div className="flex items-baseline gap-3">
            <span className="eyebrow text-ink-hi">Learning Path</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">07 stages</span>
        </div>

        <LearningPath subject={subject} />
      </section>
    </main>
  );
}