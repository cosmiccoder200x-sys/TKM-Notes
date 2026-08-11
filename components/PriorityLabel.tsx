import { Weightage } from "@/lib/types";

export type PriorityTier = "VERY HIGH" | "HIGH" | "MEDIUM" | "LOW";

const MAP: Record<Weightage, { tier: PriorityTier; cls: string; aria: string }> = {
  high: { tier: "VERY HIGH", cls: "border-critical/30 text-critical bg-critical/10", aria: "Very high priority" },
  medium: { tier: "HIGH", cls: "border-weight-dim text-weight bg-weight/10", aria: "High priority" },
  low: { tier: "MEDIUM", cls: "border-bg-border text-ink-faint bg-bg", aria: "Medium priority" },
};

export function priorityTierFor(weightage: Weightage): PriorityTier {
  return MAP[weightage].tier;
}

export default function PriorityLabel({ level }: { level: Weightage }) {
  const m = MAP[level];
  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md border ${m.cls}`}
      title={m.aria}
    >
      {m.tier}
    </span>
  );
}
