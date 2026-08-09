"use client";

import { useState } from "react";
import Link from "next/link";
import { Module } from "@/lib/types";
import Diagram from "./Diagrams";
import WeightMeter from "./WeightMeter";
import WorkedExampleCard from "./WorkedExampleCard";
import ComparisonCard from "./ComparisonCard";
import SelfCheck from "./SelfCheck";
import interactiveRegistry from "./InteractiveDiagrams";
import ModuleMasteryChip from "./mastery/ModuleMasteryChip";
import { generatePromptLabUrl, MODULE_QUICK_ACTIONS, QUESTION_ACTIONS, SubjectCategory, getSubjectCategory } from "@/lib/prompts/context";

const BASE_SECTIONS = [
  { key: "overview", label: "Overview" },
  { key: "concepts", label: "Concepts" },
  { key: "definitions", label: "Definitions" },
  { key: "diagrams", label: "Diagrams" },
  { key: "formulas", label: "Formulas" },
  { key: "examfocus", label: "Exam Focus" },
  { key: "revision", label: "Revision" },
] as const;

type SectionKey =
  | typeof BASE_SECTIONS[number]["key"]
  | "practice"
  | "compare"
  | "selfcheck";

// Question action button component
function QuestionActionButton({ 
  action, 
  subjectCode, 
  moduleId, 
  moduleName, 
  question, 
  marks 
}: { 
  action: typeof QUESTION_ACTIONS[0];
  subjectCode: string;
  moduleId: string;
  moduleName: string;
  question: string;
  marks?: number;
}) {
  const category = getSubjectCategory(subjectCode);
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
      className="text-xs font-mono px-2 py-1 rounded-card border border-bg-border text-ink-lo hover:text-signal hover:border-signal transition-colors"
      title={action.description}
    >
      {action.icon} {action.label}
    </Link>
  );
}

// Worked example action button
function WorkedExampleActionButton({ 
  subjectCode, 
  moduleId, 
  moduleName, 
  topic, 
  problem 
}: { 
  subjectCode: string;
  moduleId: string;
  moduleName: string;
  topic: string;
  problem: string;
}) {
  const contextParams = {
    subjectCode,
    moduleId,
    moduleName,
    topic,
    question: problem,
    contentType: "worked-example" as const,
  };
  
  const url = generatePromptLabUrl(contextParams, "problem-solver");
  
  return (
    <Link
      href={url}
      className="text-xs font-mono px-2 py-1 rounded-card border border-bg-border text-ink-lo hover:text-signal hover:border-signal transition-colors"
      title="Solve this problem with AI guidance"
    >
      ⚙️ Solve with AI
    </Link>
  );
}

// Study tools bar component
function StudyToolsBar({ 
  subjectCode, 
  subjectName, 
  moduleId, 
  moduleName 
}: { 
  subjectCode: string;
  subjectName: string;
  moduleId: string;
  moduleName: string;
}) {
  const contextParams = {
    subjectCode,
    moduleId,
    moduleName,
  };
  
  return (
    <div className="border-t border-bg-border pt-4 mt-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="eyebrow">AI STUDY TOOLS</span>
        <span className="text-xs text-ink-faint font-mono">
          {subjectName} → {moduleName}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {MODULE_QUICK_ACTIONS.map((action) => {
          if (action.contextRequirements.needsModule) {
            const url = generatePromptLabUrl(contextParams, action.mode);
            return (
              <Link
                key={action.id}
                href={url}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-mono rounded-card border border-bg-border text-ink-hi hover:border-signal hover:bg-signal/5 transition-colors"
                title={action.description}
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </Link>
            );
          }
          return null;
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

  const sections: { key: SectionKey; label: string }[] = [
    BASE_SECTIONS[0],
    BASE_SECTIONS[1],
    BASE_SECTIONS[2],
    BASE_SECTIONS[3],
    BASE_SECTIONS[4],
    ...(module.workedExamples?.length ? [{ key: "practice" as SectionKey, label: "Practice" }] : []),
    ...(module.comparisons?.length ? [{ key: "compare" as SectionKey, label: "Compare" }] : []),
    BASE_SECTIONS[5],
    ...(module.selfCheck?.length ? [{ key: "selfcheck" as SectionKey, label: "Self-Check" }] : []),
    BASE_SECTIONS[6],
  ];

  return (
    <div id={module.id} className="card overflow-hidden">
      {!headless && (
        <div className="px-4 pt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {index !== undefined && (
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1">
                Module {String(index).padStart(2, "0")}
              </div>
            )}
            <h3 className="font-display font-semibold text-ink-hi text-base leading-snug">{module.title}</h3>
          </div>
          {subjectCode && (
            <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
              {[
                { label: "Learn", mode: "learn" },
                { label: "Practice", mode: "problem-solver" },
                { label: "Exam", mode: "exam-answer" },
                { label: "Revise", mode: "revision" },
              ].map((a) => (
                <Link
                  key={a.label}
                  href={generatePromptLabUrl(
                    { subjectCode, moduleId: module.id, moduleName: module.title },
                    a.mode
                  )}
                  className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
                >
                  {a.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section pills — horizontally scrollable on mobile */}
      <div className="flex gap-1.5 px-4 pt-3 pb-2 overflow-x-auto no-scrollbar">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`shrink-0 font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-card border transition-colors ${
              active === s.key
                ? "border-signal text-signal bg-signal/10"
                : "border-bg-border text-ink-lo hover:text-ink-hi"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {subjectCode && (
        <div className="px-4 pb-2 border-b border-bg-border">
          <ModuleMasteryChip subjectCode={subjectCode} moduleId={module.id} />
        </div>
      )}

      <div className="px-4 pb-5 pt-1">
        {active === "overview" && (
          <div className="space-y-3">
            <div>
              <div className="eyebrow mb-1">What it&apos;s about</div>
              <p className="text-sm text-ink-hi leading-relaxed">{module.overview.summary}</p>
            </div>
            <div>
              <div className="eyebrow mb-1 text-weight">Why it matters in exams</div>
              <p className="text-sm text-ink-hi leading-relaxed">{module.overview.whyItMatters}</p>
            </div>
            {module.intuition && (
              <div className="border border-signal-dim bg-signal/5 rounded-card p-3">
                <div className="eyebrow mb-1">think of it like…</div>
                <p className="text-sm text-ink-hi leading-relaxed">{module.intuition}</p>
              </div>
            )}
            {module.crossLinks && module.crossLinks.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                {module.crossLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-xs font-mono text-ink-lo hover:text-signal border border-bg-border rounded-card px-2.5 py-1.5 inline-block"
                  >
                    ↗ {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {active === "concepts" && (
          <ul className="space-y-2">
            {module.coreConcepts.map((c, i) => (
              <li key={i} className="text-sm text-ink-hi leading-relaxed flex gap-2">
                <span className="text-signal shrink-0">›</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        )}

        {active === "definitions" && (
          <div className="space-y-2.5">
            {module.definitions.map((d, i) => (
              <div key={i} className="border border-weight-dim bg-weight/5 rounded-card p-3 relative">
                <div className="font-mono text-[12px] text-weight font-semibold mb-1">{d.term}</div>
                <div className="text-sm text-ink-hi leading-relaxed">{d.definition}</div>
                <QuestionActionButton
                  action={QUESTION_ACTIONS.find(a => a.id === "explain")!}
                  subjectCode={subjectCode}
                  moduleId={module.id}
                  moduleName={module.title}
                  question={d.term}
                />
              </div>
            ))}
          </div>
        )}

        {active === "diagrams" && (
          <div className="space-y-5">
            {module.diagrams.map((d, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-ink-hi">{d.title}</div>
                  <QuestionActionButton
                    action={QUESTION_ACTIONS.find(a => a.id === "explain")!}
                    subjectCode={subjectCode}
                    moduleId={module.id}
                    moduleName={module.title}
                    question={d.title}
                  />
                </div>
                <div className="bg-bg-raised border border-bg-border rounded-card p-3">
                  {d.interactive && interactiveRegistry[d.svgKey] ? (
                    interactiveRegistry[d.svgKey]()
                  ) : (
                    <Diagram svgKey={d.svgKey} />
                  )}
                </div>
                <div className="text-xs text-ink-lo mt-2 leading-relaxed">{d.caption}</div>
              </div>
            ))}
          </div>
        )}

        {active === "formulas" && (
          <div className="space-y-2.5">
            {module.formulas.map((f, i) => (
              <div key={i} className="border border-bg-border bg-bg-raised rounded-card p-3 relative">
                <div className="text-[12px] text-ink-lo mb-1">{f.name}</div>
                <div className="font-mono text-[13px] text-signal leading-relaxed break-words select-all">
                  {f.expression}
                </div>
                {f.note && <div className="text-xs text-ink-lo mt-1.5 leading-relaxed">{f.note}</div>}
                <QuestionActionButton
                  action={QUESTION_ACTIONS.find(a => a.id === "practice")!}
                  subjectCode={subjectCode}
                  moduleId={module.id}
                  moduleName={module.title}
                  question={f.name}
                />
              </div>
            ))}
          </div>
        )}

        {active === "practice" && module.workedExamples && (
          <div className="space-y-3">
            {module.workedExamples.map((ex, i) => (
              <div key={i} className="relative">
                <WorkedExampleCard example={ex} />
                <WorkedExampleActionButton
                  subjectCode={subjectCode}
                  moduleId={module.id}
                  moduleName={module.title}
                  topic={ex.title}
                  problem={ex.problem}
                />
              </div>
            ))}
          </div>
        )}

        {active === "compare" && module.comparisons && (
          <div className="space-y-3">
            {module.comparisons.map((c, i) => (
              <div key={i} className="relative">
                <ComparisonCard card={c} />
                <QuestionActionButton
                  action={QUESTION_ACTIONS.find(a => a.id === "explain")!}
                  subjectCode={subjectCode}
                  moduleId={module.id}
                  moduleName={module.title}
                  question={c.title}
                />
              </div>
            ))}
          </div>
        )}

        {active === "examfocus" && (
          <div className="space-y-2.5">
            {module.examFocus.map((q, i) => (
              <div key={i} className="border border-bg-border rounded-card p-3 relative">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-sm text-ink-hi leading-relaxed">{q.question}</span>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <WeightMeter level={q.weightage} />
                    {q.weightage === "high" && (
                      <span className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-critical/40 text-critical bg-critical/10">
                        High Priority
                      </span>
                    )}
                    {q.weightage === "medium" && (
                      <span className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-weight-dim text-weight bg-weight/10">
                        Important
                      </span>
                    )}
                  </div>
                </div>
                {q.note && <div className="text-xs text-ink-lo leading-relaxed">{q.note}</div>}
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
              </div>
            ))}
          </div>
        )}

        {active === "selfcheck" && module.selfCheck && (
          <div className="space-y-2.5">
            {module.selfCheck.map((item, i) => (
              <div key={i} className="relative">
                <SelfCheck item={item} index={i} subjectCode={subjectCode} moduleId={module.id} />
                <div className="mt-2 flex flex-wrap gap-2">
                  <QuestionActionButton
                    action={QUESTION_ACTIONS.find(a => a.id === "active-recall")!}
                    subjectCode={subjectCode}
                    moduleId={module.id}
                    moduleName={module.title}
                    question={item.question}
                  />
                  <QuestionActionButton
                    action={QUESTION_ACTIONS.find(a => a.id === "explain")!}
                    subjectCode={subjectCode}
                    moduleId={module.id}
                    moduleName={module.title}
                    question={item.question}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "revision" && (
          <ul className="space-y-1.5">
            {module.revisionNotes.map((r, i) => (
              <li key={i} className="text-sm text-ink-hi leading-relaxed font-mono flex gap-2">
                <span className="text-critical shrink-0">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Study Tools Bar at bottom of module */}
        <StudyToolsBar
          subjectCode={subjectCode}
          subjectName={subjectName}
          moduleId={module.id}
          moduleName={module.title}
        />
      </div>
    </div>
  );
}