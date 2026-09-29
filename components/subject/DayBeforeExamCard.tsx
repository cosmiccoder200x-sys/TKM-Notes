"use client";

import { useState, useMemo } from "react";
import { Subject, ProgramId } from "@/lib/types";
import {
  TIME_BRACKETS,
  TimeBracket,
  prioritizeTopics,
  buildDayBeforeExamPrompt,
} from "@/lib/prompts/dayBeforeExam";
import { copyToClipboard } from "@/lib/prompts/utils";
import ExternalAiHandoff from "@/components/subject/ExternalAiHandoff";

interface DayBeforeExamCardProps {
  subject: Subject;
  programId?: ProgramId;
}

export default function DayBeforeExamCard({ subject, programId = "ER" }: DayBeforeExamCardProps) {
  const [selectedTime, setSelectedTime] = useState<TimeBracket>("3-to-6-hours");
  const [selectedWeakModules, setSelectedWeakModules] = useState<string[]>([]);
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPromptDetails, setShowPromptDetails] = useState<boolean>(false);

  // Topic prioritization from the decision engine
  const topicPriorities = useMemo(() => {
    return prioritizeTopics(subject.code, programId);
  }, [subject.code, programId]);

  // Adjust priorities dynamically if user selected weak modules
  const displayPriorities = useMemo(() => {
    if (selectedWeakModules.length === 0) return topicPriorities;

    return [...topicPriorities].map((tp) => {
      const isWeak = selectedWeakModules.includes(tp.moduleTitle) || selectedWeakModules.includes(tp.moduleId);
      if (isWeak && tp.priority !== "A") {
        return {
          ...tp,
          priority: "A" as const,
          reasons: ["Marked as weak area", ...tp.reasons],
        };
      }
      return tp;
    });
  }, [topicPriorities, selectedWeakModules]);

  // Generated prompt
  const generatedPrompt = useMemo(() => {
    return buildDayBeforeExamPrompt({
      subject,
      programId,
      timeBracket: selectedTime,
      weakModules: selectedWeakModules,
    });
  }, [subject, programId, selectedTime, selectedWeakModules]);

  const activeBracketInfo = TIME_BRACKETS.find((b) => b.id === selectedTime) || TIME_BRACKETS[2];

  function toggleWeakModule(moduleName: string) {
    setSelectedWeakModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    );
  }

  async function handleCopy() {
    const success = await copyToClipboard(generatedPrompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="card p-5 sm:p-6 border-signal/40 bg-gradient-to-b from-signal/5 to-transparent relative overflow-hidden space-y-4">
      {/* Top Tag & Title */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-signal/15 border border-signal/30 text-signal font-mono text-[10px] font-semibold uppercase tracking-wider mb-2">
            <span>⚡ DAY-BEFORE EXAM</span>
          </div>
          <h2 className="text-lg font-display font-semibold text-ink-hi">
            Have an exam tomorrow?
          </h2>
          <p className="text-xs text-ink-lo mt-1 leading-relaxed">
            Get a high-yield attack plan focused on <strong>maximum marks per minute</strong>. Zero fluff, strict PYQ priority, active recall, and trap avoidance.
          </p>
        </div>
      </div>

      {!sessionStarted ? (
        <div className="space-y-4 pt-1">
          {/* Step 1: Time Selection */}
          <div>
            <label className="block eyebrow mb-2">1. How much time do you have remaining?</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TIME_BRACKETS.map((bracket) => {
                const isSelected = selectedTime === bracket.id;
                return (
                  <button
                    key={bracket.id}
                    type="button"
                    onClick={() => setSelectedTime(bracket.id)}
                    className={`p-2.5 rounded-card border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? "border-signal bg-signal/15 text-signal ring-1 ring-signal"
                        : "border-bg-border bg-bg-raised/60 text-ink-lo hover:border-signal/50 hover:text-ink-hi"
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold">{bracket.shortLabel}</span>
                    <span className="text-[10px] opacity-80 mt-1 line-clamp-1">{bracket.description}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-ink-faint mt-1.5 font-mono">
              Strategy: {activeBracketInfo.description}
            </p>
          </div>

          {/* Step 2: Prioritized Topics Preview */}
          {displayPriorities.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="eyebrow">2. Topic Prioritization (Highest Marks First)</label>
                <span className="text-[10px] text-ink-faint">Tap a module to mark as weak</span>
              </div>
              <div className="space-y-2">
                {displayPriorities.map((item) => {
                  const isMarkedWeak = selectedWeakModules.includes(item.moduleTitle) || selectedWeakModules.includes(item.moduleId);
                  const badgeColor =
                    item.priority === "A"
                      ? "bg-red-500/15 border-red-500/30 text-red-400"
                      : item.priority === "B"
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                      : "bg-ink-lo/10 border-ink-lo/20 text-ink-lo";

                  return (
                    <div
                      key={item.moduleId}
                      onClick={() => toggleWeakModule(item.moduleTitle)}
                      className={`p-3 rounded-card border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                        isMarkedWeak
                          ? "border-signal bg-signal/10"
                          : "border-bg-border bg-bg-raised/40 hover:border-signal/40"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold border shrink-0 mt-0.5 ${badgeColor}`}>
                          {item.priority === "A" ? "PRIORITY A" : item.priority === "B" ? "PRIORITY B" : "PRIORITY C"}
                        </span>
                        <div>
                          <span className="font-display text-xs font-semibold text-ink-hi">
                            {item.moduleTitle}
                          </span>
                          <p className="text-[11px] text-ink-lo mt-0.5">
                            <span className="text-ink-faint font-mono mr-1">Why:</span>
                            {item.reasons.join(" · ")}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5 self-end sm:self-center">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${isMarkedWeak ? "border-signal text-signal bg-signal/15" : "border-bg-border text-ink-faint"}`}>
                          {isMarkedWeak ? "Weak Area ✓" : "+ Mark Weak"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Start Session CTA */}
          <button
            type="button"
            onClick={() => setSessionStarted(true)}
            className="w-full py-3 px-4 rounded-card bg-signal text-bg font-display font-semibold text-sm hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-signal/20"
          >
            <span>⚡ Generate Last-Day Attack Plan & Session</span>
            <span className="font-mono text-xs">→</span>
          </button>
        </div>
      ) : (
        /* Active Session View */
        <div className="space-y-4 pt-1">
          <div className="p-3.5 rounded-card bg-bg-raised border border-bg-border flex items-center justify-between gap-3">
            <div>
              <span className="eyebrow">Session Configured</span>
              <p className="text-xs font-display font-medium text-ink-hi mt-0.5">
                {activeBracketInfo.label} ({activeBracketInfo.shortLabel}) · {selectedWeakModules.length > 0 ? `${selectedWeakModules.length} Weak Area(s) prioritized` : "Standard High-Yield weighting"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSessionStarted(false)}
              className="text-[11px] font-mono text-ink-lo hover:text-signal transition-colors underline"
            >
              Modify Setup
            </button>
          </div>

          {/* Copy and AI Handoff */}
          <div className="space-y-3">
            <ExternalAiHandoff prompt={generatedPrompt} />

            <button
              type="button"
              onClick={handleCopy}
              className={`w-full py-2.5 px-4 rounded-card border font-mono text-xs transition-all flex items-center justify-center gap-2 ${
                copied
                  ? "border-signal text-signal bg-signal/15 font-semibold"
                  : "border-bg-border text-ink-hi hover:border-signal/50 bg-bg-raised/60"
              }`}
            >
              <span>{copied ? "Prompt Copied to Clipboard ✓" : "📋 Copy Raw Prompt to Clipboard"}</span>
            </button>
          </div>

          {/* Collapsible Prompt Preview */}
          <div className="border border-bg-border rounded-card overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPromptDetails(!showPromptDetails)}
              className="w-full px-3 py-2 bg-bg-raised/80 flex items-center justify-between text-left text-xs font-mono text-ink-lo hover:text-ink-hi"
            >
              <span>{showPromptDetails ? "Hide Generated Master Prompt ▲" : "View Generated Master Prompt ▼"}</span>
            </button>
            {showPromptDetails && (
              <pre className="p-3 text-[10px] text-ink-lo leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto font-mono bg-bg">
                {generatedPrompt}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
