import Link from "next/link";
import { LEARN_CATEGORIES, RECOMMENDED_ROADMAP } from "@/lib/learn-cs/categories";
import { LEARN_SUBJECTS, getLearnSubject, totalTopics } from "@/lib/learn-cs";
import { NavIcon } from "@/components/navigation/navItems";
import LearnProgressCard from "@/components/learn-cs/LearnProgressCard";

const DIFFICULTY_STYLE: Record<string, string> = {
  beginner: "text-signal border-signal-dim bg-signal/10",
  intermediate: "text-weight border-weight-dim bg-weight/10",
  advanced: "text-critical border-critical/40 bg-critical/10",
};

export const metadata = {
  title: "Learn CS",
  description:
    "Learn computer science beyond your college syllabus — a structured, stage-based curriculum: programming, DSA, systems, AI and more.",
};

export default function LearnCsPage() {
  return (
    <main className="max-w-4xl mx-auto py-4 space-y-12">
      {/* Hero */}
      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            Learn CS · beyond the college syllabus
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink-hi leading-[1.1] tracking-tight max-w-3xl">
            Learn computer science <span className="text-signal">beyond</span> your college syllabus.
          </h1>
          <p className="text-base sm:text-lg text-ink-lo leading-relaxed max-w-2xl font-light">
            Your TKM syllabus teaches you what to study. Learn CS teaches you the foundations every engineer
            actually needs — programming, data structures, systems, AI — in a structured, stage-based path.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="#roadmap"
            className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full bg-signal text-white hover:bg-signal-dim transition-all shadow-sm"
          >
            Start the Roadmap →
          </Link>
          <Link
            href="/learn-cs/my-learning"
            className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full border border-bg-border text-ink-hi hover:border-signal hover:text-signal hover:bg-signal/5 transition-all"
          >
            My Learning Progress
          </Link>
        </div>
      </section>

      {/* My Learning progress */}
      <LearnProgressCard />

      {/* Roadmap — recommended order */}
      <section id="roadmap" className="scroll-mt-20 space-y-6">
        <div className="flex items-baseline justify-between gap-3 flex-wrap border-b border-bg-border/40 pb-3">
          <div className="flex items-baseline gap-3">
            <span className="eyebrow text-ink-hi">01 · Roadmap</span>
          </div>
          <Link
            href="/learn-cs/my-learning"
            className="font-mono text-[11px] text-signal hover:text-signal-dim transition-colors uppercase tracking-wider"
          >
            Continue →
          </Link>
        </div>

        <p className="text-sm text-ink-lo leading-relaxed max-w-2xl">
          Do not know what to learn next? Follow this order — each subject prepares you for the ones after it.
        </p>

        <ol className="space-y-1">
          {RECOMMENDED_ROADMAP.map((slug, i) => {
            const subject = getLearnSubject(slug);
            if (!subject) return null;
            return (
              <li key={slug}>
                <Link
                  href={`/learn-cs/${slug}`}
                  className="group flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent hover:border-bg-border hover:bg-bg-surface transition-colors"
                >
                  <span className="font-mono text-[10px] text-ink-faint w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <NavIcon name={subject.icon} className="w-4 h-4 text-ink-faint group-hover:text-signal transition-colors shrink-0" />
                  <span className="font-display font-medium text-sm text-ink-hi group-hover:text-signal transition-colors">
                    {subject.name}
                  </span>
                  <span className={`ml-auto font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-card border shrink-0 ${DIFFICULTY_STYLE[subject.difficulty]}`}>
                    {subject.difficulty}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Explore by category */}
      <section className="space-y-8">
        <div className="flex items-baseline gap-3 border-b border-bg-border/40 pb-3">
          <span className="eyebrow text-ink-hi">02 · Explore Subjects</span>
        </div>

        <div className="space-y-8">
          {LEARN_CATEGORIES.map((cat) => {
            const subjects = LEARN_SUBJECTS.filter((s) => s.category === cat.id);
            if (subjects.length === 0) return null;
            return (
              <section key={cat.id} className="space-y-3">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <div>
                    <h2 className="font-display font-semibold text-lg text-ink-hi">{cat.label}</h2>
                    <p className="text-xs text-ink-lo mt-0.5">{cat.description}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                    {subjects.length} subjects
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subjects.map((subject) => (
                    <Link
                      key={subject.slug}
                      href={`/learn-cs/${subject.slug}`}
                      className="card p-4 flex flex-col gap-2.5 hover:border-signal/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="icon-box w-9 h-9 shrink-0 group-hover:bg-signal/10 group-hover:border-signal/30 transition-colors">
                          <NavIcon name={subject.icon} className="w-[18px] h-[18px] text-ink-lo group-hover:text-signal transition-colors" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display font-semibold text-sm text-ink-hi group-hover:text-signal transition-colors leading-tight">
                            {subject.name}
                          </h3>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint mt-0.5">
                            ~{subject.estimatedHours}h · {totalTopics(subject)} topics
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-ink-lo leading-relaxed line-clamp-2">{subject.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}