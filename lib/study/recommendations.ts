// "What should I study next?" — ranks modules by weakness + exam importance.
// Becomes the bridge toward the exam score optimizer.

import registry from "@/lib/notes";
import { ProgressMap, MasteryStatus } from "./types";
import { calculateModuleMastery, masteryLabel } from "./mastery";

export interface StudyRecommendation {
  moduleId: string;
  moduleTitle: string;
  score: number | null;
  status: MasteryStatus;
  statusLabel: string;
  reasons: string[];
  priority: number;
}

// Exam importance band derived from real weightage metadata (never invented).
function examBand(module: { examFocus: { weightage: string }[] }): "High" | "Medium" | "Low" {
  let high = 0;
  let med = 0;
  for (const q of module.examFocus) {
    if (q.weightage === "high") high += 1;
    else if (q.weightage === "medium") med += 1;
  }
  if (high >= 2) return "High";
  if (high === 1 || med >= 2) return "Medium";
  return "Low";
}

export function getSubjectRecommendations(
  subjectCode: string,
  progress?: ProgressMap
): StudyRecommendation[] {
  const content = registry[subjectCode];
  if (!content) return [];

  const recs: StudyRecommendation[] = content.modules.map((module) => {
    const mastery = calculateModuleMastery(progress?.[subjectCode]?.[module.id]);
    const band = examBand(module);
    const reasons: string[] = [];

    if (mastery.status === "weak") reasons.push("Weak");
    if (mastery.status === "needs-practice") reasons.push("Needs practice");
    if (mastery.status === "not-assessed") reasons.push("Not assessed yet");
    if (band === "High") reasons.push("High exam importance");
    if (band === "Medium") reasons.push("Medium exam importance");
    if (reasons.length === 0) reasons.push("Solid foundation");

    const weaknessRank = mastery.score === null ? 60 : 100 - mastery.score;
    const importanceRank = band === "High" ? 40 : band === "Medium" ? 20 : 0;

    return {
      moduleId: module.id,
      moduleTitle: module.title,
      score: mastery.score,
      status: mastery.status,
      statusLabel: masteryLabel(mastery.status),
      reasons,
      priority: weaknessRank + importanceRank,
    };
  });

  // Weak modules first, then not-assessed, then by priority.
  return recs.sort((a, b) => {
    const order: Record<string, number> = { weak: 0, "not-assessed": 1, "needs-practice": 2, good: 3, strong: 4 };
    const diff = (order[a.status] ?? 5) - (order[b.status] ?? 5);
    return diff !== 0 ? diff : b.priority - a.priority;
  });
}

export function getTopRecommendation(subjectCode: string, progress?: ProgressMap): StudyRecommendation | undefined {
  return getSubjectRecommendations(subjectCode, progress)[0];
}
