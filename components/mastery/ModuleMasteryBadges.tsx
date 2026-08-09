"use client";

import { useEffect, useState } from "react";
import { Module } from "@/lib/types";
import { getProgress, calculateModuleMastery } from "@/lib/study";

export default function ModuleMasteryBadges({
  subjectCode,
  modules,
}: {
  subjectCode: string;
  modules: Module[];
}) {
  const [ready, setReady] = useState(false);
  const [scores, setScores] = useState<Record<string, number | null>>({});

  useEffect(() => {
    const p = getProgress()[subjectCode] ?? {};
    const m: Record<string, number | null> = {};
    for (const mod of modules) {
      m[mod.id] = calculateModuleMastery(p[mod.id]).score;
    }
    setScores(m);
    setReady(true);
  }, [subjectCode, modules]);

  if (!ready) return null;

  return (
    <span className="inline-flex flex-wrap gap-1.5" aria-label="Module mastery">
      {modules.map((mod, i) => {
        const score = scores[mod.id];
        return (
          <span
            key={mod.id}
            className={`font-mono text-[10px] px-1.5 py-0.5 rounded-card border ${
              score === null
                ? "border-bg-border text-ink-faint"
                : score >= 75
                  ? "border-signal-dim text-signal bg-signal/10"
                  : score >= 50
                    ? "border-weight-dim text-weight bg-weight/5"
                    : "border-critical/40 text-critical bg-critical/5"
            }`}
          >
            M{i + 1} {score === null ? "—" : `${score}%`}
          </span>
        );
      })}
    </span>
  );
}
