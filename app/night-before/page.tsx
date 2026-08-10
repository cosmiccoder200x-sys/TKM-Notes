import { Suspense } from "react";
import { Metadata } from "next";
import NightBeforeMode from "@/components/night-before/NightBeforeMode";

export const metadata: Metadata = {
  title: "Night-Before Mode",
  description: "High-value revision when time is limited. Build a focused revision plan from existing notes.",
};

export default function NightBeforePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="card p-8 text-center">
            <div className="text-signal mb-2">Loading Night-Before Mode...</div>
            <div className="text-xs text-ink-lo">Building your revision experience</div>
          </div>
        </div>
      }
    >
      <NightBeforeMode />
    </Suspense>
  );
}
