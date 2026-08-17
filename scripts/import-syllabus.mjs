#!/usr/bin/env node
// Idempotent syllabus import from the official KTU 2024 JSON sources.
// Reads the CSE source (data/syllabus/CSE_Core_S3-S8_2024_COMPLETE_SYLLABUS.json)
// and the CS_AI source (data/syllabus/CSE_AI_S3-S8_2024_COMPLETE_IMPORT.json)
// and regenerates lib/syllabusData.ts subject arrays + module topic data. Safe
// to run repeatedly: output is deterministic and duplicates are impossible
// (keyed by program+code).
//
// Usage:
//   node scripts/import-syllabus.mjs
//   node scripts/import-syllabus.mjs [--cse <file>] [--ai <file>] [--ai-accurate <file>]
//
// The optional --ai-accurate file (CSE_AI_S3-S8_2024_ACCURATE_IMPORT.json)
// supplies cleaner module titles; content always comes from the CS_AI
// COMPLETE source (the ACCURATE file is known to mislabel 7 subjects).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Canonical source files live inside the repo (data/syllabus/) so the importer
// is portable. CLI overrides still work for re-importing updated sources.
const SOURCE_DIR = join(ROOT, "data", "syllabus");

const DEFAULT_CSE = join(SOURCE_DIR, "CSE_Core_S3-S8_2024_COMPLETE_SYLLABUS.json");
const DEFAULT_AI = join(SOURCE_DIR, "CSE_AI_S3-S8_2024_COMPLETE_IMPORT.json");
const DEFAULT_AI_ACC = join(SOURCE_DIR, "CSE_AI_S3-S8_2024_ACCURATE_IMPORT.json");

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : undefined;
}
const csePath = arg("--cse") || DEFAULT_CSE;
const aiPath = arg("--ai") || DEFAULT_AI;
const aiAccPath = arg("--ai-accurate") || DEFAULT_AI_ACC;

function load(path, label) {
  if (!existsSync(path)) {
    console.error(`Source JSON not found: ${path}`);
    process.exit(1);
  }
  const recs = JSON.parse(readFileSync(path, "utf8"));
  console.log(`${label}: ${recs.length} records from ${path}`);
  return recs;
}

const cseRecords = load(csePath, "CSE source");
const aiRecords = load(aiPath, "CS_AI source");
const aiAccRecords = existsSync(aiAccPath) ? JSON.parse(readFileSync(aiAccPath, "utf8")) : null;
if (aiAccRecords) console.log(`CS_AI ACCURATE (titles only): ${aiAccRecords.length} records`);

// ---------------------------------------------------------------------------
// Name cleaning. The official JSON embeds L-T-P-J-C credit strings and
// truncated words inside course_name, so we canonicalize against a curated
// map (real KTU 2024 names) and fall back to stripping the "Introduction"
// suffix + title-casing.
// ---------------------------------------------------------------------------

const REAL_NAMES = {
  // Branch-specific overrides (key: program_id-course_code) take priority.
  // Codes reused across branches with different official names go here.
  "CS_AI-24CSP304": "Data Structures and Algorithms",
  "CS_AI-24CST401": "Deep Learning",
  "CS-24CST401": "Discrete Mathematics",
  "CS_AI-24CSH409": "Computational Geometry",
  "CS_AI-24CSH410": "System Software",
  "CS_AI-24CSH411": "Data and Web Mining",
  "CS_AI-24CSP701": "Introductory Cyber Security",
  "CS-24CSP701": "Compiler Design",
  "CS_AI-24CSM409": "Mathematics for Machine Learning",
  "CS_AI-24CSE7133": "GPU Architecture and Programming",
  "CS_AI-24AIP305": "Computing System and Organization",
  "CS_AI-24AIJ303": "Introduction to Machine Learning",
  "CS_AI-24EST372": "Optimization Techniques",
  "CS_AI-24MAP300": "Advanced Linear Algebra and Transforms",
  "CS_AI-24AIP402": "Introduction to Database Systems",
  "CS_AI-24HUT455": "Management-I (Organizational Behavior)",
  "CS_AI-24EST407": "Ordinary Differential Equations and Partial Differential Equations",
  "CS_AI-24AIP503": "Computer Networks",
  "CS_AI-24AIJ504": "Reinforcement Learning",
  "CS_AI-24AIP602": "Natural Language Processing",
  "CS_AI-24AIE614": "Compiler Design",
  "CS_AI-24AIE6155": "Advanced Web Technologies",
  "CS_AI-24CSE634": "Agile Methodologies",
  "CS_AI-24CSE655": "Principles of Programming Languages",
  "CS_AI-24CSE6115": "Neural Networks and Fuzzy Logic",
  "CS_AI-24CSE6124": "Data Storage Technologies and Networks",
  "CS_AI-24EST609": "Responsible AI",
  "CS_AI-24CSE753": "Parallel and Distributed Algorithms",
  "CS_AI-24CSE783": "Advanced Social, Text and Media Analytics",
  "CS_AI-24CSE7113": "Networks and Systems Security",
  // CSE
  "24MAP301": "Advanced Linear Algebra, Complex Analysis and Partial Differential Equations",
  "24EST352": "Probability, Statistics and Linear Programming",
  "24CSJ303": "Advanced Programming",
  "24CSP304": "Algorithms",
  "24CSP305": "Computer Organization and Architecture",
  "24EST322": "Basic Engineering Mechanics",
  "24CSM309": "Python for Machine Learning",
  "24CSM310": "Object Oriented Programming",
  "24CST401": "Discrete Mathematics",
  "24CSP402": "Computer Networks",
  "24CSP403": "Operating Systems",
  "24MCT406": "Environmental Sciences",
  "24BYT407": "Biology for Engineers",
  "24CSH409": "Computational Geometry",
  "24CSH410": "System Software",
  "24CSH411": "Data and Web Mining",
  "24CSM409": "Mathematics for Machine Learning",
  "24CSM410": "Software Engineering",
  "24CST501": "Design and Analysis of Algorithms",
  "24CST502": "Software Engineering",
  "24CSJ504": "Advanced Web Technologies",
  "24HUT555": "Finance and Accounting",
  "24MCT506": "Constitution of India",
  "24CSH509": "Advanced Data Structures and Algorithms",
  "24CSH510": "Advanced Operating Systems",
  "24CSH511": "Business Analytics",
  "24CSM509": "Concepts in Machine Learning",
  "24CST601": "Theory of Computation",
  "24CSP602": "Introductory Cyber Security",
  "24CSE614": "Advanced Machine Learning",
  "24CSE624": "Wireless Sensor Networks",
  "24CSE644": "Advanced Algorithms",
  "24CSE654": "Data Mining",
  "24CSE664": "Distributed Computing",
  "24CSE674": "Advanced Database System",
  "24CSE684": "Object Oriented System Design",
  "24CSE694": "Information Security",
  "24CSE6104": "Mobile and Wireless Security",
  "24CSE6114": "Advanced Computer Architecture",
  "24CSE6134": "Medical Imaging",
  "24CSE6144": "Information Retrieval",
  "24CSE6164": "Computer Graphics",
  "24CSE6154": "Fuzzy Logic and Its Application",
  "24CSE615": "Natural Language Processing",
  "24CSE625": "Mobile Computing",
  "24CSE635": "Parallel Algorithms",
  "24CSE645": "Bioinformatics",
  "24CSE665": "Secure Coding",
  "24CSE675": "Social Networking and Security",
  "24CSE685": "High Performance Computing",
  "24CSE695": "IoT and Embedded Systems",
  "24CSE6125": "Internet of Things",
  "24CSE6135": "Remote Sensing and Applications",
  "24CSE6145": "Medical Image Analysis",
  "24CSI615": "Software Testing",
  "24CSI625": "Blockchain Technology",
  "24EST608": "Digital Image Processing",
  "24HUT609": "Entrepreneurship and Startups",
  "24CSH609": "Parallel Algorithms",
  "24CSH610": "Advanced Database System",
  "24CSH611": "Social Network Analytics",
  "24CSM609": "Concepts in Deep Learning",
  "24CSM610": "Software Project Management",
  "24CSP701": "Compiler Design",
  "24CSP702": "Cloud Computing",
  "24CSE713": "Speech Processing",
  "24CSE723": "Wireless and Mobile Communications",
  "24CSE733": "Software Reliability",
  "24CSE743": "Evolutionary Algorithms",
  "24CSE763": "Big Data Analytics",
  "24CSE773": "Web Mining",
  "24CSE793": "Digital Currency Programming",
  "24CSE7103": "Android Programming",
  "24CSE7123": "Ethical Hacking",
  "24CSE7153": "AWS Cloud Computing",
  "24CSE7163": "Soft Computing",
  "24CSO714": "Data Structures",
  "24CSO724": "Introduction to Soft Computing",
  "24CSO734": "Development of Mobile Apps",
  "24CSO744": "E-Commerce",
  "24CSI714": "Cyber Laws and Ethics",
  "24CSH709": "Evolutionary Algorithms",
  "24CSH710": "Advanced Computer Architecture",
  "24CSH711": "Time Series Analysis and Forecasting",
  "24CSE811": "Reinforcement Learning",
  "24CSE821": "Explainable AI",
  "24CSE831": "Mobile Ad Hoc Networks",
  "24CSE841": "Total Quality Management",
  "24CSE851": "Software Project Management",
  "24CSE861": "Swarm Intelligence",
  "24CSE871": "Social Network Analytics",
  "24CSE881": "Time Series Analysis and Forecasting",
  "24CSE891": "Quantum Computing",
  "24CSE8101": "Data Compression",
  "24CSE8111": "Cloud Security",
  "24CSE8121": "Cyber Forensics",
  "24CSE8131": "IoT Security",
  "24CSE8141": "Introduction to DevOps",
  "24CSE8151": "Augmented and Virtual Reality",
  "24CSO812": "Computer Graphics",
  "24CSO822": "Artificial Intelligence",
  "24CSO832": "Python Programming",
  "24CSO842": "Data Management and Analysis",
  "24CSO852": "Mobile Computing",
  "24CSO813": "Machine Learning",
  "24CSO823": "Scripting Languages",
  "24CSO833": "Database Management Systems",
  "24CSO843": "Computer Architecture",
  "24CSO853": "Big Data Analytics",
};

// Parse L-T-P-J-C from a credit string like "3   1 2 0 5 5        2024".
function parseCredits(courseName) {
  const m = courseName.replace(/\s+/g, " ").trim().match(/^(\d)\s+(\d)\s+(\d)\s+(\d)\s+(\d)\s+\d+\s+\d{4}$/);
  if (m) return Number(m[5]);
  return undefined;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanName(record) {
  const known = REAL_NAMES[`${record.program_id}-${record.course_code}`] ?? REAL_NAMES[record.course_code];
  if (known) return known;

  let name = record.course_name.replace(/\s+/g, " ").trim();
  name = name.replace(/\s+Introduction$/i, "").replace(/\s+Introductio$/i, "").trim();
  name = name.replace(/^(3|2|4|1)\s+\d\s+\d\s+\d\s+\d\s+\d*\s*\d*\s+\d{4}$/, "");
  name = name.trim();
  if (!name) return `Course ${record.course_code}`;
  // Title-case
  return name
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Module title/content extraction.
// ---------------------------------------------------------------------------

function norm(s) {
  return s.replace(/\s+/g, " ").trim();
}

// Clean a title: strip leading roman markers, colons, dashes, << >>, and
// wrapping parentheses (e.g. ": (Vector space)" -> "Vector space").
function cleanTitle(t) {
  let s = norm(String(t || ""));
  s = s.replace(/^[IVX]{1,4}\s*[:.)-]/, "").trim();
  s = s.replace(/^[:.\-–—]\s*/, "").trim();
  s = s.replace(/^<<|>>$/g, "").trim();
  s = s.replace(/[`]/g, "").trim();
  s = s.replace(/\(\s*(\d+)\s*(hours?|hrs?)\.?\)/gi, "($1 $2)").trim();
  if (/^\(.+\)$/.test(s)) s = s.slice(1, -1).trim();
  return s;
}

// Split a CS_AI COMPLETE module content string into {title, content}.
function splitAiContent(raw) {
  let c = norm(raw);

  let m = c.match(/^([IVX]{1,4})\s*[:.]/);
  if (m) c = c.slice(m[0].length).trim();
  else {
    m = c.match(/^([IVX]{1,4})\s+\(/);
    if (m) c = c.slice(m[0].length).trim();
  }

  m = c.match(/^<<([^>]+)>>\s*(.*)$/s);
  if (m) return { title: m[1].trim(), content: m[2].trim() };

  // "Title (N hours/hrs)" — before paren rules so the ")" of "(8 hrs)" stays in the title
  m = c.match(/^(.{3,70}?\(\d+\s*(?:hours?|hrs?)\.?\))\s+(.*)$/is);
  if (m) return { title: m[1].trim(), content: m[2].trim() };

  m = c.match(/^\(([^)]+)\)\s*(.*)$/s);
  if (m && !/^\(?(Text \d|Relevant|Refer)/.test(c)) return { title: m[1].trim(), content: m[2].trim() };

  // stray closing paren (from "I (Title)" after marker strip) — only when the
  // captured chunk contains no other parens (avoids cutting mid-sentence)
  m = c.match(/^([^()]+)\)\s+(.*)$/s);
  if (m) return { title: m[1].trim(), content: m[2].trim() };

  const boundary =
    c.match(/^(.{3,80}?)[.]\s+(.+)$/s) ||
    c.match(/^(.{3,110}?)[;]\s+(.+)$/s) ||
    c.match(/^(.{3,80}?)\s+[-–]\s+(.+)$/s) ||
    c.match(/^(.{3,80}?)[-–]\s+(.+)$/s) ||
    c.match(/^(.{3,80}?)[,]\s+(.+)$/s);
  if (boundary) return { title: boundary[1].trim(), content: boundary[2].trim() };

  return { title: c, content: c };
}

// Resolve a CS_AI module title: prefer the ACCURATE file title when it is
// consistent with the COMPLETE content, otherwise derive from the content.
const accByCode = aiAccRecords ? new Map(aiAccRecords.map((r) => [r.course_code, r])) : new Map();

function resolveAiModule(compContent, accMod) {
  const raw = norm(compContent || "");
  const derived = splitAiContent(raw);
  const derivedClean = cleanTitle(derived.title);
  if (accMod && accMod.title && accMod.title.trim()) {
    const accT = norm(String(accMod.title).replace(/^[IVX]{1,4}\s*[:.(]/, "").trim());
    const accC = norm(accMod.content || "");
    const consistent = raw.startsWith(accT) || raw.includes(accC);
    if (consistent) {
      const accClean = cleanTitle(accT);
      // Reject clearly-broken ACCURATE titles (blobs, truncated "(N" tokens,
      // near-empty) and prefer the derived title when it carries a closed
      // "(N hours)" token that the ACCURATE title lacks.
      const accBad = accClean.length < 3 || accClean.length > 90 || /\(\d+\s*$/.test(accClean);
      const derivedWinsOnHours = /\)$/.test(derivedClean) && !/\)$/.test(accClean);
      if (!accBad && !derivedWinsOnHours && accClean) {
        const content = raw.startsWith(accT)
          ? raw.slice(accT.length).replace(/^[,.;:\-–—\s]+/, "").trim()
          : accC;
        return { title: accClean, content: content || derived.content };
      }
    }
  }
  return { title: derivedClean, content: derived.content };
}

// ---------------------------------------------------------------------------
// Build subjects + module data.
// ---------------------------------------------------------------------------

const SUBJECT_SEMESTERS = { 3: "s3", 4: "s4", 5: "s5", 6: "s6", 7: "s7", 8: "s8" };

const seen = new Set();
const subjects = [];
const moduleMap = {};

// CSE records: proper module field, titles + clean content.
for (const rec of cseRecords) {
  const semesterId = SUBJECT_SEMESTERS[rec.semester];
  if (!semesterId) continue;
  const key = `CS-${rec.course_code}`;
  if (seen.has(key)) continue;
  seen.add(key);

  const name = cleanName({ ...rec, program_id: "CS" });
  const credits = parseCredits(rec.course_name) ?? 4;
  const baseSlug = toSlug(name) + "-cs";

  subjects.push({
    code: rec.course_code,
    slug: baseSlug,
    name,
    credits,
    semesterId,
    programId: "CS",
  });

  moduleMap[key] = rec.modules.map((m, i) => {
    let title = cleanTitle(m.title);
    let content = (m.content || "").trim();
    // repair source titles truncated at "(N" where content begins "hrs) ..."
    const hrsTail = content.match(/^(hours?|hrs?)\.?\s*(.*)$/is);
    if (/\(\d+\s*$/.test(title) && hrsTail) {
      title = cleanTitle(`${title} ${hrsTail[1]})`);
      content = (hrsTail[2] || "").replace(/^\)\s*/, "").trim();
    }
    if (!title) {
      // derive from leading parenthetical in content
      const paren = content.match(/^\(([^)]{2,80})\)/);
      title = paren ? paren[1].trim() : `Module ${i + 1}`;
      content = content.replace(/^\([^)]{2,80}\)\s*/, "");
    }
    return {
      id: `m${i + 1}`,
      number: i + 1,
      title: title || `Module ${i + 1}`,
      content,
    };
  });
}

// CS_AI records: array index = module order I-V; titles from ACCURATE (if
// valid) else derived from content; content always from COMPLETE source.
for (const rec of aiRecords) {
  const semesterId = SUBJECT_SEMESTERS[rec.semester];
  if (!semesterId) continue;
  const key = `CS_AI-${rec.course_code}`;
  if (seen.has(key)) continue;
  seen.add(key);

  const known = REAL_NAMES[`CS_AI-${rec.course_code}`] ?? REAL_NAMES[rec.course_code];
  const name = known || (rec.name && rec.name.trim() ? norm(rec.name) : cleanName({ ...rec, program_id: "CS_AI" }));
  const credits = 4;
  const baseSlug = toSlug(name) + "-ai";

  subjects.push({
    code: rec.course_code,
    slug: baseSlug,
    name,
    credits,
    semesterId,
    programId: "CS_AI",
  });

  const accRec = accByCode.get(rec.course_code);
  moduleMap[key] = rec.modules.map((m, i) => {
    const { title, content } = resolveAiModule(m.content || "", accRec ? accRec.modules[i] : null);
    return {
      id: `m${i + 1}`,
      number: i + 1,
      title: title || `Module ${i + 1}`,
      content: content || (m.content || "").trim(),
    };
  });
}

// Disambiguate slugs that collide within the same program+semester (e.g. two
// different "Advanced Database System" electives in S6) by appending the code.
{
  const used = new Map();
  for (const s of subjects) {
    const key = `${s.programId}-${s.semesterId}-${s.slug}`;
    if (used.has(key)) {
      const n = used.get(key) + 1;
      used.set(key, n);
      s.slug = `${s.slug}-${n}`;
    } else {
      used.set(key, 1);
    }
  }
}

const byProgram = {};
for (const s of subjects) byProgram[s.programId] = (byProgram[s.programId] || 0) + 1;
console.log("Imported subjects:");
console.log(JSON.stringify(byProgram, null, 2));

// Integrity checks
const csMissing = subjects.filter((s) => s.programId === "CS" && !moduleMap[`CS-${s.code}`]).length;
const aiMissing = subjects.filter((s) => s.programId === "CS_AI" && !moduleMap[`CS_AI-${s.code}`]).length;
console.log(`subjects missing modules: CS=${csMissing}, CS_AI=${aiMissing}`);
let shortModules = 0;
for (const key of Object.keys(moduleMap)) if (moduleMap[key].length !== 5) shortModules++;
console.log(`subjects without exactly 5 modules: ${shortModules}`);
let emptyContent = 0;
let emptyTitle = 0;
for (const key of Object.keys(moduleMap)) {
  for (const m of moduleMap[key]) {
    if (!m.content.trim()) emptyContent++;
    if (!m.title.trim()) emptyTitle++;
  }
}
console.log(`modules with empty content: ${emptyContent}, empty titles: ${emptyTitle}`);

// ---------------------------------------------------------------------------
// Emit lib/syllabusData.ts
// ---------------------------------------------------------------------------
function fmtSubjects(subjs) {
  return subjs
    .map(
      (s) =>
        `  { code: ${JSON.stringify(s.code)}, slug: ${JSON.stringify(s.slug)}, name: ${JSON.stringify(
          s.name
        )}, credits: ${s.credits}, semesterId: ${JSON.stringify(s.semesterId)}, programId: ${JSON.stringify(
          s.programId
        )} },`
    )
    .join("\n");
}

function fmtModuleMap(keys) {
  const lines = [];
  for (const key of keys) {
    const mods = moduleMap[key] || [];
    const modStr = mods
      .map(
        (m) =>
          `      { id: ${JSON.stringify(m.id)}, number: ${m.number}, title: ${JSON.stringify(
            m.title
          )}, content: ${JSON.stringify(m.content)} },`
      )
      .join("\n");
    lines.push(`  ${JSON.stringify(key)}: [\n${modStr}\n  ],`);
  }
  return lines.join("\n");
}

const csSubjects = subjects.filter((s) => s.programId === "CS");
const csAiSubjects = subjects.filter((s) => s.programId === "CS_AI");
const moduleKeys = Object.keys(moduleMap);

const out = `// AUTO-GENERATED by scripts/import-syllabus.mjs — DO NOT EDIT BY HAND.
// Source: data/syllabus/CSE_Core_S3-S8_2024_COMPLETE_SYLLABUS.json +
//         data/syllabus/CSE_AI_S3-S8_2024_COMPLETE_IMPORT.json (KTU 2024 scheme).
// Regenerate with: node scripts/import-syllabus.mjs

import { Subject, ProgramId } from "./types";

export interface SyllabusModule {
  id: string;
  number: number;
  title: string;
  content: string;
}

export const csSubjects: Subject[] = [
${fmtSubjects(csSubjects)}
];

export const csAiSubjects: Subject[] = [
${fmtSubjects(csAiSubjects)}
];

// programId + subjectCode -> official module/topic breakdown (raw syllabus).
export const syllabusModules: Record<string, SyllabusModule[]> = {
${fmtModuleMap(moduleKeys)}
};
`;

const outPath = join(ROOT, "lib", "syllabusData.ts");
writeFileSync(outPath, out, "utf8");
console.log(`\nWrote ${outPath}`);
console.log(`CS subjects: ${csSubjects.length}, CS_AI subjects: ${csAiSubjects.length}`);