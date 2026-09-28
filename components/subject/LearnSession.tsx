"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ProgramId } from "@/lib/types";
import { semesters } from "@/lib/content";
import { programName } from "@/lib/domain";
import { getEffectiveModules } from "@/lib/syllabus";
import { mapPyqsToTopics } from "@/lib/learning";
import {
  decideNextAction,
  planSession,
  startSession,
  finishSession,
  getLearningState,
  openMistakes,
  buildTaskPrompt,
  TASK_LABEL,
} from "@/lib/learning";
import type { RecommendedAction, StudySessionPlan, SessionOutcome } from "@/lib/learning";
import { copyToClipboard } from "@/lib/prompts/utils";
import { subjectUrl } from "@/lib/urls";

const MINUTE_OPTIONS = [15, 30, 45, 60];

type Phase = "overview" | "active" | "done";

export default function LearnSession({
  programId,
  subjectCode,
  subjectName,
  semesterId,
  subjectSlug,
}: {
  programId: ProgramId;
  subjectCode: string;
  subjectName: string;
  semesterId: string;
  subjectSlug: string;
}) {
  const [minutes, setMinutes] = useState(45);
  const [action, setAction] = useState<RecommendedAction | null>(null);
  const [plan, setPlan] = useState<StudySessionPlan | null>(null);
  const [phase, setPhase] = useState<Phase>("overview");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [outcome, setOutcome] = useState<SessionOutcome | null>(null);
  const [resolved, setResolved] = useState(0);
  const [next, setNext] = useState<RecommendedAction | null>(null);

  useEffect(() => {
    const a = decideNextAction(programId, subjectCode, minutes);
    setAction(a);
    setPlan(planSession(a, minutes, programId, subjectCode));
    setPhase("overview");
    setPrompt("");
    setOutcome(null);
    setNext(null);
  }, [programId, subjectCode, minutes]);

  const promptText = useMemo(() => {
    if (phase !== "active" || !action) return "";
    const modules = getEffectiveModules(programId, subjectCode);
    const state = getLearningState(programId, subjectCode);
    const links = mapPyqsToTopics(programId, subjectCode).filter(
      (l) => l.topicRef === action.topicRef || l.moduleCode === action.moduleId
    );
    const semester = semesters.find((s) => s.id === semesterId)?.label ?? semesterId;
    return buildTaskPrompt(action.task, {
      university: "TKM College of Engineering",
      scheme: "KTU 2024",
      branch: programName(programId),
      semester,
      subjectCode,
      subjectName,
      moduleId: action.moduleId ?? "",
      moduleTitle: action.moduleTitle ?? "",
      topic: action.topicRef && action.topicTitle ? { ref: action.topicRef, title: action.topicTitle } : undefined,
      syllabusTitles: modules.map((m) => m.title),
      topics: Object.values(state.topics).map((t) => ({
        ref: t.ref,
        title: t.title,
        mastery: t.mastery,
        mistakes: state.mistakes.filter((m) => !m.resolved && m.topicRef === t.ref).map((m) => m.note),
        revisionDue: t.revisionDueAt !== null,
      })),
      mistakes: openMistakes(state).slice(0, 5).map((m) => `${m.topicTitle}: ${m.note}`),
      pyqs: links.slice(0, 6).map((l) => ({ question: l.question, weightage: l.weightage, kind: "actual" as const })),
      topicPriority: action.reason,
      timeMinutes: minutes,
    }).text;
  }, [phase, action, programId, subjectCode, subjectName, semesterId, minutes]);

  useEffect(() => {
    setPrompt(promptText);
  }, [promptText]);

  if (!action || !plan) return null;
  const backHref = subjectUrl(programId, semesterId, subjectSlug);

  function handleStart() {
    startSession(programId, subjectCode, plan as StudySessionPlan);
    setPhase("active");
  }

  async function handleCopy() {
    if (await copyToClipboard(prompt)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleOutcome(o: SessionOutcome) {
    if (!plan || !action) return;
    const { resolvedMistakes } = finishSession({
      programId,
      subjectCode,
      plan,
      moduleCode: action.moduleId,
      outcome: o,
    });
    setOutcome(o);
    setResolved(resolvedMistakes);
    setNext(decideNextAction(programId, subjectCode, minutes));
    setPhase("done");
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-1 border-b border-bg-border pb-5">
        <Link href={backHref} className="font-mono text-[11px] text-signal hover:underline uppercase tracking-wider">
          ← {subjectName}
        </Link>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-hi tracking-tight">Today&apos;s session</h1>
      </header>

      <section className="card p-5 sm:p-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <div className="eyebrow">Goal</div>
            <div className="font-display font-semibold text-base text-ink-hi">{action.topicTitle ?? action.moduleTitle ?? subjectName}</div>
          </div>
          <div>
            <div className="eyebrow">Task</div>
            <div className="font-display font-semibold text-base text-signal">{TASK_LABEL[action.task]}</div>
          </div>
          <div>
            <div className="eyebrow">Time</div>
            <div className="flex gap-1.5 mt-1">
              {MINUTE_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMinutes(m)}
                  aria-pressed={minutes === m}
                  className={`font-mono text-xs px-3 py-1.5 rounded-card border transition-colors ${
                    minutes === m ? "border-signal text-signal bg-signal/10" : "border-bg-border text-ink-lo"
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow">Why this?</div>
            <p className="text-sm text-ink-lo">{action.reason}</p>
          </div>
        </div>
      </section>

      <section className="card p-5 sm:p-6 space-y-3">
        <span className="eyebrow">Session plan · {plan.minutes} min</span>
        <ol className="space-y-2">
          {plan.steps.map((s, i) => (
            <li key={i} className="flex items-baseline gap-3 text-sm">
              <span className="font-mono text-[10px] text-ink-faint shrink-0 w-6">{i + 1}.</span>
              <span className="text-ink-hi flex-1">{s.label}</span>
              <span className="font-mono text-[10px] text-ink-faint shrink-0">{s.minutes} min</span>
            </li>
          ))}
        </ol>
        {phase === "overview" && (
          <button
            onClick={handleStart}
            className="font-mono text-[12px] uppercase tracking-wide px-5 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
          >
            Start Session →
          </button>
        )}
      </section>

      {phase !== "overview" && (
        <section className="card p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="eyebrow">Your {TASK_LABEL[action.task]} prompt</span>
            <button
              onClick={handleCopy}
              className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-card border border-bg-border text-ink-hi hover:border-signal/60 transition-colors"
            >
              {copied ? "Copied ✓" : "Copy prompt"}
            </button>
          </div>
          <p className="text-xs text-ink-lo">
            Paste this into ChatGPT, Gemini, or Claude. Work through it there, then come back and finish the session.
          </p>
          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-ink-lo bg-bg-raised rounded-card p-4 max-h-96 overflow-y-auto font-body">
            {prompt}
          </pre>
          {phase === "active" && (
            <button
              onClick={() => setPhase("done")}
              className="font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
            >
              Session complete →
            </button>
          )}
        </section>
      )}

      {phase === "done" && !outcome && (
        <section className="card p-5 sm:p-6 space-y-3">
          <span className="eyebrow">Session complete</span>
          <p className="font-display font-semibold text-base text-ink-hi">How did you perform?</p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "strong", label: "Strong" },
                { id: "partial", label: "Partial" },
                { id: "struggled", label: "Struggled" },
              ] as { id: SessionOutcome; label: string }[]
            ).map((o) => (
              <button
                key={o.id}
                onClick={() => handleOutcome(o.id)}
                className="font-mono text-xs px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
              >
                {o.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {phase === "done" && outcome && next && (
        <section className="card p-5 sm:p-6 space-y-2 border-signal/30">
          <span className="eyebrow">Recorded</span>
          <p className="text-sm text-ink-lo">
            Outcome saved as <span className="text-ink-hi font-medium">{outcome}</span>
            {resolved > 0 && (
              <span>
                {" "}· {resolved} mistake{resolved === 1 ? "" : "s"} resolved
              </span>
            )}
            . Mastery updated from evidence — not from opening the lesson.
          </p>
          <div className="border-t border-bg-border/40 pt-3 space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-ink-faint">Next up</div>
            <div className="font-display font-semibold text-base text-ink-hi">
              {TASK_LABEL[next.task]}
              {next.topicTitle ? <span className="text-ink-lo font-normal"> → {next.topicTitle}</span> : null}
            </div>
            <p className="text-sm text-ink-lo">{next.reason}</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href={backHref}
              className="font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
            >
              Back to subject →
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
