"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProgramId } from "@/lib/types";
import { getEffectiveModules } from "@/lib/syllabus";
import { getQuestionBank } from "@/lib/pyqs";
import { learnUrl } from "@/lib/urls";
import {
  decideNextAction,
  planSession,
  startSession,
  getLearningState,
  TASK_LABEL,
} from "@/lib/learning";
import type { RecommendedAction } from "@/lib/learning";

export default function ContinueLearning({
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
  const router = useRouter();
  const [action, setAction] = useState<RecommendedAction | null>(null);

  useEffect(() => {
    setAction(decideNextAction(programId, subjectCode, 45));
  }, [programId, subjectCode]);

  const stats = useMemo(() => {
    if (!action) return null;
    const modules = getEffectiveModules(programId, subjectCode);
    const state = getLearningState(programId, subjectCode);
    let total = 0;
    let assessed = 0;
    for (const m of modules) {
      if (m.topics.length > 0) {
        total += m.topics.length;
        m.topics.forEach((_, j) => {
          const s = state.topics[`${programId}:${subjectCode}:${m.moduleCode}:${j}`];
          if (s !== undefined && s.mastery !== null) assessed += 1;
        });
      } else {
        total += 1;
        if (state.topics[`${programId}:${subjectCode}:${m.moduleCode}`]?.mastery != null) assessed += 1;
      }
    }
    const pyqs = getQuestionBank().filter((q) => q.programId === programId && q.subjectCode === subjectCode).length;
    return {
      percent: total > 0 ? Math.round((assessed / total) * 100) : 0,
      assessed,
      total,
      modules: modules.length,
      topics: modules.reduce((n, m) => n + m.topics.length, 0),
      pyqs,
    };
  }, [action, programId, subjectCode]);

  if (!action || !stats) return null;

  function handleContinue() {
    const plan = planSession(action as RecommendedAction, (action as RecommendedAction).sessionMinutes, programId, subjectCode);
    startSession(programId, subjectCode, plan);
    router.push(learnUrl(programId, semesterId, subjectSlug));
  }

  return (
    <section className="card p-5 sm:p-6 space-y-4 border-signal/30">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className="eyebrow">Continue learning</span>
          <span className="font-display font-bold text-lg text-signal">{stats.percent}%</span>
        </div>
        <div className="h-2 w-full bg-bg-raised rounded-full overflow-hidden">
          <div className="h-full bg-signal rounded-full transition-all" style={{ width: `${stats.percent}%` }} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          {stats.assessed}/{stats.total} units · {stats.modules} modules{stats.topics > 0 ? ` · ${stats.topics} topics` : ""} · {stats.pyqs} PYQs
        </p>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-mono uppercase tracking-wider text-ink-faint">Recommended</div>
        <div className="font-display font-semibold text-lg text-ink-hi">
          {TASK_LABEL[action.task]}
          {action.topicTitle ? <span className="text-ink-lo font-normal"> → {action.topicTitle}</span> : null}
        </div>
        <p className="text-sm text-ink-lo">{action.reason}</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          ≈ {action.sessionMinutes} minutes · {action.moduleTitle ? `Module: ${action.moduleTitle}` : subjectName}
        </p>
      </div>

      <button
        onClick={handleContinue}
        className="font-mono text-[12px] uppercase tracking-wide px-5 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
      >
        Continue Learning →
      </button>
    </section>
  );
}
