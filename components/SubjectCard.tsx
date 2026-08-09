import Link from "next/link";
import { Subject } from "@/lib/types";
import registry from "@/lib/notes";
import { getSubjectCategoryMeta } from "@/lib/branch";

export default function SubjectCard({ subject }: { subject: Subject }) {
  const content = registry[subject.code];
  const moduleCount = content?.modules.length ?? 0;
  const cat = getSubjectCategoryMeta(subject);

  return (
    <Link
      href={`/${subject.semesterId}/${subject.slug}`}
      className="card p-4 flex flex-col gap-2.5 hover:border-signal transition-colors group min-h-[132px]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
          {subject.code}
        </span>
        <span
          className={`shrink-0 font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-card border ${
            moduleCount > 0
              ? "border-signal-dim text-signal bg-signal/10"
              : "border-bg-border text-ink-faint"
          }`}
        >
          {moduleCount > 0 ? `${moduleCount} modules` : "coming soon"}
        </span>
      </div>

      <span className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors leading-snug">
        {subject.name}
      </span>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint border border-bg-border rounded px-1.5 py-0.5">
          {cat.label}
        </span>
        <span className="font-mono text-xs text-ink-lo group-hover:text-signal transition-colors">
          Open →
        </span>
      </div>
    </Link>
  );
}
