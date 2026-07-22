import type { Metadata } from "next";
import {
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  ClipboardList,
  ClipboardPlus,
  UserPlus,
  TicketCheck,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { AppointmentCard } from "@/components/private/AppointmentCard";
import { EmptyState } from "@/components/private/EmptyState";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { QuickActionCard } from "@/components/private/QuickActionCard";
import { StatCard } from "@/components/private/StatCard";
import { StatusBadge } from "@/components/private/StatusBadge";
import { getAppointments } from "@/lib/private/appointments";
import { isAppointmentPastOrNow } from "@/lib/private/dateFormat";
import { getPatients } from "@/lib/private/patients";
import { getSessionPackages } from "@/lib/private/packages";
import { getTreatmentSessions } from "@/lib/private/sessions";

export const metadata: Metadata = {
  title: "Vista general privada",
};

function todayInMadrid() {
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Europe/Madrid",
    year: "numeric",
  }).formatToParts(new Date());
  const year = dateParts.find((part) => part.type === "year")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;
  const day = dateParts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

export default async function PrivateDashboardPage() {
  const [appointments, patients, sessionPackages, treatmentSessions] =
    await Promise.all([
      getAppointments(),
      getPatients(),
      getSessionPackages(),
      getTreatmentSessions(),
    ]);

  const today = todayInMadrid();
  const todaysAppointments = appointments.filter(
    (appointment) => appointment.date === today,
  );
  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.date >= today &&
      appointment.status !== "cancelled" &&
      appointment.status !== "completed",
  );
  const appointmentsWithSession = new Set(
    treatmentSessions
      .map((session) => session.appointmentId)
      .filter((appointmentId) => appointmentId),
  );
  const pendingSessionAppointments = appointments.filter(
    (appointment) =>
      appointment.status !== "cancelled" &&
      appointment.status !== "completed" &&
      isAppointmentPastOrNow(appointment.date, appointment.time) &&
      !appointmentsWithSession.has(appointment.id),
  );
  const activePatients = patients.filter((patient) => patient.status === "active");
  const followUpPatients = patients.filter(
    (patient) => patient.status === "follow_up",
  );
  const activePackages = sessionPackages.filter(
    (sessionPackage) => sessionPackage.status === "active",
  );

  const stats = [
    {
      title: "Citas de hoy",
      value: todaysAppointments.length,
      detail: "Pacientes que requieren revisión hoy.",
      icon: CalendarCheck,
    },
    {
      title: "Pacientes activos",
      value: activePatients.length,
      detail: "Procesos abiertos con seguimiento cercano.",
      icon: UsersRound,
    },
    {
      title: "Sesiones esta semana",
      value: treatmentSessions.length,
      detail: "Registros clínicos recientes del dashboard.",
      icon: ClipboardList,
    },
    {
      title: "Bonos activos",
      value: activePackages.length,
      detail: "Control manual de sesiones pendientes.",
      icon: TicketCheck,
    },
    {
      title: "En seguimiento",
      value: followUpPatients.length,
      detail: "Pacientes para revisar evolución.",
      icon: UserRoundCheck,
    },
  ];

  const quickActions = [
    {
      title: "Nuevo paciente",
      text: "Agregar manualmente a quien llega por WhatsApp.",
      href: "/private/pacientes/nuevo",
      icon: UserPlus,
    },
    {
      title: "Nueva cita",
      text: "Revisar agenda y reservar un espacio disponible.",
      href: "/private/agenda/nueva",
      icon: CalendarPlus,
    },
    {
      title: "Registrar sesión",
      text: "Anotar tratamiento, dolor e indicaciones.",
      href: "/private/sesiones/nueva",
      icon: ClipboardPlus,
    },
    {
      title: "Ver agenda semanal",
      text: "Identificar huecos libres de lunes a sábado.",
      href: "/private/agenda",
      icon: CalendarDays,
    },
  ];

  return (
    <PrivateLayout title="Vista general">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1fr_0.72fr]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Citas de hoy</h2>
            <CalendarDays className="size-5 text-[var(--brand-hover)]" />
          </div>
          <div className="grid gap-4">
            {todaysAppointments.length ? (
              todaysAppointments.map((appointment) => (
                <AppointmentCard appointment={appointment} key={appointment.id} />
              ))
            ) : (
              <EmptyState message="No hay citas para hoy." />
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Próximas citas</h2>
          <div className="grid gap-4">
            {upcomingAppointments.length ? (
              upcomingAppointments.slice(0, 4).map((appointment) => (
                <AppointmentCard appointment={appointment} key={appointment.id} />
              ))
            ) : (
              <EmptyState message="No hay próximas citas activas." />
            )}
          </div>
        </section>

        <section className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-hover)]">
            Seguimientos
          </p>
          <h2 className="mt-4 text-2xl font-semibold">Revisar evolución</h2>
          <div className="mt-5 grid gap-4">
            {[...followUpPatients, ...activePatients].length ? (
              [...followUpPatients, ...activePatients].slice(0, 3).map((patient) => (
                <div className="border-t border-[var(--line)] pt-4" key={patient.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{patient.fullName}</p>
                    <StatusBadge status={patient.status} />
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {patient.mainInjury} · {patient.notes}
                  </p>
                </div>
              ))
            ) : (
              <EmptyState message="No hay pacientes activos o en seguimiento." />
            )}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Pendientes de registrar sesión
        </h2>
        {pendingSessionAppointments.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {pendingSessionAppointments.slice(0, 4).map((appointment) => (
              <AppointmentCard appointment={appointment} key={appointment.id} />
            ))}
          </div>
        ) : (
          <EmptyState message="No hay citas pasadas pendientes de registrar sesión." />
        )}
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Accesos rápidos</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </section>
    </PrivateLayout>
  );
}
