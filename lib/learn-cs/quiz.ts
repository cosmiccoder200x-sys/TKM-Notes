// Learn CS — deterministic quiz generation.
// Builds a 5-question quiz per topic from its own authored content only: the
// summary, keyIdea, example, commonMistakes and quickRevision lines. No invented
// facts. A seeded hash keeps the same topic producing the same quiz every time.

import { LearnTopic } from "./types";

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[]; // 4 options, one correct
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  topicSlug: string;
  questions: QuizQuestion[];
}

// Simple deterministic string hash (FNV-1a-ish) so quizzes are stable.
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Deterministic PRNG (mulberry32) from a seed.
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Pick `n` distractor strings that differ from the correct answer.
function pickDistractors(correct: string, pool: string[], n: number, rnd: () => number): string[] {
  const unique = pool.filter((p) => p !== correct && p.trim().length > 0);
  return shuffle(unique, rnd).slice(0, n);
}

export function generateQuiz(subjectSlug: string, topic: LearnTopic): Quiz {
  const rnd = mulberry32(hashSeed(`${subjectSlug}/${topic.slug}`));
  const questions: QuizQuestion[] = [];

  const revisions = topic.quickRevision ?? [];
  const mistakes = topic.commonMistakes ?? [];
  const allPool = [...revisions, ...mistakes];

  // Q1 — summary cloze: pick the shortest summary phrase to fill a blank.
  if (topic.summary) {
    const words = topic.summary.trim().split(/\s+/);
    const targetIdx = Math.max(0, words.length - Math.floor(rnd() * 4) - 3);
    const target = words[targetIdx] ?? "";
    const before = words.slice(0, targetIdx).join(" ");
    const after = words.slice(targetIdx + 1).join(" ");
    const distractorPool = topic.summary
      .split(/\s+/)
      .filter((w) => w !== target && w.length > 3);
    questions.push({
      id: "summary",
      prompt: `Complete the sentence: "${before} _____ ${after}".`,
      options: shuffle([target, ...pickDistractors(target, distractorPool, 3, rnd)], rnd),
      correctIndex: 0,
      explanation: `The topic summary reads: "${topic.summary}".`,
    });
  }

  // Q2 — key idea: true statement vs reshuffled versions.
  if (topic.keyIdea) {
    const key = topic.keyIdea;
    const words = key.split(/\s+/);
    const shuffledWords = shuffle(words, rnd);
    const wrong = shuffledWords.slice(0, words.length).join(" ");
    questions.push({
      id: "key-idea",
      prompt: "Which statement best captures the key idea?",
      options: shuffle([key, wrong, ...pickDistractors(key, revisions, 2, rnd)], rnd),
      correctIndex: 0,
      explanation: `Key idea: "${key}".`,
    });
  }

  // Q3 — which quick-revision point is correct.
  if (revisions.length >= 2) {
    const correct = revisions[0];
    questions.push({
      id: "revision",
      prompt: "Which of these is a correct revision point for this topic?",
      options: shuffle([correct, ...pickDistractors(correct, revisions, 3, rnd)], rnd),
      correctIndex: 0,
      explanation: `All true quick-revision points: ${revisions.join(" · ")}.`,
    });
  }

  // Q4 — common mistake: which one is a real pitfall to avoid.
  if (mistakes.length >= 1) {
    const correct = mistakes[0];
    const distractorPool = [...revisions, ...mistakes].filter((m) => m !== correct);
    questions.push({
      id: "mistake",
      prompt: "Which of these is a common mistake you should avoid?",
      options: shuffle([correct, ...pickDistractors(correct, distractorPool, 3, rnd)], rnd),
      correctIndex: 0,
      explanation: `Common mistakes: ${mistakes.join(" · ")}.`,
    });
  }

  // Q5 — practice intent: which practice action fits the topic.
  if (topic.practice && topic.practice.length >= 1) {
    const correct = topic.practice[0];
    const distractorPool = (topic.practice ?? []).concat(revisions);
    questions.push({
      id: "practice",
      prompt: "Which practice activity best exercises this topic?",
      options: shuffle([correct, ...pickDistractors(correct, distractorPool, 3, rnd)], rnd),
      correctIndex: 0,
      explanation: `Suggested practice: ${topic.practice.join(" · ")}.`,
    });
  }

  // Fill any missing questions from the pool until we reach 5.
  if (questions.length < 5) {
    const extraPool = allPool.filter((p) => p.length > 8);
    let guard = 0;
    while (questions.length < 5 && extraPool.length > 0 && guard < 20) {
      guard += 1;
      const candidate = extraPool.shift()!;
      if (questions.some((q) => q.options.includes(candidate))) continue;
      questions.push({
        id: `extra-${questions.length}`,
        prompt: "Which of these statements belongs with this topic?",
        options: shuffle([candidate, ...pickDistractors(candidate, allPool, 3, rnd)], rnd),
        correctIndex: 0,
        explanation: `"${candidate}" is part of this topic's revision notes.`,
      });
    }
  }

  // Deterministic question order (stable, not shuffled).
  return { topicSlug: topic.slug, questions: questions.slice(0, 5) };
}

// Compute weak topics from the questions answered incorrectly (for persistence).
export function weakTopicsFor(quiz: Quiz, answers: number[]): string[] {
  return quiz.questions
    .filter((q, i) => answers[i] !== q.correctIndex)
    .map((q) => q.id);
}