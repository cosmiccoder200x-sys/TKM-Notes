"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLearnProgress, computeLearnStats, computeLearnDetailStats } from "@/lib/learn-cs/progress";
import { LEARN_FINE_CATEGORIES, getLearnFineCategory } from "@/lib/learn-cs/categories";
import { LEARN_SUBJECTS, subjectTopics, totalMinutes } from "@/lib/learn-cs";
import { continueLearningTarget } from "@/lib/learn-cs/recommendations";
import RecommendationsView from "./RecommendationsView";
import { ProgramId } from "@/lib/types";

const BRANCH_KEY = "tkm.branch.pref";

// Overall progress dashboard: topics learned/revised, quiz accuracy, practice
// counts, learning hours and per-category breakdown. All from learn-cs storage.
export default function LearnProgressDashboard() {
  const [progress, setProgress] = useState<Record<string, Record<string, string>>>({});
  const [stats, setStats] = useState({ totalTopics: 0, completed: 0, percent: 0 });
  const [details, setDetails] = useState({ learned: 0, revised: 0, topicsRevised: 0, quizAttempts: 0, quizAccuracy: 0 });
  const [continueTarget, setContinueTarget] = useState<{ subjectSlug: string; topicSlug: string; subjectName: string } | null>(null);
  const [branch, setBranch] = useState<ProgramId | undefined>(undefined);

  useEffect(() => {
    const p = getLearnProgress();
    setProgress(p);
    setStats(computeLearnStats(p));
    const d = computeLearnDetailStats(p);
    setDetails(d);
    setContinueTarget(continueLearningTarget(p));
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem(BRANCH_KEY);
      if (raw === "ER" || raw === "CS" || raw === "CS_AI") setBranch(raw);
    }
  }, []);

  const learningMinutes = LEARN_SUBJECTS.reduce((acc, subject) => {
    const prog = progress[subject.slug] ?? {};
    return (
      acc +
      subjectTopics(subject).reduce((m, t) => {
        const state = prog[t.slug];
        if (state && state !== "not-started") return m + t.estimatedMinutes;
        return m;
      }, 0)
    );
  }, 0);

  // Per-category completion (only for fine categories that have subjects).
  const categories = LEARN_FINE_CATEGORIES.map((cat) => {
    const subjects = LEARN_SUBJECTS.filter((s) => getLearnFineCategory(s.slug)?.id === cat.id);
    let total = 0;
    let done = 0;
    for (const subject of subjects) {
      const prog = progress[subject.slug] ?? {};
      for (const topic of subjectTopics(subject)) {
        total += 1;
        const state = prog[topic.slug];
        if (state === "practiced" || state === "mastered") done += 1;
      }
    }
    return { cat, subjects: subjects.length, total, done };
  });

  return (
    <main className="max-w-4xl mx-auto py-4 space-y-8">
      <header className="space-y-3">
        <div className="section-kicker">Learn CS · Progress</div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink-hi leading-[1.1] tracking-tight">
          Your CS progress.
        </h1>
        <p className="text-base text-ink-lo leading-relaxed max-w-2xl font-light">
          Overall progress across the whole catalog — topics, revision, quizzes and hours — saved on
          this device and separate from your TKM branch progress.
        </p>
      </header>

      {continueTarget && (
        <Link
          href={`/learn-cs/${continueTarget.subjectSlug}/${continueTarget.topicSlug}`}
          className="card p-5 flex items-center justify-between gap-3 hover:border-signal/50 transition-colors group"
        >
          <div className="space-y-1 min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Continue where you left off</span>
            <p className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors truncate">
              {continueTarget.subjectName}
            </p>
          </div>
          <span className="font-mono text-xl text-ink-faint group-hover:text-signal transition-colors shrink-0">→</span>
        </Link>
      )}

      {/* Top-line stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-4 space-y-1">
          <span className="font-display font-bold text-2xl text-ink-hi">{stats.percent}%</span>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">Topics done</span>
          <span className="block text-xs text-ink-lo">{stats.completed}/{stats.totalTopics}</span>
        </div>
        <div className="card p-4 space-y-1">
          <span className="font-display font-bold text-2xl text-signal">{details.learned}</span>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">Learned</span>
          <span className="block text-xs text-ink-lo">{details.topicsRevised} revised</span>
        </div>
        <div className="card p-4 space-y-1">
          <span className="font-display font-bold text-2xl text-weight">{details.quizAccuracy}%</span>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">Quiz accuracy</span>
          <span className="block text-xs text-ink-lo">{details.quizAttempts} quizzes</span>
        </div>
        <div className="card p-4 space-y-1">
          <span className="font-display font-bold text-2xl text-ink-hi">{Math.round(learningMinutes / 60)}h</span>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">Learning hours</span>
          <span className="block text-xs text-ink-lo">across started topics</span>
        </div>
      </div>

      {/* Recommended next */}
      <RecommendationsView branch={branch} />

      {/* Per-category breakdown */}
      <section className="space-y-3">
        <div className="flex items-baseline gap-3 border-b border-bg-border/40 pb-3">
          <span className="eyebrow text-ink-hi">By category</span>
        </div>
        <div className="space-y-3">
          {categories
            .filter((c) => c.total > 0)
            .map(({ cat, subjects, total, done }) => {
              const percent = total === 0 ? 0 : Math.round((done / total) * 100);
              return (
                <div key={cat.id} className="card p-4 space-y-2.5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-signal">{cat.shortLabel}</span>
                      <h3 className="font-display font-semibold text-ink-hi text-base leading-tight">{cat.label}</h3>
                      <p className="text-xs text-ink-lo mt-0.5">
                        {cat.difficulty} · ~{cat.estimatedHours}h · {subjects} subjects
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-ink-faint">{done}/{total}</span>
                  </div>
                  <div className="progress-bar">
                    <span className="progress-signal" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <p className="text-xs text-ink-faint leading-relaxed max-w-2xl">
        Learn CS progress lives in its own localStorage key and is never mixed with your TKM branch
        progress. Cross-links only open the syllabus — they do not write into it.
      </p>
    </main>
  );
}