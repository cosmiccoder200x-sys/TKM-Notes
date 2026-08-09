# TKM S3–S8 Interactive Notes

Exam-focused, subject-wise interactive study workspace for TKM College of Engineering (EC Engineering, 2024 scheme), S3–S8. One job only: help you score full marks. No chatbots, no trackers, no fluff.

---

## How to Use This Website Effectively

### The 30-second version

> Open TKM Notes → pick your semester → pick a subject → open a module → study the sections → use Prompt Lab with AI → revise → score.

### Step-by-step study workflow

#### 1. Start from the homepage

The homepage is your study dashboard. You'll see:

- **Current Semester** (S3 by default) with all subjects listed
- **Study Tools** — quick links to Prompt Lab, PYQ Focus, Quick Revision, and Mock Exam modes
- **All Semesters** — switch to S3–S8 with one click

Click **"Continue Studying"** to jump straight to the current semester, or **"Browse Subjects"** to explore.

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
| **Exam Focus** | Real KTU-style questions, tagged **HIGH PRIORITY** / **IMPORTANT** / Low | This is the most important tab before an exam |
| **Self-Check** | Tap-to-reveal questions to test yourself | Final check — if you can answer these, you're ready |
| **Revision** | Ultra-short one-page night-before-the-exam bullets | Last day before the exam, go through these |

#### 5. Use Prompt Lab for AI-powered study

Prompt Lab is the most powerful feature. Access it from:
- The **Study Tools** section on the homepage
- The **Learn / Practice / Exam / Revise** buttons on any module
- The **"Open Prompt Lab"** CTA card on the homepage
- The navigation bar

Prompt Lab generates copy-ready prompts for any AI (Claude, ChatGPT, Gemini, etc.) that are **context-aware** — they know which subject, module, and topic you're studying. Study modes include:

| Mode | What it does |
|---|---|
| **Learn** | Explains a topic from scratch, step by step |
| **Active Recall** | Generates questions for you to answer from memory |
| **Exam Answer** | Writes a model answer for a specific question + mark allocation |
| **Revision** | Creates a compressed revision summary |
| **Problem Solver** | Walks through a numerical/derivation step by step |
| **PYQ Intelligence** | Analyzes previous year question patterns |
| **Mock Exam** | Generates a full mock question paper |

**Pro tip:** Use the module-level buttons (Learn / Practice / Exam / Revise) — they pre-fill the subject and module so you don't have to type anything.

#### 6. Use keyboard search (Ctrl+K / ⌘K)

Press `Ctrl+K` (Windows) or `⌘K` (Mac) anywhere on the site to open the command palette. It searches across:

- Subjects
- Modules
- Definitions
- Concepts
- Formulas
- Exam questions

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
  page.tsx                         → homepage: study dashboard
  error.tsx                        → error boundary
  not-found.tsx                    → 404 page
  loading.tsx                      → homepage skeleton
  [semester]/page.tsx              → subject list for a semester
  [semester]/[subject]/page.tsx    → subject workspace with module accordion
  prompt-lab/page.tsx              → AI study prompt builder
  layout.tsx, globals.css          → dark theme shell, fonts

components/
  Header.tsx                       → sticky header with nav + search
  MobileNav.tsx                    → bottom tab bar (mobile)
  ModuleAccordion.tsx              → one-module-at-a-time accordion
  ModuleView.tsx                   → renders all section tabs for a module
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

lib/
  types.ts                         → content data model
  content.ts                       → semester + subject metadata (S3–S8)
  branch.ts                        → branch identity + subject categories
  search.ts                        → search logic
  notes/                           → ONE FILE PER SUBJECT (content data)
    index.ts                       → registry: subject code → content
  prompts/                         → AI prompt system
    prompts.ts                     → prompt definitions
    context.ts                     → context-aware URL generation
    types.ts, utils.ts             → prompt types and utilities

docs/
  syllabus-reference.txt           → KTU syllabus source of truth
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
4. Register it in `lib/notes/index.ts`:
   ```ts
   import myNewSubject from "./my-new-subject";
   const registry = {
     "24ERP304": dsa,
     "24XXXXXX": myNewSubject,   // ← add this line
   };
   ```
5. That's it — the subject page, search, and "coming soon" badge all update automatically.

Subjects with no entry in the registry show a friendly "not written yet" state instead of breaking.

## Adding a diagram

Diagrams are inline SVG, not uploaded images — keeps the site fast and avoids image hosting.
Add a new function + registry entry in `components/Diagrams.tsx`, then reference its key from any module's `diagrams` array.

## Running locally / deploying

- **Local preview:** `npm install` then `npm run dev` → open `http://localhost:3000`
- **Production build:** `npm run build` — generates 49 static pages
- **Deploy:** push to GitHub → Vercel auto-deploys. No config needed.

## Prompt Lab

Every subject page has context-aware AI study tools. The Prompt Lab system:

- Lives in `lib/prompts/` — prompt definitions are separate from UI
- Generates copy-ready prompts that include the exact subject, module, topic, and question context
- Supports 7 study modes (Learn, Active Recall, Exam Answer, Revision, Problem Solver, PYQ Intelligence, Mock Exam)
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

- ✅ **All 7 S3 subjects — fully written** (Advanced Linear Algebra/Complex Analysis/PDE, Network Theory, Digital Electronics & Logic Design, Data Structures and Algorithms, Sensor & Sensor Circuits, Life Skills and Professional Ethics, System Simulation & VI Lab)
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

---

<p align="center">
  <a href="https://github.com/cosmiccoder200x-sys">
    <img src="https://img.shields.io/badge/GitHub-cosmiccoder200x--sys-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile" />
  </a>
</p>

