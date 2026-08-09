import type { MasteryStatus } from "@/lib/study";

// Text label is always present — color is only an enhancement, never the only signal.
const STYLES: Record<MasteryStatus, { cls: string; dot: string }> = {
  strong: { cls: "border-signal-dim text-signal bg-signal/10", dot: "bg-signal" },
  good: { cls: "border-weight-dim text-weight bg-weight/5", dot: "bg-weight" },
  "needs-practice": { cls: "border-critical/40 text-critical bg-critical/5", dot: "bg-critical" },
  weak: { cls: "border-critical text-critical bg-critical/10", dot: "bg-critical" },
  "not-assessed": { cls: "border-bg-border text-ink-lo", dot: "bg-ink-faint" },
};

export default function MasteryStatus({ status, label }: { status: MasteryStatus; label: string }) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-card border ${s.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden />
      {label}
    </span>
  );
}
