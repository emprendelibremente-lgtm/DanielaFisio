"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { Appointment } from "@/types/private";
import { scheduleHours } from "@/data/privateConfig";
import { StatusBadge } from "./StatusBadge";

const dayLabels = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const dayShortLabels = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const monthShortLabels = [
  "ene.",
  "feb.",
  "mar.",
  "abr.",
  "may.",
  "jun.",
  "jul.",
  "ago.",
  "sept.",
  "oct.",
  "nov.",
  "dic.",
];

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
      dayNumber: date.getDate(),
      displayDate: `${date.getDate()} ${monthShortLabels[date.getMonth()]}`,
      label: dayLabels[date.getDay()],
      short: dayShortLabels[date.getDay()],
    };
  });
}

function getExtendedDays() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(today);
  const daysUntilNextSaturday = ((6 - today.getDay() + 7) % 7) + 7;
  end.setDate(today.getDate() + daysUntilNextSaturday);
  const totalDays =
    Math.round((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    return {
      date: formatDate(date),
      dayNumber: date.getDate(),
      displayDate: `${date.getDate()} ${monthShortLabels[date.getMonth()]}`,
      label: dayLabels[date.getDay()],
      short: dayShortLabels[date.getDay()],
    };
  });
}

function todayKey() {
  return formatDate(new Date());
}

function getAppointmentForSlot(
  appointments: Appointment[],
  date: string,
  hour: string,
) {
  const hourPrefix = hour.split(":")[0].padStart(2, "0");
  return appointments.find(
    (appointment) =>
      appointment.date === date &&
      appointment.status !== "cancelled" &&
      appointment.time.startsWith(hourPrefix),
  );
}

function formatTimeQuery(hour: string) {
  const [hourValue, minuteValue = "00"] = hour.split(":");
  return `${hourValue.padStart(2, "0")}:${minuteValue.padStart(2, "0")}`;
}

function newAppointmentHref(date: string, hour: string) {
  return `/private/agenda/nueva?date=${date}&time=${formatTimeQuery(hour)}`;
}

const appointmentStyles = {
  pending: "border-[#C8BEB0]/70 bg-[#F5EFE6]/78",
  confirmed: "border-[var(--brand)]/40 bg-[var(--brand)]/14",
  completed: "border-emerald-100 bg-emerald-50/70",
  cancelled: "border-rose-100 bg-rose-50/60 opacity-75",
};

function AppointmentBlock({ appointment }: { appointment: Appointment }) {
  return (
    <div
      className={`h-full rounded-md border p-3 shadow-[0_10px_24px_rgba(35,40,39,0.025)] ${appointmentStyles[appointment.status]}`}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F3D3A]">
          {appointment.time} · {appointment.durationMinutes} min
        </p>
        <p className="text-sm font-semibold leading-5 text-[var(--text)]">
          {appointment.patientName}
        </p>
        {appointment.reason ? (
          <p className="line-clamp-2 text-xs leading-5 text-[var(--muted)]">
            {appointment.reason}
          </p>
        ) : null}
        <div>
          <StatusBadge status={appointment.status} />
        </div>
      </div>
    </div>
  );
}

function FreeSlotButton({
  date,
  hour,
  label,
  mobile,
}: {
  date: string;
  hour: string;
  label: string;
  mobile?: boolean;
}) {
  return (
    <Link
      aria-label={label}
      className={
        mobile
          ? "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-[var(--brand)]/45 bg-white px-3 text-xs font-semibold text-[#0F3D3A] shadow-sm transition hover:border-[var(--brand-hover)] hover:bg-[var(--brand)]/18"
          : "inline-flex size-8 items-center justify-center rounded-full border border-[var(--brand)]/35 bg-white/90 text-[#0F3D3A] opacity-25 shadow-sm transition hover:border-[var(--brand-hover)] hover:bg-[var(--brand)]/18 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
      }
      href={newAppointmentHref(date, hour)}
      title="Crear cita"
    >
      <Plus className="size-4" />
      {mobile ? <span>Agendar</span> : null}
    </Link>
  );
}

export function WeeklySchedule({
  appointments,
  mode = "week",
}: {
  appointments: Appointment[];
  mode?: "extended" | "week";
}) {
  const scheduleDays = useMemo(
    () => (mode === "extended" ? getExtendedDays() : getCurrentWorkWeek()),
    [mode],
  );
  const today = todayKey();
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
        <div className="min-w-[980px] overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
          <div
            className="sticky top-0 z-10 grid border-b border-[var(--line)] bg-white/95 backdrop-blur"
            style={{
              gridTemplateColumns: `68px repeat(${scheduleDays.length}, minmax(130px, 1fr))`,
            }}
          >
            <div className="px-3 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Hora
            </div>
            {scheduleDays.map((day) => {
              const isToday = day.date === today;

              return (
              <div
                className={`border-l border-[var(--line)] px-3 py-4 ${
                  isToday ? "bg-[var(--brand)]/12" : ""
                }`}
                key={day.date}
              >
                <p className="text-sm font-semibold text-[var(--text)]">
                  {day.label}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {day.displayDate}
                </p>
                {isToday ? (
                  <div className="mt-2 h-0.5 w-10 rounded-full bg-[var(--brand-hover)]" />
                ) : null}
              </div>
              );
            })}
          </div>
          {scheduleHours.map((hour) => (
            <div
              className="grid min-h-20 border-b border-[var(--line)] last:border-b-0"
              key={hour}
              style={{
                gridTemplateColumns: `68px repeat(${scheduleDays.length}, minmax(130px, 1fr))`,
              }}
            >
              <div className="px-3 py-3 text-[11px] font-medium text-[var(--muted)]">
                {hour}
              </div>
              {scheduleDays.map((day) => {
                const appointment = getAppointmentForSlot(
                  appointments,
                  day.date,
                  hour,
                );
                const slotLabel = `Agendar cita el ${day.label.toLowerCase()} ${day.dayNumber} a las ${formatTimeQuery(hour)}`;

                return (
                  <div
                    className="border-l border-[var(--line)] p-1.5"
                    key={day.date}
                  >
                    {appointment ? (
                      <AppointmentBlock appointment={appointment} />
                    ) : (
                      <div className="group relative flex h-full min-h-16 items-center justify-center rounded-md border border-dashed border-[var(--line)]/75 bg-[#FAF8F4]/45 transition hover:border-[var(--brand)]/55 hover:bg-[var(--brand)]/8">
                        <span className="absolute left-2 top-2 text-[10px] font-medium text-[var(--soft)] opacity-0 transition group-hover:opacity-70">
                          Agendar
                        </span>
                        <FreeSlotButton
                          date={day.date}
                          hour={hour}
                          label={slotLabel}
                        />
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
          {scheduleDays.map((day) => {
            const isSelected = selectedDate === day.date;
            const isToday = day.date === today;

            return (
            <button
              className={`min-h-12 shrink-0 rounded-full border px-4 text-sm font-semibold ${
                isSelected
                  ? "border-[var(--brand)]/55 bg-[var(--brand)]/20 text-[#0F3D3A]"
                  : isToday
                    ? "border-[var(--brand)]/35 bg-white text-[#0F3D3A]"
                    : "border-[var(--line)] bg-white text-[var(--muted)]"
              }`}
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              type="button"
            >
              {day.short} {day.dayNumber}
            </button>
            );
          })}
        </div>

        <section className="rounded-lg border border-[var(--line)] bg-white p-4 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">{selectedDay.label}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {selectedDay.displayDate}
              </p>
            </div>
            {selectedDay.date === today ? (
              <span className="rounded-full border border-[var(--brand)]/40 bg-[var(--brand)]/14 px-3 py-1 text-xs font-semibold text-[#0F3D3A]">
                Hoy
              </span>
            ) : null}
          </div>
          <div className="mt-5 grid gap-2">
            {mobileSlots.map(({ hour, appointment }) => (
              <div
                className="grid grid-cols-[54px_1fr] gap-3 border-t border-[var(--line)] pt-3"
                key={hour}
              >
                <p className="pt-3 text-xs font-medium text-[var(--muted)]">
                  {hour}
                </p>
                {appointment ? (
                  <AppointmentBlock appointment={appointment} />
                ) : (
                  <div className="flex min-h-14 items-center justify-between gap-3 rounded-md border border-dashed border-[var(--line)]/80 bg-[#FAF8F4]/65 px-3 py-2 text-xs text-[var(--soft)]">
                    <span className="text-[11px]">Disponible</span>
                    <FreeSlotButton
                      date={selectedDay.date}
                      hour={hour}
                      label={`Agendar cita el ${selectedDay.label.toLowerCase()} ${selectedDay.dayNumber} a las ${formatTimeQuery(hour)}`}
                      mobile
                    />
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
