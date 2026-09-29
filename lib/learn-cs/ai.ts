// Learn CS — "Learn with AI" prompt generation.
// Generates high-yield, pedagogically rigorous prompts for any CS topic.
// Structured around the high-quality CS learning standard:
// MAP → PRIORITIZE → LEARN → APPLY → RECALL → CHECK → REPAIR → CONNECT → MASTER
// Deterministic, client-side, zero API latency.

import { LearnTopic, LearnSubject, LearnCategoryId } from "./types";
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
  { value: "beginner", label: "Beginner", description: "Build strong mental models & fundamentals without jargon overload" },
  { value: "intermediate", label: "Intermediate", description: "Maximum learning value per minute, core implementations & pattern mastery" },
  { value: "advanced", label: "Advanced", description: "Deep systems intuition, architectural trade-offs, edge cases & scalability" },
];

export const AI_GOALS: { value: AiGoal; label: string; description: string }[] = [
  { value: "understand", label: "Understand the concept", description: "Build real intuition, mental models, and explain in your own words" },
  { value: "exam", label: "Exam preparation", description: "Master university & competitive exam question patterns, scoring points & proofs" },
  { value: "interview", label: "Interview preparation", description: "Master 30s elevator pitch, trade-offs, edge cases & mock probing questions" },
  { value: "problem-solving", label: "Problem solving", description: "Master pattern recognition, complexity bounds & step-by-step execution" },
  { value: "project", label: "Project building", description: "Master real-world application, architecture boundaries & implementation milestones" },
];

export const AI_STYLES: { value: AiStyle; label: string; description: string }[] = [
  { value: "simple", label: "Simple explanation", description: "Plain language, no jargon overload, instant everyday analogies" },
  { value: "socratic", label: "Socratic dialogue", description: "Teach by asking targeted questions; wait for my response before proceeding" },
  { value: "question-discovery", label: "Question → discovery", description: "Pose an intuitive puzzle first, let me struggle briefly, then guide to the insight" },
  { value: "visual", label: "Visual intuition", description: "ASCII diagrams, spatial memory models, and state progression tables" },
  { value: "code-first", label: "Code first", description: "Clean, idiomatic implementation with line-by-line trace before abstracting" },
  { value: "theory-first", label: "Theory first", description: "Formal definition, mathematical invariants, proofs, then concrete applications" },
];

// ---------------------------------------------------------------------------
// Category-Specific Pedagogical Guidance
// ---------------------------------------------------------------------------

function getCategoryGuidance(category: LearnCategoryId): string {
  switch (category) {
    case "programming":
      return `DOMAIN FOCUS (PROGRAMMING & LANGUAGES):
- Always clarify the underlying execution model: Stack vs Heap allocation, pointer/reference semantics, and variable lifetimes.
- Highlight common memory bugs, off-by-one errors, type coercion pitfalls, and idiomatic conventions.
- Distinguish between syntax quirks and fundamental language design choices.`;

    case "cs-fundamentals":
      return `DOMAIN FOCUS (CS FUNDAMENTALS - DSA / OS / DBMS / NETWORKS / COA):
- DSA: Focus on invariants, tight asymptotic bounds (Best/Average/Worst Time & Space), and memory layout (cache locality vs pointer chasing).
- Systems (OS/DBMS/Networks/COA): Focus on state transitions, concurrency/race conditions, ACID guarantees, packet journeys, and hardware-software boundaries.`;

    case "math":
      return `DOMAIN FOCUS (MATHEMATICS FOR CS):
- Ground abstract equations in computational intuition and geometric interpretations before formal proofs.
- Explicitly map mathematical constructs to algorithms (e.g., Matrices → Graph Adjacency / Transformations; Modular Arithmetic → Hashing / Cryptography).`;

    case "development":
      return `DOMAIN FOCUS (SOFTWARE DEVELOPMENT & ARCHITECTURE):
- Focus on clean architecture, separation of concerns, API contracts, failure modes, and security practices.
- Emphasize maintainability, idempotency, testing strategies, and practical developer workflows.`;

    case "ai-data":
      return `DOMAIN FOCUS (AI & DATA SCIENCE):
- Demystify the balance between statistical foundations, loss landscapes, optimization dynamics, and generalization.
- Address data pipelines, overfitting/underfitting diagnostics, matrix dimensions, and inference bottlenecks.`;

    case "advanced":
      return `DOMAIN FOCUS (ADVANCED SYSTEMS & SPECIALIZATIONS):
- Emphasize distributed failure domains, CAP theorem trade-offs, consensus algorithms, compiler passes, and memory consistency models.
- Analyze adversarial inputs, tail latency, and system degradation under extreme scale.`;
  }
}

// ---------------------------------------------------------------------------
// Level-Specific Instructions (Cognitive Demand)
// ---------------------------------------------------------------------------

function getLevelInstructions(level: AiLevel): string {
  switch (level) {
    case "beginner":
      return `LEVEL: BEGINNER (Foundations & Mental Models)
- Goal: Build rock-solid mental models and remove intimidation.
- Assumptions: Assume no deep prior knowledge of this specific topic.
- Strategy: Use crystal-clear analogies, step-by-step state traces, and define every term immediately.
- Cognitive Demand: Predict simple outputs, explain the 'why' in plain words, and understand the core invariant.`;

    case "intermediate":
      return `LEVEL: INTERMEDIATE (Maximum Learning Value Per Minute)
- Goal: Complete, rigorous understanding and independent problem-solving ability in minimal time.
- Assumptions: Understands basic programming syntax and standard high-level CS terms.
- Strategy: Compress obvious points. Skip historical trivia. Focus on transferable patterns, clean implementations, edge cases, and precise Big-O analysis.
- Cognitive Demand: Recognize problem signatures, implement clean solutions cold, identify edge-case traps, and optimize bottlenecks.`;

    case "advanced":
      return `LEVEL: ADVANCED (Deep Reasoning, Systems Trade-offs & Edge Cases)
- Goal: Expert-level mastery, architectural nuance, and scalability.
- Assumptions: Highly proficient with fundamentals and standard implementations.
- Strategy: Focus on micro-optimizations (cache lines, memory barriers, kernel transitions), failure modes, concurrency hazards, and trade-off matrices.
- Cognitive Demand: Critique alternative designs, debug complex multi-step failures, and adapt algorithms to non-standard hardware/distributed constraints.`;
  }
}

// ---------------------------------------------------------------------------
// Goal-Specific Instructions
// ---------------------------------------------------------------------------

function getGoalInstructions(goal: AiGoal): string {
  switch (goal) {
    case "understand":
      return `GOAL: DEEP CONCEPTUAL UNDERSTANDING
1. Explain the single core problem this concept solves that simpler approaches could not.
2. Present the core invariant / mechanism.
3. Test my understanding with an interactive prediction check: give a scenario, pause, and ask me to predict what happens before revealing the answer.
4. Show how this connects to upstream prerequisites and downstream applications.`;

    case "exam":
      return `GOAL: EXAM MASTERY & HIGH-SCORING ANSWERS
1. Give the exact standard definition and key points examiners award marks for.
2. Provide a 2-mark concise summary, a 5-mark detailed breakdown, and a 10-mark full diagram/derivation structure.
3. Highlight the 3 most common exam mistakes that cause students to lose marks.
4. Conclude with 2 representative exam-style questions for me to attempt.`;

    case "interview":
      return `GOAL: TECHNICAL INTERVIEW READINESS
1. Give a 30-second executive summary (elevator pitch) of the concept.
2. Present the Pattern Recognition Signature ("When you see X in a problem, immediately consider this concept").
3. Provide the clean template implementation with all critical edge cases (null, empty, duplicates, overflow).
4. Outline the exact trade-offs against alternative approaches.
5. Provide 2 realistic probing questions an interviewer would ask to test depth.`;

    case "problem-solving":
      return `GOAL: PROBLEM-SOLVING MASTERY (Pattern → Algorithm → Complexity)
Teach using the 5-Step CS Problem Solving Framework:
1. RECOGNITION: Clues and problem constraints that trigger this approach.
2. SELECTION: Why this approach is chosen over alternatives.
3. EXECUTION: Step-by-step algorithmic recipe.
4. COMPLEXITY: Exact Time & Space complexity with mathematical justification.
5. ADAPTATION: How the solution adapts if constraints change (e.g., streaming input, restricted memory).
Follow with 2 progressive practice problems (Medium → Hard) where I must attempt the solution first.`;

    case "project":
      return `GOAL: REAL-WORLD APPLICATION & PROJECT IMPLEMENTATION
1. Explain how production systems (e.g. databases, browsers, operating systems, distributed apps) use this concept.
2. Provide clean architectural interface boundaries and data contracts.
3. Outline common production pitfalls (race conditions, memory leaks, serialization overhead).
4. Give a concrete, hands-on mini-project milestone specification to build and prove mastery.`;
  }
}

// ---------------------------------------------------------------------------
// Style-Specific Instructions
// ---------------------------------------------------------------------------

const STYLE_INSTRUCTIONS: Record<AiStyle, string> = {
  simple:
    "Explain in clear, precise, jargon-free language. When introducing technical terms, define them with an immediate everyday analogy.",
  socratic:
    "Adopt a Socratic method: guide me by asking one thoughtful question at a time. Wait for my reply before continuing. Never dump the entire answer at once.",
  "question-discovery":
    "Start with a concrete problem or puzzle that breaks naive approaches. Allow me to see why simpler tools fail before introducing this concept as the natural solution.",
  visual:
    "Provide clear ASCII diagrams, spatial memory layouts, and state progression tables (Before → Action → After) to build strong visual intuition.",
  "code-first":
    "Begin with a minimal, elegant, fully working code implementation. Annotate key lines. Walk through a step-by-step dry run before discussing general theory.",
  "theory-first":
    "Begin with the formal mathematical/system definition and invariant properties. Formulate the proof or theoretical justification, then demonstrate practical applications.",
};

// ---------------------------------------------------------------------------
// Universal Learning Guardrails & Error Repair Protocol
// ---------------------------------------------------------------------------

const UNIVERSAL_CS_GUARDRAILS = `UNIVERSAL CS LEARNING RULES:
- OBJECTIVE: Maximum CS Mastery Per Minute. Zero fluff, zero patronizing filler.
- ACTIVE RECALL: Always ask me to predict, trace, or reason before revealing solutions.
- CODE QUALITY: All code must be production-grade, clean, syntactically valid, and include edge cases.
- COMPLEXITY RIGOR: Never just state O(N); briefly explain *why* based on loops, call-stack depth, or memory operations.
- ERROR REPAIR PROTOCOL: If I make a mistake, classify it (Concept gap / Misconception / Forgotten rule / Wrong pattern / Edge-case blindspot / Complexity error / Careless mistake), diagnose the root cause, provide a counter-example, and test me with a similar problem to verify understanding.`;

// ---------------------------------------------------------------------------
// Main Prompt Builder
// ---------------------------------------------------------------------------

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
  const levelMeta = AI_LEVELS.find((l) => l.value === opts.level) || AI_LEVELS[0];
  const goalMeta = AI_GOALS.find((g) => g.value === opts.goal) || AI_GOALS[0];
  const styleMeta = AI_STYLES.find((s) => s.value === opts.style) || AI_STYLES[0];

  const categoryGuidance = getCategoryGuidance(subject.category);
  const levelGuidance = getLevelInstructions(opts.level);
  const goalGuidance = getGoalInstructions(opts.goal);
  const styleGuidance = STYLE_INSTRUCTIONS[opts.style];

  // Topic context synthesis
  const prereqText = topic.prerequisites && topic.prerequisites.length > 0
    ? `PREREQUISITES: ${topic.prerequisites.join(", ")}`
    : "PREREQUISITES: None specified — build from fundamentals.";

  const complexityText = topic.complexity ? `BASELINE COMPLEXITY: ${topic.complexity}` : "";
  const commonMistakesText = topic.commonMistakes && topic.commonMistakes.length > 0
    ? `KNOWN MISTAKES TO PREVENT:\n${topic.commonMistakes.map((m) => `  - ${m}`).join("\n")}`
    : "";

  const relatedText = topic.related && topic.related.length > 0
    ? `RELATED TOPICS TO CONNECT: ${topic.related.join(", ")}`
    : "";

  const activeQuestionText = topic.question ? `SEED QUESTION: "${topic.question}"` : "";

  return `I am studying Computer Science and want you to act as an elite Computer Science Professor and Technical Coach.

================================================================================
TOPIC DETAILS:
================================================================================
TOPIC: ${topic.title}
SUBJECT: ${subject.name} (${subject.category.toUpperCase()})
DIFFICULTY: ${DIFFICULTY_META[topic.difficulty].label} (~ ${topic.estimatedMinutes} min target)
SUMMARY: ${topic.summary}
${prereqText}
${complexityText}
${commonMistakesText}
${relatedText}
${activeQuestionText}

================================================================================
STUDENT CONFIGURATION:
================================================================================
- LEVEL: ${levelMeta.label} (${levelMeta.description})
- GOAL: ${goalMeta.label} (${goalMeta.description})
- LEARNING STYLE: ${styleMeta.label}

================================================================================
PEDAGOGICAL INSTRUCTIONS:
================================================================================
${levelGuidance}

---
${goalGuidance}

---
STYLE DIRECTIVE:
${styleGuidance}

---
${categoryGuidance}

================================================================================
LESSON EXECUTION STRUCTURE:
================================================================================
1. CORE INTUITION & HOOK: Why this topic exists and the concrete problem it solves.
2. MENTAL MODEL / MECHANISM: Visual or step-by-step breakdown of the invariant/state.
3. CONCRETE IMPLEMENTATION & DRY RUN: Clean code/worked example with state progression.
4. TRAPS & EDGE CASES: The most dangerous bugs and misconceptions.
5. ACTIVE RETRIEVAL & PRACTICE: Give me a targeted problem or prediction question and wait for my response.
6. CONCEPT GRAPH: Connect this topic to upstream and downstream CS concepts.

${UNIVERSAL_CS_GUARDRAILS}`;
}

export function generateLearnAiPracticePrompt(
  subject: LearnSubject,
  topic: LearnTopic,
  level: AiLevel = "intermediate"
): string {
  const levelMeta = AI_LEVELS.find((l) => l.value === level) || AI_LEVELS[1];
  const categoryGuidance = getCategoryGuidance(subject.category);

  return `Act as my technical practice and coding interview partner for:
TOPIC: "${topic.title}" in ${subject.name}
LEVEL: ${levelMeta.label} (${levelMeta.description})

PRACTICE PROTOCOL:
1. Present 3-4 progressive challenges one by one:
   - Challenge 1: Warmup & State Tracing / Prediction
   - Challenge 2: Standard Implementation with Edge Cases
   - Challenge 3: Optimization / Constraint Shift (Scale, Memory, Concurrency)
   - Challenge 4 (if applicable): Real-world application or debugging scenario
2. DO NOT reveal the full solution immediately. Give the prompt, specify input/output constraints, and ask for my approach.
3. When I respond:
   - Grade correctness, time complexity, space complexity, and edge case coverage.
   - If flawed, apply the Error Repair Protocol: explain the failure point, give a counter-example, and guide me to self-correct.
   - Only reveal the optimal solution after I have genuinely attempted the problem.

${categoryGuidance}

${UNIVERSAL_CS_GUARDRAILS}`;
}

export function generateLearnAiRevisionPrompt(
  subject: LearnSubject,
  topic: LearnTopic
): string {
  return `Act as an elite CS revision coach. Conduct a Rapid Spaced Revision session for:
TOPIC: "${topic.title}" in ${subject.name}

REVISION PROTOCOL (5 Minutes):
1. RAPID-FIRE RECALL: Ask me 3 fast retrieval questions covering:
   - The fundamental invariant / definition
   - Time & Space complexity bounds
   - The single biggest trap / edge case
2. DO NOT provide answers in your initial message. Let me answer first.
3. After I answer, grade each response rigorously, correct any slight misconceptions, and provide a 3-bullet "Cheat Sheet" summary for future quick recall.`;
}

export function generateLearnAiMasteryCheckPrompt(
  subject: LearnSubject,
  topic: LearnTopic
): string {
  return `Act as a Principal Engineer and CS Examiner conducting a Mastery Evaluation for:
TOPIC: "${topic.title}" in ${subject.name}

EVALUATION RUBRIC:
Test my mastery across 5 distinct dimensions:
1. RECALL: Core definition and invariants.
2. INTUITION: Explaining why this approach is chosen over simpler alternatives.
3. IMPLEMENTATION: Handling edge cases (null, empty, boundary values, overflow).
4. COMPLEXITY: Precise asymptotic bounds with bottleneck derivation.
5. TRANSFER: Solving an unfamiliar problem variant with altered constraints.

Conduct this assessment interactively. Start with the first 2 questions and wait for my response.`;
}
