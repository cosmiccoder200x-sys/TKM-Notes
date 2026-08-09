import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/Header";
import MasteryMap from "@/components/mastery/MasteryMap";
import { subjects, findSubject } from "@/lib/content";

export function generateStaticParams() {
  return subjects.map((s) => ({ semester: s.semesterId, subject: s.slug }));
}

export async function generateMetadata({ params }: { params: { semester: string; subject: string } }): Promise<Metadata> {
  const subject = findSubject(params.semester, params.subject);
  return {
    title: subject ? `${subject.name} — Mastery` : "Subject Mastery",
  };
}

export default function MasteryPage({ params }: { params: { semester: string; subject: string } }) {
  const subject = findSubject(params.semester, params.subject);
  if (!subject) notFound();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <MasteryMap
          subjectCode={subject.code}
          subjectName={subject.name}
          subjectSlug={subject.slug}
          semesterId={subject.semesterId}
        />
      </main>
    </>
  );
}
