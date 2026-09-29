import {
  getSubjectCategory,
  getSubjectEvaluationCriteria,
  getSubjectProblemGuidance,
  getSubjectAnswerStructure,
} from "@/lib/prompts/context";
import { buildTaskContext, renderContext } from "./context";
import { sharedStudyInstructions } from "./instructions";
import type { BuiltTaskPrompt, LearningTask, TaskPromptContext } from "./types";

function withContext(ctx: TaskPromptContext, body: string): { text: string; contextChars: number } {
  const built = buildTaskContext(ctx);
  return {
    text: `${renderContext(built)}\n\n${sharedStudyInstructions()}\n\n${body}`,
    contextChars: built.chars,
  };
}

function teachPrompt(ctx: TaskPromptContext): BuiltTaskPrompt {
  const category = getSubjectCategory(ctx.subjectCode);
  const focus = ctx.topic ? `the topic "${ctx.topic.title}"` : `the module "${ctx.moduleTitle}"`;
  const known = (ctx.topics ?? []).filter((t) => (t.mastery ?? 0) >= 4).map((t) => t.title);
  const { text, contextChars } = withContext(
    ctx,
    `YOUR TASK: Teach ${focus} from ZERO knowledge to independent problem solving. Assume I may know nothing.

${known.length > 0 ? `ALREADY MASTERED (do not reteach, only build on): ${known.join("; ")}.` : ""}

FOLLOW THIS CHAIN IN ORDER, ADAPTING DEPTH TO MY LEVEL:
1. PREREQUISITES — list exactly what I must already know; stop and bridge any gap before continuing.
2. INTUITION — one relatable analogy before any jargon.
3. CORE DEFINITION — precise, memorizable wording.
4. MECHANISM — how it works, step by step.
5. FORMAL THEORY — only the syllabus-required formalism.
6. FORMULAS — each with a when-to-use note.
7. DERIVATION — full steps for the one highest-yield derivation.
8. WORKED EXAMPLE — numbers shown at every step.
9. GUIDED PROBLEM — solve with me, asking for each next step.
10. INDEPENDENT PROBLEM — I solve alone; you only verify.
11. PYQ APPLICATION — connect to the PYQ context above (ACTUAL items only).
12. CHALLENGE — one harder variant.
13. ACTIVE RECALL — 3 "why / what-if" questions, one at a time.
14. MASTERY CHECK — verdict: what is solid vs what to revisit.

RULES: one question at a time during interactive steps; gradually withdraw hints; never invent PYQs; mark exam keywords in bold.`
  );
  return { task: "teach", text, contextChars };
}

function recallPrompt(ctx: TaskPromptContext): BuiltTaskPrompt {
  const { text, contextChars } = withContext(
    ctx,
    `YOUR TASK: Run an active-recall session on "${ctx.topic?.title ?? ctx.moduleTitle}". Do NOT teach or explain first.

RULES:
- Ask ONE question at a time; wait for my answer before continuing.
- Grade each answer: Correct / Partial / Incorrect, naming the missing points.
- Probe weak spots with follow-ups; re-ask missed concepts in new words.
- Prioritize topics marked "revision due" and my open mistakes above.
- After 10 questions or when I say "stop": report mastered vs needs-review vs next-session focus.

BEGIN NOW with Question 1 — fundamental, answerable in 2–3 sentences.`
  );
  return { task: "recall", text, contextChars };
}

function practicePrompt(ctx: TaskPromptContext): BuiltTaskPrompt {
  const category = getSubjectCategory(ctx.subjectCode);
  const guidance = getSubjectProblemGuidance(category);
  const { text, contextChars } = withContext(
    ctx,
    `YOUR TASK: Build my problem-solving ability on "${ctx.topic?.title ?? ctx.moduleTitle}". Never hand me solutions.

${guidance}

RULES:
- ONE problem at a time at a progressive difficulty (standard → exam-level → tricky).
- Ask for my APPROACH before my answer; critique reasoning, not just results.
- Hints only on request ("Hint 1/2/3"), each narrower than the last.
- Label every problem ACTUAL PYQ / PYQ-BASED VARIATION / NEW PRACTICE honestly.
- End (on "stop" or after 5): patterns covered, strong approaches, recurring weaknesses, what to practice next.

BEGIN NOW with Problem 1 — full statement with all given data, no solution.`
  );
  return { task: "practice", text, contextChars };
}

function examPrompt(ctx: TaskPromptContext): BuiltTaskPrompt {
  const category = getSubjectCategory(ctx.subjectCode);
  const structure = getSubjectAnswerStructure(category, 8);
  const { text, contextChars } = withContext(
    ctx,
    `YOUR TASK: Produce a complete exam-preparation pack for "${ctx.topic?.title ?? ctx.moduleTitle}", fitted to my time budget.

COVER, IN ORDER:
1. 30-SECOND CORE IDEA — the one paragraph that unlocks everything.
2. MUST-KNOW DEFINITIONS — exact exam wording.
3. MUST-KNOW FORMULAS — with conditions and assumptions for each.
4. STEP-BY-STEP CONCEPTS — the chain an examiner expects.
5. HIGH-YIELD DERIVATIONS — full working for the top predictable one.
6. STANDARD NUMERICAL BLUEPRINT — template: given → formula → substitute → compute → units.
7. PYQ INTELLIGENCE — patterns from the ACTUAL items above; mark frequency High/Med/Low; never invent history.
8. EXAMINER TRAPS — specific mistakes and their fixes.
9. ACTIVE RECALL — 5 rapid-fire checks.
10. EMERGENCY CHEAT SHEET — ultra-condensed bullets I can scan in 5 minutes.

ANSWER STRUCTURE REFERENCE: ${structure}
RULES: KTU terminology, bold keywords, diagram descriptions where visuals matter, zero fluff.`
  );
  return { task: "exam", text, contextChars };
}

function fixPrompt(ctx: TaskPromptContext): BuiltTaskPrompt {
  const category = getSubjectCategory(ctx.subjectCode);
  const criteria = getSubjectEvaluationCriteria(category);
  const { text, contextChars } = withContext(
    ctx,
    `YOUR TASK: Diagnose and permanently repair my mistake in "${ctx.topic?.title ?? ctx.moduleTitle}". I will paste my wrong attempt after this prompt.

${criteria}

ANALYSIS FRAMEWORK:
1. EXACT MISTAKE LOCATION — the step where reasoning diverged, classified: conceptual / formula / calculation / misread / missing assumption / wrong method.
2. ROOT CAUSE — the mental-model gap ("you assumed X, but Y because Z").
3. CORRECT REASONING PATH — decision points to check before proceeding.
4. THE ONE CONCEPT TO RE-LEARN — single item, with what to focus on.
5. SIMILAR PRACTICE QUESTION — same concept, new numbers; do not repeat what I already got right.
6. QUICK REPAIR CARD — Trigger / Mistake / Fix / Keyword, one line each.

Be encouraging but precise. No fluff.`
  );
  return { task: "fix", text, contextChars };
}

const BUILDERS: Record<LearningTask, (ctx: TaskPromptContext) => BuiltTaskPrompt> = {
  teach: teachPrompt,
  recall: recallPrompt,
  practice: practicePrompt,
  exam: examPrompt,
  fix: fixPrompt,
};

export function buildTaskPrompt(task: LearningTask, ctx: TaskPromptContext): BuiltTaskPrompt {
  return BUILDERS[task]({ ...ctx, learningTask: ctx.learningTask ?? task });
}
