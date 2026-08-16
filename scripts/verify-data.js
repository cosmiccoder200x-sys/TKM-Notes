// P2 acceptance checks for the Learn CS catalog.
// Usage: node scripts/verify-data.js
// Extends the syllabus checks with Learn CS invariants:
//   - expected subject count (30)
//   - no duplicate subject slugs
//   - every subject prerequisite resolves to a known subject
//   - no duplicate topic slugs within a subject
//   - every topic prerequisite resolves within the same subject
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join("lib", "learn-cs", "data");
const FILES = [
  "programming.ts",
  "cs-fundamentals.ts",
  "math.ts",
  "development.ts",
  "ai-data.ts",
  "advanced.ts",
];

let failures = 0;
function check(name, cond, detail) {
  const ok = Boolean(cond);
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

function parseList(str) {
  const out = [];
  const re = /"([^"]+)"/g;
  let m;
  while ((m = re.exec(str))) out.push(m[1]);
  return out;
}

const subjects = [];

for (const file of FILES) {
  const content = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
  const chunks = content.split(/\n\s{2}\{\n\s{4}slug: "/).slice(1);
  for (const chunk of chunks) {
    const slug = chunk.match(/^([^"]+)/)?.[1];
    const name = chunk.match(/name: "([^"]+)"/)?.[1];
    const prereqMatch = chunk.match(/prerequisites: \[([\s\S]*?)\]/);
    const prereqs = prereqMatch ? parseList(prereqMatch[1]) : [];

    const topicChunks = chunk.split(/\n\s{10}\{\n\s{12}slug: "/).slice(1);
    const topics = topicChunks.map((t) => {
      const tSlug = t.match(/^([^"]+)/)?.[1];
      const tPrereqMatch = t.match(/prerequisites: \[([\s\S]*?)\]/);
      return { slug: tSlug, prereqs: tPrereqMatch ? parseList(tPrereqMatch[1]) : [] };
    });

    subjects.push({ slug, name, prereqs, topics });
  }
}

check("Learn CS subject count = 30", subjects.length === 30, `got ${subjects.length}`);

const slugSet = new Set(subjects.map((s) => s.slug));
const dupSlugs = [];
for (const s of subjects) {
  if (slugSet.has(s.slug)) {
    slugSet.delete(s.slug);
  } else {
    dupSlugs.push(s.slug);
  }
}
check("no duplicate Learn CS subject slugs", dupSlugs.length === 0, `${dupSlugs.length} dupes`);

const allSlugs = new Set(subjects.map((s) => s.slug));
const dangling = [];
for (const s of subjects) {
  for (const p of s.prereqs) if (!allSlugs.has(p)) dangling.push(`${s.slug} → ${p}`);
}
check("every subject prerequisite resolves", dangling.length === 0, dangling.join(", "));

const dupTopics = [];
const orphanTopics = [];
for (const s of subjects) {
  const seen = new Set();
  for (const t of s.topics) {
    if (seen.has(t.slug)) dupTopics.push(`${s.slug}/${t.slug}`);
    seen.add(t.slug);
  }
  const known = new Set(s.topics.map((t) => t.slug));
  for (const t of s.topics) {
    for (const p of t.prereqs) if (!known.has(p)) orphanTopics.push(`${s.slug}/${t.slug} → ${p}`);
  }
}
check("no duplicate topic slugs within a subject", dupTopics.length === 0, dupTopics.join(", "));
check("every topic prerequisite resolves within its subject", orphanTopics.length === 0, orphanTopics.join(", "));

const emptySubjects = subjects.filter((s) => s.topics.length === 0);
check("every subject has at least one topic", emptySubjects.length === 0, emptySubjects.map((s) => s.slug).join(", "));

const topicTotal = subjects.reduce((n, s) => n + s.topics.length, 0);
console.log(`\nLearn CS: ${subjects.length} subjects, ${topicTotal} topics.`);

// Cross-link integrity: subject-level targets must exist in the TKM syllabus
// (ER from content.ts, CS/CS_AI from syllabusData.ts); topic-level links must
// reference a learn-cs subject+topic that exists and, for CS/CS_AI, a module
// that exists in the generated syllabus data (ER has no generated modules).
const syllabusSrc = fs.readFileSync("lib/syllabusData.ts", "utf8");
const contentSrc = fs.readFileSync("lib/content.ts", "utf8");

const syllabusCodeRe = /^\s*"((CS|CS_AI)-[A-Z0-9]+)": \[/gm;
const syllabusCodes = new Set();
let sc;
while ((sc = syllabusCodeRe.exec(syllabusSrc))) syllabusCodes.add(sc[1].split("-")[1]);

const erCodeRe = /code: "([^"]+)", slug: "[^"]+", name: "[^"]+", credits: [^,]+(?:, semesterId: "[^"]+")?, programId: "ER"/g;
const allCodes = new Set(syllabusCodes);
let ec;
while ((ec = erCodeRe.exec(contentSrc))) allCodes.add(ec[1]);

const syllabusObjRe = /^\s*"((CS|CS_AI)-[A-Z0-9]+)": \[[\s\S]*?\n\s*\],/gm;
const modulesBySubject = {};
let mo;
while ((mo = syllabusObjRe.exec(syllabusSrc))) {
  const key = mo[1];
  const body = mo[0];
  const modRe = /id: "m\d+"/g;
  const mods = new Set();
  let mm;
  while ((mm = modRe.exec(body))) mods.add(mm[0].slice(5, -1));
  modulesBySubject[key.split("-")[1]] = mods;
}

const linksSrc = fs.readFileSync(path.join("lib", "learn-cs", "syllabus.ts"), "utf8");
const subjLinksRe = /"([a-z0-9-]+)": \[\s*\{(.*?)\}\]/gs;
let sl;
const brokenSubjLinks = [];
while ((sl = subjLinksRe.exec(linksSrc))) {
  const learnSlug = sl[1];
  if (!allSlugs.has(learnSlug)) brokenSubjLinks.push(`${learnSlug} (unknown learn-cs subject)`);
  const codeRe = /subjectCode: "([^"]+)"/g;
  let cm;
  while ((cm = codeRe.exec(sl[2]))) {
    if (!allCodes.has(cm[1])) brokenSubjLinks.push(`${learnSlug} → ${cm[1]} (not in syllabus)`);
  }
}
check("every subject-level cross-link target exists", brokenSubjLinks.length === 0, brokenSubjLinks.join(", "));

const topicLinksRe = /"([a-z0-9-]+\/[a-z0-9-]+)": \{([\s\S]*?)\n\s*\},/g;
let tl;
const brokenTopicLinks = [];
while ((tl = topicLinksRe.exec(linksSrc))) {
  const [learnSlug, topicSlug] = tl[1].split("/");
  const subject = subjects.find((s) => s.slug === learnSlug);
  if (!subject) {
    brokenTopicLinks.push(`${learnSlug}/${topicSlug} (unknown learn-cs subject)`);
    continue;
  }
  if (!subject.topics.some((t) => t.slug === topicSlug)) {
    brokenTopicLinks.push(`${learnSlug}/${topicSlug} (unknown topic)`);
    continue;
  }
  const codeRe = /subjectCode: "([^"]+)", moduleId: "([^"]+)"/g;
  let cm;
  while ((cm = codeRe.exec(tl[2]))) {
    if (!allCodes.has(cm[1])) {
      brokenTopicLinks.push(`${tl[1]} → ${cm[1]} (not in syllabus)`);
      continue;
    }
    // ER has no generated module breakdown — skip the moduleId check there.
    const isCS = syllabusCodes.has(cm[1]);
    if (!isCS) continue;
    const mods = modulesBySubject[cm[1]];
    if (!mods || !mods.has(cm[2])) brokenTopicLinks.push(`${tl[1]} → ${cm[1]}:${cm[2]} (module not found)`);
  }
}
check("every topic-level cross-link target exists", brokenTopicLinks.length === 0, brokenTopicLinks.join(", "));