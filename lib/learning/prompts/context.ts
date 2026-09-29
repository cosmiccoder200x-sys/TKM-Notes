import type { LearningTask, TaskPromptContext, TaskPyq } from "./types";

const CAPS = { syllabus: 1200, topics: 1200, mistakes: 800, pyqs: 1500, total: 6000 };

function clip(text: string, cap: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > cap ? `${t.slice(0, cap)}…` : t;
}

function syllabusBlock(ctx: TaskPromptContext): string {
  const titles = (ctx.syllabusTitles ?? []).filter(Boolean);
  if (titles.length === 0) return "";
  return `ACTIVE SYLLABUS (${ctx.subjectCode}):\n${titles.map((t, i) => `${i + 1}. ${t}`).join("\n")}`;
}

function topicsBlock(ctx: TaskPromptContext): string {
  const topics = (ctx.topics ?? []).filter(Boolean);
  if (topics.length === 0) return "";
  const lines = topics.map((t) => {
    const m = t.mastery === null ? "not started" : `mastery ${t.mastery}/6`;
    const extra = [t.revisionDue ? "revision due" : "", t.mistakes.length > 0 ? `${t.mistakes.length} open mistake(s)` : ""]
      .filter(Boolean)
      .join("; ");
    return `- ${t.title} (${m}${extra ? `; ${extra}` : ""})`;
  });
  return `TOPIC STATES:\n${lines.join("\n")}`;
}

function mistakesBlock(ctx: TaskPromptContext): string {
  const mistakes = (ctx.mistakes ?? []).filter(Boolean).slice(0, 5);
  if (mistakes.length === 0) return "";
  return `OPEN MISTAKES (must address, do not reteach unrelated material):\n${mistakes.map((m, i) => `${i + 1}. ${m}`).join("\n")}`;
}

function pyqBlock(ctx: TaskPromptContext): string {
  const pyqs = (ctx.pyqs ?? []).slice(0, 6);
  if (pyqs.length === 0) return "PYQ CONTEXT: No verified PYQs mapped to this topic. Do not invent historical questions.";
  const lines = pyqs.map((q: TaskPyq, i: number) => {
    const tag = q.kind === "actual" ? "ACTUAL PYQ" : q.kind === "variation" ? "PYQ-BASED VARIATION" : "NEW PRACTICE";
    return `${i + 1}. [${tag} · ${q.weightage}] ${q.question}`;
  });
  return `PYQ CONTEXT (never present VARIATION/NEW items as historical questions):\n${lines.join("\n")}`;
}

export interface BuiltContext {
  header: string;
  syllabus: string;
  topics: string;
  mistakes: string;
  pyqs: string;
  footer: string;
  chars: number;
}

const TASK_NAME: Record<LearningTask, string> = {
  teach: "TEACH",
  recall: "RECALL",
  practice: "PRACTICE",
  exam: "EXAM",
  fix: "FIX",
};

function courseHeader(ctx: TaskPromptContext): string {
  const course =
    ctx.subjectCode && ctx.subjectName
      ? `${ctx.subjectCode} ${ctx.subjectName}`
      : ctx.subjectCode || ctx.subjectName;
  const moduleLine = [ctx.moduleId, ctx.moduleTitle].filter(Boolean).join(" — ");
  return [
    ctx.college ? `College: ${ctx.college}` : "",
    ctx.university ? `University: ${ctx.university}` : "",
    ctx.branch ? `Program: ${ctx.branch}` : "",
    ctx.scheme ? `Scheme: ${ctx.scheme}` : "",
    ctx.semester ? `Semester: ${ctx.semester}` : "",
    course ? `Course: ${course}` : "",
    moduleLine ? `Module: ${moduleLine}` : "",
    ctx.topic?.title ? `Topic: ${ctx.topic.title}` : "",
    ctx.syllabusSource ? `Syllabus source: ${ctx.syllabusSource}` : "",
    ctx.learningTask ? `Learning task: ${TASK_NAME[ctx.learningTask]}` : "",
    ctx.timeMinutes != null ? `Available time: ${ctx.timeMinutes} minutes` : "",
    ctx.topicPriority ? `PRIORITY: ${ctx.topicPriority}` : "",
    ctx.studentLevel ? `STUDENT LEVEL: ${ctx.studentLevel}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildTaskContext(ctx: TaskPromptContext): BuiltContext {
  const header = courseHeader(ctx);

  const syllabus = clip(syllabusBlock(ctx), CAPS.syllabus);
  const topics = clip(topicsBlock(ctx), CAPS.topics);
  const mistakes = clip(mistakesBlock(ctx), CAPS.mistakes);
  const pyqs = clip(pyqBlock(ctx), CAPS.pyqs);
  const footer = "GROUNDING RULE: Teach only what the active syllabus contains. Mark anything beyond it as additional context.";
  const chars = header.length + syllabus.length + topics.length + mistakes.length + pyqs.length + footer.length;

  if (chars <= CAPS.total) return { header, syllabus, topics, mistakes, pyqs, footer, chars };

  const slimPyqs = clip(pyqBlock({ ...ctx, pyqs: (ctx.pyqs ?? []).slice(0, 3) }), 800);
  const slim: BuiltContext = { header, syllabus, topics, mistakes, pyqs: slimPyqs, footer, chars: 0 };
  slim.chars = header.length + syllabus.length + topics.length + mistakes.length + slim.pyqs.length + footer.length;
  return slim;
}

export function renderContext(b: BuiltContext): string {
  return [b.header, b.syllabus, b.topics, b.mistakes, b.pyqs, b.footer].filter(Boolean).join("\n\n");
}
