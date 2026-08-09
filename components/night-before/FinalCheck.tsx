"use client";

import Link from "next/link";
import { NightBeforeSession } from "@/lib/study";

const CHECKS = [
  "Explain the key concepts",
  "Recall important definitions",
  "Reproduce important diagrams",
  "Solve important examples",
  "Answer high-priority questions",
];

export default function FinalCheck({
  session,
  onRestart,
}: {
  session: NightBeforeSession;
  onRestart: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-1">night-before · complete</div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-hi leading-tight">
          You&apos;re done.
        </h1>
        <p className="text-sm text-ink-lo mt-2 max-w-xl">
          Before the exam, make sure you can:
        </p>
      </div>

      <ul className="space-y-2">
        {CHECKS.map((c) => (
          <li key={c} className="flex items-center gap-2.5 text-sm text-ink-hi">
            <span className="text-signal shrink-0">✓</span>
            {c}
          </li>
        ))}
      </ul>

      <div className="card p-4 space-y-2">
        <div className="font-mono text-[11px] uppercase tracking-wide text-ink-lo">Session summary</div>
        <div className="text-sm text-ink-hi">
          {session.completedSections.length}/{session.plan.sections.length} sections reviewed ·{" "}
          {session.reviewedItems.length} items
        </div>
        <div className="text-xs text-ink-lo">
          {session.plan.subjectName} · {session.plan.availableMinutes} min plan
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href={`/night-before?subject=${encodeURIComponent(session.subjectCode)}&fresh=1`}
          className="flex-1 text-center font-mono text-sm uppercase tracking-wide py-3 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
        >
          Final Self-Check
        </Link>
        <button
          onClick={onRestart}
          className="flex-1 text-center font-mono text-sm uppercase tracking-wide py-3 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
        >
          Restart Revision
        </button>
      </div>
    </div>
  );
}
