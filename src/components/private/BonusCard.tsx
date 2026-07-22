import type { SessionPackage } from "@/types/private";
import { discountSessionPackage } from "@/lib/private/actions";
import { ProgressBar } from "./ProgressBar";
import { SubmitButton } from "./SubmitButton";
import { StatusBadge } from "./StatusBadge";

export function BonusCard({
  sessionPackage,
}: {
  sessionPackage: SessionPackage;
}) {
  const progress =
    (sessionPackage.usedSessions / sessionPackage.totalSessions) * 100;

  return (
    <article className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(35,40,39,0.035)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{sessionPackage.patientName}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {sessionPackage.packageName}
          </p>
        </div>
        <StatusBadge status={sessionPackage.status} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-[var(--muted)]">Totales</p>
          <p className="mt-1 font-semibold">{sessionPackage.totalSessions}</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Usadas</p>
          <p className="mt-1 font-semibold">{sessionPackage.usedSessions}</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Restantes</p>
          <p className="mt-1 font-semibold">
            {sessionPackage.remainingSessions}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <ProgressBar value={progress} />
      </div>
      <div className="mt-5">
        <form action={discountSessionPackage.bind(null, sessionPackage.id)}>
          <SubmitButton
            className="min-h-11 rounded-full bg-[#0F3D3A] px-4 text-sm font-semibold text-white disabled:opacity-60"
            disabled={sessionPackage.remainingSessions <= 0}
          >
            Descontar sesión
          </SubmitButton>
        </form>
      </div>
    </article>
  );
}
