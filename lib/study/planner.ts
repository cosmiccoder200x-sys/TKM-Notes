// PrepPilot AI Study Planner engine.
// Pure + deterministic: builds a time-boxed study plan from verified content
// (exam weightage, module order) and, when available, the student's own mastery
// data. All reasons are honest statements about the content — no invented claims.

import registry from "@/lib/notes";
import { subjects } from "@/lib/content";
import { ProgressMap, NightBeforeTarget } from "./types";
import { MASTERY_ADJUST } from "./nightBefore";
import { calculateModuleMastery } from "./mastery";
import { modulePriority, PriorityTier, estimatedSubjectMinutes } from "./priority";

export type PrepLevel = "behind" | "ok" | "ahead";

export interface PlannerConfig {
  subjectCode: string;
  minutes: number;
  prepLevel: PrepLevel;
  target?: NightBeforeTarget;
  moduleIds?: string[];
}

export type PlanBlockKind = "learn" | "practice" | "revise" | "selfcheck";

export type PlanActionKind =
  | "definitions"
  | "concepts"
  | "formulas"
  | "questions"
  | "revision"
  | "self-check";

export interface PlanAction {
  label: string;
  kind: PlanActionKind;
  moduleId: string;
  moduleTitle: string;
  count: number;
}

export interface PlanBlock {
  id: string;
  title: string;
  kind: PlanBlockKind;
  minutes: number;
  modules: { moduleId: string; moduleTitle: string; tier: PriorityTier; high: number }[];
  reasons: string[];
  actions: PlanAction[];
}

export interface StudyPlan {
  subjectCode: string;
  subjectName: string;
  config: PlannerConfig;
  blocks: PlanBlock[];
  totalMinutes: number;
  estimatedStudyMinutes: number;
  disclaimer: string;
}

interface Ranked {
  moduleId: string;
  moduleTitle: string;
  tier: PriorityTier;
  score: number;
  high: number;
  medium: number;
  low: number;
  statusLabel: string;
}

function rankModules(subjectCode: string, moduleIds?: string[], progress?: ProgressMap): Ranked[] {
  const content = registry[subjectCode];
  if (!content) return [];
  const modules = content.modules.filter((m) => !moduleIds || moduleIds.length === 0 || moduleIds.includes(m.id));

  return modules
    .map((m, index) => {
      const pri = modulePriority(m, index, content.modules.length);
      const mastery = calculateModuleMastery(progress?.[subjectCode]?.[m.id]);
      const adjustment = MASTERY_ADJUST[mastery.status] ?? 1;
      let high = 0;
      let medium = 0;
      let low = 0;
      for (const q of m.examFocus) {
        if (q.weightage === "high") high += 1;
        else if (q.weightage === "medium") medium += 1;
        else low += 1;
      }
      return {
        moduleId: m.id,
        moduleTitle: m.title,
        tier: pri.tier,
        score: pri.examScore * adjustment,
        high,
        medium,
        low,
        statusLabel: mastery.status === "not-assessed" ? "Not assessed" : mastery.status,
      };
    })
    .sort((a, b) => {
      const tierOrder: Record<PriorityTier, number> = { "must-learn": 0, core: 1, support: 2 };
      const t = tierOrder[a.tier] - tierOrder[b.tier];
      if (t !== 0) return t;
      return b.score - a.score;
    });
}

function allocate(available: number, weights: { id: string; w: number }[]): Record<string, number> {
  const totalW = weights.reduce((s, x) => s + x.w, 0);
  const out: Record<string, number> = {};
  let used = 0;
  weights.forEach((x, i) => {
    const raw = (available * x.w) / totalW;
    const val = i === weights.length - 1 ? Math.max(0, available - used) : Math.round(raw);
    out[x.id] = val;
    used += val;
  });
  return out;
}

const PREP_RATIOS: Record<PrepLevel, { learn: number; practice: number; revise: number }> = {
  behind: { learn: 0.5, practice: 0.35, revise: 0.15 },
  ok: { learn: 0.4, practice: 0.4, revise: 0.2 },
  ahead: { learn: 0.25, practice: 0.4, revise: 0.35 },
};

function cap(kind: PlanActionKind, minutes: number, available: number): number {
  const max = minutes < 60 ? 3 : minutes < 120 ? 5 : 8;
  return Math.min(max, available);
}

export function generateStudyPlan(subjectCode: string, config: PlannerConfig, progress?: ProgressMap): StudyPlan | null {
  const content = registry[subjectCode];
  if (!content) return null;

  const minutes = Math.max(20, config.minutes);
  const ranked = rankModules(subjectCode, config.moduleIds, progress);
  const availableSelfCheck = content.modules.some((m) => m.selfCheck && m.selfCheck.length > 0);

  let learnR = PREP_RATIOS[config.prepLevel].learn;
  let practiceR = PREP_RATIOS[config.prepLevel].practice;
  let reviseR = PREP_RATIOS[config.prepLevel].revise;
  let selfcheckR = 0;
  if (minutes >= 60 && availableSelfCheck) {
    selfcheckR = 0.15;
    reviseR = Math.max(0.05, reviseR - 0.15);
  }
  const allocation = allocate(minutes, [
    { id: "learn", w: learnR },
    { id: "practice", w: practiceR },
    { id: "revise", w: reviseR },
    ...(selfcheckR > 0 ? [{ id: "selfcheck", w: selfcheckR }] : []),
  ]);
  const learnMin = allocation.learn;
  const practiceMin = allocation.practice;
  const reviseMin = allocation.revise;
  const selfcheckMin = allocation.selfcheck ?? 0;

  const blocks: PlanBlock[] = [];

  // --- LEARN ---
  {
    const count = minutes < 60 ? 2 : minutes < 120 ? 3 : 4;
    const focus = ranked.slice(0, count);
    const reasons = focus.map((m) => `${m.moduleTitle} — ${m.statusLabel}`);
    if (config.prepLevel === "behind") reasons.unshift("You're behind — build foundations before practice");
    const actions: PlanAction[] = [];
    for (const m of focus) {
      const mod = content.modules.find((x) => x.id === m.moduleId)!;
      const concepts = cap("concepts", minutes, mod.coreConcepts.length);
      const defs = cap("definitions", minutes, mod.definitions.length);
      if (concepts > 0) actions.push({ label: "Core concepts", kind: "concepts", moduleId: m.moduleId, moduleTitle: m.moduleTitle, count: concepts });
      if (defs > 0) actions.push({ label: "Definitions to memorize", kind: "definitions", moduleId: m.moduleId, moduleTitle: m.moduleTitle, count: defs });
    }
    blocks.push({
      id: "learn",
      title: "1 · Learn the foundations",
      kind: "learn",
      minutes: learnMin,
      modules: focus.map((m) => ({ moduleId: m.moduleId, moduleTitle: m.moduleTitle, tier: m.tier, high: m.high })),
      reasons,
      actions,
    });
  }

  // --- PRACTICE ---
  {
    const withQuestions = ranked.filter((m) => m.high + m.medium + m.low > 0);
    const count = minutes < 60 ? 2 : minutes < 120 ? 3 : 4;
    const focus = withQuestions.slice(0, count);
    const reasons: string[] = [];
    const totalHigh = focus.reduce((s, m) => s + m.high, 0);
    if (totalHigh > 0) reasons.push(`${totalHigh} HIGH PRIORITY questions across the modules you're practicing`);
    if (config.prepLevel !== "ahead") reasons.push("Attempt before reading the answer — active recall beats re-reading");
    const actions: PlanAction[] = [];
    for (const m of focus) {
      const total = m.high + m.medium + m.low;
      if (total > 0) {
        actions.push({
          label: m.high > 0 ? `${m.high} high-priority questions first` : "Questions",
          kind: "questions",
          moduleId: m.moduleId,
          moduleTitle: m.moduleTitle,
          count: Math.min(cap("questions", minutes, total), total),
        });
      }
    }
    blocks.push({
      id: "practice",
      title: "2 · Practice high-value questions",
      kind: "practice",
      minutes: practiceMin,
      modules: focus.map((m) => ({ moduleId: m.moduleId, moduleTitle: m.moduleTitle, tier: m.tier, high: m.high })),
      reasons,
      actions,
    });
  }

  // --- REVISE ---
  {
    const focus = ranked.slice(0, minutes < 60 ? 2 : 4);
    const actions: PlanAction[] = [];
    for (const m of focus) {
      const mod = content.modules.find((x) => x.id === m.moduleId)!;
      const rev = cap("revision", minutes, mod.revisionNotes.length);
      const formulas = cap("formulas", minutes, mod.formulas.length);
      if (rev > 0) actions.push({ label: "Rapid revision bullets", kind: "revision", moduleId: m.moduleId, moduleTitle: m.moduleTitle, count: rev });
      if (formulas > 0) actions.push({ label: "Formula sheet", kind: "formulas", moduleId: m.moduleId, moduleTitle: m.moduleTitle, count: formulas });
    }
    blocks.push({
      id: "revise",
      title: "3 · Lock it in with revision",
      kind: "revise",
      minutes: reviseMin,
      modules: focus.map((m) => ({ moduleId: m.moduleId, moduleTitle: m.moduleTitle, tier: m.tier, high: m.high })),
      reasons: ["Speed-read the revision bullets and formulas you just learned"],
      actions,
    });
  }

  // --- SELFCHECK ---
  if (selfcheckMin > 0) {
    const actions: PlanAction[] = [];
    for (const m of ranked.slice(0, 2)) {
      const mod = content.modules.find((x) => x.id === m.moduleId)!;
      if (mod.selfCheck && mod.selfCheck.length > 0) {
        actions.push({
          label: "Tap-to-reveal self-check",
          kind: "self-check",
          moduleId: m.moduleId,
          moduleTitle: m.moduleTitle,
          count: Math.min(4, mod.selfCheck.length),
        });
      }
    }
    blocks.push({
      id: "selfcheck",
      title: "4 · Verify with self-checks",
      kind: "selfcheck",
      minutes: selfcheckMin,
      modules: [],
      reasons: ["If you can answer these without peeking, the module is locked in"],
      actions,
    });
  }

  const selectedModules = config.moduleIds && config.moduleIds.length > 0
    ? content.modules.filter((m) => config.moduleIds!.includes(m.id))
    : content.modules;

  return {
    subjectCode,
    subjectName: subjects.find((s) => s.code === subjectCode)?.name ?? subjectCode,
    config: { ...config, minutes },
    blocks,
    totalMinutes: minutes,
    estimatedStudyMinutes: estimatedSubjectMinutes(selectedModules),
    disclaimer:
      "Plan generated from verified syllabus data (exam weightage + module order) and your own mastery marks. Time is allocated by priority — it's a guide, not a promise of marks.",
  };
}
