"use client";

import { useMemo, useState } from "react";
import type { Patient } from "@/types/private";
import { EmptyState } from "./EmptyState";
import { FilterTabs, type FilterValue } from "./FilterTabs";
import { PatientCard } from "./PatientCard";
import { SearchInput } from "./SearchInput";

export function PatientsClient({ patients }: { patients: Patient[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<FilterValue>("all");

  const filteredPatients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesStatus = status === "all" || patient.status === status;
      const matchesQuery =
        !normalizedQuery ||
        patient.fullName.toLowerCase().includes(normalizedQuery) ||
        patient.mainInjury.toLowerCase().includes(normalizedQuery) ||
        patient.phone.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [patients, query, status]);

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <SearchInput
          onChange={setQuery}
          placeholder="Buscar por nombre, lesión o teléfono"
          value={query}
        />
        <FilterTabs onChange={setStatus} value={status} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {filteredPatients.length ? (
          filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))
        ) : (
          <div className="lg:col-span-2">
            <EmptyState message="No hay pacientes que coincidan con la búsqueda actual." />
          </div>
        )}
      </div>
    </div>
  );
}
