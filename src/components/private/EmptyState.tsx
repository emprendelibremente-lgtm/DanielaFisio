import { Inbox } from "lucide-react";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--line)] bg-white/70 p-8 text-center">
      <Inbox className="mx-auto size-7 text-[var(--brand-hover)]" />
      <p className="mt-3 text-sm text-[var(--muted)]">{message}</p>
    </div>
  );
}
