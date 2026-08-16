"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLearnProgress } from "@/lib/learn-cs/progress";
import { recommendNext, LearnRecommendation } from "@/lib/learn-cs/recommendations";
import { ProgramId } from "@/lib/types";

// Recommendations: what to study next. Uses goal, prerequisites, weak topics,
// branch hints, recent activity and unfinished work. Never blocks — it advises.
export default function RecommendationsView({
  goal,
  branch,
}: {
  goal?: string[];
  branch?: ProgramId;
}) {
  const [recommendations, setRecommendations] = useState<LearnRecommendation[]>([]);

  useEffect(() => {
    const progress = getLearnProgress();
    setRecommendations(recommendNext({ progress, details: {}, goal, branch }));
  }, [goal, branch]);

  if (recommendations.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Recommended next</span>
          <h3 className="font-display font-semibold text-ink-hi text-lg">What to study next</h3>
          <p className="text-xs text-ink-lo leading-relaxed max-w-xl">
            Ranked from your goal, prerequisites, quiz weak areas, recent activity and unfinished work.
          </p>
        </div>
        {branch && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            tuned to {branch}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {recommendations.map((rec) => (
          <Link
            key={`${rec.subjectSlug}/${rec.topicSlug}`}
            href={`/learn-cs/${rec.subjectSlug}/${rec.topicSlug}`}
            className="card p-4 flex items-start justify-between gap-3 hover:border-signal/50 transition-colors group"
          >
            <div className="min-w-0 space-y-1">
              <p className="font-display font-semibold text-sm text-ink-hi group-hover:text-signal transition-colors leading-tight truncate">
                {rec.subjectName}
              </p>
              <p className="text-xs text-ink-lo truncate">{rec.topicTitle}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint leading-relaxed">
                {rec.reason}
              </p>
            </div>
            <span className="font-mono text-xl text-ink-faint group-hover:text-signal transition-colors shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}