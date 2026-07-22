export function ProgressBar({ value }: { value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#F5EFE6]">
      <div
        className="h-full rounded-full bg-[var(--brand-hover)]"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
