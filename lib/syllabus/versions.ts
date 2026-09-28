import { getSubjectContent } from "@/lib/notes";
import { syllabusModulesFor } from "@/lib/content";
import { subjectId as domainSubjectId } from "@/lib/domain";
import type { ProgramId } from "@/lib/types";
import type { SyllabusModule, SyllabusVersion } from "./types";

const STORAGE_KEY = "tkm.v2.syllabus.v1";

type Store = Record<string, SyllabusVersion[]>;

function safeRead(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Store;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function safeWrite(store: Store) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // storage unavailable — degrade silently
  }
}

export function syllabusSubjectKey(programId: ProgramId, subjectCode: string): string {
  return domainSubjectId(programId, subjectCode);
}

function newId(): string {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

export function listVersions(programId: ProgramId, subjectCode: string): SyllabusVersion[] {
  const all = safeRead()[syllabusSubjectKey(programId, subjectCode)] ?? [];
  return [...all].sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getActiveVersion(programId: ProgramId, subjectCode: string): SyllabusVersion | null {
  return listVersions(programId, subjectCode).find((v) => v.active) ?? null;
}

export function saveVersion(input: {
  programId: ProgramId;
  subjectCode: string;
  source: SyllabusVersion["source"];
  modules: SyllabusModule[];
  activate?: boolean;
}): SyllabusVersion {
  const store = safeRead();
  const key = syllabusSubjectKey(input.programId, input.subjectCode);
  const now = Date.now();
  const version: SyllabusVersion = {
    id: newId(),
    subjectKey: key,
    programId: input.programId,
    subjectCode: input.subjectCode,
    source: input.source,
    createdAt: now,
    updatedAt: now,
    active: input.activate ?? true,
    modules: input.modules.map((m, i) => ({
      ...m,
      moduleCode: m.moduleCode || `m${m.number || i + 1}`,
      topics: m.topics.map((t, j) => ({ ...t, index: j })),
    })),
  };
  const existing = store[key] ?? [];
  const next = version.active ? existing.map((v) => ({ ...v, active: false })) : existing;
  store[key] = [version, ...next];
  safeWrite(store);
  return version;
}

export function activateVersion(programId: ProgramId, subjectCode: string, id: string): SyllabusVersion | null {
  const store = safeRead();
  const key = syllabusSubjectKey(programId, subjectCode);
  const versions = store[key] ?? [];
  if (!versions.some((v) => v.id === id)) return null;
  const now = Date.now();
  store[key] = versions.map((v) => (v.id === id ? { ...v, active: true, updatedAt: now } : { ...v, active: false }));
  safeWrite(store);
  return store[key].find((v) => v.id === id) ?? null;
}

export function deleteVersion(programId: ProgramId, subjectCode: string, id: string): boolean {
  const store = safeRead();
  const key = syllabusSubjectKey(programId, subjectCode);
  const versions = store[key] ?? [];
  if (!versions.some((v) => v.id === id)) return false;
  store[key] = versions.filter((v) => v.id !== id);
  safeWrite(store);
  return true;
}

export function buildOfficialVersion(programId: ProgramId, subjectCode: string): SyllabusVersion {
  const key = syllabusSubjectKey(programId, subjectCode);
  const written = getSubjectContent(subjectCode, programId);
  const official = syllabusModulesFor(programId, subjectCode);
  const modules: SyllabusModule[] =
    official.length > 0
      ? official.map((m) => {
          const noteTitle = written?.modules.find((w) => w.id === m.id)?.title;
          return {
            moduleCode: m.id,
            number: m.number,
            title: noteTitle ?? m.title,
            topics: [],
            content: m.content,
            unexpanded: true,
          };
        })
      : (written?.modules ?? []).map((w, i) => ({
          moduleCode: w.id,
          number: i + 1,
          title: w.title,
          topics: [],
          unexpanded: true,
        }));
  return {
    id: "official",
    subjectKey: key,
    programId,
    subjectCode,
    source: "official",
    createdAt: 0,
    updatedAt: 0,
    active: true,
    modules,
  };
}

export function getEffectiveVersion(programId: ProgramId, subjectCode: string): SyllabusVersion {
  return getActiveVersion(programId, subjectCode) ?? buildOfficialVersion(programId, subjectCode);
}

export function getEffectiveModules(programId: ProgramId, subjectCode: string): SyllabusModule[] {
  return getEffectiveVersion(programId, subjectCode).modules;
}
