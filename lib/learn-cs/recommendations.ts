// Learn CS — recommendation engine.
// Pure, deterministic. Recommends "what to study next" using: goal, topic
// prerequisites, quiz weak areas, TKM branch (for syllabus-overlap hints ONLY —
// never changes the curriculum), recent activity and unfinished subjects.

import { LearnSubject, LearnTopic, LearnProgress, LearnTopicDetailMap } from "./types";
import { getLearnSubject, subjectTopics, LEARN_SUBJECTS } from "./index";
import { RECOMMENDED_ROADMAP, LEARN_ROADMAP_LEVELS, roadmapLevelFor } from "./categories";
import { getTopicDetail } from "./progress";
import { syllabusLinksForSubject } from "./syllabus";

export interface LearnRecommendation {
  subjectSlug: string;
  subjectName: string;
  topicSlug: string;
  topicTitle: string;
  reason: string;
  priority: number; // higher = recommended first
}

export interface RecommendationInput {
  progress: Record<string, LearnProgress>;
  details: LearnTopicDetailMap;
  goal?: string[]; // ordered subject slugs from a goal roadmap
  branch?: "ER" | "CS" | "CS_AI"; // TKM branch for syllabus-overlap hints only
  now?: number;
}

const DONE_STATES = new Set(["practiced", "mastered"]);
const IN_PROGRESS_STATES = new Set(["learning", "understood"]);

function topicState(progress: Record<string, LearnProgress>, subjectSlug: string, topicSlug: string): string | undefined {
  return progress[subjectSlug]?.[topicSlug];
}

function findTopic(subject: LearnSubject, topicSlug: string): LearnTopic | undefined {
  for (const stage of subject.stages) {
    const t = stage.topics.find((x) => x.slug === topicSlug);
    if (t) return t;
  }
  return undefined;
}

// The first in-progress or not-started topic in a subject's linear order.
function nextTopicInSubject(
  subject: LearnSubject,
  progress: Record<string, LearnProgress>
): { topic: LearnTopic; reason: string } | null {
  const topics = subjectTopics(subject);
  for (const topic of topics) {
    const state = topicState(progress, subject.slug, topic.slug);
    if (IN_PROGRESS_STATES.has(state ?? "")) {
      return { topic, reason: "You were mid-way through this topic — continue from where you stopped." };
    }
  }
  for (const topic of topics) {
    const state = topicState(progress, subject.slug, topic.slug);
    if (!state || state === "not-started") {
      return { topic, reason: "This is the next new topic in the subject's learning path." };
    }
  }
  return null;
}

// Subjects that have at least one topic the student is due to revise.
function dueForRevision(
  progress: Record<string, LearnProgress>,
  now: number
): LearnRecommendation[] {
  const out: LearnRecommendation[] = [];
  for (const subject of LEARN_SUBJECTS) {
    if (!progress[subject.slug]) continue;
    for (const topic of subjectTopics(subject)) {
      const state = topicState(progress, subject.slug, topic.slug);
      if (!state || !DONE_STATES.has(state)) continue;
      const detail = getTopicDetail(subject.slug, topic.slug);
      const last = detail.lastRevisedAt ?? detail.learnedAt;
      if (!last) continue;
      const days = (now - last) / 86_400_000;
      const index = Math.min(Math.max(detail.revisionCount - 1, 0), 4);
      const interval = [1, 3, 7, 14, 30][index];
      if (days >= interval) {
        out.push({
          subjectSlug: subject.slug,
          subjectName: subject.name,
          topicSlug: topic.slug,
          topicTitle: topic.title,
          reason: `Spaced revision is due — it has been ${Math.floor(days)} days since your last review.`,
          priority: 90,
        });
      }
    }
  }
  return out.sort((a, b) => b.priority - a.priority);
}

// Topics flagged weak by recent quizzes.
function weakTopics(
  progress: Record<string, LearnProgress>
): LearnRecommendation[] {
  const out: LearnRecommendation[] = [];
  for (const subject of LEARN_SUBJECTS) {
    for (const topic of subjectTopics(subject)) {
      const detail = getTopicDetail(subject.slug, topic.slug);
      if (detail.quizAttempts > 0 && detail.quizWeak.length > 0) {
        out.push({
          subjectSlug: subject.slug,
          subjectName: subject.name,
          topicSlug: topic.slug,
          topicTitle: topic.title,
          reason: "A recent quiz flagged this topic as a weak area — retake it to close the gap.",
          priority: 80,
        });
      }
    }
  }
  return out.sort((a, b) => b.priority - a.priority).slice(0, 5);
}

// Topics whose prerequisites are all done but which the student hasn't started.
function readyNext(
  progress: Record<string, LearnProgress>,
  order: string[]
): LearnRecommendation[] {
  const out: LearnRecommendation[] = [];
  const rank = new Map<string, number>(order.map((slug, i) => [slug, i]));

  for (const subject of LEARN_SUBJECTS) {
    const started = progress[subject.slug] && Object.keys(progress[subject.slug]).length > 0;
    if (started) continue;
    const prereqs = subject.prerequisites ?? [];
    const prereqsDone = prereqs.every((slug) => {
      const p = getLearnSubject(slug);
      if (!p) return true;
      return subjectTopics(p).every((t) => DONE_STATES.has(topicState(progress, slug, t.slug) ?? ""));
    });
    if (!prereqsDone) continue;

    const next = nextTopicInSubject(subject, progress);
    if (!next) continue;
    const roadmapIdx = rank.get(subject.slug) ?? 999;
    out.push({
      subjectSlug: subject.slug,
      subjectName: subject.name,
      topicSlug: next.topic.slug,
      topicTitle: next.topic.title,
      reason: `All of its prerequisites are complete — you are ready to start this subject. ${next.reason}`,
      priority: Math.max(40, 70 - Math.min(roadmapIdx, 30)),
    });
  }

  return out.sort((a, b) => b.priority - a.priority);
}

// The single best "continue learning" target from existing progress.
export function continueLearningTarget(
  progress: Record<string, LearnProgress>
): { subjectSlug: string; topicSlug: string; subjectName: string } | null {
  for (const subject of LEARN_SUBJECTS) {
    if (!progress[subject.slug]) continue;
    for (const topic of subjectTopics(subject)) {
      const state = topicState(progress, subject.slug, topic.slug);
      if (IN_PROGRESS_STATES.has(state ?? "")) {
        return { subjectSlug: subject.slug, topicSlug: topic.slug, subjectName: subject.name };
      }
    }
  }
  return null;
}

export function recommendNext(input: RecommendationInput): LearnRecommendation[] {
  const now = input.now ?? Date.now();
  const goalOrder = input.goal ?? RECOMMENDED_ROADMAP;

  // 1. Due-for-revision topics (highest urgency).
  const due = dueForRevision(input.progress, now);

  // 2. Weak topics from quizzes.
  const weak = weakTopics(input.progress);

  // 3. Continue in-progress topics (roadmap/goal order preferred).
  const continuing: LearnRecommendation[] = [];
  const seen = new Set<string>();
  for (const slug of goalOrder) {
    const subject = getLearnSubject(slug);
    if (!subject || !input.progress[slug]) continue;
    const next = nextTopicInSubject(subject, input.progress);
    if (!next) continue;
    const key = `${slug}/${next.topic.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    continuing.push({
      subjectSlug: subject.slug,
      subjectName: subject.name,
      topicSlug: next.topic.slug,
      topicTitle: next.topic.title,
      reason: next.reason,
      priority: 75,
    });
  }
  for (const subject of LEARN_SUBJECTS) {
    if (seen.has(subject.slug)) continue;
    const next = nextTopicInSubject(subject, input.progress);
    if (!next) continue;
    const key = `${subject.slug}/${next.topic.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    continuing.push({
      subjectSlug: subject.slug,
      subjectName: subject.name,
      topicSlug: next.topic.slug,
      topicTitle: next.topic.title,
      reason: next.reason,
      priority: 60,
    });
  }

  // 4. Subjects made ready by completed prerequisites.
  const ready = readyNext(input.progress, goalOrder);

  // Merge, dedupe, stable order.
  const merged: LearnRecommendation[] = [...due, ...weak, ...continuing, ...ready];
  const unique = new Map<string, LearnRecommendation>();
  for (const rec of merged) {
    const key = `${rec.subjectSlug}/${rec.topicSlug}`;
    if (!unique.has(key)) unique.set(key, rec);
  }

  // Branch hint: bias (without reordering the curriculum) — if the user's TKM
  // branch actually teaches a subject, nudge its rank by +5.
  const branchOverlap = new Map<string, number>();
  if (input.branch) {
    for (const subject of LEARN_SUBJECTS) {
      const links = syllabusLinksForSubject(subject.slug);
      if (links.some((l) => l.programId === input.branch)) {
        branchOverlap.set(subject.slug, 5);
      }
    }
  }

  return [...unique.values()]
    .map((rec) => ({
      ...rec,
      priority: rec.priority + (branchOverlap.get(rec.subjectSlug) ?? 0),
    }))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 8);
}

// Overall roadmap status: how far through each level the student is.
export function roadmapProgress(
  progress: Record<string, LearnProgress>
): { level: number; title: string; description: string; subjects: string[]; done: number; total: number }[] {
  return LEARN_ROADMAP_LEVELS.map((level) => {
    const subjects = level.subjects.filter((slug) => getLearnSubject(slug));
    let total = 0;
    let done = 0;
    for (const slug of subjects) {
      const subject = getLearnSubject(slug);
      if (!subject) continue;
      for (const topic of subjectTopics(subject)) {
        total += 1;
        const state = topicState(progress, slug, topic.slug);
        if (state && DONE_STATES.has(state)) done += 1;
      }
    }
    return {
      level: level.level,
      title: level.title,
      description: level.description,
      subjects: level.subjects,
      done,
      total,
    };
  });
}

export { roadmapLevelFor };