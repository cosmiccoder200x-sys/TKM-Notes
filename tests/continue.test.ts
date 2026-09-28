import { describe, it, expect } from "vitest";
import {
  MODE_FOR_TASK,
  TASK_LABEL,
  continueHref,
  practiceHref,
  pyqsHref,
  aiStudyHref,
  revisionHref,
} from "@/lib/learning/continue";
import type { RecommendedAction } from "@/lib/learning";

function actionFor(task: RecommendedAction["task"]): RecommendedAction {
  return {
    task,
    topicRef: "ER:24ERP304:m1:0",
    topicTitle: "Arrays",
    moduleId: "m1",
    moduleTitle: "Intro",
    reason: "test",
    sessionMinutes: 45,
  };
}

describe("continue learning links", () => {
  it("maps every task to a prompt-lab mode", () => {
    expect(Object.keys(MODE_FOR_TASK).sort()).toEqual(["exam", "fix", "practice", "recall", "teach"]);
    for (const task of Object.keys(MODE_FOR_TASK) as RecommendedAction["task"][]) {
      expect(TASK_LABEL[task].length).toBeGreaterThan(0);
    }
  });

  it("continueHref points at prompt-lab with the mapped mode and subject context", () => {
    const href = continueHref(actionFor("teach"), "ER", "24ERP304", "data-structures-and-algorithms");
    expect(href).toContain("/prompt-lab");
    expect(href).toContain("mode=learn");
    expect(href).toContain("subject=data-structures-and-algorithms");
    const fix = continueHref(actionFor("fix"), "ER", "24ERP304");
    expect(fix).toContain("mode=mistake-fixer");
  });

  it("tool hrefs stay program-scoped", () => {
    expect(practiceHref("CS_AI", "s3", "24CSP304")).toContain("program=cse-ai");
    expect(practiceHref("CS_AI", "s3", "24CSP304")).toContain("subject=24CSP304");
    expect(pyqsHref("ER", "s3", "24ERP304")).toContain("/pyqs");
    expect(aiStudyHref("ER", "s3", "24ERP304")).toContain("/ai-study");
    expect(revisionHref("ER", "24ERP304")).toContain("/night-before");
  });
});
