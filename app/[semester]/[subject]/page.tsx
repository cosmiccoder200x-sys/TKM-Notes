import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ModuleAccordion from "@/components/ModuleAccordion";
import StudyModeSwitcher from "@/components/StudyModeSwitcher";
import DeepDivePrompt from "@/components/DeepDivePrompt";
import ModuleMasteryBadges from "@/components/mastery/ModuleMasteryBadges";
import { subjects, findSubject } from "@/lib/content";
import registry from "@/lib/notes";
import { getSubjectCategoryMeta, PRODUCT_NAME } from "@/lib/branch";
import { generatePromptLabUrl } from "@/lib/prompts/context";
import { estimatedSubjectMinutes, rankModulesForStudy } from "@/lib/study";
import SubjectMasteryBar from "@/components/mastery/SubjectMasteryBar";

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

  const content = registry[subject.code];
  const cat = getSubjectCategoryMeta(subject);
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
  const rankedCounts = {
    mustLearn: rankModulesForStudy(modules).filter((r) => r.priority.tier === "must-learn").length,
  };

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

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-ink-faint">
          <li>
            <Link href="/" className="hover:text-signal transition-colors">
              {PRODUCT_NAME}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/${subject.semesterId}`}
              className="hover:text-signal transition-colors"
            >
              {subject.semesterId.toUpperCase()}
            </Link>
          </li>
          <li>/</li>
          <li className="text-ink-hi">{subject.code}</li>
        </ol>
      </nav>

      {/* Subject header */}
      <header className="space-y-4 border-b border-bg-border pb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="chip border-signal-dim text-signal">{cat.label}</span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
            {subject.code} · {subject.credits} credits
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          {subject.name}
        </h1>
        <p className="text-base text-ink-lo">
          {modules.length > 0
            ? `${modules.length} modules · Exam-focused notes`
            : "Notes for this subject haven't been written yet."}
        </p>
        {modules.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/${subject.semesterId}/${subject.slug}/mastery`}
              className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-md border border-bg-border text-ink-hi hover:border-signal hover:bg-signal/5 hover:text-signal transition-colors"
            >
              ▦ Mastery Map
            </Link>
            <Link
              href={`/night-before?subject=${encodeURIComponent(subject.code)}&time=60`}
              className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-md border border-signal text-signal hover:bg-signal/10 transition-colors"
            >
              ⏱ Night-Before
            </Link>
          </div>
        )}
      </header>

      {/* Subject overview strip */}
      {modules.length > 0 && <SubjectMasteryBar subjectCode={subject.code} subjectSlug={subject.slug} semesterId={subject.semesterId} />}

      {modules.length > 0 && (
        <section className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="card p-4">
              <div className="text-2xl font-display font-bold text-ink-hi">{modules.length}</div>
              <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Modules</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl font-display font-bold text-ink-hi">{stats.questions}</div>
              <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Important questions</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl font-display font-bold text-ink-hi">{stats.formulas}</div>
              <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Formulas</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl font-display font-bold text-ink-hi">{stats.revision}</div>
              <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Revision notes</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl font-display font-bold text-ink-hi">
                ≈ {estimatedMinutes >= 60 ? `${Math.round(estimatedMinutes / 60)}h` : `${estimatedMinutes}m`}
              </div>
              <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">Study time</div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/planner?subject=${encodeURIComponent(subject.code)}&minutes=60`}
              className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-md bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
            >
              ✱ Build My Study Plan
            </Link>
          </div>

          {/* Quick AI actions */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="eyebrow">use with AI</span>
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
        </section>
      )}

      {!content && (
        <div className="card p-8 text-center">
          <p className="text-base text-ink-hi mb-1">Notes for this subject haven&apos;t been written yet.</p>
          <p className="text-sm text-ink-lo">Use the AI study prompt below to generate your own in the meantime.</p>
        </div>
      )}

      {/* Modules accordion — one open at a time */}
      {modules.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-bg-border">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="font-display font-semibold text-lg text-ink-hi">Modules</h2>
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

      <DeepDivePrompt subject={subject} />
    </main>
  );
}