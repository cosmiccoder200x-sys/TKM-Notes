# CLAUDE.md — TKM Notes

> **Purpose:** This file gives Claude (or any AI assistant) the full context of the TKM Notes codebase so it can analyze the project and suggest / implement features accurately. Keep it updated when architecture changes.

---

## 1. Product Overview

**TKM Notes** is a static, AI-assisted exam-preparation workspace for **Electrical & Computer Engineering** students at **TKM College of Engineering** (KTU 2024 scheme, Semesters S3–S8).

- It ranks every topic by real exam weightage and turns available study time into a prioritized, reason-backed plan.
- It ships a **Prompt Lab**: a library of copy-ready AI prompts (Learn, Active Recall, PYQ Intelligence, Exam Answer, Strict Examiner, Problem Solver, Mock Exam, Revision, Mistake Fixer, Score 90+, and **Syllabus Complete**) that students paste into ChatGPT / Gemini / Claude.
- Exam-focused notes are the verified context that makes prompts specific.
- No chatbot, no backend, no database. All content is typed TypeScript data; all "AI" prompts are generated client-side for copy-paste.

**Brand identity (source of truth = `lib/branch.ts`):**
- `PRODUCT_NAME = "TKM Notes"` (was "PrepPilot" — fully renamed)
- `PRODUCT_TAGLINE = "Exam-focused notes & AI study tools for TKM CE."`
- `PRODUCT_POSITIONING = "Study less. Prioritize better."`
- `BRANCH_NAME = "Electrical & Computer Engineering"`, `BRANCH_RANGE = "S3–S8"`

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 14** (App Router, static generation) |
| UI | **React 18** |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS 3** + CSS variables for theming |
| Fonts | `Outfit` (display, `--font-display`), `Inter` (body, `--font-body`), `JetBrains Mono` (mono) via `next/font/google` |
| State | React state + `localStorage` (favorites, recents, mastery progress). No Redux/Zustand. |
| Data | Static typed `.ts` files (no DB, no API) |
| Deploy | GitHub → Vercel auto-deploy |

Scripts: `npm run dev` (port 3000), `npm run build`, `npm run start`, `npm run lint`.
Path alias: `@/*` → repo root (`tsconfig.json`).

---

## 3. Directory Map (current, verified)

```
app/
  layout.tsx                 Root layout: fonts, ThemeScript, AppShell, CommandPalette,
                             MobileNav, footer. Sets PRODUCT_NAME metadata.
  page.tsx                   Homepage: hero + search/planner widgets, semester explorer,
                             HomeStudyStatus, StudyTools, all-semesters grid.
  globals.css                Tailwind layers + CSS-variable design tokens (light + .dark),
                             glass/card/chip/progress utilities, gradient + dot-grid backgrounds.
  error.tsx, not-found.tsx, loading.tsx
  syllabus/page.tsx          Syllabus index (branch-aware) + coverage.
  coverage/page.tsx          Coverage dashboard (notes/PYQ/module coverage per branch).
  admin/page.tsx             Data-integrity overview (per-branch counts, notes, modules).
  [semester]/page.tsx        Legacy ER route → redirect to /syllabus/er/<sem>.
  [semester]/[subject]/page.tsx        Legacy ER route → redirect to canonical branch URL.
  [semester]/[subject]/mastery/page.tsx  Legacy ER route → redirect.
  syllabus/
    [program]/page.tsx             Branch hub (er/cse/cse-ai) → semester cards.
    [program]/[semester]/page.tsx  Branch+semester subject grid.
    [program]/[semester]/[subject]/page.tsx  Subject workspace: breadcrumb, header, stats,
                                             StudyModeSwitcher, ModuleAccordion, DeepDivePrompt.
    [program]/[semester]/[subject]/mastery/page.tsx  Mastery map (<MasteryMap>).
  planner/page.tsx           Study planner UI.
  prompt-lab/page.tsx        Prompt Lab UI.
  night-before/page.tsx      Night-Before revision mode (wrapped in <Suspense>).
  learn-cs/page.tsx          Learn CS home (hero, progress, recommendations, roadmap, categories).
  learn-cs/roadmap/page.tsx  Goals (9 + custom) + roadmap levels 0–5.
  learn-cs/progress/page.tsx Learn CS progress dashboard.
  learn-cs/my-learning/page.tsx  My Learning view.
  learn-cs/[subject]/page.tsx    Subject: readiness gate + 7-stage learning path.
  learn-cs/[subject]/[topic]/page.tsx  Topic: prereq gate, practice, quiz, revision,
                                       syllabus cross-links, Learn-with-AI.

components/
  layout/AppShell.tsx        Collapsible sidebar (desktop) + mobile drawer + bottom nav + theme toggle.
  Header.tsx, MobileNav.tsx, ThemeToggle.tsx, ThemeScript.tsx,
  CommandPalette.tsx, PaletteButton.tsx, SearchBar.tsx
  SemesterExplorer.tsx, SubjectCard.tsx, StudyTools.tsx, DeepDivePrompt.tsx
  ModuleAccordion.tsx        One-module-at-a-time accordion.
  ModuleView.tsx, ModulePriorityBadge.tsx, ModuleView.tsx
  StudyModeSwitcher.tsx      Learn / Practice / Exam / Revise mode tabs on subject page.
  WeightMeter.tsx, PriorityLabel.tsx, TopicTOC.tsx
  Notes.tsx, Diagrams.tsx, InteractiveDiagrams.tsx, ComparisonCard.tsx,
  WorkedExampleCard.tsx, SelfCheck.tsx
  planner/                   QuickPlannerForm.tsx, StudyPlanner.tsx
  prompt-lab/                PromptLab.tsx, PromptLabWrapper.tsx, PromptBuilder.tsx,
                             PromptCard.tsx, PromptFilters.tsx, QuickPrompts.tsx,
                             RecentPrompts.tsx, Wizard.tsx, index.ts
  mastery/                   MasteryMap.tsx, MasteryBar.tsx, SubjectMasteryBar.tsx,
                             ModuleMasteryBadges.tsx, ModuleMasteryCard.tsx,
                             ModuleMasteryChip.tsx, HomeStudyStatus.tsx,
                             MasteryStatus.tsx, NextStudyRecommendation.tsx, WeakAreas.tsx
  night-before/              NightBeforeMode.tsx, NightBeforeSetup.tsx, RevisionPlan.tsx,
                             RevisionSection.tsx, RevisionProgress.tsx, FinalCheck.tsx, TimeSelector.tsx
  learn-cs/                  LearningPath.tsx, LearnProgressCard.tsx, MyLearningView.tsx,
                             TopicState.tsx, LearnWithAI.tsx, TopicPrereqGate.tsx,
                             PracticePanel.tsx, QuizPanel.tsx, RevisionPanel.tsx,
                             SyllabusCrossLinks.tsx, RoadmapView.tsx, RecommendationsView.tsx,
                             GoalsView.tsx, SubjectReadiness.tsx, LearnProgressDashboard.tsx

lib/
  types.ts                   Core content data model (see §4).
  content.ts                 All semesters + 259 subjects (ER 38 + CSE 108 + CSE [AI] 113,
                             S3–S8) + branch-aware helpers (findSubject, subjectsForProgram,
                             subjectKey, syllabusModulesFor).
  syllabusData.ts            AUTO-GENERATED by scripts/import-syllabus.mjs — CS + CS_AI
                             subjects and official module/topic breakdowns.
  urls.ts                    Branch-aware URL helpers (programUrl, semesterUrl, subjectUrl,
                             masteryUrl, programSlug/programFromSlug).
  branch.ts                  Branding strings + subject category metadata/mapping.
  notes/                     ONE FILE PER SUBJECT (content data).
    index.ts                 Registry: programId-subjectCode → SubjectContent.
                             Key format `${programId}-${subjectCode}` (e.g. "ER-24ERP304",
                             "CS_AI-24MAP300"). Plain-code aliases kept for legacy callers.
                             ~28 ER subjects + 1 CS_AI written so far.
    data-structures-and-algorithms.ts, network-theory.ts, advanced-linear-algebra-*.ts,
    digital-electronics-and-logic-design.ts, sensor-and-sensor-circuits.ts,
    life-skills-and-professional-ethics.ts, system-simulation-and-virtual-instrumentation-lab.ts
  prompts/                   Prompt system (definitions separate from UI).
    prompts.ts               The 11 StudyPrompt definitions + subject-specific instruction builders.
    context.ts               StudyContext type, buildContextFromParams, generatePromptLabUrl,
                             getSubjectCategory, evaluation/answer/problem guidance helpers.
    types.ts                 StudyPrompt, StudyModeId, StudyPromptVariable, CATEGORIES, IMPORTANCE_META.
    utils.ts                 Population of dropdowns, generatePrompt(), localStorage favorites/recents,
                             copy-to-clipboard, WIZARD_QUESTIONS, QUICK_PROMPTS, URL parsing.
  study/                     Exam-preparation engine (pure, deterministic).
    index.ts, types.ts, priority.ts, questionTypes.ts, planner.ts,
    nightBefore.ts, mastery.ts, progress.ts, recommendations.ts
  search.ts                  Ctrl/⌘+K command-palette search across all content types
                             (TKM notes + Learn CS subject/topic hits via `href`).
  syllabusText.ts            Syllabus reference text for prompts.
  learn-cs/                  Learn CS catalog + engines (see §10).
    index.ts                 LEARN_SUBJECTS (30), getLearnSubject, subjectTopics,
                             findLearnTopic, nextTopic, totalTopics, totalMinutes.
    types.ts                 LearnSubject/LearnTopic + LearnFineCategory,
                             LearnSyllabusLink, LearnTopicDetail, roadmap/goal types.
    categories.ts            LEARN_CATEGORIES (6 broad), LEARN_FINE_CATEGORIES (17),
                             LEARN_ROADMAP_LEVELS (0–5), LEARN_GOALS (9),
                             roadmapLevelFor, getLearnFineCategory.
    progress.ts              Learn CS state (tkm.learncs.progress.v1) + detail
                             (tkm.learncs.detail.v1: learnedAt/revision/quiz/spaced
                             revision 1/3/7/14/30 adaptive), computeLearnStats,
                             computeLearnDetailStats. Isolated from TKM branch state.
    quiz.ts                  Deterministic 5-question quiz (FNV-1a + mulberry32),
                             weakTopicsFor.
    recommendations.ts       recommendNext (goal/prereqs/weak/due/branch+5 nudge),
                             continueLearningTarget, roadmapProgress.
    syllabus.ts              Canonical TKM cross-links (SUBJECT_LINKS/TOPIC_LINKS)
                             resolved via content.ts/notes/urls — never duplicates.
    ai.ts                    Learn-with-AI prompt builders.
    data/*.ts                Subject data files (programming, cs-fundamentals,
                             math, development, ai-data, advanced) — 30 subjects,
                             417 topics. DSA fully authored.
docs/                        (syllabus-reference.txt etc.)
scripts/
  import-syllabus.mjs        Idempotent JSON import → regenerates lib/syllabusData.ts.
                             Usage: node scripts/import-syllabus.mjs [path-to-json]
  verify-data.js             P0 + P2 acceptance checks: syllabus counts/collisions,
                             Learn CS integrity (prereq graph, topic dupes,
                             cross-link targets). Usage: node scripts/verify-data.js
                             (exit 0 = all pass)
  check-data.js              Legacy collision/quick checks on lib/syllabusData.ts.

tailwind.config.js           Theme tokens mapped to CSS vars (bg, bg-surface, bg-raised, border,
                             ink-hi/lo/faint, signal, signal-dim, weight, critical).
postcss.config.js, next.config.js, .eslintrc.json
```

---

## 4. Data Model (`lib/types.ts`)

Every subject is broken into **Modules**. Each `Module` has 7 fixed core sections + optional understanding sections:

```ts
type Weightage = "low" | "medium" | "high";

interface Module {
  id: string;                 // "m1"
  title: string;
  overview: { summary: string; whyItMatters: string };
  coreConcepts: string[];
  definitions: { term: string; definition: string }[];
  diagrams: { title: string; svgKey: string; caption: string; interactive?: boolean }[];
  formulas: { name: string; expression: string; note?: string }[];
  examFocus: { question: string; weightage: Weightage; note?: string }[];
  revisionNotes: string[];
  // optional (added incrementally):
  intuition?: string;
  workedExamples?: { title: string; problem: string; steps: {label:string; content:string}[]; answer: string }[];
  comparisons?: { title: string; scenario: string; a: {label,body}; b:{label,body}; takeaway: string }[];
  selfCheck?: { question: string; answer: string }[];
  crossLinks?: { label: string; href: string }[];
}

interface SubjectContent { subjectCode: string; modules: Module[]; }
```

- `Semester { id, label }`, `Subject { code, slug, name, credits, semesterId, programId }` in `lib/content.ts` (`programId: "ER" | "CS" | "CS_AI"`).
- Diagram rendering: `svgKey` maps to a named SVG in `components/Diagrams.tsx` (inline SVG, no image hosting). `interactive: true` → `components/InteractiveDiagrams.tsx`.

---

## 5. How Content & Pages Connect

1. **Subjects** defined in `lib/content.ts` (259 total = 38 ER + 108 CSE + 113 CSE [AI], S3–S8).
2. **Notes** live in `lib/notes/*.ts`, registered in `lib/notes/index.ts` keyed by `programId + subject code`.
   - Subjects with **no registry entry** render a friendly "not written yet" state (never crash).
3. **Routing:** `/syllabus/<program>/<semester>` → semester grid. `/syllabus/<program>/<semester>/<subject>` → subject page. `/syllabus/.../mastery` → mastery map. Legacy `/s3`-style routes redirect to `/syllabus/er/...`. Branch slugs: `er`, `cse`, `cse-ai`.
4. **Study engine** (`lib/study/*`): `priority.ts` ranks modules; `planner.ts` builds time-boxed plans; `mastery.ts`/`progress.ts` score + persist progress; `recommendations.ts` suggests "what to study next"; `nightBefore.ts` builds limited-time revision. All engines take an optional `programId` and key progress by `progressSubjectKey(programId, subjectCode)` so branches never mix.
5. **Prompt Lab** (`lib/prompts/*`): 11 `StudyPrompt` objects in `prompts.ts`. Each has `variables[]`, a `template(vars)` function, and subject-category-specific instruction builders (`getSubjectSpecificInstructions`, `getSubjectAnswerStructure`, etc. in `context.ts`). UI in `components/prompt-lab/*` reads these and copies generated text to clipboard.
6. **Theme:** CSS variables in `globals.css` (`:root` light, `.dark` dark). `ThemeScript.tsx` injects a pre-paint script to avoid flash; `ThemeToggle.tsx` switches `light`/`dark`/`system` and persists to `localStorage`. Tailwind utilities (`bg-bg`, `text-ink-hi`, `bg-signal`, `border-bg-border`, etc.) consume the vars.

---

## 6. Adding Content / Extending

**Add a subject's notes:**
1. Find module breakdown in `docs/syllabus-reference.txt` (ER) or `lib/syllabusData.ts` (CS / CS_AI).
2. Copy `lib/notes/data-structures-and-algorithms.ts` as a template.
3. Fill 7 core sections per module → save as `lib/notes/<slug>.ts`.
4. Register in `lib/notes/index.ts` with its program:
   ```ts
   import mySubject from "./my-subject";
   // push into the program's list (erNotes | csAiNotes), keyed `${programId}-${subjectCode}`.
   ```
5. Done — page, search, and "coming soon" state update automatically.

**Add a diagram:** add a function + registry entry in `components/Diagrams.tsx`, reference its `svgKey` from a module's `diagrams` array.

**Add a prompt mode:** add a `StudyPrompt` to `lib/prompts/prompts.ts`, ensure `StudyModeId` exists in `lib/prompts/types.ts`, and (if needed) wire category in `context.ts`.

**Add a component/page:** follow the existing `@/components/...` import convention and the App Router `page.tsx` + `generateStaticParams()` pattern for dynamic routes.

---

## 7. Code Conventions (follow these)

- **TypeScript strict** — no `any` in new code; type everything.
- **Path alias** `@/*` for all imports (never relative `../../../`).
- **No emojis in code/UI** unless the user requests.
- **No comments** unless explicitly asked.
- **Styling:** Tailwind utility classes + design tokens (`bg-bg`, `text-ink-hi`, `bg-signal`, `border-bg-border`, `.card`, `.chip`, `.eyebrow`). Use `dark:` variants for theme-aware styling.
- **Client vs Server:** pages are Server Components by default; interactive bits (`'use client'`) live in components like `AppShell`, `CommandPalette`, `ThemeToggle`, `PromptLab`, `NightBeforeMode`.
- **Data is static & typed** — never fetch at runtime; compute during build.
- Run `npm run lint` and `npx tsc --noEmit` before considering work done.

---

## 8. Current Status (as of v2.2)

**Written notes (28 subjects):** ~27 ER subjects + 1 CS_AI (adv. linear algebra). All others show "not written yet".

**Features live:**
- Redesigned dark/light/system theme with multi-layer radial gradient + dot-grid + glow shadows.
- AppShell: collapsible sidebar (desktop), mobile drawer, bottom nav, theme toggle.
- Homepage redesign (editorial hero, search + planner deck, semester explorer, study tools).
- Subject workspace: ModuleAccordion, StudyModeSwitcher (Learn/Practice/Exam/Revise), MasteryBar, DeepDivePrompt.
- Mastery map + HomeStudyStatus + WeakAreas + NextStudyRecommendation.
- Study Planner (`/planner`), Night-Before mode (`/night-before`), Prompt Lab (`/prompt-lab`) with 11 modes including **Syllabus Complete** (self-study basic→pro roadmap).
- Command palette (Ctrl/⌘+K) search.
- **Branch-aware syllabus:** full CSE (108) + CSE [AI] (113) subjects imported from the official KTU 2024 JSON, isolated progress/search/notes per branch, `/syllabus/{er,cse,cse-ai}`, `/coverage` and `/admin` dashboards.
- **Learn CS (P2):** 30 subjects / 417 topics catalog (see §10), roadmap levels 0–5, 9 goals + custom, practice + deterministic quiz, spaced revision (1/3/7/14/30), recommendations (goal/prereq/weak/branch-tuned), progress dashboard, unified search hits, `/learn-cs`, `/learn-cs/roadmap`, `/learn-cs/progress`, `/learn-cs/my-learning`. Cross-links to the TKM syllabus never duplicate P0/P1 data.

**Known gaps / opportunities for suggestions:**
- S4–S8 written notes are mostly missing (only S3 fully covered + a few).
- No backend → no multi-device sync, no real AI calls (all prompts are copy-paste).
- No test runner wired into `package.json` (use `node scripts/verify-data.js` + `npm run build` as the P0 gate).
- README.md is **outdated** (still says "PrepPilot", references some stale file names) — should be refreshed or merged into this file.
- Mastery/progress is `localStorage`-only; no export/import.
- No analytics, no PWA/offline support, no i18n.

---

## 10. Learn CS (P2) — How It Works

**Catalog (`lib/learn-cs/`):** `LEARN_SUBJECTS` (30) across 6 data files (`data/{programming, cs-fundamentals, math, development, ai-data, advanced}.ts`, 417 topics). Each `LearnSubject` has `stages[]` (7-stage path), `prerequisites[]` (subject slugs), and per-topic fields `summary/keyIdea/example/intuition/commonMistakes/practice/quickRevision/prerequisites` plus optional `complexity/related/question`.

**Browsing & structure (`lib/learn-cs/categories.ts`):** 6 broad `LEARN_CATEGORIES`, 17 fine `LEARN_FINE_CATEGORIES` (each with difficulty, estimatedHours, whyItMatters; subject→category via `SUBJECT_FINE_CATEGORY` map keyed by slug), `LEARN_STAGES` (7), `LEARN_ROADMAP_LEVELS` (0–5), `LEARN_GOALS` (9 ordered goal roadmaps). `roadmapLevelFor(slug)` / `getLearnFineCategory(slug)`.

**Progress (`lib/learn-cs/progress.ts`):** two localStorage keys, fully isolated from TKM branch state:
- `tkm.learncs.progress.v1` — topic → `LearningState` (not-started → learning → understood → practiced → mastered).
- `tkm.learncs.detail.v1` — `LearnTopicDetail` (learnedAt, lastRevisedAt, revisionCount, quiz best/attempts/correct/total/weak). Spaced revision 1/3/7/14/30 days, adaptive via `adaptiveIntervalDays`.
Helpers: `getLearnProgress`, `setTopicState`, `advanceTopicState`, `getSubjectLearnProgress`, `computeLearnStats`, `markTopicLearned/Revised`, `recordQuizResult`, `revisionDueStatus`, `computeLearnDetailStats`.

**Quiz (`lib/learn-cs/quiz.ts`):** deterministic 5-question `generateQuiz(subjectSlug, topic)` (FNV-1a hash + mulberry32 PRNG) from the topic's summary/keyIdea/quickRevision/commonMistakes/practice; `weakTopicsFor` returns questions answered wrong.

**Recommendations (`lib/learn-cs/recommendations.ts`):** `recommendNext({progress, details, goal, branch})` — ranks by goal roadmap, subject prerequisites, quiz weak areas, due-for-revision, continue-in-progress, ready subjects; branch read from `tkm.branch.pref` adds a +5 nudge for subjects the student's TKM branch teaches (recommendation-only, curriculum never reordered/hidden). `continueLearningTarget`, `roadmapProgress` (per-level done/total).

**TKM cross-links (`lib/learn-cs/syllabus.ts`):** `SUBJECT_LINKS` (learn-cs slug → per-branch `{programId, subjectCode}`) and `TOPIC_LINKS` (learn-cs subject/topic → per-branch subject+moduleId). Resolved via `findSubjectByCode`/`syllabusModulesFor`/`getSubjectContent`/`subjectUrl` — Learn CS stores only program+code, never duplicates target data. `syllabusLinksForSubject/Topic`, `syllabusLinkHref`, `syllabusLinkHasNotes`, `syllabusLinkModuleTitle`.

**Pages:** `/learn-cs` (hero, progress card, recommendations, roadmap, categories), `/learn-cs/roadmap` (goals + levels via `GoalsView`/`RoadmapView`), `/learn-cs/progress` (`LearnProgressDashboard`), `/learn-cs/my-learning`, `/learn-cs/[subject]` (readiness + learning path), `/learn-cs/[subject]/[topic]` (Question→Think, `TopicPrereqGate`, `PracticePanel` + `QuizPanel`, `RevisionPanel`, `SyllabusCrossLinks`, LearnWithAI). Search (`lib/search.ts`) returns learn-cs subject/topic hits with a direct `href`.

**Data isolation & honesty:** learn-cs progress never mixes with TKM branch progress; cross-links open the syllabus without writing to it; "no notes yet" states are shown honestly. Adding a Learn CS subject = add to a `data/*.ts` file (it appears in catalog/search automatically); no registry edit needed. Verify: `node scripts/verify-data.js` now includes Learn CS integrity (subject/topic counts, prereq graph, cross-link targets).

---

## 9. For Claude: How to Suggest / Implement Features

- **Read before changing:** always inspect the relevant `app/`, `components/`, and `lib/` files first. The data model in `lib/types.ts` and the registry in `lib/notes/index.ts` are the backbone.
- **Small, focused changes** preferred; keep TypeScript + ESLint clean.
- **Verify:** after edits run `npx tsc --noEmit` and `npm run lint`. Dev server runs on `http://localhost:3000`; all routes should return HTTP 200 (home, `/s3`, `/s3/<subject>`, `/s3/<subject>/mastery`, `/planner`, `/prompt-lab`, `/night-before`).
- **Don't break the registry pattern** — new subjects must register in `lib/notes/index.ts` or pages 404.
- **Theming:** never hard-code colors; use the CSS-var tokens so light/dark both work.
- When suggesting features, rank by student value: exam-weightage accuracy, time-to-mastery, and "no fluff" philosophy.
