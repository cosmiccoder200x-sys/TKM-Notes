import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import ModuleAccordion from "@/components/ModuleAccordion";
import DeepDivePrompt from "@/components/DeepDivePrompt";
import { subjects, findSubject } from "@/lib/content";
import registry from "@/lib/notes";
import { getSubjectCategoryMeta } from "@/lib/branch";
import { generatePromptLabUrl } from "@/lib/prompts/context";

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
    title: `${subject.name} — ${params.semester.toUpperCase()} — TKM Notes`,
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
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <nav aria-label="Breadcrumb" className="mb-1">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-ink-faint">
            <li>
              <Link href="/" className="hover:text-signal transition-colors">
                TKM Notes
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
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="chip border-signal-dim text-signal">{cat.label}</span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              {subject.code} · {subject.credits} credits
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-hi leading-tight tracking-tight">
            {subject.name}
          </h1>
          <p className="text-sm text-ink-lo">
            {modules.length > 0
              ? `${modules.length} modules · Exam-focused notes`
              : "Notes for this subject haven't been written yet."}
          </p>
        </div>

        {/* Subject overview strip */}
        {modules.length > 0 && (
          <section className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
            </div>

            {/* Quick AI actions */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="eyebrow">use with AI</span>
              {quickActions.map((a) => (
                <Link
                  key={a.label}
                  href={generatePromptLabUrl(subjectCtx, a.mode)}
                  className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:bg-signal/5 hover:text-signal transition-colors"
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {!content && (
          <div className="card p-5 text-center">
            <p className="text-sm text-ink-hi mb-1">Notes for this subject haven&apos;t been written yet.</p>
            <p className="text-xs text-ink-lo">Use the AI study prompt below to generate your own in the meantime.</p>
          </div>
        )}

        {/* Modules accordion — one open at a time */}
        {modules.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display font-semibold text-lg text-ink-hi">Modules</h2>
            <ModuleAccordion
              modules={modules}
              subjectCode={subject.code}
              subjectName={subject.name}
            />
          </section>
        )}

        <DeepDivePrompt subject={subject} />
      </main>
    </>
  );
}
