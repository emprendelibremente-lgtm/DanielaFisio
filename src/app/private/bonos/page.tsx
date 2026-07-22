import type { Metadata } from "next";
import { BonusCard } from "@/components/private/BonusCard";
import { EmptyState } from "@/components/private/EmptyState";
import { PrivateLayout } from "@/components/private/PrivateLayout";
import { SuccessMessage } from "@/components/private/SuccessMessage";
import { getSessionPackages } from "@/lib/private/packages";

export const metadata: Metadata = {
  title: "Bonos privados",
};

export default async function PrivatePackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const [{ success }, sessionPackages] = await Promise.all([
    searchParams,
    getSessionPackages(),
  ]);

  return (
    <PrivateLayout title="Bonos">
      <SuccessMessage code={success} />
      <section className="mb-6 rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-hover)]">
          Control manual
        </p>
        <h2 className="mt-3 text-2xl font-semibold">Sesiones pendientes</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
          Actualmente trabajo con bonos de 5 sesiones con descuento. Esta
          sección sirve para llevar un control manual de las sesiones usadas y
          restantes de cada paciente.
        </p>
        <a
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0F3D3A] px-5 text-sm font-semibold text-white"
          href="/private/bonos/nuevo"
        >
          Nuevo bono de 5 sesiones
        </a>
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        {sessionPackages.length ? (
          sessionPackages.map((sessionPackage) => (
            <BonusCard key={sessionPackage.id} sessionPackage={sessionPackage} />
          ))
        ) : (
          <div className="lg:col-span-2">
            <EmptyState message="Aún no hay bonos creados. Puedes añadir un bono de 5 sesiones cuando lo necesites." />
          </div>
        )}
      </div>
    </PrivateLayout>
  );
}
