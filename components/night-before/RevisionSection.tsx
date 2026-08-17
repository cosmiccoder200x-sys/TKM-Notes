"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  NightBeforeSession,
  RevisionSection as RevisionSectionType,
  RevisionItem,
  resolveRevisionItem,
} from "@/lib/study";
import { markModuleReviewed, progressSubjectKey } from "@/lib/study";
import { generatePromptLabUrl } from "@/lib/prompts/context";
import WeightMeter from "../WeightMeter";
import SelfCheck from "../SelfCheck";
import WorkedExampleCard from "../WorkedExampleCard";
import Diagram from "../Diagrams";
import interactiveRegistry from "../InteractiveDiagrams";

const KIND_LABEL: Record<string, string> = {
  definitions: "Definition",
  concepts: "Concept",
  formulas: "Formula",
  questions: "Exam question",
  diagrams: "Diagram",
  revision: "Revision point",
  "self-check": "Self-check",
  "worked-examples": "Worked example",
};

function ItemView({
  subjectCode,
  programId,
  item,
  reviewed,
  onToggleReviewed,
}: {
  subjectCode: string;
  programId: string;
  item: RevisionItem;
  reviewed: boolean;
  onToggleReviewed: (id: string) => void;
}) {
  const resolved = resolveRevisionItem(subjectCode, item, programId as "ER" | "CS" | "CS_AI");
  const c = resolved?.content;

  if (!resolved || !c) return null;

  const useWithAi =
    item.kind === "questions" ? (
      <Link
        href={generatePromptLabUrl(
          {
            subjectCode,
            moduleId: item.moduleId,
            moduleName: item.moduleTitle,
            question: c.question ?? item.label,
            marks: item.weightage === "high" ? "8" : item.weightage === "medium" ? "5" : "2",
          },
          "exam-answer"
        )}
        className="font-mono text-[11px] uppercase tracking-wide px-2.5 py-1.5 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
      >
        Use with AI
      </Link>
    ) : null;

  return (
    <div className="card p-3 space-y-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
          {KIND_LABEL[item.kind]} · {item.moduleTitle}
        </span>
        <div className="flex items-center gap-2">
          {item.kind === "questions" && item.weightage && <WeightMeter level={item.weightage} />}
          {useWithAi}
        </div>
      </div>

      {item.kind === "definitions" && (
        <div>
          <div className="font-mono text-[12px] text-weight font-semibold mb-1">{c.term}</div>
          <div className="text-sm text-ink-hi leading-relaxed">{c.definition}</div>
        </div>
      )}

      {item.kind === "concepts" && <p className="text-sm text-ink-hi leading-relaxed">{c.concept}</p>}

      {item.kind === "revision" && (
        <p className="text-sm text-ink-hi leading-relaxed font-mono flex gap-2">
          <span className="text-critical shrink-0">•</span>
          <span>{c.concept}</span>
        </p>
      )}

      {item.kind === "formulas" && (
        <div>
          <div className="text-[12px] text-ink-lo mb-1">{c.name}</div>
          <div className="font-mono text-[13px] text-signal leading-relaxed break-words select-all">
            {c.expression}
          </div>
          {c.note && <div className="text-xs text-ink-lo mt-1.5 leading-relaxed">{c.note}</div>}
        </div>
      )}

      {item.kind === "questions" && (
        <div>
          <p className="text-sm text-ink-hi leading-relaxed">{c.question}</p>
          {c.note && <p className="text-xs text-ink-lo mt-1.5 leading-relaxed">{c.note}</p>}
        </div>
      )}

      {item.kind === "diagrams" && c.svgKey && (
        <div className="bg-bg-raised border border-bg-border rounded-card p-3">
          {c.interactive && interactiveRegistry[c.svgKey] ? (
            interactiveRegistry[c.svgKey]()
          ) : (
            <Diagram svgKey={c.svgKey} />
          )}
        </div>
      )}

      {item.kind === "self-check" && (
        <SelfCheck
          item={{ question: c.question ?? "", answer: c.answer ?? "" }}
          index={Number(item.id.split(":")[2] ?? 0)}
          subjectCode={subjectCode}
          moduleId={item.moduleId}
          programId={programId}
        />
      )}

      {item.kind === "worked-examples" && (
        <WorkedExampleCard
          example={{
            title: c.title ?? "",
            problem: c.problem ?? "",
            steps: c.steps ?? [],
            answer: c.answer ?? "",
          }}
        />
      )}

      <button
        onClick={() => onToggleReviewed(item.id)}
        className={`font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-card border transition-colors ${
          reviewed
            ? "border-signal text-signal bg-signal/10"
            : "border-bg-border text-ink-lo hover:border-signal hover:text-signal"
        }`}
        aria-pressed={reviewed}
      >
        {reviewed ? "✓ Reviewed" : "Mark as Reviewed"}
      </button>
    </div>
  );
}

export default function RevisionSectionView({
  session,
  section,
  onComplete,
  onItemReviewed,
  onNext,
  onBack,
}: {
  session: NightBeforeSession;
  section: RevisionSectionType;
  onComplete: (sectionId: string) => void;
  onItemReviewed: (itemId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const completed = session.completedSections.includes(section.id);
  const subjectCode = session.subjectCode;
  const programId = session.programId ?? "ER";

  const markAllReviewed = () => {
    for (const item of section.items) {
      if (!session.reviewedItems.includes(item.id)) onItemReviewed(item.id);
    }
    const moduleIds = Array.from(new Set(section.items.map((it) => it.moduleId)));
    for (const id of moduleIds) markModuleReviewed(progressSubjectKey(programId, subjectCode), id);
    onComplete(section.id);
  };

  const items = useMemo(() => section.items, [section]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-1">
            Section {String(section.order + 1).padStart(2, "0")} · {section.minutes} min
          </div>
          <h2 className="font-display font-semibold text-xl text-ink-hi leading-tight">{section.title}</h2>
        </div>
        <button
          onClick={onBack}
          className="font-mono text-[11px] uppercase tracking-wide text-ink-lo hover:text-signal transition-colors"
        >
          ← Plan
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ItemView
            key={item.id}
            subjectCode={subjectCode}
            programId={programId}
            item={item}
            reviewed={session.reviewedItems.includes(item.id)}
            onToggleReviewed={onItemReviewed}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <button
          onClick={markAllReviewed}
          className={`flex-1 text-center font-mono text-sm uppercase tracking-wide py-2.5 rounded-card border transition-colors ${
            completed
              ? "border-signal text-signal bg-signal/10"
              : "border-signal text-signal hover:bg-signal/10"
          }`}
        >
          {completed ? "✓ Section Reviewed" : "Mark Section as Reviewed"}
        </button>
        <button
          onClick={onNext}
          className="flex-1 text-center font-mono text-sm uppercase tracking-wide py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
        >
          Next Section →
        </button>
      </div>
    </div>
  );
}
