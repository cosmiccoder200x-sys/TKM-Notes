"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TypingControls from "./TypingControls";
import TypingArea from "./TypingArea";
import TypingResults from "./TypingResults";
import DailyChallengeCard from "./DailyChallengeCard";
import WeakKeys from "./WeakKeys";
import {
  buildTestText,
  pickSentences,
  sentencesContaining,
  categoryMeta,
} from "@/lib/typing/catalog";
import { sentencesForSyllabusModule, sentencesForLearnTopic } from "@/lib/typing/learning";
import { getDailyChallenge, todayKey, recordChallengeResult } from "@/lib/typing/challenge";
import { saveResult, loadResults, loadOverrides, loadCustomSentences, loadEdits } from "@/lib/typing/storage";
import { scoreOf } from "@/lib/typing/engine";
import { DailyChallenge, TypingResult, TypingTestConfig } from "@/lib/typing/types";

type Phase = "setup" | "typing" | "results";

export default function TypingHome() {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>("setup");
  const [text, setText] = useState("");
  const [config, setConfig] = useState<TypingTestConfig | null>(null);
  const [learningLabel, setLearningLabel] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<TypingResult | null>(null);
  const [prevBestWpm, setPrevBestWpm] = useState(0);
  const [prevBestScore, setPrevBestScore] = useState(0);
  const lastStartRef = useRef<{ config: TypingTestConfig; label?: string } | null>(null);
  const challengeDateRef = useRef<string | null>(null);

  useEffect(() => {
    const practice = searchParams.get("practice");
    if (practice) {
      const chars = practice.split(",").filter((c) => c.trim() !== "");
      if (chars.length > 0) practiceWeakKeys(chars);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startTest(cfg: TypingTestConfig, label?: string) {
    let target = "";
    let resolvedLabel = label;
    const overrides = loadOverrides();
    const custom = loadCustomSentences();
    const edits = loadEdits();

    if (cfg.mode === "learning") {
      if (cfg.program && cfg.semester && cfg.subjectSlug && cfg.topicSlug) {
        const src = sentencesForSyllabusModule(
          cfg.program,
          cfg.semester,
          cfg.subjectSlug,
          cfg.topicSlug,
          cfg.difficulty
        );
        target = pickSentences(src.pool, 30, 500);
        resolvedLabel = src.topic;
      } else if (cfg.subjectSlug && cfg.topicSlug) {
        const src = sentencesForLearnTopic(cfg.subjectSlug, cfg.topicSlug, cfg.difficulty);
        target = pickSentences(src.pool, 30, 500);
        resolvedLabel = src.topic;
      }
    } else {
      target = buildTestText(cfg, overrides, custom, edits);
    }

    if (!target) return;
    lastStartRef.current = { config: cfg, label: resolvedLabel };
    setConfig(cfg);
    setText(target);
    setLearningLabel(resolvedLabel);
    setPhase("typing");
  }

  function startChallenge(challenge: DailyChallenge) {
    challengeDateRef.current = challenge.date;
    startTest(
      {
        mode: "timed",
        duration: challenge.duration,
        category: challenge.category,
        difficulty: challenge.difficulty,
      },
      `Daily Challenge · ${categoryMeta(challenge.category).label}`
    );
  }

  function practiceWeakKeys(chars: string[]) {
    const overrides = loadOverrides();
    const custom = loadCustomSentences();
    const edits = loadEdits();
    const pool = sentencesContaining(chars, overrides, custom, edits);
    const target = pickSentences(pool, 10, 600);
    if (!target) return;
    setConfig({ mode: "sentences", sentenceCount: 10 });
    setText(target);
    setLearningLabel("Weak keys practice");
    setPhase("typing");
  }

  function handleFinish(finished: TypingResult) {
    const before = loadResults().filter((r) => r.id !== finished.id);
    setPrevBestWpm(before.length ? Math.max(...before.map((r) => r.wpm)) : 0);
    setPrevBestScore(before.length ? Math.max(...before.map((r) => scoreOf(r))) : 0);
    saveResult(finished);

    if (challengeDateRef.current === todayKey()) {
      const challenge = getDailyChallenge();
      const completed = finished.wpm >= challenge.targetWpm;
      recordChallengeResult(challenge.date, finished, completed);
      challengeDateRef.current = null;
    }

    setResult(finished);
    setPhase("results");
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink-hi">Typing Practice</h1>
          <p className="text-sm text-ink-lo mt-1">
            Improve your typing while learning Computer Science.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/typing/history"
            className="font-mono text-[10px] uppercase tracking-wider px-3 py-2 rounded-md border border-bg-border text-ink-lo hover:border-signal/40 hover:text-signal transition-colors"
          >
            History
          </Link>
          <Link
            href="/typing/progress"
            className="font-mono text-[10px] uppercase tracking-wider px-3 py-2 rounded-md border border-bg-border text-ink-lo hover:border-signal/40 hover:text-signal transition-colors"
          >
            Progress
          </Link>
        </div>
      </div>

      {phase === "setup" && (
        <div className="space-y-8">
          <DailyChallengeCard onStart={startChallenge} />
          <TypingControls onStart={startTest} />
          <WeakKeys onPractice={practiceWeakKeys} />
        </div>
      )}

      {phase === "typing" && config && (
        <TypingArea
          text={text}
          config={config}
          learningLabel={learningLabel}
          onFinish={handleFinish}
          onExit={() => setPhase("setup")}
        />
      )}

      {phase === "results" && result && (
        <TypingResults
          result={result}
          previousBestWpm={prevBestWpm}
          previousBestScore={prevBestScore}
          onTryAgain={() => {
            if (lastStartRef.current) {
              startTest(lastStartRef.current.config, lastStartRef.current.label);
            }
          }}
          onNewTest={() => setPhase("setup")}
          onPracticeWeakKeys={practiceWeakKeys}
        />
      )}
    </main>
  );
}
