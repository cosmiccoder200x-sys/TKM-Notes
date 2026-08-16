import Link from "next/link";
import type { Metadata } from "next";
import { LEARN_GOALS } from "@/lib/learn-cs/categories";
import { PRODUCT_NAME } from "@/lib/branch";
import GoalsView from "@/components/learn-cs/GoalsView";
import RoadmapView from "@/components/learn-cs/RoadmapView";

export const metadata: Metadata = {
  title: `CS Roadmap — Learn CS — ${PRODUCT_NAME}`,
  description:
    "The Learn CS roadmap in levels 0–5. Pick a goal, follow a recommended order, or jump straight to any subject.",
};

export default function LearnCsRoadmapPage() {
  return (
    <main className="max-w-5xl mx-auto py-8 space-y-10">
      <header className="space-y-3 border-b border-bg-border pb-6">
        <div className="section-kicker">Learn CS · Roadmap</div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink-hi leading-[1.1] tracking-tight">
          The CS Roadmap, <span className="text-signal">level by level</span>.
        </h1>
        <p className="text-base text-ink-lo leading-relaxed max-w-2xl font-light">
          Levels 0–5 take you from first program to specialization. You are never locked in —
          the roadmap is a guide, not a gate. Pick a goal below or follow the full path.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <span className="eyebrow text-ink-hi">Pick a goal</span>
            <p className="text-sm text-ink-lo mt-1 max-w-xl">
              Each goal is an ordered subset of the roadmap. Your recommendations adapt to the goal
              you choose — and you can always ignore them and study anything.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            {LEARN_GOALS.length} goals
          </span>
        </div>
        <GoalsView />
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border/40 pb-3">
          <div className="flex items-baseline gap-3">
            <span className="eyebrow text-ink-hi">Full roadmap</span>
          </div>
          <Link
            href="/learn-cs"
            className="font-mono text-[11px] text-signal hover:text-signal-dim transition-colors uppercase tracking-wider"
          >
            Back to Learn CS →
          </Link>
        </div>
        <RoadmapView />
      </section>
    </main>
  );
}