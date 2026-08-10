// Prompt Templates for all 10 Study Modes

import { StudyPrompt, StudyPromptVariable, StudyModeId, StudyModeCategory } from "./types";
import { Subject, Module } from "@/lib/types";
import { 
  getSubjectCategory as getSubjectCategoryFn, 
  getSubjectEvaluationCriteria,
  getSubjectProblemGuidance,
  getSubjectAnswerStructure,
  SubjectCategory 
} from "./context";

function getSubjectName(subjectCode: string): string {
  if (!subjectCode) return "your subject";
  const subjectMap: Record<string, string> = {
    "24ERP304": "Data Structures and Algorithms",
    "24EST332": "Network Theory",
    "24ERJ303": "Digital Electronics and Logic Design",
    "24MAP301": "Advanced Linear Algebra, Complex Analysis & PDE",
    "24ERT305": "Sensor & Sensor Circuits",
    "24HUT310": "Life Skills and Professional Ethics",
    "24ESP307": "System Simulation & Virtual Instrumentation Lab",
    "24ERT401": "Computer Organization and Architecture",
    "24ERT402": "Signals & Systems",
    "24ERP403": "Electrical Technology",
    "24ERJ404": "Solid State Electronic Devices and Circuits",
    "24HUT435": "Engineering Economics",
    "24MCT406": "Environmental Sciences",
    "24ERP407": "Object Oriented Programming Using Java",
    "24ERT501": "Control Systems",
    "24ERJ502": "Database Management Systems",
    "24ERT503": "Artificial Intelligence: Theory and Applications",
    "24ERP504": "Operating Systems",
    "24HUT535": "Project Management and Finance",
    "24MCT506": "Constitution of India",
    "24ERT507": "Software Engineering",
    "24ERP601": "Computer Networks",
    "24ERP602": "Embedded System Design and IoT",
    "24ERT603": "Power Electronics & Drives",
    "24ERP701": "Computer Vision",
    "24ERP702": "Energy Systems",
  };
  return subjectMap[subjectCode] || subjectCode;
}

// Opening line that stays coherent even when no subject is provided.
function subjectLine(vars: Record<string, string>): string {
  return vars.subject
    ? `I'm a TKM College of Engineering (KTU, ECE, 2024 scheme) student studying "${getSubjectName(vars.subject)}" (${vars.subject}).`
    : `I'm a TKM College of Engineering (KTU, ECE, 2024 scheme) student.`;
}

export function getSubjectCategory(subjectCode: string): SubjectCategory {
  return getSubjectCategoryFn(subjectCode);
}

function getSubjectSpecificInstructions(category: SubjectCategory): string {
  switch (category) {
    case "dsa":
      return `
SUBJECT-SPECIFIC FOCUS (DSA / Programming):
- For each concept: Algorithm name, Intuition/Approach, Pseudocode, Time & Space Complexity (Big-O), Edge cases, Optimizations
- For numerical/derivation topics: Step-by-step trace with sample input
- Include common patterns: Two pointers, Sliding window, BFS/DFS, DP, Greedy, Backtracking
- Highlight LeetCode/GFG-style variants frequently asked in placements AND university exams`;
    case "math":
      return `
SUBJECT-SPECIFIC FOCUS (Mathematics / Signals / Control):
- For each concept: Given data → Formula selection → Step-by-step derivation → Calculation → Final answer with units
- Include: Common mistakes, Alternative methods, When to use which formula
- For theorem-based topics: Statement, Conditions, Proof sketch, Application example
- Highlight: Standard results worth memorizing vs. derivable on the spot`;
    case "digital":
      return `
SUBJECT-SPECIFIC FOCUS (Digital Electronics):
- For each concept: Truth table, Boolean expression, Logic diagram (gate-level), Simplification steps (K-map/Quine-McCluskey), Timing diagram where relevant
- Include: State diagrams for sequential circuits, Excitation tables for flip-flops
- Highlight: Gate delays, Propagation delay calculations, Setup/Hold time considerations`;
    case "circuit":
      return `
SUBJECT-SPECIFIC FOCUS (Circuit Theory / Network Theory / Sensors / Power):
- For each concept: Circuit diagram, Governing equations (KVL/KCL/ODE), Solution method, Phasor/Laplace domain where applicable
- Include: Thevenin/Norton/Superposition steps, Transient vs Steady-state, Resonance conditions
- For sensor topics: Principle, Transfer function, Signal conditioning chain, Error sources
- Highlight: Standard results (τ, Q-factor, Bandwidth) worth memorizing`;
    case "theory":
      return `
SUBJECT-SPECIFIC FOCUS (Theory / Humanities / Management):
- For each concept: Definition, Principle/Framework, Key components, Real-world application, Advantages/Disadvantages, Exam keywords
- Include: Diagrams/Models (Maslow, SWOT, PDCA, etc.) where applicable
- Highlight: Distinctions (Group vs Team, Leader vs Manager), Process steps in order`;
    default:
      return `
SUBJECT-SPECIFIC FOCUS:
- Adapt the response structure to match the subject's exam patterns
- Prioritize: Definitions, Diagrams, Formulas, Worked examples, High-frequency questions`;
  }
}

// Format module content for inclusion in prompts
function formatModuleContent(moduleContent: any): string {
  if (!moduleContent) return "";
  
  const sections: string[] = [];
  
  if (moduleContent.coreConcepts?.length) {
    sections.push(`CORE CONCEPTS:\n${moduleContent.coreConcepts.map((c: string, i: number) => `${i + 1}. ${c}`).join("\n")}`);
  }
  
  if (moduleContent.definitions?.length) {
    sections.push(`KEY DEFINITIONS:\n${moduleContent.definitions.map((d: any, i: number) => `${i + 1}. ${d.term}: ${d.definition}`).join("\n")}`);
  }
  
  if (moduleContent.formulas?.length) {
    sections.push(`FORMULAS:\n${moduleContent.formulas.map((f: any, i: number) => `${i + 1}. ${f.name}: ${f.expression}${f.note ? ` — ${f.note}` : ""}`).join("\n")}`);
  }
  
  if (moduleContent.examFocus?.length) {
    sections.push(`EXAM FOCUS QUESTIONS:\n${moduleContent.examFocus.map((q: any, i: number) => `${i + 1}. [${q.weightage}] ${q.question}${q.note ? ` — ${q.note}` : ""}`).join("\n")}`);
  }
  
  if (moduleContent.revisionNotes?.length) {
    sections.push(`REVISION NOTES:\n${moduleContent.revisionNotes.map((r: string, i: number) => `${i + 1}. ${r}`).join("\n")}`);
  }
  
  if (moduleContent.workedExamples?.length) {
    sections.push(`WORKED EXAMPLES:\n${moduleContent.workedExamples.map((ex: any, i: number) => 
      `${i + 1}. ${ex.title}\n   Problem: ${ex.problem}\n   Steps: ${ex.steps.map((s: any) => s.label).join(" → ")}\n   Answer: ${ex.answer}`
    ).join("\n\n")}`);
  }
  
  if (moduleContent.selfCheck?.length) {
    sections.push(`SELF-CHECK QUESTIONS:\n${moduleContent.selfCheck.map((sc: any, i: number) => `${i + 1}. Q: ${sc.question}\n   A: ${sc.answer}`).join("\n\n")}`);
  }
  
  if (moduleContent.diagrams?.length) {
    sections.push(`DIAGRAMS:\n${moduleContent.diagrams.map((d: any, i: number) => `${i + 1}. ${d.title}: ${d.caption}`).join("\n")}`);
  }
  
  if (moduleContent.comparisons?.length) {
    sections.push(`COMPARISONS:\n${moduleContent.comparisons.map((c: any, i: number) => 
      `${i + 1}. ${c.title} (${c.scenario})\n   ${c.a.label}: ${c.a.body}\n   ${c.b.label}: ${c.b.body}\n   Key: ${c.takeaway}`
    ).join("\n\n")}`);
  }
  
  return sections.length > 0 
    ? `\n\n--- MODULE CONTENT (from PrepPilot) ---\n${sections.join("\n\n")}\n--- END MODULE CONTENT ---\n`
    : "";
}

function getMarksStructureInstructions(marks: string): string {
  const m = parseInt(marks) || 8;
  if (m <= 2) return "Structure as: Definition (1) + Key point (1). Keep under 40 words.";
  if (m <= 5) return "Structure as: Definition (1) + Principle/Explanation (2) + Diagram/Formula/Example (2). ~100-150 words.";
  if (m <= 8) return "Structure as: Definition (1) + Principle (1) + Detailed explanation (3) + Diagram/Derivation (2) + Applications/Keywords (1). ~200-250 words.";
  return "Structure as: Definition (1) + Principle (1) + Comprehensive explanation (4) + Diagram/Derivation (2) + Applications/Advantages/Disadvantages (2) + Keywords (1). ~300-400 words.";
}

// ============================================
// 1. LEARN MODE
// ============================================

export const learnPrompt: StudyPrompt = {
  id: "learn",
  mode: "learn",
  title: "Learn",
  description: "Understand concepts deeply from fundamentals",
  icon: "📚",
  category: "learn",
  bestFor: "Understanding a difficult concept from fundamentals to exam-ready depth.",
  whenToUse: "When you need a clear explanation, intuition and worked examples of a topic.",
  importance: "essential",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "module", label: "Module (optional)", type: "select", required: false, placeholder: "Select module", options: [] },
    { key: "topic", label: "Specific Topic (optional)", type: "text", required: false, placeholder: "e.g., Dijkstra's algorithm, K-map simplification" },
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    return `${subjectLine(vars)}

MODULE CONTEXT: ${vars.module || "your selected module"}${vars.topic ? `\nFOCUS TOPIC: ${vars.topic}` : ""}${moduleContent}

${subjectSpecific}

YOUR TASK: Act as an expert professor who teaches this subject to engineering students. Explain the ${vars.topic ? `topic "${vars.topic}"` : vars.module ? `module "${vars.module}"` : "topic I specify below"} from the ground up, optimized for KTU exam preparation.

${moduleContent ? "IMPORTANT: Use the provided PrepPilot module content above as your PRIMARY source. Do not introduce advanced or unrelated material unless clearly labeled as additional context." : ""}

STRUCTURE YOUR RESPONSE AS FOLLOWS:

1. **INTUITION FIRST** (2-3 sentences)
   - One relatable analogy or "think of it like..." that builds mental model before jargon
   - Why this concept matters in real engineering / exams

2. **TECHNICAL EXPLANATION** (exam-ready, structured)
   - Core definitions in precise, memorizable wording
   - Step-by-step logic/derivation/algorithm
   - ${subjectCategory === "dsa" ? "Pseudocode + Time/Space Complexity" : subjectCategory === "math" ? "Formula derivation with each step justified" : subjectCategory === "digital" ? "Truth table → Boolean expression → Logic diagram → Simplification" : subjectCategory === "circuit" ? "Circuit → Governing equations → Solution method" : "Key principles with exam-focused wording"}

3. **CONCRETE EXAMPLES** (minimum 2)
   - Worked example with numbers/trace
   - Variant that tests edge understanding

4. **COMMON MISCONCEPTIONS** (3-5 bullet points)
   - What students typically get wrong
   - The correct mental model

5. **EXAM KEYWORDS** (5-8 terms)
   - Exact phrases examiners look for in answers

6. **CONCEPTUAL CHECK QUESTIONS** (3 questions)
   - Not "solve this" — but "explain why..." or "what happens if..."
   - Designed to verify actual understanding, not memorization

TONE: Clear, authoritative, encouraging. No fluff. Every sentence should be useful for a KTU Part A or Part B answer.`;
  },
};

// ============================================
// 2. ACTIVE RECALL MODE
// ============================================

export const activeRecallPrompt: StudyPrompt = {
  id: "active-recall",
  mode: "active-recall",
  title: "Active Recall",
  description: "Test what you actually remember — no passive reading",
  icon: "🧠",
  category: "learn",
  bestFor: "Testing whether you actually remember a topic instead of relying on passive reading.",
  whenToUse: "After studying a topic, or to find the gaps before an exam.",
  importance: "essential",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "module", label: "Module (optional)", type: "select", required: false, placeholder: "Select module", options: [] },
    { key: "topic", label: "Specific Topic (optional)", type: "text", required: false, placeholder: "e.g., Red-Black trees, Frequency response" },
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    return `${subjectLine(vars)}

MODULE CONTEXT: ${vars.module || "your selected module"}${vars.topic ? `\nFOCUS TOPIC: ${vars.topic}` : ""}${moduleContent}

${subjectSpecific}

YOUR TASK: Act as an active recall tutor. Do NOT explain or teach. Instead, TEST MY MEMORY through progressive questioning.

RULES:
- Ask ONE question at a time
- Do NOT reveal the answer immediately after my response
- Wait for my answer, then evaluate it
- Identify gaps and probe deeper on weak areas
- Repeat concepts I missed in different ways
- Track what I've mastered vs. what needs review

${moduleContent ? "BASE YOUR QUESTIONS ON THE PROVIDED PrepPilot MODULE CONTENT. Do not invent questions outside this scope." : ""}

FIRST QUESTION: Start with a fundamental concept from this module/topic. Make it specific and answerable in 2-3 sentences.

FORMAT FOR EACH TURN:
1. **Question** (clear, specific, exam-style)
2. [Wait for my response]
3. **Evaluation** → Correct / Partial / Incorrect
4. **Missing/Incorrect points** (if any)
5. **Next question** (adaptive based on my performance)

If I answer correctly → increase difficulty / move to next concept
If I answer partially → probe the missing part
If I answer incorrectly → give a hint, then re-ask a simpler version

END CONDITION: After 10 questions OR when I say "stop", give me a summary:
- Concepts mastered
- Concepts needing review
- Specific topics to re-study
- Suggested next active recall session focus

BEGIN NOW with Question 1.`;
  },
};

// ============================================
// 3. PYQ INTELLIGENCE MODE
// ============================================

export const pyqIntelligencePrompt: StudyPrompt = {
  id: "pyq-intelligence",
  mode: "pyq-intelligence",
  title: "PYQ Intelligence",
  description: "Find high-priority exam patterns from previous years",
  icon: "🔍",
  category: "exam",
  bestFor: "Finding which topics actually repeat in exams and what to prioritize.",
  whenToUse: "Before planning your study — to focus effort where marks come from.",
  importance: "high",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "module", label: "Module (optional — leave blank for all)", type: "select", required: false, placeholder: "Select module", options: [] },
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    return `${subjectLine(vars)}

MODULE SCOPE: ${vars.module || "ALL MODULES"}${moduleContent}

${subjectSpecific}

YOUR TASK: Act as a KTU exam pattern analyst. Analyze previous year questions (PYQs) for this subject${vars.module ? `, specifically Module ${vars.module}` : " across all modules"} and produce a strategic intelligence report.

DO NOT invent questions. If you don't have verified PYQ data for this exact subject/code, clearly state: "I don't have access to verified KTU PYQs for ${getSubjectName(vars.subject)}. The analysis below is based on standard KTU 2024-scheme patterns for this subject." Then provide pattern-based guidance.

${moduleContent ? "USE THE PROVIDED PrepPilot EXAM FOCUS QUESTIONS as the basis for your analysis. These are the documented high-priority questions from the repository." : ""}

STRUCTURE YOUR REPORT:

1. **REPEATED CONCEPTS** (Top 8-10)
   - Concept name
   - How many years it appeared (or "High confidence pattern")
   - Typical mark allocation (2/5/8/10)
   - Question phrasing pattern

2. **FREQUENTLY ASKED TOPICS BY MODULE**
   - Module → Top 3 topics → Frequency (High/Medium/Low)

3. **MARK DISTRIBUTION ANALYSIS**
   - Part A (2 marks): Which topics dominate?
   - Part B (5-10 marks): Which topics get long answers?
   - Numerical vs Theory split (approximate %)

4. **SIMILAR QUESTION GROUPS** (Cluster variations)
   - e.g., "Thevenin's theorem" appears as: direct calculation / with dependent sources / AC circuit / maximum power transfer

5. **EXAM PRIORITY RANKING** (Actionable)
   - 🔴 MUST KNOW (appears almost every year, high marks)
   - 🟡 SHOULD KNOW (frequent, medium marks)
   - 🟢 NICE TO KNOW (occasional, low marks / new syllabus additions)

6. **STRATEGIC RECOMMENDATIONS**
   - If you have 2 days: Focus on these 3 topics
   - If you have 1 week: Add these 5 topics
   - Common trap topics (look important but rarely asked)

7. **ANSWER TEMPLATE FOR TOP 3 PYQ TYPES**
   - For each: Structure, Keywords, Diagram/Formula required

BE SPECIFIC. USE MODULE NAMES. REFERENCE ACTUAL KTU QUESTION PATTERNS.`;
  },
};

// ============================================
// 4. EXAM ANSWER MODE
// ============================================

export const examAnswerPrompt: StudyPrompt = {
  id: "exam-answer",
  mode: "exam-answer",
  title: "Exam Answer",
  description: "Generate marks-focused university answers",
  icon: "📝",
  category: "exam",
  bestFor: "Preparing structured answers when you know the exam format or marks.",
  whenToUse: "When you need a ready-to-write, keyword-rich answer for a specific question.",
  importance: "essential",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "module", label: "Module (optional)", type: "select", required: false, placeholder: "Select module", options: [] },
    { key: "marks", label: "Marks (optional)", type: "select", required: false, placeholder: "Select marks", options: [
      { value: "2", label: "2 marks" },
      { value: "5", label: "5 marks" },
      { value: "8", label: "8 marks" },
      { value: "10", label: "10 marks" },
    ]},
    { key: "question", label: "Question (optional)", type: "textarea", required: false, placeholder: "Paste the exact exam question here..." },
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const marks = vars.marks || "8";
    const marksStructure = getMarksStructureInstructions(marks);
    const answerStructure = getSubjectAnswerStructure(subjectCategory, parseInt(marks) || 8);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    return `${subjectLine(vars)}

MODULE: ${vars.module || "Not specified"}
QUESTION: ${vars.question || "the question I paste below in our conversation"}
TARGET MARKS: ${vars.marks || `${marks} (default — adjust as needed)`}${moduleContent}

${subjectSpecific}

MARKS STRUCTURE GUIDANCE: ${marksStructure}

SUBJECT-SPECIFIC ANSWER STRUCTURE: ${answerStructure}

YOUR TASK: Generate a high-scoring university exam answer optimized for KTU evaluation. This answer should be written AS IF I am writing it in the exam hall — structured, concise, and keyword-rich.

REQUIRED ANSWER STRUCTURE (adapt based on ${marks} marks):

${marks === "2" ? `
1. **Definition** (precise, 1 sentence)
2. **Key Point / Formula / Diagram reference** (1 line)
→ Total: ~30-40 words` : marks === "5" ? `
1. **Definition** (1 mark)
2. **Principle / Explanation** (2 marks) — 3-4 sentences
3. **Diagram / Formula / Mini Example** (2 marks) — labeled sketch or key equation
→ Total: ~100-150 words` : marks === "8" ? `
1. **Definition** (1 mark)
2. **Principle** (1 mark)
3. **Detailed Explanation** (3 marks) — Step-by-step, logical flow
4. **Diagram / Derivation / Worked Example** (2 marks) — Fully labeled
5. **Applications / Keywords** (1 mark) — 3-4 exam keywords
→ Total: ~200-250 words` : `
1. **Definition** (1 mark)
2. **Principle** (1 mark)
3. **Comprehensive Explanation** (4 marks) — Structured with sub-points
4. **Diagram / Full Derivation / Numerical Solution** (2 marks) — Complete working
5. **Applications / Advantages / Disadvantages** (2 marks) — Contextual
6. **Exam Keywords** (1 mark) — 5-6 precise terms examiners scan for
→ Total: ~300-400 words`}

ADDITIONAL REQUIREMENTS:
- Use KTU-style terminology (e.g., "hence proved", "from the above equation", "the phasor diagram shows")
- Include a diagram description if no visual can be rendered (e.g., "[DIAGRAM: Labeled circuit with voltage polarities and current directions]")
- For numerical parts: Show formula → Substitution → Calculation → Final answer with units
- Highlight **bold keywords** that carry marks
- Do NOT include unnecessary background or "introduction/conclusion" fluff
- If the question asks "Explain", focus on explanation. If "Derive", focus on derivation. If "Compare", use a table.
- ${moduleContent ? "PRIORITIZE the provided PrepPilot module content. Use definitions, formulas, and examples from it directly." : ""}

OUTPUT FORMAT:
**[ANSWER START]**
[Your complete answer here]
**[ANSWER END]**

**MARK BREAKDOWN:** (show how each part maps to marks)
**KEYWORDS USED:** (list)
**DIAGRAM NEEDED:** (yes/no - description if yes)`;
  },
};

// ============================================
// 5. STRICT EXAMINER MODE
// ============================================

export const strictExaminerPrompt: StudyPrompt = {
  id: "strict-examiner",
  mode: "strict-examiner",
  title: "Strict Examiner",
  description: "Get your answer evaluated like a university examiner",
  icon: "👨‍🏫",
  category: "analyze",
  bestFor: "Finding out exactly where you lose marks on a written answer.",
  whenToUse: "After writing an answer — to get a harsh, honest evaluation before the real exam.",
  importance: "high",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "module", label: "Module (optional)", type: "select", required: false, placeholder: "Select module", options: [] },
    { key: "marks", label: "Maximum Marks (optional)", type: "select", required: false, placeholder: "Select marks", options: [
      { value: "2", label: "2 marks" },
      { value: "5", label: "5 marks" },
      { value: "8", label: "8 marks" },
      { value: "10", label: "10 marks" },
    ]},
    { key: "question", label: "Question (optional)", type: "textarea", required: false, placeholder: "Paste the exact exam question here..." },
    { key: "answer", label: "Your Answer (optional)", type: "textarea", required: false, placeholder: "Paste your written answer here..." },
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const evaluationCriteria = getSubjectEvaluationCriteria(subjectCategory);
    const marks = vars.marks || "8";
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    return `${subjectLine(vars)}

MODULE: ${vars.module || "Not specified"}
QUESTION (${vars.marks || "—"} marks): ${vars.question || "the question I provide in our conversation"}

MY ANSWER:
${vars.answer || "[I will paste my written answer below after this prompt.]"}${moduleContent}

${subjectSpecific}

${evaluationCriteria}

YOUR TASK: Act as a STRICT KTU university examiner. Evaluate my answer rigorously using the official KTU 2024-scheme marking scheme. Be harsh but constructive — I need to know exactly where I lose marks.

RETURN YOUR EVALUATION IN THIS EXACT FORMAT:

---

**ESTIMATED MARKS: X / ${marks}**

---

**WHAT WAS CORRECT** (mark-worthy points I made):
- Point 1 → ~Y marks
- Point 2 → ~Y marks
- ...

**MISSING POINTS** (what I should have included for full marks):
- Missing concept/keyword → would have earned ~Y marks
- Missing diagram/formula/step → would have earned ~Y marks
- Missing application/example → would have earned ~Y marks
- ...

**INCORRECT POINTS** (factually wrong or misleading statements):
- Statement → Why it's wrong → Correct version

**PRESENTATION ISSUES** (formatting/structure problems that annoy examiners):
- Issue 1
- Issue 2
- ...

**KEYWORDS MISSING** (exam-scanning terms I omitted):
- Keyword 1
- Keyword 2
- ...

**HOW TO IMPROVE** (specific, actionable):
1. Add [specific missing element]
2. Rephrase [weak section] as [stronger version]
3. Include [diagram/formula/derivation step]
4. Use [specific keyword] instead of [vague term]

---

**FULL-MARK MODEL ANSWER** (${marks} marks, KTU-optimized):
[Complete answer showing exactly what a full-mark response looks like — same structure as Exam Answer mode]

---

**PRIORITY FIXES FOR NEXT ATTEMPT:**
1. [Highest impact fix]
2. [Second highest]
3. [Third highest]`;
  },
};

// ============================================
// 6. PROBLEM SOLVER MODE
// ============================================

export const problemSolverPrompt: StudyPrompt = {
  id: "problem-solver",
  mode: "problem-solver",
  title: "Problem Solver",
  description: "Develop actual problem-solving ability — no spoon-feeding",
  icon: "⚙️",
  category: "practice",
  bestFor: "Developing problem-solving ability through guided questions and hints.",
  whenToUse: "When you want to learn by doing — not by reading solutions.",
  importance: "high",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "module", label: "Module (optional)", type: "select", required: false, placeholder: "Select module", options: [] },
    { key: "topic", label: "Topic / Problem Type (optional)", type: "text", required: false, placeholder: "e.g., Graph shortest path, RLC transient, K-map minimization" },
    { key: "difficulty", label: "Difficulty (optional)", type: "select", required: false, placeholder: "Select difficulty", options: [
      { value: "easy", label: "Easy — Basic application" },
      { value: "medium", label: "Medium — Standard exam level" },
      { value: "hard", label: "Hard — Tricky / multi-concept" },
    ]},
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const problemGuidance = getSubjectProblemGuidance(subjectCategory);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    return `${subjectLine(vars)}

MODULE: ${vars.module || "your selected module"}
TOPIC: ${vars.topic || "the problem type I specify below"}
DIFFICULTY: ${vars.difficulty || "Medium (standard exam level)"}${moduleContent}

${subjectSpecific}

YOUR TASK: Act as a problem-solving coach. Your goal is to BUILD MY PROBLEM-SOLVING ABILITY, not give me solutions.

RULES OF ENGAGEMENT:
1. Give me ONE problem at a time — start with a representative problem for this topic at the requested difficulty
2. DO NOT give the solution immediately
3. Ask ME to explain my APPROACH first (not the answer — the approach)
4. Give PROGRESSIVE HINTS only when I explicitly ask ("Hint 1", "Hint 2", etc.)
5. After I solve (or give up), analyze my reasoning — not just the final answer
${problemGuidance}
${moduleContent ? "USE THE PROVIDED PrepPilot WORKED EXAMPLES AND CORE CONCEPTS as reference material for generating problems." : ""}

INTERACTION FLOW:
- **Problem 1** → [Wait for my approach] → [My approach] → You evaluate reasoning → Give hint if needed → [My solution attempt] → You analyze → Discuss complexity/pitfalls → **Problem 2** (variant)

FIRST PROBLEM: Present a clear, well-defined problem statement. Include all given data. Do not solve it.

END OF SESSION (when I say "stop" or after 5 problems): Give me a summary:
- Problem types covered
- My strong approaches
- Recurring weaknesses in my reasoning
- Specific patterns to practice
- Recommended next topics

BEGIN NOW with Problem 1.`;
  },
};

// ============================================
// 7. MOCK EXAM MODE
// ============================================

export const mockExamPrompt: StudyPrompt = {
  id: "mock-exam",
  mode: "mock-exam",
  title: "Mock Exam",
  description: "Simulate a real university exam",
  icon: "📋",
  category: "exam",
  bestFor: "Simulating the real exam under timed, realistic conditions.",
  whenToUse: "When you want to test your full-syllabus readiness before the actual exam.",
  importance: "useful",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "modules", label: "Modules (optional — comma-separated, e.g., 1,3,4)", type: "text", required: false, placeholder: "1,2,3 or leave blank for all" },
    { key: "duration", label: "Duration in minutes (optional)", type: "number", required: false, placeholder: "120" },
    { key: "totalMarks", label: "Total Marks (optional)", type: "number", required: false, placeholder: "100" },
    { key: "difficulty", label: "Difficulty (optional)", type: "select", required: false, placeholder: "Select difficulty", options: [
      { value: "easy", label: "Easy — Basics focus" },
      { value: "medium", label: "Medium — Standard university" },
      { value: "hard", label: "Hard — Tough / comprehensive" },
      { value: "university", label: "University-style — Exact KTU pattern" },
    ]},
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    const modulesText = vars.modules ? `Modules: ${vars.modules.split(",").map(m => m.trim()).join(", ")}` : "All modules";
    const totalMarks = parseInt(vars.totalMarks) || 100;
    const duration = parseInt(vars.duration) || 120;
    const difficulty = vars.difficulty || "medium";
    
    return `${subjectLine(vars)}

SCOPE: ${modulesText}
DURATION: ${duration} minutes
TOTAL MARKS: ${totalMarks}
DIFFICULTY: ${difficulty}${moduleContent}

${subjectSpecific}

YOUR TASK: Generate a REALISTIC MOCK EXAM PAPER that mirrors KTU 2024-scheme exam pattern for this subject.

EXAM STRUCTURE (KTU Standard):
- **Part A**: 10 questions × 2 marks = 20 marks (compulsory, all modules)
- **Part B**: 5 questions × 16 marks = 80 marks (choice: answer any 4, or 2 from each module pair)
  - OR: Mix of 5/8/10 mark questions totaling 80 marks

ADAPT TO REQUESTED TOTAL MARKS (${totalMarks}) AND DURATION (${duration} min).

DIFFICULTY CALIBRATION:
- **Easy**: Straightforward recall, direct formula application, basic definitions
- **Medium**: Standard KTU level — concept + application, some derivation, diagram needed
- **Hard**: Multi-concept, tricky numerical, "explain why" depth, novel scenario
- **University-style**: Exact KTU pattern — mark distribution, question phrasing, topic weightage matching historical PYQs

REQUIREMENTS:
1. **Question Paper Only** — Do NOT provide answers initially
2. **Module Coverage** — Balance across specified modules
3. **Mark Allocation** — Realistic split (theory vs numerical, definition vs derivation)
4. **KTU Phrasing** — Use actual KTU question language ("Derive", "Explain with diagram", "Determine", "Compare", "Design")
5. **Time Indicators** — Suggested minutes per question

OUTPUT FORMAT:

---
**TKM CE / KTU 2024 Scheme — Mock Exam**
**Subject:** ${getSubjectName(vars.subject)}${vars.subject ? ` (${vars.subject})` : ""}
**Duration:** ${duration} min | **Max Marks:** ${totalMarks}
**Modules Covered:** ${modulesText}
---

### PART A (${Math.round(totalMarks * 0.2)} marks — Compulsory)
[10 questions, 2 marks each — numbered A1 to A10]
A1. [Question]
A2. [Question]
...
A10. [Question]

*Suggested time: ${Math.round(duration * 0.25)} min*

---

### PART B (${Math.round(totalMarks * 0.8)} marks — Choice-based)
[Questions structured per KTU pattern — e.g., "Answer any 4 out of 5" or "Answer 2 from Module 1-2 and 2 from Module 3-4"]
B1. (Module X) [Question] — [Y marks] — [Z min]
B2. (Module Y) [Question] — [Y marks] — [Z min]
...
B5. (Module Z) [Question] — [Y marks] — [Z min]

*Suggested time: ${Math.round(duration * 0.75)} min*

---

**INSTRUCTIONS TO STUDENT:**
- Write answers on paper / digital doc
- Time yourself strictly
- After completion, use "Strict Examiner" mode to evaluate each answer
- Track: Which modules/question types caused trouble?

**ANSWER KEY:** (Available on request — say "Show answers" to reveal)`;
  },
};

// ============================================
// 8. REVISION MODE
// ============================================

export const revisionPrompt: StudyPrompt = {
  id: "revision",
  mode: "revision",
  title: "Revision",
  description: "Rapid revision — what matters most",
  icon: "⚡",
  category: "revision",
  bestFor: "Quickly reviewing a topic when time is limited.",
  whenToUse: "The night before an exam, or any time you need maximum yield in minimum minutes.",
  importance: "essential",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "module", label: "Module (optional — blank for all)", type: "select", required: false, placeholder: "Select module", options: [] },
    { key: "duration", label: "Time Available (optional)", type: "select", required: false, placeholder: "Select duration", options: [
      { value: "15", label: "15 minutes — Ultra-quick" },
      { value: "30", label: "30 minutes — Quick review" },
      { value: "60", label: "1 hour — Thorough revision" },
      { value: "night-before", label: "Night before exam — Maximum yield" },
    ]},
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    const durationKey = vars.duration || "60";
    const durationGuide = {
      "15": "PRIORITY: Only the absolute highest-yield items. 5 concepts max. No derivations. Keywords + formulas + 1 diagram.",
      "30": "PRIORITY: High-frequency concepts + formulas + 2-3 key diagrams + top 5 PYQ patterns. Skip derivations unless they're the ONLY way a topic is asked.",
      "60": "PRIORITY: All important concepts, all formulas, key diagrams, top 10 PYQs, common mistakes. One worked example per major topic type.",
      "night-before": "PRIORITY: Everything that could appear tomorrow. Ranked by probability. Formulas sheet. Definitions sheet. Diagram checklist. PYQ patterns. Trap warnings. Sleep plan.",
    }[durationKey];
    
    return `${subjectLine(vars)}

MODULE SCOPE: ${vars.module || "ALL MODULES"}
TIME AVAILABLE: ${durationKey === "night-before" ? "Night before exam" : `${durationKey} minutes`}${moduleContent}

${subjectSpecific}

REVISION STRATEGY: ${durationGuide}

YOUR TASK: Generate a TIME-BOXED REVISION PLAN that maximizes marks per minute. Every item must be exam-actionable.

${moduleContent ? "USE THE PROVIDED PrepPilot MODULE CONTENT as your PRIMARY source. Prioritize exam focus questions, revision notes, formulas, and worked examples from it." : ""}

STRUCTURE YOUR OUTPUT:

---

### ⏱️ TIME ALLOCATION
| Section | Minutes | What to Cover |
|---------|---------|---------------|
| [Section 1] | X | [Specific topics] |
| [Section 2] | X | [Specific topics] |
| ... | ... | ... |

---

### 🎯 HIGH-PRIORITY CONCEPTS (Ranked by Exam Probability)
For each: **Concept** → **One-line exam-ready definition** → **Key formula/diagram** → **PYQ frequency (High/Med/Low)**

1. 
2. 
... (${durationKey === "15" ? "5" : durationKey === "30" ? "8" : "12-15"} items max)

---

### 📐 FORMULA SHEET (Copy-paste friendly)
[Every formula needed for this module/scope, organized by topic, with 1-line "when to use" note]

---

### 📊 DIAGRAM CHECKLIST
[Diagrams I must be able to draw from memory — labeled sketch description + what each label means]

---

### ❓ TOP PYQ PATTERNS (Last 3-5 years equivalent)
[Question pattern → How to structure answer → Marks → Keywords]

---

### ⚠️ COMMON MISTAKES / TRAPS
[Mistake → Why it's wrong → Correct version — specific to this subject]

---

### 🎪 ${durationKey === "night-before" ? "NIGHT-BEFORE CHECKLIST" : "LAST 5 MINUTES BEFORE EXAM"}
[Final mental checklist: Formulas memorized? Diagrams visualizable? Keywords ready? Water? Hall ticket?]

---

FORMAT: Bullet points, tables, ultra-condensed. NO PARAGRAPHS. I should be able to scan this in the allocated time.`;
  },
};

// ============================================
// 9. MISTAKE FIXER MODE
// ============================================

export const mistakeFixerPrompt: StudyPrompt = {
  id: "mistake-fixer",
  mode: "mistake-fixer",
  title: "Mistake Fixer",
  description: "Turn mistakes into learning — find the exact error",
  icon: "🔧",
  category: "practice",
  bestFor: "Finding the exact error in a wrong answer and understanding why it failed.",
  whenToUse: "After a test or mock exam — to turn every mistake into permanent learning.",
  importance: "useful",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "module", label: "Module (optional)", type: "select", required: false, placeholder: "Select module", options: [] },
    { key: "question", label: "Original Question (optional)", type: "textarea", required: false, placeholder: "Paste the exact question..." },
    { key: "myAnswer", label: "My Answer (optional)", type: "textarea", required: false, placeholder: "Paste what I wrote..." },
    { key: "correctAnswer", label: "Correct Answer (optional)", type: "textarea", required: false, placeholder: "If you have the model answer..." },
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    return `${subjectLine(vars)}

MODULE: ${vars.module || "Not specified"}
QUESTION: ${vars.question || "the question I paste below in our conversation"}

MY ANSWER:
${vars.myAnswer || "[I will paste my attempted answer below after this prompt.]"}

${vars.correctAnswer ? `CORRECT ANSWER (reference):
${vars.correctAnswer}` : ""}${moduleContent}

${subjectSpecific}

YOUR TASK: Act as a diagnostic tutor. Find the EXACT mistake in my reasoning — not just the wrong final answer, but WHY my approach failed.

ANALYSIS FRAMEWORK:

1. **EXACT MISTAKE LOCATION**
   - Step/line in my answer where reasoning diverged
   - Was it: Conceptual misunderstanding? Formula misapplication? Calculation error? Misreading the question? Missing assumption? Wrong method selection?

2. **WHY THE REASONING FAILED** (Root cause)
   - The specific mental model gap or knowledge hole
   - Not "you got it wrong" — but "you assumed X, but actually Y because Z"

3. **CORRECT REASONING PATH**
   - Step-by-step: What SHOULD have been the thought process
   - Decision points: "At this juncture, check X before proceeding to Y"
   - ${subjectCategory === "dsa" ? "Include: Why this algorithm? Why not that one? Complexity check." : subjectCategory === "math" ? "Include: Why this formula? Assumptions check. Units check." : subjectCategory === "circuit" ? "Include: Which theorem applies? Reference direction? Domain (t/s/jω)?" : ""}

4. **CONCEPT GAP IDENTIFICATION**
   - The ONE underlying concept I need to re-learn (not a laundry list)
   - Specific resource: "Review [topic] focusing on [specific aspect]"

5. **SIMILAR PRACTICE QUESTION** (One new question)
   - Same concept, different numbers/scenario
   - Designed to test if I've actually fixed the reasoning
   - Do NOT repeat concepts I already demonstrated correctly

6. **QUICK REPAIR CARD** (For my notes)
   - **Trigger**: "When you see [question pattern]..."
   - **Mistake**: "Don't do [wrong thing]..."
   - **Fix**: "Instead, do [correct thing] because [reason]..."
   - **Keyword**: [One word to remember]

OUTPUT FORMAT: Structured, diagnostic, encouraging but precise. No fluff.`;
  },
};

// ============================================
// 10. SCORE 90+ MODE
// ============================================

export const score90PlusPrompt: StudyPrompt = {
  id: "score-90-plus",
  mode: "score-90-plus",
  title: "Score 90+",
  description: "Build a marks-focused study strategy",
  icon: "🎯",
  category: "exam",
  bestFor: "Building a day-by-day strategy to maximize your final exam score.",
  whenToUse: "When you have an exam coming and want every study hour to earn maximum marks.",
  importance: "specialized",
  variables: [
    { key: "subject", label: "Subject (optional)", type: "select", required: false, placeholder: "Select subject", options: [] },
    { key: "currentScore", label: "Current Expected Score % (optional)", type: "number", required: false, placeholder: "50" },
    { key: "targetScore", label: "Target Score % (optional)", type: "number", required: false, placeholder: "90" },
    { key: "daysRemaining", label: "Days Until Exam (optional)", type: "number", required: false, placeholder: "14" },
    { key: "dailyStudyTime", label: "Daily Study Time in hours (optional)", type: "number", required: false, placeholder: "3" },
  ],
  template: (vars) => {
    const subjectCategory = vars.subject ? getSubjectCategory(vars.subject) : "general";
    const subjectSpecific = getSubjectSpecificInstructions(subjectCategory);
    const moduleContent = vars.__moduleContent ? formatModuleContent(JSON.parse(vars.__moduleContent)) : "";
    
    const currentScore = parseInt(vars.currentScore) || 50;
    const targetScore = parseInt(vars.targetScore) || 90;
    const daysRemaining = parseInt(vars.daysRemaining) || 14;
    const dailyStudyTime = parseInt(vars.dailyStudyTime) || 3;
    const gap = targetScore - currentScore;
    const totalHours = daysRemaining * dailyStudyTime;
    
    return `${subjectLine(vars)}

CURRENT STATE:
- Expected score if exam today: ${currentScore}%
- Target score: ${targetScore}%
- Gap to close: ${gap}%
- Days until exam: ${daysRemaining}
- Daily study time: ${dailyStudyTime} hours
- Total available hours: ${totalHours}${moduleContent}

${subjectSpecific}

YOUR TASK: Generate a MARKS-MAXIMIZATION STRATEGY — not a generic timetable. Every recommendation must trace back to: "How does this earn me the most additional marks per hour?"

STRATEGY PILLARS (prioritize in this order):
1. **High-frequency topics** → Concepts that appear in >80% of exams
2. **High-mark questions** → 8-10 mark derivations/designs that are predictable
3. **Weak areas** → My specific gaps (from current score baseline)
4. **PYQs** → Exact question patterns, memorize model answers
5. **Active recall** → Test myself, don't re-read
6. **Mock exams** → Full papers under timed conditions
7. **Mistake correction** → Fix each error permanently
8. **Revision** → Spaced, compressed, keyword-focused

${moduleContent ? "USE THE PROVIDED PrepPilot MODULE CONTENT to identify specific high-priority topics, exam focus questions, and worked examples for your strategy." : ""}

OUTPUT FORMAT:

---

### 📊 SCORE GAP ANALYSIS
| Source of Marks | Current | Potential | Gap | Hours Needed |
|----------------|---------|-----------|-----|--------------|
| High-freq theory (Part A) | X/20 | Y/20 | Z | H1 |
| Standard derivations (5-8m) | X/40 | Y/40 | Z | H2 |
| Numerical problems | X/20 | Y/20 | Z | H3 |
| Advanced/tricky | X/20 | Y/20 | Z | H4 |
| **TOTAL** | **${currentScore}%** | **${targetScore}%** | **${gap}%** | **${totalHours}h** |

---

### 🎯 PRIORITY MATRIX (What to study, in order)
**WEEK 1 (Days 1-${Math.ceil(daysRemaining/2)}): FOUNDATION + HIGH YIELD**
- Day 1-2: [Specific module/topic] — Why: [PYQ frequency + mark weight]
- Day 3-4: [Specific module/topic] — Why: [High-mark predictable question]
- Day 5-6: [Weak area from baseline] — Why: [My gap]
- Day 7: Mock test (Part A focus) + Mistake fixing

**WEEK 2 (Days ${Math.ceil(daysRemaining/2)+1}-${daysRemaining}): MASTERY + EXAM READINESS**
- Day 8-9: [High-mark derivations/designs] — Memorize model answers
- Day 10-11: [Numerical patterns] — Speed + accuracy
- Day 12: Full mock exam (timed) + Strict Examiner evaluation
- Day 13: Mistake fixing from mock + Formula/Diagram rapid revision
- Day 14: Night-before revision pack

*(Adjust days based on ${daysRemaining} actual days)*

---

### 📅 DAILY TEMPLATE (${dailyStudyTime}h/day)
| Block | Duration | Activity | Mode |
|-------|----------|----------|------|
| 1 | ${Math.round(dailyStudyTime * 60 * 0.4)} min | New concept / Weak area | **Learn** / **Problem Solver** |
| 2 | ${Math.round(dailyStudyTime * 60 * 0.3)} min | PYQ practice / Active recall | **Active Recall** / **PYQ Intelligence** |
| 3 | ${Math.round(dailyStudyTime * 60 * 0.2)} min | Mock question / Answer writing | **Exam Answer** / **Strict Examiner** |
| 4 | ${Math.round(dailyStudyTime * 60 * 0.1)} min | Rapid revision / Flashcards | **Revision** |

---

### 🔑 HIGH-LEVERAGE ACTIONS (Do these FIRST)
1. [Specific topic] → [Specific PYQ pattern] → [Exact model answer to memorize]
2. [Specific derivation] → [Step-by-step template] → [Practice 3 variants]
3. [Weak module] → [Root cause] → [Targeted Problem Solver session]

---

### 📈 PROGRESS TRACKERS
- **Daily**: Mock question score (target: improve by 10% every 3 days)
- **Weekly**: Full mock exam score (target: reach ${targetScore}% by Day ${daysRemaining-1})
- **Red flags**: If mock score < ${currentScore + 10}% by mid-point → escalate to **Mistake Fixer** daily

---

### ⚠️ WHAT TO SKIP (Low ROI)
- Reading textbook chapters cover-to-cover
- Topics with <10% PYQ frequency AND <5 marks potential
- Re-solving problems I already get right
- Making pretty notes (use existing PrepPilot instead)

---

**REMEMBER**: This strategy assumes I use PrepPilot as my primary reference. The notes already contain: definitions, formulas, diagrams, exam focus, revision bullets. Don't duplicate — APPLY.`;
  },
};

// ============================================
// EXPORT ALL PROMPTS
// ============================================

export const ALL_PROMPTS: StudyPrompt[] = [
  learnPrompt,
  activeRecallPrompt,
  pyqIntelligencePrompt,
  examAnswerPrompt,
  strictExaminerPrompt,
  problemSolverPrompt,
  mockExamPrompt,
  revisionPrompt,
  mistakeFixerPrompt,
  score90PlusPrompt,
];

export function getPromptById(id: StudyModeId): StudyPrompt | undefined {
  return ALL_PROMPTS.find(p => p.id === id);
}

export function getPromptsByCategory(category: StudyModeCategory): StudyPrompt[] {
  return ALL_PROMPTS.filter(p => p.category === category);
}