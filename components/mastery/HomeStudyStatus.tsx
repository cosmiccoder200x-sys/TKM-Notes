"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import registry from "@/lib/notes";
import { subjects } from "@/lib/content";
import { getProgress, calculateSubjectMastery, getTopRecommendation } from "@/lib/study";

export default function HomeStudyStatus() {
  const [ready, setReady] = useState(false);
  const [overall, setOverall] = useState<number | null>(null);
  const [needsAttention, setNeedsAttention] = useState(0);
  const [strong, setStrong] = useState(0);
  const [assessed, setAssessed] = useState(0);
  const [bestSubject, setBestSubject] = useState<string | null>(null);
  const [topModule, setTopModule] = useState<string | null>(null);

  useEffect(() => {
    const progress = getProgress();
    const withContent = subjects.filter((s) => registry[s.code]);

    let sum = 0;
    let n = 0;
    let attention = 0;
    let strongCount = 0;
    let assessedCount = 0;
    let bestCode: string | null = null;
    let bestAttention = -1;

    for (const s of withContent) {
      const moduleIds = registry[s.code].modules.map((m) => m.id);
      const summary = calculateSubjectMastery(s.code, moduleIds, progress[s.code] ?? {});
      if (summary.overall !== null) {
        sum += summary.overall;
        n += 1;
        if (summary.overall >= 90) strongCount += 1;
        if (summary.needsAttention > bestAttention) {
          bestAttention = summary.needsAttention;
          bestCode = s.code;
        }
      }
      attention += summary.needsAttention;
      strongCount += summary.strong;
      assessedCount += summary.assessedModules;
    }

    setOverall(n > 0 ? Math.round(sum / n) : null);
    setNeedsAttention(attention);
    setStrong(strongCount);
    setAssessed(assessedCount);
    setBestSubject(bestCode);
    if (bestCode) setTopModule(getTopRecommendation(bestCode, progress)?.moduleTitle ?? null);
    setReady(true);
  }, []);

  if (!ready) return null;

  const hasData = assessed > 0;
  const masteryHref = bestSubject
    ? `/${subjects.find((s) => s.code === bestSubject)?.semesterId}/${subjects.find((s) => s.code === bestSubject)?.slug}/mastery`
    : "/s3/digital-electronics-and-logic-design";

  if (!hasData) {
    return (
      <section className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 space-y-1.5">
          <span className="eyebrow">your study journey</span>
          <h2 className="font-display font-semibold text-xl text-ink-hi">Start Your Study Journey</h2>
          <p className="text-sm text-ink-lo">
            Complete a few self-checks to build your mastery map. Answer honestly — it drives your
            recommendations and Night-Before plans.
          </p>
        </div>
        <Link
          href="/s3/digital-electronics-and-logic-design"
          className="shrink-0 font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors text-center"
        >
          Start Practice →
        </Link>
      </section>
    );
  }

  return (
    <section className="card p-5 space-y-4">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <span className="eyebrow">your study status</span>
          <h2 className="font-display font-semibold text-xl text-ink-hi mt-1">
            Overall estimated mastery: <span className="text-signal">{overall}%</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="chip border-signal-dim text-signal">{strong} strong</span>
          <span className="chip border-critical/40 text-critical">{needsAttention} need attention</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        {topModule && bestSubject && (
          <span className="text-ink-lo">
            Next: <span className="text-ink-hi font-medium">{topModule}</span>
            <span className="text-ink-faint">
              {" "}· {subjects.find((s) => s.code === bestSubject)?.name}
            </span>
          </span>
        )}
        <Link
          href={masteryHref}
          className="ml-auto font-mono text-xs uppercase tracking-wide px-4 py-2 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
        >
          Continue →
        </Link>
      </div>
    </section>
  );
}
