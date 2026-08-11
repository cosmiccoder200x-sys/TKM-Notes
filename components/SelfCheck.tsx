"use client";

import { useState } from "react";
import { SelfCheckItem } from "@/lib/types";
import { recordAttempt, AttemptResult } from "@/lib/study";

export default function SelfCheck({
  item,
  index,
  subjectCode,
  moduleId,
}: {
  item: SelfCheckItem;
  index: number;
  subjectCode?: string;
  moduleId?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const [rated, setRated] = useState<AttemptResult | null>(null);

  function rate(result: AttemptResult) {
    if (!subjectCode || !moduleId) return;
    recordAttempt(subjectCode, moduleId, result);
    setRated(result);
  }

  const canRecord = Boolean(subjectCode && moduleId);

  return (
    <div className="border border-bg-border rounded-card p-3">
      <div className="flex items-start gap-2 mb-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-signal shrink-0 mt-0.5">
          Q{index + 1}
        </span>
        <span className="text-sm text-ink-hi leading-relaxed">{item.question}</span>
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="text-xs font-mono text-signal hover:text-ink-hi ml-6"
        >
          Tap to check yourself →
        </button>
      ) : (
        <div className="ml-6 space-y-2">
          <div className="bg-bg-surface border border-bg-border rounded-md p-3">
            <p className="text-sm text-ink-hi leading-relaxed">{item.answer}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {canRecord && rated === null && (
              <>
                <span className="text-ink-faint">How did you do?</span>
                {([
                  { r: "correct", label: "Got it", cls: "border-signal-dim text-signal hover:bg-signal/10" },
                  { r: "partial", label: "Almost", cls: "border-weight-dim text-weight hover:bg-weight/10" },
                  { r: "incorrect", label: "Missed it", cls: "border-critical/40 text-critical hover:bg-critical/10" },
                ] as { r: AttemptResult; label: string; cls: string }[]).map((opt) => (
                  <button
                    key={opt.r}
                    onClick={() => rate(opt.r)}
                    className={`px-2.5 py-1 rounded-md border transition-colors ${opt.cls}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </>
            )}
            {canRecord && rated !== null && (
              <span className="text-ink-lo">
                {rated === "correct" ? "Recorded ✓" : rated === "partial" ? "Recorded ~" : "Recorded ✗"} — mastery updated
              </span>
            )}
            <button
              onClick={() => {
                setRevealed(false);
                setRated(null);
              }}
              className="ml-auto text-ink-faint hover:text-ink-hi"
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
