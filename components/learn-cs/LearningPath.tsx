"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LearnSubject } from "@/lib/learn-cs/types";
import { LEARN_STAGES } from "@/lib/learn-cs/categories";
import { subjectTopics, totalTopics } from "@/lib/learn-cs";
import { getSubjectLearnProgress } from "@/lib/learn-cs/progress";
import { NavIcon } from "@/components/navigation/navItems";

const STATE_DOT: Record<string, string> = {
  "not-started": "bg-bg-border",
  learning: "bg-signal",
  understood: "bg-weight",
  practiced: "bg-signal-dim",
  mastered: "bg-signal",
};

const DIFFICULTY_STYLE: Record<string, string> = {
  beginner: "text-signal border-signal-dim bg-signal/10",
  intermediate: "text-weight border-weight-dim bg-weight/10",
  advanced: "text-critical border-critical/40 bg-critical/10",
};

export default function LearningPath({ subject }: { subject: LearnSubject }) {
  const [progress, setProgress] = useState<Record<string, string>>({});

  useEffect(() => {
    setProgress(getSubjectLearnProgress(subject.slug));
  }, [subject.slug]);

  const topics = subjectTopics(subject);
  const done = topics.filter((t) => {
    const s = progress[t.slug];
    return s === "practiced" || s === "mastered";
  }).length;
  const percent = topics.length === 0 ? 0 : Math.round((done / topics.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            {totalTopics(subject)} topics · 7 stages
          </span>
          <span className="font-mono text-[11px] text-signal uppercase tracking-wider">
            {done}/{topics.length} completed
          </span>
        </div>
        <div className="progress-bar">
          <span className="progress-signal" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Stage-by-stage path */}
      {LEARN_STAGES.map((stage) => {
        const stageData = subject.stages.find((s) => s.stage === stage.id);
        if (!stageData || stageData.topics.length === 0) return null;

        const stageDone = stageData.topics.filter((t) => {
          const s = progress[t.slug];
          return s === "practiced" || s === "mastered";
        }).length;

        return (
          <section key={stage.id} className="space-y-2.5">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] text-signal font-bold">
                  {String(stage.order).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display font-semibold text-ink-hi text-base leading-tight">{stage.title}</h2>
                  <p className="text-xs text-ink-lo mt-0.5">{stage.subtitle}</p>
                </div>
              </div>
              {stageDone > 0 && (
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                  {stageDone}/{stageData.topics.length}
                </span>
              )}
            </div>

            <div className="card divide-y divide-bg-border/60">
              {stageData.topics.map((topic) => {
                const state = progress[topic.slug] ?? "not-started";
                return (
                  <Link
                    key={topic.slug}
                    href={`/learn-cs/${subject.slug}/${topic.slug}`}
                    className="group flex items-center gap-3 px-4 py-3 hover:bg-bg-hover transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${STATE_DOT[state]}`} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-ink-hi group-hover:text-signal transition-colors leading-tight truncate">
                        {topic.title}
                      </span>
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-ink-faint mt-0.5">
                        ~{topic.estimatedMinutes} min
                      </span>
                    </span>
                    <span className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-card border shrink-0 ${DIFFICULTY_STYLE[topic.difficulty]}`}>
                      {topic.difficulty}
                    </span>
                    {state === "mastered" && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-signal shrink-0">✓</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {topics.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-base text-ink-hi mb-1">Content for this subject is being written.</p>
          <p className="text-sm text-ink-lo">Check back soon — the next topic drops as soon as it&apos;s ready.</p>
        </div>
      )}
    </div>
  );
}