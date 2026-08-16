"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LEARN_ROADMAP_LEVELS, getLearnFineCategory } from "@/lib/learn-cs/categories";
import { getLearnSubject, totalTopics } from "@/lib/learn-cs";
import { getLearnProgress } from "@/lib/learn-cs/progress";
import { roadmapProgress } from "@/lib/learn-cs/recommendations";
import { NavIcon } from "@/components/navigation/navItems";

// Visualizes the roadmap as levels 0–5 with per-level completion. Students can
// jump into any subject — nothing is locked.
export default function RoadmapView() {
  const [progress, setProgress] = useState<Record<string, Record<string, string>>>({});
  const [levels, setLevels] = useState(() => roadmapProgress({}));

  useEffect(() => {
    const p = getLearnProgress();
    setProgress(p);
    setLevels(roadmapProgress(p));
  }, []);

  return (
    <div className="space-y-10">
      {LEARN_ROADMAP_LEVELS.map((level) => {
        const status = levels.find((l) => l.level === level.level);
        const percent = status && status.total > 0 ? Math.round((status.done / status.total) * 100) : 0;
        return (
          <section key={level.level} className="space-y-3">
            <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border/40 pb-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] text-signal font-bold">
                  LEVEL {level.level}
                </span>
                <div>
                  <h2 className="font-display font-semibold text-ink-hi text-lg leading-tight">{level.title}</h2>
                  <p className="text-xs text-ink-lo mt-0.5 max-w-xl">{level.description}</p>
                </div>
              </div>
              {status && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  {status.done}/{status.total} topics
                </span>
              )}
            </div>

            {status && status.total > 0 && (
              <div className="progress-bar">
                <span className="progress-signal" style={{ width: `${percent}%` }} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {level.subjects.map((slug) => {
                const subject = getLearnSubject(slug);
                if (!subject) return null;
                const fine = getLearnFineCategory(slug);
                const subjProgress = progress[slug] ?? {};
                const done = totalTopics(subject) === 0
                  ? 0
                  : subject.stages
                      .flatMap((s) => s.topics)
                      .filter((t) => ["practiced", "mastered"].includes(subjProgress[t.slug] ?? "")).length;
                const subjPercent =
                  totalTopics(subject) === 0
                    ? 0
                    : Math.round((done / totalTopics(subject)) * 100);
                return (
                  <Link
                    key={slug}
                    href={`/learn-cs/${slug}`}
                    className="card p-4 flex flex-col gap-2.5 hover:border-signal/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="icon-box w-9 h-9 shrink-0 group-hover:bg-signal/10 group-hover:border-signal/30 transition-colors">
                        <NavIcon name={subject.icon} className="w-[18px] h-[18px] text-ink-lo group-hover:text-signal transition-colors" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display font-semibold text-sm text-ink-hi group-hover:text-signal transition-colors leading-tight truncate">
                          {subject.name}
                        </h3>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint mt-0.5">
                          {fine?.shortLabel ?? subject.difficulty} · {totalTopics(subject)} topics
                        </p>
                      </div>
                      <span className="font-mono text-[11px] text-ink-faint shrink-0">
                        {done}/{totalTopics(subject)}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <span className="progress-signal" style={{ width: `${subjPercent}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}