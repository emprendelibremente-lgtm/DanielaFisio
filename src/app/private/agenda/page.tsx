import type { Metadata } from "next";
import { AppointmentCard } from "@/components/private/AppointmentCard";
import { EmptyState } from "@/components/private/EmptyState";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { SuccessMessage } from "@/components/private/SuccessMessage";
import { WeeklySchedule } from "@/components/private/WeeklySchedule";
import { getAppointments } from "@/lib/private/appointments";

export const metadata: Metadata = {
  title: "Agenda privada",
};

export default async function PrivateAgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const [{ success }, appointments] = await Promise.all([
    searchParams,
    getAppointments(),
  ]);
  const groupedAppointments = appointments.reduce<Record<string, typeof appointments>>(
    (groups, appointment) => {
      groups[appointment.date] = groups[appointment.date] || [];
      groups[appointment.date].push(appointment);
      return groups;
    },
    {},
  );

  return (
    <PrivateLayout title="Agenda">
      <SuccessMessage code={success} />
      <section className="mb-8">
        <div className="mb-5 max-w-3xl">
          <h2 className="text-xl font-semibold">Semana actual</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Vista semanal simple para identificar citas confirmadas, pendientes
            y espacios libres sin usar un calendario complejo.
          </p>
        </div>
        <WeeklySchedule appointments={appointments} />
      </section>

      <div className="grid gap-6">
        <h2 className="text-xl font-semibold">Lista ordenada de próximas citas</h2>
        {appointments.length ? (
          Object.entries(groupedAppointments).map(([date, dateAppointments]) => (
            <section key={date}>
              <h2 className="mb-4 text-xl font-semibold">{date}</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {dateAppointments.map((appointment) => (
                  <AppointmentCard appointment={appointment} key={appointment.id} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <EmptyState message="Aún no hay citas registradas. Puedes crear la primera desde “Nueva cita”." />
        )}
      </div>
    </PrivateLayout>
  );
}
