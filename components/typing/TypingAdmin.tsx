"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadOverrides,
  setPublished,
  loadCustomSentences,
  addCustomSentence,
  updateCustomSentence,
  deleteSentenceById,
  restoreSentence,
  loadEdits,
  saveEdit,
  removeEdit,
  loadDeletedIds,
} from "@/lib/typing/storage";
import { getSeedSentences, TYPING_CATEGORIES, TYPING_DIFFICULTIES } from "@/lib/typing/catalog";
import { TypingSentence } from "@/lib/typing/types";

interface AdminRow {
  sentence: TypingSentence;
  kind: "seed" | "custom";
  edited: boolean;
  deleted: boolean;
  published: boolean;
}

function emptyForm(): TypingSentence {
  return {
    id: "",
    sentence: "",
    category: "csfundamentals",
    difficulty: "beginner",
    subject: "",
    topic: "",
  };
}

export default function TypingAdmin() {
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [form, setForm] = useState<TypingSentence>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  function refresh() {
    const overrides = loadOverrides();
    const custom = loadCustomSentences();
    const edits = loadEdits();
    const deleted = loadDeletedIds();

    const byId = new Map<string, AdminRow>();
    for (const s of getSeedSentences()) {
      byId.set(s.id, {
        sentence: s,
        kind: "seed",
        edited: false,
        deleted: deleted.includes(s.id),
        published: overrides[s.id] !== false,
      });
    }
    for (const s of custom) {
      byId.set(s.id, {
        sentence: s,
        kind: "custom",
        edited: false,
        deleted: deleted.includes(s.id),
        published: overrides[s.id] !== false,
      });
    }
    for (const [id, edit] of Object.entries(edits)) {
      const existing = byId.get(id);
      if (existing) {
        existing.sentence = { ...existing.sentence, ...edit };
        existing.edited = true;
      }
    }

    const list = [...byId.values()].sort((a, b) =>
      a.sentence.category.localeCompare(b.sentence.category)
    );
    setRows(list);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = useMemo(
    () => rows.filter((r) => (showDeleted ? true : !r.deleted)),
    [rows, showDeleted]
  );

  function addSentence() {
    const sentence = form.sentence.trim();
    if (!sentence) return;
    addCustomSentence({
      ...form,
      sentence,
      id: `custom-${Date.now()}`,
      subject: form.subject || undefined,
      topic: form.topic || undefined,
    });
    setForm(emptyForm());
    refresh();
  }

  function updateRow(id: string, patch: Partial<TypingSentence>) {
    const row = rows.find((r) => r.sentence.id === id);
    if (!row) return;
    const updated = { ...row.sentence, ...patch };
    if (row.kind === "custom") {
      updateCustomSentence(updated);
    } else {
      saveEdit(id, updated);
    }
    refresh();
  }

  function togglePublished(id: string, current: boolean) {
    setPublished(id, !current);
    refresh();
  }

  function remove(id: string) {
    deleteSentenceById(id);
    setEditingId(null);
    refresh();
  }

  function restore(id: string) {
    restoreSentence(id);
    refresh();
  }

  function renderEditable(row: AdminRow) {
    const s = row.sentence;
    if (editingId !== s.id) {
      return (
        <div className="flex-1 min-w-[16rem]">
          <p className="text-sm text-ink-hi leading-snug">{s.sentence}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="chip">{s.category}</span>
            <span className="chip">{s.difficulty}</span>
            {s.subject && <span className="chip">{s.subject}</span>}
            {s.topic && <span className="chip">{s.topic}</span>}
            {row.kind === "seed" && (
              <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                curated
              </span>
            )}
            {row.kind === "custom" && (
              <span className="font-mono text-[9px] uppercase tracking-wider text-signal">
                yours
              </span>
            )}
            {row.edited && (
              <span className="font-mono text-[9px] uppercase tracking-wider text-signal">
                edited
              </span>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 min-w-[16rem] space-y-2">
        <textarea
          value={s.sentence}
          onChange={(e) => updateRow(s.id, { sentence: e.target.value })}
          className="w-full bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
          rows={2}
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={s.category}
            onChange={(e) => updateRow(s.id, { category: e.target.value as TypingSentence["category"] })}
            className="bg-bg-surface border border-bg-border rounded-lg px-2 py-1.5 text-xs text-ink-hi"
          >
            {TYPING_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={s.difficulty}
            onChange={(e) => updateRow(s.id, { difficulty: e.target.value as TypingSentence["difficulty"] })}
            className="bg-bg-surface border border-bg-border rounded-lg px-2 py-1.5 text-xs text-ink-hi"
          >
            {TYPING_DIFFICULTIES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
          <input
            value={s.subject ?? ""}
            onChange={(e) => updateRow(s.id, { subject: e.target.value || undefined })}
            placeholder="Subject"
            className="bg-bg-surface border border-bg-border rounded-lg px-2 py-1.5 text-xs text-ink-hi w-28"
          />
          <input
            value={s.topic ?? ""}
            onChange={(e) => updateRow(s.id, { topic: e.target.value || undefined })}
            placeholder="Topic"
            className="bg-bg-surface border border-bg-border rounded-lg px-2 py-1.5 text-xs text-ink-hi w-28"
          />
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-ink-hi">Sentence Manager</h1>
        <p className="text-sm text-ink-lo mt-1">
          Add, edit, hide, or remove typing sentences. Changes are stored on this device.
        </p>
      </div>

      <div className="card px-5 py-5 mb-8">
        <div className="eyebrow mb-3">Add a sentence</div>
        <textarea
          value={form.sentence}
          onChange={(e) => setForm({ ...form, sentence: e.target.value })}
          placeholder="Type a sentence students will practice typing…"
          className="w-full bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
          rows={2}
        />
        <div className="flex flex-wrap gap-2 mt-3">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as TypingSentence["category"] })}
            className="bg-bg-surface border border-bg-border rounded-lg px-2 py-1.5 text-xs text-ink-hi"
          >
            {TYPING_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value as TypingSentence["difficulty"] })}
            className="bg-bg-surface border border-bg-border rounded-lg px-2 py-1.5 text-xs text-ink-hi"
          >
            {TYPING_DIFFICULTIES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
          <input
            value={form.subject ?? ""}
            onChange={(e) => setForm({ ...form, subject: e.target.value || undefined })}
            placeholder="Subject"
            className="bg-bg-surface border border-bg-border rounded-lg px-2 py-1.5 text-xs text-ink-hi w-28"
          />
          <input
            value={form.topic ?? ""}
            onChange={(e) => setForm({ ...form, topic: e.target.value || undefined })}
            placeholder="Topic"
            className="bg-bg-surface border border-bg-border rounded-lg px-2 py-1.5 text-xs text-ink-hi w-28"
          />
          <button
            type="button"
            onClick={addSentence}
            disabled={!form.sentence.trim()}
            className="font-mono text-[10px] uppercase tracking-wider px-3 py-2 rounded-md bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add sentence
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="eyebrow">All sentences ({visible.length})</div>
        <label className="flex items-center gap-2 text-xs text-ink-lo">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
          />
          Show removed
        </label>
      </div>

      <div className="space-y-2">
        {visible.map((row) => (
          <div key={row.sentence.id} className="card px-4 py-3 flex flex-wrap items-start gap-3">
            {renderEditable(row)}
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={() => togglePublished(row.sentence.id, row.published)}
                className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-md border transition-colors ${
                  row.published
                    ? "border-signal/40 text-signal hover:bg-signal/10"
                    : "border-bg-border text-ink-faint hover:border-ink-lo"
                }`}
              >
                {row.published ? "Visible" : "Hidden"}
              </button>
              <button
                type="button"
                onClick={() => setEditingId(editingId === row.sentence.id ? null : row.sentence.id)}
                className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-md border border-bg-border text-ink-lo hover:border-signal/40 hover:text-signal transition-colors"
              >
                {editingId === row.sentence.id ? "Done" : "Edit"}
              </button>
              {row.edited && (
                <button
                  type="button"
                  onClick={() => {
                    removeEdit(row.sentence.id);
                    refresh();
                  }}
                  className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-md border border-bg-border text-ink-lo hover:border-signal/40 hover:text-signal transition-colors"
                >
                  Revert
                </button>
              )}
              {row.deleted ? (
                <button
                  type="button"
                  onClick={() => restore(row.sentence.id)}
                  className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-md border border-signal/40 text-signal hover:bg-signal/10 transition-colors"
                >
                  Restore
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => remove(row.sentence.id)}
                  className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-md border border-critical/40 text-critical hover:bg-critical/10 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
