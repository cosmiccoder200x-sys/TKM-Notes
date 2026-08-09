"use client";

import { useState } from "react";
import { semesters, subjectsForSemester } from "@/lib/content";
import { categoriesForSemester, subjectsForSemesterAndCategory, SubjectCategoryId } from "@/lib/branch";
import registry from "@/lib/notes";
import SubjectCard from "./SubjectCard";

export default function SemesterExplorer({
  initialSemester = "s3",
}: {
  initialSemester?: string;
}) {
  const [semesterId, setSemesterId] = useState(initialSemester);
  const [category, setCategory] = useState<SubjectCategoryId | "all">("all");

  const semester = semesters.find((s) => s.id === semesterId) ?? semesters[0];
  const cats = categoriesForSemester(semester.id);
  const all = subjectsForSemester(semester.id);
  const shown = subjectsForSemesterAndCategory(semester.id, category);
  const withNotes = all.filter((s) => registry[s.code]).length;

  function pickSemester(id: string) {
    setSemesterId(id);
    setCategory("all");
  }

  return (
    <div className="space-y-4">
      {/* Semester tabs — horizontal scroll on mobile, wrap on desktop */}
      <div
        className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap"
        role="tablist"
        aria-label="Semesters"
      >
        {semesters.map((s) => {
          const active = s.id === semester.id;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={active}
              onClick={() => pickSemester(s.id)}
              className={`shrink-0 font-mono text-xs uppercase tracking-wide px-3.5 py-1.5 rounded-card border transition-colors ${
                active
                  ? "border-signal text-signal bg-signal/10"
                  : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal-dim"
              }`}
            >
              {s.id.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h2 className="font-display font-semibold text-lg text-ink-hi">{semester.label}</h2>
        <span className="text-xs font-mono text-ink-lo">
          {all.length} subjects · {withNotes}/{all.length} notes available
        </span>
      </div>

      {/* Category chips — only categories present in this semester */}
      {cats.length > 1 && (
        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Subject category">
          <button
            onClick={() => setCategory("all")}
            className={`font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-card border transition-colors ${
              category === "all"
                ? "border-signal text-signal bg-signal/10"
                : "border-bg-border text-ink-lo hover:text-ink-hi"
            }`}
          >
            All
          </button>
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-card border transition-colors ${
                category === c.id
                  ? "border-signal text-signal bg-signal/10"
                  : "border-bg-border text-ink-lo hover:text-ink-hi"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Subject grid — 1 col mobile / 2 col tablet / 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {shown.map((subj) => (
          <SubjectCard key={subj.code} subject={subj} />
        ))}
      </div>
    </div>
  );
}
