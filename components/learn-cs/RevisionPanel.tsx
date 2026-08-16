"use client";

import { useState, useEffect } from "react";
import { LearnSubject, LearnTopic } from "@/lib/learn-cs/types";
import {
  getTopicDetail,
  markTopicLearned,
  markTopicRevised,
  revisionDueStatus,
  RevisionDue,
  SPACED_INTERVALS_DAYS,
} from "@/lib/learn-cs/progress";

function fmt(ms: number | undefined): string {
  if (!ms) return "never";
  const d = new Date(ms);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

// [Mark as Learned] / [Mark as Revised] with spaced-revision visibility.
// Tracks learnedAt, lastRevisedAt, revisionCount and the 1/3/7/14/30 schedule.
export default function RevisionPanel({
  subject,
  topic,
}: {
  subject: LearnSubject;
  topic: LearnTopic;
}) {
  const [detail, setDetail] = useState(getTopicDetail(subject.slug, topic.slug));
  const [due, setDue] = useState<RevisionDue>(() => revisionDueStatus(subject.slug, topic.slug));

  useEffect(() => {
    setDetail(getTopicDetail(subject.slug, topic.slug));
    setDue(revisionDueStatus(subject.slug, topic.slug));
  }, [subject.slug, topic.slug]);

  function learned() {
    markTopicLearned(subject.slug, topic.slug);
    setDetail(getTopicDetail(subject.slug, topic.slug));
    setDue(revisionDueStatus(subject.slug, topic.slug));
  }

  function revised() {
    markTopicRevised(subject.slug, topic.slug);
    setDetail(getTopicDetail(subject.slug, topic.slug));
    setDue(revisionDueStatus(subject.slug, topic.slug));
  }

  const nextIndex = Math.min(detail.revisionCount, SPACED_INTERVALS_DAYS.length - 1);
  const nextInterval = SPACED_INTERVALS_DAYS[nextIndex];

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Revision</span>
        {detail.learnedAt ? (
          <span
            className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-card border ${
              due.status === "due"
                ? "border-critical/40 text-critical bg-critical/10"
                : "border-signal-dim text-signal bg-signal/10"
            }`}
          >
            {due.status === "due" ? "REVISION DUE" : `NEXT IN ${Math.ceil(due.nextDueIn)} DAYS`}
          </span>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">NOT LEARNED YET</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="border border-bg-border rounded-card p-2.5">
          <div className="font-display font-bold text-lg text-ink-hi">{detail.revisionCount}</div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-ink-faint mt-0.5">Revises</div>
        </div>
        <div className="border border-bg-border rounded-card p-2.5">
          <div className="font-display font-bold text-lg text-ink-hi">{fmt(detail.learnedAt)}</div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-ink-faint mt-0.5">Learned</div>
        </div>
        <div className="border border-bg-border rounded-card p-2.5">
          <div className="font-display font-bold text-lg text-ink-hi">{fmt(detail.lastRevisedAt)}</div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-ink-faint mt-0.5">Revised</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {SPACED_INTERVALS_DAYS.map((days, i) => {
            const passed = i < detail.revisionCount;
            const active = i === detail.revisionCount;
            return (
              <span
                key={days}
                title={`${days}-day interval`}
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded-card border ${
                  passed
                    ? "border-signal-dim text-signal bg-signal/10"
                    : active
                      ? "border-weight text-weight bg-weight/10"
                      : "border-bg-border text-ink-faint"
                }`}
              >
                {days}d
              </span>
            );
          })}
          <span className="ml-1 font-mono text-[10px] text-ink-faint">next: {nextInterval}d</span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={learned}
            disabled={Boolean(detail.learnedAt)}
            className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors disabled:opacity-40 disabled:cursor-default"
          >
            Mark as Learned
          </button>
          <button
            type="button"
            onClick={revised}
            className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
          >
            Mark as Revised
          </button>
        </div>
      </div>

      <p className="text-xs text-ink-faint leading-relaxed">
        Spaced revision retriggers this topic at 1, 3, 7, 14 and 30 days. A weak quiz score shortens
        the gap; a strong one stretches it.
      </p>
    </div>
  );
}