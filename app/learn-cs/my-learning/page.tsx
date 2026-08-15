import { Metadata } from "next";
import MyLearningView from "@/components/learn-cs/MyLearningView";

export const metadata: Metadata = {
  title: "My Learning",
  description:
    "Track your Learn CS progress — topics in progress, topics mastered, and where to continue next.",
};

export default function MyLearningPage() {
  return <MyLearningView />;
}