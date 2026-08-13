import Link from "next/link";
import { NavIcon } from "@/components/navigation/navItems";

const TOOLS = [
  {
    title: "Prompt Lab",
    description: "The best prompt for whatever you need to do with AI",
    href: "/prompt-lab",
    icon: "flask",
  },
  {
    title: "Quick Revision",
    description: "Rapid review when time is limited",
    href: "/prompt-lab?mode=revision",
    icon: "book",
  },
  {
    title: "Exam Answer",
    description: "Marks-focused answer for any question",
    href: "/prompt-lab?mode=exam-answer",
    icon: "edit",
  },
  {
    title: "PYQ Intelligence",
    description: "What actually repeats in exams",
    href: "/prompt-lab?mode=pyq-intelligence",
    icon: "pyq",
  },
  {
    title: "Mock Exam",
    description: "Simulate the real exam",
    href: "/prompt-lab?mode=mock-exam",
    icon: "practice",
  },
  {
    title: "Night-Before",
    description: "High-value revision plan from your notes",
    href: "/night-before",
    icon: "revision",
  },
];

export default function StudyTools() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {TOOLS.map((t) => (
        <Link
          key={t.title}
          href={t.href}
          className="card p-4 flex flex-col gap-2 hover:border-signal transition-colors group min-h-[110px]"
        >
          <span className="text-signal" aria-hidden>
            <NavIcon name={t.icon} className="w-5 h-5" />
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