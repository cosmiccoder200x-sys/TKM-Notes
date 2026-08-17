"use client";

import { useEffect, useState } from "react";
import { Module, ProgramId } from "@/lib/types";
import { getProgress, calculateModuleMastery, progressSubjectKey } from "@/lib/study";

export default function ModuleMasteryBadges({
  subjectCode,
  modules,
  programId = "ER",
}: {
  subjectCode: string;
  modules: Module[];
  programId?: ProgramId;
}) {
  const [ready, setReady] = useState(false);
  const [scores, setScores] = useState<Record<string, number | null>>({});

  useEffect(() => {
    const p = getProgress()[progressSubjectKey(programId, subjectCode)] ?? {};
    const m: Record<string, number | null> = {};
    for (const mod of modules) {
      m[mod.id] = calculateModuleMastery(p[mod.id]).score;
    }
    setScores(m);
    setReady(true);
  }, [subjectCode, modules, programId]);

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
