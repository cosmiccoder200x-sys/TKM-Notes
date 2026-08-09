import Link from "next/link";

const TOOLS = [
  {
    title: "Prompt Lab",
    description: "AI-powered study modes",
    href: "/prompt-lab",
    icon: "⚡",
  },
  {
    title: "Night-Before",
    description: "High-value revision when time is limited",
    href: "/night-before",
    icon: "⏱",
  },
  {
    title: "PYQ Focus",
    description: "Important previous questions",
    href: "/prompt-lab?mode=pyq-intelligence",
    icon: "🔍",
  },
  {
    title: "Quick Revision",
    description: "High-value revision",
    href: "/prompt-lab?mode=revision",
    icon: "📌",
  },
  {
    title: "Mock Exam",
    description: "Test yourself",
    href: "/prompt-lab?mode=mock-exam",
    icon: "📋",
  },
];

export default function StudyTools() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {TOOLS.map((t) => (
        <Link
          key={t.title}
          href={t.href}
          className="card p-4 flex flex-col gap-2 hover:border-signal transition-colors group min-h-[110px]"
        >
          <span className="text-lg" aria-hidden>
            {t.icon}
          </span>
          <span className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors text-[15px]">
            {t.title}
          </span>
          <span className="text-xs text-ink-lo leading-relaxed">{t.description}</span>
        </Link>
      ))}
    </div>
  );
}
