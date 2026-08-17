"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { subjects } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { getProgress, calculateModuleMastery, ModuleProgress } from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { subjectUrl, programSlug } from "@/lib/urls";

const STORAGE_KEY = "tkm_program_id";

type RevStatus = "weak" | "due" | "needs-practice" | "fresh" | "done";

interface RevRow {
  subjectCode: string;
  subjectName: string;
  subjectSlug: string;
  semesterId: string;
  programId: ProgramId;
  moduleId: string;
  moduleTitle: string;
  status: RevStatus;
  lastStudied?: number;
}

const STATUS_META: Record<RevStatus, { label: string; cls: string; order: number }> = {
  weak: { label: "Weak — review", cls: "border-critical/40 text-critical", order: 0 },
  due: { label: "Due for review", cls: "border-weight-dim text-weight", order: 1 },
  "needs-practice": { label: "Needs practice", cls: "border-weight-dim text-weight", order: 2 },
  fresh: { label: "Fresh", cls: "border-signal-dim text-signal", order: 3 },
  done: { label: "Done", cls: "border-bg-border text-ink-faint", order: 4 },
};

function classify(mastery: ReturnType<typeof calculateModuleMastery>, record: ModuleProgress): RevStatus {
  if (mastery.status === "strong") return "done";
  if (mastery.status === "weak") return "weak";
  if (mastery.status === "needs-practice") return "needs-practice";
  if (record.attempts === 0 && record.reviewed) return "fresh";
  const last = record.lastStudied ?? 0;
  const daysSince = (Date.now() - last) / 86400000;
  if (daysSince >= 3) return "due";
  return "fresh";
}

export default function TodaysRevision() {
  const [rows, setRows] = useState<RevRow[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    const out: RevRow[] = [];
    for (const key of Object.keys(progress)) {
      const [pid, code] = key.split(":");
      if (!pid || !code) continue;
      const subject = subjects.find((s) => s.programId === pid && s.code === code);
      if (!subject) continue;
      const content = getSubjectContent(code, pid as ProgramId);
      const recs = progress[key];
      for (const moduleId of Object.keys(recs)) {
        const record = recs[moduleId];
        const mastery = calculateModuleMastery(record);
        const mod = content?.modules.find((m) => m.id === moduleId);
        out.push({
          subjectCode: code,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          semesterId: subject.semesterId,
          programId: pid as ProgramId,
          moduleId,
          moduleTitle: mod?.title ?? moduleId.toUpperCase(),
          status: classify(mastery, record),
          lastStudied: record.lastStudied,
        });
      }
    }
    setRows(out);
    setReady(true);
  }, []);

  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const d = STATUS_META[a.status].order - STATUS_META[b.status].order;
        if (d !== 0) return d;
        return (b.lastStudied ?? 0) - (a.lastStudied ?? 0);
      }),
    [rows]
  );

  const dueCount = rows.filter((r) => r.status === "weak" || r.status === "due" || r.status === "needs-practice").length;

  if (!ready) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-3 border-b border-bg-border pb-6">
        <div className="section-kicker">Revision</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          Today&apos;s revision
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed max-w-2xl">
          Built from your actual activity — weak modules, modules due for a spaced review, and
          everything you&apos;ve already locked in. Nothing here is guessed.
        </p>
        {rows.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="chip border-critical/40 text-critical">{dueCount} to review</span>
            <span className="chip border-signal-dim text-signal">
              {rows.filter((r) => r.status === "done" || r.status === "fresh").length} in good shape
            </span>
          </div>
        )}
      </header>

      {sorted.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-sm text-ink-hi mb-1">No revision queue yet</p>
          <p className="text-xs text-ink-lo mb-4">
            Practice questions or complete self-checks, and your due-for-review modules will appear here.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/practice"
              className="inline-block font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
            >
              Start practice →
            </Link>
            <Link
              href={`/night-before?time=60`}
              className="inline-block font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
            >
              Night-Before plan →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {sorted.map((r) => {
            const meta = STATUS_META[r.status];
            return (
              <div key={`${r.subjectCode}:${r.moduleId}`} className="card px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`chip shrink-0 ${meta.cls}`}>{meta.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint truncate">
                      {r.subjectName}
                    </span>
                  </div>
                  <div className="font-display font-semibold text-[15px] text-ink-hi truncate">
                    {r.moduleTitle}
                  </div>
                  {r.lastStudied && (
                    <div className="text-xs text-ink-faint font-mono">
                      Last studied {new Date(r.lastStudied).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="shrink-0 flex flex-col sm:flex-row gap-2">
                  <Link
                    href={subjectUrl(r.programId, r.semesterId, r.subjectSlug, r.moduleId)}
                    className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors text-center"
                  >
                    Review →
                  </Link>
                  <Link
                    href={`/night-before?subject=${encodeURIComponent(r.subjectCode)}&program=${programSlug(r.programId)}&time=30`}
                    className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors text-center"
                  >
                    Plan
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}