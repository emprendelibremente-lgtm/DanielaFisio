"use client";

import { useActionState, useState } from "react";
import type { Patient } from "@/types/private";
import {
  createAppointmentState,
  createPatientAndAppointmentState,
} from "@/lib/private/actions";
import { initialActionState } from "@/lib/private/actionState";
import { PatientSelect } from "./PatientSelect";
import { SubmitButton } from "./SubmitButton";

function AppointmentFields({
  defaultDate,
  defaultTime,
}: {
  defaultDate?: string;
  defaultTime?: string;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium">
          Fecha
          <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={defaultDate} name="date" required type="date" />
        </label>
        <label className="text-sm font-medium">
          Hora
          <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={defaultTime} name="time" required type="time" />
        </label>
        <label className="text-sm font-medium">
          Duración
          <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue={60} min={15} name="durationMinutes" type="number" />
        </label>
      </div>
      <label className="text-sm font-medium">
        Estado
        <select className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" defaultValue="confirmed" name="appointmentStatus">
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="completed">Completada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </label>
      <label className="text-sm font-medium">
        Motivo
        <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4" name="reason" />
      </label>
      <label className="text-sm font-medium">
        Notas de la cita
        <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[var(--line)] bg-[#FAF8F4] px-4 py-3" name="appointmentNotes" />
      </label>
    </>
  );
}

function StateMessage({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {message}
    </p>
  );
}

export function NewAppointmentForm({
  patients,
  defaultPatientId,
  defaultDate,
  defaultTime,
}: {
  patients: Patient[];
  defaultDate?: string;
  defaultPatientId?: string;
  defaultTime?: string;
}) {
  const [mode, setMode] = useState<"existing" | "new">(
    defaultPatientId ? "existing" : "existing",
  );
  const [existingState, existingAction] = useActionState(
    createAppointmentState,
    initialActionState,
  );
  const [newState, newAction] = useActionState(
    createPatientAndAppointmentState,
    initialActionState,
  );

  return (
    <div className="mt-6">
      <div className="mb-6 grid gap-2 rounded-full border border-[var(--line)] bg-[#FAF8F4] p-1 sm:grid-cols-2">
        <button
          className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
            mode === "existing"
              ? "bg-white text-[#0F3D3A] shadow-sm"
              : "text-[var(--muted)]"
          }`}
          onClick={() => setMode("existing")}
          type="button"
        >
          Paciente existente
        </button>
        <button
          className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
            mode === "new"
              ? "bg-white text-[#0F3D3A] shadow-sm"
              : "text-[var(--muted)]"
          }`}
          onClick={() => setMode("new")}
          type="button"
        >
          Paciente nuevo
        </button>
      </div>

      {mode === "existing" ? (
        <form action={existingAction} className="grid gap-4">
          <StateMessage message={existingState.message} />
          <label className="text-sm font-medium">
            Paciente
            <PatientSelect defaultValue={defaultPatientId} patients={patients} />
          </label>
          <AppointmentFields defaultDate={defaultDate} defaultTime={defaultTime} />
          <SubmitButton>Guardar cita</SubmitButton>
        </form>
      ) : (
        <form action={newAction} className="grid gap-4">
          <StateMessage message={newState.message} />
          <div className="rounded-lg border border-[var(--line)] bg-[#FAF8F4] p-4">
            <h3 className="font-semibold">Datos mínimos del paciente</h3>
            <div className="mt-4 grid gap-4">
              <label className="text-sm font-medium">
                Nombre completo
                <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4" name="fullName" required />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Teléfono
                  <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4" name="phone" />
                </label>
                <label className="text-sm font-medium">
                  Edad
                  <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4" min={0} name="age" type="number" />
                </label>
              </div>
              <input name="patientStatus" type="hidden" value="active" />
              <label className="text-sm font-medium">
                Lesión principal
                <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4" name="mainInjury" />
              </label>
              <label className="text-sm font-medium">
                Referido por
                <input className="mt-2 min-h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4" name="referredBy" />
              </label>
              <label className="text-sm font-medium">
                Notas del paciente
                <textarea className="mt-2 min-h-20 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3" name="notes" />
              </label>
            </div>
          </div>
          <AppointmentFields defaultDate={defaultDate} defaultTime={defaultTime} />
          <SubmitButton>Crear paciente y agendar cita</SubmitButton>
        </form>
      )}
    </div>
  );
}
