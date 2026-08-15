"use client";

import { useRouter } from "next/navigation";
import ProgressDashboard from "@/components/typing/ProgressDashboard";

export default function TypingProgressPage() {
  const router = useRouter();
  return (
    <ProgressDashboard
      onPractice={(chars) =>
        router.push(`/typing?practice=${encodeURIComponent(chars.join(","))}`)
      }
    />
  );
}
