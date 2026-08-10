// Question-type grouping for exam focus questions.
// Groups the existing examFocus questions by the kind of answer they demand,
// derived from the actual question text (leading verb). No invented content.

import { ExamFocusItem } from "@/lib/types";
import { WEIGHTAGE_SCORE } from "./nightBefore";

export interface QuestionTypeGroup {
  id: string;
  label: string;
  description: string;
  questions: ExamFocusItem[];
  high: number;
  count: number;
  score: number;
}

const RULES: { id: string; label: string; description: string; pattern: RegExp }[] = [
  {
    id: "explain",
    label: "Explain & Describe",
    description: "Narrative answers — why, how, what happens.",
    pattern: /^(explain|describe|discuss|elaborate|illustrate|justify|state why|what is meant)/i,
  },
  {
    id: "define",
    label: "Define & State",
    description: "Short, exact statements — the easy marks.",
    pattern: /^(define|state|list|enumerate|mention|name)/i,
  },
  {
    id: "derive",
    label: "Derive & Prove",
    description: "Step-by-step derivation or proof.",
    pattern: /^(derive|prove|show that|obtain the expression|establish)/i,
  },
  {
    id: "calculate",
    label: "Calculate & Evaluate",
    description: "Numerical problems with a final answer.",
    pattern: /^(calculate|compute|find|evaluate|determine|estimate|solve|assume)/i,
  },
  {
    id: "compare",
    label: "Compare & Contrast",
    description: "Two things side by side — differences and similarities.",
    pattern: /^(compare|contrast|differentiate|distinguish|difference between)/i,
  },
  {
    id: "design",
    label: "Design & Implement",
    description: "Build something — a circuit, algorithm, or system.",
    pattern: /^(design|implement|construct|develop|draw the circuit|realize)/i,
  },
  {
    id: "diagram",
    label: "Diagram & Sketch",
    description: "Draw and label — a diagram answers this.",
    pattern: /^(draw|sketch|label|plot)/i,
  },
  {
    id: "trace",
    label: "Trace & Apply",
    description: "Work through a process or apply a method.",
    pattern: /^(trace|analy[sz]e|write|convert|simplify|perform|apply|test|given)/i,
  },
];

export const QUESTION_TYPE_LABELS: { id: string; label: string }[] = RULES.map((r) => ({
  id: r.id,
  label: r.label,
}));

function groupIdFor(question: string): string {
  for (const rule of RULES) {
    if (rule.pattern.test(question.trim())) return rule.id;
  }
  return "general";
}

// Deterministic grouping in a fixed, sensible order. Questions keep their
// original order within each group so priority ordering is preserved.
export function groupQuestionsByType(examFocus: ExamFocusItem[]): QuestionTypeGroup[] {
  const map = new Map<string, QuestionTypeGroup>();
  const order: string[] = [];

  for (const q of examFocus) {
    const id = groupIdFor(q.question);
    let group = map.get(id);
    if (!group) {
      const rule = RULES.find((r) => r.id === id);
      group = {
        id,
        label: rule?.label ?? "General & Conceptual",
        description:
          rule?.description ?? "Broad conceptual or multi-part questions.",
        questions: [],
        high: 0,
        count: 0,
        score: 0,
      };
      map.set(id, group);
      order.push(id);
    }
    group.questions.push(q);
    group.count += 1;
    group.score += WEIGHTAGE_SCORE[q.weightage];
    if (q.weightage === "high") group.high += 1;
  }

  const groups = order.map((id) => map.get(id)!);
  // Highest-value groups first (most high-priority questions, then most marks).
  return groups.sort((a, b) => {
    const highDiff = b.high - a.high;
    if (highDiff !== 0) return highDiff;
    return b.score - a.score;
  });
}
