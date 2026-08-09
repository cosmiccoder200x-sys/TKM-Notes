"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress, calculateModuleMastery, masteryLabel } from "@/lib/study";

export default function ModuleMasteryChip({
  subjectCode,
  moduleId,
}: {
  subjectCode: string;
  moduleId: string;
}) {
  const [ready, setReady] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [status, setStatus] = useState<ReturnType<typeof calculateModuleMastery>["status"]>("not-assessed");

  useEffect(() => {
    const p = getProgress()[subjectCode]?.[moduleId];
    const mastery = calculateModuleMastery(p);
    setScore(mastery.score);
    setStatus(mastery.status);
    setReady(true);
  }, [subjectCode, moduleId]);

  if (!ready) return null;

  const assessed = score !== null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-card border ${
          !assessed
            ? "border-bg-border text-ink-faint"
            : status === "strong" || status === "good"
              ? "border-signal-dim text-signal bg-signal/10"
              : "border-critical/40 text-critical bg-critical/5"
        }`}
      >
        {assessed ? `Mastery ${score}% · ${masteryLabel(status)}` : "Not assessed"}
      </span>
      <Link
        href={`/night-before?subject=${encodeURIComponent(subjectCode)}&time=60`}
        className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
      >
        ⏱ Night-Before
      </Link>
    </div>
  );
}
