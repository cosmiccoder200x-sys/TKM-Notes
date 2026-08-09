"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_PROMPTS, getPromptById } from "@/lib/prompts/prompts";
import { StudyPrompt, StudyModeCategory, StudyModeId, FavoritePrompt, RecentPrompt, CATEGORY_ORDER, CATEGORIES } from "@/lib/prompts/types";
import { getFavorites, addFavorite, removeFavorite, isFavorite, parseContextFromUrl, getModeFromUrl, contextToPromptVars, enrichContext } from "@/lib/prompts/utils";
import { StudyContext } from "@/lib/prompts/context";
import PromptCard from "./PromptCard";
import PromptBuilder from "./PromptBuilder";
import PromptFilters from "./PromptFilters";
import QuickPrompts from "./QuickPrompts";
import RecentPrompts from "./RecentPrompts";
import Wizard from "./Wizard";

export default function PromptLabPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<StudyModeCategory | "all">("all");
  const [selectedPrompt, setSelectedPrompt] = useState<StudyPrompt | null>(null);
  const [builderVariables, setBuilderVariables] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<FavoritePrompt[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [context, setContext] = useState<StudyContext | null>(null);
  const searchParams = useSearchParams();
  
  // Parse context from URL on mount
  useEffect(() => {
    const urlContext = parseContextFromUrl(searchParams);
    const urlMode = getModeFromUrl(searchParams);
    
    // Enrich with full module content
    const enrichedContext = enrichContext(urlContext);
    setContext(enrichedContext);
    
    // If mode is specified in URL, auto-open that prompt
    if (urlMode) {
      const prompt = getPromptById(urlMode as StudyModeId);
      if (prompt) {
        const vars = contextToPromptVars(enrichedContext);
        const filteredVars: Record<string, string> = {};
        (Object.entries(vars) as [string, string | undefined][]).forEach(([k, v]) => {
          if (v) filteredVars[k] = v;
        });
        setSelectedPrompt(prompt);
        setBuilderVariables(filteredVars);
      }
    }
    
    // Set category filter from context if available
    if (enrichedContext.subjectCode && !urlMode) {
      // Could auto-filter categories based on context
    }
  }, [searchParams]);
  
  // Load favorites on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);
  
  // Filter prompts based on search and category
  const filteredPrompts = ALL_PROMPTS.filter(prompt => {
    const matchesSearch = searchQuery === "" || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || prompt.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Group prompts by category
  const promptsByCategory = filteredPrompts.reduce((acc, prompt) => {
    if (!acc[prompt.category]) acc[prompt.category] = [];
    acc[prompt.category].push(prompt);
    return acc;
  }, {} as Record<StudyModeCategory, StudyPrompt[]>);
  
  const handlePromptClick = (prompt: StudyPrompt, vars: Record<string, string> = {}) => {
    // Merge context variables with any provided vars
    const contextVars = context ? contextToPromptVars(context) : {};
    // Filter out undefined values
    const filteredContextVars: Record<string, string> = {};
    (Object.entries(contextVars) as [string, string | undefined][]).forEach(([k, v]) => {
      if (v) filteredContextVars[k] = v;
    });
    setSelectedPrompt(prompt);
    setBuilderVariables({ ...filteredContextVars, ...vars });
  };
  
  const handleBack = () => {
    setSelectedPrompt(null);
    setBuilderVariables({});
  };
  
  const handleQuickSelect = (modeId: StudyModeId, defaultVars: Record<string, string> = {}) => {
    const prompt = getPromptById(modeId);
    if (prompt) {
      handlePromptClick(prompt, defaultVars);
    }
  };
  
  const handleRecentSelect = (recent: RecentPrompt) => {
    const prompt = getPromptById(recent.modeId);
    if (prompt) {
      handlePromptClick(prompt, recent.variables);
    }
  };
  
  const handleWizardSelect = (modeId: StudyModeId, defaultVars: Record<string, string> = {}) => {
    const prompt = getPromptById(modeId);
    if (prompt) {
      handlePromptClick(prompt, defaultVars);
      setShowWizard(false);
    }
  };
  
  const handleFavoriteToggle = (prompt: StudyPrompt) => {
    const fav = isFavorite(prompt.id, builderVariables);
    if (fav) {
      const existing = getFavorites().find(f => 
        f.modeId === prompt.id && JSON.stringify(f.variables) === JSON.stringify(builderVariables)
      );
      if (existing) {
        removeFavorite(existing.id);
      }
    } else {
      addFavorite({
        modeId: prompt.id,
        title: prompt.title,
        variables: builderVariables,
      });
    }
    setFavorites(getFavorites());
  };
  
  const checkIsFavorite = (prompt: StudyPrompt) => {
    return isFavorite(prompt.id, builderVariables);
  };
  
  // Render context breadcrumb
  const renderContextBreadcrumb = () => {
    if (!context) return null;
    
    const parts = [];
    if (context.semesterLabel) parts.push(context.semesterLabel);
    if (context.subjectName) parts.push(context.subjectName);
    if (context.moduleName) parts.push(context.moduleName);
    if (context.topic) parts.push(context.topic);
    
    if (parts.length === 0) return null;
    
    return (
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-ink-lo mb-4 font-mono">
        <span className="text-ink-faint">Context:</span>
        {parts.map((part, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink-faint">/</span>}
            <span className="text-ink-hi">{part}</span>
          </span>
        ))}
        <span className="ml-2 px-2 py-0.5 bg-signal/10 text-signal rounded-card">
          Auto-filled
        </span>
      </div>
    );
  };
  
  if (selectedPrompt) {
    return (
      <PromptBuilder
        prompt={selectedPrompt}
        initialVariables={builderVariables}
        onBack={handleBack}
        context={context}
      />
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-semibold text-2xl text-ink-hi leading-tight mb-1.5">
          PROMPT LAB
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed mb-4">
          AI-powered study modes — Learn smarter. Practice harder. Score better.
        </p>
        {renderContextBreadcrumb()}
      </div>
      
      {/* Wizard / Goal Selector */}
      <Wizard onSelectMode={handleWizardSelect} />
      
      {/* Quick Prompts */}
      <QuickPrompts onQuickSelect={handleQuickSelect} />
      
      {/* Filters */}
      <PromptFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      {/* Recent Prompts */}
      <RecentPrompts onRecentSelect={handleRecentSelect} />
      
      {/* Prompt Cards by Category */}
      <div className="space-y-6">
        {CATEGORY_ORDER.map((catId) => {
          const prompts = promptsByCategory[catId];
          if (!prompts || prompts.length === 0) return null;
          
          const categoryInfo = CATEGORIES.find(c => c.id === catId);
          
          return (
            <div key={catId} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-ink-hi text-base">
                  {categoryInfo?.label || catId.toUpperCase()}
                </h3>
                <span className="text-xs font-mono text-ink-faint">{prompts.length} mode{prompts.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    isFavorite={checkIsFavorite(prompt)}
                    onFavoriteToggle={() => handleFavoriteToggle(prompt)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Empty state */}
      {filteredPrompts.length === 0 && (
        <div className="card p-6 text-center">
          <p className="text-sm text-ink-hi mb-1">No study modes match your search.</p>
          <p className="text-xs text-ink-lo">Try a different keyword or filter.</p>
        </div>
      )}
    </div>
  );
}