import { Suspense } from "react";
import { Metadata } from "next";
import Header from "@/components/Header";
import StudyPlanner from "@/components/planner/StudyPlanner";

export const metadata: Metadata = {
  title: "Study Planner",
  description:
    "What should I study now? Tell PrepPilot how much time you have and it builds a prioritized plan from verified syllabus data and your own mastery marks.",
};

export default function PlannerPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Suspense
          fallback={
            <div className="card p-8 text-center">
              <div className="text-signal mb-2">Loading Study Planner...</div>
              <div className="text-xs text-ink-lo">Preparing your prioritized plan</div>
            </div>
          }
        >
          <StudyPlanner />
        </Suspense>
      </main>
    </>
  );
}
