// Typing Practice — Learning Mode content generators.
// Pulls sentences from the two existing learning sources (no duplication):
//   1. TKM Syllabus  → program → semester → subject → module (topic)
//   2. Learn CS      → subject → topic
// The resulting sentences are real study content, so "TYPE → LEARN → REMEMBER".

import { subjectsForSemester, findSubject } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { LEARN_SUBJECTS, getLearnSubject, subjectTopics } from "@/lib/learn-cs";
import { ProgramId } from "@/lib/types";
import { TypingDifficulty, TypingSentence, TopicSource } from "./types";

const PROGRAMS: { id: ProgramId; label: string }[] = [
  { id: "ER", label: "ER (Electronics)" },
  { id: "CS", label: "CS (Computer Science)" },
  { id: "CS_AI", label: "CS [AI]" },
];

export function listPrograms(): { id: string; label: string }[] {
  return PROGRAMS;
}

export function listSyllabusSemesters(program: string): string[] {
  return ["s3", "s4", "s5", "s6", "s7", "s8"].filter(
    (s) => subjectsForSemester(s, program as ProgramId).length > 0
  );
}

export function listSyllabusSubjects(program: string, semester: string): { slug: string; name: string; code: string }[] {
  return subjectsForSemester(semester, program as ProgramId).map((s) => ({
    slug: s.slug,
    name: s.name,
    code: s.code,
  }));
}

export function listSyllabusModules(program: string, semester: string, subjectSlug: string): { id: string; title: string }[] {
  const subject = findSubject(program as ProgramId, semester, subjectSlug);
  if (!subject) return [];
  const content = getSubjectContent(subject.code, subject.programId);
  if (!content) return [];
  return content.modules.map((m) => ({ id: m.id, title: m.title }));
}

function clean(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

export function sentencesForSyllabusModule(
  program: string,
  semester: string,
  subjectSlug: string,
  moduleId: string,
  difficulty: TypingDifficulty = "intermediate"
): TopicSource {
  const subject = findSubject(program as ProgramId, semester, subjectSlug);
  const content = subject ? getSubjectContent(subject.code, subject.programId) : undefined;
  const moduleEntry = content?.modules.find((m) => m.id === moduleId);

  if (!subject || !content || !moduleEntry) {
    return { label: subject?.name ?? "Subject", topic: "Topic", source: "syllabus", pool: [] };
  }

  const sentences: TypingSentence[] = [];
  const topic = clean(moduleEntry.title);

  if (moduleEntry.overview?.summary) {
    sentences.push({
      id: `${subject.code}-${moduleId}-ovw`,
      sentence: clean(moduleEntry.overview.summary),
      category: "csfundamentals",
      difficulty,
      subject: subject.name,
      topic,
      program,
      semester,
      source: "syllabus",
    });
  }
  for (let i = 0; i < moduleEntry.coreConcepts.length; i++) {
    const s = clean(moduleEntry.coreConcepts[i]);
    if (!s) continue;
    sentences.push({
      id: `${subject.code}-${moduleId}-cc${i}`,
      sentence: s,
      category: "csfundamentals",
      difficulty,
      subject: subject.name,
      topic,
      program,
      semester,
      source: "syllabus",
    });
  }
  for (let i = 0; i < moduleEntry.revisionNotes.length; i++) {
    const s = clean(moduleEntry.revisionNotes[i]);
    if (!s) continue;
    sentences.push({
      id: `${subject.code}-${moduleId}-rn${i}`,
      sentence: s,
      category: "csfundamentals",
      difficulty,
      subject: subject.name,
      topic,
      program,
      semester,
      source: "syllabus",
    });
  }
  for (let i = 0; i < moduleEntry.definitions.length; i++) {
    const d = moduleEntry.definitions[i];
    const s = clean(`${d.term}: ${d.definition}`);
    if (!s) continue;
    sentences.push({
      id: `${subject.code}-${moduleId}-df${i}`,
      sentence: s,
      category: "csfundamentals",
      difficulty,
      subject: subject.name,
      topic,
      program,
      semester,
      source: "syllabus",
    });
  }

  return {
    label: subject.name,
    topic,
    source: "syllabus",
    pool: sentences,
  };
}

// ── Learn CS ───────────────────────────────────────────────────────────────

export function listLearnSubjects(): { slug: string; name: string; description: string }[] {
  return LEARN_SUBJECTS.map((s) => ({ slug: s.slug, name: s.name, description: s.description }));
}

export function listLearnTopics(subjectSlug: string): { slug: string; title: string }[] {
  const subject = getLearnSubject(subjectSlug);
  if (!subject) return [];
  return subjectTopics(subject).map((t) => ({ slug: t.slug, title: t.title }));
}

export function sentencesForLearnTopic(
  subjectSlug: string,
  topicSlug: string,
  difficulty: TypingDifficulty = "intermediate"
): TopicSource {
  const subject = getLearnSubject(subjectSlug);
  const topic = subject
    ? subjectTopics(subject).find((t) => t.slug === topicSlug)
    : undefined;

  if (!subject || !topic) {
    return { label: subject?.name ?? "Subject", topic: "Topic", source: "learn-cs", pool: [] };
  }

  const pool: TypingSentence[] = [];
  const topicTitle = clean(topic.title);
  const category = "csfundamentals" as const;
  const fields: { key: string; value?: string }[] = [
    { key: "summary", value: topic.summary },
    { key: "idea", value: topic.keyIdea },
    { key: "why", value: topic.whyMatters },
    { key: "intuition", value: topic.intuition },
  ];
  for (const f of fields) {
    const s = clean(f.value ?? "");
    if (!s || s.length < 12) continue;
    pool.push({
      id: `lcs-${subjectSlug}-${topicSlug}-${f.key}`,
      sentence: s,
      category,
      difficulty,
      subject: subject.name,
      topic: topicTitle,
      source: "learn-cs",
    });
  }
  for (let i = 0; i < (topic.quickRevision ?? []).length; i++) {
    const s = clean(topic.quickRevision![i]);
    if (!s) continue;
    pool.push({
      id: `lcs-${subjectSlug}-${topicSlug}-qr${i}`,
      sentence: s,
      category,
      difficulty,
      subject: subject.name,
      topic: topicTitle,
      source: "learn-cs",
    });
  }

  return { label: subject.name, topic: topicTitle, source: "learn-cs", pool };
}
