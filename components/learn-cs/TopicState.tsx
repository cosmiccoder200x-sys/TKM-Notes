"use client";

import { useState, useEffect } from "react";
import { LearningState, LEARNING_STATE_ORDER } from "@/lib/learn-cs/types";
import { getTopicState, setTopicState } from "@/lib/learn-cs/progress";

const STATE_META: Record<LearningState, { label: string; active: string }> = {
  "not-started": { label: "Not Started", active: "border-bg-border text-ink-faint" },
  learning: { label: "Learning", active: "border-signal text-signal bg-signal/10" },
  understood: { label: "Understood", active: "border-weight text-weight bg-weight/10" },
  practiced: { label: "Practiced", active: "border-signal-dim text-signal bg-signal/10" },
  mastered: { label: "Mastered", active: "border-critical text-critical bg-critical/10" },
};

export default function TopicState({ subjectSlug, topicSlug }: { subjectSlug: string; topicSlug: string }) {
  const [state, setState] = useState<LearningState>("not-started");

  useEffect(() => {
    setState(getTopicState(subjectSlug, topicSlug));
  }, [subjectSlug, topicSlug]);

  const index = LEARNING_STATE_ORDER.indexOf(state);
  const percent = (index / (LEARNING_STATE_ORDER.length - 1)) * 100;

  function select(next: LearningState) {
    setState(next);
    setTopicState(subjectSlug, topicSlug, next);
  }

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">My progress</span>
        <span className="font-mono text-[11px] text-signal uppercase tracking-wider">{STATE_META[state].label}</span>
      </div>

      <div className="progress-bar">
        <span className="progress-signal" style={{ width: `${percent}%` }} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {LEARNING_STATE_ORDER.map((s) => {
          const meta = STATE_META[s];
          const active = s === state;
          return (
            <button
              key={s}
              type="button"
              onClick={() => select(s)}
              className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-card border transition-colors ${
                active ? meta.active : "border-bg-border text-ink-faint hover:text-ink-hi hover:border-ink-faint"
              }`}
            >
              {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}