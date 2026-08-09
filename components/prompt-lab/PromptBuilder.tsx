"use client";

import { useState, useEffect, useCallback } from "react";
import { StudyPrompt, StudyPromptVariable } from "@/lib/prompts/types";
import { generatePrompt, populatePromptVariables, copyToClipboard, addRecent } from "@/lib/prompts/utils";
import { StudyContext, getSubjectCategory, getSubjectEvaluationCriteria, getSubjectProblemGuidance, getSubjectAnswerStructure } from "@/lib/prompts/context";

interface PromptBuilderProps {
  prompt: StudyPrompt;
  initialVariables?: Record<string, string>;
  onBack: () => void;
  context?: StudyContext | null;
}

export default function PromptBuilder({ prompt, initialVariables = {}, onBack, context }: PromptBuilderProps) {
  const [variables, setVariables] = useState<Record<string, string>>(initialVariables);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [populatedVariables, setPopulatedVariables] = useState<StudyPromptVariable[]>([]);
  
  // Populate variables with dynamic options on mount
  useEffect(() => {
    const subjectCode = variables.subject || initialVariables.subject;
    const populated = populatePromptVariables(prompt, subjectCode);
    setPopulatedVariables(populated);
  }, [prompt, variables.subject, initialVariables.subject]);
  
  // Update populated variables when subject changes
  useEffect(() => {
    if (variables.subject) {
      const populated = populatePromptVariables(prompt, variables.subject);
      setPopulatedVariables(populated);
    }
  }, [variables.subject, prompt]);
  
  const handleVariableChange = useCallback((key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  }, []);
  
  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Inject module content if available
      const varsWithContext = { ...variables };
      if (context?.moduleContent) {
        varsWithContext.__moduleContent = JSON.stringify(context.moduleContent);
      }
      const promptText = generatePrompt(prompt, varsWithContext);
      setGeneratedPrompt(promptText);
      // Add to recents
      addRecent({
        modeId: prompt.id,
        title: prompt.title,
        variables,
      });
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, variables, context]);
  
  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(generatedPrompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedPrompt]);
  
  const handleReset = useCallback(() => {
    setVariables(initialVariables);
    setGeneratedPrompt("");
    setCopied(false);
  }, [initialVariables]);
  
  const handleEdit = useCallback(() => {
    setGeneratedPrompt("");
  }, []);
  
  // Render context breadcrumb in builder
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
      <div className="mb-4 p-3 bg-signal/5 border border-signal-dim rounded-card">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-signal">Context:</span>
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
  
  // Render input for a variable
  const renderInput = (variable: StudyPromptVariable) => {
    const value = variables[variable.key] || "";
    const isRequired = variable.required;
    
    switch (variable.type) {
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => handleVariableChange(variable.key, e.target.value)}
            required={isRequired}
            className="w-full bg-bg-surface border border-bg-border rounded-card px-3 py-2 text-sm text-ink-hi focus:border-signal outline-none"
            aria-label={variable.label}
          >
            <option value="" disabled>{variable.placeholder || `Select ${variable.label}`}</option>
            {variable.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => handleVariableChange(variable.key, e.target.value)}
            required={isRequired}
            placeholder={variable.placeholder}
            rows={4}
            className="w-full bg-bg-surface border border-bg-border rounded-card px-3 py-2 text-sm text-ink-hi focus:border-signal outline-none resize-y font-mono text-[12px]"
            aria-label={variable.label}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleVariableChange(variable.key, e.target.value)}
            required={isRequired}
            placeholder={variable.placeholder}
            className="w-full bg-bg-surface border border-bg-border rounded-card px-3 py-2 text-sm text-ink-hi focus:border-signal outline-none font-mono"
            aria-label={variable.label}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleVariableChange(variable.key, e.target.value)}
            required={isRequired}
            placeholder={variable.placeholder}
            className="w-full bg-bg-surface border border-bg-border rounded-card px-3 py-2 text-sm text-ink-hi focus:border-signal outline-none"
            aria-label={variable.label}
          />
        );
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="card overflow-hidden">
      {/* Header */}
      <button
        onClick={onBack}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <div>
          <div className="eyebrow mb-0.5">{prompt.icon} {prompt.category.toUpperCase()}</div>
          <div className="text-sm font-display font-semibold text-ink-hi">{prompt.title}</div>
        </div>
        <span className="text-ink-lo text-lg shrink-0">←</span>
      </button>
      
      {/* Form or Preview */}
      {generatedPrompt ? (
        // Preview mode
        <div className="px-4 pb-4">
          {renderContextInfo()}
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-semibold text-ink-hi">YOUR PROMPT</h4>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="text-sm font-mono py-1.5 px-3 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleReset}
                className="text-sm font-mono py-1.5 px-3 rounded-card border border-bg-border text-ink-lo hover:border-critical hover:text-critical transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
          
          <pre className="bg-bg-raised border border-bg-border rounded-card p-3 text-[11px] text-ink-lo leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto font-mono">
            {generatedPrompt}
          </pre>
          
          <button
            onClick={handleCopy}
            disabled={copied}
            className={`mt-3 w-full text-center text-sm font-mono py-2 rounded-card border transition-colors ${
              copied
                ? "border-signal text-signal bg-signal/10 cursor-default"
                : "border-bg-border text-ink-hi hover:border-signal hover:text-signal"
            }`}
          >
            {copied ? "Copied ✓" : "Copy Prompt"}
          </button>
        </div>
      ) : (
        // Builder form mode
        <div className="px-4 pb-4">
          {renderContextInfo()}
          <p className="text-xs text-ink-lo leading-relaxed mb-4">
            Fill in the details below to generate a tailored AI prompt for this study mode.
          </p>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {populatedVariables.length > 0 ? (
              populatedVariables.map((variable) => (
                <div key={variable.key} className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-mono text-ink-hi">
                    <span>{variable.label}</span>
                    {variable.required && <span className="text-critical text-xs">*</span>}
                  </label>
                  {renderInput(variable)}
                  {variable.dependsOn && !variables[variable.dependsOn] && (
                    <p className="text-xs text-ink-faint">Select {variable.dependsOn} first</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-ink-lo text-center py-4">Loading variables...</p>
            )}
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-4 w-full text-center text-sm font-mono py-2.5 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating…" : "Generate Prompt"}
          </button>
        </div>
      )}
      </div>
    </div>
  );
}