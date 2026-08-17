"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress, calculateModuleMastery, masteryLabel, progressSubjectKey } from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { programSlug } from "@/lib/urls";
import { NavIcon } from "@/components/navigation/navItems";

export default function ModuleMasteryChip({
  subjectCode,
  moduleId,
  programId = "ER",
}: {
  subjectCode: string;
  moduleId: string;
  programId?: ProgramId;
}) {
  const [ready, setReady] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [status, setStatus] = useState<ReturnType<typeof calculateModuleMastery>["status"]>("not-assessed");

  useEffect(() => {
    const p = getProgress()[progressSubjectKey(programId, subjectCode)]?.[moduleId];
    const mastery = calculateModuleMastery(p);
    setScore(mastery.score);
    setStatus(mastery.status);
    setReady(true);
  }, [subjectCode, moduleId, programId]);

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
        href={`/night-before?subject=${encodeURIComponent(subjectCode)}&program=${programSlug(programId)}&time=60`}
        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
      >
        <NavIcon name="revision" className="w-3.5 h-3.5" /> Night-Before
      </Link>
    </div>
  );
}
