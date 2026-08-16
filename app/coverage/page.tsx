import Link from "next/link";
import type { Metadata } from "next";
import { subjects, semesters, syllabusModulesFor } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { getQuestionBank } from "@/lib/pyqs";
import { PROGRAM_SLUGS, PROGRAM_LABELS, programUrl, subjectUrl } from "@/lib/urls";
import { ProgramId } from "@/lib/types";
import { PRODUCT_NAME } from "@/lib/branch";

export const metadata: Metadata = {
  title: `Coverage — ${PRODUCT_NAME}`,
  description: "How much of each KTU 2024 branch syllabus is covered by written notes and previous-year questions.",
};

const PROGRAMS: ProgramId[] = ["ER", "CS", "CS_AI"];

export default function CoveragePage() {
  const bank = getQuestionBank();
  const bankBySubject = new Map<string, number>();
  for (const q of bank) {
    const key = `${q.programId}:${q.subjectCode}`;
    bankBySubject.set(key, (bankBySubject.get(key) ?? 0) + 1);
  }

  const totals = {
    subjects: subjects.length,
    notes: 0,
    withPyqs: 0,
    withModules: 0,
  };
  for (const s of subjects) {
    const hasNotes = Boolean(getSubjectContent(s.code, s.programId));
    if (hasNotes) totals.notes += 1;
    if (syllabusModulesFor(s.programId, s.code).length > 0) totals.withModules += 1;
    if ((bankBySubject.get(`${s.programId}:${s.code}`) ?? 0) > 0) totals.withPyqs += 1;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <header className="border-b border-bg-border pb-6">
        <div className="section-kicker">Coverage</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          Syllabus coverage
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed mt-1.5 max-w-2xl">
          How much of the KTU 2024 scheme is actually written up as notes, and how many subjects
          have exam-focus questions in the PYQ bank. Empty rows mean &ldquo;not written yet&rdquo;
          — every subject still has a live page with AI study prompts.
        </p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{totals.subjects}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Subjects</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-signal">{totals.notes}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">With written notes</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{totals.withModules}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">With syllabus modules</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{totals.withPyqs}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">With PYQ questions</div>
        </div>
      </section>

      {PROGRAMS.map((pid) => {
        const list = subjects.filter((s) => s.programId === pid);
        const notes = list.filter((s) => getSubjectContent(s.code, pid)).length;
        const pyqs = list.filter((s) => (bankBySubject.get(`${pid}:${s.code}`) ?? 0) > 0).length;
        return (
          <section key={pid} className="space-y-3">
            <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border pb-2">
              <h2 className="font-display font-semibold text-xl text-ink-hi">
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal mr-2">
                  {PROGRAM_SLUGS[pid]}
                </span>
                {PROGRAM_LABELS[pid]}
              </h2>
              <span className="text-xs font-mono text-ink-faint">
                {notes}/{list.length} notes · {pyqs}/{list.length} with PYQs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {semesters.map((sem) => {
                const inSem = list.filter((s) => s.semesterId === sem.id);
                if (inSem.length === 0) return null;
                const withNotes = inSem.filter((s) => getSubjectContent(s.code, pid)).length;
                const withPyqs = inSem.filter((s) => (bankBySubject.get(`${pid}:${s.code}`) ?? 0) > 0).length;
                const pct = Math.round((withNotes / inSem.length) * 100);
                return (
                  <div key={sem.id} className="card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] uppercase tracking-wide text-ink-hi">
                        {sem.id.toUpperCase()}
                      </span>
                      <span className="font-mono text-[11px] text-ink-faint">
                        {withNotes} notes · {withPyqs} PYQs
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-bg-raised rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-signal rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <ul className="space-y-1">
                      {inSem.map((s) => {
                        const hasNotes = Boolean(getSubjectContent(s.code, pid));
                        const hasPyqs = (bankBySubject.get(`${pid}:${s.code}`) ?? 0) > 0;
                        return (
                          <li key={s.code} className="text-xs leading-relaxed flex items-center gap-2">
                            <Link
                              href={subjectUrl(pid, s.semesterId, s.slug)}
                              className={`transition-colors truncate ${
                                hasNotes ? "text-ink-hi hover:text-signal" : "text-ink-faint hover:text-ink-lo"
                              }`}
                            >
                              {s.name}
                            </Link>
                            <span className="ml-auto shrink-0 flex items-center gap-1 font-mono text-[10px]">
                              {hasNotes ? <span className="text-signal">notes</span> : null}
                              {hasNotes && hasPyqs ? <span className="text-ink-faintest">·</span> : null}
                              {hasPyqs ? <span className="text-ink-lo">PYQ</span> : null}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <p className="text-xs text-ink-faint leading-relaxed max-w-2xl">
        Want to contribute? Each &ldquo;not written yet&rdquo; subject is a candidate for a note file
        in lib/notes/ — copy lib/notes/data-structures-and-algorithms.ts as the template and register
        it in lib/notes/index.ts keyed by programId + subject code.
      </p>
    </main>
  );
}