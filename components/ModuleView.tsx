"use client";

import { useState } from "react";
import Link from "next/link";
import { Module } from "@/lib/types";
import Diagram from "./Diagrams";
import PriorityLabel from "./PriorityLabel";
import WorkedExampleCard from "./WorkedExampleCard";
import ComparisonCard from "./ComparisonCard";
import SelfCheck from "./SelfCheck";
import TopicTOC from "./TopicTOC";
import interactiveRegistry from "./InteractiveDiagrams";
import ModuleMasteryChip from "./mastery/ModuleMasteryChip";
import TopicCard from "./TopicCard";
import { NoteCard, DefinitionBox, FormulaCard } from "./Notes";
import { groupQuestionsByType } from "@/lib/study";
import { generatePromptLabUrl, MODULE_QUICK_ACTIONS, QUESTION_ACTIONS } from "@/lib/prompts/context";

const BASE_SECTIONS: { key: string; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "concepts", label: "Concepts" },
  { key: "definitions", label: "Definitions" },
  { key: "diagrams", label: "Diagrams" },
  { key: "formulas", label: "Formulas" },
  { key: "examfocus", label: "Exam Focus" },
  { key: "revision", label: "Revision" },
];

type SectionKey =
  | typeof BASE_SECTIONS[number]["key"]
  | "practice"
  | "compare"
  | "selfcheck";

function QuestionActionButton({
  action,
  subjectCode,
  moduleId,
  moduleName,
  question,
  marks,
}: {
  action: (typeof QUESTION_ACTIONS)[number];
  subjectCode: string;
  moduleId: string;
  moduleName: string;
  question: string;
  marks?: number;
}) {
  const contextParams = {
    subjectCode,
    moduleId,
    moduleName,
    question,
    marks: marks?.toString(),
    contentType: "exam-question" as const,
  };
  const url = generatePromptLabUrl(contextParams, action.mode);

  return (
    <Link
      href={url}
      className="text-xs font-mono px-2.5 py-1.5 rounded-md border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors"
      title={action.description}
    >
      {action.icon} {action.label}
    </Link>
  );
}

function WorkedExampleActionButton({
  subjectCode,
  moduleId,
  moduleName,
  topic,
  problem,
}: {
  subjectCode: string;
  moduleId: string;
  moduleName: string;
  topic: string;
  problem: string;
}) {
  const url = generatePromptLabUrl(
    { subjectCode, moduleId, moduleName, topic, question: problem, contentType: "worked-example" as const },
    "problem-solver"
  );

  return (
    <Link
      href={url}
      className="text-xs font-mono px-2.5 py-1.5 rounded-md border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors"
      title="Solve this problem with AI guidance"
    >
      Solve with AI
    </Link>
  );
}

function StudyToolsBar({
  subjectCode,
  subjectName,
  moduleId,
  moduleName,
}: {
  subjectCode: string;
  subjectName: string;
  moduleId: string;
  moduleName: string;
}) {
  const contextParams = { subjectCode, moduleId, moduleName };

  return (
    <div className="border-t border-bg-border pt-4 mt-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="eyebrow">AI STUDY TOOLS</span>
        <span className="text-xs text-ink-faint font-mono">
          {subjectName} → {moduleName}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {MODULE_QUICK_ACTIONS.filter((a) => a.contextRequirements.needsModule).map((action) => {
          const url = generatePromptLabUrl(contextParams, action.mode);
          return (
            <Link
              key={action.id}
              href={url}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-mono rounded-md border border-bg-border text-ink-hi hover:border-signal hover:bg-signal/5 transition-colors"
              title={action.description}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function ModuleView({
  module,
  defaultSection = "overview",
  index,
  subjectCode = "",
  subjectName = "",
  headless = false,
}: {
  module: Module;
  defaultSection?: SectionKey;
  index?: number;
  subjectCode?: string;
  subjectName?: string;
  headless?: boolean;
}) {
  const [active, setActive] = useState<SectionKey>(defaultSection);

  const hasPractice = !!module.workedExamples?.length;
  const hasCompare = !!module.comparisons?.length;
  const hasSelfCheck = !!module.selfCheck?.length;

  const sections: { key: SectionKey; label: string }[] = [
    BASE_SECTIONS[0],
    BASE_SECTIONS[1],
    BASE_SECTIONS[2],
    BASE_SECTIONS[3],
    BASE_SECTIONS[4],
    ...(hasPractice ? [{ key: "practice" as SectionKey, label: "Worked Examples" }] : []),
    ...(hasCompare ? [{ key: "compare" as SectionKey, label: "Compare" }] : []),
    BASE_SECTIONS[5],
    ...(hasSelfCheck ? [{ key: "selfcheck" as SectionKey, label: "Self-Check" }] : []),
    BASE_SECTIONS[6],
  ];

  const tocItems = sections.map((s) => ({
    id: `section-${s.key}`,
    label: s.label,
    ...(s.key === "examfocus"
      ? { sub: groupQuestionsByType(module.examFocus).map((g) => ({ id: `qt-${g.id}`, label: g.label })) }
      : {}),
  }));

  return (
    <div id={module.id} className="card overflow-hidden">
      {/* Header — non-headless topic page header */}
      {!headless && (
        <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {index !== undefined && (
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1">
                Module {String(index).padStart(2, "0")}
              </div>
            )}
            <h3 className="font-display font-semibold text-ink-hi text-xl sm:text-2xl leading-snug">
              {module.title}
            </h3>
            {subjectCode && <ModuleMasteryChip subjectCode={subjectCode} moduleId={module.id} />}
          </div>
          {subjectCode && (
            <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
              {[{ label: "Learn", mode: "learn" }, { label: "Practice", mode: "problem-solver" }, { label: "Exam", mode: "exam-answer" }, { label: "Revise", mode: "revision" }].map((a) => (
                <Link
                  key={a.label}
                  href={generatePromptLabUrl({ subjectCode, moduleId: module.id, moduleName: module.title }, a.mode)}
                  className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1.5 rounded-md border border-bg-border text-ink-faint hover:border-signal hover:text-signal transition-colors"
                >
                  {a.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section pills (mobile + desktop fallback) */}
      <div className="flex gap-1.5 px-4 pt-3 pb-2 overflow-x-auto no-scrollbar">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`shrink-0 font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-card border transition-colors ${
              active === s.key
                ? "border-signal text-signal bg-signal/10"
                : "border-bg-border text-ink-faint hover:text-ink-hi hover:border-signal/30"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6 px-4 pb-5 pt-1">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {active === "overview" && (
            <div id="section-overview" className="read-col space-y-4 scroll-mt-4">
              <header className="space-y-1">
                <span className="section-kicker">Module overview</span>
                <h2 className="section-title">What this module covers</h2>
              </header>
              <NoteCard tone="keyidea" title="What it's about">
                {module.overview.summary}
              </NoteCard>
              <NoteCard tone="tip" title="Why it matters in exams">
                {module.overview.whyItMatters}
              </NoteCard>
              {module.intuition && <NoteCard tone="keyidea" title="Think of it like…">{module.intuition}</NoteCard>}
              {module.crossLinks && module.crossLinks.length > 0 && (
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="section-kicker">Related</span>
                  {module.crossLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className="text-xs font-mono text-ink-faint hover:text-signal border border-bg-border rounded-card px-2.5 py-2 inline-block"
                    >
                      ↗ {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {active === "concepts" && (
            <div id="section-concepts" className="read-col scroll-mt-4">
              <header className="space-y-1 mb-3">
                <span className="section-kicker">Core concepts</span>
                <h2 className="section-title">The ideas behind this module</h2>
              </header>
              <div className="space-y-1.5">
                {module.coreConcepts.map((c, i) => (
                  <TopicCard key={i} index={i + 1} title={c} />
                ))}
              </div>
            </div>
          )}

          {active === "definitions" && (
            <div id="section-definitions" className="read-col space-y-3 scroll-mt-4">
              <header className="space-y-1 pb-1">
                <span className="section-kicker">Definitions</span>
                <h2 className="section-title">Exam-ready terms</h2>
              </header>
              {module.definitions.map((d, i) => (
                <div key={i} className="group relative">
                  <DefinitionBox term={d.term} definition={d.definition} />
                  {subjectCode && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <QuestionActionButton
                        action={QUESTION_ACTIONS.find((a) => a.id === "explain")!}
                        subjectCode={subjectCode}
                        moduleId={module.id}
                        moduleName={module.title}
                        question={d.term}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {active === "diagrams" && (
            <div id="section-diagrams" className="space-y-5 scroll-mt-4">
              <header className="space-y-1">
                <span className="section-kicker">Diagrams</span>
                <h2 className="section-title">Visuals that carry exam marks</h2>
              </header>
              {module.diagrams.map((d, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                    <div className="text-sm font-semibold text-ink-hi">{d.title}</div>
                    {subjectCode && (
                      <QuestionActionButton
                        action={QUESTION_ACTIONS.find((a) => a.id === "explain")!}
                        subjectCode={subjectCode}
                        moduleId={module.id}
                        moduleName={module.title}
                        question={d.title}
                      />
                    )}
                  </div>
                  <div className="bg-bg-surface border border-bg-border rounded-card p-3 max-w-full overflow-hidden">
                    {d.interactive && interactiveRegistry[d.svgKey] ? (
                      interactiveRegistry[d.svgKey]()
                    ) : (
                      <Diagram svgKey={d.svgKey} />
                    )}
                  </div>
                  <div className="text-xs text-ink-faint mt-2 leading-relaxed">{d.caption}</div>
                </div>
              ))}
            </div>
          )}

          {active === "formulas" && (
            <div id="section-formulas" className="space-y-3 scroll-mt-4">
              <header className="space-y-1 pb-1">
                <span className="section-kicker">Formulas</span>
                <h2 className="section-title">The ones examiners actually ask for</h2>
              </header>
              {module.formulas.map((f, i) => (
                <div key={i} className="group relative">
                  <FormulaCard name={f.name} expression={f.expression} note={f.note} />
                  {subjectCode && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <QuestionActionButton
                        action={QUESTION_ACTIONS.find((a) => a.id === "practice")!}
                        subjectCode={subjectCode}
                        moduleId={module.id}
                        moduleName={module.title}
                        question={f.name}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {active === "practice" && module.workedExamples && (
            <div id="section-practice" className="space-y-3 scroll-mt-4">
              <header className="space-y-1 pb-1">
                <span className="section-kicker">Worked examples</span>
                <h2 className="section-title">Step-by-step problem walkthroughs</h2>
              </header>
              {module.workedExamples.map((ex, i) => (
                <div key={i} className="relative">
                  <WorkedExampleCard example={ex} />
                  {subjectCode && (
                    <div className="mt-2">
                      <WorkedExampleActionButton
                        subjectCode={subjectCode}
                        moduleId={module.id}
                        moduleName={module.title}
                        topic={ex.title}
                        problem={ex.problem}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {active === "compare" && module.comparisons && (
            <div id="section-compare" className="space-y-3 scroll-mt-4">
              <header className="space-y-1 pb-1">
                <span className="section-kicker">Compare</span>
                <h2 className="section-title">Why this, not that</h2>
              </header>
              {module.comparisons.map((c, i) => (
                <div key={i} className="relative">
                  <ComparisonCard card={c} />
                  {subjectCode && (
                    <div className="mt-2">
                      <QuestionActionButton
                        action={QUESTION_ACTIONS.find((a) => a.id === "explain")!}
                        subjectCode={subjectCode}
                        moduleId={module.id}
                        moduleName={module.title}
                        question={c.title}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {active === "examfocus" && (
            <div id="section-examfocus" className="space-y-5 scroll-mt-4">
              <header className="space-y-1">
                <span className="section-kicker">Exam focus</span>
                <h2 className="section-title">Questions that actually appear</h2>
              </header>
              {groupQuestionsByType(module.examFocus).map((group) => (
                <div key={group.id} id={`qt-${group.id}`} className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="eyebrow">{group.label}</span>
                      <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wide">
                        {group.count} q • {group.high} high
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-ink-faint -mt-1">{group.description}</p>
                  <div className="space-y-2.5">
                    {group.questions.map((q, i) => (
                      <div
                        key={i}
                        className={`border rounded-card p-3 border-l-2 ${
                          q.weightage === "high"
                            ? "border-critical/25 border-l-critical"
                            : q.weightage === "medium"
                            ? "border-bg-border border-l-weight/60"
                            : "border-bg-border border-l-bg-border"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-sm text-ink-hi leading-relaxed">{q.question}</span>
                          <div className="shrink-0">
                            <PriorityLabel level={q.weightage} />
                          </div>
                        </div>
                        {q.note && <NoteCard tone="tip" title="Note">{q.note}</NoteCard>}
                        {subjectCode && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {QUESTION_ACTIONS.map((action) => (
                              <QuestionActionButton
                                key={action.id}
                                action={action}
                                subjectCode={subjectCode}
                                moduleId={module.id}
                                moduleName={module.title}
                                question={q.question}
                                marks={q.weightage === "high" ? 8 : q.weightage === "medium" ? 5 : 2}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {active === "selfcheck" && module.selfCheck && (
            <div id="section-selfcheck" className="space-y-3 scroll-mt-4">
              <header className="space-y-1 pb-1">
                <span className="section-kicker">Self-check</span>
                <h2 className="section-title">Do you actually know this?</h2>
              </header>
              {module.selfCheck.map((item, i) => (
                <div key={i} className="relative">
                  <SelfCheck item={item} index={i} subjectCode={subjectCode} moduleId={module.id} />
                  {subjectCode && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <QuestionActionButton
                        action={QUESTION_ACTIONS.find((a) => a.id === "active-recall")!}
                        subjectCode={subjectCode}
                        moduleId={module.id}
                        moduleName={module.title}
                        question={item.question}
                      />
                      <QuestionActionButton
                        action={QUESTION_ACTIONS.find((a) => a.id === "explain")!}
                        subjectCode={subjectCode}
                        moduleId={module.id}
                        moduleName={module.title}
                        question={item.question}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {active === "revision" && (
            <div id="section-revision" className="read-col scroll-mt-4">
              <header className="space-y-1 mb-3">
                <span className="section-kicker">Revision</span>
                <h2 className="section-title">One-pass summary bullets</h2>
              </header>
              <ul className="space-y-1.5">
                {module.revisionNotes.map((r, i) => (
                  <li key={i} className="text-sm text-ink-hi leading-relaxed font-mono flex gap-2">
                    <span className="text-critical shrink-0">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop sticky TOC */}
        {!headless && (
          <TopicTOC
            items={tocItems}
            key={`toc-${active}`}
          />
        )}
      </div>

      {subjectCode && (
        <StudyToolsBar
          subjectCode={subjectCode}
          subjectName={subjectName}
          moduleId={module.id}
          moduleName={module.title}
        />
      )}
    </div>
  );
}
