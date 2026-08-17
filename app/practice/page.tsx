import type { Metadata } from "next";
import { getQuestionBank } from "@/lib/pyqs";
import { PRODUCT_NAME } from "@/lib/branch";
import PracticeHub from "@/components/practice/PracticeHub";

export const metadata: Metadata = {
  title: `Practice — ${PRODUCT_NAME}`,
  description:
    "Practice real KTU exam questions from your syllabus, self-grade, and build module mastery that feeds your progress and revision views.",
};

export default function PracticePage() {
  const bank = getQuestionBank();
  return <PracticeHub entries={bank} />;
}