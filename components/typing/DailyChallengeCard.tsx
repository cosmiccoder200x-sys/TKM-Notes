"use client";

import { useEffect, useState } from "react";
import { getDailyChallenge, todayKey, isChallengeCompleted } from "@/lib/typing/challenge";
import { categoryMeta } from "@/lib/typing/catalog";
import { DailyChallenge } from "@/lib/typing/types";

interface DailyChallengeCardProps {
  onStart: (challenge: DailyChallenge) => void;
}

export default function DailyChallengeCard({ onStart }: DailyChallengeCardProps) {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);

  useEffect(() => {
    setChallenge(getDailyChallenge());
  }, []);

  if (!challenge) return null;

  const done = isChallengeCompleted(challenge.date);
  const cat = categoryMeta(challenge.category);
  const best = challenge.bestResult;
  const completed = done && best && best.wpm >= challenge.targetWpm;

  return (
    <div className="card px-5 py-5">
      <div className="flex items-center justify-between mb-3">
        <div className="eyebrow">Today&apos;s Challenge</div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          {challenge.date}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Duration</div>
          <div className="font-display text-lg text-ink-hi">{challenge.duration}s</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Topic</div>
          <div className="font-display text-lg text-ink-hi">{cat.label}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Target</div>
          <div className="font-display text-lg text-ink-hi">{challenge.targetWpm} WPM</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Your result</div>
          <div className="font-display text-lg text-ink-hi">
            {best ? `${best.wpm} WPM` : "—"}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => onStart(challenge)}
          disabled={done}
          className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-md bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {done ? "Completed Today" : "Start Challenge"}
        </button>
        {completed && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-signal">
            ✓ Challenge completed
          </span>
        )}
        {done && best && best.wpm < challenge.targetWpm && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-lo">
            Best {best.wpm} WPM — target {challenge.targetWpm} WPM
          </span>
        )}
      </div>
    </div>
  );
}
