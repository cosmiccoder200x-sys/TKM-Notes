# TKM Notes V2 — Repository Audit (RUN 1)

Date: 2026-09-28. Baseline commit: `13cca21`.
Verification at audit time: `npx tsc --noEmit` clean, `next lint` clean, `vitest run` 9 files / 92 tests passing, working tree clean.

This document is the pre-implementation baseline required by the V2 spec (§4).
No code was changed to produce it. A companion target design lives in
`docs/TKM_V2_ARCHITECTURE.md`.

## 1. Existing architecture

### Frontend
- **Next.js 14 App Router, fully static** (`generateStaticParams` on dynamic
  routes), React 18, TypeScript strict, Tailwind CSS 3 + CSS-variable theming
  (light/dark/system, pre-paint `ThemeScript`).
- Routes (all static): `/`, `/syllabus`, `/syllabus/[program]/[semester]/[subject]`
  (+ `/mastery`), `/practice`, `/pyqs`, `/ai-study`, `/revision` (night-before),
  `/planner`, `/prompt-lab`, `/progress`, `/learn-cs` (+ roadmap/progress/
  my-learning/subject/topic), `/typing` (+ history/progress), `/coverage`,
  `/admin`, legacy `/[semester]` redirects.
- Primary nav (`components/navigation/navItems.tsx`): Home, Syllabus,
  Practice, PYQs, AI Study, Revision, Planner, Learn CS. **Prompt Lab,
  Night-Before, Typing, Progress, Coverage, Admin are already out of the
  primary nav** (reachable by deep link, drawer, or contextual buttons).
- Interactive code lives in `'use client'` components; pages are server
  components. Path alias `@/*`.

### Backend / database / AI integration
- **None.** No server actions, no API routes, no database, no Supabase, no
  auth, no AI API calls. The "AI" is 11 copy-paste prompt templates rendered
  client-side (`lib/prompts/*` + `components/prompt-lab/*`) for use in
  ChatGPT/Gemini/Claude. Any V2 "AI engine" must either stay copy-paste or
  introduce the first backend — a major scope decision (see Risks).

### State management
- React state + `localStorage` only. Keys are program-scoped where it matters
  (`tkm.study.progress.v1` keyed `programId:code`, night-before sessions
  `tkm.nightbefore.session.<prog>:<code>`, Learn CS keys `tkm.learncs.*`,
  prompt favorites/recents, `tkm_program_id`). No sync, no export/import, no
  versioning of user data.

### Content architecture
- Canonical hierarchy in `lib/domain.ts`: Program (ER/CS/CS_AI) → Scheme
  (2024) → Semester (s3–s8) → Subject → Module → Topic(slot). Stable ids:
  `subjectId`, `moduleId`, `topicId`.
- Catalog: 259 subjects (ER 38 + CS 108 + CS_AI 113) in `lib/content.ts` +
  generated `lib/syllabusData.ts` (imported idempotently from committed JSONs
  in `data/syllabus/` via `scripts/import-syllabus.mjs`; ER reference text in
  `docs/syllabus-reference.txt`).
- Written notes: `lib/notes/*.ts` registry keyed `programId-code` — **28
  subjects (~11%: ~27 ER + 1 CS_AI)**, the rest render "not written yet".
- Module model (`lib/types.ts`): 7 fixed core sections + optional
  intuition/workedExamples/comparisons/selfCheck/crossLinks. **Topic-level
  structure exists only as an id slot; there is no authored topic tree.**
- Validators: `npm test` (vitest), `validate:content`, `validate:syllabus`
  (`scripts/verify-data.js`).

### Prompt architecture (current)
- 11 `StudyPrompt` objects (`lib/prompts/prompts.ts`): learn, active-recall,
  pyq-intelligence, exam-answer, strict-examiner, problem-solver, mock-exam,
  revision, mistake-fixer, score-90-plus, syllabus-complete. Each has
  `variables[]` + `template(vars)`.
- Context (`lib/prompts/context.ts`): `StudyContext` (semester/subject/module/
  topic/question/marks + full `moduleContent`), `buildContextFromParams`,
  `enrichContext`, `generatePromptLabUrl`, per-category instruction builders
  (`getSubjectSpecificInstructions`, evaluation criteria, problem guidance,
  answer structure). `getSubjectCategory` is now name-keyword based and covers
  all branches (fixed this session; 43 prompt tests).
- Prompt Lab UI: search/filter by category, Wizard ("what should I use?"),
  QuickPrompts, favorites, recents, per-module quick actions
  (`MODULE_QUICK_ACTIONS`, `QUESTION_ACTIONS`). Deep-linkable via URL params.
- `lib/learn-cs/ai.ts` holds a separate smaller Learn-with-AI prompt builder.

### Study / mastery / recommendation engines (current)
- `lib/study/`: `progress.ts` (attempt recording), `mastery.ts`
  (deterministic module score: correct +1 / partial +0.5; statuses
  strong/good/needs-practice/weak/not-assessed; subject summary),
  `recommendations.ts` (module ranking by weakness + exam-weight band),
  `priority.ts` (module tiering for `StudyModeSwitcher`), `planner.ts`,
  `nightBefore.ts` (time-boxed revision plan from written content),
  `questionTypes.ts`. All pure/deterministic, program-scoped.
- **No learning-state machine**: no TEACH/RECALL/PRACTICE/EXAM/FIX action
  model, no session object, no mistake log, no spaced repetition (except inside
  Learn CS detail state), no prerequisite graph for TKM subjects, no time-aware
  planning beyond minute budgets.
- Learn CS (`lib/learn-cs/`) is the most "engine-like" subsystem: 30 subjects /
  417 topics, readiness gates, deterministic quizzes, spaced revision
  (1/3/7/14/30), recommendations, progress dashboard — but it is a **separate
  curriculum**, cross-linked to TKM, not the TKM engine.

### PYQ system (current)
- `lib/pyqs.ts` aggregates `examFocus` items from written notes into a
  filterable bank (`/pyqs`, per-subject sections, `/practice` hub). Metadata is
  honest: subject/module/weightage only — **no years, marks, difficulty, or
  topic mapping**. Subjects without written notes have zero PYQs. There is no
  `pyq_topic_mapping`, no frequency analysis, no ACTUAL-vs-generated
  distinction (the pyq-intelligence prompt explicitly tells the AI not to
  invent PYQs — a prompt-level guard, not a data one).

### Subject page (current)
- `app/syllabus/[program]/[semester]/[subject]/page.tsx` (~307 lines):
  breadcrumb/header, **"What do you want to do?" action grid (Practice, PYQs,
  AI Study, Revision) + "Build My Plan"**, mastery bar, module cards +
  `StudyModeSwitcher` (Learn/Exam/Last-Minute/Revision), syllabus-module
  fallback accordions, PYQ list, notes `ModuleAccordion`, `DeepDivePrompt`.
- This is the exact choice-overload pattern the V2 spec targets (§20).

## 2. Existing features — disposition

### KEEP (essential, reuse as-is)
- Canonical identity model (`lib/domain.ts`) + program-scoped storage keys.
- Static content catalog + generated syllabus data + idempotent importer +
  validators/tests (92 passing).
- Deterministic study engines (`mastery`, `priority`, `planner`,
  `nightBefore`, recommendations core).
- Prompt template quality + category-specific builders + anti-hallucination
  guards + prompt regression tests (`tests/prompts.test.ts`).
- Command palette search (`lib/search.ts`), coverage/admin dashboards.
- Theming, AppShell, responsive layout.

### MERGE (fold into the learning loop, not separate destinations)
- Practice hub, PYQ explorer, Revision/night-before, Planner, AI Study page:
  all become **actions inside a subject session** driven by the decision
  engine, not top-level choices. Their engines stay; their pages become
  contextual views.
- The 11 Prompt Lab modes collapse into 5 internal engines
  (TEACH/RECALL/PRACTICE/EXAM/FIX); score-90-plus and syllabus-complete become
  plan shapes, not modes.

### HIDE (keep, remove from primary UX)
- Prompt Lab (already out of primary nav — keep it as Advanced; add an
  explicit Advanced/Settings entry point rather than accidental discovery).
- Typing, Coverage, Admin, Learn CS dashboards: keep reachable, not promoted
  on the learning path. (Learn CS stays a separate track, not the TKM loop.)

### REMOVE (candidates — confirm in RUN 7 after dependents migrate)
- `app/progress/page.tsx` already deleted this session; `components/progress/`
  + `tests/progress.test.ts` + orphaned `trend` icon remnants still exist.
- Duplicate prompt entry points: `DeepDivePrompt`, per-module quick actions,
  `StudyModeSwitcher` mode tabs, Wizard, QuickPrompts — pick ONE contextual
  path per decision-engine outcome.
- `QUICK_PROMPTS`/`WIZARD_QUESTIONS` as user-facing choice UI (their content
  becomes decision-engine rules).
- Learn CS goal/roadmap gamification that competes with the TKM loop (keep
  the catalog + quiz + spaced-repetition primitives).

### REBUILD (keep the capability, new architecture)
- Syllabus: official-only → **sourced + versioned + user-pastable** (RUN 2).
- Prompts: 11 static templates → **Prompt Engine + Context Builder + 5 task
  prompts fed by learning state** (RUN 3).
- Recommendations: module weakness+weight → **decision engine over syllabus
  position, mastery, mistakes, PYQ frequency, prereqs, time** (RUN 4).
- Subject page: action grid → **Continue Learning + next-action + collapsed
  Syllabus/PYQs/Progress** (RUN 5).
- Mastery: attempt-ratio score → **evidence-based 0–6 scale** (RUN 6).
- PYQs: examFocus dump → **topic-mapped bank with ACTUAL/VARIATION/NEW
  distinction** (RUN 6).

## 3. Existing strengths (do not rewrite)
- Program-scoped identity and storage (the shared-code collision problem is
  already solved and tested).
- Pure, tested study math (mastery/recommendations/priority) — extend, don't
  replace.
- Honest empty states ("not written yet", "I don't have verified PYQs") —
  the V2 "never fabricate" rule already has precedent.
- Static-first discipline: every route builds; validators catch data rot.

## 4. Existing problems (mapped to spec concerns)
- **Choice overload**: 8-item primary nav + 4-action subject grid + Plan CTA
  + mode tabs + 11 Prompt Lab modes + wizard. The student always decides.
- **Scattered AI prompts**: 11 modes + `DeepDivePrompt` + Learn-with-AI, three
  entry UIs, no shared task model.
- **Weak learning-state integration**: progress records attempts; nothing
  records *what was taught*, mistakes, sessions, or prerequisites. Prompts
  receive module content but never mastery/mistakes/time.
- **No progression**: recommendations rank modules but there is no
  ASSESS→…→REPEAT loop, no session plan, no "next" pointer.
- **Disconnected systems**: syllabus (official text), notes (11% coverage),
  PYQs (derived from notes), mastery (attempts), planner (minute budgets) —
  pairwise linked at best; no topic spine joins them.
- **Topic gap**: modules have no authored topic lists, so topic-level PYQ
  mapping, TEACH progression, and mastery 0–6 have nothing to attach to until
  RUN 2 creates the structure (parsed, not fabricated).
- **Prompt context limits**: full module content is inlined; learning state is
  absent. Context must become deliberate (RUN 3), not bigger.
- **Coverage skew**: engines assume written notes; 89% of subjects fall back
  to syllabus titles. V2 must work fully from syllabus alone.

## 5. Reuse / modify / hide / merge / remove / new (summary)
- **Reuse**: domain ids, program-scoped storage, study math, prompt builders
  + tests, importer/validators, search, theming/shell.
- **Modify**: recommendations (decision engine), mastery (0–6 evidence),
  subject page (Continue Learning), prompt templates (5 engines).
- **Hide**: Prompt Lab → Advanced; Typing/Coverage/Admin/Learn CS dashboards
  off the learning path.
- **Merge**: Practice/PYQs/Revision/Planner/AI Study pages into session
  actions.
- **Remove** (RUN 7, after migration): progress page remnants, duplicate
  prompt entry UIs, competing gamification.
- **New**: syllabus versions + ingestion pipeline + confirmation UI (RUN 2);
  learning-state/decision/session/mistake abstractions (RUN 4); topic↔PYQ
  mapping (RUN 6).
- **Database**: none exists; V2 data model maps to versioned `localStorage`
  namespaces first (`tkm.v2.*`). A backend is a separate scope decision.
- **Risks**: (1) topic structure must be parsed/matched, never invented —
  ingestion quality gates RUN 2; (2) prompt rewrite must keep the 43
  regression tests green; (3) nav reduction must preserve deep links (many are
  shared/bookmarked); (4) any backend/AI-call scope creep breaks static deploy
  — default to copy-paste prompts unless explicitly rescoped.
