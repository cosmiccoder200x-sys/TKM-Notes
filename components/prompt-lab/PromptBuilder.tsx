"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { StudyPrompt, StudyPromptVariable, CATEGORIES, IMPORTANCE_META } from "@/lib/prompts/types";
import { generatePrompt, populatePromptVariables, copyToClipboard, addRecent } from "@/lib/prompts/utils";
import { StudyContext } from "@/lib/prompts/context";

const IMPORTANCE_STYLES: Record<string, string> = {
  essential: "text-signal border-signal-dim bg-signal/10",
  high: "text-weight border-weight-dim bg-weight/10",
  useful: "text-ink-lo border-bg-border",
  specialized: "text-ink-faint border-bg-border",
};

interface PromptBuilderProps {
  prompt: StudyPrompt;
  initialVariables?: Record<string, string>;
  onBack: () => void;
  context?: StudyContext | null;
}

export default function PromptBuilder({ prompt, initialVariables = {}, onBack, context }: PromptBuilderProps) {
  const [variables, setVariables] = useState<Record<string, string>>(initialVariables);
  const [copied, setCopied] = useState(false);
  const [populatedVariables, setPopulatedVariables] = useState<StudyPromptVariable[]>([]);

  const category = CATEGORIES.find((c) => c.id === prompt.category);
  const importance = IMPORTANCE_META[prompt.importance];

  const renderPrompt = useCallback(
    (vars: Record<string, string>) => {
      const varsWithContext = { ...vars };
      if (context?.moduleContent && vars.subject) {
        varsWithContext.__moduleContent = JSON.stringify(context.moduleContent);
      }
      return generatePrompt(prompt, varsWithContext);
    },
    [prompt, context]
  );

  // Prompt is visible immediately — never requires any field to be filled.
  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() => renderPrompt(initialVariables));

  // Populate dynamic options (subject list, module list, marks)
  useEffect(() => {
    const populated = populatePromptVariables(prompt, variables.subject);
    setPopulatedVariables(populated);
  }, [prompt, variables.subject]);

  const handleVariableChange = useCallback((key: string, value: string) => {
    setVariables((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "subject") delete next.module; // module options depend on subject
      return next;
    });
    setCopied(false);
  }, []);

  const handleUpdate = useCallback(() => {
    setGeneratedPrompt(renderPrompt(variables));
    setCopied(false);
  }, [renderPrompt, variables]);

  const handleReset = useCallback(() => {
    setVariables({});
    setGeneratedPrompt(renderPrompt({}));
    setCopied(false);
  }, [renderPrompt]);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(generatedPrompt);
    if (success) {
      setCopied(true);
      addRecent({ modeId: prompt.id, title: prompt.title, variables });
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedPrompt, prompt, variables]);

  // Render context breadcrumb in the optional-context panel
  const renderContextInfo = () => {
    if (!context) return null;
    const parts = [];
    if (context.semesterLabel) parts.push(context.semesterLabel);
    if (context.subjectName) parts.push(context.subjectName);
    if (context.moduleName) parts.push(context.moduleName);
    if (context.topic) parts.push(context.topic);
    if (context.question) parts.push(`Q: ${context.question.substring(0, 50)}...`);
    if (context.marks) parts.push(`${context.marks} marks`);
    if (parts.length === 0) return null;
    return (
      <div className="p-3 bg-signal/5 border border-signal-dim rounded-card">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-signal">Auto-filled:</span>
          {parts.map((part, i) => (
            <span key={i} className="flex items-center gap-1 text-ink-hi">
              {i > 0 && <span className="text-ink-faint">→</span>}
              {part}
            </span>
          ))}
        </div>
        {context.moduleContent && (
          <div className="mt-2 text-xs text-ink-lo">
            Module content loaded: {[
              context.moduleContent.coreConcepts?.length && `${context.moduleContent.coreConcepts.length} concepts`,
              context.moduleContent.definitions?.length && `${context.moduleContent.definitions.length} definitions`,
              context.moduleContent.formulas?.length && `${context.moduleContent.formulas.length} formulas`,
              context.moduleContent.examFocus?.length && `${context.moduleContent.examFocus.length} exam Qs`,
              context.moduleContent.revisionNotes?.length && `${context.moduleContent.revisionNotes.length} revision notes`,
              context.moduleContent.workedExamples?.length && `${context.moduleContent.workedExamples.length} examples`,
              context.moduleContent.selfCheck?.length && `${context.moduleContent.selfCheck.length} self-checks`,
            ].filter(Boolean).join(", ")}
          </div>
        )}
      </div>
    );
  };

  // Render input for a variable (all optional — never blocks)
  const renderInput = (variable: StudyPromptVariable) => {
    const value = variables[variable.key] || "";
    const baseClass = "w-full bg-bg-surface border border-bg-border rounded-card px-3 py-2 text-sm text-ink-hi focus:border-signal outline-none";
    switch (variable.type) {
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => handleVariableChange(variable.key, e.target.value)}
            className={baseClass}
            aria-label={variable.label}
          >
            <option value="" disabled>{variable.placeholder || `Select ${variable.label}`}</option>
            {(() => {
              const groups = new Map<string, { value: string; label: string }[]>();
              for (const opt of variable.options ?? []) {
                const key = opt.group ?? "";
                if (!groups.has(key)) groups.set(key, []);
                groups.get(key)!.push(opt);
              }
              const nodes: ReactNode[] = [];
              groups.forEach((opts, groupLabel) => {
                const options = opts.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ));
                if (groupLabel) {
                  nodes.push(
                    <optgroup key={groupLabel} label={groupLabel}>
                      {options}
                    </optgroup>
                  );
                } else {
                  nodes.push(...options);
                }
              });
              return nodes;
            })()}
          </select>
        );
      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => handleVariableChange(variable.key, e.target.value)}
            placeholder={variable.placeholder}
            rows={4}
            className={`${baseClass} resize-y font-mono text-[12px]`}
            aria-label={variable.label}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleVariableChange(variable.key, e.target.value)}
            placeholder={variable.placeholder}
            className={`${baseClass} font-mono`}
            aria-label={variable.label}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleVariableChange(variable.key, e.target.value)}
            placeholder={variable.placeholder}
            className={baseClass}
            aria-label={variable.label}
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      {/* Back */}
      <button
        onClick={onBack}
        className="font-mono text-xs text-ink-lo hover:text-signal transition-colors"
      >
        ← All prompts
      </button>

      {/* Prompt header */}
      <div className="card p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl leading-none" aria-hidden="true">{prompt.icon}</span>
          <span className="eyebrow">{category?.label || prompt.category.toUpperCase()}</span>
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-card border ${IMPORTANCE_STYLES[prompt.importance]}`}
            title={importance?.hint}
          >
            {importance?.label}
          </span>
        </div>

        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-hi leading-tight tracking-tight">
            {prompt.title}
          </h1>
          <p className="text-sm text-ink-lo leading-relaxed mt-1.5">{prompt.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-1">BEST FOR</div>
            <p className="text-ink-hi leading-relaxed">{prompt.bestFor}</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-1">WHEN TO USE</div>
            <p className="text-ink-hi leading-relaxed">{prompt.whenToUse}</p>
          </div>
        </div>

        <div className="text-xs font-mono text-ink-faint">
          WORKS WITH: <span className="text-ink-lo">ChatGPT · Gemini · Claude · Other AI</span>
        </div>
      </div>

      {/* Optional context */}
      <div className="card p-5 space-y-4">
        <div>
          <div className="eyebrow mb-1">OPTIONAL CONTEXT</div>
          <p className="text-sm text-ink-lo leading-relaxed">
            Add a topic, subject or notes to make the response more specific. The prompt works perfectly without any of this.
          </p>
        </div>

        {renderContextInfo()}

        <div className="space-y-4">
          {populatedVariables.length > 0 ? (
            populatedVariables.map((variable) => (
              <div key={variable.key} className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-mono text-ink-hi">
                  <span>{variable.label}</span>
                  {!variable.required && <span className="text-[10px] text-ink-faint">optional</span>}
                </label>
                {renderInput(variable)}
                {variable.dependsOn && !variables[variable.dependsOn] && (
                  <p className="text-xs text-ink-faint">Select {variable.dependsOn} first</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-ink-lo text-center py-2">Loading options…</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleUpdate}
            className="flex-1 text-center font-mono text-xs uppercase tracking-wide py-2.5 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors min-w-[160px]"
          >
            Update Prompt
          </button>
          <button
            onClick={handleReset}
            className="text-center font-mono text-xs uppercase tracking-wide py-2.5 px-4 rounded-card border border-bg-border text-ink-lo hover:text-critical hover:border-critical transition-colors"
          >
            Continue Without Context
          </button>
        </div>
      </div>

      {/* The prompt */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 pt-5">
          <div>
            <div className="eyebrow mb-0.5">YOUR PROMPT</div>
            <p className="text-xs text-ink-lo">
              Copy this and paste it into any AI. It updates when you change the optional context above.
            </p>
          </div>
        </div>
        <div className="p-5">
          <pre className="bg-bg-raised border border-bg-border rounded-card p-4 text-[12px] text-ink-hi leading-relaxed whitespace-pre-wrap max-h-[55vh] overflow-y-auto font-mono">
            {generatedPrompt}
          </pre>
          <button
            onClick={handleCopy}
            disabled={copied}
            className={`mt-4 w-full text-center font-mono text-sm uppercase tracking-wide py-3 rounded-card transition-colors disabled:cursor-default ${
              copied
                ? "bg-signal text-bg"
                : "bg-signal text-bg hover:bg-signal/90"
            }`}
          >
            {copied ? "Copied — paste it into your AI ✓" : "Copy Prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}
