import { Subject, ProgramId } from "./types";
import { syllabusModulesFor } from "./content";
import { BRANCH_LABELS } from "./branch";
import syllabusText from "./syllabusText";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function hasSyllabusText(code: string): boolean {
  return Boolean(syllabusText[code]);
}

// Build a SYLLABUS block from the official module breakdown (syllabusData.ts),
// which is verified per-branch for every CS / CS_AI subject.
function formatSyllabusModules(programId: ProgramId, code: string): string | undefined {
  const mods = syllabusModulesFor(programId, code);
  if (!mods.length) return undefined;
  const lines: string[] = ["SYLLABUS"];
  for (const m of mods) {
    const roman = ROMAN[m.number - 1] ?? String(m.number);
    lines.push(` MODULE ${roman}: ${m.title}`);
    lines.push(m.content.trim());
  }
  return lines.join("\n");
}

export function buildDeepDivePrompt(subject: Subject): string {
  // Branch-exact official modules take precedence (covers all CS / CS_AI);
  // curated syllabusText entries serve the ER branch (keyed by code only).
  const syllabus = formatSyllabusModules(subject.programId, subject.code) || syllabusText[subject.code];

  const branch = BRANCH_LABELS[subject.programId] ?? "Engineering";
  const header = `I'm a TKM College of Engineering (KTU, ${branch}, 2024 scheme) student studying "${subject.name}" (${subject.code}, ${subject.semesterId.toUpperCase()}, ${subject.credits} credits).`;

  let syllabusBlock: string;
  if (syllabus) {
    syllabusBlock = `Here is the EXACT official syllabus for this course, module by module — use this directly instead of a generic version of the subject:\n\n${syllabus}`;
  } else {
    syllabusBlock = `I don't have the exact official module breakdown for this course on hand — use the standard KTU 2024-scheme syllabus for "${subject.name}" if you have reliable knowledge of it, and clearly flag any module you're unsure about so I can correct it rather than presenting a guess as fact.`;
  }

  const instructions = `Go through it module by module, in the exact order listed, and for EACH module give me:

1. A 2-minute plain-English overview — what the module covers and why it's tested
2. Core concepts as exam-ready bullet points (simple language, easy to remember)
3. Must-memorize definitions in precise, exam-ready wording
4. Step-by-step worked examples for every numerical/derivation-based topic in that module
5. A formula sheet — every formula in the module, copy-friendly, with a one-line note on when to use each
6. The most frequently asked KTU exam question types for that module, ranked High/Medium/Low by how often they're likely asked, with a short note on how to structure the answer
7. A one-page "night before the exam" revision summary for that module

Don't skip any topic listed in the syllabus above. Keep explanations exam-focused, not textbook-length — I need to be able to answer a KTU Part A/Part B question well, not write a thesis. For numerical-heavy topics, prioritize a fully worked example over more prose. If a topic is genuinely conceptual/theory-only (no numericals), say so instead of forcing a fake example.`;

  return `${header}\n\n${syllabusBlock}\n\n${instructions}`;
}
