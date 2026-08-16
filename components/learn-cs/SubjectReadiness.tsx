"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLearnSubject } from "@/lib/learn-cs";
import type { LearnSubject } from "@/lib/learn-cs/types";
import { getLearnProgress } from "@/lib/learn-cs/progress";

// Per-subject readiness: how many prerequisite topics are already learned. It
// guides the student, it never locks content.
export default function SubjectReadiness({ subject }: { subject: LearnSubject }) {
  const [progress, setProgress] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    setProgress(getLearnProgress());
  }, []);

  const prereqs: LearnSubject[] = (subject.prerequisites ?? [])
    .map((slug) => getLearnSubject(slug))
    .filter((s): s is LearnSubject => Boolean(s));

  if (prereqs.length === 0) return null;

  const learnedCount = prereqs.filter((p) => {
    const prog = progress[p.slug] ?? {};
    return p.stages
      .flatMap((s) => s.topics)
      .some((t) => ["practiced", "mastered"].includes(prog[t.slug] ?? ""));
  }).length;

  const allReady = learnedCount === prereqs.length;

  return (
    <div className="card p-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-dashed">
      <span
        className={`font-mono text-[10px] uppercase tracking-wider ${
          allReady ? "text-signal" : "text-weight"
        }`}
      >
        {allReady ? "READY TO START" : "RECOMMENDED BEFORE THIS"}
      </span>
      <div className="flex flex-wrap items-center gap-1.5">
        {prereqs.map((p) => {
          const prog = progress[p.slug] ?? {};
          const ready = p.stages
            .flatMap((s) => s.topics)
            .some((t) => ["practiced", "mastered"].includes(prog[t.slug] ?? ""));
          return (
            <Link
              key={p.slug}
              href={`/learn-cs/${p.slug}`}
              className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-card border transition-colors ${
                ready
                  ? "border-signal/40 text-signal hover:border-signal"
                  : "border-bg-border text-ink-faint hover:border-signal/50 hover:text-ink-lo"
              }`}
            >
              {ready ? "✓ " : "○ "}
              {p.name}
            </Link>
          );
        })}
      </div>
      <p className="w-full text-xs text-ink-lo leading-relaxed">
        {allReady
          ? "You have started the prerequisite topics. Jump in."
          : "These are suggested first. You can still open any topic — this only helps you pick an order."}
      </p>
    </div>
  );
}