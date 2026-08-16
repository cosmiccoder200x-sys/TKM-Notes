import type { Metadata } from "next";
import { PRODUCT_NAME } from "@/lib/branch";
import LearnProgressDashboard from "@/components/learn-cs/LearnProgressDashboard";

export const metadata: Metadata = {
  title: `Progress — Learn CS — ${PRODUCT_NAME}`,
  description:
    "Your overall computer science progress: topics learned and revised, quiz accuracy, practice counts and learning hours, broken down by category.",
};

export default function LearnCsProgressPage() {
  return <LearnProgressDashboard />;
}