import { SubjectContent } from "../types";
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

// Add one entry per subject as notes get written.
// Key = subject code (matches lib/content.ts).
const registry: Record<string, SubjectContent> = {
  // Semester 3
  "24ERP304": dsa,
  "24EST332": networkTheory,
  "24ESP307": simLab,
  "24MAP301": advMath,
  "24ERJ303": dld,
  "24ERT305": sensors,
  "24HUT310": lifeSkills,
  // Semester 4
  "24ERT401": coa,
  "24ERT402": signals,
  "24ERP403": electricalTech,
  "24ERJ404": solidState,
  "24HUT435": engEcon,
  "24MCT406": envSci,
  "24ERP407": oopJava,
  // Semester 5
  "24ERT501": controlSystems,
  "24ERJ502": dbms,
  "24ERT503": ai,
  "24ERP504": os,
  "24HUT535": pmf,
  "24MCT506": constitution,
  "24ERT507": softwareEng,
  // Semester 6
  "24ERP601": computerNetworks,
  "24ERP602": embedded,
  "24ERT603": powerElec,
  "24ESP608": cps,
  // Semester 7
  "24ERP701": computerVision,
  "24ERP702": energySystems,
};

export function getSubjectContent(subjectCode: string): SubjectContent | undefined {
  return registry[subjectCode];
}

export default registry;