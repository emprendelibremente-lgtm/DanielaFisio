import Link from "next/link";
import { Pencil } from "lucide-react";
import type { TreatmentSession } from "@/types/private";
import { DeleteSessionButton } from "./DeleteSessionButton";
import { SessionPaymentMethodForm } from "./SessionPaymentMethodForm";

export function SessionTimeline({
  sessions,
}: {
  sessions: TreatmentSession[];
}) {
  return (
    <div className="grid gap-4">
      {sessions.map((session) => (
        <article
          className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-[0_14px_34px_rgba(35,40,39,0.035)]"
          id={`sesion-${session.id}`}
          key={session.id}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div>
              <p className="text-sm font-semibold">{session.date}</p>
              <p className="mt-1 text-sm font-medium">{session.patientName}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {session.reason || "Sesión de fisioterapia"}
              </p>
            </div>
            <p className="text-xs font-semibold text-[var(--muted)]">
              Dolor {session.painBefore}/10 a {session.painAfter}/10
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            {session.treatmentSummary}
          </p>
          <p className="mt-3 text-xs font-semibold text-[#0F3D3A]">
            INDIBA: {session.usedIndiba ? "Sí" : "No"}
          </p>
          <div className="mt-4 border-t border-[var(--line)] pt-4">
            <SessionPaymentMethodForm
              currentMethod={session.paymentMethod}
              sessionId={session.id}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--line)] pt-4">
            <Link
              className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[#0F3D3A] px-4 text-xs font-semibold text-white transition hover:bg-[#101918]"
              href={`/private/sesiones/${session.id}/editar`}
            >
              <Pencil className="size-3.5" />
              Editar sesión
            </Link>
            <DeleteSessionButton
              patientName={session.patientName}
              sessionId={session.id}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
