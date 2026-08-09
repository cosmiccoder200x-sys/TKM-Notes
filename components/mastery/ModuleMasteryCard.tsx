import Link from "next/link";
import { ModuleMastery, masteryLabel } from "@/lib/study";
import MasteryBar from "./MasteryBar";
import MasteryStatus from "./MasteryStatus";

export default function ModuleMasteryCard({
  moduleId,
  index,
  moduleTitle,
  mastery,
  href,
  onSelect,
  selected = false,
}: {
  moduleId: string;
  index: number;
  moduleTitle: string;
  mastery: ModuleMastery;
  href: string;
  onSelect?: () => void;
  selected?: boolean;
}) {
  const assessed = mastery.score !== null;
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            Module {String(index).padStart(2, "0")}
          </div>
          <div className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors text-sm leading-snug mt-0.5">
            {moduleTitle}
          </div>
        </div>
      </div>

      {assessed ? (
        <>
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-sm font-display font-bold text-ink-hi">{mastery.score}%</span>
              <span className="text-[10px] font-mono text-ink-faint">{mastery.attempts} attempts</span>
            </div>
            <MasteryBar value={mastery.score ?? 0} />
          </div>
          <MasteryStatus status={mastery.status} label={masteryLabel(mastery.status)} />
        </>
      ) : (
        <>
          <div className="text-sm text-ink-lo">Not assessed</div>
          <MasteryStatus status="not-assessed" label="Not assessed" />
        </>
      )}
    </>
  );

  const baseCls = `card p-4 flex flex-col gap-2.5 transition-colors ${
    selected ? "border-signal" : "hover:border-signal"
  }`;

  if (onSelect) {
    return (
      <button onClick={onSelect} className={`${baseCls} group text-left`} aria-pressed={selected}>
        {inner}
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint group-hover:text-signal">
          {selected ? "− details open" : "+ details"}
        </span>
      </button>
    );
  }

  return (
    <Link href={href} className={`${baseCls} group`}>
      {inner}
    </Link>
  );
}
