"use client";

import { NightBeforeSession } from "@/lib/study";

const TIER_LABEL: Record<string, string> = {
  "must-know": "MUST KNOW",
  "high-value": "HIGH VALUE",
  "if-time": "IF TIME",
};

export default function RevisionPlan({
  session,
  onStart,
  onDone,
}: {
  session: NightBeforeSession;
  onStart: (sectionId: string) => void;
  onDone: () => void;
}) {
  const { plan, completedSections } = session;
  const allDone = completedSections.length >= plan.sections.length;

  return (
    <div className="space-y-4">
      <div>
        <div className="eyebrow mb-1">night-before · {plan.availableMinutes} min</div>
        <h1 className="font-display font-bold text-2xl text-ink-hi leading-tight">{plan.subjectName}</h1>
        <p className="text-xs font-mono text-ink-lo mt-1">
          {plan.availableMinutes} minutes left · target {plan.target.toUpperCase()}
        </p>
      </div>

      <ol className="space-y-3">
        {plan.sections.map((s) => {
          const done = completedSections.includes(s.id);
          return (
            <li key={s.id} className="card p-4 flex items-center gap-4">
              <div className="flex flex-col items-center shrink-0">
                <span className="font-mono text-[10px] text-ink-faint">STEP</span>
                <span className="font-mono text-xl font-bold text-signal">
                  {String(s.order + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display font-semibold text-ink-hi text-[15px]">{s.title}</h2>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint border border-bg-border rounded px-1.5 py-0.5">
                    {TIER_LABEL[s.tier] ?? s.tier}
                  </span>
                </div>
                <div className="text-xs font-mono text-ink-lo mt-1">
                  {s.minutes} min · {s.items.length} items
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {s.items.slice(0, 6).map((it) => (
                    <span key={it.id} className="text-[11px] text-ink-lo truncate max-w-[180px]">
                      • {it.label}
                    </span>
                  ))}
                  {s.items.length > 6 && (
                    <span className="text-[11px] text-ink-faint">+{s.items.length - 6} more</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onStart(s.id)}
                disabled={done}
                className={`shrink-0 font-mono text-xs uppercase tracking-wide px-4 py-2 rounded-card border transition-colors ${
                  done
                    ? "border-signal text-signal bg-signal/10 cursor-default"
                    : "border-signal text-signal hover:bg-signal/10"
                }`}
              >
                {done ? "✓ Done" : "Start"}
              </button>
            </li>
          );
        })}
      </ol>

      {allDone && (
        <button
          onClick={onDone}
          className="w-full text-center font-mono text-sm uppercase tracking-wide py-3 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
        >
          Finish Revision →
        </button>
      )}
    </div>
  );
}
