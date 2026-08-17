import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SubjectHeader from "@/components/subject/SubjectHeader";
import SubjectMasteryBar from "@/components/mastery/SubjectMasteryBar";
import ModuleMasteryBadges from "@/components/mastery/ModuleMasteryBadges";
import ModuleCard from "@/components/subject/ModuleCard";
import StudyModeSwitcher from "@/components/StudyModeSwitcher";
import ModuleAccordion from "@/components/ModuleAccordion";
import DeepDivePrompt from "@/components/DeepDivePrompt";
import { NavIcon } from "@/components/navigation/navItems";
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

const STUDY_ACTIONS = [
  {
    label: "Practice",
    description: "Answer real exam questions and track accuracy",
    icon: "practice" as const,
    hrefFor: (programId: ProgramId, subject: { code: string; semesterId: string }) =>
      `/practice?program=${programSlug(programId)}&semester=${subject.semesterId}&subject=${encodeURIComponent(subject.code)}`,
  },
  {
    label: "PYQs",
    description: "Browse every previous-year question for this subject",
    icon: "pyq" as const,
    hrefFor: (programId: ProgramId, subject: { code: string; semesterId: string }) =>
      `/pyqs?program=${programSlug(programId)}&semester=${subject.semesterId}&subject=${encodeURIComponent(subject.code)}`,
  },
  {
    label: "AI Study",
    description: "Explain, quiz, or revise with AI — built-in context",
    icon: "learn" as const,
    hrefFor: (programId: ProgramId, subject: { code: string; semesterId: string }) =>
      `/ai-study?program=${programSlug(programId)}&semester=${subject.semesterId}&subject=${encodeURIComponent(subject.code)}`,
  },
  {
    label: "Revision",
    description: "High-value last-minute revision plan",
    icon: "revision" as const,
    hrefFor: (programId: ProgramId, subject: { code: string }) =>
      `/night-before?subject=${encodeURIComponent(subject.code)}&program=${programSlug(programId)}&time=60`,
  },
];

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

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <SubjectHeader subject={subject} moduleCount={notesModules.length} />

      {/* STUDY actions */}
      <section className="card p-5 space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <span className="eyebrow">Study</span>
            <h2 className="font-display font-semibold text-lg text-ink-hi mt-0.5">
              What do you want to do?
            </h2>
          </div>
          <Link
            href={`/planner?subject=${encodeURIComponent(subject.code)}&program=${programSlug(programId)}&minutes=60`}
            className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-md bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
          >
            Build My Plan
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STUDY_ACTIONS.map((a) => (
            <Link
              key={a.label}
              href={a.hrefFor(programId, subject)}
              className="flex items-center gap-3 px-4 py-3 rounded-card border border-bg-border hover:border-signal/60 hover:bg-signal/5 transition-colors group no-underline"
            >
              <span className="text-signal shrink-0">
                <NavIcon name={a.icon} className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-semibold text-sm text-ink-hi group-hover:text-signal transition-colors">
                  {a.label}
                </span>
                <span className="block text-xs text-ink-lo leading-snug">{a.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notesModules.map((m, i) => (
                <ModuleCard key={m.id} index={i} module={m} subject={subject} />
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
              <span className="font-display font-semibold text-base text-ink-hi">
                Study order & progress
              </span>
              <ModuleMasteryBadges subjectCode={subject.code} modules={notesModules} programId={programId} />
            </div>

            <StudyModeSwitcher
              modules={notesModules}
              subjectCode={subject.code}
              subjectName={subject.name}
              subjectSlug={subject.slug}
              semesterId={subject.semesterId}
              programId={programId}
            />
          </>
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
      {notesModules.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap border-b border-bg-border/40 pb-2">
            <span className="eyebrow text-ink-hi">PYQs</span>
            <Link
              href={`/pyqs?program=${programSlug(programId)}&semester=${subject.semesterId}&subject=${encodeURIComponent(subject.code)}`}
              className="font-mono text-[11px] text-signal hover:text-signal-dim transition-colors uppercase tracking-wider"
            >
              Open full question bank →
            </Link>
          </div>
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
        </section>
      )}

      {/* Resources — notes are secondary */}
      <section className="space-y-4">
        <div className="border-b border-bg-border/40 pb-2">
          <span className="eyebrow text-ink-hi">Notes / Resources</span>
          <p className="text-xs text-ink-lo mt-1 max-w-xl">
            Exam-focused notes are optional context — the study tools above work even without them.
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
              You can still practice, browse PYQs and study with AI — use AI Study below to generate
              your own notes for this subject.
            </p>
          </div>
        )}
      </section>

      <DeepDivePrompt subject={subject} />

      {notesModules.length > 0 && estimatedMinutes > 0 && (
        <p className="text-xs text-ink-faint">
          ≈ {estimatedMinutes >= 60 ? `${Math.round(estimatedMinutes / 60)}h` : `${estimatedMinutes}m`} of
          curated content available across this subject.
        </p>
      )}
    </main>
  );
}