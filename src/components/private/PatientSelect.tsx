"use client";

import { useMemo, useState } from "react";
import type { Patient } from "@/types/private";

export function PatientSelect({
  patients,
  defaultValue,
}: {
  patients: Patient[];
  defaultValue?: string;
}) {
  const selectedPatient = patients.find((patient) => patient.id === defaultValue);
  const [query, setQuery] = useState(selectedPatient?.fullName ?? "");
  const filteredPatients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return patients;
    }

    return patients.filter(
      (patient) =>
        patient.fullName.toLowerCase().includes(normalizedQuery) ||
        patient.mainInjury.toLowerCase().includes(normalizedQuery) ||
        patient.phone.toLowerCase().includes(normalizedQuery),
    );
  }, [patients, query]);

  return (
    <div className="mt-2 grid gap-2">
      <input
        className="min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar por nombre, lesión o teléfono"
        type="search"
        value={query}
      />
      <select
        className="min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4"
        defaultValue={defaultValue ?? ""}
        name="patientId"
        required
      >
        <option value="" disabled>
          Seleccionar paciente
        </option>
        {filteredPatients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.fullName}
          </option>
        ))}
      </select>
      {!filteredPatients.length ? (
        <p className="text-xs text-[var(--muted)]">
          No hay pacientes que coincidan con esa búsqueda.
        </p>
      ) : null}
    </div>
  );
}
