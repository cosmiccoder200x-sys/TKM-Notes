"use client";

import { useState } from "react";
import { LearnSubject, LearnTopic } from "@/lib/learn-cs/types";
import { advanceTopicState, setTopicState } from "@/lib/learn-cs/progress";
import { AttemptResult } from "@/lib/study";

type PracticeItemState = "pending" | "revealed" | "rated";

// Practice panel for a Learn CS topic. Mirrors the P1 SelfCheck interaction
// (reveal then self-rate) but persists to the learn-cs store — never mixes with
// branch progress. Scoring advances the topic state toward "practiced".
export default function PracticePanel({
  subject,
  topic,
}: {
  subject: LearnSubject;
  topic: LearnTopic;
}) {
  const items = topic.practice ?? [];
  const [states, setStates] = useState<PracticeItemState[]>(() => items.map(() => "pending"));
  const [ratings, setRatings] = useState<(AttemptResult | null)[]>(() => items.map(() => null));
  const [advanceNotice, setAdvanceNotice] = useState<string | null>(null);

  if (items.length === 0) return null;

  function rate(i: number, result: AttemptResult) {
    const nextStates = [...states];
    const nextRatings = [...ratings];
    nextStates[i] = "rated";
    nextRatings[i] = result;
    setStates(nextStates);
    setRatings(nextRatings);

    if (result === "correct") {
      const advanced = advanceTopicState(subject.slug, topic.slug);
      setAdvanceNotice(
        advanced === "mastered"
          ? "Nice — topic marked mastered."
          : `Nice — state advanced to "${advanced}".`
      );
    } else {
      setTopicState(subject.slug, topic.slug, "learning");
      setAdvanceNotice("Recorded — this one needs another pass. Add it to revision.");
    }
  }

  const rated = states.filter((s) => s === "rated").length;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Practice</span>
          <h3 className="font-display font-semibold text-ink-hi text-lg">Make it stick</h3>
          <p className="text-xs text-ink-lo leading-relaxed">
            Attempt each one, then be honest about how it went. Your answers update your progress.
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          {rated}/{items.length} done
        </span>
      </div>

      {advanceNotice && (
        <p className="font-mono text-[11px] text-signal">{advanceNotice}</p>
      )}

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border border-bg-border rounded-card p-3.5 space-y-2.5">
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[10px] text-signal shrink-0 mt-0.5">P{i + 1}</span>
              <p className="text-sm text-ink-hi leading-relaxed">{item}</p>
            </div>

            {states[i] === "pending" && (
              <button
                type="button"
                onClick={() => {
                  const next = [...states];
                  next[i] = "revealed";
                  setStates(next);
                }}
                className="ml-6 text-xs font-mono text-signal hover:text-ink-hi"
              >
                I attempted it — reveal rating →
              </button>
            )}

            {states[i] === "revealed" && (
              <div className="ml-6 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-ink-faint">How did you do?</span>
                {(
                  [
                    { r: "correct" as AttemptResult, label: "Got it", cls: "border-signal-dim text-signal hover:bg-signal/10" },
                    { r: "partial" as AttemptResult, label: "Almost", cls: "border-weight-dim text-weight hover:bg-weight/10" },
                    { r: "incorrect" as AttemptResult, label: "Missed it", cls: "border-critical/40 text-critical hover:bg-critical/10" },
                  ]
                ).map((opt) => (
                  <button
                    key={opt.r}
                    type="button"
                    onClick={() => rate(i, opt.r)}
                    className={`px-2.5 py-1 rounded-md border transition-colors ${opt.cls}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {states[i] === "rated" && (
              <p className="ml-6 font-mono text-[11px] text-ink-lo">
                {ratings[i] === "correct"
                  ? "Recorded — good work."
                  : ratings[i] === "partial"
                    ? "Recorded — a quick re-read will seal it."
                    : "Recorded — flagged for revision."}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}