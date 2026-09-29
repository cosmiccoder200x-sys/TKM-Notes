"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/prompts/utils";
import {
  EXTERNAL_AI_PROVIDERS,
  type ExternalAiId,
} from "@/lib/learning/external-ai";

export default function ExternalAiHandoff({ prompt }: { prompt: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "copy-failed">("idle");

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>, providerId: ExternalAiId) {
    if (!prompt) {
      e.preventDefault();
      return;
    }
    try {
      const ok = await copyToClipboard(prompt);
      setStatus(ok ? "copied" : "copy-failed");
    } catch {
      setStatus("copy-failed");
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h2 className="font-display font-semibold text-base text-ink-hi">Study with AI</h2>
        <p className="text-sm text-ink-lo">
          Your personalized study prompt is ready.
        </p>
        <p className="text-sm text-ink-lo">Choose an AI assistant. The prompt will be copied automatically.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        {EXTERNAL_AI_PROVIDERS.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleClick(e, p.id)}
            className="inline-flex items-center justify-center text-center font-mono text-[12px] px-4 py-2.5 rounded-card border border-bg-border bg-bg-raised text-ink-hi hover:border-signal/60 hover:text-signal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            {p.label}
          </a>
        ))}
      </div>

      {status === "copied" && (
        <p className="text-sm text-ink-lo" role="status">
          Prompt copied. Paste it into the AI chat to begin.
        </p>
      )}
      {status === "copy-failed" && (
        <p className="text-sm text-ink-lo" role="status">
          AI opened. Copy the prompt below and paste it into the chat.
        </p>
      )}
    </div>
  );
}
