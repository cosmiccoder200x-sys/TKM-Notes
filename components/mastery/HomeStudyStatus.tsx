"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSubjectContent } from "@/lib/notes";
import { subjects } from "@/lib/content";
import {
  getProgress,
  calculateSubjectMastery,
  getTopRecommendation,
  estimatedModuleMinutes,
  progressSubjectKey,
} from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { subjectUrl, masteryUrl } from "@/lib/urls";

export default function HomeStudyStatus() {
  const [ready, setReady] = useState(false);
  const [overall, setOverall] = useState<number | null>(null);
  const [needsAttention, setNeedsAttention] = useState(0);
  const [strong, setStrong] = useState(0);
  const [assessed, setAssessed] = useState(0);
  const [subjectsWithProgress, setSubjectsWithProgress] = useState(0);
  const [minutesToClose, setMinutesToClose] = useState(0);
  const [bestSubject, setBestSubject] = useState<{ code: string; programId: ProgramId } | null>(null);
  const [topModule, setTopModule] = useState<string | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);

  useEffect(() => {
    const progress = getProgress();
    const withContent = subjects.filter((s) => getSubjectContent(s.code, s.programId));

    let sum = 0;
    let n = 0;
    let attention = 0;
    let strongCount = 0;
    let assessedCount = 0;
    let subjectsAssessed = 0;
    let minutesToClose = 0;
    let best: { code: string; programId: ProgramId } | null = null;
    let bestAttention = -1;

    for (const s of withContent) {
      const content = getSubjectContent(s.code, s.programId);
      if (!content) continue;
      const moduleIds = content.modules.map((m) => m.id);
      const key = progressSubjectKey(s.programId, s.code);
      const summary = calculateSubjectMastery(s.code, moduleIds, progress[key] ?? {});

      // Estimated minutes still needed for modules not yet strong.
      content.modules.forEach((m) => {
        const mastery = summary.moduleMap[m.id];
        if (mastery.status !== "strong") minutesToClose += estimatedModuleMinutes(m);
      });

      if (summary.overall !== null) {
        sum += summary.overall;
        n += 1;
        subjectsAssessed += 1;
        if (summary.overall >= 90) strongCount += 1;
        if (summary.needsAttention > bestAttention) {
          bestAttention = summary.needsAttention;
          best = { code: s.code, programId: s.programId };
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
    setSubjectsWithProgress(subjectsAssessed);
    setMinutesToClose(minutesToClose);
    setBestSubject(best);
    if (best) setTopModule(getTopRecommendation(best.code, progress, best.programId)?.moduleTitle ?? null);
    const firstWritten = withContent[0];
    setFallbackHref(
      firstWritten
        ? subjectUrl(firstWritten.programId, firstWritten.semesterId, firstWritten.slug)
        : "/syllabus/cse"
    );
    setReady(true);
  }, []);

  if (!ready) return null;

  const hasData = assessed > 0;
  const bestSubjectObj = bestSubject
    ? subjects.find((s) => s.code === bestSubject.code && s.programId === bestSubject.programId)
    : undefined;
  const masteryHref = bestSubjectObj
    ? masteryUrl(bestSubjectObj.programId, bestSubjectObj.semesterId, bestSubjectObj.slug)
    : fallbackHref ?? "/syllabus/cse";

  if (!hasData) {
    return (
      <section className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 space-y-1.5">
          <span className="eyebrow">my preparation</span>
          <h2 className="font-display font-semibold text-xl text-ink-hi">Start Your Study Journey</h2>
          <p className="text-sm text-ink-lo">
            Complete a few self-checks to build your preparation dashboard. Answer honestly — it
            drives your study plans and Night-Before plans.
          </p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <Link
            href="/planner"
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors text-center"
          >
            Build My Plan →
          </Link>
          <Link
            href={fallbackHref ?? "/syllabus/cse"}
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors text-center"
          >
            Start Practice
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card p-5 space-y-4">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <span className="eyebrow">my preparation</span>
          <h2 className="font-display font-semibold text-xl text-ink-hi mt-1">
            Overall estimated mastery: <span className="text-signal">{overall}%</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="chip border-signal-dim text-signal">{strong} strong</span>
          <span className="chip border-critical/40 text-critical">{needsAttention} need attention</span>
          {minutesToClose > 0 && (
            <span className="chip">
              ≈ {minutesToClose >= 60 ? `${Math.round(minutesToClose / 60)}h` : `${minutesToClose}m`} to close weak areas
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-ink-lo">
          {subjectsWithProgress} subject{subjectsWithProgress !== 1 ? "s" : ""} assessed ·{" "}
          {assessed} module{assessed !== 1 ? "s" : ""}
        </span>
        {topModule && bestSubjectObj && (
          <span className="text-ink-lo">
            Next: <span className="text-ink-hi font-medium">{topModule}</span>
            <span className="text-ink-faint">
              {" "}· {bestSubjectObj.name} ({bestSubjectObj.programId})
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
