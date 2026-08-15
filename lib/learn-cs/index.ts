// Learn CS — registry and helpers.
// Single source of truth for the entire Learn CS catalog.

import { LearnSubject, LearnTopic } from "./types";
import { programmingSubjects } from "./data/programming";
import { csFundamentalsSubjects } from "./data/cs-fundamentals";
import { mathSubjects } from "./data/math";
import { developmentSubjects } from "./data/development";
import { aiDataSubjects } from "./data/ai-data";
import { advancedSubjects } from "./data/advanced";

export const LEARN_SUBJECTS: LearnSubject[] = [
  ...programmingSubjects,
  ...csFundamentalsSubjects,
  ...mathSubjects,
  ...developmentSubjects,
  ...aiDataSubjects,
  ...advancedSubjects,
];

// slug -> subject
export const LEARN_SUBJECT_MAP: Record<string, LearnSubject> = Object.fromEntries(
  LEARN_SUBJECTS.map((s) => [s.slug, s])
);

export function getLearnSubject(slug: string): LearnSubject | undefined {
  return LEARN_SUBJECT_MAP[slug];
}

// Flatten all topics in a subject's stage order into one linear list.
export function subjectTopics(subject: LearnSubject): LearnTopic[] {
  const topics: LearnTopic[] = [];
  for (const stage of subject.stages) {
    for (const topic of stage.topics) topics.push(topic);
  }
  return topics;
}

export function findLearnTopic(subject: LearnSubject, topicSlug: string): LearnTopic | undefined {
  for (const stage of subject.stages) {
    const topic = stage.topics.find((t) => t.slug === topicSlug);
    if (topic) return topic;
  }
  return undefined;
}

// The next topic after a given one in linear subject order (for "continue →").
export function nextTopic(subject: LearnSubject, topicSlug: string): LearnTopic | undefined {
  const topics = subjectTopics(subject);
  const idx = topics.findIndex((t) => t.slug === topicSlug);
  if (idx === -1) return undefined;
  return topics[idx + 1];
}

// Stage that a topic belongs to.
export function stageForTopic(subject: LearnSubject, topicSlug: string): string | undefined {
  for (const stage of subject.stages) {
    if (stage.topics.some((t) => t.slug === topicSlug)) return stage.stage;
  }
  return undefined;
}

export function subjectsByCategory(category: string): LearnSubject[] {
  return LEARN_SUBJECTS.filter((s) => s.category === category);
}

export function totalTopics(subject: LearnSubject): number {
  return subject.stages.reduce((n, s) => n + s.topics.length, 0);
}

export function totalMinutes(subject: LearnSubject): number {
  return subjectTopics(subject).reduce((n, t) => n + t.estimatedMinutes, 0);
}
