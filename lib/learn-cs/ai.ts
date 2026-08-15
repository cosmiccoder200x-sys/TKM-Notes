// Learn CS — "Learn with AI" prompt generation.
// Generates copy-ready prompts for any topic, honoring the student's level,
// goal and learning style. Deterministic, client-side, no API calls.

import { LearnTopic, LearnSubject } from "./types";
import { DIFFICULTY_META } from "./types";

export type AiLevel = "beginner" | "intermediate" | "advanced";
export type AiGoal =
  | "understand"
  | "exam"
  | "interview"
  | "problem-solving"
  | "project";
export type AiStyle =
  | "simple"
  | "socratic"
  | "question-discovery"
  | "visual"
  | "code-first"
  | "theory-first";

export const AI_LEVELS: { value: AiLevel; label: string; description: string }[] = [
  { value: "beginner", label: "Beginner", description: "Assume I know nothing about this" },
  { value: "intermediate", label: "Intermediate", description: "I know the basics, go deeper" },
  { value: "advanced", label: "Advanced", description: "I want depth, nuance and edge cases" },
];

export const AI_GOALS: { value: AiGoal; label: string; description: string }[] = [
  { value: "understand", label: "Understand the concept", description: "Build real intuition, not memorization" },
  { value: "exam", label: "Exam preparation", description: "Learn it the way it gets tested" },
  { value: "interview", label: "Interview preparation", description: "Learn it the way interviewers probe it" },
  { value: "problem-solving", label: "Problem solving", description: "Practice until I can solve problems cold" },
  { value: "project", label: "Project building", description: "Apply it by building something real" },
];

export const AI_STYLES: { value: AiStyle; label: string; description: string }[] = [
  { value: "simple", label: "Simple explanation", description: "Plain language, no jargon overload" },
  { value: "socratic", label: "Socratic dialogue", description: "Teach me by asking questions" },
  { value: "question-discovery", label: "Question → discovery", description: "Guide me to find the answer myself" },
  { value: "visual", label: "Visual intuition", description: "Analogies, diagrams in words, mental models" },
  { value: "code-first", label: "Code first", description: "Show me code, then explain it" },
  { value: "theory-first", label: "Theory first", description: "Definitions, formal reasoning, then examples" },
];

const STYLE_INSTRUCTIONS: Record<AiStyle, string> = {
  simple:
    "Explain in plain, simple language. Define every term the moment you use it. Avoid unnecessary jargon, and when you must use a term, give an everyday example immediately.",
  socratic:
    "Teach by asking me questions, one at a time. Wait for my answer after each question. Let my answers build the understanding. Correct me gently when I'm wrong and explain why.",
  "question-discovery":
    "Guide me to discover the concept myself. Start with a puzzle or scenario, let me attempt it, then reveal the insight step by step only as I need it.",
  visual:
    "Build visual intuition using analogies, mental models and word-pictures. For anything spatial, describe it like a diagram. Keep the picture in every explanation.",
  "code-first":
    "Start with a minimal, working code example. Explain line by line. Then abstract the pattern into the general idea, and finally show a second, slightly harder example.",
  "theory-first":
    "Start with the formal definition and the intuition behind why it is true. Prove or derive key claims. Then apply it to concrete examples.",
};

const GOAL_FOCUS: Record<AiGoal, string> = {
  understand:
    "Prioritize deep understanding over speed. Check my understanding with 2 short questions at the end.",
  exam:
    "Teach me the way it gets tested: emphasize the definitions and steps that examiners reward, and give me 3 typical exam-style questions with model answers at the end.",
  interview:
    "Teach me the way interviewers probe it: the core idea in 30 seconds, the trade-offs, the common pitfalls, and 2 questions an interviewer might ask.",
  "problem-solving":
    "Focus on making me able to solve problems. Give me 4 problems of increasing difficulty. Only reveal the solution after I attempt each one.",
  project:
    "Teach me enough to build with it. End with a concrete, small project specification I can complete to prove mastery.",
};

export interface LearnAiOptions {
  level: AiLevel;
  goal: AiGoal;
  style: AiStyle;
}

export function generateLearnAiPrompt(
  subject: LearnSubject,
  topic: LearnTopic,
  opts: LearnAiOptions
): string {
  const level = AI_LEVELS.find((l) => l.value === opts.level)!;
  const goal = AI_GOALS.find((g) => g.value === opts.goal)!;
  const style = AI_STYLES.find((s) => s.value === opts.style)!;

  const lines = [
    `You are my personal computer science tutor for the topic below.`,
    ``,
    `TOPIC: ${topic.title}`,
    `SUBJECT: ${subject.name} (Learn CS — beyond the college syllabus)`,
    `DIFFICULTY: ${DIFFICULTY_META[topic.difficulty].label} · ~${topic.estimatedMinutes} min lesson`,
    ``,
    `What I already know about it: ${topic.summary}`,
    ``,
    `MY LEVEL: ${level.label} — ${level.description}.`,
    `MY GOAL: ${goal.label} — ${goal.description}.`,
    `MY PREFERRED LEARNING STYLE: ${style.label}.`,
    ``,
    `STYLE RULES: ${STYLE_INSTRUCTIONS[opts.style]}`,
    `GOAL RULES: ${GOAL_FOCUS[opts.goal]}`,
    ``,
    `Structure your lesson as follows:`,
    `1. Open with a one-sentence hook that makes me want to learn this.`,
    `2. Teach the core idea in a way that sticks.`,
    `3. Give a concrete, realistic example.`,
    `4. Point out the 2–3 most common mistakes and how to avoid them.`,
    `5. End with a short activity tied to my goal.`,
    ``,
    `Do not ask clarifying questions — just teach. Keep it focused and free of fluff.`,
  ];

  return lines.join("\n");
}

export function generateLearnAiPracticePrompt(
  subject: LearnSubject,
  topic: LearnTopic,
  level: AiLevel
): string {
  const style = AI_STYLES.find((s) => s.value === "question-discovery")!;
  const levelMeta = AI_LEVELS.find((l) => l.value === level)!;
  return [
    `Act as my practice partner for "${topic.title}" in ${subject.name}.`,
    `MY LEVEL: ${levelMeta.label}.`,
    `Give me problems one at a time, starting slightly below my level.`,
    `After each attempt, give precise feedback: what was right, what was wrong, and one hint for the next attempt.`,
    `Do not show the solution until I have genuinely attempted the problem.`,
    `Progress me through 4 problems of increasing difficulty, then summarize the pattern I should remember.`,
    ``,
    `${STYLE_INSTRUCTIONS["question-discovery"]}`,
  ].join("\n");
}
