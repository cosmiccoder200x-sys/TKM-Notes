import type { Subject } from "@/lib/types";
import SubjectMasteryBar from "@/components/mastery/SubjectMasteryBar";

export default function SubjectProgress({
  subject,
  stats,
  estimatedMinutes,
}: {
  subject: Subject;
  stats: { questions: number; formulas: number; revision: number; definitions: number };
  estimatedMinutes: number;
}) {
  const studyTime =
    estimatedMinutes >= 60
      ? `${Math.round(estimatedMinutes / 60)}h`
      : `${estimatedMinutes}m`;

  return (
    <section className="space-y-5">
      <SubjectMasteryBar
        subjectCode={subject.code}
        subjectSlug={subject.slug}
        semesterId={subject.semesterId}
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">
            {subject.credits}
          </div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            Credits
          </div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">
            {stats.questions}
          </div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            Important questions
          </div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">
            {stats.formulas}
          </div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            Formulas
          </div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">
            {stats.revision}
          </div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            Revision notes
          </div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-display font-bold text-ink-hi">
            ≈ {studyTime}
          </div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-lo mt-1">
            Study time
          </div>
        </div>
      </div>
    </section>
  );
}
