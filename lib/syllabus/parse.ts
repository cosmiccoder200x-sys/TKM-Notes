import { subjects } from "@/lib/content";
import type { ProgramId } from "@/lib/types";
import type { ParsedSyllabus, SegmentedSyllabus, SubjectGuess, SyllabusModule } from "./types";

const MODULE_HEADER = /^\s*(?:module|unit|chapter|part)\s*[-–:.]?\s*([ivxlc\d]+)\s*[-–:.]?\s*(.*)$/i;
const ROMAN: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8 };
const BULLET = /^\s*(?:[-*•>▪]|\d{1,2}[.)\]}:]|[(]?\d{1,2}[)])\s+/;
const HOURS = /\(\s*\d+\s*(?:hrs?|hours|marks?|h)[^)]*\)\s*$/i;
const CODE_RE = /\b24[A-Z]{2,4}\d{3}[A-Z0-9]*\b/g;

function headerNumber(token: string): number | null {
  const t = token.trim().toLowerCase();
  if (/^\d{1,2}$/.test(t)) return parseInt(t, 10);
  return ROMAN[t] ?? null;
}

function cleanTopic(line: string): string {
  return line.replace(BULLET, "").replace(HOURS, "").replace(/\s+/g, " ").trim();
}

function blankModule(number: number, title: string): SyllabusModule {
  const t = title.replace(HOURS, "").replace(/\s+/g, " ").trim() || `Module ${number}`;
  return { moduleCode: `m${number}`, number, title: t, topics: [] };
}

export function parseSubjectSyllabus(raw: string): ParsedSyllabus {
  const warnings: string[] = [];
  const modules: SyllabusModule[] = [];
  const seen = new Map<number, SyllabusModule>();
  let current: SyllabusModule | null = null;

  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const header = line.match(MODULE_HEADER);
    if (header) {
      const number = headerNumber(header[1]);
      if (number === null || number < 1 || number > 12) {
        warnings.push(`Ignored unrecognized module header: "${line.slice(0, 60)}"`);
        current = null;
        continue;
      }
      const existing = seen.get(number);
      if (existing) {
        warnings.push(`Duplicate Module ${number} merged into one.`);
        current = existing;
      } else {
        current = blankModule(number, header[2] ?? "");
        seen.set(number, current);
        modules.push(current);
      }
      continue;
    }
    if (!current) continue;
    const title = cleanTopic(line);
    if (!title || title.length < 2) continue;
    current.topics.push({ index: current.topics.length, title });
  }

  modules.sort((a, b) => a.number - b.number);
  modules.forEach((m, i) => {
    m.moduleCode = `m${m.number}`;
    m.topics.forEach((t, j) => {
      t.index = j;
    });
    if (m.topics.length === 0) warnings.push(`Module ${m.number} ("${m.title}") has no topics.`);
    void i;
  });

  if (modules.length === 0) warnings.push("No module headers found. Use lines like “Module 1: Title” followed by topics.");

  return { modules, warnings };
}

export function detectSubjects(raw: string, limit = 5): SubjectGuess[] {
  const out: SubjectGuess[] = [];
  const seen = new Set<string>();
  const push = (g: SubjectGuess) => {
    const key = `${g.programId}:${g.subjectCode}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(g);
  };

  const codes = raw.match(CODE_RE) ?? [];
  for (const code of codes) {
    for (const s of subjects) {
      if (s.code === code) {
        push({ programId: s.programId, subjectCode: s.code, subjectName: s.name, confidence: "high" });
      }
    }
  }

  const lowered = raw.toLowerCase();
  for (const s of subjects) {
    if (s.name.length < 8) continue;
    if (lowered.includes(s.name.toLowerCase())) {
      push({ programId: s.programId, subjectCode: s.code, subjectName: s.name, confidence: "medium" });
    }
  }

  const rank = { high: 0, medium: 1, low: 2 };
  return out.sort((a, b) => rank[a.confidence] - rank[b.confidence]).slice(0, limit);
}

function segmentBoundaries(raw: string): { index: number; guess: SubjectGuess }[] {
  const lines = raw.split(/\r?\n/);
  const bounds: { index: number; guess: SubjectGuess }[] = [];
  let offset = 0;
  for (const line of lines) {
    const guesses = detectSubjects(line, 1);
    if (guesses.length > 0) {
      const last = bounds[bounds.length - 1];
      const key = `${guesses[0].programId}:${guesses[0].subjectCode}`;
      const lastKey = last ? `${last.guess.programId}:${last.guess.subjectCode}` : "";
      if (key !== lastKey) bounds.push({ index: offset, guess: guesses[0] });
    }
    offset += line.length + 1;
  }
  return bounds;
}

export function parseFullSyllabus(raw: string): SegmentedSyllabus[] {
  const bounds = segmentBoundaries(raw);
  if (bounds.length === 0) {
    return [{ guess: null, parsed: parseSubjectSyllabus(raw), raw }];
  }
  return bounds.map((b, i) => {
    const end = i + 1 < bounds.length ? bounds[i + 1].index : raw.length;
    const segment = raw.slice(b.index, end);
    return { guess: b.guess, parsed: parseSubjectSyllabus(segment), raw: segment };
  });
}
