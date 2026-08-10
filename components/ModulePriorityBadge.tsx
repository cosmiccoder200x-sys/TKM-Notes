"use client";

import { useState } from "react";
import { Module } from "@/lib/types";
import { modulePriority } from "@/lib/study";

const TIER_STYLES: Record<string, string> = {
  "must-learn": "border-critical/40 text-critical bg-critical/10",
  core: "border-weight-dim text-weight bg-weight/10",
  support: "border-bg-border text-ink-faint bg-transparent",
};

const TIER_ICON: Record<string, string> = {
  "must-learn": "🔥",
  core: "●",
  support: "○",
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
  const [open, setOpen] = useState(false);
  const pri = modulePriority(module, index, totalModules);

  return (
    <span className="relative inline-flex shrink-0">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border transition-colors ${TIER_STYLES[pri.tier]}`}
        title="Why should I study this?"
      >
        <span aria-hidden>{TIER_ICON[pri.tier]}</span>
        <span>{pri.tierLabel}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-7 z-20 w-64 card p-3 space-y-1.5" onClick={(e) => e.stopPropagation()}>
          <div className="eyebrow">why {pri.tierLabel.toLowerCase()}?</div>
          <ul className="space-y-1">
            {pri.reasons.map((r, i) => (
              <li key={i} className="text-xs text-ink-lo flex gap-2">
                <span className="text-signal shrink-0">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <div className="text-[11px] font-mono text-ink-faint pt-1 border-t border-bg-border">
            ≈ {pri.estimatedMinutes} min of content
          </div>
        </div>
      )}
    </span>
  );
}
