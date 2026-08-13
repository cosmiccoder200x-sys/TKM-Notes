// Core content model for TKM Notes S3-S8 Interactive Notes.
// Every subject is broken into Modules. Every Module carries the
// 7 fixed exam-prep sections (A-G from the spec). Nothing else.

export type Weightage = "low" | "medium" | "high";

export interface Semester {
  id: string;       // "s3" ... "s8"
  label: string;     // "Semester 3"
}

export interface Subject {
  code: string;      // "24ERP304"
  slug: string;       // "data-structures-and-algorithms"
  name: string;
  credits: number | "MOOC";
  semesterId: string;
}

export interface Definition {
  term: string;
  definition: string; // exam-ready wording, 1-3 sentences
}

export interface FormulaItem {
  name: string;
  expression: string; // plain text / LaTeX-ish, rendered in mono font
  note?: string;       // when to use it / what each symbol means
}

export interface DiagramSpec {
  title: string;
  // Diagrams are rendered as inline SVG components (see components/Diagrams.tsx)
  // svgKey maps to a named diagram renderer so no image hosting is required.
  svgKey: string;
  caption: string;
  // If true, svgKey is looked up in the interactive diagram registry instead —
  // these let you drag a slider and watch the diagram actually reshape live.
  interactive?: boolean;
}

export interface ExamFocusItem {
  question: string;
  weightage: Weightage;
  note?: string; // hint on how to structure the answer
}

// A single syllabus topic, faithful to the official TKM syllabus text.
export interface Topic {
  title: string;   // exact syllabus topic wording
  details?: string; // optional extra context from the syllabus (e.g. sub-notes)
}

// Discipline grouping for a subject (matches lib/branch.ts SubjectCategoryId).
export type SubjectCategory = "computer" | "electronics" | "math" | "core";

export interface Module {
  id: string;          // "m1"
  number: number;      // 1-5 (syllabus module number)
  title: string;
  topics: Topic[];     // exact syllabus topics for this module
  overview: {
    summary: string;     // what this chapter is about
    whyItMatters: string; // why it matters in exams
  };
  coreConcepts: string[];          // bullet points, exam-wording
  definitions: Definition[];
  diagrams: DiagramSpec[];
  formulas: FormulaItem[];
  examFocus: ExamFocusItem[];
  revisionNotes: string[];          // ultra-short one-page bullets

  // --- understanding-focused additions (all optional, added incrementally) ---
  intuition?: string;               // one "think of it like..." analogy for the module's hardest idea
  workedExamples?: WorkedExample[]; // step-revealed numerical/derivation walkthroughs
  comparisons?: ComparisonCard[];   // "why this and not that" side-by-side cards
  selfCheck?: SelfCheckItem[];      // tap-to-reveal check-your-understanding questions
  crossLinks?: CrossLink[];         // where this same idea shows up in another subject
}

export interface WorkedExampleStep {
  label: string;     // short title for this step, e.g. "Step 1: Identify the loop bounds"
  content: string;   // the actual work/explanation for this step
}

export interface WorkedExample {
  title: string;
  problem: string;
  steps: WorkedExampleStep[];
  answer: string;     // final answer, revealed after all steps
}

export interface ComparisonCard {
  title: string;             // e.g. "Mealy vs Moore"
  scenario: string;          // shared context both approaches address
  a: { label: string; body: string };
  b: { label: string; body: string };
  takeaway: string;          // the one-line difference to remember
}

export interface SelfCheckItem {
  question: string;
  answer: string;
}

export interface CrossLink {
  label: string;   // "Hall effect sensors — also covered in the VI Lab course"
  href: string;    // "/s3/system-simulation-and-virtual-instrumentation-lab#m4"
}

export interface SubjectContent {
  code: string;          // course code, e.g. "24EST332"
  name: string;          // full subject name
  semester: string;      // "s3".."s8"
  category: SubjectCategory; // discipline grouping
  credits: number | "MOOC";
  ltpj: string;          // L-T-P-J structure, e.g. "2-0-0-0"
  modules: Module[];
}
