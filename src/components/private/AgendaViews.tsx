"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { Appointment, TreatmentSession } from "@/types/private";
import { WeeklySchedule } from "./WeeklySchedule";
import { StatusBadge } from "./StatusBadge";

const monthLabels = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function currentMonthDays() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  return {
    days: Array.from({ length: days }, (_, index) => {
      const date = new Date(year, month, index + 1);
      return {
        date: formatDate(date),
        day: index + 1,
        weekday: date.toLocaleDateString("es-ES", { weekday: "short" }),
      };
    }),
    title: `${monthLabels[month]} ${year}`,
    today: formatDate(today),
  };
}

function MonthlyAgenda({
  appointments,
  sessions,
}: {
  appointments: Appointment[];
  sessions: TreatmentSession[];
}) {
  const { days, title, today } = useMemo(() => currentMonthDays(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate,
  );
  const selectedSessions = sessions.filter((session) => session.date === selectedDate);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <section className="rounded-lg border border-[var(--line)] bg-white p-4 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <h2 className="text-lg font-semibold capitalize">{title}</h2>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {days.map((day) => {
            const dayAppointments = appointments.filter(
              (appointment) =>
                appointment.date === day.date &&
                appointment.status !== "cancelled",
            );
            const daySessions = sessions.filter((session) => session.date === day.date);
            const isSelected = selectedDate === day.date;

            return (
              <button
                className={`min-h-24 rounded-lg border p-3 text-left transition ${
                  isSelected
                    ? "border-[var(--brand)]/60 bg-[var(--brand)]/14"
                    : "border-[var(--line)] bg-[#FAF8F4]/65 hover:border-[var(--brand)]/40"
                }`}
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                type="button"
              >
                <span className="text-xs font-medium capitalize text-[var(--muted)]">
                  {day.weekday}
                </span>
                <span className="mt-1 block text-xl font-semibold">{day.day}</span>
                <span className="mt-3 flex flex-wrap gap-1 text-[10px] font-semibold text-[#0F3D3A]">
                  {dayAppointments.length ? (
                    <span className="rounded-full bg-[var(--brand)]/18 px-2 py-1">
                      {dayAppointments.length} citas
                    </span>
                  ) : null}
                  {daySessions.length ? (
                    <span className="rounded-full bg-[#F5EFE6] px-2 py-1">
                      {daySessions.length} sesiones
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <aside className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-hover)]">
          Día seleccionado
        </p>
        <h2 className="mt-3 text-xl font-semibold">{selectedDate}</h2>
        <Link
          className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#0F3D3A] px-4 text-sm font-semibold text-white"
          href={`/private/agenda/nueva?date=${selectedDate}&time=09:00`}
        >
          <Plus className="size-4" />
          Crear cita
        </Link>
        <div className="mt-6 grid gap-4">
          <div>
            <h3 className="text-sm font-semibold">Citas</h3>
            <div className="mt-3 grid gap-3">
              {selectedAppointments.length ? (
                selectedAppointments.map((appointment) => (
                  <div
                    className="rounded-lg border border-[var(--line)] bg-[#FAF8F4] p-3 text-sm"
                    key={appointment.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">
                          {appointment.time} · {appointment.patientName}
                        </p>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {appointment.reason || "Cita de fisioterapia"}
                        </p>
                      </div>
                      <StatusBadge status={appointment.status} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[var(--muted)]">Sin citas.</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Sesiones realizadas</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {selectedSessions.length
                ? `${selectedSessions.length} sesiones registradas.`
                : "Sin sesiones registradas."}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function AgendaViews({
  appointments,
  sessions,
}: {
  appointments: Appointment[];
  sessions: TreatmentSession[];
}) {
  const [view, setView] = useState<"extended" | "month" | "week">("week");

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2 rounded-full border border-[var(--line)] bg-white p-1 shadow-[0_14px_34px_rgba(35,40,39,0.025)]">
        {[
          ["week", "Vista semanal"],
          ["extended", "Vista extendida"],
          ["month", "Vista mensual"],
        ].map(([value, label]) => (
          <button
            className={`min-h-10 rounded-full px-4 text-sm font-semibold ${
              view === value
                ? "bg-[#0F3D3A] text-white"
                : "text-[var(--muted)] hover:bg-[#FAF8F4]"
            }`}
            key={value}
            onClick={() => setView(value as typeof view)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {view === "month" ? (
        <MonthlyAgenda appointments={appointments} sessions={sessions} />
      ) : (
        <WeeklySchedule appointments={appointments} mode={view} />
      )}
    </div>
  );
}
