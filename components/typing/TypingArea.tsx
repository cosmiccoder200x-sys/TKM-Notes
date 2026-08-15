"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TypingResult,
  TypingTestConfig,
  CharStat,
} from "@/lib/typing/types";
import { computeWpm, computeAccuracy } from "@/lib/typing/engine";

interface TypingAreaProps {
  text: string;
  config: TypingTestConfig;
  learningLabel?: string;
  onFinish: (result: TypingResult) => void;
  onExit: () => void;
}

const TIMED = new Set<TypingTestConfig["mode"]>(["timed"]);

function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `r-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

function computeCharStats(text: string, typed: string): { stats: CharStat[]; correct: number; incorrect: number } {
  const stats: CharStat[] = [];
  let correct = 0;
  let incorrect = 0;
  const max = Math.min(text.length, typed.length);
  for (let i = 0; i < max; i++) {
    const ok = text[i] === typed[i];
    stats.push({ expected: text[i], correct: ok });
    if (ok) correct++;
    else incorrect++;
  }
  return { stats, correct, incorrect };
}

export default function TypingArea({ text, config, learningLabel, onFinish, onExit }: TypingAreaProps) {
  const typedRef = useRef("");
  const startRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const [, forceRender] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isTimed = TIMED.has(config.mode);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const typed = typedRef.current;
    const elapsedSeconds = startRef.current
      ? Math.max(0.1, (Date.now() - startRef.current) / 1000)
      : 0.1;
    const { stats, correct, incorrect } = computeCharStats(text, typed);
    const result: TypingResult = {
      id: makeId(),
      createdAt: new Date().toISOString(),
      mode: config.mode,
      category: config.category,
      difficulty: config.difficulty,
      program: config.program,
      semester: config.semester,
      subject: undefined,
      topic: undefined,
      duration: Math.round(elapsedSeconds),
      targetDuration: config.duration,
      wpm: computeWpm(correct, elapsedSeconds),
      accuracy: computeAccuracy(correct, typed.length),
      errors: incorrect,
      correctChars: correct,
      incorrectChars: incorrect,
      totalChars: typed.length,
      charStats: stats,
      learningLabel,
    };
    onFinish(result);
  }, [text, config, learningLabel, onFinish]);

  // Timer loop (100ms resolution).
  useEffect(() => {
    if (finishedRef.current) return;
    const id = window.setInterval(() => {
      if (!startRef.current) return;
      const sec = (Date.now() - startRef.current) / 1000;
      setElapsed(sec);
      if (isTimed && config.duration != null && sec >= config.duration) {
        window.clearInterval(id);
        finish();
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [isTimed, config.duration, finish]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (finishedRef.current) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onExit();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        typedRef.current = typedRef.current.slice(0, -1);
        forceRender((n) => n + 1);
        return;
      }
      if (e.key.length === 1) {
        e.preventDefault();
        if (startRef.current == null) {
          startRef.current = Date.now();
        }
        typedRef.current += e.key;
        forceRender((n) => n + 1);
        if (!isTimed && typedRef.current.length >= text.length) {
          finish();
        }
        return;
      }
      if (e.key === "Tab") e.preventDefault();
    },
    [isTimed, text.length, onExit, finish]
  );

  const typed = typedRef.current;
  const { correct, incorrect } = useMemo(
    () => computeCharStats(text, typed),
    [text, typed]
  );

  const remaining =
    isTimed && config.duration != null
      ? Math.max(0, Math.ceil(config.duration - elapsed))
      : null;

  const wpm = computeWpm(correct, elapsed);
  const accuracy = computeAccuracy(correct, typed.length);

  return (
    <div className="select-none" onClick={focusInput}>
      <input
        ref={inputRef}
        autoFocus
        className="absolute opacity-0 pointer-events-none w-px h-px"
        aria-label="Typing input"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        onKeyDown={handleKeyDown}
      />

      {/* live stats */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink-faint mb-6">
        <span>
          <span className="text-ink-hi">{wpm}</span> WPM
        </span>
        <span>
          <span className="text-ink-hi">{accuracy.toFixed(1)}%</span> Acc
        </span>
        <span>
          <span className="text-ink-hi">
            {remaining != null ? `${remaining}s` : `${Math.floor(elapsed)}s`}
          </span>{" "}
          {remaining != null ? "left" : "time"}
        </span>
        <span className="text-critical">{incorrect} errors</span>
        <span className="hidden sm:inline">
          <span className="text-ink-hi">{typed.length}</span>/{text.length} chars
        </span>
      </div>

      {/* text display */}
      <div
        className="font-mono text-xl sm:text-2xl leading-[2.1] tracking-wide text-ink-faintest"
        role="textbox"
        aria-label="Typing target text"
      >
        {text.split("").map((char, i) => {
          let cls = "text-ink-faintest";
          if (i < typed.length) {
            cls =
              typed[i] === char
                ? "text-ink-faint"
                : "text-critical bg-critical/10 rounded-[2px]";
          } else if (i === typed.length) {
            cls = "text-ink-hi bg-signal/60 rounded-[3px]";
          }
          return (
            <span key={i} className={`inline-block ${cls}`} style={{ whiteSpace: "pre" }}>
              {char === " " ? " " : char}
            </span>
          );
        })}
      </div>

      <div className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-ink-faintest">
        {learningLabel ? (
          <span className="text-signal">{learningLabel}</span>
        ) : (
          <span>Click the text to refocus · Esc to exit</span>
        )}
      </div>
    </div>
  );
}
