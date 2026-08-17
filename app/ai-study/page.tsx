import type { Metadata } from "next";
import { PRODUCT_NAME } from "@/lib/branch";
import AiStudyHub from "@/components/ai-study/AiStudyHub";

export const metadata: Metadata = {
  title: `AI Study — ${PRODUCT_NAME}`,
  description:
    "Explain, quiz, revise or test yourself with AI. Every action carries your branch, semester, subject and module as context.",
};

export default function AiStudyPage() {
  return <AiStudyHub />;
}