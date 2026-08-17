"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSubjectContent } from "@/lib/notes";
import {
  getProgress,
  calculateSubjectMastery,
  getSubjectRecommendations,
  masteryLabel,
  progressSubjectKey,
  ProgressMap,
} from "@/lib/study";
import { ModuleProgress } from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { subjectUrl, programSlug } from "@/lib/urls";
import MasteryBar from "./MasteryBar";
import MasteryStatus from "./MasteryStatus";
import ModuleMasteryCard from "./ModuleMasteryCard";
import WeakAreas from "./WeakAreas";
import NextStudyRecommendation from "./NextStudyRecommendation";

export default function MasteryMap({
  subjectCode,
  subjectName,
  subjectSlug,
  semesterId,
  programId = "ER",
}: {
  subjectCode: string;
  subjectName: string;
  subjectSlug: string;
  semesterId: string;
  programId?: ProgramId;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  // Read localStorage after mount to avoid hydration mismatch.
  const [progress, setProgress] = useState<ProgressMap>({});
  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const key = progressSubjectKey(programId, subjectCode);
  const subjectProgress = progress[key] ?? {};
  const content = getSubjectContent(subjectCode, programId);
  const moduleIds = content?.modules.map((m) => m.id) ?? [];
  const summary = calculateSubjectMastery(subjectCode, moduleIds, subjectProgress);
  const recs = getSubjectRecommendations(subjectCode, progress, programId);

  const subjectHref = subjectUrl(programId, semesterId, subjectSlug);
  const hasData = summary.assessedModules > 0;

  const selectedModule = selected ? content?.modules.find((m) => m.id === selected) : undefined;
  const selectedMastery = selected ? summary.moduleMap[selected] : undefined;
  const selectedRecord: ModuleProgress | undefined = selected ? subjectProgress[selected] : undefined;

  const detailSteps = selectedModule
    ? selectedModule.examFocus
        .filter((q) => q.weightage !== "low")
        .slice(0, 3)
        .map((q) => q.question)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="eyebrow">subject mastery · estimated</div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-hi leading-tight tracking-tight">
          {subjectName}
        </h1>
        <p className="text-sm text-ink-lo max-w-xl">
          Estimated mastery is built from your self-check and practice results. Not assessed yet means
          there isn&apos;t enough data — no fake scores.
        </p>
      </div>

      {/* Overall */}
      <div className="card p-5 space-y-3">
        {hasData ? (
          <>
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div>
                <span className="text-4xl font-display font-bold text-ink-hi">{summary.overall}%</span>
                <span className="ml-2 text-sm text-ink-lo">overall estimated mastery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-ink-lo">
                <span>{summary.assessedModules}/{summary.totalModules} modules assessed</span>
              </div>
            </div>
            <MasteryBar value={summary.overall ?? 0} className="h-3" />
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="chip border-signal-dim text-signal">{summary.strong} strong</span>
              <span className="chip border-critical/40 text-critical">{summary.needsAttention} need attention</span>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-sm text-ink-hi mb-1">Not enough data yet</div>
            <p className="text-xs text-ink-lo mb-4">
              Complete a few self-checks on this subject to build your mastery map.
            </p>
            <Link
              href={subjectHref}
              className="inline-block font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
            >
              Start Assessment →
            </Link>
          </div>
        )}
      </div>

      {/* Weak areas */}
      {hasData && <WeakAreas recommendations={recs} subjectCode={subjectCode} programId={programId} />}

      {/* Module grid */}
      <div className="space-y-3">
        <h2 className="font-display font-semibold text-ink-hi text-lg">Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {content?.modules.map((m, i) => (
            <ModuleMasteryCard
              key={m.id}
              moduleId={m.id}
              index={i + 1}
              moduleTitle={m.title}
              mastery={summary.moduleMap[m.id]}
              href={`${subjectHref}#${m.id}`}
              onSelect={() => setSelected(selected === m.id ? null : m.id)}
              selected={selected === m.id}
            />
          ))}
        </div>
      </div>

      {/* Module detail */}
      {selected && selectedModule && selectedMastery && (
        <div className="card p-5 space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1">
                Module detail
              </div>
              <h3 className="font-display font-semibold text-ink-hi text-lg">{selectedModule.title}</h3>
            </div>
            {selectedMastery.score !== null ? (
              <MasteryStatus status={selectedMastery.status} label={masteryLabel(selectedMastery.status)} />
            ) : (
              <MasteryStatus status="not-assessed" label="Not assessed" />
            )}
          </div>

          {selectedMastery.score !== null ? (
            <>
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-display font-bold text-2xl text-ink-hi">{selectedMastery.score}%</span>
                  <span className="text-xs font-mono text-ink-lo">
                    Estimated mastery · {selectedMastery.confidence < 1 ? "low confidence" : "stable"}
                  </span>
                </div>
                <MasteryBar value={selectedMastery.score} className="h-3" />
              </div>

              <div className="text-xs font-mono text-ink-lo space-y-1">
                <div>Based on:</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span>{selectedRecord?.attempts ?? 0} attempts</span>
                  <span className="text-signal">{selectedRecord?.correct ?? 0} correct</span>
                  <span className="text-weight">{selectedRecord?.partial ?? 0} partial</span>
                  <span className="text-critical">{selectedRecord?.incorrect ?? 0} incorrect</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-ink-lo">
              Not assessed — answer self-check questions in this module to get an estimate.
            </p>
          )}

          {detailSteps.length > 0 && (
            <div className="space-y-2">
              <div className="eyebrow">recommended next steps</div>
              <ol className="space-y-1.5 text-sm text-ink-hi">
                {detailSteps.map((q, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-signal shrink-0">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
                {selectedModule.selfCheck?.length ? (
                  <li className="flex gap-2">
                    <span className="text-signal shrink-0">{detailSteps.length + 1}.</span>
                    <span>Attempt {selectedModule.selfCheck.length} self-check question(s)</span>
                  </li>
                ) : null}
              </ol>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/night-before?subject=${encodeURIComponent(subjectCode)}&program=${programSlug(programId)}&time=120`}
              className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
            >
              Start Practice →
            </Link>
            <Link
              href={`${subjectHref}#${selected}`}
              className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
            >
              Open Module Notes
            </Link>
          </div>
        </div>
      )}

      {/* What should I study next */}
      {recs.length > 0 && <NextStudyRecommendation recommendations={recs} subjectCode={subjectCode} programId={programId} />}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("tkm:open-palette"));
            }
          }}
          className="font-mono text-xs uppercase tracking-wide px-4 py-2 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
        >
          ⌕ Search
        </button>
        <Link
          href={subjectHref}
          className="font-mono text-xs uppercase tracking-wide px-4 py-2 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
        >
          ← Back to {subjectName}
        </Link>
      </div>
    </div>
  );
}
