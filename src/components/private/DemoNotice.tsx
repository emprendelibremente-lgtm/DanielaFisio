import { ShieldAlert } from "lucide-react";
import { controlledUseSafetyNote } from "@/data/privateConfig";

export function DemoNotice() {
  return (
    <div className="mt-4 flex gap-3 rounded-lg border border-[var(--brand)]/35 bg-white px-4 py-3 text-xs leading-5 text-[var(--muted)]">
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-[var(--brand-hover)]" />
      <p>{controlledUseSafetyNote}</p>
    </div>
  );
}
