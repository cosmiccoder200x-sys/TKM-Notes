import type { Metadata } from "next";
import { getQuestionBank } from "@/lib/pyqs";
import { PRODUCT_NAME } from "@/lib/branch";
import PyqsExplorer from "@/components/pyqs/PyqsExplorer";

export const metadata: Metadata = {
  title: `PYQ Bank — ${PRODUCT_NAME}`,
  description:
    "Filterable previous-year question bank built from TKM Notes exam-focused content. Browse by semester, subject, and question weightage.",
};

export default function PyqsPage() {
  const bank = getQuestionBank();
  return <PyqsExplorer entries={bank} />;
}