"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Module } from "@/lib/types";
import ModuleView from "@/components/ModuleView";
import ModulePriorityBadge from "@/components/ModulePriorityBadge";
import ModuleProgressBar from "@/components/ModuleProgressBar";
import { NavIcon } from "@/components/navigation/navItems";
import { generatePromptLabUrl } from "@/lib/prompts/context";
import { getProgress, calculateModuleMastery, estimatedModuleMinutes, progressSubjectKey, ModuleProgress } from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { programSlug } from "@/lib/urls";

interface Props {
  modules: Module[];
  subjectCode: string;
  subjectName: string;
  programId?: ProgramId;
}

export default function ModuleAccordion({ modules, subjectCode, subjectName, programId = "ER" }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});

  useEffect(() => {
    setProgress(getProgress()[progressSubjectKey(programId, subjectCode)] ?? {});
  }, [subjectCode, programId]);

  // Deep links like #m3 open the right module (used by the Study Planner).
  useEffect(() => {
    function openFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const idx = modules.findIndex((m) => m.id === hash);
      if (idx >= 0) setActiveIndex(idx);
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [modules]);

  return (
    <div className="space-y-2">
      {modules.map((m, i) => {
        const isOpen = i === activeIndex;
        const mastery = calculateModuleMastery(progress[m.id]);
        const isOpenNow = isOpen;

        return (
          <div
            key={m.id}
            id={m.id}
            className={`card rounded-card transition-colors ${
              isOpenNow ? "border-signal/40" : "hover:border-signal/30"
            }`}
          >
            {/* Header — always visible */}
            <button
              onClick={() => setActiveIndex(i)}
              className="w-full flex flex-col text-left gap-2 px-4 py-3 rounded-t-card"
              aria-expanded={isOpenNow}
              aria-controls={`module-body-${m.id}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                  Module {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-mono text-xs transition-colors ${
                    isOpenNow ? "text-signal" : "text-ink-faint"
                  }`}
                  aria-hidden
                >
                  {isOpenNow ? "−" : "+"}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={`font-display font-semibold leading-snug ${
                    isOpenNow ? "text-signal" : "text-ink-hi"
                  }`}
                >
                  {m.title}
                </span>
                <ModulePriorityBadge module={m} index={i} totalModules={modules.length} />
              </div>

              {/* Metadata row */}
              <div className="flex items-center gap-3 text-xs font-mono text-ink-faint">
                <span>{m.coreConcepts.length} topics</span>
                <span>·</span>
                <span>{m.examFocus.length} questions</span>
                <span>·</span>
                <span>≈ {Math.round(estimatedModuleMinutes(m) / 60)}h</span>
                <span className="ml-auto flex items-center gap-1.5">
                  {mastery.score !== null ? (
                    <>
                      <span className="text-signal">{mastery.score}%</span>
                      <span className="text-ink-faintest">mastery</span>
                    </>
                  ) : (
                    <span className="text-ink-faint">not assessed</span>
                  )}
                </span>
              </div>
            </button>

            {/* AI quick actions — only when open */}
            {isOpenNow && subjectCode && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-bg-border bg-bg-surface">
                {([
                  { label: "Learn", mode: "learn" },
                  { label: "Practice", mode: "problem-solver" },
                  { label: "Exam", mode: "exam-answer" },
                  { label: "Revise", mode: "revision" },
                ] as const).map((a) => (
                  <Link
                    key={a.label}
                    href={generatePromptLabUrl({ subjectCode, moduleId: m.id, moduleName: m.title }, a.mode)}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1.5 rounded-md border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
                <Link
                  href={`/night-before?subject=${encodeURIComponent(subjectCode)}&program=${programSlug(programId)}&time=60`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide px-2.5 py-1.5 rounded-card border border-signal-dim text-signal hover:bg-signal/10 transition-colors"
                >
                  <NavIcon name="revision" className="w-3.5 h-3.5" /> Night-Before
                </Link>
              </div>
            )}

            {/* Module content — only rendered when open */}
            {isOpenNow && (
              <div id={`module-body-${m.id}`} className="border-t border-bg-border">
                <div className="px-4 pt-4 pb-1">
                  <ModuleProgressBar score={mastery.score} />
                </div>
                <ModuleView
                  module={m}
                  index={i + 1}
                  subjectCode={subjectCode}
                  subjectName={subjectName}
                  headless
                  programId={programId}
                />
              </div>
            )}

            {/* Module navigation footer — visible when open */}
            {isOpenNow && (
              <div className="flex items-center justify-between gap-3 border-t border-bg-border px-4 py-3">
                {i > 0 ? (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i - 1)}
                    className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-card border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors"
                  >
                    ← {modules[i - 1].id.toUpperCase()}
                  </button>
                ) : (
                  <span />
                )}
                {i < modules.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i + 1)}
                    className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
                  >
                    Next · {modules[i + 1].id.toUpperCase()} →
                  </button>
                ) : (
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faintest">
                    End of modules
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
