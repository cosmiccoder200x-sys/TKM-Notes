"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import type { Subject, Module } from "@/lib/types";
import { getSubjectContent } from "@/lib/notes";

export type ContentType =
  | "subject"
  | "module"
  | "definition"
  | "formula"
  | "question"
  | "diagram"
  | "selfcheck"
  | "crosslink"
  | "concept"
  | "revision"
  | "worked-example"
  | "comparison"
  | "intuition";

export interface SearchDoc {
  id: string;
  type: ContentType;
  title: string;
  text: string;
  subjectCode: string;
  subjectName: string;
  subjectSlug: string;
  semesterId: string;
  moduleId?: string;
  moduleTitle?: string;
  href: string;
}

export interface SearchResult extends SearchDoc {
  score: number;
}

export interface SearchFilters {
  contentType: ContentType | "all";
  semester: string | "all";
  subject: string | "all";
  module: string | "all";
}

export const CONTENT_TYPE_LABEL: Record<ContentType, string> = {
  subject: "Subject",
  module: "Module",
  definition: "Definition",
  formula: "Formula",
  question: "Exam Q",
  diagram: "Diagram",
  selfcheck: "Self-Check",
  crosslink: "Link",
  concept: "Concept",
  revision: "Revision",
  "worked-example": "Example",
  comparison: "Compare",
  intuition: "Intuition",
};

const TYPE_WEIGHT: Record<ContentType, number> = {
  module: 300,
  definition: 200,
  question: 180,
  concept: 150,
  formula: 140,
  selfcheck: 140,
  "worked-example": 120,
  diagram: 110,
  comparison: 110,
  revision: 80,
  crosslink: 70,
  subject: 60,
  intuition: 60,
};

function isSubsequence(q: string, t: string): boolean {
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) {
    if (t[j] === q[i]) i++;
  }
  return i === q.length;
}

export function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();
  if (!q) return 0;
  const idx = t.indexOf(q);
  if (idx >= 0) {
    return idx === 0 ? 1200 - idx : 1000 - idx;
  }
  if (isSubsequence(q, t)) return 400;
  for (const tok of t.split(/[^a-z0-9]+/)) {
    if (tok && isSubsequence(q, tok)) return 300;
  }
  return 0;
}

export function buildSearchIndex(
  subjects: Subject[]
): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const subject of subjects) {
    const base = `/${subject.semesterId}/${subject.slug}`;
    docs.push({
      id: `subject-${subject.code}`,
      type: "subject",
      title: subject.name,
      text: `${subject.name} ${subject.code}`,
      subjectCode: subject.code,
      subjectName: subject.name,
      subjectSlug: subject.slug,
      semesterId: subject.semesterId,
      href: base,
    });

    const content = getSubjectContent(subject.code, subject.programId);
    if (!content) continue;

    content.modules.forEach((mod: Module) => {
      const modHref = `${base}#${mod.id}`;

      docs.push({
        id: `module-${subject.code}-${mod.id}`,
        type: "module",
        title: mod.title,
        text: mod.title,
        subjectCode: subject.code,
        subjectName: subject.name,
        subjectSlug: subject.slug,
        semesterId: subject.semesterId,
        moduleId: mod.id,
        moduleTitle: mod.title,
        href: modHref,
      });

      mod.definitions.forEach((d, i) => {
        docs.push({
          id: `def-${subject.code}-${mod.id}-${i}`,
          type: "definition",
          title: d.term,
          text: `${d.term} ${d.definition}`,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      mod.coreConcepts.forEach((c, i) => {
        docs.push({
          id: `concept-${subject.code}-${mod.id}-${i}`,
          type: "concept",
          title: c,
          text: c,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      mod.formulas.forEach((f, i) => {
        docs.push({
          id: `formula-${subject.code}-${mod.id}-${i}`,
          type: "formula",
          title: f.name,
          text: `${f.name} ${f.expression} ${f.note ?? ""}`,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      mod.examFocus.forEach((q, i) => {
        docs.push({
          id: `question-${subject.code}-${mod.id}-${i}`,
          type: "question",
          title: q.question,
          text: q.question,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      mod.diagrams.forEach((d, i) => {
        docs.push({
          id: `diagram-${subject.code}-${mod.id}-${i}`,
          type: "diagram",
          title: d.title,
          text: d.title,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      (mod.selfCheck ?? []).forEach((sc, i) => {
        docs.push({
          id: `selfcheck-${subject.code}-${mod.id}-${i}`,
          type: "selfcheck",
          title: sc.question,
          text: `${sc.question} ${sc.answer}`,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      (mod.crossLinks ?? []).forEach((cl, i) => {
        docs.push({
          id: `crosslink-${subject.code}-${mod.id}-${i}`,
          type: "crosslink",
          title: cl.label,
          text: cl.label,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      (mod.workedExamples ?? []).forEach((w, i) => {
        docs.push({
          id: `we-${subject.code}-${mod.id}-${i}`,
          type: "worked-example",
          title: w.title,
          text: `${w.title} ${w.problem}`,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      (mod.comparisons ?? []).forEach((c, i) => {
        docs.push({
          id: `compare-${subject.code}-${mod.id}-${i}`,
          type: "comparison",
          title: c.title,
          text: `${c.title} ${c.takeaway}`,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      (mod.revisionNotes ?? []).forEach((r, i) => {
        docs.push({
          id: `rev-${subject.code}-${mod.id}-${i}`,
          type: "revision",
          title: r.slice(0, 80),
          text: r,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      });

      if (mod.intuition) {
        docs.push({
          id: `intuition-${subject.code}-${mod.id}`,
          type: "intuition",
          title: mod.intuition.slice(0, 80),
          text: mod.intuition,
          subjectCode: subject.code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          moduleId: mod.id,
          moduleTitle: mod.title,
          href: modHref,
        });
      }
    });
  }

  return docs;
}

export function searchDocs(
  index: SearchDoc[],
  query: string,
  filters: SearchFilters
): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  const results: SearchResult[] = [];
  for (const doc of index) {
    if (filters.contentType !== "all" && doc.type !== filters.contentType) continue;
    if (filters.semester !== "all" && doc.semesterId !== filters.semester) continue;
    if (filters.subject !== "all" && doc.subjectCode !== filters.subject) continue;
    if (filters.module !== "all" && doc.moduleId !== filters.module) continue;

    const titleScore = fuzzyScore(q, doc.title);
    const textScore = fuzzyScore(q, doc.text);
    if (titleScore === 0 && textScore === 0) continue;

    const baseScore = titleScore > 0 ? titleScore : textScore * 0.6;
    results.push({ ...doc, score: baseScore + TYPE_WEIGHT[doc.type] });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 50);
}

export function useSearchService() {
  const [index, setIndex] = useState<SearchDoc[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([import("@/lib/content")])
      .then(([contentMod]) => {
        if (active) setIndex(buildSearchIndex(contentMod.subjects));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const search = useCallback(
    (query: string, filters: SearchFilters) => searchDocs(index, query, filters),
    [index]
  );

  return { index, search };
}

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function getHighlightSegments(
  text: string,
  query: string
): { text: string; match: boolean }[] {
  const q = query.trim();
  if (!q) return [{ text, match: false }];
  const lower = text.toLowerCase();
  const ql = q.toLowerCase();
  const idx = lower.indexOf(ql);
  if (idx === -1) return [{ text, match: false }];
  return [
    { text: text.slice(0, idx), match: false },
    { text: text.slice(idx, idx + q.length), match: true },
    { text: text.slice(idx + q.length), match: false },
  ];
}
