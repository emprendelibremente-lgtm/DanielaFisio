const messages: Record<string, string> = {
  "missing-name": "El nombre completo es obligatorio.",
  "missing-fields": "Faltan campos obligatorios.",
  "missing-patient": "Selecciona un paciente.",
  "create-failed": "No se pudo crear el registro. Inténtalo de nuevo.",
  "update-failed": "No se pudo actualizar el registro. Inténtalo de nuevo.",
  "invalid-pain": "El dolor debe estar entre 0 y 10.",
  "invalid-payment": "Revisa los importes antes de guardar la sesión.",
  "invalid-appointment-status":
    "No se pudo crear la cita. Revisa el estado de la cita.",
  "invalid-package-status": "Revisa el estado del bono antes de guardar.",
  "invalid-patient-status": "Revisa el estado del paciente antes de guardar.",
  "delete-confirmation": "Escribe ELIMINAR para confirmar el borrado.",
  "delete-failed": "No se pudo eliminar el paciente.",
  "session-exists": "Ya existe una sesión registrada para esta cita.",
  "session-delete-failed": "No se pudo eliminar la sesión. Inténtalo de nuevo.",
};

export function ErrorMessage({ code }: { code?: string | null }) {
  if (!code) {
    return null;
  }

  return (
    <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {messages[code] ?? "Ha ocurrido un error. Inténtalo de nuevo."}
    </p>
  );
}
