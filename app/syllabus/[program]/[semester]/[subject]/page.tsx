import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SubjectHeader from "@/components/subject/SubjectHeader";
import SyllabusSourceStrip from "@/components/subject/SyllabusSourceStrip";
import ContinueLearning from "@/components/subject/ContinueLearning";
import SubjectMasteryBar from "@/components/mastery/SubjectMasteryBar";
import ModuleCard from "@/components/subject/ModuleCard";
import ModuleAccordion from "@/components/ModuleAccordion";
import { ProgramId } from "@/lib/types";
import { findSubject, semesters, subjects, syllabusModulesFor } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { PRODUCT_NAME } from "@/lib/branch";
import { programFromSlug, programSlug } from "@/lib/urls";
import { PROGRAMS } from "@/lib/domain";
import { estimatedSubjectMinutes } from "@/lib/study";

function allSubjectsFor(programId: ProgramId, semesterId: string) {
  return subjects.filter((s) => s.programId === programId && s.semesterId === semesterId);
}

export function generateStaticParams() {
  const out: { program: string; semester: string; subject: string }[] = [];
  for (const p of PROGRAMS) {
    for (const s of semesters) {
      const programId = programFromSlug(p.slug);
      if (!programId) continue;
      for (const subject of allSubjectsFor(programId, s.id)) {
        out.push({ program: p.slug, semester: s.id, subject: subject.slug });
      }
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: { program: string; semester: string; subject: string };
}): Promise<Metadata> {
  const programId = programFromSlug(params.program);
  if (!programId) return {};
  const subject = findSubject(programId, params.semester, params.subject);
  if (!subject) return {};
  return {
    title: `${subject.name} — ${params.semester.toUpperCase()} — ${PRODUCT_NAME}`,
    description: `Study ${subject.name} (${subject.code}). Modules, practice questions, PYQs, AI study tools and revision for KTU 2024 ${params.program.toUpperCase()}.`,
  };
}

export default function SubjectPage({
  params,
}: {
  params: { program: string; semester: string; subject: string };
}) {
  const programId: ProgramId | null = programFromSlug(params.program);
  if (!programId) notFound();

  const subject = findSubject(programId, params.semester, params.subject);
  if (!subject) notFound();

  const content = getSubjectContent(subject.code, programId);
  const notesModules = content?.modules ?? [];
  const syllabusMods = syllabusModulesFor(programId, subject.code);
  const estimatedMinutes = estimatedSubjectMinutes(notesModules);
  const pyqCount = notesModules.reduce((n, m) => n + m.examFocus.length, 0);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <SubjectHeader subject={subject} moduleCount={notesModules.length} />

      <SyllabusSourceStrip
        programId={programId}
        semesterId={subject.semesterId}
        subjectCode={subject.code}
        subjectSlug={subject.slug}
      />

      <ContinueLearning
        programId={programId}
        subjectCode={subject.code}
        subjectName={subject.name}
        semesterId={subject.semesterId}
        subjectSlug={subject.slug}
      />

      {/* Progress */}
      {notesModules.length > 0 && (
        <SubjectMasteryBar
          subjectCode={subject.code}
          subjectSlug={subject.slug}
          semesterId={subject.semesterId}
          programId={programId}
        />
      )}

      {/* Modules */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border/40 pb-2">
          <div className="flex items-baseline gap-3">
            <span className="eyebrow text-ink-hi">Modules</span>
          </div>
          {notesModules.length > 0 && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              {notesModules.length} modules
            </span>
          )}
        </div>

        {notesModules.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {notesModules.map((m, i) => (
              <ModuleCard key={m.id} index={i} module={m} subject={subject} />
            ))}
          </div>
        )}

        {notesModules.length === 0 && syllabusMods.length > 0 && (
          <div className="space-y-2">
            {syllabusMods.map((m) => (
              <details
                key={m.id}
                className="card px-4 py-3 group open:border-signal/40 transition-colors"
              >
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none">
                  <span className="font-display font-semibold text-sm text-ink-hi">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint mr-2">
                      Module {String(m.number).padStart(2, "0")}
                    </span>
                    {m.title}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wide">
                    expand
                  </span>
                </summary>
                <p className="text-sm text-ink-lo leading-relaxed whitespace-pre-line pt-3 border-t border-bg-border/40 mt-2">
                  {m.content}
                </p>
              </details>
            ))}
          </div>
        )}

        {notesModules.length === 0 && syllabusMods.length === 0 && (
          <div className="card p-8 text-center">
            <p className="text-base text-ink-hi mb-1">Module breakdown not available yet</p>
            <p className="text-sm text-ink-lo">
              Use AI Study to explore this subject module by module and build your own notes.
            </p>
          </div>
        )}
      </section>

      {/* PYQs */}
      {notesModules.length > 0 && pyqCount > 0 && (
        <section className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap border-b border-bg-border/40 pb-2">
            <span className="eyebrow text-ink-hi">PYQs · {pyqCount} questions</span>
            <Link
              href={`/pyqs?program=${programSlug(programId)}&semester=${subject.semesterId}&subject=${encodeURIComponent(subject.code)}`}
              className="font-mono text-[11px] text-signal hover:text-signal-dim transition-colors uppercase tracking-wider"
            >
              Full bank →
            </Link>
          </div>
          <details className="card px-5 py-4 group">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-2">
              <span className="font-display font-semibold text-sm text-ink-hi">Browse by module</span>
              <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wide">expand</span>
            </summary>
          <div className="space-y-2">
            {notesModules.map((m) => (
              <section key={m.id} className="space-y-2">
                <h3 className="font-display font-semibold text-ink-hi text-sm">
                  <span className="font-mono text-ink-faint mr-2">{m.id.toUpperCase()}</span>
                  {m.title}
                </h3>
                {m.examFocus.length === 0 && (
                  <p className="text-sm text-ink-faint">No listed questions for this module.</p>
                )}
                {m.examFocus.map((ef, i) => (
                  <div key={i} className="card px-4 py-3 flex items-start gap-3">
                    <span
                      className={`chip shrink-0 ${
                        ef.weightage === "high"
                          ? "border-critical text-critical"
                          : ef.weightage === "medium"
                            ? "border-signal-dim text-signal"
                            : "border-bg-border text-ink-faint"
                      }`}
                    >
                      {ef.weightage}
                    </span>
                    <p className="text-sm text-ink-lo">{ef.question}</p>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </details>
        </section>
      )}

      {/* Resources — notes are secondary */}
      <section className="space-y-4">
        <div className="border-b border-bg-border/40 pb-2">
          <span className="eyebrow text-ink-hi">Notes / Resources</span>
          <p className="text-xs text-ink-lo mt-1 max-w-xl">
            Exam-focused notes are optional context — Continue Learning above works even without them.
          </p>
        </div>

        {notesModules.length > 0 ? (
          <ModuleAccordion
            modules={notesModules}
            subjectCode={subject.code}
            subjectName={subject.name}
            programId={programId}
          />
        ) : (
          <div className="card p-8 text-center">
            <p className="text-base text-ink-hi mb-1">Notes for this subject aren&apos;t written yet</p>
            <p className="text-sm text-ink-lo">
              Continue Learning above adapts to this subject anyway — it teaches from your active syllabus.
            </p>
          </div>
        )}
      </section>

    {notesModules.length > 0 && estimatedMinutes > 0 && (
        <p className="text-xs text-ink-faint">
          ≈ {estimatedMinutes >= 60 ? `${Math.round(estimatedMinutes / 60)}h` : `${estimatedMinutes}m`} of
          curated content available across this subject.
        </p>
      )}
    </main>
  );
}