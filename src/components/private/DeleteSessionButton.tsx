"use client";

import { Trash2 } from "lucide-react";
import { deleteTreatmentSession } from "@/lib/private/actions";
import { SubmitButton } from "./SubmitButton";

export function DeleteSessionButton({
  patientName,
  sessionId,
}: {
  patientName: string;
  sessionId: string;
}) {
  return (
    <form
      action={deleteTreatmentSession.bind(null, sessionId)}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `¿Eliminar la sesión de ${patientName}? Esta acción quitará la sesión de los reportes y del control de ingresos.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <SubmitButton
        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-rose-200 bg-white px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60"
        pendingText="Eliminando..."
      >
        <Trash2 className="size-3.5" />
        Eliminar sesión
      </SubmitButton>
    </form>
  );
}
