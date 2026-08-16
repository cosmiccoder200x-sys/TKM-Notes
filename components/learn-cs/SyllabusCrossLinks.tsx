import Link from "next/link";
import {
  syllabusLinksForTopic,
  syllabusLinkHref,
  syllabusLinkHasNotes,
  syllabusLinkModuleTitle,
} from "@/lib/learn-cs/syllabus";
import { PROGRAM_SHORT_LABELS } from "@/lib/urls";

// Cross-links between a Learn CS topic and the canonical TKM syllabus. Targets
// resolve from P0/P1 data (no duplication). Shows honest "no notes yet" state.
export default function SyllabusCrossLinks({
  subjectSlug,
  topicSlug,
}: {
  subjectSlug: string;
  topicSlug: string;
}) {
  const { links } = syllabusLinksForTopic(subjectSlug, topicSlug);
  if (links.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">TKM syllabus</span>
        <h3 className="font-display font-semibold text-ink-hi text-lg">See it in your college syllabus</h3>
        <p className="text-xs text-ink-lo leading-relaxed">
          The same idea taught in the official KTU 2024 scheme — opens the TKM Notes workspace.
        </p>
      </div>

      <div className="space-y-2">
        {links.map((link) => {
          const hasNotes = syllabusLinkHasNotes(link);
          const moduleTitle = syllabusLinkModuleTitle(link);
          return (
            <Link
              key={`${link.programId}-${link.subjectCode}-${link.moduleId ?? "all"}`}
              href={syllabusLinkHref(link)}
              className="card p-4 flex items-center justify-between gap-3 hover:border-signal/50 transition-colors group"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-signal px-1.5 py-0.5 rounded-card border border-signal-dim bg-signal/5">
                    {PROGRAM_SHORT_LABELS[link.programId]}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">{link.subjectCode}</span>
                  <span className="font-mono text-[10px] text-ink-faint uppercase">
                    {link.semesterId}
                  </span>
                </div>
                <p className="text-sm text-ink-hi group-hover:text-signal transition-colors leading-tight truncate">
                  {link.subjectName}
                </p>
                {moduleTitle && (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                    {link.moduleId?.toUpperCase()} · {moduleTitle}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0 space-y-1">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  {hasNotes ? "notes available" : "no notes yet"}
                </span>
                <span className="block font-mono text-xl text-ink-faint group-hover:text-signal transition-colors">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-ink-faint leading-relaxed">
        TKM Notes links are generated from the canonical syllabus registry — nothing here duplicates
        your college&apos;s official data.
      </p>
    </div>
  );
}