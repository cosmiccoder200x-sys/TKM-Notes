import { redirect } from "next/navigation";

// Coverage was merged into the Admin data-integrity dashboard — no longer a
// separate navigation destination. Existing links keep working via this redirect.
export default function CoveragePage() {
  redirect("/admin");
}