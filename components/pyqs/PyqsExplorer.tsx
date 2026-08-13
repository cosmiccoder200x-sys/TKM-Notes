"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { semesters } from "@/lib/content";
import { getQuestionBankStats, type PyqEntry } from "@/lib/pyqs";
import { generatePromptLabUrl } from "@/lib/prompts/context";
import PriorityLabel from "@/components/PriorityLabel";

const SERVER = "s3";

type SemesterFilter = string; // semester id or "all"
type SubjectFilter = string; // subject code or "all"
type WeightageFilter = "all" | "high" | "medium" | "low";

export default function PyqsExplorer({ entries }: { entries: PyqEntry[] }) {
  const [semesterId, setSemesterId] = useState<SemesterFilter>(SERVER);
  const [subjectCode, setSubjectCode] = useState<SubjectFilter>("all");
  const [weightage, setWeightage] = useState<WeightageFilter>("all");

  const subjectsInScope = useMemo(() => {
    const list = entries.filter((q) => (semesterId === "all" ? true : q.semesterId === semesterId));
    return Array.from(new Map(list.map((q) => [q.subjectCode, q.subjectName])).entries()).sort(
      (a, b) => a[1].localeCompare(b[1])
    );
  }, [entries, semesterId]);

  const filtered = useMemo(() => {
    return entries.filter((q) => {
      if (semesterId !== "all" && q.semesterId !== semesterId) return false;
      if (subjectCode !== "all" && q.subjectCode !== subjectCode) return false;
      if (weightage !== "all" && q.weightage !== weightage) return false;
      return true;
    });
  }, [entries, semesterId, subjectCode, weightage]);

  const stats = useMemo(() => getQuestionBankStats(filtered), [filtered]);

  const grouped = useMemo(() => {
    const map = new Map<string, { subject: PyqEntry; modules: Map<string, PyqEntry[]> }>();
    for (const q of filtered) {
      const key = q.subjectCode;
      if (!map.has(key)) {
        map.set(key, { subject: q, modules: new Map() });
      }
      const g = map.get(key)!;
      const mods = g.modules.get(q.moduleId) ?? [];
      mods.push(q);
      g.modules.set(q.moduleId, mods);
    }
    return Array.from(map.values());
  }, [filtered]);

  const selectCls =
    "bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm font-mono text-ink-hi focus:border-signal focus:outline-none appearance-none pr-8";

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-3 border-b border-bg-border pb-6">
        <div className="section-kicker">PYQ Bank</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          Previous-Year Questions
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed max-w-2xl">
          Every high-priority exam question from your notes, aggregated into one filterable bank.
          Filters use only the metadata that currently exists — subject, module, and question
          weightage. Year-wise papers and per-question marks will appear here as they are added.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{stats.total}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            Questions
          </div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-critical">{stats.high}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            HIGH priority
          </div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">
            {stats.subjectsWithQuestions}
          </div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            Subjects
          </div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">
            {stats.semestersCovered}
          </div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            Semesters
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-ink-faint">
          Semester
          <select value={semesterId} onChange={(e) => { setSemesterId(e.target.value); setSubjectCode("all"); }} className={selectCls}>
            <option value="all">All</option>
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id.toUpperCase()}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-ink-faint">
          Subject
          <select value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} className={selectCls}>
            <option value="all">All subjects</option>
            {subjectsInScope.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-1.5" role="group" aria-label="Filter by weightage">
          {([
            { v: "all", label: "All" },
            { v: "high", label: "High" },
            { v: "medium", label: "Medium" },
            { v: "low", label: "Low" },
          ] as { v: WeightageFilter; label: string }[]).map((opt) => (
            <button
              key={opt.v}
              onClick={() => setWeightage(opt.v)}
              aria-pressed={weightage === opt.v}
              className={`font-mono text-[10px] uppercase tracking-wide px-3 py-2 rounded-card border transition-colors ${
                weightage === opt.v
                  ? "border-signal text-signal bg-signal/10"
                  : "border-bg-border text-ink-faint hover:text-ink-hi"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-sm text-ink-hi mb-1">No questions match these filters.</p>
          <p className="text-sm text-ink-lo">
            Notes for the selected subject may not be written yet — pick a different semester.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ subject, modules }) => (
            <section key={subject.subjectCode} className="space-y-3">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <h2 className="font-display font-semibold text-ink-hi text-lg">
                  {subject.subjectName}
                </h2>
                <Link
                  href={`/${subject.semesterId}/${subject.subjectSlug}`}
                  className="font-mono text-[11px] text-signal hover:text-signal-dim transition-colors uppercase tracking-wider"
                >
                  Open subject →
                </Link>
              </div>

              <div className="space-y-2">
                {Array.from(modules.entries()).map(([moduleId, qs]) => (
                  <div key={moduleId} className="card overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-bg-border bg-bg-surface flex items-center gap-2">
                      <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wide">
                        Module {qs[0].moduleIndex}
                      </span>
                      <span className="text-sm font-medium text-ink-hi truncate">
                        {qs[0].moduleTitle}
                      </span>
                    </div>
                    <div className="divide-y divide-bg-border">
                      {qs.map((q) => (
                        <div key={q.id} className="px-4 py-3 flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm text-ink-hi leading-relaxed">{q.question}</p>
                            <PriorityLabel level={q.weightage} />
                          </div>
                          {q.note && (
                            <p className="text-xs text-ink-lo leading-relaxed">Note: {q.note}</p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            <Link
                              href={generatePromptLabUrl(
                                {
                                  subjectCode: q.subjectCode,
                                  moduleId: q.moduleId,
                                  moduleName: q.moduleTitle,
                                  question: q.question,
                                  contentType: "exam-question",
                                  marks: (q.weightage === "high" ? 8 : q.weightage === "medium" ? 5 : 2).toString(),
                                },
                                "exam-answer"
                              )}
                              className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1.5 rounded-card border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors"
                            >
                              Practice with AI
                            </Link>
                            <Link
                              href={`/${q.semesterId}/${q.subjectSlug}#${q.moduleId}`}
                              className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1.5 rounded-card border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors"
                            >
                              Open in notes
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}