"use client";

import Link from "next/link";
import { Subject } from "@/lib/types";
import { NavIcon } from "@/components/navigation/navItems";

function getSubjectIcon(subject: Subject): string {
  const slug = subject.slug;
  const code = subject.code;

  if (slug.includes("digital-electronics") || slug.includes("logic-design")) return "chip";
  if (slug.includes("linear-algebra") || slug.includes("complex-analysis") || slug.includes("pde")) return "sigma";
  if (slug.includes("data-structures") || slug.includes("algorithms")) return "brackets";
  if (slug.includes("network-theory") || slug.includes("signals") || slug.includes("control")) return "network";
  if (slug.includes("sensor") || slug.includes("circuit")) return "sensor";
  if (slug.includes("life-skills") || slug.includes("ethics") || slug.includes("humanities") || slug.includes("economics")) return "book";
  if (slug.includes("lab") || slug.includes("simulation") || slug.includes("instrumentation")) return "flask";
  if (code.startsWith("24ERJ") || code.startsWith("24ERP") || code.startsWith("24ERT")) return "chip";
  if (code.startsWith("24MAP") || code.startsWith("24ERT")) return "sigma";
  if (code.startsWith("24HUT")) return "book";
  if (code.startsWith("24ESP")) return "flask";
  return "book";
}

export default function SubjectCard({ subject }: { subject: Subject }) {
  const iconName = getSubjectIcon(subject);

  return (
    <Link
      href={`/${subject.semesterId}/${subject.slug}`}
      className="card flex items-center gap-4 px-5 py-4 group no-underline h-[110px]"
    >
      <div className="icon-box w-[68px] h-[68px] shrink-0 flex-shrink-0">
        <NavIcon name={iconName} className="w-[36px] h-[36px]" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="font-display font-semibold text-[16px] text-ink-hi leading-snug truncate">
          {subject.name}
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-ink-faint">
          <span className="text-xs font-medium">View modules</span>
        </div>
      </div>

      <svg className="w-5 h-5 text-ink-faintest shrink-0 group-hover:text-signal group-hover:translate-x-1 transition-all duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}