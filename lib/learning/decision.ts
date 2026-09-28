import { topicId } from "@/lib/domain";
import { getEffectiveModules } from "@/lib/syllabus";
import { topicPyqCounts } from "./pyqmap";
import type { ProgramId } from "@/lib/types";
import { getLearningState, openMistakes } from "./state";
import type { RecommendedAction } from "./types";

interface Unit {
  ref: string;
  moduleCode: string;
  moduleTitle: string;
  topicIndex: number | null;
  title: string;
  mastery: number | null;
  exposed: boolean;
  revisionDue: boolean;
  pyqs: number;
}

function buildUnits(programId: ProgramId, subjectCode: string): Unit[] {
  const subjectKey = `${programId}:${subjectCode}`;
  const modules = getEffectiveModules(programId, subjectCode);
  const pyqCounts = topicPyqCounts(programId, subjectCode);
  const state = getLearningState(programId, subjectCode);
  const now = Date.now();
  const units: Unit[] = [];

  const pyqsFor = (moduleCode: string, topicIndex: number | null): number => {
    if (topicIndex !== null) {
      const exact = pyqCounts.get(topicId(subjectKey, moduleCode, topicIndex)) ?? 0;
      if (exact > 0) return exact;
    }
    return pyqCounts.get(`${subjectKey}:${moduleCode}`) ?? 0;
  };

  for (const m of modules) {
    if (m.topics.length > 0) {
      m.topics.forEach((t, j) => {
        const ref = topicId(subjectKey, m.moduleCode, j);
        const s = state.topics[ref];
        units.push({
          ref,
          moduleCode: m.moduleCode,
          moduleTitle: m.title,
          topicIndex: j,
          title: t.title,
          mastery: s?.mastery ?? null,
          exposed: s?.exposed ?? false,
          revisionDue: (s?.revisionDueAt ?? null) !== null && (s?.revisionDueAt ?? Infinity) <= now,
          pyqs: pyqsFor(m.moduleCode, j),
        });
      });
    } else {
      const ref = `${subjectKey}:${m.moduleCode}`;
      const s = state.topics[ref];
      units.push({
        ref,
        moduleCode: m.moduleCode,
        moduleTitle: m.title,
        topicIndex: null,
        title: m.title,
        mastery: s?.mastery ?? null,
        exposed: s?.exposed ?? false,
        revisionDue: (s?.revisionDueAt ?? null) !== null && (s?.revisionDueAt ?? Infinity) <= now,
        pyqs: pyqsFor(m.moduleCode, null),
      });
    }
  }
  return units;
}

function fill(task: RecommendedAction, minutes: number): RecommendedAction {
  return { ...task, sessionMinutes: minutes };
}

export function decideNextAction(
  programId: ProgramId,
  subjectCode: string,
  minutes = 45
): RecommendedAction {
  const state = getLearningState(programId, subjectCode);
  const mistakes = openMistakes(state);
  const units = buildUnits(programId, subjectCode);

  if (units.length === 0) {
    return fill(
      {
        task: "teach",
        topicRef: null,
        topicTitle: null,
        moduleId: null,
        moduleTitle: null,
        reason: "Open the syllabus and start Module 1.",
        sessionMinutes: minutes,
      },
      minutes
    );
  }

  const byRef = new Map(units.map((u) => [u.ref, u]));
  const fixable = mistakes.map((m) => ({ mistake: m, unit: byRef.get(m.topicRef) })).filter((x) => x.unit);
  const actionable = fixable.filter((x) => (x.unit!.mastery ?? 0) < 4);
  if (actionable.length > 0) {
    const top = actionable.sort((a, b) => b.mistake.createdAt - a.mistake.createdAt)[0];
    return fill(
      {
        task: "fix",
        topicRef: top.unit!.ref,
        topicTitle: top.unit!.title,
        moduleId: top.unit!.moduleCode,
        moduleTitle: top.unit!.moduleTitle,
        reason: `Fix your mistake in ${top.unit!.title}.`,
        sessionMinutes: minutes,
      },
      minutes
    );
  }

  const due = units.filter((u) => u.revisionDue).sort((a, b) => (a.mastery ?? 0) - (b.mastery ?? 0));
  if (due.length > 0) {
    return fill(
      {
        task: "recall",
        topicRef: due[0].ref,
        topicTitle: due[0].title,
        moduleId: due[0].moduleCode,
        moduleTitle: due[0].moduleTitle,
        reason: `${due[0].title} is due for revision.`,
        sessionMinutes: minutes,
      },
      minutes
    );
  }

  const weak = units
    .filter((u) => u.mastery !== null && u.mastery < 4)
    .sort((a, b) => b.pyqs - a.pyqs || (a.mastery ?? 0) - (b.mastery ?? 0));
  if (weak.length > 0) {
    const top = weak[0];
    const task = (top.mastery ?? 0) >= 2 ? "practice" : "teach";
    const weight = top.pyqs > 0 ? "High exam weight + low mastery." : "Low mastery — close the gap.";
    return fill(
      {
        task,
        topicRef: top.ref,
        topicTitle: top.title,
        moduleId: top.moduleCode,
        moduleTitle: top.moduleTitle,
        reason: task === "practice" ? `${weight} Practice ${top.title}.` : `${weight} Learn ${top.title}.`,
        sessionMinutes: minutes,
      },
      minutes
    );
  }

  const next = units.find((u) => u.mastery === null);
  if (next) {
    return fill(
      {
        task: "teach",
        topicRef: next.ref,
        topicTitle: next.title,
        moduleId: next.moduleCode,
        moduleTitle: next.moduleTitle,
        reason: `Next in your syllabus: ${next.title}.`,
        sessionMinutes: minutes,
      },
      minutes
    );
  }

  const check = [...units].sort((a, b) => b.pyqs - a.pyqs || (a.mastery ?? 6) - (b.mastery ?? 6))[0];
  return fill(
    {
      task: "exam",
      topicRef: check.ref,
      topicTitle: check.title,
      moduleId: check.moduleCode,
      moduleTitle: check.moduleTitle,
      reason: `Everything is assessed — run a mastery check on ${check.title}.`,
      sessionMinutes: minutes,
    },
    minutes
  );
}
