"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import { semesters, subjectsForSemester } from "@/lib/content";
import { Subject } from "@/lib/types";
import { PRODUCT_NAME, BRANCH_NAME } from "@/lib/branch";
import { NavIcon } from "@/components/navigation/navItems";
import SubjectCard from "@/components/SubjectCard";
import SearchBar from "@/components/SearchBar";

export default function SemesterPage({
  params,
}: {
  params: { semester: string };
}) {
  const pathname = usePathname();
  const [semesterId, setSemesterId] = useState(params.semester);
  const [search, setSearch] = useState("");

  const semester = semesters.find((s) => s.id === semesterId);
  if (!semester) notFound();

  const allSubjects = subjectsForSemester(semesterId);
  const filteredSubjects = allSubjects.filter((s: Subject) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  function pickSemester(id: string) {
    setSemesterId(id);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* My Library Header */}
      <div className="mb-8">
        <div className="mb-2">
          <span className="font-display font-bold text-3xl text-ink-hi">My Library</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-ink-lo text-sm">TKM · {BRANCH_NAME}</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={semesterId}
              onChange={(e) => pickSemester(e.target.value)}
              className="bg-bg-surface border border-bg-border rounded-lg px-4 py-2 text-sm font-mono text-ink-hi focus:border-signal focus:outline-none appearance-none pr-8"
            >
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id.toUpperCase()}
                </option>
              ))}
            </select>
            <Link
              href="/profile"
              className="font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-lg border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
            >
              EDIT PROFILE
            </Link>
          </div>
        </div>

        {/* Search bar with count */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search subjects..."
              showCount={filteredSubjects.length}
            />
          </div>
        </div>
      </div>

      {/* Subject Grid - 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSubjects.map((subject) => (
          <SubjectCard key={subject.code} subject={subject} />
        ))}
      </div>
    </main>
  );
}