import { SubjectContent, ProgramId } from "../types";
import dsa from "./data-structures-and-algorithms";
import networkTheory from "./network-theory";
import simLab from "./system-simulation-and-virtual-instrumentation-lab";
import advMath from "./advanced-linear-algebra-complex-analysis-pde";
import dld from "./digital-electronics-and-logic-design";
import sensors from "./sensor-and-sensor-circuits";
import lifeSkills from "./life-skills-and-professional-ethics";
import coa from "./computer-organization-and-architecture";
import signals from "./signals-and-systems";
import electricalTech from "./electrical-technology";
import solidState from "./solid-state-electronic-devices-and-circuits";
import engEcon from "./engineering-economics";
import envSci from "./environmental-sciences";
import oopJava from "./object-oriented-programming-using-java";
import controlSystems from "./control-systems";
import dbms from "./database-management-systems";
import ai from "./artificial-intelligence-theory-and-applications";
import os from "./operating-systems";
import pmf from "./project-management-and-finance";
import constitution from "./constitution-of-india";
import softwareEng from "./software-engineering";
import computerNetworks from "./computer-networks";
import embedded from "./embedded-system-design-and-iot";
import powerElec from "./power-electronics-and-drives";
import cps from "./cyber-physical-systems";
import computerVision from "./computer-vision";
import energySystems from "./energy-systems";

// CS [AI] note files that exist on disk.
// Only advMathAi exists; other CS_AI subjects fall through to "not written yet"
/// state at the page level and never crash the app.
import advMathAi from "./advanced-linear-algebra-complex-analysis-pde-ai";

// Registry built only from note files that actually exist.
// Key format: `${programId}-${subjectCode}` (e.g. "ER-24ERP304", "CS_AI-24MAP300").
// Subjects without a written note file fall through to the "not written yet"
// state at the page level and never crash the app.
const erNotes: { content: SubjectContent; programId: ProgramId }[] = [
  { content: dsa, programId: "ER" },
  { content: networkTheory, programId: "ER" },
  { content: simLab, programId: "ER" },
  { content: advMath, programId: "ER" },
  { content: dld, programId: "ER" },
  { content: sensors, programId: "ER" },
  { content: lifeSkills, programId: "ER" },
  { content: coa, programId: "ER" },
  { content: signals, programId: "ER" },
  { content: electricalTech, programId: "ER" },
  { content: solidState, programId: "ER" },
  { content: engEcon, programId: "ER" },
  { content: envSci, programId: "ER" },
  { content: oopJava, programId: "ER" },
  { content: controlSystems, programId: "ER" },
  { content: dbms, programId: "ER" },
  { content: ai, programId: "ER" },
  { content: os, programId: "ER" },
  { content: pmf, programId: "ER" },
  { content: constitution, programId: "ER" },
  { content: softwareEng, programId: "ER" },
  { content: computerNetworks, programId: "ER" },
  { content: embedded, programId: "ER" },
  { content: powerElec, programId: "ER" },
  { content: cps, programId: "ER" },
  { content: computerVision, programId: "ER" },
  { content: energySystems, programId: "ER" },
];

const csAiNotes: { content: SubjectContent; programId: ProgramId }[] = [
  { content: advMathAi, programId: "CS_AI" },
];

// Composite keys are the canonical lookup ("ER-24ERP304"). Plain-code aliases
// are also registered for legacy call sites that index `registry[code]`; ER
// wins when two programs share a course code. New code should prefer
// getSubjectContent(code, programId) for program-correct resolution.
const registry: Record<string, SubjectContent> = {};
for (const { content, programId } of erNotes) {
  registry[`${programId}-${content.code}`] = content;
  if (!(content.code in registry)) registry[content.code] = content;
}
for (const { content, programId } of csAiNotes) {
  registry[`${programId}-${content.code}`] = content;
  if (!(content.code in registry)) registry[content.code] = content;
}

export function getSubjectContent(subjectCode: string, programId?: ProgramId): SubjectContent | undefined {
  if (!programId) {
    return registry[`ER-${subjectCode}`] || registry[`CS-${subjectCode}`] || registry[`CS_AI-${subjectCode}`];
  }
  return registry[`${programId}-${subjectCode}`];
}

export function getSubjectContentByCode(subjectCode: string): SubjectContent | undefined {
  return getSubjectContent(subjectCode, "ER") || getSubjectContent(subjectCode, "CS") || getSubjectContent(subjectCode, "CS_AI");
}

export default registry;
