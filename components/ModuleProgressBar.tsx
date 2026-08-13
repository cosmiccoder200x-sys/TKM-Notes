import { masteryLabel, statusForScore } from "@/lib/study";

export default function ModuleProgressBar({
  score,
  showLabel = true,
}: {
  score: number | null;
  showLabel?: boolean;
}) {
  const pct = score === null ? 0 : score;
  const label = score === null ? "not assessed" : `${score}% · ${masteryLabel(statusForScore(score))}`;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wide">
        <span className="text-ink-faint">Module Progress</span>
        {showLabel && (
          <span className={score === null ? "text-ink-faintest" : "text-signal"}>{label}</span>
        )}
      </div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={label}
        aria-label="Module mastery progress"
      >
        <span
          className={score === null ? "progress-faint" : "progress-signal"}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}