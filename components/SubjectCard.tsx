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
      className="card p-4 flex flex-col gap-2.5 hover:border-signal/40 transition-colors group min-h-[132px] no-underline"
    >
      {/* top: code + category */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
          {subject.code}
        </span>
        <span
          className="shrink-0 font-mono text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-md border text-signal border-signal-dim bg-signal/10"
          title={cat.description}
        >
          {cat.shortLabel}
        </span>
      </div>

      {/* name */}
      <span className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors leading-snug text-base">
        {subject.name}
      </span>

      {/* content summary */}
      {content ? (
        <div className="grid grid-cols-3 gap-2 text-center mt-auto">
          <div>
            <div className="font-display font-bold text-ink-hi text-xl leading-tight">{moduleCount}</div>
            <div className="font-mono text-[10px] text-ink-faint uppercase">Modules</div>
          </div>
          <div>
            <div className="font-display font-bold text-ink-hi text-xl leading-tight">{questions}</div>
            <div className="font-mono text-[10px] text-ink-faint uppercase">Questions</div>
          </div>
          <div>
            <div className="font-display font-bold text-ink-hi text-xl leading-tight">
              {estMinutes >= 60 ? `${Math.round(estMinutes / 60)}h` : `${estMinutes}m`}
            </div>
            <div className="font-mono text-[10px] text-ink-faint uppercase">To study</div>
          </div>
        </div>
      ) : (
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">coming soon</span>
      )}

      {/* progress */}
      <div className="mt-1">
        <div className="flex items-center justify-between text-xs font-mono text-ink-faint mb-1">
          <span>{moduleCount > 0 ? `${topics} topics · ${questions} questions` : "Not started"}</span>
          <span>{moduleCount > 0 ? `${pct}% started` : ""}</span>
        </div>
        {moduleCount > 0 && (
          <div className="h-1.5 w-full rounded-full bg-bg border border-bg-border overflow-hidden">
            <div className="h-full rounded-full bg-signal transition-[width]" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
    </Link>
  );
}
