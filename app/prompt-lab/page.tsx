import { Metadata } from "next";
import Header from "@/components/Header";
import PromptLabWrapper from "@/components/prompt-lab/PromptLabWrapper";

export const metadata: Metadata = {
  title: "Prompt Lab — TKM Notes",
  description:
    "Find the best prompt for whatever you need to do with AI — learn, practice, revise, evaluate or prepare for KTU exams. Copy it, use it with any AI, add notes as optional context.",
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
