"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { semesters, subjectsForProgram } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import {
  getProgress,
  calculateSubjectMastery,
  getSubjectRecommendations,
  progressSubjectKey,
} from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { PROGRAM_OPTIONS, normalizeProgramId } from "@/lib/branch";
import { subjectUrl, masteryUrl, programSlug } from "@/lib/urls";

const STORAGE_KEY = "tkm_program_id";

interface SubjectRow {
  code: string;
  name: string;
  slug: string;
  semesterId: string;
  programId: ProgramId;
  overall: number | null;
  assessed: number;
  total: number;
  strong: number;
  attention: number;
}

export default function ProgressDashboard() {
  const [programId, setProgramId] = useState<ProgramId>("ER");
  const [rows, setRows] = useState<SubjectRow[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = normalizeProgramId(localStorage.getItem(STORAGE_KEY));
    const pid = stored ?? "ER";
    setProgramId(pid);

    const progress = getProgress();
    const out: SubjectRow[] = [];
    for (const s of subjectsForProgram(pid)) {
      const content = getSubjectContent(s.code, pid);
      if (!content) continue;
      const moduleIds = content.modules.map((m) => m.id);
      const summary = calculateSubjectMastery(s.code, moduleIds, progress[progressSubjectKey(pid, s.code)] ?? {});
      out.push({
        code: s.code,
        name: s.name,
        slug: s.slug,
        semesterId: s.semesterId,
        programId: pid,
        overall: summary.overall,
        assessed: summary.assessedModules,
        total: summary.totalModules,
        strong: summary.strong,
        attention: summary.needsAttention,
      });
    }
    setRows(out);
    setReady(true);
  }, []);

  const stats = useMemo(() => {
    const assessedSubjects = rows.filter((r) => r.overall !== null);
    const overall = assessedSubjects.length
      ? Math.round(assessedSubjects.reduce((s, r) => s + (r.overall ?? 0), 0) / assessedSubjects.length)
      : null;
    return {
      overall,
      subjects: assessedSubjects.length,
      modules: rows.reduce((s, r) => s + r.assessed, 0),
      strong: rows.reduce((s, r) => s + r.strong, 0),
      attention: rows.reduce((s, r) => s + r.attention, 0),
    };
  }, [rows]);

  const next = useMemo(() => {
    if (rows.length === 0) return null;
    const progress = getProgress();
    let best: { subject: SubjectRow; moduleTitle: string; status: string } | null = null;
    for (const r of rows) {
      const recs = getSubjectRecommendations(r.code, progress, r.programId);
      const top = recs[0];
      if (top && (!best || top.priority > 0)) {
        if (!best || top.status === "weak" || (best && top.status === "needs-practice")) {
          // First subject with any recommendation; prefer weak/needs-practice.
          if (!best) best = { subject: r, moduleTitle: top.moduleTitle, status: top.status };
          else if (top.status === "weak" || top.status === "needs-practice") best = { subject: r, moduleTitle: top.moduleTitle, status: top.status };
        }
      }
    }
    return best;
  }, [rows]);

  if (!ready) return null;

  const selectCls =
    "bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm font-mono text-ink-hi focus:border-signal focus:outline-none appearance-none pr-8";

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-3 border-b border-bg-border pb-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="section-kicker">Progress</div>
          <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Branch
            <select value={programId} onChange={(e) => setProgramId(e.target.value as ProgramId)} className={selectCls}>
              {PROGRAM_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.short}
                </option>
              ))}
            </select>
          </label>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          {stats.overall !== null ? `${stats.overall}%` : "No activity yet"}
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed max-w-2xl">
          Subject progress is computed from your real activity — self-checks, practice results and
          revision completion. Modules you haven&apos;t attempted are honestly shown as 0%.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{stats.subjects}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Subjects assessed</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{stats.modules}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Modules assessed</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-signal">{stats.strong}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Strong modules</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-critical">{stats.attention}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Need attention</div>
        </div>
      </div>

      {next && (
        <section className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4 border-signal/40">
          <div className="flex-1 space-y-1.5">
            <span className="eyebrow">Continue learning</span>
            <div className="font-display font-semibold text-base text-ink-hi">
              {next.subject.name}
            </div>
            <div className="text-sm text-ink-lo">
              Next: <span className="text-ink-hi font-medium">{next.moduleTitle}</span>
              <span className="text-ink-faint"> · {next.status.replace("-", " ")}</span>
            </div>
          </div>
          <Link
            href={subjectUrl(next.subject.programId, next.subject.semesterId, next.subject.slug)}
            className="shrink-0 font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors text-center"
          >
            Continue →
          </Link>
        </section>
      )}

      {rows.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-sm text-ink-hi mb-1">No subjects to track in {programId} yet.</p>
          <p className="text-xs text-ink-lo mb-4">
            Practice questions or do self-checks and your progress will appear here.
          </p>
          <Link
            href="/practice"
            className="inline-block font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
          >
            Start practice →
          </Link>
        </div>
      )}

      {rows.length > 0 && (
        <div className="space-y-6">
          {semesters.map((sem) => {
            const list = rows.filter((r) => r.semesterId === sem.id);
            if (list.length === 0) return null;
            return (
              <section key={sem.id} className="space-y-3">
                <h2 className="font-display font-semibold text-lg text-ink-hi border-b border-bg-border/40 pb-2">
                  {sem.label}
                </h2>
                <div className="space-y-2">
                  {list.map((r) => (
                    <div key={r.code} className="card px-5 py-4 space-y-2">
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <Link
                            href={subjectUrl(r.programId, r.semesterId, r.slug)}
                            className="font-display font-semibold text-[15px] text-ink-hi hover:text-signal transition-colors"
                          >
                            {r.name}
                          </Link>
                          <div className="text-xs font-mono text-ink-faint mt-0.5">
                            {r.code} · {r.assessed}/{r.total} modules assessed
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {r.overall !== null && (
                            <span className="font-display font-bold text-lg text-signal">{r.overall}%</span>
                          )}
                          {r.overall === null && (
                            <span className="font-mono text-xs text-ink-faint">Not started</span>
                          )}
                          <Link
                            href={masteryUrl(r.programId, r.semesterId, r.slug)}
                            className="font-mono text-[10px] uppercase tracking-wide text-signal hover:underline"
                          >
                            Mastery →
                          </Link>
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-bg-raised rounded-full overflow-hidden">
                        <div
                          className="h-full bg-signal rounded-full transition-all"
                          style={{ width: `${r.overall ?? 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {rows.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/night-before?program=${programSlug(programId)}&time=60`}
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
          >
            Night-Before revision →
          </Link>
        </div>
      )}
    </main>
  );
}