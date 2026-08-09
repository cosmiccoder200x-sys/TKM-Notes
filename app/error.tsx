"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-5 text-center">
        <div className="space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
            Error
          </span>
          <h1 className="font-display font-bold text-2xl text-ink-hi leading-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-ink-lo leading-relaxed">
            An unexpected error occurred. This has been noted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={reset}
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
