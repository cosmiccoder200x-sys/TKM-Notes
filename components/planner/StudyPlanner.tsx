"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSubjectContent } from "@/lib/notes";
import { semesters, subjects } from "@/lib/content";
import {
  generateStudyPlan,
  PrepLevel,
  PlanAction,
  PlanBlock,
  StudyPlan,
  estimatedModuleMinutes,
  getProgress,
} from "@/lib/study";

const PREP_LEVELS: { id: PrepLevel; label: string; hint: string }[] = [
  { id: "behind", label: "Behind", hint: "Starting fresh / missed a lot" },
  { id: "ok", label: "On track", hint: "Attended classes, half understood" },
  { id: "ahead", label: "Ahead", hint: "Mostly clear — chasing full marks" },
];

const MINUTES_PRESETS = [30, 60, 90, 120, 180, 240];

const ACTION_TAB: Record<PlanAction["kind"], string> = {
  definitions: "Definitions",
  concepts: "Concepts",
  formulas: "Formulas",
  questions: "Exam Focus",
  revision: "Revision",
  "self-check": "Self-Check",
};

function ActionLink({ subjectCode, action }: { subjectCode: string; action: PlanAction }) {
  const subject = subjects.find((s) => s.code === subjectCode);
  if (!subject) return null;
  return (
    <Link
      href={`/${subject.semesterId}/${subject.slug}#${action.moduleId}`}
      className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
    >
      <span className="text-signal">›</span>
      <span className="flex-1 min-w-0">
        <span className="block truncate">{action.moduleTitle}</span>
        <span className="block text-[10px] text-ink-faint uppercase tracking-wide">
          {action.label} · {action.count} items · {ACTION_TAB[action.kind]} tab
        </span>
      </span>
    </Link>
  );
}

function BlockCard({ block, subjectCode }: { block: PlanBlock; subjectCode: string }) {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h3 className="font-display font-semibold text-ink-hi text-base">{block.title}</h3>
        <span className="font-mono text-xs text-ink-lo whitespace-nowrap">{block.minutes} min</span>
      </div>
      {block.modules.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {block.modules.map((m) => (
            <span
              key={m.moduleId}
              className={`chip ${
                m.tier === "must-learn"
                  ? "border-critical/40 text-critical"
                  : m.tier === "core"
                    ? "border-weight-dim text-weight"
                    : ""
              }`}
            >
              {m.moduleTitle}
              {m.high > 0 && ` · ${m.high} HIGH`}
            </span>
          ))}
        </div>
      )}
      {block.reasons.length > 0 && (
        <ul className="space-y-1">
          {block.reasons.map((r, i) => (
            <li key={i} className="text-xs text-ink-lo flex gap-2">
              <span className="text-signal shrink-0">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      )}
      {block.actions.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-2">
          {block.actions.map((a) => (
            <ActionLink key={`${a.moduleId}:${a.kind}`} subjectCode={subjectCode} action={a} />
          ))}
        </div>
      )}
      {block.actions.length === 0 && (
        <p className="text-xs text-ink-faint">No verified content for this step yet.</p>
      )}
    </div>
  );
}

export default function StudyPlanner() {
  const params = useSearchParams();
  const withNotes = useMemo(() => subjects.filter((s) => getSubjectContent(s.code, s.programId)), []);

  const [subjectCode, setSubjectCode] = useState(params.get("subject") ?? withNotes[0]?.code ?? "");
  const [minutes, setMinutes] = useState(Number(params.get("minutes")) || 60);
  const [prepLevel, setPrepLevel] = useState<PrepLevel>(
    (params.get("prep") as PrepLevel) || "ok"
  );
  const [generated, setGenerated] = useState(false);

  const content = subjectCode
    ? getSubjectContent(subjectCode, subjects.find((s) => s.code === subjectCode)?.programId)
    : null;
  const allModuleIds = content?.modules.map((m) => m.id) ?? [];
  const [selected, setSelected] = useState<Set<string> | null>(null);
  const effectiveSelected = selected ?? new Set(allModuleIds);

  const groups = semesters
    .map((sem) => ({ semester: sem, list: withNotes.filter((s) => s.semesterId === sem.id) }))
    .filter((g) => g.list.length > 0);

  const plan: StudyPlan | null = generated && subjectCode
    ? generateStudyPlan(subjectCode, { subjectCode, minutes, prepLevel, moduleIds: [...effectiveSelected] }, getProgress())
    : null;

  function changeSubject(code: string) {
    setSubjectCode(code);
    setSelected(null);
    setGenerated(false);
  }

  function toggleModule(id: string) {
    const next = new Set(effectiveSelected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function generate() {
    if (subjectCode && effectiveSelected.size > 0) {
      setGenerated(true);
    }
  }

  const moduleEstimates = useMemo(() => {
    if (!content) return new Map<string, number>();
    return new Map(content.modules.map((m) => [m.id, estimatedModuleMinutes(m)]));
  }, [content]);

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-1">AI study planner</div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-hi leading-tight tracking-tight">
          Study Planner
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed mt-1.5 max-w-xl">
          Tell us how much time you have and how you&apos;re feeling — we&apos;ll tell you what to
          study, in what order, and why. Built from verified syllabus data and your own mastery marks.
        </p>
      </div>

      <div className="card p-5 space-y-5">
        <div className="space-y-2">
          <label htmlFor="planner-subject" className="block text-xs font-mono uppercase tracking-wide text-ink-lo">
            Choose your subject
          </label>
          <select
            id="planner-subject"
            value={subjectCode}
            onChange={(e) => changeSubject(e.target.value)}
            className="w-full bg-bg-surface border border-bg-border rounded-card px-3 py-2.5 text-sm text-ink-hi focus:border-signal outline-none"
          >
            {withNotes.length === 0 && <option value="">No subjects with notes yet</option>}
            {groups.map((g) => (
              <optgroup key={g.semester.id} label={g.semester.label}>
                {g.list.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {content && content.modules.length > 0 && (
          <div className="space-y-2">
            <span className="block text-xs font-mono uppercase tracking-wide text-ink-lo">
              Modules to cover
            </span>
            <div className="flex flex-wrap gap-1.5">
              {content.modules.map((m) => {
                const on = effectiveSelected.has(m.id);
                const est = moduleEstimates.get(m.id) ?? 0;
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleModule(m.id)}
                    aria-pressed={on}
                    className={`font-mono text-xs px-3 py-1.5 rounded-card border transition-colors ${
                      on
                        ? "border-signal text-signal bg-signal/10"
                        : "border-bg-border text-ink-faint hover:text-ink-lo"
                    }`}
                    title={`≈ ${est} min of content`}
                  >
                    {m.title} <span className="opacity-60">·{est}m</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="block text-xs font-mono uppercase tracking-wide text-ink-lo">
              Time available
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MINUTES_PRESETS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMinutes(m)}
                  aria-pressed={minutes === m}
                  className={`font-mono text-xs px-3 py-2 rounded-card border transition-colors ${
                    minutes === m
                      ? "border-signal text-signal bg-signal/10"
                      : "border-bg-border text-ink-lo hover:text-ink-hi"
                  }`}
                >
                  {m < 60 ? `${m}m` : m === 60 ? "1h" : m === 120 ? "2h" : m === 180 ? "3h" : "4h"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-mono uppercase tracking-wide text-ink-lo">
              How far along are you?
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PREP_LEVELS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPrepLevel(p.id)}
                  aria-pressed={prepLevel === p.id}
                  title={p.hint}
                  className={`font-mono text-xs px-3 py-2 rounded-card border transition-colors ${
                    prepLevel === p.id
                      ? "border-signal text-signal bg-signal/10"
                      : "border-bg-border text-ink-lo hover:text-ink-hi"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={!subjectCode || effectiveSelected.size === 0}
          className="w-full text-center font-mono text-sm uppercase tracking-wide py-3 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate My Plan
        </button>
      </div>

      {plan && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <span className="eyebrow">your plan</span>
              <h2 className="font-display font-semibold text-xl text-ink-hi mt-1">
                {plan.subjectName} — {plan.totalMinutes} min
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="chip border-signal-dim text-signal">
                ≈ {plan.estimatedStudyMinutes} min of content
              </span>
              <span className="chip">
                prep: {prepLevel === "behind" ? "behind" : prepLevel === "ahead" ? "ahead" : "on track"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {plan.blocks.map((b) => (
              <BlockCard key={b.id} block={b} subjectCode={plan.subjectCode} />
            ))}
          </div>

          <p className="text-xs text-ink-faint leading-relaxed max-w-2xl">{plan.disclaimer}</p>
        </section>
      )}

      {generated && !plan && (
        <div className="card p-6 text-center">
          <p className="text-sm text-ink-hi">No notes available for this subject yet.</p>
          <p className="text-xs text-ink-lo mt-1">
            Use Prompt Lab to build your own notes in the meantime.
          </p>
        </div>
      )}
    </div>
  );
}
