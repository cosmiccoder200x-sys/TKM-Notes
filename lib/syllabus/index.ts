export type {
  SyllabusSource,
  SyllabusTopic,
  SyllabusModule,
  SyllabusVersion,
  ParsedSyllabus,
  SubjectGuess,
  SegmentedSyllabus,
  SyllabusMatch,
} from "./types";
export { parseSubjectSyllabus, detectSubjects, parseFullSyllabus } from "./parse";
export {
  syllabusSubjectKey,
  listVersions,
  getActiveVersion,
  saveVersion,
  activateVersion,
  deleteVersion,
  buildOfficialVersion,
  getEffectiveVersion,
  getEffectiveModules,
} from "./versions";
export { matchSyllabus } from "./match";
export { syllabusToText } from "./export";
