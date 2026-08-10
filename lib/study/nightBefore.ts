// Night-Before Mode plan generator.
// Pure algorithm: gathers existing content, prioritizes by exam weightage + (optional)
// mastery data, allocates time, and returns a structured revision plan. No JSX here.

import registry from "@/lib/notes";
import { subjects } from "@/lib/content";
import { Module } from "@/lib/types";
import { ProgressMap, MasteryStatus } from "./types";
import { calculateModuleMastery } from "./mastery";
import {
  NightBeforePlan,
  NightBeforeConfig,
  NightBeforeSession,
  RevisionSection,
  RevisionItem,
  RevisionItemKind,
  RevisionTier,
} from "./types";

const WEIGHTAGE_SCORE: Record<string, number> = { high: 3, medium: 2, low: 1 };

// Plan item kinds -> actual Module content fields.
const KIND_TO_FIELD: Record<RevisionItemKind, keyof Module> = {
  definitions: "definitions",
  concepts: "coreConcepts",
  formulas: "formulas",
  questions: "examFocus",
  diagrams: "diagrams",
  revision: "revisionNotes",
  "self-check": "selfCheck",
  "worked-examples": "workedExamples",
};

// Mastery-based adjustment: weak modules float to the top, strong ones sink.
export const MASTERY_ADJUST: Record<MasteryStatus, number> = {
  strong: 0.6,
  good: 0.85,
  "needs-practice": 1.2,
  weak: 1.6,
  "not-assessed": 1.0, // unknown — keep neutral, never claim frequency
};

export function subjectNameFor(code: string): string {
  return subjects.find((s) => s.code === code)?.name ?? code;
}

interface ScoredModule {
  module: Module;
  examScore: number;
  priority: number;
  masteryScore: number | null;
}

function scoreModules(subjectCode: string, progress?: ProgressMap): ScoredModule[] {
  const content = registry[subjectCode];
  if (!content) return [];

  return content.modules.map((module) => {
    const examScore = module.examFocus.reduce((sum, q) => sum + (WEIGHTAGE_SCORE[q.weightage] ?? 1), 0);
    const mastery = calculateModuleMastery(progress?.[subjectCode]?.[module.id]);
    const adjustment = MASTERY_ADJUST[mastery.status];
    return {
      module,
      examScore,
      priority: (examScore + 1) * adjustment,
      masteryScore: mastery.score,
    };
  });
}

function limitFor(minutes: number, kind: RevisionItemKind): number | "all" {
  switch (kind) {
    case "definitions":
      return minutes < 60 ? 3 : minutes < 120 ? 5 : "all";
    case "concepts":
      return minutes < 60 ? 2 : minutes < 120 ? 4 : 7;
    case "formulas":
      return minutes < 60 ? 2 : minutes < 120 ? 5 : "all";
    case "questions":
      return minutes < 60 ? 4 : minutes < 120 ? 6 : "all";
    case "diagrams":
      return minutes < 60 ? 1 : minutes < 120 ? 2 : "all";
    case "revision":
      return minutes < 60 ? 5 : "all";
    case "self-check":
      return minutes < 90 ? 4 : minutes < 180 ? 8 : "all";
    case "worked-examples":
      return minutes < 180 ? 0 : 3;
    default:
      return "all";
  }
}

function itemLabel(entry: unknown, kind: RevisionItemKind, fallback: string): string {
  if (typeof entry === "string") return entry;
  const e = entry as Record<string, unknown>;
  return (e.term as string) ?? (e.question as string) ?? (e.name as string) ?? (e.title as string) ?? fallback;
}

function takeItems(
  scored: ScoredModule[],
  kind: RevisionItemKind,
  minutes: number,
  tier: RevisionTier
): RevisionItem[] {
  const limit = limitFor(minutes, kind);
  if (limit === 0) return [];

  const ordered = [...scored].sort((a, b) => b.priority - a.priority);
  const items: RevisionItem[] = [];

  for (const s of ordered) {
    if (limit !== "all" && items.length >= limit) break;
    const arr = s.module[KIND_TO_FIELD[kind]] as unknown[] | undefined;
    if (!arr || arr.length === 0) continue;

    let take: number;
    if (limit === "all") take = arr.length;
    else take = Math.max(0, Math.min(limit - items.length, arr.length));

    for (let i = 0; i < take; i++) {
      const entry = arr[i];
      items.push({
        id: `${s.module.id}:${kind}:${i}`,
        moduleId: s.module.id,
        moduleTitle: s.module.title,
        tier,
        kind,
        label: itemLabel(entry, kind, kind),
        weightage:
          kind === "questions" ? (entry as { weightage?: RevisionItem["weightage"] }).weightage : undefined,
        index: i,
      });
    }
  }
  return items;
}

function allocate(availableMinutes: number, weights: { id: string; w: number }[]): Record<string, number> {
  const totalW = weights.reduce((s, x) => s + x.w, 0);
  const out: Record<string, number> = {};
  let used = 0;
  weights.forEach((x, i) => {
    const raw = (availableMinutes * x.w) / totalW;
    const val = i === weights.length - 1 ? availableMinutes - used : Math.round(raw);
    out[x.id] = val;
    used += val;
  });
  return out;
}

export function generateNightBeforePlan(
  subjectCode: string,
  config: NightBeforeConfig,
  progress?: ProgressMap
): NightBeforePlan | null {
  const content = registry[subjectCode];
  if (!content) return null;

  const minutes = Math.max(30, config.minutes);
  const scored = scoreModules(subjectCode, progress);

  const sections: RevisionSection[] = [];
  const weights: { id: string; w: number }[] = [];
  let order = 0;

  const push = (id: string, title: string, tier: RevisionTier, kinds: RevisionItemKind[], w: number) => {
    const items = kinds.flatMap((k) => takeItems(scored, k, minutes, tier));
    if (items.length === 0) return;
    sections.push({ id, order: order++, title, minutes: 0, tier, kinds, items });
    weights.push({ id, w });
  };

  push("must-know", "Must Know", "must-know", ["definitions", "concepts"], 25);
  push("questions", "High Priority Questions", "high-value", ["questions"], 30);
  if (minutes >= 60) push("diagrams-formulas", "Diagrams & Formulas", "high-value", ["diagrams", "formulas"], 15);
  if (minutes >= 60) push("self-check", "Self-Check", "high-value", ["self-check"], 15);
  if (minutes >= 180) push("worked-examples", "Worked Examples", "if-time", ["worked-examples"], 10);
  push("final-revision", "Final Rapid Revision", "must-know", ["revision"], 10);

  const allocation = allocate(minutes, weights);
  sections.forEach((s) => {
    s.minutes = allocation[s.id] ?? 0;
  });

  return {
    subjectCode,
    subjectName: subjectNameFor(subjectCode),
    availableMinutes: minutes,
    target: config.target,
    sections,
    totalMinutes: minutes,
  };
}

export function hasAnyContent(subjectCode: string): boolean {
  return Boolean(registry[subjectCode]);
}

// --- Night-Before session persistence (localStorage) ---

function sessionKey(subjectCode: string): string {
  return `tkm.nightbefore.session.${subjectCode}`;
}

export function saveNightBeforeSession(session: NightBeforeSession) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(sessionKey(session.subjectCode), JSON.stringify(session));
  } catch {
    // storage unavailable — session just won't persist
  }
}

export function loadNightBeforeSession(subjectCode: string): NightBeforeSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(sessionKey(subjectCode));
    return raw ? (JSON.parse(raw) as NightBeforeSession) : null;
  } catch {
    return null;
  }
}

export function clearNightBeforeSession(subjectCode: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(sessionKey(subjectCode));
  } catch {
    // ignore
  }
}

export interface ResolvedRevisionItem {
  kind: RevisionItemKind;
  label: string;
  weightage?: "low" | "medium" | "high";
  content: {
    term?: string;
    definition?: string;
    concept?: string;
    name?: string;
    expression?: string;
    note?: string;
    question?: string;
    answer?: string;
    title?: string;
    caption?: string;
    svgKey?: string;
    interactive?: boolean;
    problem?: string;
    steps?: { label: string; content: string }[];
  };
}

// Resolve a plan item back to its existing content entry (no duplication).
export function resolveRevisionItem(subjectCode: string, item: RevisionItem): ResolvedRevisionItem | null {
  const content = registry[subjectCode];
  if (!content) return null;
  const mod = content.modules.find((m) => m.id === item.moduleId);
  if (!mod) return null;
  const entry = (mod[KIND_TO_FIELD[item.kind]] as unknown[] | undefined)?.[item.index];
  if (entry === undefined) return null;

  const base = { kind: item.kind, label: item.label, weightage: item.weightage };

  if (item.kind === "definitions") {
    const d = entry as { term: string; definition: string };
    return { ...base, content: { term: d.term, definition: d.definition } };
  }
  if (item.kind === "concepts") {
    return { ...base, content: { concept: entry as string } };
  }
  if (item.kind === "formulas") {
    const f = entry as { name: string; expression: string; note?: string };
    return { ...base, content: { name: f.name, expression: f.expression, note: f.note } };
  }
  if (item.kind === "questions") {
    const q = entry as { question: string; weightage: "low" | "medium" | "high"; note?: string };
    return { ...base, content: { question: q.question, note: q.note } };
  }
  if (item.kind === "diagrams") {
    const d = entry as { title: string; svgKey: string; caption: string; interactive?: boolean };
    return { ...base, content: { title: d.title, svgKey: d.svgKey, caption: d.caption, interactive: d.interactive } };
  }
  if (item.kind === "revision") {
    return { ...base, content: { concept: entry as string } };
  }
  if (item.kind === "self-check") {
    const s = entry as { question: string; answer: string };
    return { ...base, content: { question: s.question, answer: s.answer } };
  }
  if (item.kind === "worked-examples") {
    const w = entry as { title: string; problem: string; steps: { label: string; content: string }[]; answer: string };
    return { ...base, content: { title: w.title, problem: w.problem, steps: w.steps } };
  }
  return null;
}

export { WEIGHTAGE_SCORE };
