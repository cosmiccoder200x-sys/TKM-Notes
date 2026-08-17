"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { semesters, subjectsForProgram, syllabusModulesFor } from "@/lib/content";
import { getSubjectContent } from "@/lib/notes";
import { ProgramId } from "@/lib/types";
import { PROGRAM_OPTIONS, normalizeProgramId } from "@/lib/branch";
import { programFromSlug, subjectUrl } from "@/lib/urls";
import { generatePromptLabUrl } from "@/lib/prompts/context";

const STORAGE_KEY = "tkm_program_id";

interface AiAction {
  label: string;
  description: string;
  mode: string;
  icon: string;
}

const ACTION_GROUPS: { title: string; actions: AiAction[] }[] = [
  {
    title: "Understand",
    actions: [
      { label: "Explain", description: "Build a clear explanation of a concept", mode: "learn", icon: "book" },
      { label: "Quiz Me", description: "Active-recall questions to test understanding", mode: "active-recall", icon: "practice" },
      { label: "Syllabus Complete", description: "Self-study roadmap for the whole subject", mode: "syllabus-complete", icon: "modules" },
    ],
  },
  {
    title: "Practice",
    actions: [
      { label: "Give Example", description: "Worked example with step-by-step reasoning", mode: "problem-solver", icon: "flask" },
      { label: "Give Hard Question", description: "A challenging question to push you", mode: "mock-exam", icon: "practice" },
      { label: "Explain My Mistake", description: "Paste your attempt and get it diagnosed", mode: "mistake-fixer", icon: "edit" },
    ],
  },
  {
    title: "Exam",
    actions: [
      { label: "Exam Answer", description: "Marks-focused answer structure", mode: "exam-answer", icon: "edit" },
      { label: "Strict Examiner", description: "Grade my answer like the real exam", mode: "strict-examiner", icon: "book" },
      { label: "PYQ Intelligence", description: "Which topics actually repeat", mode: "pyq-intelligence", icon: "pyq" },
      { label: "Score 90+", description: "Marks-maximization strategy", mode: "score-90-plus", icon: "trend" },
    ],
  },
  {
    title: "Revise",
    actions: [
      { label: "Revise This", description: "High-yield revision of this module", mode: "revision", icon: "revision" },
    ],
  },
];

export default function AiStudyHub() {
  const params = useSearchParams();
  const urlProgram = programFromSlug(params.get("program") ?? "");
  const urlSemester = params.get("semester") ?? "";
  const urlSubject = params.get("subject") ?? "";

  const [programId, setProgramId] = useState<ProgramId>(urlProgram ?? "ER");
  const [semesterId, setSemesterId] = useState<string>(urlSemester || "s3");
  const [subjectCode, setSubjectCode] = useState<string>(urlSubject || "all");
  const [moduleId, setModuleId] = useState<string>("all");

  useEffect(() => {
    const stored = normalizeProgramId(localStorage.getItem(STORAGE_KEY));
    if (stored) setProgramId(stored);
  }, []);

  const programSubjects = useMemo(() => subjectsForProgram(programId), [programId]);
  const semesterSubjects = useMemo(
    () => programSubjects.filter((s) => s.semesterId === semesterId),
    [programSubjects, semesterId]
  );
  const subject = useMemo(
    () => semesterSubjects.find((s) => s.code === subjectCode),
    [semesterSubjects, subjectCode]
  );

  const moduleOptions = useMemo(() => {
    if (!subject) return [];
    const content = getSubjectContent(subject.code, programId);
    if (content) {
      return content.modules.map((m) => ({ id: m.id, title: m.title }));
    }
    return syllabusModulesFor(programId, subject.code).map((m) => ({ id: m.id, title: m.title }));
  }, [subject, programId]);

  const selectCls =
    "bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm font-mono text-ink-hi focus:border-signal focus:outline-none appearance-none pr-8";

  const context = {
    semester: semesterId,
    subjectSlug: subject?.slug,
    moduleId: moduleId !== "all" ? moduleId : undefined,
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-3 border-b border-bg-border pb-6">
        <div className="section-kicker">AI Study</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-hi leading-tight tracking-tight">
          Study with AI
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed max-w-2xl">
          Pick a subject and module, then choose what to do. Every action opens Prompt Lab with your
          branch, semester, subject and module already filled in — so the AI has full context. Copy the
          prompt into ChatGPT, Gemini or Claude.
        </p>
      </header>

      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Branch
            <select
              value={programId}
              onChange={(e) => {
                setProgramId(e.target.value as ProgramId);
                setSubjectCode("all");
                setModuleId("all");
              }}
              className={selectCls}
            >
              {PROGRAM_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.short}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Semester
            <select
              value={semesterId}
              onChange={(e) => {
                setSemesterId(e.target.value);
                setSubjectCode("all");
                setModuleId("all");
              }}
              className={selectCls}
            >
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Subject
            <select
              value={subjectCode}
              onChange={(e) => {
                setSubjectCode(e.target.value);
                setModuleId("all");
              }}
              className={selectCls}
            >
              <option value="all">Whole semester</option>
              {semesterSubjects.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wide text-ink-faint">
            Module
            <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} className={selectCls}>
              <option value="all">Whole subject</option>
              {moduleOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        {subject && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-ink-lo">
              Context: <span className="text-ink-hi font-medium">{subject.name}</span>
              <span className="text-ink-faint"> ({subject.code} · {semesterId.toUpperCase()})</span>
            </span>
            <Link
              href={subjectUrl(subject.programId, subject.semesterId, subject.slug)}
              className="text-signal hover:underline ml-auto"
            >
              Open subject →
            </Link>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {ACTION_GROUPS.map((group) => (
          <section key={group.title} className="space-y-3">
            <h2 className="font-display font-semibold text-lg text-ink-hi border-b border-bg-border/40 pb-2">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.actions.map((a) => (
                <Link
                  key={a.label}
                  href={generatePromptLabUrl(context, a.mode)}
                  className="card p-4 flex flex-col gap-2 hover:border-signal/60 hover:bg-signal/5 transition-colors group no-underline"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-semibold text-sm text-ink-hi group-hover:text-signal transition-colors">
                      {a.label}
                    </span>
                    <span className="text-signal text-[10px] font-mono uppercase tracking-wide">
                      open →
                    </span>
                  </div>
                  <span className="text-xs text-ink-lo leading-relaxed">{a.description}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}