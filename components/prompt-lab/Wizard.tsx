"use client";

import { useState } from "react";
import { WIZARD_QUESTIONS, getWizardRecommendation } from "@/lib/prompts/utils";
import { StudyModeId } from "@/lib/prompts/types";
import { getPromptById } from "@/lib/prompts/prompts";

interface WizardProps {
  onSelectMode: (modeId: StudyModeId, defaultVars?: Record<string, string>) => void;
}

export default function Wizard({ onSelectMode }: WizardProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setShowRecommendations(true);
  };
  
  if (!showRecommendations) {
    return (
      <div className="space-y-3">
        <h4 className="font-display font-semibold text-ink-hi">What should I use?</h4>
        <p className="text-xs text-ink-lo leading-relaxed">
          Pick your goal — I&apos;ll recommend the best study modes.
        </p>
        <div className="space-y-2" role="radiogroup" aria-label="Study goal">
          {WIZARD_QUESTIONS.map((question) => (
            <label
              key={question.id}
              className="card p-3 flex items-center gap-3 hover:border-signal transition-colors cursor-pointer"
            >
              <input
                type="radio"
                name="wizard-goal"
                value={question.id}
                checked={selectedGoal === question.id}
                onChange={() => handleGoalSelect(question.id)}
                className="w-4 h-4 text-signal border-bg-border focus:ring-signal accent-signal"
                aria-label={question.label}
              />
              <div className="flex-1">
                <div className="font-display font-semibold text-sm text-ink-hi">{question.label}</div>
                <div className="text-xs text-ink-lo">{question.description}</div>
              </div>
              <svg className="w-5 h-5 text-ink-faint shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </label>
          ))}
        </div>
      </div>
    );
  }
  
  const recommendation = getWizardRecommendation(selectedGoal!);
  
  return (
    <div className="space-y-3">
      <button
        onClick={() => { setSelectedGoal(null); setShowRecommendations(false); }}
        className="text-xs font-mono text-ink-faint hover:text-signal transition-colors flex items-center gap-1"
      >
        ← Back
      </button>
      
      <h4 className="font-display font-semibold text-ink-hi">Recommended for you</h4>
      <p className="text-xs text-ink-lo leading-relaxed">
        Based on: &quot;{recommendation?.label}&quot;
      </p>
      
      <div className="space-y-3">
        {recommendation?.recommendedModes.map((modeId, i) => {
          const prompt = getPromptById(modeId);
          if (!prompt) return null;
          return (
            <button
              key={modeId}
              onClick={() => onSelectMode(modeId)}
              className="card p-3 flex items-center gap-3 hover:border-signal transition-colors group"
            >
              <span className="text-2xl shrink-0" aria-hidden="true">{prompt.icon}</span>
              <div className="flex-1">
                <div className="font-display font-semibold text-sm text-ink-hi group-hover:text-signal transition-colors">
                  {prompt.title}
                </div>
                <div className="text-xs text-ink-lo">{prompt.description}</div>
              </div>
              <span className="eyebrow shrink-0">{prompt.category.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}