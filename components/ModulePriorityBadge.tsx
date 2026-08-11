"use client";

import { Module } from "@/lib/types";
import { modulePriority, PriorityTier } from "@/lib/study";

const TIER_STYLE: Record<PriorityTier, { cls: string; dot: string }> = {
  "must-learn": { cls: "border-critical/30 text-critical bg-critical/10", dot: "bg-critical" },
  core: { cls: "border-weight-dim text-weight bg-weight/10", dot: "bg-weight" },
  support: { cls: "border-bg-border text-ink-faint bg-bg", dot: "bg-ink-faint" },
};

export default function ModulePriorityBadge({
  module,
  index,
  totalModules,
}: {
  module: Module;
  index: number;
  totalModules: number;
}) {
  const pri = modulePriority(module, index, totalModules);
  const s = TIER_STYLE[pri.tier];
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md border ${s.cls}`}
      title={pri.reasons.join(" · ")}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden />
      {pri.tierLabel}
      <span className="text-ink-faint">·</span>
      <span>≈{pri.estimatedMinutes}m</span>
    </span>
  );
}
