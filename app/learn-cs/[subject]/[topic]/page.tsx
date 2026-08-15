import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getLearnSubject, findLearnTopic, nextTopic, subjectTopics, LEARN_SUBJECTS } from "@/lib/learn-cs";
import { DIFFICULTY_META } from "@/lib/learn-cs/types";
import { NavIcon } from "@/components/navigation/navItems";
import TopicState from "@/components/learn-cs/TopicState";
import LearnWithAI from "@/components/learn-cs/LearnWithAI";
import { PRODUCT_NAME } from "@/lib/branch";

export function generateStaticParams() {
  const params: { subject: string; topic: string }[] = [];
  for (const subject of LEARN_SUBJECTS) {
    for (const t of subjectTopics(subject)) {
      params.push({ subject: subject.slug, topic: t.slug });
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { subject: string; topic: string };
}): Metadata {
  const subject = getLearnSubject(params.subject);
  if (!subject) return {};
  const topic = findLearnTopic(subject, params.topic);
  if (!topic) return {};
  return {
    title: `${topic.title} — ${subject.name} — Learn CS — ${PRODUCT_NAME}`,
    description: topic.summary,
  };
}

function Section({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2.5">
      <div className="space-y-1">
        <div className="section-kicker">{kicker}</div>
        <h2 className="section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function LearnTopicPage({ params }: { params: { subject: string; topic: string } }) {
  const subject = getLearnSubject(params.subject);
  if (!subject) notFound();
  const topic = findLearnTopic(subject, params.topic);
  if (!topic) notFound();

  const next = nextTopic(subject, topic.slug);
  const difficulty = DIFFICULTY_META[topic.difficulty];
  const all = subjectTopics(subject);
  const index = all.findIndex((t) => t.slug === topic.slug);

  return (
    <main className="max-w-4xl mx-auto py-4 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] font-mono text-ink-faint uppercase tracking-wider flex-wrap">
        <Link href="/learn-cs" className="hover:text-signal transition-colors">Learn CS</Link>
        <span>/</span>
        <Link href={`/learn-cs/${subject.slug}`} className="hover:text-signal transition-colors truncate">
          {subject.name}
        </Link>
        <span>/</span>
        <span className="text-ink-lo">{topic.title}</span>
      </nav>

      {/* Header */}
      <section className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-ink-faint">
            <NavIcon name={subject.icon} className="w-3.5 h-3.5" />
            <span>{subject.name}</span>
            {index >= 0 && <span>· Topic {index + 1} of {all.length}</span>}
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
            {topic.title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`chip border ${topic.difficulty === "beginner" ? "border-signal-dim text-signal bg-signal/10" : topic.difficulty === "intermediate" ? "border-weight-dim text-weight bg-weight/10" : "border-critical/40 text-critical bg-critical/10"}`}>
            {difficulty.label}
          </span>
          <span className="chip">~{topic.estimatedMinutes} min</span>
          <span className="chip">{topic.difficulty === "advanced" ? "interview + mastery depth" : "core lesson"}</span>
        </div>

        <TopicState subjectSlug={subject.slug} topicSlug={topic.slug} />
      </section>

      {/* Learn with AI */}
      <LearnWithAI subject={subject} topic={topic} />

      {/* Lesson content */}
      <div className="read-col space-y-10">
        <Section kicker="What is it?" title="The one-paragraph answer">
          <p className="text-[15px] leading-[1.8] text-ink-lo">{topic.summary}</p>
        </Section>

        {topic.whyMatters && (
          <Section kicker="Why does it matter?" title="Where it shows up in the real world">
            <p className="text-[15px] leading-[1.8] text-ink-lo">{topic.whyMatters}</p>
          </Section>
        )}

        {topic.keyIdea && (
          <Section kicker="Key idea" title="The mental model">
            <div className="card p-4">
              <p className="text-sm leading-relaxed text-ink-hi">{topic.keyIdea}</p>
            </div>
          </Section>
        )}

        {topic.example && (
          <Section kicker="Example" title="See it concretely">
            <pre className="card p-4 text-[12px] font-mono text-ink-lo leading-relaxed overflow-x-auto">{topic.example}</pre>
          </Section>
        )}

        {topic.intuition && (
          <Section kicker="Visual intuition" title="Picture it">
            <div className="card p-4">
              <p className="text-sm leading-relaxed text-ink-lo">{topic.intuition}</p>
            </div>
          </Section>
        )}

        {topic.commonMistakes && topic.commonMistakes.length > 0 && (
          <Section kicker="Pitfalls" title="Common mistakes to avoid">
            <ul className="space-y-2">
              {topic.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-lo leading-relaxed">
                  <span className="font-mono text-[10px] text-critical mt-0.5 shrink-0">✕</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {topic.practice && topic.practice.length > 0 && (
          <Section kicker="Practice" title="Make it stick">
            <ul className="space-y-2">
              {topic.practice.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-lo leading-relaxed">
                  <span className="font-mono text-[10px] text-signal mt-0.5 shrink-0">→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {topic.quickRevision && topic.quickRevision.length > 0 && (
          <Section kicker="Quick revision" title="30-second summary">
            <div className="card p-4 space-y-1.5">
              {topic.quickRevision.map((r, i) => (
                <p key={i} className="text-sm font-mono text-ink-lo leading-relaxed">
                  <span className="text-signal">·</span> {r}
                </p>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* Next concept */}
      {next ? (
        <Link
          href={`/learn-cs/${subject.slug}/${next.slug}`}
          className="card p-5 flex items-center justify-between gap-3 hover:border-signal/50 transition-colors group"
        >
          <div className="space-y-1 min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Next concept</span>
            <p className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors truncate">
              {next.title}
            </p>
            <p className="text-xs text-ink-lo line-clamp-1">{next.summary}</p>
          </div>
          <span className="font-mono text-xl text-ink-faint group-hover:text-signal transition-colors shrink-0">→</span>
        </Link>
      ) : (
        <div className="card p-5 text-center space-y-1">
          <p className="font-display font-semibold text-ink-hi">You finished the path.</p>
          <p className="text-sm text-ink-lo">
            Mark topics as mastered as you go, then continue with the next subject in the{" "}
            <Link href="/learn-cs#roadmap" className="text-signal hover:text-signal-dim transition-colors">roadmap</Link>.
          </p>
        </div>
      )}
    </main>
  );
}