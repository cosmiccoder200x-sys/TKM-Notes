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
  [semester]/
    page.tsx                 Semester page → renders <SemesterExplorer initialSemester=...>
    [subject]/
      page.tsx               Subject workspace: breadcrumb, header, stats, MasteryBar,
                             StudyModeSwitcher, ModuleAccordion, DeepDivePrompt.
      loading.tsx            Skeleton loader.
      mastery/page.tsx       Mastery map (<MasteryMap>).
  planner/page.tsx           Study planner UI.
  prompt-lab/page.tsx        Prompt Lab UI.
  night-before/page.tsx      Night-Before revision mode (wrapped in <Suspense>).

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

lib/
  types.ts                   Core content data model (see §4).
  content.ts                 All semesters + 62 subjects (S3–S8) + elective options + helpers.
  branch.ts                  Branding strings + subject category metadata/mapping.
  notes/                     ONE FILE PER SUBJECT (content data).
    index.ts                 Registry: subject code → SubjectContent. 8 subjects written so far.
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
  search.ts                  Ctrl/⌘+K command-palette search across all content types.
  syllabusText.ts            Syllabus reference text for prompts.
docs/                        (syllabus-reference.txt etc.)

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

- `Semester { id, label }`, `Subject { code, slug, name, credits, semesterId }` in `lib/content.ts`.
- Diagram rendering: `svgKey` maps to a named SVG in `components/Diagrams.tsx` (inline SVG, no image hosting). `interactive: true` → `components/InteractiveDiagrams.tsx`.

---

## 5. How Content & Pages Connect

1. **Subjects** defined in `lib/content.ts` (62 total, S3–S8).
2. **Notes** live in `lib/notes/*.ts`, registered in `lib/notes/index.ts` keyed by subject code.
   - Subjects with **no registry entry** render a friendly "not written yet" state (never crash).
3. **Routing:** `/s3` → semester page → `SemesterExplorer`. `/s3/data-structures-and-algorithms` → subject page. `/s3/.../mastery` → mastery map.
4. **Study engine** (`lib/study/*`): `priority.ts` ranks modules; `planner.ts` builds time-boxed plans; `mastery.ts`/`progress.ts` score + persist progress; `recommendations.ts` suggests "what to study next"; `nightBefore.ts` builds limited-time revision.
5. **Prompt Lab** (`lib/prompts/*`): 11 `StudyPrompt` objects in `prompts.ts`. Each has `variables[]`, a `template(vars)` function, and subject-category-specific instruction builders (`getSubjectSpecificInstructions`, `getSubjectAnswerStructure`, etc. in `context.ts`). UI in `components/prompt-lab/*` reads these and copies generated text to clipboard.
6. **Theme:** CSS variables in `globals.css` (`:root` light, `.dark` dark). `ThemeScript.tsx` injects a pre-paint script to avoid flash; `ThemeToggle.tsx` switches `light`/`dark`/`system` and persists to `localStorage`. Tailwind utilities (`bg-bg`, `text-ink-hi`, `bg-signal`, `border-bg-border`, etc.) consume the vars.

---

## 6. Adding Content / Extending

**Add a subject's notes:**
1. Find module breakdown in `docs/syllabus-reference.txt`.
2. Copy `lib/notes/data-structures-and-algorithms.ts` as a template.
3. Fill 7 core sections per module → save as `lib/notes/<slug>.ts`.
4. Register in `lib/notes/index.ts`:
   ```ts
   import mySubject from "./my-subject";
   const registry = { "24ERP304": dsa, "24XXXXXX": mySubject };
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

**Written notes (8 subjects):** DSA, Network Theory, Adv. Linear Algebra/Complex Analysis/PDE, Digital Electronics & Logic Design, Sensor & Sensor Circuits, Life Skills & Professional Ethics, System Simulation & VI Lab, (and one more registered). All others show "not written yet".

**Features live:**
- Redesigned dark/light/system theme with multi-layer radial gradient + dot-grid + glow shadows.
- AppShell: collapsible sidebar (desktop), mobile drawer, bottom nav, theme toggle.
- Homepage redesign (editorial hero, search + planner deck, semester explorer, study tools).
- Subject workspace: ModuleAccordion, StudyModeSwitcher (Learn/Practice/Exam/Revise), MasteryBar, DeepDivePrompt.
- Mastery map + HomeStudyStatus + WeakAreas + NextStudyRecommendation.
- Study Planner (`/planner`), Night-Before mode (`/night-before`), Prompt Lab (`/prompt-lab`) with 11 modes including **Syllabus Complete** (self-study basic→pro roadmap).
- Command palette (Ctrl/⌘+K) search.

**Known gaps / opportunities for suggestions:**
- S4–S8 written notes are mostly missing (only S3 fully covered + a few).
- No backend → no multi-device sync, no real AI calls (all prompts are copy-paste).
- No tests exist (`package.json` has no test script).
- README.md is **outdated** (still says "PrepPilot", references some stale file names) — should be refreshed or merged into this file.
- Mastery/progress is `localStorage`-only; no export/import.
- No analytics, no PWA/offline support, no i18n.

---

## 9. For Claude: How to Suggest / Implement Features

- **Read before changing:** always inspect the relevant `app/`, `components/`, and `lib/` files first. The data model in `lib/types.ts` and the registry in `lib/notes/index.ts` are the backbone.
- **Small, focused changes** preferred; keep TypeScript + ESLint clean.
- **Verify:** after edits run `npx tsc --noEmit` and `npm run lint`. Dev server runs on `http://localhost:3000`; all routes should return HTTP 200 (home, `/s3`, `/s3/<subject>`, `/s3/<subject>/mastery`, `/planner`, `/prompt-lab`, `/night-before`).
- **Don't break the registry pattern** — new subjects must register in `lib/notes/index.ts` or pages 404.
- **Theming:** never hard-code colors; use the CSS-var tokens so light/dark both work.
- When suggesting features, rank by student value: exam-weightage accuracy, time-to-mastery, and "no fluff" philosophy.
