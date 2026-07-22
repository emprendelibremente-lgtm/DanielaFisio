"use client";

import { useActionState } from "react";
import { createPatientState } from "@/lib/private/actions";
import { initialActionState } from "@/lib/private/actionState";
import { SubmitButton } from "./SubmitButton";

export function NewPatientForm() {
  const [state, formAction] = useActionState(
    createPatientState,
    initialActionState,
  );

  return (
    <form action={formAction} className="mt-6 grid gap-4">
      {state.message ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.message}
        </p>
      ) : null}
      <label className="text-sm font-medium">
        Nombre completo
        <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="fullName" required />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Teléfono
          <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="phone" />
        </label>
        <label className="text-sm font-medium">
          Edad
          <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" min="0" name="age" type="number" />
        </label>
      </div>
      <label className="text-sm font-medium">
        Lesión principal
        <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="mainInjury" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Estado
          <select className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="status">
            <option value="active">Activo</option>
            <option value="paused">En pausa</option>
            <option value="follow_up">Seguimiento</option>
            <option value="discharged">Alta</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Fecha de inicio
          <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="startDate" type="date" />
        </label>
      </div>
      <label className="text-sm font-medium">
        Derivado por
        <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="referredBy" />
      </label>
      <label className="text-sm font-medium">
        Notas
        <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 py-3" name="notes" />
      </label>
      <SubmitButton pendingText="Creando...">Crear paciente</SubmitButton>
    </form>
  );
}
