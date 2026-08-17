"use client";

import { useState } from "react";
import Link from "next/link";
import { Module, ProgramId } from "@/lib/types";
import { rankModulesForStudy, PriorityTier } from "@/lib/study";
import { generatePromptLabUrl } from "@/lib/prompts/context";
import { NavIcon } from "@/components/navigation/navItems";
import { programSlug, subjectUrl } from "@/lib/urls";

type ModeId = "learn" | "exam" | "last-minute" | "revision";

const MODES: { id: ModeId; label: string; description: string }[] = [
  { id: "learn", label: "Learn", description: "Build understanding, module by module." },
  { id: "exam", label: "Exam", description: "Attack the highest-value questions first." },
  { id: "last-minute", label: "Last-Minute", description: "Only what the paper actually rewards." },
  { id: "revision", label: "Revision", description: "Rapid re-read before the exam." },
];

const TIER_BADGE: Record<PriorityTier, string> = {
  "must-learn": "border-critical/40 text-critical",
  core: "border-weight-dim text-weight",
  support: "border-bg-border text-ink-faint",
};

export default function StudyModeSwitcher({
  modules,
  subjectCode,
  subjectName,
  subjectSlug,
  semesterId,
  programId = "ER",
}: {
  modules: Module[];
  subjectCode: string;
  subjectName: string;
  subjectSlug: string;
  semesterId: string;
  programId?: ProgramId;
}) {
  const [mode, setMode] = useState<ModeId>("learn");
  const ranked = rankModulesForStudy(modules);

  const focusList = ranked.filter((m) => {
    if (mode === "last-minute") return m.priority.tier === "must-learn";
    if (mode === "exam") return m.priority.examScore > 0;
    return true;
  });

  const lastMinuteEmpty = mode === "last-minute" && focusList.length === 0;

  const actionFor = (moduleId: string, moduleTitle: string) => {
    if (mode === "learn") {
      return { href: generatePromptLabUrl({ subjectCode, moduleId, moduleName: moduleTitle }, "learn"), label: "Learn →" };
    }
    if (mode === "exam") {
      return { href: subjectUrl(programId, semesterId, subjectSlug, moduleId), label: "Open Exam Focus →" };
    }
    if (mode === "revision") {
      return { href: generatePromptLabUrl({ subjectCode, moduleId, moduleName: moduleTitle }, "revision"), label: "Revise →" };
    }
    return { href: subjectUrl(programId, semesterId, subjectSlug, moduleId), label: "Open →" };
  };

  return (
    <div className="card p-4 space-y-3">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Study mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            aria-pressed={mode === m.id}
            className={`font-mono text-xs px-3.5 py-2 rounded-card border transition-colors ${
              mode === m.id
                ? "border-signal text-signal bg-signal/10"
                : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal-dim"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-ink-lo">
        <span className="eyebrow !text-[10px]">{MODES.find((m) => m.id === mode)!.label}</span>
        <span className="text-ink-lo">{MODES.find((m) => m.id === mode)!.description}</span>
        {mode === "last-minute" && (
          <Link
            href={`/night-before?subject=${encodeURIComponent(subjectCode)}&program=${programSlug(programId)}&time=60`}
            className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
          >
            <NavIcon name="revision" className="w-3.5 h-3.5" /> Night-Before Plan
          </Link>
        )}
      </div>

      {lastMinuteEmpty && (
        <p className="text-xs text-ink-lo">
          No modules have high-priority questions yet — this subject needs more notes first.
        </p>
      )}

      {focusList.length > 0 && (
        <ol className="space-y-1.5">
          {focusList.map(({ module, priority }, i) => {
            const action = actionFor(module.id, module.title);
            return (
              <li key={module.id} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-ink-faint w-5 shrink-0">{i + 1}.</span>
                <span
                  className={`font-mono text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded border shrink-0 ${TIER_BADGE[priority.tier]}`}
                >
                  {priority.tierLabel}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-ink-hi">{module.title}</span>
                {priority.high > 0 && (
                  <span className="font-mono text-[10px] text-critical shrink-0">{priority.high} HIGH</span>
                )}
                <Link
                  href={action.href}
                  className="shrink-0 font-mono text-[11px] text-signal hover:underline"
                >
                  {action.label}
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
