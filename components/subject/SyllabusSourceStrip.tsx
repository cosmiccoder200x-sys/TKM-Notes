"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProgramId } from "@/lib/types";
import { getEffectiveVersion } from "@/lib/syllabus";
import { syllabusManagerUrl } from "@/lib/urls";
import type { SyllabusVersion } from "@/lib/syllabus";

const SOURCE_LABEL: Record<SyllabusVersion["source"], string> = {
  official: "Official syllabus",
  user_pasted: "Your pasted syllabus",
  user_edited: "Your edited syllabus",
};

export default function SyllabusSourceStrip({
  programId,
  semesterId,
  subjectCode,
  subjectSlug,
}: {
  programId: ProgramId;
  semesterId: string;
  subjectCode: string;
  subjectSlug: string;
}) {
  const [version, setVersion] = useState<SyllabusVersion | null>(null);

  useEffect(() => {
    setVersion(getEffectiveVersion(programId, subjectCode));
  }, [programId, subjectCode]);

  const modules = version?.modules.length ?? 0;
  const topics = version?.modules.reduce((n, m) => n + m.topics.length, 0) ?? 0;

  return (
    <section className="card px-5 py-4 flex items-center gap-4 flex-wrap">
      <span className="text-signal shrink-0 font-display font-bold text-lg">§</span>
      <div className="min-w-0 flex-1">
        <div className="font-display font-semibold text-sm text-ink-hi">Syllabus</div>
        <div className="text-xs text-ink-lo">
          {version ? (
            <>
              {SOURCE_LABEL[version.source]}
              {modules > 0 && (
                <span className="text-ink-faint">
                  {" "}· {modules} modules{topics > 0 ? ` · ${topics} topics` : ""}
                </span>
              )}
            </>
          ) : (
            "Loading syllabus…"
          )}
        </div>
      </div>
      <Link
        href={syllabusManagerUrl(programId, semesterId, subjectSlug)}
        className="shrink-0 font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
      >
        {version && version.source !== "official" ? "Manage syllabus →" : "Paste syllabus →"}
      </Link>
    </section>
  );
}
