import Link from "next/link";
import Header from "@/components/Header";
import SemesterExplorer from "@/components/SemesterExplorer";
import StudyTools from "@/components/StudyTools";
import PaletteButton from "@/components/PaletteButton";
import HomeStudyStatus from "@/components/mastery/HomeStudyStatus";
import { semesters } from "@/lib/content";
import { BRANCH_NAME, BRANCH_RANGE, BRANCH_TAGLINE } from "@/lib/branch";

export default function HomePage() {
  return (
    <>
      <Header showSearch />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-10">
        {/* Compact hero */}
        <section className="space-y-4">
          <div className="eyebrow">{BRANCH_NAME} · {BRANCH_RANGE}</div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
            Study smarter. Score better.
          </h1>
          <p className="text-sm sm:text-base text-ink-lo leading-relaxed max-w-xl">
            Exam-focused notes, revision tools, important questions and AI-powered study modes —{" "}
            {BRANCH_TAGLINE}.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="#current-semester"
              className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
            >
              Continue Studying →
            </a>
            <Link
              href="/s3"
              className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
            >
              Browse Subjects
            </Link>
          </div>
          <div className="max-w-xl">
            <PaletteButton label="Search subjects, topics, questions, formulas…" large />
          </div>
        </section>

        {/* Current semester */}
        <section id="current-semester" className="scroll-mt-20 space-y-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="flex items-baseline gap-3">
              <span className="eyebrow">Current Semester</span>
            </div>
            <Link href="/s3" className="font-mono text-xs text-ink-lo hover:text-signal transition-colors">
              Continue →
            </Link>
          </div>
          <SemesterExplorer initialSemester="s3" />
        </section>

        {/* Study status / journey */}
        <HomeStudyStatus />

        {/* Study tools */}
        <section className="space-y-4">
          <h2 className="font-display font-semibold text-lg text-ink-hi">Study Tools</h2>
          <StudyTools />
        </section>

        {/* Prompt Lab */}
        <section className="card p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1 space-y-2">
            <span className="eyebrow">Prompt Lab</span>
            <h2 className="font-display font-semibold text-xl text-ink-hi">
              Turn any EC Engineering topic into a study session
            </h2>
            <p className="text-sm text-ink-lo leading-relaxed">
              Learn · Practice · Revise · Evaluate · Prepare. Prompt Lab understands semester,
              subject, module, topic, question and marks — so it works from any subject or exam
              question on the site.
            </p>
          </div>
          <Link
            href="/prompt-lab"
            className="shrink-0 font-mono text-xs uppercase tracking-wide px-5 py-3 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors text-center"
          >
            Open Prompt Lab →
          </Link>
        </section>

        {/* All semesters */}
        <section className="space-y-3">
          <h2 className="font-display font-semibold text-lg text-ink-hi">All Semesters</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {semesters.map((s) => (
              <Link
                key={s.id}
                href={`/${s.id}`}
                className="card p-4 flex flex-col gap-1 hover:border-signal transition-colors group"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide text-ink-lo">
                  {s.id.toUpperCase()}
                </span>
                <span className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors">
                  {s.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
