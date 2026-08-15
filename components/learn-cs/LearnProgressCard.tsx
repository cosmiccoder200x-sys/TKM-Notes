"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLearnProgress, computeLearnStats } from "@/lib/learn-cs/progress";

export default function LearnProgressCard() {
  const [stats, setStats] = useState({ totalTopics: 0, completed: 0, percent: 0 });

  useEffect(() => {
    setStats(computeLearnStats(getLearnProgress()));
  }, []);

  const started = stats.totalTopics > 0;

  return (
    <Link
      href="/learn-cs/my-learning"
      className="card p-5 flex flex-col gap-3 hover:border-signal/50 transition-colors block"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">My Learning</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          {started ? `${stats.completed}/${stats.totalTopics} topics mastered` : "Not started yet"}
        </span>
      </div>

      <div>
        <div className="progress-bar">
          <span
            className={`progress-signal ${stats.percent > 0 ? "" : "opacity-0"}`}
            style={{ width: `${stats.percent}%` }}
          />
        </div>
        <p className="text-xs text-ink-lo mt-2 leading-relaxed">
          {started
            ? `You have completed ${stats.percent}% of the topics you started.`
            : "Pick a subject and start with topic 01. Your progress is saved on this device."}
        </p>
      </div>

      <span className="font-mono text-[11px] text-signal uppercase tracking-wider">
        Open My Learning →
      </span>
    </Link>
  );
}