import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SubjectHeader from "@/components/subject/SubjectHeader";
import SubjectTabs from "@/components/subject/SubjectTabs";
import SubjectProgress from "@/components/subject/SubjectProgress";
import ModuleCard from "@/components/subject/ModuleCard";
import ModuleAccordion from "@/components/ModuleAccordion";
import StudyModeSwitcher from "@/components/StudyModeSwitcher";
import DeepDivePrompt from "@/components/DeepDivePrompt";
import ModuleMasteryBadges from "@/components/mastery/ModuleMasteryBadges";
import SubjectMasteryBar from "@/components/mastery/SubjectMasteryBar";
import { subjects, findSubject } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { PRODUCT_NAME } from "@/lib/branch";
import { generatePromptLabUrl } from "@/lib/prompts/context";
import { estimatedSubjectMinutes } from "@/lib/study";

export function generateStaticParams() {
  return subjects.map((s) => ({ semester: s.semesterId, subject: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { semester: string; subject: string };
}): Metadata {
  const subject = findSubject(params.semester, params.subject);
  if (!subject) return {};
  return {
    title: `${subject.name} — ${params.semester.toUpperCase()} — ${PRODUCT_NAME}`,
    description: `Exam-focused notes for ${subject.name} (${subject.code}). Modules, definitions, formulas, exam questions, revision notes and AI study tools.`,
  };
}

export default function SubjectPage({ params }: { params: { semester: string; subject: string } }) {
  const subject = findSubject(params.semester, params.subject);
  if (!subject) notFound();

  const content = getSubjectContent(subject.code, subject.programId);
  const modules = content?.modules ?? [];

  const stats = modules.reduce(
    (acc, m) => {
      acc.questions += m.examFocus.length;
      acc.formulas += m.formulas.length;
      acc.revision += m.revisionNotes.length;
      acc.definitions += m.definitions.length;
      return acc;
    },
    { questions: 0, formulas: 0, revision: 0, definitions: 0 }
  );

  const estimatedMinutes = estimatedSubjectMinutes(modules);

  const subjectCtx = {
    subjectCode: subject.code,
    subjectSlug: subject.slug,
    subjectName: subject.name,
  };

  const quickActions = [
    { label: "Learn", mode: "learn" },
    { label: "Practice", mode: "problem-solver" },
    { label: "Exam", mode: "exam-answer" },
    { label: "Revise", mode: "revision" },
  ];

  const overviewSlot = (
    <div className="space-y-6">
      {modules.length > 0 && (
        <SubjectProgress subject={subject} stats={stats} estimatedMinutes={estimatedMinutes} />
      )}

      {modules.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/planner?subject=${encodeURIComponent(subject.code)}&minutes=60`}
            className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-md bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
          >
            ✱ Build My Study Plan
          </Link>
          <span className="eyebrow self-center">use with AI</span>
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={generatePromptLabUrl(subjectCtx, a.mode)}
              className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-md border border-bg-border text-ink-hi hover:border-signal hover:bg-signal/5 hover:text-signal transition-colors"
            >
              {a.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const modulesSlot = (
    <div className="space-y-6">
      {modules.length > 0 && (
        <section className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modules.map((m, i) => (
              <ModuleCard key={m.id} index={i} module={m} subject={subject} />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
            <h2 className="font-display font-semibold text-lg text-ink-hi">Module details</h2>
            <ModuleMasteryBadges subjectCode={subject.code} modules={modules} />
          </div>

          <StudyModeSwitcher
            modules={modules}
            subjectCode={subject.code}
            subjectName={subject.name}
            subjectSlug={subject.slug}
            semesterId={subject.semesterId}
          />
          <ModuleAccordion
            modules={modules}
            subjectCode={subject.code}
            subjectName={subject.name}
          />
        </section>
      )}

      {!content && (
        <div className="card p-8 text-center">
          <p className="text-base text-ink-hi mb-1">Notes for this subject haven&apos;t been written yet.</p>
          <p className="text-sm text-ink-lo">Use the AI study prompt below to generate your own in the meantime.</p>
        </div>
      )}
    </div>
  );

  const pyqsSlot = (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="font-display font-semibold text-ink-hi text-base">Previous-Year Questions</h2>
        <Link
          href="/pyqs"
          className="font-mono text-[11px] text-signal hover:text-signal-dim transition-colors uppercase tracking-wider"
        >
          Open full question bank →
        </Link>
      </div>
      {modules.length === 0 && (
        <div className="card p-8 text-center text-sm text-ink-lo">No previous-year questions available yet.</div>
      )}
      {modules.map((m) => (
        <section key={m.id} className="space-y-2">
          <h2 className="font-display font-semibold text-ink-hi text-sm">
            <span className="font-mono text-ink-faint mr-2">{m.id}</span>
            {m.title}
          </h2>
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
  );

  const masterySlot = (
    <div className="space-y-4">
      <SubjectMasteryBar
        subjectCode={subject.code}
        subjectSlug={subject.slug}
        semesterId={subject.semesterId}
      />
      {modules.length > 0 && (
        <Link
          href={`/${subject.semesterId}/${subject.slug}/mastery`}
          className="inline-block font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-md border border-signal text-signal hover:bg-signal/10 transition-colors"
        >
          ▦ Open full mastery map
        </Link>
      )}
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <SubjectHeader subject={subject} moduleCount={modules.length} />

      <SubjectTabs
        overview={overviewSlot}
        modules={modulesSlot}
        pyqs={pyqsSlot}
        mastery={masterySlot}
      />

      <DeepDivePrompt subject={subject} />
    </main>
  );
}
