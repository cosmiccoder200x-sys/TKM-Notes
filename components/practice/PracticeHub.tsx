"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { semesters } from "@/lib/content";
import { getQuestionBankStats, type PyqEntry } from "@/lib/pyqs";
import { recordAttempt, progressSubjectKey, AttemptResult } from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { PROGRAM_OPTIONS, normalizeProgramId } from "@/lib/branch";
import { programFromSlug, programSlug, subjectUrl } from "@/lib/urls";
import PriorityLabel from "@/components/PriorityLabel";

interface SessionAnswer {
  id: string;
  result: AttemptResult;
}

interface PracticeSession {
  questions: PyqEntry[];
  index: number;
  answers: SessionAnswer[];
}

const COUNT_OPTIONS = [5, 10, 15];

const STORAGE_KEY = "tkm_program_id";

export default function PracticeHub({ entries }: { entries: PyqEntry[] }) {
  const params = useSearchParams();
  const urlProgram = programFromSlug(params.get("program") ?? "");
  const urlSemester = params.get("semester") ?? "";
  const urlSubject = params.get("subject") ?? "";

  const [programId, setProgramId] = useState<ProgramId>(urlProgram ?? "ER");
  const [semesterId, setSemesterId] = useState<string>(urlSemester || "all");
  const [subjectCode, setSubjectCode] = useState<string>(urlSubject || "all");
  const [moduleId, setModuleId] = useState<string>("all");
  const [count, setCount] = useState(10);
  const [session, setSession] = useState<PracticeSession | null>(null);

  useEffect(() => {
    const stored = normalizeProgramId(localStorage.getItem(STORAGE_KEY));
    if (stored) setProgramId(stored);
  }, []);

  // Re-derive available options from the question bank only — empty branches
  // honestly show "no questions yet" instead of inventing a practice set.
  const byProgram = useMemo(() => entries.filter((q) => q.programId === programId), [entries, programId]);
  const bySemester = useMemo(
    () => (semesterId === "all" ? byProgram : byProgram.filter((q) => q.semesterId === semesterId)),
    [byProgram, semesterId]
  );
  const bySubject = useMemo(
    () => (subjectCode === "all" ? bySemester : bySemester.filter((q) => q.subjectCode === subjectCode)),
    [bySemester, subjectCode]
  );
  const pool = useMemo(
    () => (moduleId === "all" ? bySubject : bySubject.filter((q) => q.moduleId === moduleId)),
    [bySubject, moduleId]
  );

  const subjectsInScope = useMemo(
    () =>
      Array.from(
        new Map(bySemester.map((q) => [q.subjectCode, q.subjectName])).entries()
      ).sort((a, b) => a[1].localeCompare(b[1])),
    [bySemester]
  );
  const modulesInScope = useMemo(
    () =>
      Array.from(
        new Map(bySubject.map((q) => [q.moduleId, q.moduleTitle])).entries()
      ).sort((a, b) => a[1].localeCompare(b[1])),
    [bySubject]
  );

  const stats = useMemo(() => getQuestionBankStats(pool), [pool]);

  const selectCls =
    "bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm font-mono text-ink-hi focus:border-signal focus:outline-none appearance-none pr-8";

  function startSession() {
    if (pool.length === 0) return;
    const take = Math.min(count, pool.length);
    // High-weightage questions first, then original bank order.
    const ordered = [...pool].sort((a, b) => {
      const w = { high: 0, medium: 1, low: 2 } as const;
      return w[a.weightage] - w[b.weightage];
    });
    setSession({ questions: ordered.slice(0, take), index: 0, answers: [] });
  }

  function grade(result: AttemptResult) {
    if (!session) return;
    const q = session.questions[session.index];
    recordAttempt(progressSubjectKey(q.programId, q.subjectCode), q.moduleId, result);
    const answers = [...session.answers, { id: q.id, result }];
    const next = { ...session, answers, index: session.index + 1 };
    setSession(next);
  }

  if (session) {
    const finished = session.index >= session.questions.length;
    const current = session.questions[session.index];
    const reviewed: Record<string, string> = {};
    for (const a of session.answers) reviewed[a.id] = a.result;

    if (!finished) {
      return (
        <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setSession(null)}
              className="font-mono text-[11px] uppercase tracking-wide text-ink-lo hover:text-signal transition-colors"
            >
              ← Exit practice
            </button>
            <span className="font-mono text-xs text-ink-faint">
              Question {session.index + 1} / {session.questions.length}
            </span>
          </div>

          <div className="card p-6 space-y-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  {current.subjectName} · Module {current.moduleIndex} · {current.moduleTitle}
                </div>
                <p className="text-lg text-ink-hi leading-relaxed mt-2">{current.question}</p>
              </div>
              <PriorityLabel level={current.weightage} />
            </div>

            {current.note && (
              <details className="bg-bg-surface border border-bg-border rounded-card px-4 py-3">
                <summary className="cursor-pointer text-xs font-mono uppercase tracking-wide text-signal list-none">
                  Show answer guidance
                </summary>
                <p className="text-sm text-ink-lo leading-relaxed pt-2">{current.note}</p>
              </details>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wide text-ink-lo">
                How did you do?
              </span>
              {([
                { r: "correct", label: "Got it", cls: "border-signal-dim text-signal hover:bg-signal/10" },
                { r: "partial", label: "Almost", cls: "border-weight-dim text-weight hover:bg-weight/10" },
                { r: "incorrect", label: "Missed it", cls: "border-critical/40 text-critical hover:bg-critical/10" },
              ] as { r: AttemptResult; label: string; cls: string }[]).map((opt) => (
                <button
                  key={opt.r}
                  type="button"
                  onClick={() => grade(opt.r)}
                  className={`font-mono text-xs px-4 py-2 rounded-card border transition-colors ${opt.cls}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-xs text-ink-faint">
            <span>{session.answers.length} answered</span>
            <Link
              href={subjectUrl(current.programId, current.semesterId, current.subjectSlug)}
              className="text-signal hover:underline"
            >
              Open subject →
            </Link>
          </div>
        </main>
      );
    }

    // Results screen — derived entirely from actual answered questions.
    const correct = session.answers.filter((a) => a.result === "correct").length;
    const partial = session.answers.filter((a) => a.result === "partial").length;
    const incorrect = session.answers.filter((a) => a.result === "incorrect").length;
    const score = Math.round(((correct + partial * 0.5) / session.answers.length) * 100);

    const weakByModule = new Map<string, { title: string; subject: PyqEntry }>();
    for (const a of session.answers) {
      if (a.result === "incorrect") {
        const q = session.questions.find((x) => x.id === a.id);
        if (q && !weakByModule.has(q.moduleId)) weakByModule.set(q.moduleId, { title: q.moduleTitle, subject: q });
      }
    }
    const weakTopics = Array.from(weakByModule.values());

    return (
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <header className="space-y-2">
          <div className="section-kicker">Practice results</div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
            {score}%
          </h1>
          <p className="text-sm text-ink-lo">
            {correct} correct · {partial} partial · {incorrect} missed · {session.answers.length} questions
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="card p-4">
            <div className="text-2xl font-display font-bold text-ink-hi">{score}%</div>
            <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Score</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-display font-bold text-ink-hi">
              {Math.round((correct / session.answers.length) * 100)}%
            </div>
            <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Accuracy</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-display font-bold text-critical">{weakTopics.length}</div>
            <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Weak modules</div>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="font-display font-semibold text-lg text-ink-hi">Weak topics</h2>
          {weakTopics.length === 0 ? (
            <p className="text-sm text-ink-lo">
              Nothing missed — review these again tomorrow to lock it in.
            </p>
          ) : (
            <div className="space-y-2">
              {weakTopics.map((w) => (
                <div key={w.subject.moduleId} className="card px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm text-ink-hi font-medium truncate">{w.title}</div>
                    <div className="text-xs text-ink-lo truncate">{w.subject.subjectName}</div>
                  </div>
                  <Link
                    href={subjectUrl(w.subject.programId, w.subject.semesterId, w.subject.subjectSlug, w.subject.moduleId)}
                    className="shrink-0 font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
                  >
                    Revise →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSession(null)}
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
          >
            Practice again
          </button>
          <Link
            href={`/night-before?program=${programSlug(programId)}&time=30`}
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
          >
            Revision plan →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-3 border-b border-bg-border pb-6">
        <div className="section-kicker">Practice</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          Practice real exam questions
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed max-w-2xl">
          Answer the actual high-value questions from your syllabus, self-grade honestly, and build
          mastery module by module. Your results feed the Progress and Revision views — no fake scores.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{stats.total}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Available</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-critical">{stats.high}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">HIGH priority</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{stats.subjectsWithQuestions}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Subjects</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{stats.semestersCovered}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Semesters</div>
        </div>
      </div>

      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Branch
            <select
              value={programId}
              onChange={(e) => {
                setProgramId(e.target.value as ProgramId);
                setSemesterId("all");
                setSubjectCode("all");
                setModuleId("all");
              }}
              className={selectCls}
            >
              {PROGRAM_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.short}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Semester
            <select
              value={semesterId}
              onChange={(e) => {
                setSemesterId(e.target.value);
                setSubjectCode("all");
                setModuleId("all");
              }}
              className={selectCls}
            >
              <option value="all">All</option>
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id.toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Subject
            <select
              value={subjectCode}
              onChange={(e) => {
                setSubjectCode(e.target.value);
                setModuleId("all");
              }}
              className={selectCls}
            >
              <option value="all">All subjects</option>
              {subjectsInScope.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Module
            <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} className={selectCls}>
              <option value="all">All modules</option>
              {modulesInScope.map(([id, title]) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wide text-ink-lo">Questions:</span>
          {COUNT_OPTIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCount(c)}
              aria-pressed={count === c}
              className={`font-mono text-xs px-3 py-1.5 rounded-card border transition-colors ${
                count === c
                  ? "border-signal text-signal bg-signal/10"
                  : "border-bg-border text-ink-lo hover:text-ink-hi"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={startSession}
          disabled={pool.length === 0}
          className="w-full text-center font-mono text-sm uppercase tracking-wide py-3 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Practice {Math.min(count, pool.length) || 0} Questions
        </button>

        {pool.length === 0 && (
          <p className="text-xs text-ink-faint leading-relaxed">
            No questions available for this selection yet. Practice questions appear here as exam-focus
            content is added for this branch.
          </p>
        )}
      </div>
    </main>
  );
}