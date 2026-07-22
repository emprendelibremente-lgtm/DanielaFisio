"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText = "Guardando...",
  className = "min-h-12 rounded-full bg-[#0F3D3A] px-5 text-sm font-semibold text-white disabled:opacity-60",
  disabled = false,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button className={className} disabled={disabled || pending} type="submit">
      {pending ? pendingText : children}
    </button>
  );
}
