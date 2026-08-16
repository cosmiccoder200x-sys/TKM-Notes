import Link from "next/link";
import type { Metadata } from "next";
import { semesters, subjects, syllabusModulesFor } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { PROGRAM_SLUGS, PROGRAM_LABELS, semesterUrl, subjectUrl } from "@/lib/urls";
import { ProgramId } from "@/lib/types";
import { PRODUCT_NAME } from "@/lib/branch";
import {
  LEARN_SUBJECTS,
  getLearnSubject,
  subjectTopics,
  totalTopics,
  findLearnTopic,
} from "@/lib/learn-cs";
import { LEARN_FINE_CATEGORIES, LEARN_ROADMAP_LEVELS, getLearnFineCategory } from "@/lib/learn-cs/categories";
import { syllabusLinksForSubject, syllabusLinkHasNotes } from "@/lib/learn-cs/syllabus";

export const metadata: Metadata = {
  title: `Admin — ${PRODUCT_NAME}`,
  description: "Data integrity view: per-branch syllabus counts, notes coverage, module breakdowns.",
};

const PROGRAMS: ProgramId[] = ["ER", "CS", "CS_AI"];

export default function AdminPage() {
  const notesTotal = subjects.filter((s) => getSubjectContent(s.code, s.programId)).length;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <header className="border-b border-bg-border pb-6">
        <div className="section-kicker">Admin · data integrity</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          Syllabus & Notes Overview
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed mt-1.5 max-w-2xl">
          Read-only view of the generated syllabus data per branch. All counts derive from the
          import pipeline (lib/syllabusData.ts) and the notes registry — nothing is hard-coded here.
        </p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{subjects.length}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Total subjects</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{notesTotal}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Subjects with notes</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-signal">{semesters.length}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Semesters (S3–S8)</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">{PROGRAMS.length}</div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Programs</div>
        </div>
      </section>

      {PROGRAMS.map((pid) => {
        const list = subjects.filter((s) => s.programId === pid);
        const withNotes = list.filter((s) => getSubjectContent(s.code, pid)).length;
        const moduleCount = list.reduce(
          (acc, s) => acc + syllabusModulesFor(pid, s.code).length,
          0
        );
        return (
          <section key={pid} className="space-y-4">
            <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal">{PROGRAM_SLUGS[pid]}</span>
                <h2 className="font-display font-semibold text-xl text-ink-hi mt-1">{PROGRAM_LABELS[pid]}</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="chip border-signal-dim text-signal">{list.length} subjects</span>
                <span className="chip">{withNotes} with notes</span>
                <span className="chip">{moduleCount} syllabus modules</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {semesters.map((sem) => {
                const inSem = list.filter((s) => s.semesterId === sem.id);
                if (inSem.length === 0) return null;
                return (
                  <div key={sem.id} className="card p-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <Link
                        href={semesterUrl(pid, sem.id)}
                        className="font-mono text-[11px] uppercase tracking-wide text-ink-hi hover:text-signal transition-colors"
                      >
                        {sem.id.toUpperCase()}
                      </Link>
                      <span className="text-xs font-mono text-ink-faint">{inSem.length}</span>
                    </div>
                    <ul className="space-y-1">
                      {inSem.map((s) => {
                        const notes = Boolean(getSubjectContent(s.code, pid));
                        const mods = syllabusModulesFor(pid, s.code).length;
                        return (
                          <li key={s.code} className="text-xs leading-relaxed">
                            <Link
                              href={subjectUrl(pid, s.semesterId, s.slug)}
                              className={`transition-colors ${
                                notes ? "text-ink-hi hover:text-signal" : "text-ink-faint hover:text-ink-lo"
                              }`}
                            >
                              <span className="font-mono text-ink-faint">{s.code}</span> · {s.name}
                              {mods > 0 && <span className="text-ink-faintest"> · {mods} mod</span>}
                              {notes && <span className="text-signal"> · notes</span>}
                            </Link>
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
        Source of truth: JSON import → scripts/import-syllabus.mjs → lib/syllabusData.ts. Notes
        registry: lib/notes/index.ts keyed by programId + subject code. To regenerate the syllabus
        data run: node scripts/import-syllabus.mjs &lt;path-to-json&gt;
      </p>

      {/* Learn CS integrity */}
      <section className="space-y-4 border-t border-bg-border pt-6">
        <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border pb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-signal">learn-cs</span>
            <h2 className="font-display font-semibold text-xl text-ink-hi mt-1">Learn CS catalog integrity</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="chip border-signal-dim text-signal">{LEARN_SUBJECTS.length} subjects</span>
            <span className="chip">{LEARN_SUBJECTS.reduce((a, s) => a + totalTopics(s), 0)} topics</span>
            <span className="chip">{LEARN_FINE_CATEGORIES.length} fine categories</span>
            <span className="chip">{LEARN_ROADMAP_LEVELS.length} roadmap levels</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="card p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Prerequisites graph</span>
            <ul className="space-y-1 text-xs">
              {(() => {
                const orphaned: string[] = [];
                const dangling: { from: string; to: string }[] = [];
                for (const subject of LEARN_SUBJECTS) {
                  for (const pre of subject.prerequisites ?? []) {
                    if (!getLearnSubject(pre)) dangling.push({ from: subject.slug, to: pre });
                  }
                  for (const topic of subjectTopics(subject)) {
                    for (const pre of topic.prerequisites ?? []) {
                      if (!findLearnTopic(subject, pre)) orphaned.push(`${subject.slug}/${pre}`);
                    }
                  }
                }
                return (
                  <>
                    <li className="flex justify-between">
                      <span className="text-ink-lo">Subjects with prerequisites</span>
                      <span className="font-mono text-ink-hi">
                        {LEARN_SUBJECTS.filter((s) => (s.prerequisites ?? []).length > 0).length}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-ink-lo">Topics with prerequisites</span>
                      <span className="font-mono text-ink-hi">
                        {LEARN_SUBJECTS.reduce(
                          (a, s) =>
                            a + subjectTopics(s).filter((t) => (t.prerequisites ?? []).length > 0).length,
                          0
                        )}
                      </span>
                    </li>
                    <li className={`flex justify-between ${dangling.length > 0 ? "text-critical" : "text-signal"}`}>
                      <span>Dangling subject prereqs</span>
                      <span className="font-mono">{dangling.length}</span>
                    </li>
                    <li className={`flex justify-between ${orphaned.length > 0 ? "text-critical" : "text-signal"}`}>
                      <span>Orphan topic prereqs</span>
                      <span className="font-mono">{orphaned.length}</span>
                    </li>
                    {dangling.length > 0 && (
                      <li className="text-ink-faint pt-1">{dangling.map((d) => `${d.from}→${d.to}`).join(", ")}</li>
                    )}
                  </>
                );
              })()}
            </ul>
          </div>

          <div className="card p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Fine category coverage</span>
            <ul className="space-y-1 text-xs">
              {(() => {
                const mapped = LEARN_SUBJECTS.filter((s) => getLearnFineCategory(s.slug)).length;
                const unmapped = LEARN_SUBJECTS.filter((s) => !getLearnFineCategory(s.slug));
                return (
                  <>
                    <li className="flex justify-between">
                      <span className="text-ink-lo">Subjects with fine category</span>
                      <span className="font-mono text-ink-hi">
                        {mapped}/{LEARN_SUBJECTS.length}
                      </span>
                    </li>
                    <li className={`flex justify-between ${unmapped.length > 0 ? "text-critical" : "text-signal"}`}>
                      <span>Unmapped subjects</span>
                      <span className="font-mono">{unmapped.length}</span>
                    </li>
                    {unmapped.map((s) => (
                      <li key={s.slug} className="text-ink-faint font-mono">· {s.slug}</li>
                    ))}
                  </>
                );
              })()}
            </ul>
          </div>

          <div className="card p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">TKM syllabus cross-links</span>
            <ul className="space-y-1 text-xs">
              {(() => {
                const withLinks = LEARN_SUBJECTS.filter((s) => syllabusLinksForSubject(s.slug).length > 0);
                const links = withLinks.flatMap((s) => syllabusLinksForSubject(s.slug));
                const withNotes = links.filter((l) => syllabusLinkHasNotes(l)).length;
                return (
                  <>
                    <li className="flex justify-between">
                      <span className="text-ink-lo">Subjects with cross-links</span>
                      <span className="font-mono text-ink-hi">{withLinks.length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-ink-lo">Resolved target links</span>
                      <span className="font-mono text-ink-hi">{links.length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-ink-lo">Links to subjects with written notes</span>
                      <span className="font-mono text-ink-hi">{withNotes}</span>
                    </li>
                  </>
                );
              })()}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}