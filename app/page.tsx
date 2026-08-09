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
            Find the best prompt for what you need to do with AI.
          </h1>
          <p className="text-sm sm:text-base text-ink-lo leading-relaxed max-w-xl">
            Learn, practice, revise or prepare for exams with ready-made prompts for any AI.
            TKM notes are the optional context that makes responses even more specific —{" "}
            {BRANCH_TAGLINE}.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/prompt-lab"
              className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
            >
              Open Prompt Lab →
            </Link>
            <a
              href="#current-semester"
              className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
            >
              Browse Notes
            </a>
          </div>
          <div className="max-w-xl">
            <PaletteButton label="Search subjects, topics, questions, formulas…" large />
          </div>
        </section>

        {/* Prompt Lab — the primary product */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <span className="eyebrow">Prompt Lab</span>
            <Link href="/prompt-lab" className="font-mono text-xs text-ink-lo hover:text-signal transition-colors">
              Open →
            </Link>
          </div>
          <div className="card p-6 space-y-3">
            <h2 className="font-display font-semibold text-xl text-ink-hi">
              Copy a prompt. Use it with ChatGPT, Gemini, Claude or any AI.
            </h2>
            <p className="text-sm text-ink-lo leading-relaxed max-w-2xl">
              Learn · Practice · Revise · Evaluate · Prepare. Every prompt works on its own —
              no subject or module required. Add your notes as optional context for more
              specific answers.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/prompt-lab"
                className="font-mono text-xs uppercase tracking-wide px-5 py-3 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
              >
                Find a Prompt
              </Link>
              <Link
                href="/prompt-lab?mode=revision"
                className="font-mono text-xs uppercase tracking-wide px-5 py-3 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
              >
                Quick Revision
              </Link>
              <Link
                href="/prompt-lab?mode=exam-answer"
                className="font-mono text-xs uppercase tracking-wide px-5 py-3 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
              >
                Exam Answer
              </Link>
            </div>
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
