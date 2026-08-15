"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLearnProgress, computeLearnStats, LearnStats } from "@/lib/learn-cs/progress";
import { LEARN_SUBJECTS, getLearnSubject, subjectTopics } from "@/lib/learn-cs";
import { RECOMMENDED_ROADMAP } from "@/lib/learn-cs/categories";
import { NavIcon } from "@/components/navigation/navItems";

const STATE_COLOR: Record<string, string> = {
  learning: "text-signal",
  understood: "text-weight",
  practiced: "text-signal-dim",
  mastered: "text-critical",
};

const STATE_LABEL: Record<string, string> = {
  learning: "Learning",
  understood: "Understood",
  practiced: "Practiced",
  mastered: "Mastered",
};

const EMPTY_STATS: LearnStats = {
  totalTopics: 0,
  started: 0,
  understood: 0,
  practiced: 0,
  mastered: 0,
  completed: 0,
  percent: 0,
};

export default function MyLearningView() {
  const [map, setMap] = useState<Record<string, Record<string, string>>>({});
  const [stats, setStats] = useState<LearnStats>(EMPTY_STATS);

  useEffect(() => {
    const m = getLearnProgress();
    setMap(m);
    setStats(computeLearnStats(m));
  }, []);

  const startedSubjects = LEARN_SUBJECTS.filter((s) => map[s.slug] && Object.keys(map[s.slug]).length > 0);

  // The first in-progress topic across all started subjects (roadmap order).
  let continueTopic: { subjectSlug: string; topicSlug: string } | null = null;
  for (const slug of RECOMMENDED_ROADMAP) {
    const subject = getLearnSubject(slug);
    if (!subject || !map[slug]) continue;
    const topics = subjectTopics(subject);
    const current = topics.find((t) => {
      const state = map[slug][t.slug];
      return state === "learning" || state === "understood";
    });
    if (current) {
      continueTopic = { subjectSlug: slug, topicSlug: current.slug };
      break;
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-4 space-y-8">
      <section className="space-y-3">
        <div className="eyebrow flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          Learn CS · My Learning
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink-hi leading-[1.1] tracking-tight">
          Your progress.
        </h1>
        <p className="text-base text-ink-lo leading-relaxed max-w-2xl font-light">
          Everything is saved on this device. Move each topic from <span className="text-signal">Learning</span> to{" "}
          <span className="text-critical">Mastered</span> as you go.
        </p>
      </section>

      {/* Overall stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Topics started", value: stats.totalTopics, color: "text-ink-hi" },
          { label: "Understood", value: stats.understood, color: "text-weight" },
          { label: "Practiced", value: stats.practiced, color: "text-signal-dim" },
          { label: "Mastered", value: stats.mastered, color: "text-critical" },
        ].map((s) => (
          <div key={s.label} className="card p-4 space-y-1">
            <span className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Continue where you left off */}
      {continueTopic && (
        <Link
          href={`/learn-cs/${continueTopic.subjectSlug}/${continueTopic.topicSlug}`}
          className="card p-5 flex items-center justify-between gap-3 hover:border-signal/50 transition-colors group"
        >
          <div className="space-y-1 min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Continue where you left off</span>
            <p className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors truncate">
              {getLearnSubject(continueTopic.subjectSlug)?.name}
            </p>
          </div>
          <span className="font-mono text-xl text-ink-faint group-hover:text-signal transition-colors shrink-0">→</span>
        </Link>
      )}

      {/* Subjects with progress */}
      {startedSubjects.length === 0 ? (
        <div className="card p-8 text-center space-y-2">
          <p className="font-display font-semibold text-ink-hi">Nothing started yet.</p>
          <p className="text-sm text-ink-lo">
            Follow the <Link href="/learn-cs#roadmap" className="text-signal hover:text-signal-dim transition-colors">roadmap</Link>{" "}
            and your progress will appear here.
          </p>
        </div>
      ) : (
        <section className="space-y-3">
          <div className="flex items-baseline justify-between gap-2 border-b border-bg-border/40 pb-3">
            <span className="eyebrow text-ink-hi">Subjects in progress</span>
          </div>

          <div className="space-y-3">
            {startedSubjects.map((subject) => {
              const topics = subjectTopics(subject);
              const prog = map[subject.slug] ?? {};
              const done = topics.filter((t) => {
                const s = prog[t.slug];
                return s === "practiced" || s === "mastered";
              }).length;
              const percent = topics.length === 0 ? 0 : Math.round((done / topics.length) * 100);
              const current = topics.find((t) => {
                const s = prog[t.slug];
                return s === "learning" || s === "understood";
              });

              return (
                <div key={subject.slug} className="card p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="icon-box w-9 h-9 shrink-0">
                      <NavIcon name={subject.icon} className="w-[18px] h-[18px] text-signal" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link href={`/learn-cs/${subject.slug}`} className="font-display font-semibold text-sm text-ink-hi hover:text-signal transition-colors leading-tight block truncate">
                        {subject.name}
                      </Link>
                      <div className="progress-bar mt-1.5 max-w-xs">
                        <span className="progress-signal" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-ink-faint shrink-0">{done}/{topics.length}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {Object.entries(prog).map(([topicSlug, state]) => (
                      <Link
                        key={topicSlug}
                        href={`/learn-cs/${subject.slug}/${topicSlug}`}
                        className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-card border border-bg-border hover:border-signal/50 transition-colors ${STATE_COLOR[state] ?? "text-ink-faint"}`}
                      >
                        {STATE_LABEL[state] ?? state}
                      </Link>
                    ))}
                    {current && (
                      <Link
                        href={`/learn-cs/${subject.slug}/${current.slug}`}
                        className="ml-auto font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
                      >
                        Continue →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}