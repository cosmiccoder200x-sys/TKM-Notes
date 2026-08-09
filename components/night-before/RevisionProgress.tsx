import { NightBeforeSession } from "@/lib/study";

export default function RevisionProgress({ session }: { session: NightBeforeSession }) {
  const total = session.plan.sections.length;
  const done = session.completedSections.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-lo">
          Revision progress
        </span>
        <span className="font-mono text-xs text-ink-hi">
          {done} / {total} sections
        </span>
      </div>
      <div
        className="h-2 rounded-full bg-bg-border overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Revision progress ${pct}%`}
      >
        <div className="h-full rounded-full bg-signal transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
