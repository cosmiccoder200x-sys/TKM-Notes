"use client";

import { useState, useCallback } from "react";
import { LearnSubject, LearnTopic } from "@/lib/learn-cs/types";
import { generateQuiz, weakTopicsFor, QuizQuestion } from "@/lib/learn-cs/quiz";
import { recordQuizResult, advanceTopicState, setTopicState } from "@/lib/learn-cs/progress";

type Phase = "idle" | "answering" | "done";

const Q = "ABCD".split("");

// [Quiz Me] — 5 deterministic questions from the topic's own content. Score,
// per-question feedback and weak areas are recorded into learn-cs progress.
export default function QuizPanel({
  subject,
  topic,
}: {
  subject: LearnSubject;
  topic: LearnTopic;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);

  const quiz = generateQuiz(subject.slug, topic);

  const start = useCallback(() => {
    setAnswers([]);
    setCurrent(0);
    setRevealed([]);
    setPhase("answering");
  }, []);

  function pick(i: number) {
    if (revealed.includes(current)) return;
    const nextAnswers = [...answers];
    nextAnswers[current] = i;
    setAnswers(nextAnswers);
    setRevealed([...revealed, current]);
  }

  function next() {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      finish();
    }
  }

  function finish() {
    const correct = quiz.questions.filter((q, i) => answers[i] === q.correctIndex).length;
    const weak = weakTopicsFor(quiz, answers);
    recordQuizResult(subject.slug, topic.slug, { correct, total: quiz.questions.length, weak });
    if (correct >= 4) {
      const advanced = advanceTopicState(subject.slug, topic.slug);
      if (advanced === "practiced" || advanced === "mastered") {
        // already progressed by practice; nothing more to do
      }
    } else {
      setTopicState(subject.slug, topic.slug, "learning");
    }
    setPhase("done");
  }

  if (phase === "idle") {
    return (
      <div className="card p-5 space-y-3">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Quiz Me</span>
          <h3 className="font-display font-semibold text-ink-hi text-lg">5 questions to test yourself</h3>
          <p className="text-xs text-ink-lo leading-relaxed">
            Questions come from this topic&apos;s own notes — no surprises. Finish to get a score and
            see weak areas recorded in your progress.
          </p>
        </div>
        <button
          type="button"
          onClick={start}
          className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full bg-signal text-white hover:bg-signal-dim transition-colors"
        >
          Start Quiz →
        </button>
      </div>
    );
  }

  if (phase === "done") {
    const correct = quiz.questions.filter((q, i) => answers[i] === q.correctIndex).length;
    const percent = Math.round((correct / quiz.questions.length) * 100);
    const weak = quiz.questions.filter((q, i) => answers[i] !== q.correctIndex);
    return (
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Quiz result</span>
          <span className="font-display font-bold text-2xl text-ink-hi">{percent}%</span>
        </div>
        <div className="progress-bar">
          <span className="progress-signal" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-sm text-ink-lo leading-relaxed">
          {correct}/{quiz.questions.length} correct. {correct >= 4 ? "Strong result — you have this." : "Some gaps — add these to revision and retake."}
        </p>
        {weak.length > 0 && (
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Weak areas</span>
            <ul className="space-y-1">
              {weak.map((q: QuizQuestion) => (
                <li key={q.id} className="text-xs text-ink-lo leading-relaxed flex items-start gap-2">
                  <span className="font-mono text-[10px] text-critical mt-0.5 shrink-0">✕</span>
                  <span>{q.prompt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="button"
          onClick={start}
          className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full border border-signal text-signal hover:bg-signal/10 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = quiz.questions[current];
  const picked = answers[current];
  const shown = revealed.includes(current);

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Quiz Me</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          {current + 1} / {quiz.questions.length}
        </span>
      </div>

      <div className="progress-bar">
        <span className="progress-signal" style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }} />
      </div>

      <p className="text-sm text-ink-hi leading-relaxed">{question.prompt}</p>

      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isPicked = picked === i;
          let cls = "border-bg-border text-ink-lo hover:border-signal/50 hover:text-ink-hi";
          if (shown) {
            if (isCorrect) cls = "border-signal-dim text-signal bg-signal/10";
            else if (isPicked) cls = "border-critical/40 text-critical bg-critical/10";
            else cls = "border-bg-border text-ink-faint";
          } else if (isPicked) {
            cls = "border-signal text-signal bg-signal/5";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => pick(i)}
              disabled={shown}
              className={`w-full text-left px-3.5 py-2.5 rounded-card border transition-colors text-sm disabled:cursor-default ${cls}`}
            >
              <span className="font-mono text-[10px] mr-2 text-ink-faint">{Q[i]}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {shown && (
        <div className="bg-bg-raised/60 border border-bg-border rounded-card p-3 space-y-1.5">
          <p className="text-xs font-mono text-ink-faint">
            {picked === question.correctIndex ? "Correct." : `Correct answer: ${Q[question.correctIndex]}.`}
          </p>
          <p className="text-xs text-ink-lo leading-relaxed">{question.explanation}</p>
          <button
            type="button"
            onClick={next}
            className="mt-1 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
          >
            {current < quiz.questions.length - 1 ? "Next →" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
}