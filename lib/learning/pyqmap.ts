import { topicId } from "@/lib/domain";
import { getQuestionBank } from "@/lib/pyqs";
import { getEffectiveModules } from "@/lib/syllabus";
import type { ProgramId } from "@/lib/types";

export interface TopicPyqLink {
  topicRef: string;
  moduleCode: string;
  topicIndex: number | null;
  topicTitle: string;
  pyqId: string;
  question: string;
  weightage: "low" | "medium" | "high";
  kind: "actual";
}

const STOP = new Set(
  "the,a,an,of,in,on,and,or,to,for,with,using,explain,describe,derive,determine,define,compare,discuss,write,find,give,what,why,how,when,which,its,by,from,as,at,is,are,be,into,over,under,between,through,using".split(",")
);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function overlapScore(question: string, title: string): number {
  const q = new Set(tokens(question));
  if (q.size === 0) return 0;
  const t = new Set(tokens(title));
  let shared = 0;
  for (const w of t) if (q.has(w)) shared += 1;
  if (shared < 2) return 0;
  return shared / Math.max(q.size, 1);
}

export function mapPyqsToTopics(programId: ProgramId, subjectCode: string): TopicPyqLink[] {
  const subjectKey = `${programId}:${subjectCode}`;
  const modules = getEffectiveModules(programId, subjectCode);
  const bank = getQuestionBank().filter((q) => q.programId === programId && q.subjectCode === subjectCode);
  if (modules.length === 0 || bank.length === 0) return [];

  const links: TopicPyqLink[] = [];
  for (const entry of bank) {
    let best: { ref: string; moduleCode: string; topicIndex: number | null; title: string; score: number } | null = null;
    for (const m of modules) {
      if (m.topics.length > 0) {
        m.topics.forEach((t, j) => {
          const score = overlapScore(entry.question, t.title);
          if (score > 0 && (!best || score > best.score)) {
            best = { ref: topicId(subjectKey, m.moduleCode, j), moduleCode: m.moduleCode, topicIndex: j, title: t.title, score };
          }
        });
      } else {
        const score = overlapScore(entry.question, m.title);
        if (score > 0 && (!best || score > best.score)) {
          best = { ref: `${subjectKey}:${m.moduleCode}`, moduleCode: m.moduleCode, topicIndex: null, title: m.title, score };
        }
      }
    }
    if (best) {
      links.push({
        topicRef: best.ref,
        moduleCode: best.moduleCode,
        topicIndex: best.topicIndex,
        topicTitle: best.title,
        pyqId: entry.id,
        question: entry.question,
        weightage: entry.weightage,
        kind: "actual",
      });
    }
  }
  return links;
}

export function topicPyqCounts(programId: ProgramId, subjectCode: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const link of mapPyqsToTopics(programId, subjectCode)) {
    counts.set(link.topicRef, (counts.get(link.topicRef) ?? 0) + 1);
  }
  return counts;
}
