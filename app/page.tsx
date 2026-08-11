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
    <main className="max-w-4xl mx-auto py-4 space-y-12">
      {/* Hero — editorial greeting */}
      <section className="space-y-6 relative">
        {/* Soft background aura glow */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-signal/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3">
          <div className="eyebrow flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            {PRODUCT_NAME} · {BRANCH_NAME} · {BRANCH_RANGE}
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink-hi leading-[1.1] tracking-tight max-w-3xl">
            Prep less. <span className="bg-gradient-to-r from-signal to-signal-dim bg-clip-text text-transparent">Prioritize better.</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-lo leading-relaxed max-w-2xl font-light">
            A premium academic workspace engineered with prioritizing algorithms, curated revision content, and exam notes for Electrical & Computer Engineering.
          </p>
        </div>

        {/* Search & Planner Widget Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {/* Search / Command Bar */}
          <div className="card p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-signal uppercase tracking-wider">
                <span>⌘ Command Palette</span>
              </div>
              <p className="text-xs text-ink-lo">Instant access to all subject notes, formulas, and topic definitions.</p>
            </div>
            <PaletteButton label="Search subjects, topics, formulas..." large />
          </div>

          {/* Quick planner */}
          <div className="card p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-mono text-signal uppercase tracking-wider">
                <span>✱ AI Study Planner</span>
              </div>
              <p className="text-xs text-ink-lo">Tell us your time budget. We generate a custom optimized revision track.</p>
            </div>
            <QuickPlannerForm />
          </div>
        </div>

        {/* Action tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/planner"
            className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full border border-bg-border text-ink-hi hover:border-signal hover:text-signal hover:bg-signal/5 transition-all"
          >
            Open Full Planner →
          </Link>
          <a
            href="#current-semester"
            className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full bg-signal text-white hover:bg-signal-dim transition-all shadow-sm"
          >
            Browse Notes
          </a>
        </div>
      </section>

      {/* How it works — editorial cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Prioritize", body: "Every module ranked by real exam weightage — know exactly what the paper rewards." },
          { title: "Plan", body: "Tell us the time you have. Get a step-by-step plan with reasons, not generic advice." },
          { title: "Practice", body: "Attack HIGH PRIORITY questions first, grouped by type so you spot the pattern." },
          { title: "Revise", body: "Speed-revise with formulas, definitions and night-before bullets that actually stick." },
        ].map((s, i) => (
          <div key={s.title} className="card p-5 flex flex-col gap-2 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-bg-border group-hover:bg-signal transition-all" />
            <span className="font-mono text-[10px] text-signal font-bold">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display font-bold text-base text-ink-hi tracking-wide">{s.title}</span>
            <span className="text-xs text-ink-lo leading-relaxed font-light">{s.body}</span>
          </div>
        ))}
      </section>

      {/* Current semester */}
      <section id="current-semester" className="scroll-mt-20 space-y-6 pt-4">
        <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border/40 pb-3">
          <div className="flex items-baseline gap-3">
            <span className="eyebrow text-ink-hi">Current Semester</span>
          </div>
          <Link href="/s3" className="font-mono text-[11px] text-signal hover:text-signal-dim transition-colors uppercase tracking-wider">
            Continue Reading →
          </Link>
        </div>
        <SemesterExplorer initialSemester="s3" />
      </section>

      {/* Study status / journey */}
      <div className="pt-2">
        <HomeStudyStatus />
      </div>

      {/* Study tools */}
      <section className="space-y-6 pt-2">
        <h2 className="font-display font-bold text-xl text-ink-hi tracking-wide">Academic Tool deck</h2>
        <StudyTools />
      </section>

      {/* All semesters */}
      <section className="space-y-6 pt-2">
        <h2 className="font-display font-bold text-xl text-ink-hi tracking-wide">All Semesters</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {semesters.map((s) => (
            <Link
              key={s.id}
              href={`/${s.id}`}
              className="card p-4 flex flex-col gap-1.5 hover:border-signal/50 hover:bg-bg-raised/40 transition-all group rounded-xl"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-ink-lo group-hover:text-signal transition-colors">
                {s.id.toUpperCase()}
              </span>
              <span className="font-display font-semibold text-sm text-ink-hi group-hover:text-signal transition-colors">
                {s.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}