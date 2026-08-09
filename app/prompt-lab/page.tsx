import { Metadata } from "next";
import Header from "@/components/Header";
import PromptLabWrapper from "@/components/prompt-lab/PromptLabWrapper";

export const metadata: Metadata = {
  title: "Prompt Lab — Electrical & Computer Engineering · TKM Notes",
  description:
    "AI-powered study modes for learning, practicing, revising, and scoring better in KTU exams. Built for Electrical & Computer Engineering.",
};

export default function PromptLabPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && systemDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();
          `,
        }}
      />
      <Header />
      <PromptLabWrapper />
    </>
  );
}
