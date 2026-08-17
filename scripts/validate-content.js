// validate-content.js — content integrity gate for the TKM Notes data layer.
// Usage: node scripts/validate-content.js
//
// Combines:
//   1. Fast regex checks on the static data files (subject counts, duplicate
//      codes, module-breakdown coverage).
//   2. The vitest content suites (real TS module execution) for deep integrity:
//      notes registry ↔ subject catalog, PYQ derivation, branch isolation,
//      stable ids, Learn CS syllabus mapping, search labeling, progress keys.
// The node script cannot import the TypeScript data layer directly (extensionless
// imports), so the deep checks run through the same vitest runner as `npm test`.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

let failures = 0;
function check(name, cond, detail) {
  const ok = Boolean(cond);
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

const contentSrc = fs.readFileSync(path.join("lib", "content.ts"), "utf8");
const syllabusSrc = fs.readFileSync(path.join("lib", "syllabusData.ts"), "utf8");

// --- subjects from lib/content.ts (ER) + lib/syllabusData.ts (CS / CS_AI) ---
const SUBJECT_RE =
  /code: "([^"]+)", slug: "([^"]+)", name: "([^"]+)", credits: ([^,]+), semesterId: "s(\d)", programId: "([^"]+)"/g;

const subjects = [];
let sm;
while ((sm = SUBJECT_RE.exec(contentSrc))) {
  subjects.push({ programId: sm[6], code: sm[1], slug: sm[2], name: sm[3], semester: "s" + sm[5] });
}
while ((sm = SUBJECT_RE.exec(syllabusSrc))) {
  subjects.push({ programId: sm[6], code: sm[1], slug: sm[2], name: sm[3], semester: "s" + sm[5] });
}

const ER_COUNT = 38;
const CS_COUNT = 108;
const CS_AI_COUNT = 113;

const byProgram = (id) => subjects.filter((s) => s.programId === id);
check("ER subject count = 38", byProgram("ER").length === ER_COUNT, `got ${byProgram("ER").length}`);
check("CS subject count = 108", byProgram("CS").length === CS_COUNT, `got ${byProgram("CS").length}`);
check("CS_AI subject count = 113", byProgram("CS_AI").length === CS_AI_COUNT, `got ${byProgram("CS_AI").length}`);

for (const prog of ["ER", "CS", "CS_AI"]) {
  const codes = byProgram(prog).map((s) => s.code);
  const dupes = codes.filter((c, i) => codes.indexOf(c) !== i);
  check(`no duplicate ${prog} subject codes`, dupes.length === 0, dupes.join(", "));
}

// --- CS / CS_AI module breakdowns ---
const MODULE_OBJ_RE = /^\s*"((CS|CS_AI)-[A-Z0-9]+)": \[([\s\S]*?)\n\s*\],/gm;
const mapKeys = new Set();
let mo;
while ((mo = MODULE_OBJ_RE.exec(syllabusSrc))) mapKeys.add(mo[1]);

const subjectKeys = new Set(subjects.map((s) => `${s.programId}-${s.code}`));
const missingBreakdown = [...mapKeys].filter((k) => !subjectKeys.has(k));
const noBreakdown = [...subjectKeys].filter((k) => (k.startsWith("CS") || k.startsWith("CS_AI")) && !mapKeys.has(k));
check("every generated module breakdown maps to a subject", missingBreakdown.length === 0, missingBreakdown.join(", "));
check("every CS/CS_AI subject has an official module breakdown", noBreakdown.length === 0, noBreakdown.join(", "));

// --- deep integrity via the vitest content suites (real TS execution) ---
const TESTS = [
  "tests/domain.test.ts",
  "tests/subjects.test.ts",
  "tests/notes.test.ts",
  "tests/pyqs.test.ts",
  "tests/learn-cs.test.ts",
  "tests/search.test.ts",
  "tests/progress.test.ts",
  "tests/import-idempotent.test.ts",
];
// Invoke vitest's CLI through node directly (no shell, cross-platform, and the
// same runner as `npm test`).
const vitestCli = path.join("node_modules", "vitest", "vitest.mjs");
try {
  execFileSync(process.execPath, [vitestCli, "run", "--silent", ...TESTS], { stdio: "inherit" });
  check("vitest content suites pass (notes/pyqs/isolation/ids/mapping/search)", true);
} catch {
  check("vitest content suites pass (notes/pyqs/isolation/ids/mapping/search)", false);
}

if (failures > 0) {
  console.log(`\nvalidate-content: ${failures} failure(s).`);
  process.exit(1);
}
console.log("\nvalidate-content: all checks passed.");