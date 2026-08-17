import type { Metadata } from "next";
import { PRODUCT_NAME } from "@/lib/branch";
import TodaysRevision from "@/components/revision/TodaysRevision";

export const metadata: Metadata = {
  title: `Revision — ${PRODUCT_NAME}`,
  description:
    "Today's revision queue built from your actual practice, self-checks and revision activity. Review weak modules and spaced-due topics.",
};

export default function RevisionPage() {
  return <TodaysRevision />;
}