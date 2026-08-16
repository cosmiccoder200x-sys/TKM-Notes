// Learn CS — canonical cross-links to the TKM syllabus.
// These links never duplicate P0/P1 data: every target subject is resolved via
// lib/content.ts (findSubjectByCode) and lib/notes (getSubjectContent), and the
// href is built with lib/urls.subjectUrl. Learn CS only stores program + code.

import { findSubjectByCode, syllabusModulesFor } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { ProgramId } from "@/lib/types";
import { subjectUrl } from "@/lib/urls";
import { LearnSyllabusLink, LearnTopicSyllabusLink } from "./types";

interface SubjectTarget {
  programId: ProgramId;
  subjectCode: string;
  moduleId?: string;
}

// learn-cs subject slug -> the TKM subjects (per branch) that cover it.
const SUBJECT_LINKS: Record<string, SubjectTarget[]> = {
  "data-structures-and-algorithms": [
    { programId: "ER", subjectCode: "24ERP304" },
    { programId: "CS", subjectCode: "24CSP304" },
    { programId: "CS_AI", subjectCode: "24CSP304" },
  ],
  "object-oriented-programming": [
    { programId: "ER", subjectCode: "24ERP407" },
    { programId: "CS", subjectCode: "24CSM310" },
    { programId: "CS_AI", subjectCode: "24CSM310" },
  ],
  dbms: [
    { programId: "ER", subjectCode: "24ERJ502" },
    { programId: "CS_AI", subjectCode: "24CSO833" },
  ],
  databases: [
    { programId: "ER", subjectCode: "24ERJ502" },
    { programId: "CS_AI", subjectCode: "24CSO833" },
  ],
  "operating-systems": [
    { programId: "ER", subjectCode: "24ERP504" },
    { programId: "CS", subjectCode: "24CSP403" },
    { programId: "CS_AI", subjectCode: "24CSP403" },
  ],
  "computer-networks": [
    { programId: "ER", subjectCode: "24ERP601" },
    { programId: "CS", subjectCode: "24CSP402" },
    { programId: "CS_AI", subjectCode: "24AIP503" },
  ],
  "computer-organization-and-architecture": [
    { programId: "ER", subjectCode: "24ERT401" },
    { programId: "CS", subjectCode: "24CSP305" },
    { programId: "CS_AI", subjectCode: "24CSP305" },
  ],
  "software-engineering": [
    { programId: "ER", subjectCode: "24ERT507" },
    { programId: "CS", subjectCode: "24CST502" },
    { programId: "CS_AI", subjectCode: "24CST502" },
  ],
  "machine-learning": [
    { programId: "ER", subjectCode: "24ERT503" },
    { programId: "CS", subjectCode: "24CSO813" },
    { programId: "CS_AI", subjectCode: "24CSO813" },
  ],
  "deep-learning": [
    { programId: "ER", subjectCode: "24ERT503" },
    { programId: "CS", subjectCode: "24CSO822" },
    { programId: "CS_AI", subjectCode: "24CSO822" },
  ],
  "generative-ai": [
    { programId: "ER", subjectCode: "24ERT503" },
    { programId: "CS", subjectCode: "24CSO822" },
    { programId: "CS_AI", subjectCode: "24CSO822" },
  ],
  "data-science": [
    { programId: "ER", subjectCode: "24ERT503" },
    { programId: "CS", subjectCode: "24CSO813" },
    { programId: "CS_AI", subjectCode: "24CSO813" },
  ],
  "discrete-mathematics": [
    { programId: "ER", subjectCode: "24MAP301" },
    { programId: "CS_AI", subjectCode: "24EST382" },
  ],
  "linear-algebra": [
    { programId: "ER", subjectCode: "24MAP301" },
    { programId: "CS", subjectCode: "24MAP301" },
    { programId: "CS_AI", subjectCode: "24MAP300" },
  ],
  cybersecurity: [
    { programId: "CS", subjectCode: "24CSE694" },
    { programId: "CS_AI", subjectCode: "24CSE694" },
  ],
};

// Topic-level links: learn-cs subject + topic -> moduleId within the linked TKM
// subject. Keyed `${subjectSlug}/${topicSlug}` -> per-program module target.
const TOPIC_LINKS: Record<string, Partial<Record<ProgramId, { subjectCode: string; moduleId: string }>>> = {
  "data-structures-and-algorithms/binary-search": {
    ER: { subjectCode: "24ERP304", moduleId: "m4" },
    CS: { subjectCode: "24CSP304", moduleId: "m2" },
    CS_AI: { subjectCode: "24CSP304", moduleId: "m2" },
  },
  "data-structures-and-algorithms/sorting-algorithms": {
    ER: { subjectCode: "24ERP304", moduleId: "m4" },
    CS: { subjectCode: "24CSP304", moduleId: "m4" },
    CS_AI: { subjectCode: "24CSP304", moduleId: "m4" },
  },
  "data-structures-and-algorithms/arrays": {
    ER: { subjectCode: "24ERP304", moduleId: "m2" },
    CS: { subjectCode: "24CSP304", moduleId: "m2" },
    CS_AI: { subjectCode: "24CSP304", moduleId: "m2" },
  },
  "data-structures-and-algorithms/linked-lists": {
    ER: { subjectCode: "24ERP304", moduleId: "m2" },
    CS: { subjectCode: "24CSP304", moduleId: "m2" },
    CS_AI: { subjectCode: "24CSP304", moduleId: "m2" },
  },
  "data-structures-and-algorithms/binary-search-trees": {
    ER: { subjectCode: "24ERP304", moduleId: "m3" },
    CS: { subjectCode: "24CSP304", moduleId: "m3" },
    CS_AI: { subjectCode: "24CSP304", moduleId: "m3" },
  },
  "data-structures-and-algorithms/graphs": {
    ER: { subjectCode: "24ERP304", moduleId: "m3" },
    CS: { subjectCode: "24CSP304", moduleId: "m3" },
    CS_AI: { subjectCode: "24CSP304", moduleId: "m3" },
  },
  "operating-systems/processes-and-threads": {
    ER: { subjectCode: "24ERP504", moduleId: "m1" },
  },
  "computer-networks/http": {
    ER: { subjectCode: "24ERP601", moduleId: "m2" },
  },
  "computer-networks/ip-addressing": {
    ER: { subjectCode: "24ERP601", moduleId: "m4" },
  },
  "computer-networks/routing": {
    ER: { subjectCode: "24ERP601", moduleId: "m4" },
  },
};

// Resolve a learn-cs subject to its TKM links (never duplicates target data).
export function syllabusLinksForSubject(learnSubjectSlug: string): LearnSyllabusLink[] {
  const targets = SUBJECT_LINKS[learnSubjectSlug] ?? [];
  const links: LearnSyllabusLink[] = [];
  for (const target of targets) {
    const subject = findSubjectByCode(target.programId, target.subjectCode);
    if (!subject) continue;
    links.push({
      programId: subject.programId,
      subjectCode: subject.code,
      subjectName: subject.name,
      semesterId: subject.semesterId,
      subjectSlug: subject.slug,
      moduleId: target.moduleId,
    });
  }
  return links;
}

// Resolve topic-level links (module anchors) merged with subject-level links.
export function syllabusLinksForTopic(
  learnSubjectSlug: string,
  learnTopicSlug: string
): LearnTopicSyllabusLink {
  const base = syllabusLinksForSubject(learnSubjectSlug);
  const topicTargets = TOPIC_LINKS[`${learnSubjectSlug}/${learnTopicSlug}`] ?? {};
  const links = base.map((link) => {
    const moduleTarget = topicTargets[link.programId];
    const moduleId = moduleTarget && moduleTarget.subjectCode === link.subjectCode ? moduleTarget.moduleId : undefined;
    return moduleId ? { ...link, moduleId } : link;
  });
  return { subjectSlug: learnSubjectSlug, topicSlug: learnTopicSlug, links };
}

// Canonical URL for a cross-link.
export function syllabusLinkHref(link: LearnSyllabusLink): string {
  return subjectUrl(link.programId, link.semesterId, link.subjectSlug, link.moduleId);
}

// True when written notes exist for that TKM subject (canonical registry).
export function syllabusLinkHasNotes(link: LearnSyllabusLink): boolean {
  return Boolean(getSubjectContent(link.subjectCode, link.programId));
}

export function syllabusLinkModuleTitle(link: LearnSyllabusLink): string | undefined {
  if (!link.moduleId) return undefined;
  const mods = syllabusModulesFor(link.programId, link.subjectCode);
  const mod = mods.find((m) => m.id === link.moduleId);
  return mod ? String(mod.title).replace(/^[^:]*:/, "").trim() : undefined;
}

export { SUBJECT_LINKS };
