import { Weightage } from "@/lib/types";
import PriorityLabel from "@/components/PriorityLabel";

// Subtle priority indicator. Replaced the 3-bar meter with a clean label
// so priority reads at a glance without visual noise (design system rule #12).
export default function WeightMeter({ level }: { level: Weightage }) {
  return <PriorityLabel level={level} />;
}
