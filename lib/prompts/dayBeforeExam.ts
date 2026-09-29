import { Subject, ProgramId } from "@/lib/types";
import { getSubjectContent } from "@/lib/notes";
import syllabusText from "@/lib/syllabusText";
import {
  SYLLABUS_VERIFICATION_INSTRUCTION,
  PYQ_HONESTY_INSTRUCTION,
} from "@/lib/learning/prompts/instructions";

// ---------------------------------------------------------------------------
// Time-bracket definitions
// ---------------------------------------------------------------------------

export type TimeBracket =
  | "less-than-1-hour"
  | "1-to-3-hours"
  | "3-to-6-hours"
  | "6-to-10-hours"
  | "10-plus-hours";

export interface TimeBracketOption {
  id: TimeBracket;
  label: string;
  shortLabel: string;
  description: string;
}

export const TIME_BRACKETS: TimeBracketOption[] = [
  {
    id: "less-than-1-hour",
    label: "Less than 1 hour",
    shortLabel: "< 1 hr",
    description: "Ultra-high-yield recall only",
  },
  {
    id: "1-to-3-hours",
    label: "1–3 hours",
    shortLabel: "1–3 hrs",
    description: "Essential concepts + top PYQs + traps",
  },
  {
    id: "3-to-6-hours",
    label: "3–6 hours",
    shortLabel: "3–6 hrs",
    description: "High-yield concepts + PYQs + weak areas",
  },
  {
    id: "6-to-10-hours",
    label: "6–10 hours",
    shortLabel: "6–10 hrs",
    description: "Full high-yield plan + practice + repair",
  },
  {
    id: "10-plus-hours",
    label: "10+ hours",
    shortLabel: "10+ hrs",
    description: "Deep high-yield learning + mock + revision",
  },
];

// ---------------------------------------------------------------------------
// Topic prioritization — the decision engine
// ---------------------------------------------------------------------------

export interface TopicPriority {
  moduleId: string;
  moduleTitle: string;
  priority: "A" | "B" | "C";
  reasons: string[];
  /** Higher = more important */
  score: number;
}

/**
 * Prioritize modules for a subject based on available notes and syllabus data.
 *
 * Scoring factors:
 *  - Exam focus item count & weightage
 *  - Formula density (more formulas = more to memorize = higher priority)
 *  - Definition density
 *  - Self-check presence
 *  - Worked example count
 */
export function prioritizeTopics(subjectCode: string, programId: ProgramId = "ER"): TopicPriority[] {
  const content = getSubjectContent(subjectCode, programId);
  if (!content || !content.modules || content.modules.length === 0) {
    return [
      { moduleId: "m1", moduleTitle: "Module 1", priority: "A", reasons: ["Foundation module"], score: 10 },
      { moduleId: "m2", moduleTitle: "Module 2", priority: "A", reasons: ["High exam relevance"], score: 9 },
      { moduleId: "m3", moduleTitle: "Module 3", priority: "B", reasons: ["Core module"], score: 7 },
      { moduleId: "m4", moduleTitle: "Module 4", priority: "B", reasons: ["Applied concepts"], score: 6 },
      { moduleId: "m5", moduleTitle: "Module 5", priority: "C", reasons: ["Standard exam coverage"], score: 4 },
    ];
  }

  const scored: TopicPriority[] = content.modules.map((m, idx) => {
    let score = 0;
    const reasons: string[] = [];

    // Exam focus items — high-weightage items add more
    const highExam = (m.examFocus || []).filter((e) => e.weightage === "high").length;
    const medExam = (m.examFocus || []).filter((e) => e.weightage === "medium").length;
    score += highExam * 10 + medExam * 5;
    if (highExam > 0) reasons.push(`${highExam} high-weightage exam question${highExam > 1 ? "s" : ""}`);

    // Formula density
    if (m.formulas && m.formulas.length > 0) {
      score += Math.min(m.formulas.length * 2, 12);
      if (m.formulas.length >= 4) reasons.push("Formula-heavy module");
    }

    // Definition density
    if (m.definitions && m.definitions.length >= 5) {
      score += 4;
      reasons.push("Many definitions to memorize");
    }

    // Worked examples
    if (m.workedExamples && m.workedExamples.length > 0) {
      score += m.workedExamples.length * 3;
      reasons.push("Has worked numerical examples");
    }

    // Core concepts density
    if (m.coreConcepts && m.coreConcepts.length >= 6) {
      score += 3;
    }

    // Prerequisite signal
    if (idx === 0) {
      score += 2;
      reasons.push("Foundation module");
    }

    if (reasons.length === 0) {
      reasons.push("Standard exam coverage");
    }

    return {
      moduleId: m.id,
      moduleTitle: m.title,
      priority: "B" as const,
      reasons,
      score,
    };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Assign priority buckets
  const total = scored.length;
  scored.forEach((t, i) => {
    if (i < Math.ceil(total * 0.4)) {
      t.priority = "A";
    } else if (i < Math.ceil(total * 0.75)) {
      t.priority = "B";
    } else {
      t.priority = "C";
    }
  });

  return scored;
}

// ---------------------------------------------------------------------------
// Time-based strategy text
// ---------------------------------------------------------------------------

function getStrategyForTime(bracket: TimeBracket): string {
  switch (bracket) {
    case "10-plus-hours":
      return `TIME AVAILABLE: 10+ hours

Strategy sequence:
1. HIGH-YIELD CONCEPTS — Teach only the minimum theory needed to solve exam questions for each Priority A topic
2. PYQ PATTERN ANALYSIS — Identify and solve the most important previous-year question patterns
3. ACTIVE RECALL — Force retrieval practice after each concept block
4. PROBLEM SOLVING — Work through representative exam-style problems
5. WEAK-AREA REPAIR — Diagnose and fix specific knowledge gaps
6. TIMED MINI-MOCK — A realistic timed practice with the most important patterns
7. FINAL RAPID REVISION — Compact revision sheet for last-minute scanning

Pace: Thorough but efficient. Cover all Priority A topics fully and Priority B topics at concept level.`;

    case "6-to-10-hours":
      return `TIME AVAILABLE: 6–10 hours

Strategy sequence:
1. HIGH-YIELD CONCEPTS — Core theory for Priority A topics only
2. PYQ PATTERNS — Most important PYQ patterns with solution approaches
3. ACTIVE RECALL — Quick retrieval tests after each topic
4. TARGETED PRACTICE — Solve 2–3 representative problems per Priority A topic
5. MISTAKE REPAIR — Fix any errors from practice immediately
6. FINAL REVISION — Compact revision sheet

Pace: Focused. Priority A topics get full treatment. Priority B topics get formula/definition review only. Skip Priority C.`;

    case "3-to-6-hours":
      return `TIME AVAILABLE: 3–6 hours

Strategy sequence:
1. HIGHEST-VALUE CONCEPTS — Only the most exam-relevant ideas from Priority A topics
2. IMPORTANT PYQs — Top PYQ patterns with recognition clues
3. RECALL CHECK — Quick self-test on definitions and formulas
4. WEAK AREAS — Address only the most dangerous gaps
5. RAPID REVISION — Ultra-compact revision checklist

Pace: Fast. Only Priority A. No deep explanations — focus on what is needed to answer exam questions.`;

    case "1-to-3-hours":
      return `TIME AVAILABLE: 1–3 hours

Strategy sequence:
1. ESSENTIAL CONCEPTS — One-paragraph summary of each Priority A topic
2. HIGHEST-VALUE PYQs — Top 5–8 question patterns with fastest solution approach
3. FORMULA & DEFINITION RECALL — Rapid-fire memorization of must-know items
4. MISTAKE TRAPS — Most common errors and how to avoid them
5. FINAL REVISION — Single-page cheat sheet

Pace: Rapid. No teaching — only recall, recognition, and trap avoidance.`;

    case "less-than-1-hour":
      return `TIME AVAILABLE: Less than 1 hour

Strategy (ULTRA-HIGH-YIELD ONLY):
1. FORMULAS — Every must-know formula, one line each
2. DEFINITIONS — Key definitions in exam-ready wording
3. COMMON TRAPS — Top 5 mistakes students make and how to avoid them
4. PYQ PATTERNS — Most repeated question types and one-line solution approach
5. EXAM EXECUTION STRATEGY — How to use exam time optimally

Pace: Maximum speed. No explanations. Pure recall material. Read → memorize → go.`;
  }
}

// ---------------------------------------------------------------------------
// Main prompt builder
// ---------------------------------------------------------------------------

export interface DayBeforeExamConfig {
  subject: Subject;
  programId?: ProgramId;
  timeBracket: TimeBracket;
  weakModules?: string[];
}

export function buildDayBeforeExamPrompt(config: DayBeforeExamConfig): string {
  const { subject, programId = "ER", timeBracket, weakModules } = config;
  const syllabus = (syllabusText as Record<string, string | undefined>)[subject.code];
  const priorities = prioritizeTopics(subject.code, programId);
  const strategy = getStrategyForTime(timeBracket);

  // --- Header ---
  const header = `I'm a TKM College of Engineering (KTU, ${subject.programId || programId}, 2024 scheme) student.
My exam for "${subject.name}" (${subject.code}, ${subject.semesterId.toUpperCase()}, ${subject.credits} credits) is TOMORROW.

I need you to act as an ELITE UNIVERSITY EXAM STRATEGIST, SUBJECT PROFESSOR, PYQ ANALYST, and LAST-DAY REVISION COACH.

CORE OBJECTIVE: MAXIMUM MARKS PER MINUTE
I do NOT need to become an expert overnight. I need to maximize my exam score with the limited time I have.`;

  // --- Syllabus block ---
  let syllabusBlock: string;
  if (syllabus) {
    syllabusBlock = `OFFICIAL SYLLABUS (use this directly — do NOT substitute with a generic version):

${syllabus}`;
  } else {
    syllabusBlock = `Use the standard KTU 2024-scheme syllabus for "${subject.name}" if you have reliable knowledge of it.
Flag any module you are unsure about rather than presenting a guess as fact.`;
  }

  // --- Priority map ---
  let priorityBlock = "";
  if (priorities.length > 0) {
    const lines = priorities.map((p) => {
      const tag = p.priority === "A" ? "🔴 HIGH" : p.priority === "B" ? "🟡 MEDIUM" : "⚪ LOW";
      return `  ${tag} — ${p.moduleTitle}\n    Why: ${p.reasons.join(" + ")}`;
    });
    priorityBlock = `TOPIC PRIORITY MAP (based on exam data analysis):

${lines.join("\n\n")}

Use this priority map to decide what to cover and in what order.
Priority A topics first. Priority B if time allows. Priority C only if everything else is done.`;
  }

  // --- Weak modules ---
  let weakBlock = "";
  if (weakModules && weakModules.length > 0) {
    weakBlock = `STUDENT-REPORTED WEAK AREAS:
${weakModules.map((m) => `  - ${m}`).join("\n")}

Factor these into your prioritization — a weak Priority B topic may need attention before a strong Priority A topic.`;
  }

  // --- Core instructions ---
  const coreInstructions = `LAST-DAY ATTACK PLAN

${strategy}

---

FOR EACH TOPIC YOU COVER, use this structure:

### CONCEPT
Explain the minimum theory required to solve exam questions. No textbook prose.

### PATTERN
Show how this concept normally appears in exams.

### FORMULA / RULE
Give the exact formula, condition, algorithm, definition, or procedure. Copy-friendly format.

### PYQ CONNECTION
Identify relevant previous-year question patterns. Follow the PYQ honesty rules below.

### TRAP
Show the most common mistake students make on this topic and how to recognize it.

### EXAM SHORTCUT
Give the fastest reliable way to recognize or solve this type of question.

### RECALL CHECK
After teaching a concept, ask me 2–3 quick retrieval questions. Do NOT reveal answers immediately — let me respond first.

---

MISTAKE CLASSIFICATION:
When I make a mistake, classify it as one of:
- Concept gap — missing knowledge
- Formula forgotten — knew the concept but forgot the formula
- Misread question — read the question wrong
- Wrong method — used incorrect approach
- Calculation error — arithmetic mistake
- Sign/unit error — wrong sign or units
- Careless mistake — knew the answer but wrote it wrong

Then immediately: Diagnose → Correct → Give one similar question → Record the trap.

---

FINAL OUTPUT (at the end of the session):

## MUST KNOW
The concepts I should absolutely know.

## MUST SOLVE
The highest-value question patterns to recognize.

## MUST RECALL
Definitions, formulas, algorithms, and conditions that must be retrievable without notes.

## MUST AVOID
My most dangerous mistakes and common traps.

## FINAL REVISION
A compact, scannable last-minute revision checklist.

## EXAM STRATEGY
A practical plan for using my exam time:
- FIRST PASS: Solve immediately recognizable questions
- SECOND PASS: Solve moderate questions requiring calculation/reasoning
- THIRD PASS: Attempt difficult/time-consuming questions
- Remind me to check units, signs, read exact questions, and review careless-error-prone answers

---

RULES:
- Do NOT teach everything equally. Spend 70% of effort on Priority A topics.
- Do NOT give long lectures or rewrite textbook theory.
- Do NOT re-explain concepts I already understand.
- Do NOT introduce new material in the final revision.
- Do NOT generate excessive practice questions — quality over quantity.
- EVERY activity must answer: "Will this increase my exam score before the exam?"
- If the answer is no, skip it.

${PYQ_HONESTY_INSTRUCTION}

${SYLLABUS_VERIFICATION_INSTRUCTION}`;

  // --- Assemble ---
  const parts = [
    header,
    syllabusBlock,
    priorityBlock,
    weakBlock,
    coreInstructions,
  ].filter(Boolean);

  return parts.join("\n\n---\n\n");
}
