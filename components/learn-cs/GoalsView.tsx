"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LEARN_GOALS, getLearnGoal } from "@/lib/learn-cs/categories";
import { getLearnSubject, LEARN_SUBJECTS } from "@/lib/learn-cs";
import { getLearnProgress } from "@/lib/learn-cs/progress";
import RecommendationsView from "./RecommendationsView";
import { ProgramId } from "@/lib/types";

const GOAL_KEY = "tkm.learncs.goal.v1";
const CUSTOM_KEY = "tkm.learncs.goal.custom.v1";
const BRANCH_KEY = "tkm.branch.pref";

function readBranch(): ProgramId | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = window.localStorage.getItem(BRANCH_KEY);
  if (raw === "ER" || raw === "CS" || raw === "CS_AI") return raw;
  return undefined;
}

function readGoal(): string {
  if (typeof window === "undefined") return "foundations";
  return window.localStorage.getItem(GOAL_KEY) ?? "foundations";
}

function readCustom(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CUSTOM_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Goal picker + per-goal roadmap preview with customization. Selection persists
// so /learn-cs/progress and recommendations stay coherent across visits.
export default function GoalsView() {
  const [goalId, setGoalId] = useState<string>("foundations");
  const [custom, setCustom] = useState<string[]>([]);
  const [branch, setBranch] = useState<ProgramId | undefined>(undefined);
  const [progress, setProgress] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    setGoalId(readGoal());
    setCustom(readCustom());
    setBranch(readBranch());
    setProgress(getLearnProgress());
  }, []);

  const goal = getLearnGoal(goalId);
  const roadmap = goal ? goal.roadmap : custom;

  function selectGoal(id: string) {
    setGoalId(id);
    if (typeof window !== "undefined") window.localStorage.setItem(GOAL_KEY, id);
  }

  function toggleCustom(slug: string) {
    const next = custom.includes(slug) ? custom.filter((s) => s !== slug) : [...custom, slug];
    setCustom(next);
    if (typeof window !== "undefined") window.localStorage.setItem(CUSTOM_KEY, JSON.stringify(next));
    if (goalId !== "custom") selectGoal("custom");
  }

  function doneFor(slug: string): boolean {
    const subj = getLearnSubject(slug);
    if (!subj) return false;
    const prog = progress[slug] ?? {};
    return subj.stages
      .flatMap((s) => s.topics)
      .every((t) => ["practiced", "mastered"].includes(prog[t.slug] ?? ""));
  }

  return (
    <div className="space-y-6">
      {/* Goal chips */}
      <div className="flex flex-wrap gap-2">
        {LEARN_GOALS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => selectGoal(g.id)}
            className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
              goalId === g.id
                ? "border-signal text-signal bg-signal/10"
                : "border-bg-border text-ink-lo hover:border-signal/50 hover:text-ink-hi"
            }`}
          >
            {g.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => selectGoal("custom")}
          className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
            goalId === "custom"
              ? "border-signal text-signal bg-signal/10"
              : "border-bg-border text-ink-lo hover:border-signal/50 hover:text-ink-hi"
          }`}
        >
          Custom
        </button>
      </div>

      {goal && (
        <div className="card p-4 space-y-1">
          <p className="font-display font-semibold text-ink-hi text-base">{goal.label}</p>
          <p className="text-xs text-ink-lo leading-relaxed">{goal.description}</p>
        </div>
      )}

      {/* Goal roadmap preview (ordered, editable when custom) */}
      {roadmap.length > 0 && (
        <ol className="space-y-1">
          {roadmap.map((slug, i) => {
            const subject = getLearnSubject(slug);
            if (!subject) return null;
            const done = doneFor(slug);
            return (
              <li key={slug} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent hover:border-bg-border hover:bg-bg-surface transition-colors">
                <span className="font-mono text-[10px] text-ink-faint w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  href={`/learn-cs/${slug}`}
                  className="min-w-0 flex-1 font-display font-medium text-sm text-ink-hi hover:text-signal transition-colors truncate"
                >
                  {subject.name}
                </Link>
                {done ? (
                  <span className="font-mono text-[9px] uppercase tracking-wider text-signal shrink-0">✓ done</span>
                ) : (
                  <Link
                    href={`/learn-cs/${slug}`}
                    className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-card border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors shrink-0"
                  >
                    Start →
                  </Link>
                )}
                {goalId === "custom" && (
                  <button
                    type="button"
                    onClick={() => toggleCustom(slug)}
                    className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-card border border-critical/40 text-critical hover:bg-critical/10 transition-colors shrink-0"
                  >
                    Remove
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {goalId === "custom" && (
        <div className="card p-4 space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Add subjects</span>
          <div className="flex flex-wrap gap-1.5">
            {LEARN_SUBJECTS.filter((s) => !roadmap.includes(s.slug)).map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => toggleCustom(s.slug)}
                className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
              >
                + {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Branch-tuned recommendations */}
      <RecommendationsView goal={goalId === "custom" ? custom : goal?.roadmap} branch={branch} />

      <p className="text-xs text-ink-faint leading-relaxed max-w-2xl">
        Branch personalization only re-ranks recommendations by which subjects your TKM branch
        actually teaches. It never changes or hides any part of the curriculum.
      </p>
    </div>
  );
}