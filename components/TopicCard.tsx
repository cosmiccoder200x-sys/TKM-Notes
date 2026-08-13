import Link from "next/link";

export default function TopicCard({
  index,
  title,
  subtitle,
  href,
}: {
  index: number;
  title: string;
  subtitle?: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="font-mono text-xs text-ink-faint w-6 shrink-0">
        {String(index).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-ink-hi leading-snug">{title}</span>
        {subtitle && (
          <span className="block text-xs text-ink-lo mt-0.5 leading-relaxed">{subtitle}</span>
        )}
      </span>
      <svg
        className="w-4 h-4 text-ink-faintest shrink-0 group-hover:text-signal group-hover:translate-x-0.5 transition-all"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );

  const cls =
    "card group rounded-card overflow-hidden hover:border-signal/40 transition-colors";

  if (href) {
    return (
      <Link href={href} className={cls}>
        {body}
      </Link>
    );
  }

  return <div className={cls}>{body}</div>;
}