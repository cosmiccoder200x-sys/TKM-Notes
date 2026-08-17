const fs = require("fs");
const content = fs.readFileSync("lib/syllabusData.ts", "utf8");
const re = /code: "([^"]+)", slug: "([^"]+)", name: "([^"]+)", credits: ([^,]+), semesterId: "([^"]+)", programId: "([^"]+)" /g;
const subs = [];
let m;
while ((m = re.exec(content))) {
  subs.push({ code: m[1], slug: m[2], name: m[3], credits: m[4], semesterId: m[5], programId: m[6] });
}
// duplicate slug within same program+semester?
const key = {};
for (const s of subs) {
  const k = `${s.programId}-${s.semesterId}-${s.slug}`;
  key[k] = (key[k] || 0) + 1;
}
const bad = Object.entries(key).filter(([, v]) => v > 1);
console.log("same-program-semester slug collisions:", bad.length ? JSON.stringify(bad) : "none");
// duplicate code within same program?
const ck = {};
for (const s of subs) {
  const k = `${s.programId}-${s.code}`;
  ck[k] = (ck[k] || 0) + 1;
}
const badc = Object.entries(ck).filter(([, v]) => v > 1);
console.log("same-program code collisions:", badc.length ? JSON.stringify(badc) : "none");
// count per program
const pc = {};
for (const s of subs) pc[s.programId] = (pc[s.programId] || 0) + 1;
console.log("per-program counts:", JSON.stringify(pc));
// sample check for a known name
const dsa = subs.filter((s) => s.code === "24CSP304");
console.log("24CSP304:", JSON.stringify(dsa));