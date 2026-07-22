"use client";

import { useMemo, useState } from "react";
import type { Appointment } from "@/types/private";
import { scheduleHours } from "@/data/privateConfig";
import { StatusBadge } from "./StatusBadge";

const dayLabels = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const dayShortLabels = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCurrentWorkWeek() {
  const today = new Date();
  const day = today.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() + mondayOffset);

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return {
      date: formatDate(date),
      label: dayLabels[date.getDay()],
      short: dayShortLabels[date.getDay()],
    };
  });
}

function getAppointmentForSlot(
  appointments: Appointment[],
  date: string,
  hour: string,
) {
  const hourPrefix = hour.split(":")[0].padStart(2, "0");
  return appointments.find(
    (appointment) =>
      appointment.date === date && appointment.time.startsWith(hourPrefix),
  );
}

const appointmentStyles = {
  pending: "border-[#C8BEB0] bg-[#F5EFE6]",
  confirmed: "border-[var(--brand)]/40 bg-[var(--brand)]/16",
  completed: "border-emerald-200 bg-emerald-50",
  cancelled: "border-rose-200 bg-rose-50 opacity-75",
};

function AppointmentBlock({ appointment }: { appointment: Appointment }) {
  return (
    <div className={`rounded-md border p-3 ${appointmentStyles[appointment.status]}`}>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-[#0F3D3A]">
          {appointment.time} · {appointment.durationMinutes} min
        </p>
        <p className="text-sm font-semibold">{appointment.patientName}</p>
        <p className="text-xs leading-5 text-[var(--muted)]">
          {appointment.reason}
        </p>
        <StatusBadge status={appointment.status} />
      </div>
    </div>
  );
}

export function WeeklySchedule({ appointments }: { appointments: Appointment[] }) {
  const scheduleDays = useMemo(() => getCurrentWorkWeek(), []);
  const [selectedDate, setSelectedDate] = useState(() => scheduleDays[0].date);

  const selectedDay =
    scheduleDays.find((day) => day.date === selectedDate) || scheduleDays[0];
  const mobileSlots = useMemo(
    () =>
      scheduleHours.map((hour) => ({
        hour,
        appointment: getAppointmentForSlot(appointments, selectedDay.date, hour),
      })),
    [appointments, selectedDay.date],
  );

  return (
    <div className="grid gap-6">
      <div className="hidden overflow-x-auto lg:block">
        <div className="min-w-[1040px] rounded-lg border border-[var(--line)] bg-white shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
          <div className="grid grid-cols-[84px_repeat(6,1fr)] border-b border-[var(--line)]">
            <div className="p-3 text-xs font-semibold text-[var(--muted)]">
              Hora
            </div>
            {scheduleDays.map((day) => (
              <div className="border-l border-[var(--line)] p-3" key={day.date}>
                <p className="text-sm font-semibold">{day.label}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{day.date}</p>
              </div>
            ))}
          </div>
          {scheduleHours.map((hour) => (
            <div
              className="grid min-h-24 grid-cols-[84px_repeat(6,1fr)] border-b border-[var(--line)] last:border-b-0"
              key={hour}
            >
              <div className="p-3 text-xs font-semibold text-[var(--muted)]">
                {hour}
              </div>
              {scheduleDays.map((day) => {
                const appointment = getAppointmentForSlot(
                  appointments,
                  day.date,
                  hour,
                );
                return (
                  <div className="border-l border-[var(--line)] p-2" key={day.date}>
                    {appointment ? (
                      <AppointmentBlock appointment={appointment} />
                    ) : (
                      <div className="flex h-full min-h-16 items-center justify-center rounded-md border border-dashed border-[var(--line)] bg-[#FAF8F4]/60 text-xs text-[var(--soft)]">
                        Libre
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {scheduleDays.map((day) => (
            <button
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold ${
                selectedDate === day.date
                  ? "border-[var(--brand)]/45 bg-[var(--brand)]/20 text-[#0F3D3A]"
                  : "border-[var(--line)] bg-white text-[var(--muted)]"
              }`}
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              type="button"
            >
              {day.short}
            </button>
          ))}
        </div>

        <section className="rounded-lg border border-[var(--line)] bg-white p-4">
          <h2 className="text-lg font-semibold">{selectedDay.label}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{selectedDay.date}</p>
          <div className="mt-5 grid gap-3">
            {mobileSlots.map(({ hour, appointment }) => (
              <div
                className="grid grid-cols-[64px_1fr] gap-3 border-t border-[var(--line)] pt-3"
                key={hour}
              >
                <p className="text-xs font-semibold text-[var(--muted)]">
                  {hour}
                </p>
                {appointment ? (
                  <AppointmentBlock appointment={appointment} />
                ) : (
                  <div className="rounded-md border border-dashed border-[var(--line)] bg-[#FAF8F4]/70 px-3 py-4 text-xs text-[var(--soft)]">
                    Libre
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
