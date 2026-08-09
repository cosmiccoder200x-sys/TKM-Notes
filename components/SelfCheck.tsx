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
        <span className="font-mono text-[11px] text-ink-faint shrink-0 mt-0.5">Q{index + 1}</span>
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
        <div className="ml-6 bg-bg-raised border border-bg-border rounded-card p-2.5">
          <div className="text-sm text-ink-hi leading-relaxed">{item.answer}</div>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {canRecord && rated === null && (
              <>
                <span className="text-[11px] font-mono text-ink-faint mr-1">How did you do?</span>
                {(
                  [
                    { r: "correct", label: "Got it", cls: "border-signal-dim text-signal hover:bg-signal/10" },
                    { r: "partial", label: "Almost", cls: "border-weight-dim text-weight hover:bg-weight/10" },
                    { r: "incorrect", label: "Missed it", cls: "border-bg-border text-critical hover:bg-critical/10" },
                  ] as { r: AttemptResult; label: string; cls: string }[]
                ).map((opt) => (
                  <button
                    key={opt.r}
                    onClick={() => rate(opt.r)}
                    className={`text-xs font-mono px-2.5 py-1 rounded-card border transition-colors ${opt.cls}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </>
            )}
            {canRecord && rated !== null && (
              <span className="text-[11px] font-mono text-ink-lo">
                {rated === "correct" ? "Recorded ✓" : rated === "partial" ? "Recorded ~" : "Recorded ✗"} — mastery updated
              </span>
            )}
            <button
              onClick={() => {
                setRevealed(false);
                setRated(null);
              }}
              className="text-xs text-ink-faint hover:text-ink-lo ml-auto"
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
