import Link from "next/link";
import { StudyRecommendation } from "@/lib/study";

export default function NextStudyRecommendation({
  recommendations,
  subjectCode,
}: {
  recommendations: StudyRecommendation[];
  subjectCode: string;
}) {
  const top = recommendations.slice(0, 3);
  if (top.length === 0) return null;

  return (
    <section className="card p-4 space-y-3">
      <h2 className="font-display font-semibold text-ink-hi text-base">What Should I Study Next?</h2>
      <ol className="space-y-2">
        {top.map((r, i) => (
          <li key={r.moduleId} className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] text-ink-faint shrink-0">{i + 1}.</span>
            <div className="min-w-0">
              <div className="text-sm text-ink-hi truncate">{r.moduleTitle}</div>
              <div className="text-[11px] font-mono text-ink-lo truncate">{r.reasons.join(" · ")}</div>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href={`/night-before?subject=${encodeURIComponent(subjectCode)}`}
        className="inline-block font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
      >
        Start Session →
      </Link>
    </section>
  );
}
