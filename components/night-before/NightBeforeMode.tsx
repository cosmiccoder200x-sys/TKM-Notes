"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  NightBeforeConfig,
  NightBeforePlan,
  NightBeforeSession,
  NightBeforeTarget,
  generateNightBeforePlan,
  getProgress,
  saveNightBeforeSession,
  loadNightBeforeSession,
  clearNightBeforeSession,
} from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { programFromSlug } from "@/lib/urls";
import NightBeforeSetup from "./NightBeforeSetup";
import RevisionPlan from "./RevisionPlan";
import RevisionSectionView from "./RevisionSection";
import RevisionProgress from "./RevisionProgress";
import FinalCheck from "./FinalCheck";

type Step = "setup" | "plan" | "section" | "done";

const TIME_PRESETS: Record<string, number> = {
  "30": 30,
  "60": 60,
  "120": 120,
  "180": 180,
};

export default function NightBeforeMode() {
  const searchParams = useSearchParams();
  const urlSubject = searchParams.get("subject") ?? "";
  const urlFresh = searchParams.get("fresh") === "1";
  const urlTime = TIME_PRESETS[searchParams.get("time") ?? ""] ?? 60;
  const urlTarget = (searchParams.get("target") ?? "pass") as NightBeforeTarget;
  const urlProgram = programFromSlug(searchParams.get("program") ?? "") ?? "ER";

  const [step, setStep] = useState<Step>("setup");
  const [subjectCode, setSubjectCode] = useState(urlSubject);
  const [programId, setProgramId] = useState<ProgramId>(urlProgram);
  const [config, setConfig] = useState<NightBeforeConfig>({ minutes: urlTime, target: urlTarget });
  const [session, setSession] = useState<NightBeforeSession | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // Resume an in-progress session on mount when a subject is supplied (unless fresh=1).
  useEffect(() => {
    if (!urlSubject || urlFresh) return;
    const saved = loadNightBeforeSession(urlSubject, urlProgram);
    if (saved) {
      setSubjectCode(saved.subjectCode);
      setProgramId(saved.programId ?? "ER");
      setConfig(saved.config);
      setSession(saved);
      setStep(saved.finished ? "done" : "plan");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = useCallback((next: NightBeforeSession) => {
    setSession(next);
    saveNightBeforeSession(next);
  }, []);

  function buildPlan() {
    if (!subjectCode) return;
    const plan = generateNightBeforePlan(subjectCode, config, getProgress(), programId);
    if (!plan) return;
    const next: NightBeforeSession = {
      subjectCode,
      programId,
      config,
      plan,
      completedSections: [],
      reviewedItems: [],
      startedAt: Date.now(),
      finished: false,
    };
    persist(next);
    setStep("plan");
  }

  function completeSection(sectionId: string) {
    if (!session) return;
    const completedSections = Array.from(new Set([...session.completedSections, sectionId]));
    const finished = completedSections.length >= session.plan.sections.length;
    persist({ ...session, completedSections, finished });
    if (finished) setStep("done");
  }

  function toggleItemReviewed(itemId: string) {
    if (!session) return;
    const reviewedItems = session.reviewedItems.includes(itemId)
      ? session.reviewedItems.filter((id) => id !== itemId)
      : [...session.reviewedItems, itemId];
    persist({ ...session, reviewedItems });
  }

  function nextSection() {
    if (!session) return;
    const next = session.plan.sections.find(
      (s) => !session.completedSections.includes(s.id) && s.id !== activeSectionId
    );
    if (next) {
      setActiveSectionId(next.id);
    } else {
      setStep("plan");
    }
  }

  function restart() {
    if (subjectCode) clearNightBeforeSession(subjectCode, programId);
    setSession(null);
    setActiveSectionId(null);
    setStep("setup");
  }

  const activeSection = session?.plan.sections.find((s) => s.id === activeSectionId) ?? null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-wide text-ink-lo hover:text-signal transition-colors"
        >
          ← Exit Night-Before
        </Link>
        {session && step !== "setup" && (
          <div className="w-48 sm:w-64">
            <RevisionProgress session={session} />
          </div>
        )}
      </div>

      {step === "setup" && (
        <NightBeforeSetup
          initialSubject={subjectCode}
          programId={programId}
          config={config}
          onChangeConfig={setConfig}
          onSubjectChange={setSubjectCode}
          onProgramChange={(id) => {
            setProgramId(id);
            setSubjectCode("");
            setSession(null);
          }}
          onBuild={buildPlan}
        />
      )}

      {step === "plan" && session && (
        <RevisionPlan
          session={session}
          onStart={(id) => {
            setActiveSectionId(id);
            setStep("section");
          }}
          onDone={() => setStep("done")}
        />
      )}

      {step === "section" && session && activeSection && (
        <RevisionSectionView
          session={session}
          section={activeSection}
          onComplete={completeSection}
          onItemReviewed={toggleItemReviewed}
          onNext={nextSection}
          onBack={() => setStep("plan")}
        />
      )}

      {step === "done" && session && <FinalCheck session={session} onRestart={restart} />}
    </div>
  );
}
