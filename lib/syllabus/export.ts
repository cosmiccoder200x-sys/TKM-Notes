import type { SyllabusVersion } from "./types";

export function syllabusToText(version: SyllabusVersion, subjectName: string, subjectCode: string): string {
  const lines = [`${subjectName} (${subjectCode})`, ""];
  for (const m of version.modules) {
    lines.push(`Module ${m.number}: ${m.title}`);
    if (m.topics.length > 0) {
      for (const t of m.topics) lines.push(`- ${t.title}`);
    } else if (m.content && m.content.trim().length > 0) {
      lines.push(m.content.trim());
    }
    lines.push("");
  }
  return lines.join("\n").trim();
}
