"use client";

import Link from "next/link";
import { TypingResult } from "@/lib/typing/types";
import { weakKeysFromStats, scoreOf } from "@/lib/typing/engine";
import { categoryMeta } from "@/lib/typing/catalog";

interface TypingResultsProps {
  result: TypingResult;
  previousBestWpm: number;
  previousBestScore: number;
  onTryAgain: () => void;
  onNewTest: () => void;
  onPracticeWeakKeys: (chars: string[]) => void;
}

export default function TypingResults({
  result,
  previousBestWpm,
  previousBestScore,
  onTryAgain,
  onNewTest,
  onPracticeWeakKeys,
}: TypingResultsProps) {
  const weakKeys = weakKeysFromStats([result.charStats]).filter((k) => k.errorRate > 0);
  const isBest = previousBestWpm > 0 ? result.wpm > previousBestWpm : result.wpm > 0;
  const improvement =
    previousBestWpm > 0
      ? ((result.wpm - previousBestWpm) / previousBestWpm) * 100
      : 0;
  const newScore = scoreOf(result);
  const scoreImproved = previousBestScore > 0 ? newScore > previousBestScore : true;

  return (
    <div className="space-y-8 text-center">
      <div>
        <div className="eyebrow mb-3">Your result</div>
        <div className="font-display font-bold text-6xl text-ink-hi mb-2">
          {result.wpm}
          <span className="text-2xl text-ink-faint ml-2">WPM</span>
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-ink-lo">
          {result.accuracy.toFixed(1)}% accuracy · {result.errors} errors ·{" "}
          {result.targetDuration != null
            ? `${result.targetDuration}s`
            : `${Math.round(result.duration)}s`}
          {result.category != null && (
            <>
              {" · "}
              {categoryMeta(result.category).label}
            </>
          )}
          {result.learningLabel != null && (
            <span className="text-signal"> · {result.learningLabel}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {[
          { label: "Correct", value: result.correctChars },
          { label: "Incorrect", value: result.incorrectChars },
          { label: "Total", value: result.totalChars },
        ].map((s) => (
          <div key={s.label} className="card px-3 py-3">
            <div className="font-display font-semibold text-xl text-ink-hi">{s.value}</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="card max-w-md mx-auto px-5 py-4 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-lo">Previous best</span>
          <span className="font-mono text-ink-hi">{previousBestWpm || "—"} WPM</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1.5">
          <span className="text-ink-lo">New personal best</span>
          <span className={`font-mono ${isBest ? "text-signal" : "text-ink-hi"}`}>
            {isBest ? result.wpm : previousBestWpm || "—"} WPM
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1.5">
          <span className="text-ink-lo">Improvement</span>
          <span className={`font-mono ${improvement >= 0 ? "text-ink-hi" : "text-ink-faint"}`}>
            {previousBestWpm > 0 ? `${improvement >= 0 ? "+" : ""}${improvement.toFixed(1)}%` : "—"}
          </span>
        </div>
        {scoreImproved && (
          <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-signal">
            New best score {newScore}
          </div>
        )}
      </div>

      {weakKeys.length > 0 && (
        <div className="max-w-md mx-auto">
          <div className="eyebrow mb-3">Weak keys in this test</div>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {weakKeys.slice(0, 5).map((k) => (
              <span key={k.char} className="chip border-critical text-critical">
                {k.char === " " ? "SPACE" : k.char} — {k.errorRate}%
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onPracticeWeakKeys(weakKeys.slice(0, 3).map((k) => k.char))}
            className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-md border border-signal text-signal hover:bg-signal/10 transition-colors"
          >
            Practice Weak Keys
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onTryAgain}
          className="font-mono text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-md bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={onNewTest}
          className="font-mono text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-md border border-bg-border text-ink-hi hover:border-signal/40 hover:text-signal transition-colors"
        >
          New Test
        </button>
        <Link
          href="/typing/history"
          className="font-mono text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-md border border-bg-border text-ink-hi hover:border-signal/40 hover:text-signal transition-colors"
        >
          View History
        </Link>
      </div>
    </div>
  );
}
