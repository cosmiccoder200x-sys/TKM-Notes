"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Module } from "@/lib/types";
import ModuleView from "@/components/ModuleView";
import ModulePriorityBadge from "@/components/ModulePriorityBadge";
import { generatePromptLabUrl } from "@/lib/prompts/context";

interface Props {
  modules: Module[];
  subjectCode: string;
  subjectName: string;
}

export default function ModuleAccordion({
  modules,
  subjectCode,
  subjectName,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

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
        return (
          <div
            key={m.id}
            id={m.id}
            className={`rounded-card border transition-colors ${
              isOpen ? "border-signal/40" : "border-bg-border"
            }`}
          >
            {/* Accordion header — always visible */}
            <button
              onClick={() => setActiveIndex(i)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left rounded-card transition-colors ${
                isOpen
                  ? "bg-bg-surface"
                  : "bg-bg-surface/60 hover:bg-bg-surface"
              }`}
              aria-expanded={isOpen}
              aria-controls={`module-body-${m.id}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] w-16 ${
                    isOpen ? "text-signal" : "text-ink-faint"
                  }`}
                >
                  Module {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display font-semibold text-sm leading-snug truncate transition-colors ${
                    isOpen ? "text-signal" : "text-ink-hi"
                  }`}
                >
                  {m.title}
                </span>
              </div>

              <span className="flex items-center gap-2 shrink-0">
                <ModulePriorityBadge module={m} index={i} totalModules={modules.length} />
                <span
                  className={`font-mono text-xs transition-colors ${
                    isOpen ? "text-signal" : "text-ink-faint"
                  }`}
                  aria-hidden
                >
                  {isOpen ? "▲" : "▼"}
                </span>
              </span>
            </button>

            {/* AI quick actions — only when open */}
            {isOpen && subjectCode && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-bg-border bg-bg-surface">
                {(
                  [
                    { label: "Learn", mode: "learn" },
                    { label: "Practice", mode: "problem-solver" },
                    { label: "Exam", mode: "exam-answer" },
                    { label: "Revise", mode: "revision" },
                  ] as const
                ).map((a) => (
                  <Link
                    key={a.label}
                    href={generatePromptLabUrl(
                      { subjectCode, moduleId: m.id, moduleName: m.title },
                      a.mode
                    )}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Module content — only rendered when open */}
            {isOpen && (
              <div
                id={`module-body-${m.id}`}
                className="border-t border-bg-border"
              >
                <ModuleView
                  module={m}
                  index={i + 1}
                  subjectCode={subjectCode}
                  subjectName={subjectName}
                  headless
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
