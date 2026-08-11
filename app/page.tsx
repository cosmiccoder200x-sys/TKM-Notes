import Link from "next/link";
import SemesterExplorer from "@/components/SemesterExplorer";
import StudyTools from "@/components/StudyTools";
import PaletteButton from "@/components/PaletteButton";
import HomeStudyStatus from "@/components/mastery/HomeStudyStatus";
import QuickPlannerForm from "@/components/planner/QuickPlannerForm";
import { semesters } from "@/lib/content";
import { BRANCH_NAME, BRANCH_RANGE, PRODUCT_NAME, PRODUCT_POSITIONING, PRODUCT_TAGLINE } from "@/lib/branch";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Hero — editorial greeting */}
      <section className="space-y-6">
        <div className="eyebrow">
          {PRODUCT_NAME} · {BRANCH_NAME} · {BRANCH_RANGE}
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink-hi leading-tight tracking-tight max-w-2xl">
          {PRODUCT_POSITIONING}
        </h1>
        <p className="text-base sm:text-lg text-ink-lo leading-relaxed max-w-2xl">
          A focused academic workspace for notes, questions, revision and exam preparation.
        </p>

        {/* Search / Command Bar */}
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-faint uppercase tracking-wide">
            <span className="text-signal">⌘</span> Search notes, subjects, modules…
          </div>
          <PaletteButton label="Search subjects, topics, questions, formulas…" large />
        </div>

        {/* Quick planner */}
        <div className="max-w-2xl space-y-2 pt-4 border-t border-bg-border">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-faint uppercase tracking-wide">
            <span className="text-signal">✱</span> What should I study now?
          </div>
          <QuickPlannerForm />
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/planner"
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-md border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
          >
            Open full planner →
          </Link>
          <a
            href="#current-semester"
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-md border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
          >
            Browse Notes
          </a>
        </div>
      </section>

      {/* How it works — editorial cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { title: "Prioritize", body: "Every module ranked by real exam weightage — know exactly what the paper rewards." },
          { title: "Plan", body: "Tell us the time you have. Get a step-by-step plan with reasons, not generic advice." },
          { title: "Practice", body: "Attack HIGH PRIORITY questions first, grouped by type so you spot the pattern." },
          { title: "Revise", body: "Speed-revise with formulas, definitions and night-before bullets that actually stick." },
        ].map((s, i) => (
          <div key={s.title} className="card p-4 flex flex-col gap-1.5">
            <span className="font-mono text-[10px] text-signal">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display font-semibold text-ink-hi">{s.title}</span>
            <span className="text-sm text-ink-lo leading-relaxed">{s.body}</span>
          </div>
        ))}
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
  );
}