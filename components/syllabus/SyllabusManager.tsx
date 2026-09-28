"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProgramId } from "@/lib/types";
import {
  parseSubjectSyllabus,
  parseFullSyllabus,
  matchSyllabus,
  listVersions,
  getEffectiveVersion,
  saveVersion,
  activateVersion,
  deleteVersion,
} from "@/lib/syllabus";
import type { ParsedSyllabus, SegmentedSyllabus, SyllabusModule, SyllabusVersion } from "@/lib/syllabus";

type View = "official" | "paste" | "preview" | "edit";

const SOURCE_LABEL: Record<SyllabusVersion["source"], string> = {
  official: "Official",
  user_pasted: "Pasted",
  user_edited: "Edited",
};

function emptyModule(number: number): SyllabusModule {
  return { moduleCode: `m${number}`, number, title: `Module ${number}`, topics: [] };
}

export default function SyllabusManager({
  programId,
  subjectCode,
  subjectName,
}: {
  programId: ProgramId;
  subjectCode: string;
  subjectName: string;
}) {
  const [view, setView] = useState<View>("official");
  const [pasteMode, setPasteMode] = useState<"subject" | "full">("subject");
  const [raw, setRaw] = useState("");
  const [segments, setSegments] = useState<SegmentedSyllabus[]>([]);
  const [chosen, setChosen] = useState<ParsedSyllabus | null>(null);
  const [draft, setDraft] = useState<SyllabusModule[]>([]);
  const [versions, setVersions] = useState<SyllabusVersion[]>([]);
  const [effective, setEffective] = useState<SyllabusVersion | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const refresh = () => {
    setVersions(listVersions(programId, subjectCode));
    setEffective(getEffectiveVersion(programId, subjectCode));
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programId, subjectCode]);

  const previewMatches = useMemo(
    () => (chosen ? matchSyllabus(programId, subjectCode, chosen.modules) : null),
    [chosen, programId, subjectCode]
  );

  function handleParse() {
    if (pasteMode === "subject") {
      setSegments([{ guess: null, parsed: parseSubjectSyllabus(raw), raw }]);
      setChosen(parseSubjectSyllabus(raw));
    } else {
      const segs = parseFullSyllabus(raw);
      setSegments(segs);
      const mine =
        segs.find((s) => s.guess?.programId === programId && s.guess?.subjectCode === subjectCode)?.parsed ??
        null;
      setChosen(mine);
    }
    setView("preview");
  }

  function handleUse(source: SyllabusVersion["source"]) {
    if (!chosen || chosen.modules.length === 0) return;
    saveVersion({ programId, subjectCode, source, modules: chosen.modules, activate: true });
    setRaw("");
    setSegments([]);
    setChosen(null);
    setEditingId(null);
    refresh();
    setView("official");
  }

  function handleEditExisting(v: SyllabusVersion) {
    setDraft(v.modules.map((m) => ({ ...m, topics: m.topics.map((t) => ({ ...t })) })));
    setEditingId(v.id);
    setView("edit");
  }

  function handleSaveDraft() {
    const cleaned = draft
      .filter((m) => m.title.trim().length > 0)
      .map((m, i) => ({
        ...m,
        number: i + 1,
        moduleCode: `m${i + 1}`,
        topics: m.topics.filter((t) => t.title.trim().length > 0).map((t, j) => ({ ...t, index: j })),
      }));
    if (cleaned.length === 0) return;
    saveVersion({ programId, subjectCode, source: "user_edited", modules: cleaned, activate: true });
    setDraft([]);
    setEditingId(null);
    refresh();
    setView("official");
  }

  function updateModule(i: number, patch: Partial<SyllabusModule>) {
    setDraft((d) => d.map((m, j) => (j === i ? { ...m, ...patch } : m)));
  }

  function updateTopic(mi: number, ti: number, title: string) {
    setDraft((d) => d.map((m, j) => (j === mi ? { ...m, topics: m.topics.map((t, k) => (k === ti ? { ...t, title } : t)) } : m)));
  }

  function addTopic(mi: number) {
    setDraft((d) =>
      d.map((m, j) => (j === mi ? { ...m, topics: [...m.topics, { index: m.topics.length, title: "" }] } : m))
    );
  }

  function removeTopic(mi: number, ti: number) {
    setDraft((d) => d.map((m, j) => (j === mi ? { ...m, topics: m.topics.filter((_, k) => k !== ti) } : m)));
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-1 border-b border-bg-border pb-5">
        <span className="eyebrow">Syllabus source</span>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-hi tracking-tight">{subjectName}</h1>
        <p className="text-sm text-ink-lo">
          {subjectCode} · Active source:{" "}
          <span className="text-ink-hi font-medium">{effective ? SOURCE_LABEL[effective.source] : "…"}</span>
          {effective && effective.source !== "official" && (
            <span className="text-ink-faint"> · updated {new Date(effective.updatedAt).toLocaleDateString()}</span>
          )}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {(["official", "paste"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            aria-pressed={view === v || (v === "official" && (view === "edit" || view === "preview"))}
            className={`font-mono text-xs px-3.5 py-2 rounded-card border transition-colors ${
              view === v ? "border-signal text-signal bg-signal/10" : "border-bg-border text-ink-lo hover:text-ink-hi"
            }`}
          >
            {v === "official" ? "Active syllabus" : "Paste syllabus"}
          </button>
        ))}
      </div>

      {view === "official" && effective && (
        <section className="space-y-3">
          <div className="card p-5 space-y-2">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <span className="font-display font-semibold text-base text-ink-hi">
                {effective.modules.length} modules ·{" "}
                {effective.modules.reduce((n, m) => n + m.topics.length, 0)} topics
              </span>
              <span className="chip">{SOURCE_LABEL[effective.source]}</span>
            </div>
            {effective.modules.length > 0 ? (
              <ol className="space-y-1.5">
                {effective.modules.map((m) => (
                  <li key={m.moduleCode} className="flex items-baseline gap-2 text-sm">
                    <span className="font-mono text-[10px] text-ink-faint shrink-0">M{m.number}</span>
                    <span className="text-ink-hi truncate">{m.title}</span>
                    <span className="font-mono text-[10px] text-ink-faint shrink-0 ml-auto">
                      {m.topics.length > 0 ? `${m.topics.length} topics` : m.unexpanded ? "official text" : "no topics"}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-ink-lo">No module breakdown available for this subject yet. Paste one to activate it.</p>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setView("paste")}
                className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
              >
                Paste syllabus
              </button>
              {effective.source !== "official" && (
                <button
                  onClick={() => handleEditExisting(effective)}
                  className="font-mono text-[11px] uppercase tracking-wide px-3.5 py-2 rounded-card border border-bg-border text-ink-hi hover:border-signal/60 transition-colors"
                >
                  Edit active
                </button>
              )}
            </div>
          </div>

          {versions.length > 0 && (
            <div className="space-y-2">
              <h2 className="font-display font-semibold text-base text-ink-hi">Saved versions</h2>
              {versions.map((v) => (
                <div key={v.id} className="card px-4 py-3 flex items-center gap-3 flex-wrap">
                  <span className="chip shrink-0">{SOURCE_LABEL[v.source]}</span>
                  <span className="text-sm text-ink-hi">
                    {v.modules.length} modules · {v.modules.reduce((n, m) => n + m.topics.length, 0)} topics
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">{new Date(v.updatedAt).toLocaleString()}</span>
                  <span className="ml-auto flex gap-2">
                    {!v.active && (
                      <button
                        onClick={() => {
                          activateVersion(programId, subjectCode, v.id);
                          refresh();
                        }}
                        className="font-mono text-[11px] text-signal hover:underline"
                      >
                        Activate
                      </button>
                    )}
                    {v.active && <span className="font-mono text-[11px] text-signal">Active</span>}
                    <button
                      onClick={() => handleEditExisting(v)}
                      className="font-mono text-[11px] text-ink-lo hover:text-ink-hi"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteVersion(programId, subjectCode, v.id);
                        refresh();
                      }}
                      className="font-mono text-[11px] text-ink-faint hover:text-critical"
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {view === "paste" && (
        <section className="card p-5 space-y-3">
          <div className="flex gap-2">
            {(["subject", "full"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setPasteMode(m)}
                aria-pressed={pasteMode === m}
                className={`font-mono text-xs px-3.5 py-2 rounded-card border transition-colors ${
                  pasteMode === m ? "border-signal text-signal bg-signal/10" : "border-bg-border text-ink-lo"
                }`}
              >
                {m === "subject" ? "Subject syllabus" : "Full syllabus"}
              </button>
            ))}
          </div>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={10}
            placeholder={
              pasteMode === "subject"
                ? "Module 1: Title\nTopic one\nTopic two\n\nModule 2: Title\n…"
                : "Paste the full semester syllabus — subject codes or names mark each subject."
            }
            className="w-full bg-bg-raised border border-bg-border rounded-card px-4 py-3 text-sm text-ink-hi focus:border-signal focus:outline-none font-mono"
          />
          <button
            onClick={handleParse}
            disabled={raw.trim().length < 10}
            className="font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-40"
          >
            Parse syllabus
          </button>
        </section>
      )}

      {view === "preview" && (
        <section className="space-y-3">
          {pasteMode === "full" && segments.length > 1 && (
            <div className="card p-4 space-y-2">
              <h2 className="font-display font-semibold text-sm text-ink-hi">Detected subjects</h2>
              {segments.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm flex-wrap">
                  <span className="text-ink-hi">
                    {s.guess ? `${s.guess.subjectCode} — ${s.guess.subjectName}` : "Unidentified segment"}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">
                    {s.parsed.modules.length} modules · {s.parsed.modules.reduce((n, m) => n + m.topics.length, 0)} topics
                  </span>
                  {s.guess?.programId === programId && s.guess?.subjectCode === subjectCode ? (
                    <span className="chip shrink-0">this subject</span>
                  ) : (
                    <button
                      onClick={() => setChosen(s.parsed)}
                      className="font-mono text-[11px] text-signal hover:underline"
                    >
                      Use this segment
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          {chosen ? (
            <div className="card p-5 space-y-3">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <span className="font-display font-semibold text-base text-ink-hi">Syllabus detected</span>
                {previewMatches && (
                  <span className="font-mono text-[11px] text-ink-lo">
                    {previewMatches.modulesTotal} modules · {previewMatches.topicsTotal} topics · PYQ matches:{" "}
                    {previewMatches.pyqTotal} · Notes matches: {previewMatches.modulesWithNotes}
                  </span>
                )}
              </div>
              {chosen.warnings.length > 0 && (
                <ul className="space-y-1">
                  {chosen.warnings.map((w, i) => (
                    <li key={i} className="text-xs text-ink-lo">⚠ {w}</li>
                  ))}
                </ul>
              )}
              <ol className="space-y-2">
                {chosen.modules.map((m) => (
                  <li key={m.moduleCode} className="border-t border-bg-border/40 pt-2">
                    <div className="text-sm text-ink-hi font-medium">
                      <span className="font-mono text-[10px] text-ink-faint mr-2">M{m.number}</span>
                      {m.title}
                    </div>
                    {m.topics.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {m.topics.slice(0, 6).map((t) => (
                          <li key={t.index} className="text-xs text-ink-lo pl-8 truncate">
                            {t.title}
                          </li>
                        ))}
                        {m.topics.length > 6 && (
                          <li className="text-xs text-ink-faint pl-8">+{m.topics.length - 6} more</li>
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
              {chosen.modules.length === 0 && (
                <p className="text-sm text-ink-lo">Nothing parseable. Check the module headers and try again — nothing was saved.</p>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setDraft(chosen.modules.map((m) => ({ ...m, topics: m.topics.map((t) => ({ ...t })) })));
                    setEditingId(null);
                    setView("edit");
                  }}
                  disabled={chosen.modules.length === 0}
                  className="font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal/60 transition-colors disabled:opacity-40"
                >
                  Review & edit
                </button>
                <button
                  onClick={() => handleUse("user_pasted")}
                  disabled={chosen.modules.length === 0}
                  className="font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-40"
                >
                  Use this syllabus
                </button>
              </div>
            </div>
          ) : (
            <div className="card p-5">
              <p className="text-sm text-ink-lo">
                No segment matches {subjectCode}. Pick a segment above to adopt it for this subject, or paste a
                subject-specific syllabus instead.
              </p>
            </div>
          )}
        </section>
      )}

      {view === "edit" && (
        <section className="space-y-3">
          {draft.map((m, mi) => (
            <div key={mi} className="card p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-ink-faint shrink-0">M{mi + 1}</span>
                <input
                  value={m.title}
                  onChange={(e) => updateModule(mi, { title: e.target.value })}
                  className="flex-1 min-w-0 bg-bg-raised border border-bg-border rounded px-3 py-1.5 text-sm text-ink-hi focus:border-signal focus:outline-none"
                />
                <button
                  onClick={() => setDraft((d) => d.filter((_, j) => j !== mi))}
                  className="font-mono text-[11px] text-ink-faint hover:text-critical shrink-0"
                >
                  Remove
                </button>
              </div>
              {m.topics.map((t, ti) => (
                <div key={ti} className="flex items-center gap-2 pl-8">
                  <input
                    value={t.title}
                    onChange={(e) => updateTopic(mi, ti, e.target.value)}
                    placeholder="Topic title"
                    className="flex-1 min-w-0 bg-bg-raised border border-bg-border rounded px-3 py-1.5 text-xs text-ink-hi focus:border-signal focus:outline-none"
                  />
                  <button
                    onClick={() => removeTopic(mi, ti)}
                    className="font-mono text-[11px] text-ink-faint hover:text-critical shrink-0"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button onClick={() => addTopic(mi)} className="font-mono text-[11px] text-signal hover:underline pl-8">
                + Add topic
              </button>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDraft((d) => [...d, emptyModule(d.length + 1)])}
              className="font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card border border-bg-border text-ink-hi hover:border-signal/60 transition-colors"
            >
              + Add module
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={draft.length === 0}
              className="font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-40"
            >
              {editingId ? "Save as new version & activate" : "Use this syllabus"}
            </button>
            <button
              onClick={() => {
                setDraft([]);
                setEditingId(null);
                setView("official");
              }}
              className="font-mono text-[11px] uppercase tracking-wide px-4 py-2.5 rounded-card text-ink-lo hover:text-ink-hi transition-colors"
            >
              Cancel
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
