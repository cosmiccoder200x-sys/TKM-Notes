import Link from "next/link";
import { StudyRecommendation } from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { programSlug } from "@/lib/urls";

const DOT: Record<string, string> = {
  weak: "bg-critical",
  "needs-practice": "bg-weight",
  "not-assessed": "bg-ink-faintest",
};

export default function WeakAreas({
  recommendations,
  subjectCode,
  programId = "ER",
}: {
  recommendations: StudyRecommendation[];
  subjectCode: string;
  programId?: ProgramId;
}) {
  const weak = recommendations.filter(
    (r) => r.status === "weak" || r.status === "needs-practice" || r.status === "not-assessed"
  ).slice(0, 5);

  if (weak.length === 0) return null;

  return (
    <section className="card p-4 space-y-3">
      <h2 className="font-display font-semibold text-ink-hi text-base">Your Next Focus</h2>
      <ul className="space-y-1.5">
        {weak.map((r) => (
          <li key={r.moduleId} className="flex items-center gap-2 text-sm text-ink-hi">
            <span className={`w-2 h-2 rounded-full shrink-0 ${DOT[r.status] ?? "bg-ink-faintest"}`} aria-hidden />
            <span>{r.moduleTitle}</span>
            <span className="ml-auto text-xs font-mono text-ink-lo">
              {r.score === null ? "not assessed" : `${r.score}%`}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={`/night-before?subject=${encodeURIComponent(subjectCode)}&program=${programSlug(programId)}`}
        className="inline-block font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
      >
        Practice Weak Areas →
      </Link>
    </section>
  );
}
