"use client";

import type { PatientStatus } from "@/types/private";

type FilterValue = "all" | PatientStatus;

const filters: { label: string; value: FilterValue }[] = [
  { label: "Todos", value: "all" },
  { label: "Activo", value: "active" },
  { label: "En pausa", value: "paused" },
  { label: "Alta", value: "discharged" },
  { label: "Seguimiento", value: "follow_up" },
];

export function FilterTabs({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => (
        <button
          className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
            value === filter.value
              ? "border-[var(--brand)]/45 bg-[var(--brand)]/20 text-[#0F3D3A]"
              : "border-[var(--line)] bg-white text-[var(--muted)]"
          }`}
          key={filter.value}
          onClick={() => onChange(filter.value)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export type { FilterValue };
