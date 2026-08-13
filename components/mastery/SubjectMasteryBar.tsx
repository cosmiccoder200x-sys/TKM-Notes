"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import registry from "@/lib/notes";
import {
  getProgress,
  calculateSubjectMastery,
  getSubjectRecommendations,
} from "@/lib/study";
import MasteryBar from "./MasteryBar";
import { NavIcon } from "@/components/navigation/navItems";

export default function SubjectMasteryBar({
  subjectCode,
  subjectSlug,
  semesterId,
}: {
  subjectCode: string;
  subjectSlug: string;
  semesterId: string;
}) {
  const [ready, setReady] = useState(false);
  const [overall, setOverall] = useState<number | null>(null);
  const [assessed, setAssessed] = useState(0);
  const [total, setTotal] = useState(0);
  const [nextModule, setNextModule] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    const progress = getProgress();
    const content = registry[subjectCode];
    if (!content) {
      setReady(true);
      return;
    }
    const moduleIds = content.modules.map((m) => m.id);
    const summary = calculateSubjectMastery(subjectCode, moduleIds, progress[subjectCode] ?? {});
    setOverall(summary.overall);
    setAssessed(summary.assessedModules);
    setTotal(summary.totalModules);

    const recs = getSubjectRecommendations(subjectCode, progress).filter((r) => r.priority >= 0);
    if (recs.length > 0) {
      const top = recs[0];
      setNextModule({ id: top.moduleId, title: top.moduleTitle });
    }
    setReady(true);
  }, [subjectCode]);

  if (!ready) return null;

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="eyebrow">your preparation</span>
          {overall !== null ? (
            <span className="font-display font-bold text-signal text-lg">{overall}%</span>
          ) : (
            <span className="font-mono text-xs text-ink-faint">Nothing assessed yet</span>
          )}
        </div>
        <span className="text-xs font-mono text-ink-faint">
          {assessed}/{total} modules assessed
        </span>
      </div>

      {overall !== null && <MasteryBar value={overall} className="h-2" />}

      {nextModule && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-ink-faint">Next:</span>
          <span className="text-ink-hi font-medium">{nextModule.title}</span>
          <Link
            href={`/${semesterId}/${subjectSlug}#${nextModule.id}`}
            className="ml-auto font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-md border border-signal text-signal hover:bg-signal/10 transition-colors"
          >
            Continue →
          </Link>
        </div>
      )}

      {nextModule === null && overall === null && (
        <Link
          href={`/night-before?subject=${encodeURIComponent(subjectCode)}&time=60`}
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide px-3.5 py-2 rounded-md border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors"
        >
          <NavIcon name="revision" className="w-4 h-4" /> Start a 1-hour last-minute plan
        </Link>
      )}
    </div>
  );
}
