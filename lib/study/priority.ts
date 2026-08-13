// Topic priority system for TKM Notes.
// Pure + deterministic: derives priority entirely from existing verified content —
// exam weightage metadata + module position in the syllabus. Never invents frequency.

import { Module, Weightage } from "@/lib/types";
import { WEIGHTAGE_SCORE } from "./nightBefore";

export type PriorityTier = "must-learn" | "core" | "support";

export interface ModulePriority {
  tier: PriorityTier;
  tierLabel: string;
  examScore: number;
  high: number;
  medium: number;
  low: number;
  estimatedMinutes: number;
  reasons: string[];
}

const TIER_ORDER: Record<PriorityTier, number> = { "must-learn": 0, core: 1, support: 2 };

export function priorityLabel(q: { weightage: Weightage }): string {
  if (q.weightage === "high") return "HIGH PRIORITY";
  if (q.weightage === "medium") return "Important";
  return "Low";
}

export function moduleExamScore(module: Module): number {
  return module.examFocus.reduce((sum, q) => sum + WEIGHTAGE_SCORE[q.weightage], 0);
}

// Rough study-time estimate per module, derived from how much content it holds.
// Labeled an estimate everywhere it's shown — not a prediction of exam marks.
export function estimatedModuleMinutes(module: Module): number {
  let mins = 15;
  mins += 1.5 * Math.min(module.coreConcepts.length, 10);
  mins += 2.5 * module.definitions.length;
  mins += 2 * module.formulas.length;
  mins += 4 * module.diagrams.length;
  mins += 3 * Math.min(module.revisionNotes.length, 10);
  for (const q of module.examFocus) mins += WEIGHTAGE_SCORE[q.weightage] * 2;
  if (module.workedExamples) mins += 6 * module.workedExamples.length;
  if (module.selfCheck) mins += 1.5 * module.selfCheck.length;
  return Math.max(10, Math.min(120, Math.round(mins)));
}

export function modulePriority(module: Module, index: number, totalModules: number): ModulePriority {
  let high = 0;
  let medium = 0;
  let low = 0;
  for (const q of module.examFocus) {
    if (q.weightage === "high") high += 1;
    else if (q.weightage === "medium") medium += 1;
    else low += 1;
  }

  const examScore = high * WEIGHTAGE_SCORE.high + medium * WEIGHTAGE_SCORE.medium + low * WEIGHTAGE_SCORE.low;

  let tier: PriorityTier = "support";
  if (high >= 2) tier = "must-learn";
  else if (high === 1 || medium >= 2) tier = "core";

  const reasons: string[] = [];
  if (high > 0) reasons.push(`${high} HIGH PRIORITY question${high > 1 ? "s" : ""} in exam focus`);
  if (medium > 0 && high === 0) reasons.push(`${medium} important (medium) questions`);
  if (index === 0 && totalModules > 1) reasons.push("Foundational module — every later module builds on it");
  if (index <= Math.floor(totalModules / 2) && index > 0) reasons.push("Appears early in the syllabus — other modules assume it");
  if (tier === "must-learn") reasons.push("Highest exam weightage in this subject");
  if (tier === "support" && reasons.length === 0) reasons.push("Low exam weightage — read for completeness");
  if (module.revisionNotes.length === 0) reasons.push("No revision notes yet — rely on concepts + questions");
  if (reasons.length === 0) reasons.push("Solid module — cover at normal pace");

  return {
    tier,
    tierLabel: tier === "must-learn" ? "Must Learn" : tier === "core" ? "Core" : "Support",
    examScore,
    high,
    medium,
    low,
    estimatedMinutes: estimatedModuleMinutes(module),
    reasons,
  };
}

export interface RankedModule {
  module: Module;
  priority: ModulePriority;
}

// Recommended study order: highest exam weightage first, stable by syllabus order.
export function rankModulesForStudy(modules: Module[]): RankedModule[] {
  return modules
    .map((module, index) => ({
      module,
      priority: modulePriority(module, index, modules.length),
    }))
    .sort((a, b) => {
      const tierDiff = TIER_ORDER[a.priority.tier] - TIER_ORDER[b.priority.tier];
      if (tierDiff !== 0) return tierDiff;
      const scoreDiff = b.priority.examScore - a.priority.examScore;
      if (scoreDiff !== 0) return scoreDiff;
      const aIndex = modules.indexOf(a.module);
      const bIndex = modules.indexOf(b.module);
      return aIndex - bIndex;
    });
}

export function estimatedSubjectMinutes(modules: Module[]): number {
  return modules.reduce((sum, m) => sum + estimatedModuleMinutes(m), 0);
}
