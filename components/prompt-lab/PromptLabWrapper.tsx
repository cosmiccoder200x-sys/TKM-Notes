"use client";

import { Suspense } from "react";
import PromptLab from "@/components/prompt-lab/PromptLab";

export default function PromptLabWrapper() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="card p-8 text-center">
          <div className="text-signal mb-2">Loading Prompt Lab...</div>
          <div className="text-xs text-ink-lo">Initializing study modes</div>
        </div>
      </div>
    }>
      <PromptLab />
    </Suspense>
  );
}