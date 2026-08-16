"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LearnSubject, LearnTopic } from "@/lib/learn-cs/types";
import { subjectTopics } from "@/lib/learn-cs";
import { getSubjectLearnProgress } from "@/lib/learn-cs/progress";

const DONE = new Set(["practiced", "mastered"]);

function prereqTopic(
  subject: LearnSubject,
  slug: string
): { topic: LearnTopic; subjectSlug: string } | null {
  const found = subjectTopics(subject).find((t) => t.slug === slug);
  return found ? { topic: found, subjectSlug: subject.slug } : null;
}

// Shows the topic's prerequisites with readiness. Non-blocking: the student
// can always continue, but the gate makes the "you should learn first" call
// obvious. Cross-subject prerequisites resolve against their own subject page.
export default function TopicPrereqGate({
  subject,
  topic,
}: {
  subject: LearnSubject;
  topic: LearnTopic;
}) {
  const [progress, setProgress] = useState<Record<string, string>>({});

  useEffect(() => {
    setProgress(getSubjectLearnProgress(subject.slug));
  }, [subject.slug]);

  const prereqs = (topic.prerequisites ?? []).map((slug) => ({
    slug,
    item: prereqTopic(subject, slug),
  }));

  if (prereqs.length === 0) return null;

  const allDone = prereqs.every(({ slug, item }) => {
    if (!item) return true;
    const state = progress[slug];
    return DONE.has(state ?? "");
  });
  const anyDone = prereqs.some(({ slug, item }) => {
    if (!item) return true;
    return DONE.has(progress[slug] ?? "");
  });

  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          Prerequisites
        </span>
        <span
          className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-card border ${
            allDone
              ? "border-signal-dim text-signal bg-signal/10"
              : anyDone
                ? "border-weight-dim text-weight bg-weight/10"
                : "border-critical/40 text-critical bg-critical/10"
          }`}
        >
          {allDone ? "YOU ARE READY" : anyDone ? "ALMOST THERE" : "YOU SHOULD LEARN FIRST"}
        </span>
      </div>

      <p className="text-xs text-ink-lo leading-relaxed">
        {allDone
          ? "Every prerequisite for this topic is complete. Go ahead."
          : "These topics build the foundation for this one. You can still jump straight in — but learning them first makes this topic stick far better."}
      </p>

      <ul className="space-y-1.5">
        {prereqs.map(({ slug, item }) => {
          const state = item ? progress[item.topic.slug] : undefined;
          const done = DONE.has(state ?? "");
          const href = item
            ? `/learn-cs/${subject.slug}/${item.topic.slug}`
            : `/learn-cs/${slug}`;
          const label = item ? item.topic.title : slug.replace(/-/g, " ");
          return (
            <li key={slug}>
              <Link
                href={href}
                className="flex items-center gap-2.5 text-sm text-ink-lo hover:text-signal transition-colors group"
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    done ? "bg-signal" : state ? "bg-weight" : "bg-bg-border"
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate group-hover:text-signal">{label}</span>
                {done ? (
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-signal shrink-0">
                    done
                  </span>
                ) : state ? (
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-weight shrink-0">
                    in progress
                  </span>
                ) : (
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-ink-faint shrink-0">
                    not started
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}