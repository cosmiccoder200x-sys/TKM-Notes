import { Metadata } from "next";
import PromptLabWrapper from "@/components/prompt-lab/PromptLabWrapper";

export const metadata: Metadata = {
  title: "Prompt Lab",
  description:
    "Find the best prompt for whatever you need to do with AI — learn, practice, revise, evaluate or prepare for KTU exams. Copy it, use it with any AI, add notes as optional context.",
};

export default function PromptLabPage() {
  return <PromptLabWrapper />;
}