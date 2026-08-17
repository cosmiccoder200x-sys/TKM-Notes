# TKM Notes

**Your AI exam preparation system.** Study less. Prioritize better.

AI exam preparation workspace for TKM College of Engineering (EC Engineering, 2024 scheme), S3–S8. **TKM Notes ranks every topic by real exam weightage** and turns your available time into a prioritized, reason-backed study plan. Prompt Lab supplies the AI prompts — find the best prompt for whatever you need to do, copy it, and use it with ChatGPT, Gemini, Claude or any AI. Exam-focused notes are the verified context that makes everything specific. One job only: help you score full marks. No chatbots, no trackers, no fluff.

---

## How to Use This Website Effectively

### The 30-second version

> Open TKM Notes → answer "what should I study now?" → get a prioritized plan with reasons → open the modules in order → practice the HIGH PRIORITY questions → revise → score.

### Step-by-step study workflow

#### 1. Start from the homepage

The homepage is your study dashboard. You'll see:

- **Hero planner** — pick a subject + time, hit **Generate My Plan** for an instant prioritized plan
- **My Preparation** — overall mastery %, weak areas, and how many hours it'll take to close them
- **Current Semester** (S3 by default) with all subjects listed
- **Study Tools** — quick links to Prompt Lab modes and Night-Before revision
- **All Semesters** — switch to S3–S8 with one click

#### 2. Open a subject

Each subject card shows:
- Subject code (e.g. `24ERJ303`)
- Full name
- Number of modules available
- Category tag (Computer / Electronics / Mathematics / Core)

Click any subject to open its study workspace.

#### 3. Navigate modules with the accordion

Modules are shown **one at a time** in an accordion layout. Module 01 opens by default. Click any other module header to switch to it. Each open module shows:

- **Learn / Practice / Exam / Revise** buttons at the top — these take you to Prompt Lab pre-loaded with that module's context
- **Section tabs** to navigate the module's content

#### 4. Use the 9 section tabs inside each module

Every module has up to 9 sections. Work through them in this order for best results:

| Tab | What it's for | When to use it |
|---|---|---|
| **Overview** | 2-minute summary + why it matters in exams + intuition analogy | First pass — understand the big picture |
| **Concepts** | Bullet-point core ideas in exam wording | After overview — build the mental framework |
| **Definitions** | Must-memorize terms, exam-ready format | Write these down — they come up in 2-mark questions |
| **Diagrams** | Visual explanations (some interactive with sliders) | Study alongside concepts — visuals stick better |
| **Formulas** | Copy-friendly, monospace formula sheet | Keep this tab open during numerical practice |
| **Practice** | Step-by-step worked examples (reveal one step at a time) | Try to predict each step before revealing it |
| **Compare** | Side-by-side cards for confusing pairs (Mealy vs Moore, etc.) | Use when you keep mixing up two similar concepts |
| **Exam Focus** | Real KTU-style questions, tagged **HIGH PRIORITY** / **IMPORTANT** / Low, grouped by question type | This is the most important tab before an exam |
| **Self-Check** | Tap-to-reveal questions to test yourself | Final check — if you can answer these, you're ready |
| **Revision** | Ultra-short one-page night-before-the-exam bullets | Last day before the exam, go through these |

#### 4b. Study Planner (the core TKM Notes feature)

- **Priority system** — every module shows a **Must Learn / Core / Support** badge. Click it for *why*: real exam weightage, module position, and high-priority question counts. Never a guess.
- **AI Study Planner** (`/planner` or "Generate My Plan" anywhere) — pick a subject, tick the modules, choose time available and how far along you are. TKM Notes returns a time-boxed plan: what to learn, which HIGH PRIORITY questions to practice, what to revise, and honest reasons for each step — based on verified syllabus data plus your own mastery marks.
- **Study Modes** — on every subject page: **Learn / Exam / Last-Minute / Revision**. Each mode re-curates the module list for that goal (Last-Minute shows only modules the paper actually rewards).
- **Exam Focus grouping** — questions are grouped by answer type (Explain, Derive, Calculate, Compare, Design…) so you spot the pattern before the exam.

#### 5. Use Prompt Lab for AI-powered study

Prompt Lab is a library of copy-ready prompts for any AI (Claude, ChatGPT, Gemini, etc.). Every prompt works standalone: open a prompt, copy it, paste it into your AI. No subject, module or notes required. Add your notes as **optional context** (via semester → subject → module → topic) to make responses more specific.

Access it from:
- **Prompt Lab** section at the top of the homepage
- **Study Tools** section on the homepage
- **Learn / Practice / Exam / Revise** buttons on any module (auto-fills context)
- The navigation bar

Study prompts include:

| Category | Prompt | What it does |
|---|---|---|
| LEARN | **Learn** | Explains a topic from scratch, step by step |
| LEARN | **Active Recall** | Tests what you remember with one question at a time |
| PRACTICE | **Problem Solver** | Builds problem-solving ability with guided hints |
| PRACTICE | **Mistake Fixer** | Finds the exact error in a wrong answer |
| EXAM | **PYQ Intelligence** | Analyzes previous year question patterns |
| EXAM | **Exam Answer** | Writes a marks-focused model answer for a question |
| EXAM | **Mock Exam** | Generates a full mock question paper |
| EXAM | **Score 90+** | Builds a day-by-day marks-maximization strategy |
| REVISION | **Revision** | Creates a compressed, time-boxed revision plan |
| ANALYZE | **Strict Examiner** | Evaluates your answer like a university examiner |

**Pro tip:** Use the module-level buttons (Learn / Practice / Exam / Revise) — they pre-fill the subject and module as optional context so the prompt is already tailored.

#### 6. Use keyboard search (Ctrl+K / ⌘K)

Press `Ctrl+K` (Windows) or `⌘K` (Mac) anywhere on the site to open the command palette. It searches across:

- Subjects
- Modules
- Definitions
- Concepts
- Formulas
- Exam questions
- Revision bullets
- Worked examples
- Self-check questions
- Comparison cards
- Intuition analogies

Type a keyword like "flip flop" or "Thevenin" and jump directly to the relevant module.

#### 7. Exam-week strategy

If you have limited time, follow this priority order for each subject:

1. **Exam Focus tab** — study all HIGH PRIORITY questions first
2. **Definitions tab** — memorize terms (easy marks)
3. **Formulas tab** — have the formula sheet ready
4. **Revision tab** — speed-read the bullets
5. **Prompt Lab → Exam Answer mode** — generate model answers for questions you're unsure about

### On mobile

- Use the **bottom navigation bar** (Home / Subjects / Prompt Lab / Search)
- All content is responsive — no pinch-zoom needed
- Search works from the bottom nav too

---

## Project structure

```
app/
  page.tsx                         → homepage: study dashboard + quick planner
  error.tsx                        → error boundary
  not-found.tsx                    → 404 page
  loading.tsx                      → homepage skeleton
  planner/page.tsx                 → AI study planner ("what should I study now?")
  syllabus/page.tsx                → branch-aware syllabus index
  syllabus/[program]/page.tsx      → branch hub (er / cse / cse-ai)
  syllabus/[program]/[semester]/page.tsx → subject grid for a branch+semester
  syllabus/[program]/[semester]/[subject]/page.tsx → subject workspace + module accordion
  syllabus/[program]/[semester]/[subject]/mastery/page.tsx → mastery map
  coverage/page.tsx                → per-branch notes/PYQ/module coverage dashboard
  admin/page.tsx                   → data-integrity overview
  [semester]/page.tsx              → legacy ER route (redirects to /syllabus/er/<sem>)
  prompt-lab/page.tsx              → AI study prompt builder
  layout.tsx, globals.css          → dark theme shell, fonts

components/
  Header.tsx                       → sticky header with nav + search
  MobileNav.tsx                    → bottom tab bar (mobile)
  ModuleAccordion.tsx              → one-module-at-a-time accordion (hash-aware deep links)
  ModuleView.tsx                   → renders all section tabs for a module (question-type groups)
  ModulePriorityBadge.tsx          → Must Learn / Core / Support badge with "why" reasons
  StudyModeSwitcher.tsx            → Learn / Exam / Last-Minute / Revision modes
  SemesterExplorer.tsx             → semester tab selector + subject grid
  StudyTools.tsx                   → study tool cards
  SubjectCard.tsx                  → subject card with code, name, modules
  CommandPalette.tsx               → Ctrl+K search modal
  PaletteButton.tsx                → search trigger button
  WeightMeter.tsx                  → exam-frequency indicator (low/med/high)
  Diagrams.tsx                     → named inline-SVG diagrams
  InteractiveDiagrams.tsx          → draggable-slider diagrams
  DeepDivePrompt.tsx               → AI deep-dive prompt generator
  WorkedExampleCard.tsx            → step-reveal practice problems
  ComparisonCard.tsx               → side-by-side concept comparisons
  SelfCheck.tsx                    → tap-to-reveal self-check questions
  prompt-lab/                      → Prompt Lab UI components
  planner/                         → Study Planner UI components
  mastery/                         → mastery map + preparation dashboard components

lib/
  types.ts                         → content data model
  content.ts                       → 259 subjects (ER 38 + CSE 108 + CSE [AI] 113), S3–S8
  syllabusData.ts                  → AUTO-GENERATED CSE/CSE[AI] syllabus from KTU 2024 JSON
  urls.ts                          → branch-aware URL helpers (subjectUrl, masteryUrl, …)
  branch.ts                        → product identity + branch + subject categories
  search.ts                        → search logic (all content types)
  notes/                           → ONE FILE PER SUBJECT (content data)
    index.ts                       → registry: programId-subjectCode → content
  study/                           → exam-preparation engine (pure, deterministic)
    priority.ts                    → topic priority + study-time estimates
    questionTypes.ts               → exam-question grouping by answer type
    planner.ts                     → AI study plan generator
    nightBefore.ts                 → night-before revision plan generator
    mastery.ts, progress.ts        → mastery scoring + localStorage progress
    recommendations.ts             → "what should I study next"
  prompts/                         → AI prompt system
    prompts.ts                     → prompt definitions
    context.ts                     → context-aware URL generation
    types.ts, utils.ts             → prompt types and utilities

docs/
  syllabus-reference.txt           → KTU syllabus source of truth (ER branch)
```

## Every module always has exactly 7 core sections

`Module` in `lib/types.ts` enforces this — there is no way to add a module without all 7:

1. `overview` — 2-minute summary + why it matters in exams
2. `coreConcepts` — bullet points, exam wording
3. `definitions` — must-memorize, card format
4. `diagrams` — references a named SVG in `components/Diagrams.tsx`
5. `formulas` — copy-friendly, monospace
6. `examFocus` — real KTU-style questions tagged HIGH PRIORITY / IMPORTANT / Low
7. `revisionNotes` — one-page, night-before-the-exam format

Plus optional sections: `intuition`, `workedExamples`, `comparisons`, `selfCheck`, `crossLinks`.

## Adding a new subject's notes

1. Open `docs/syllabus-reference.txt`, find the subject's module breakdown.
2. Copy `lib/notes/data-structures-and-algorithms.ts` as a template.
3. Fill in all 7 sections per module, save as `lib/notes/<subject-slug>.ts`.
4. Register it in `lib/notes/index.ts` under its program's list (keyed `${programId}-${subjectCode}`):
   ```ts
   import myNewSubject from "./my-new-subject";
   // erNotes.push({ content: myNewSubject, programId: "ER" });  // for an ER subject
   ```
5. That's it — the subject page, search, and "coming soon" badge all update automatically.

Subjects with no entry in the registry show a friendly "not written yet" state instead of breaking.

## Adding a diagram

Diagrams are inline SVG, not uploaded images — keeps the site fast and avoids image hosting.
Add a new function + registry entry in `components/Diagrams.tsx`, then reference its key from any module's `diagrams` array.

## Running locally / deploying

- **Local preview:** `npm install` then `npm run dev` → open `http://localhost:3000`
- **Production build:** `npm run build` — generates 1083 static pages
- **Deploy:** push to GitHub → Vercel auto-deploys. No config needed.

## Prompt Lab

Every subject page has context-aware AI study tools. The Prompt Lab system:

- Lives in `lib/prompts/` — prompt definitions are separate from UI
- Is a library of 10 copy-ready prompts that work standalone with any AI (no subject or module required)
- Injects the exact subject, module, topic, and question context when provided as optional context
- Can be accessed from module-level buttons, subject-level AI actions, or the dedicated `/prompt-lab` page

## Understanding features

Every module across all 7 S3 subjects also has, where it genuinely applies:

- **Intuition** — one "think of it like..." analogy for the module's hardest idea
- **Worked Examples** — step-revealed numerical/derivation walkthroughs: see the problem, tap to reveal one step at a time
- **Comparison Cards** — side-by-side "why this and not that" cards for near-twin concepts
- **Self-Check Questions** — tap-to-reveal questions at the end of each module
- **Cross-Links** — "this idea also appears in..." links between subjects
- **Interactive Diagrams** — live sliders for R/L/C that redraw the actual curve in real time

These are all optional fields on `Module` — a module renders fine with just the 7 core sections.

## Current content status

- ✅ **All 7 S3 subjects (ER) — fully written** (Advanced Linear Algebra/Complex Analysis/PDE, Network Theory, Digital Electronics & Logic Design, Data Structures and Algorithms, Sensor & Sensor Circuits, Life Skills and Professional Ethics, System Simulation & VI Lab)
- ✅ **Full branch-aware syllabus** — CSE (108) + CSE [AI] (113) subjects imported from the official KTU 2024 JSON; `/syllabus/{er,cse,cse-ai}`, `/coverage`, `/admin`
- ✅ **Branch-isolated progress/search/notes** — subjects are keyed by programId + subject code so branches never mix
- ✅ **Legacy `/s3/...` routes** — redirect to their canonical branch URLs
- ✅ **Topic priority system** — Must Learn / Core / Support badges with reasons, everywhere modules are listed
- ✅ **AI Study Planner** — prioritized, reason-backed study plans from verified syllabus data + your mastery marks
- ✅ **Study Modes** — Learn / Exam / Last-Minute / Revision on every subject page
- ✅ **Exam Focus grouping** — questions grouped by answer type
- ✅ **My Preparation dashboard** — mastery %, weak areas, hours to close the gap
- ✅ **Prompt Lab** — context-aware AI study modes across all subjects
- ✅ **AI deep-dive prompt** — live on every subject page, syllabus-accurate for 29/38 subjects
- ✅ **Module accordion** — one module at a time, focused study
- ✅ **Exam focus badges** — HIGH PRIORITY / IMPORTANT labels on exam questions
- ✅ **Error/loading states** — 404 page, error boundary, loading skeletons
- ⬜ S4–S8 written notes — next

## Tech stack

- **Next.js 14** (App Router, static generation)
- **React 18**
- **TypeScript**
- **Tailwind CSS 3**
- **No database** — content lives as typed TypeScript data files
- **No external APIs** — AI prompts are generated client-side for copy-paste

## Upgrading to a database later (optional)

If you ever want live multi-device admin editing:
1. Create a free Neon or Vercel Postgres database.
2. Add Prisma, paste in the connection string as a Vercel environment variable.
3. Convert `lib/notes/*.ts` into seed data for a `modules` table.
4. Admin panel writes to the DB via Next.js API routes.

## Regenerating the syllabus data

CSE and CSE [AI] subjects come from the official KTU 2024 JSON via `scripts/import-syllabus.mjs`:

- `node scripts/import-syllabus.mjs [path-to-json]` — idempotent; regenerates `lib/syllabusData.ts`
- `node scripts/verify-data.js` — P0 acceptance checks (counts, collisions, slug sanity); exit 0 = all pass

---

<p align="center">
  <a href="https://github.com/cosmiccoder200x-sys">
    <img src="https://img.shields.io/badge/GitHub-cosmiccoder200x--sys-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile" />
  </a>
</p>

