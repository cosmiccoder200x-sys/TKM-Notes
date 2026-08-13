import Link from "next/link";
import type { Subject, Module } from "@/lib/types";

export default function ModuleCard({
  index,
  module,
  subject,
}: {
  index: number;
  module: Module;
  subject: Subject;
}) {
  const topics = module.coreConcepts.length + module.definitions.length;
  const questions = module.examFocus.length;

  return (
    <Link
      href={`/${subject.semesterId}/${subject.slug}#${module.id}`}
      className="card flex items-center gap-4 px-5 py-4 group no-underline h-[88px]"
    >
      <span className="font-mono text-sm text-ink-faint shrink-0 w-6 text-center">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-[15px] text-ink-hi leading-snug truncate">
          {module.title}
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-ink-faint">
          <span className="text-xs font-medium">{topics} topics</span>
          <span className="text-ink-faintest">·</span>
          <span className="text-xs font-medium">{questions} questions</span>
        </div>
      </div>

      <svg
        className="w-5 h-5 text-ink-faintest shrink-0 group-hover:text-signal group-hover:translate-x-1 transition-all duration-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}
