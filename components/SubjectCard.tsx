import Link from "next/link";
import { Subject } from "@/lib/types";
import registry from "@/lib/notes";
import { getSubjectCategoryMeta } from "@/lib/branch";
import { estimatedSubjectMinutes } from "@/lib/study";

export default function SubjectCard({ subject }: { subject: Subject }) {
  const content = registry[subject.code] ?? null;
  const modules = content?.modules ?? [];
  const moduleCount = modules.length;
  const topics = modules.reduce((s, m) => s + m.coreConcepts.length + m.definitions.length, 0);
  const questions = modules.reduce((s, m) => s + m.examFocus.length, 0);
  const estMinutes = estimatedSubjectMinutes(modules);
  const cat = getSubjectCategoryMeta(subject);

  const pct = Math.min(100, Math.round((modules.filter((m) => m.examFocus.length + m.definitions.length > 0).length / Math.max(1, moduleCount)) * 100));

  return (
    <Link
      href={`/${subject.semesterId}/${subject.slug}`}
      className="card p-5 flex flex-col gap-3.5 hover:border-signal/50 hover:-translate-y-1 transition-all group min-h-[140px] no-underline shadow-sm relative overflow-hidden"
    >
      {/* Top indicator strip on hover */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-bg-border group-hover:bg-gradient-to-r group-hover:from-signal group-hover:to-signal-dim transition-all" />

      {/* top: code + category */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink-faint bg-bg px-2 py-0.5 rounded-md border border-bg-border/60">
          {subject.code}
        </span>
        <span
          className="shrink-0 font-mono text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border text-signal border-signal/20 bg-signal/5 group-hover:border-signal/40 group-hover:bg-signal/10 transition-all"
          title={cat.description}
        >
          {cat.shortLabel}
        </span>
      </div>

      {/* name */}
      <span className="font-display font-bold text-ink-hi group-hover:text-signal transition-colors leading-snug text-[15px] sm:text-base">
        {subject.name}
      </span>

      {/* content summary */}
      {content ? (
        <div className="grid grid-cols-3 gap-2 text-center mt-2 border-t border-bg-border/30 pt-3">
          <div>
            <div className="font-display font-extrabold text-ink-hi text-lg leading-tight">{moduleCount}</div>
            <div className="font-mono text-[9px] text-ink-faint uppercase tracking-wider">Modules</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-ink-hi text-lg leading-tight">{questions}</div>
            <div className="font-mono text-[9px] text-ink-faint uppercase tracking-wider">Questions</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-ink-hi text-lg leading-tight">
              {estMinutes >= 60 ? `${Math.round(estMinutes / 60)}h` : `${estMinutes}m`}
            </div>
            <div className="font-mono text-[9px] text-ink-faint uppercase tracking-wider font-medium">To study</div>
          </div>
        </div>
      ) : (
        <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-auto pt-2">coming soon</span>
      )}

      {/* progress */}
      {content && (
        <div className="mt-1 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-ink-faint">
            <span className="font-light">{topics} topics · {questions} questions</span>
            <span className="font-semibold text-signal">{pct}%</span>
          </div>
          {moduleCount > 0 && (
            <div className="progress-bar">
              <span className="progress-signal" style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
