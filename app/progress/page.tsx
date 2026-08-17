import type { Metadata } from "next";
import { PRODUCT_NAME } from "@/lib/branch";
import ProgressDashboard from "@/components/progress/ProgressDashboard";

export const metadata: Metadata = {
  title: `Progress — ${PRODUCT_NAME}`,
  description:
    "Your study progress across every subject, computed from real practice, self-checks and revision activity.",
};

export default function ProgressPage() {
  return <ProgressDashboard />;
}