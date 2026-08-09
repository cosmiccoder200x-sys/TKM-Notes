import { subjects } from "./content";
import registry from "./notes";

export interface SearchHit {
  subjectCode: string;
  subjectName: string;
  semesterId: string;
  subjectSlug: string;
  moduleId?: string;
  moduleTitle?: string;
  matchType: "subject" | "module" | "definition" | "concept" | "formula" | "question";
  snippet: string;
}

// Builds a flat list once; cheap enough to redo on every search given the data size.
export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: SearchHit[] = [];

  for (const subject of subjects) {
    if (subject.name.toLowerCase().includes(q) || subject.code.toLowerCase().includes(q)) {
      hits.push({
        subjectCode: subject.code,
        subjectName: subject.name,
        semesterId: subject.semesterId,
        subjectSlug: subject.slug,
        matchType: "subject",
        snippet: subject.name,
      });
    }

    const content = registry[subject.code];
    if (!content) continue;

    for (const mod of content.modules) {
      if (mod.title.toLowerCase().includes(q)) {
        hits.push({
          subjectCode: subject.code,
          subjectName: subject.name,
          semesterId: subject.semesterId,
          subjectSlug: subject.slug,
          moduleId: mod.id,
          moduleTitle: mod.title,
          matchType: "module",
          snippet: mod.title,
        });
      }

      for (const def of mod.definitions) {
        if (def.term.toLowerCase().includes(q) || def.definition.toLowerCase().includes(q)) {
          hits.push({
            subjectCode: subject.code,
            subjectName: subject.name,
            semesterId: subject.semesterId,
            subjectSlug: subject.slug,
            moduleId: mod.id,
            moduleTitle: mod.title,
            matchType: "definition",
            snippet: `${def.term}: ${def.definition}`,
          });
        }
      }

      for (const concept of mod.coreConcepts) {
        if (concept.toLowerCase().includes(q)) {
          hits.push({
            subjectCode: subject.code,
            subjectName: subject.name,
            semesterId: subject.semesterId,
            subjectSlug: subject.slug,
            moduleId: mod.id,
            moduleTitle: mod.title,
            matchType: "concept",
            snippet: concept,
          });
        }
      }

      for (const f of mod.formulas) {
        if (
          f.name.toLowerCase().includes(q) ||
          f.expression.toLowerCase().includes(q) ||
          (f.note ?? "").toLowerCase().includes(q)
        ) {
          hits.push({
            subjectCode: subject.code,
            subjectName: subject.name,
            semesterId: subject.semesterId,
            subjectSlug: subject.slug,
            moduleId: mod.id,
            moduleTitle: mod.title,
            matchType: "formula",
            snippet: `${f.name}: ${f.expression}`,
          });
        }
      }

      for (const qItem of mod.examFocus) {
        if (qItem.question.toLowerCase().includes(q)) {
          hits.push({
            subjectCode: subject.code,
            subjectName: subject.name,
            semesterId: subject.semesterId,
            subjectSlug: subject.slug,
            moduleId: mod.id,
            moduleTitle: mod.title,
            matchType: "question",
            snippet: qItem.question,
          });
        }
      }
    }
  }

  return hits.slice(0, 40);
}
