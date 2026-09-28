import { getSubjectContent } from "@/lib/notes";
import type { ProgramId } from "@/lib/types";
import type { SyllabusMatch, SyllabusModule } from "./types";

function titlesOverlap(a: string, b: string): boolean {
  const x = a.toLowerCase().trim();
  const y = b.toLowerCase().trim();
  if (!x || !y) return false;
  return x.includes(y) || y.includes(x);
}

export function matchSyllabus(programId: ProgramId, subjectCode: string, modules: SyllabusModule[]): SyllabusMatch {
  const content = getSubjectContent(subjectCode, programId);
  const perModule = modules.map((m) => {
    const note = content?.modules.find((w) => w.id === m.moduleCode || titlesOverlap(w.title, m.title));
    const pyqs = note?.examFocus.length ?? 0;
    return { moduleCode: m.moduleCode, title: m.title, hasNotes: Boolean(note), pyqs, topics: m.topics.length };
  });
  return {
    modulesTotal: modules.length,
    modulesWithNotes: perModule.filter((m) => m.hasNotes).length,
    topicsTotal: perModule.reduce((n, m) => n + m.topics, 0),
    pyqTotal: perModule.reduce((n, m) => n + m.pyqs, 0),
    perModule,
  };
}
