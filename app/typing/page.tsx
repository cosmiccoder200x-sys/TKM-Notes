import { Suspense } from "react";
import TypingHome from "@/components/typing/TypingHome";

export const metadata = {
  title: "Typing Practice — TKM Notes",
  description:
    "Improve your typing while learning Computer Science. Timed tests, word drills, syllabus and learn-mode practice.",
};

export default function TypingPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-ink-lo">Loading…</div>
      }
    >
      <TypingHome />
    </Suspense>
  );
}
