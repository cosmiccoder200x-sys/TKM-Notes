# TKM Notes V2 — Target Architecture (RUN 1)

Companion to `docs/TKM_V2_AUDIT.md`. Design only — no code changes in RUN 1.

## 1. Guiding equation

```
LESS CHOICE + BETTER CONTEXT + BETTER TEACHING + BETTER FEEDBACK + BETTER PROGRESSION = BETTER LEARNING
```

One question per screen: **"What does the student need to do next?"**

## 2. System map

```
Active Syllabus (versioned, sourced)
      ↓
Learning State (per subject: mastery 0–6, mistakes, sessions, time)
      ↓
Decision Engine → Recommended Action (TEACH / RECALL / PRACTICE / EXAM / FIX)
      ↓
Prompt Engine → Context Builder → Specialized Prompt → copy-paste AI call
      ↓
Student Response (self-graded attempt / quiz / recall check)
      ↓
Mastery Update + Mistake Log → Next Recommendation
```

PYQs attach to the topic spine as ACTUAL questions; the engine derives
patterns/frequency from them and labels everything else VARIATION or NEW.
Nothing is ever fabricated: unmapped content renders honest empty states.

## 3. Module ownership (new vs reused)

| Concern | Reuse (audit §2 KEEP) | New in V2 |
|---|---|---|
| Identity | `lib/domain.ts` ids, program-scoped keys | — |
| Syllabus source | official importer/validators | `lib/syllabus/versions.ts` (source, created/updated, active), `parse.ts` (raw→modules→topics), `match.ts` (notes/PYQ matching), confirm/edit UI |
| Learning state | `lib/study/progress.ts` attempt store | `lib/learning/state.ts` (mastery 0–6, mistakes, sessions, review-due), `decision.ts`, `session.ts` |
| Prompts | category builders, anti-invention guards, 43 tests | `lib/learning/prompts/` — 5 task prompts (TEACH/RECALL/PRACTICE/EXAM/FIX) + `context.ts` builder (syllabus + state + PYQ + time, budgeted) |
| Mastery | `mastery.ts` math as v0 adapter | `lib/learning/mastery.ts` 0–6 evidence scale fed by recall/practice/PYQ/self-check |
| Recommendations | weakness+weight ranker as fallback | `lib/learning/decision.ts` over position, importance, mastery, mistakes, prereqs, revision-due, time |
| PYQ | `lib/pyqs.ts` bank | `pyq_topic_mapping` + frequency/pattern derivation + ACTUAL/VARIATION/NEW labels |
| Subject UX | header, module cards, accordions | Continue-Learning hero + next-action card; Syllabus/PYQs/Progress collapsed |
| Persistence | localStorage namespacing pattern | `tkm.v2.*` versioned namespaces with export/import; no backend in V2 scope |

## 4. Data relationships

```
Subject (programId:code)
 └─ SyllabusVersion [1 active] (source: official|user_pasted|user_edited)
     └─ SyllabusModule (stable moduleCode m1..mn)
         └─ SyllabusTopic (index; parsed, editable)
             ├─ notes match (moduleContent | null — null is fine)
             ├─ PYQ links (ACTUAL only; derived frequency/patterns)
             ├─ MasteryState (0–6 + evidence refs)
             └─ Mistake refs
StudySession (subject, goal, minutes, planned actions, outcome)
LearningEvent (attempt/quiz/recall/revision → mastery delta)
```

Topic rows originate from (a) official syllabus text where topics exist,
(b) user-pasted syllabus parsing, (c) module-title fallback as an
*unexpanded* node — never LLM-invented topics stored as syllabus.

## 5. Decision engine (conceptual)

Input per subject: active syllabus position, per-topic mastery, open
mistakes, PYQ frequency/importance, revision-due items, available minutes.
Output: single `RecommendedAction { kind, topicRef, plan, reason }`.
Rules are ordered and explainable (reason strings like "High exam weight +
low mastery" already exist in `recommendations.ts` and carry over).
`getTopRecommendation` remains the v0 adapter until RUN 4 replaces the call
sites.

## 6. Prompt engine (conceptual)

```
Prompt Engine → Context Builder → Learning State → Task (TEACH/RECALL/PRACTICE/EXAM/FIX) → Specialized Prompt
```

- TEACH implements the ZERO→PRO chain (prereqs → intuition → definition →
  mechanism → theory → formulas → derivation → worked example → guided →
  independent → PYQ → challenge → recall → mastery check), truncated by time
  and current mastery (never re-teach mastered prefixes without reason).
- EXAM implements the exam-prep pack (30-sec idea, definitions, formulas,
  conditions, derivations, numerical blueprint, PYQ intelligence, traps,
  recall, cheat sheet), parameterized by university/scheme/branch/semester/
  subject/module/topic/pattern/mastery/time.
- Context budget: syllabus slice + topic state + open mistakes + top PYQs +
  time. Full module content only for TEACH; EXAM gets formulas + PYQs.
- Failure handling: malformed syllabus → parse-error UI with line hints;
  ambiguous subject → disambiguation list; missing PYQs/notes → honest
  fallback blocks; invalid output → retry with narrower scope. Never
  silent fabrication.

## 7. UX deltas (RUN 5 preview)

- Nav stays minimal (already 8 items; Prompt Lab remains out of primary nav
  under an explicit Advanced entry).
- Subject page: progress bar, Continue Learning CTA, next-action card with
  reason, collapsed Syllabus / PYQs / Progress sections. The "What do you
  want to do?" grid, mode tabs, and duplicate prompt buttons are removed once
  the decision engine covers their outcomes (RUN 7 with dependency migration).
- Session view: goal, minutes, ordered plan (learn→recall→problems→PYQs→
  check), Start; outcome writes LearningEvents.

## 8. Phase gates (from spec §26, adapted)
- RUN 2 syllabus: parsing tests (subject/module/topic detection, ambiguous
  names, malformed input), confirm-screen tests, version/activation tests.
- RUN 3 prompts: 43 existing tests stay green + new task-prompt golden tests
  (no `undefined`, budgeted context, ACTUAL/VARIATION/NEW labels).
- RUN 4 engine: decision fixtures (weak+high-weight → TEACH/PRACTICE; open
  mistake → FIX; due revision → RECALL), session round-trip tests.
- RUN 5 subject UX: Continue Learning resolves on every subject incl.
  no-notes; deep links preserved.
- RUN 6 mastery/PYQ: 0–6 transition tests, mapping tests, no-fabrication
  tests. RUN 7: dead-code/link sweep + full `tsc`/`lint`/`test`/`build`.
