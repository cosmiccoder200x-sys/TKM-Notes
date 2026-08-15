"use client";

import { useMemo, useState } from "react";
import {
  TYPING_CATEGORIES,
  TYPING_DIFFICULTIES,
} from "@/lib/typing/catalog";
import { TypingTestConfig, TypingModeId, TypingCategoryId, TypingDifficulty } from "@/lib/typing/types";
import {
  listPrograms,
  listSyllabusSemesters,
  listSyllabusSubjects,
  listSyllabusModules,
  listLearnSubjects,
  listLearnTopics,
} from "@/lib/typing/learning";

export const TIMED_OPTIONS = [15, 30, 60, 120];
export const WORD_OPTIONS = [10, 25, 50, 100];
export const SENTENCE_OPTIONS = [5, 10, 20];

interface TypingControlsProps {
  onStart: (config: TypingTestConfig, learningLabel?: string) => void;
}

const MODES: { id: TypingModeId; label: string }[] = [
  { id: "timed", label: "Timed" },
  { id: "words", label: "Words" },
  { id: "sentences", label: "Sentences" },
  { id: "learning", label: "Learning" },
  { id: "custom", label: "Custom" },
];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md border transition-colors ${
        active
          ? "bg-signal text-bg border-signal"
          : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal/40"
      }`}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow mb-2 text-[10px]">{children}</div>
  );
}

export default function TypingControls({ onStart }: TypingControlsProps) {
  const [mode, setMode] = useState<TypingModeId>("timed");
  const [duration, setDuration] = useState(60);
  const [wordCount, setWordCount] = useState(25);
  const [sentenceCount, setSentenceCount] = useState(5);
  const [category, setCategory] = useState<TypingCategoryId>("csfundamentals");
  const [difficulty, setDifficulty] = useState<TypingDifficulty | "any">("any");
  const [source, setSource] = useState<"syllabus" | "learn-cs">("syllabus");
  const [program, setProgram] = useState("ER");
  const [semester, setSemester] = useState("s3");
  const [subjectSlug, setSubjectSlug] = useState("");
  const [topicSlug, setTopicSlug] = useState("");
  const [learnSubjectSlug, setLearnSubjectSlug] = useState("");
  const [learnTopicSlug, setLearnTopicSlug] = useState("");
  const [customText, setCustomText] = useState("");

  const semesters = useMemo(() => listSyllabusSemesters(program), [program]);
  const effectiveSemester = semesters.includes(semester) ? semester : semesters[0];
  const subjects = useMemo(
    () => listSyllabusSubjects(program, effectiveSemester),
    [program, effectiveSemester]
  );
  const effectiveSubject = subjects.some((s) => s.slug === subjectSlug) ? subjectSlug : "";
  const modules = useMemo(
    () => (effectiveSubject ? listSyllabusModules(program, effectiveSemester, effectiveSubject) : []),
    [program, effectiveSemester, effectiveSubject]
  );

  const learnSubjects = useMemo(() => listLearnSubjects(), []);
  const effectiveLearnSubject = learnSubjects.some((s) => s.slug === learnSubjectSlug)
    ? learnSubjectSlug
    : "";
  const learnTopics = useMemo(
    () => (effectiveLearnSubject ? listLearnTopics(effectiveLearnSubject) : []),
    [effectiveLearnSubject]
  );

  function start() {
    if (mode === "learning") {
      if (source === "syllabus") {
        onStart(
          {
            mode: "learning",
            difficulty: difficulty === "any" ? "intermediate" : difficulty,
            program,
            semester: effectiveSemester,
            subjectSlug: effectiveSubject,
            topicSlug,
            category,
          },
          modules.find((m) => m.id === topicSlug)?.title
        );
      } else {
        onStart(
          {
            mode: "learning",
            difficulty: difficulty === "any" ? "intermediate" : difficulty,
            subjectSlug: effectiveLearnSubject,
            topicSlug: learnTopicSlug,
            category,
          },
          learnTopics.find((t) => t.slug === learnTopicSlug)?.title
        );
      }
      return;
    }
    if (mode === "custom") {
      onStart({ mode: "custom", customText });
      return;
    }
    onStart({
      mode,
      duration: mode === "timed" ? duration : undefined,
      wordCount: mode === "words" ? wordCount : undefined,
      sentenceCount: mode === "sentences" ? sentenceCount : undefined,
      category,
      difficulty: difficulty === "any" ? undefined : difficulty,
    });
  }

  const canStart =
    mode !== "learning" || (mode === "learning" &&
      (source === "syllabus" ? !!effectiveSubject && !!topicSlug : !!effectiveLearnSubject && !!learnTopicSlug));

  return (
    <div className="space-y-8">
      {/* Mode pills */}
      <div>
        <Label>Mode</Label>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <Pill key={m.id} active={mode === m.id} onClick={() => setMode(m.id)}>
              {m.label}
            </Pill>
          ))}
        </div>
      </div>

      {/* Mode-specific options */}
      {mode === "timed" && (
        <div>
          <Label>Duration</Label>
          <div className="flex flex-wrap gap-2">
            {TIMED_OPTIONS.map((d) => (
              <Pill key={d} active={duration === d} onClick={() => setDuration(d)}>
                {d}s
              </Pill>
            ))}
          </div>
        </div>
      )}

      {mode === "words" && (
        <div>
          <Label>Word count</Label>
          <div className="flex flex-wrap gap-2">
            {WORD_OPTIONS.map((w) => (
              <Pill key={w} active={wordCount === w} onClick={() => setWordCount(w)}>
                {w} words
              </Pill>
            ))}
          </div>
        </div>
      )}

      {mode === "sentences" && (
        <div>
          <Label>Sentence count</Label>
          <div className="flex flex-wrap gap-2">
            {SENTENCE_OPTIONS.map((s) => (
              <Pill key={s} active={sentenceCount === s} onClick={() => setSentenceCount(s)}>
                {s} sentences
              </Pill>
            ))}
          </div>
        </div>
      )}

      {mode !== "learning" && mode !== "custom" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {TYPING_CATEGORIES.map((c) => (
                <Pill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                  {c.label}
                </Pill>
              ))}
            </div>
          </div>
          <div>
            <Label>Difficulty</Label>
            <div className="flex flex-wrap gap-2">
              <Pill active={difficulty === "any"} onClick={() => setDifficulty("any")}>
                Any
              </Pill>
              {TYPING_DIFFICULTIES.map((d) => (
                <Pill key={d.id} active={difficulty === d.id} onClick={() => setDifficulty(d.id)}>
                  {d.label}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === "learning" && (
        <div className="space-y-6">
          <div>
            <Label>Source</Label>
            <div className="flex flex-wrap gap-2">
              <Pill active={source === "syllabus"} onClick={() => setSource("syllabus")}>
                TKM Syllabus
              </Pill>
              <Pill active={source === "learn-cs"} onClick={() => setSource("learn-cs")}>
                Learn CS
              </Pill>
            </div>
          </div>

          {source === "syllabus" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label>Program</Label>
                <select
                  value={program}
                  onChange={(e) => {
                    setProgram(e.target.value);
                    setSubjectSlug("");
                    setTopicSlug("");
                  }}
                  className="w-full bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
                >
                  {listPrograms().map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Semester</Label>
                <select
                  value={effectiveSemester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    setSubjectSlug("");
                    setTopicSlug("");
                  }}
                  className="w-full bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
                >
                  {semesters.map((s) => (
                    <option key={s} value={s}>
                      {s.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Subject</Label>
                <select
                  value={effectiveSubject}
                  onChange={(e) => {
                    setSubjectSlug(e.target.value);
                    setTopicSlug("");
                  }}
                  className="w-full bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
                >
                  <option value="">Select…</option>
                  {subjects.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Topic (module)</Label>
                <select
                  value={topicSlug}
                  onChange={(e) => setTopicSlug(e.target.value)}
                  className="w-full bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
                >
                  <option value="">Select…</option>
                  {modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Learn CS subject</Label>
                <select
                  value={effectiveLearnSubject}
                  onChange={(e) => {
                    setLearnSubjectSlug(e.target.value);
                    setLearnTopicSlug("");
                  }}
                  className="w-full bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
                >
                  <option value="">Select…</option>
                  {learnSubjects.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Topic</Label>
                <select
                  value={learnTopicSlug}
                  onChange={(e) => setLearnTopicSlug(e.target.value)}
                  className="w-full bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
                >
                  <option value="">Select…</option>
                  {learnTopics.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === "custom" && (
        <div>
          <Label>Paste your own text</Label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="The quick brown fox jumps over the lazy dog…"
            rows={5}
            className="w-full bg-bg-surface border border-bg-border rounded-lg px-4 py-3 text-sm text-ink-hi placeholder:text-ink-faint focus:outline-none focus:border-signal/50 resize-none"
          />
          <p className="text-[11px] text-ink-faint mt-2">
            Custom text is never saved permanently.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={start}
          disabled={!canStart || (mode === "custom" && !customText.trim())}
          className="font-mono text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-md bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Typing
        </button>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faintest">
          Timer starts on first key
        </span>
      </div>
    </div>
  );
}
