import type { Metadata } from "next";
import { EmptyState } from "@/components/private/EmptyState";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { QuickSessionForm } from "@/components/private/QuickSessionForm";
import { SessionTimeline } from "@/components/private/SessionTimeline";
import { SuccessMessage } from "@/components/private/SuccessMessage";
import { getTreatmentSessions } from "@/lib/private/sessions";

export const metadata: Metadata = {
  title: "Sesiones privadas",
};

export default async function PrivateSessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const [{ success }, treatmentSessions] = await Promise.all([
    searchParams,
    getTreatmentSessions(),
  ]);

  return (
    <PrivateLayout title="Sesiones">
      <SuccessMessage code={success} />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Sesiones recientes</h2>
          {treatmentSessions.length ? (
            <SessionTimeline sessions={treatmentSessions} />
          ) : (
            <EmptyState message="Aún no hay sesiones registradas." />
          )}
        </section>

        <QuickSessionForm />
      </div>
    </PrivateLayout>
  );
}
