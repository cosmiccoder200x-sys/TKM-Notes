// Study Context - Deep integration with TKM Notes content

import { Subject, Module } from "@/lib/types";
import { subjects, semesters, findSubject, subjectsForSemester } from "@/lib/content";
import registry from "@/lib/notes";

export type ContentType = 
  | "module"
  | "topic"
  | "exam-question"
  | "self-check"
  | "worked-example"
  | "formula"
  | "diagram"
  | "definition"
  | "comparison";

export interface StudyContext {
  semester?: string;
  semesterLabel?: string;
  subjectCode?: string;
  subjectSlug?: string;
  subjectName?: string;
  moduleId?: string;
  moduleName?: string;
  topic?: string;
  question?: string;
  marks?: number | string;
  contentType?: ContentType;
  // Rich context from module content
  moduleContent?: {
    coreConcepts?: string[];
    definitions?: { term: string; definition: string }[];
    formulas?: { name: string; expression: string; note?: string }[];
    examFocus?: { question: string; weightage: string; note?: string }[];
    revisionNotes?: string[];
    workedExamples?: { title: string; problem: string; steps: { label: string; content: string }[]; answer: string }[];
    selfCheck?: { question: string; answer: string }[];
    diagrams?: { title: string; svgKey: string; caption: string }[];
    comparisons?: { title: string; scenario: string; a: { label: string; body: string }; b: { label: string; body: string }; takeaway: string }[];
  };
}

export interface ContextualPromptVars {
  subject: string;
  module: string;
  topic?: string;
  question?: string;
  marks?: string;
  [key: string]: string | undefined;
}

// Build context from URL params or current route
export function buildContextFromParams(params: {
  semester?: string;
  subject?: string;
  module?: string;
  topic?: string;
  question?: string;
  marks?: string;
  contentType?: ContentType;
}): StudyContext {
  const context: StudyContext = {};
  
  if (params.semester) {
    context.semester = params.semester;
    const sem = semesters.find(s => s.id === params.semester);
    context.semesterLabel = sem?.label;
  }
  
  if (params.subject) {
    const subject = findSubject(params.semester || "", params.subject);
    if (subject) {
      context.subjectCode = subject.code;
      context.subjectSlug = subject.slug;
      context.subjectName = subject.name;
    }
  }
  
  if (params.module && context.subjectCode) {
    const content = registry[context.subjectCode];
    if (content) {
      const mod = content.modules.find(m => m.id === params.module);
      if (mod) {
        context.moduleId = mod.id;
        context.moduleName = mod.title;
        // Attach full module content for rich prompts
        context.moduleContent = {
          coreConcepts: mod.coreConcepts,
          definitions: mod.definitions,
          formulas: mod.formulas,
          examFocus: mod.examFocus,
          revisionNotes: mod.revisionNotes,
          workedExamples: mod.workedExamples,
          selfCheck: mod.selfCheck,
          diagrams: mod.diagrams,
          comparisons: mod.comparisons,
        };
      }
    }
  }
  
  if (params.topic) context.topic = params.topic;
  if (params.question) context.question = params.question;
  if (params.marks) context.marks = parseInt(params.marks);
  if (params.contentType) context.contentType = params.contentType;
  
  return context;
}

// Build context from existing StudyContext object (for internal use)
export function enrichContext(context: StudyContext): StudyContext {
  // If we have subject/module but missing moduleContent, try to fetch it
  if (context.subjectCode && context.moduleId && !context.moduleContent) {
    const content = registry[context.subjectCode];
    if (content) {
      const mod = content.modules.find(m => m.id === context.moduleId);
      if (mod) {
        context.moduleName = mod.title;
        context.moduleContent = {
          coreConcepts: mod.coreConcepts,
          definitions: mod.definitions,
          formulas: mod.formulas,
          examFocus: mod.examFocus,
          revisionNotes: mod.revisionNotes,
          workedExamples: mod.workedExamples,
          selfCheck: mod.selfCheck,
          diagrams: mod.diagrams,
          comparisons: mod.comparisons,
        };
      }
    }
  }
  return context;
}

// Convert StudyContext to Prompt Builder variables
export function contextToPromptVars(context: StudyContext): ContextualPromptVars {
  const vars: ContextualPromptVars = {
    subject: context.subjectCode || "",
    module: context.moduleId || "",
  };
  
  if (context.topic) vars.topic = context.topic;
  if (context.question) vars.question = context.question;
  if (context.marks) vars.marks = context.marks.toString();
  
  return vars;
}

// Generate deep link URL for Prompt Lab
export function generatePromptLabUrl(
  context: StudyContext,
  mode?: string
): string {
  const params = new URLSearchParams();
  
  if (context.semester) params.set("semester", context.semester);
  if (context.subjectSlug) params.set("subject", context.subjectSlug);
  if (context.moduleId) params.set("module", context.moduleId);
  if (context.topic) params.set("topic", context.topic);
  if (context.question) params.set("question", context.question);
  if (context.marks) params.set("marks", context.marks.toString());
  if (context.contentType) params.set("contentType", context.contentType);
  if (mode) params.set("mode", mode);
  
  return `/prompt-lab?${params.toString()}`;
}

// Subject category for tailored instructions
export type SubjectCategory = "dsa" | "math" | "digital" | "circuit" | "theory" | "general";

export function getSubjectCategory(subjectCode: string): SubjectCategory {
  const dsa = ["24ERP304", "24ERP504", "24ERT507", "24ERP601", "24ERP701"];
  const math = ["24MAP301", "24ERT402", "24ERT501", "24ERT603"];
  const digital = ["24ERJ303", "24ERJ404", "24ERJ502"];
  const circuit = ["24EST332", "24ERP403", "24ERT305", "24ESP307", "24ERP602"];
  const theory = ["24HUT310", "24HUT435", "24HUT535", "24MCT406", "24MCT506"];
  
  if (dsa.includes(subjectCode)) return "dsa";
  if (math.includes(subjectCode)) return "math";
  if (digital.includes(subjectCode)) return "digital";
  if (circuit.includes(subjectCode)) return "circuit";
  if (theory.includes(subjectCode)) return "theory";
  return "general";
}

// Get subject-specific evaluation criteria
export function getSubjectEvaluationCriteria(category: SubjectCategory): string {
  switch (category) {
    case "dsa":
      return `
EVALUATE THE STUDENT'S ANSWER ON THESE DSA CRITERIA:
- Correctness of algorithm/logic
- Algorithm choice justification (why this approach?)
- Time complexity analysis (Big-O)
- Space complexity analysis
- Edge cases handled
- Optimization considerations (can it be faster/better?)
- Code/pseudocode clarity`;
    case "math":
      return `
EVALUATE THE STUDENT'S ANSWER ON THESE MATH CRITERIA:
- Correct formula selection with justification
- Step-by-step derivation with clear reasoning
- Mathematical correctness at each step
- Calculation accuracy
- Final answer with correct units
- Alternative method awareness`;
    case "digital":
      return `
EVALUATE THE STUDENT'S ANSWER ON THESE DIGITAL ELECTRONICS CRITERIA:
- Truth table completeness and correctness
- Boolean expression derivation
- K-map grouping validity (largest power-of-2 groups)
- Logic diagram accuracy (gates, connections)
- State diagram/timing diagram correctness
- Simplification steps shown clearly`;
    case "circuit":
      return `
EVALUATE THE STUDENT'S ANSWER ON THESE CIRCUIT THEORY CRITERIA:
- Circuit diagram with proper labels
- Governing equations (KVL/KCL/ODE) correctly stated
- Solution method appropriate (phasor, Laplace, time-domain)
- Thevenin/Norton/Superposition steps if applicable
- Transient vs steady-state distinction
- Resonance/frequency response analysis if relevant
- Units and sign conventions`;
    case "theory":
      return `
EVALUATE THE STUDENT'S ANSWER ON THESE THEORY CRITERIA:
- Precise definition of key terms
- Principle/framework explanation
- Key components identified
- Real-world application/example
- Advantages and disadvantages
- Exam keywords used correctly
- Distinctions clearly drawn (e.g. Group vs Team)`;
    default:
      return `
EVALUATE THE STUDENT'S ANSWER ON GENERAL CRITERIA:
- Completeness relative to marks allocated
- Accuracy of concepts
- Structure and presentation
- Key terminology usage
- Diagrams/formulas where appropriate`;
  }
}

// Get subject-specific problem solving guidance
export function getSubjectProblemGuidance(category: SubjectCategory): string {
  switch (category) {
    case "dsa":
      return `
FOR DSA PROBLEMS:
- Give ONE problem at a time
- Ask for APPROACH first (algorithm choice, not code)
- Progressive hints: 1) Which data structure? 2) Key insight 3) Edge case 4) Complexity
- Discuss: Time/Space complexity, Alternative approaches, Trade-offs`;
    case "math":
      return `
FOR MATH PROBLEMS:
- Give ONE problem at a time
- Ask for FORMULA SELECTION and APPROACH first
- Progressive hints: 1) Which principle/formula? 2) Setup 3) Calculation step 4) Units check
- Discuss: Why this formula? Assumptions? Alternative methods?`;
    case "digital":
      return `
FOR DIGITAL ELECTRONICS PROBLEMS:
- Give ONE problem at a time
- Ask for TRUTH TABLE / BOOLEAN EXPRESSION first
- Progressive hints: 1) K-map setup 2) Grouping strategy 3) Logic diagram 4) Verification
- Discuss: Gate count, Propagation delay, Alternative implementations`;
    case "circuit":
      return `
FOR CIRCUIT PROBLEMS:
- Give ONE problem at a time
- Ask for CIRCUIT ANALYSIS METHOD first (KVL/KCL/Phasor/Laplace/Thevenin)
- Progressive hints: 1) Method choice 2) Equation setup 3) Solve 4) Verify
- Discuss: Why this method? Time vs frequency domain?`;
    case "theory":
      return `
FOR THEORY PROBLEMS:
- Give ONE concept/question at a time
- Ask for DEFINITION AND KEY POINTS first
- Progressive hints: 1) Core concept 2) Example 3) Comparison 4) Application
- Discuss: Key distinctions, Exam keywords, Real-world relevance`;
    default:
      return `
FOR GENERAL PROBLEMS:
- Give ONE problem at a time
- Ask for APPROACH first
- Progressive hints
- Discuss reasoning`;
  }
}

// Get subject-specific answer structure guidance
export function getSubjectAnswerStructure(category: SubjectCategory, marks: number): string {
  const baseStructure = marks <= 2 
    ? "Definition (1) + Key point (1). ~40 words."
    : marks <= 5
    ? "Definition (1) + Principle (2) + Diagram/Formula/Example (2). ~100-150 words."
    : marks <= 8
    ? "Definition (1) + Principle (1) + Explanation (3) + Diagram/Derivation (2) + Keywords (1). ~200-250 words."
    : "Definition (1) + Principle (1) + Comprehensive explanation (4) + Diagram/Derivation (2) + Applications/Pros-Cons (2) + Keywords (1). ~300-400 words.";

  const categoryAdditions: Record<SubjectCategory, string> = {
    dsa: "\nDSA-SPECIFIC: Include algorithm name, pseudocode, time/space complexity, edge cases.",
    math: "\nMATH-SPECIFIC: Include given data, formula selection, step-by-step derivation, calculation, final answer with units.",
    digital: "\nDIGITAL-SPECIFIC: Include truth table, boolean expression, logic diagram, K-map simplification, timing diagram if sequential.",
    circuit: "\nCIRCUIT-SPECIFIC: Include circuit diagram, governing equations, solution method, phasor/Laplace domain, transient/steady-state.",
    theory: "\nTHEORY-SPECIFIC: Include definition, principle, diagram/model, working, applications, advantages/disadvantages, exam keywords.",
    general: "",
  };

  return baseStructure + (categoryAdditions[category] || "");
}

// Quick action types for module pages
export interface QuickAction {
  id: string;
  label: string;
  description: string;
  mode: string;
  icon: string;
  contextRequirements: {
    needsModule: boolean;
    needsQuestion?: boolean;
    needsMarks?: boolean;
  };
}

export const MODULE_QUICK_ACTIONS: QuickAction[] = [
  {
    id: "explain-module",
    label: "Explain this module",
    description: "Deep dive into all concepts",
    mode: "learn",
    icon: "📚",
    contextRequirements: { needsModule: true },
  },
  {
    id: "quiz-me",
    label: "Quiz me on this module",
    description: "Active recall practice",
    mode: "active-recall",
    icon: "🧠",
    contextRequirements: { needsModule: true },
  },
  {
    id: "important-questions",
    label: "Important questions",
    description: "PYQ analysis & high-priority topics",
    mode: "pyq-intelligence",
    icon: "🔍",
    contextRequirements: { needsModule: true },
  },
  {
    id: "exam-answers",
    label: "Generate exam answers",
    description: "Practice structured answers",
    mode: "exam-answer",
    icon: "📝",
    contextRequirements: { needsModule: true },
  },
  {
    id: "revision-plan",
    label: "Create revision plan",
    description: "Time-boxed review session",
    mode: "revision",
    icon: "⚡",
    contextRequirements: { needsModule: true },
  },
  {
    id: "mock-test",
    label: "Generate mock test",
    description: "Full exam simulation",
    mode: "mock-exam",
    icon: "📋",
    contextRequirements: { needsModule: true },
  },
  {
    id: "score-strategy",
    label: "Score 90+ strategy",
    description: "Marks-focused study plan",
    mode: "score-90-plus",
    icon: "🎯",
    contextRequirements: { needsModule: false },
  },
];

// Question-level actions
export const QUESTION_ACTIONS = [
  {
    id: "explain",
    label: "Explain",
    mode: "learn",
    icon: "📖",
    description: "Understand this concept deeply",
  },
  {
    id: "practice",
    label: "Practice",
    mode: "problem-solver",
    icon: "⚙️",
    description: "Solve without being spoon-fed",
  },
  {
    id: "exam-answer",
    label: "Exam Answer",
    mode: "exam-answer",
    icon: "📝",
    description: "Generate structured answer",
  },
  {
    id: "strict-examiner",
    label: "Evaluate",
    mode: "strict-examiner",
    icon: "👨‍🏫",
    description: "Get your answer graded",
  },
  {
    id: "active-recall",
    label: "Quiz Me",
    mode: "active-recall",
    icon: "🧠",
    description: "Test your memory",
  },
  {
    id: "mistake-fixer",
    label: "Fix Mistakes",
    mode: "mistake-fixer",
    icon: "🔧",
    description: "Learn from errors",
  },
];