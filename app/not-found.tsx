import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-5 text-center">
        <div className="space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            404
          </span>
          <h1 className="font-display font-bold text-2xl text-ink-hi leading-tight">
            Page not found
          </h1>
          <p className="text-sm text-ink-lo leading-relaxed">
            The semester, subject, or module you are looking for does not exist
            — or hasn&apos;t been added yet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
          >
            Back to home
          </Link>
          <button
            onClick={undefined}
            id="not-found-search-btn"
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
            aria-label="Open search"
          >
            Search notes
          </button>
        </div>

        <p className="text-xs font-mono text-ink-faint">
          S3–S8 notes are available under the semester routes.
        </p>
      </div>
    </div>
  );
}
