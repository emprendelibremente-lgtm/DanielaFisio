const messages: Record<string, string> = {
  "patient-created": "Paciente creado correctamente.",
  "patient-updated": "Paciente actualizado correctamente.",
  "appointment-created": "Cita creada correctamente.",
  "session-created": "Sesión registrada correctamente.",
  "session-deleted": "Sesión eliminada. Reportes e ingresos ya están actualizados.",
  "package-created": "Bono de 5 sesiones creado correctamente.",
  "package-discounted": "Sesión descontada del bono correctamente.",
  "appointment-updated": "Estado de cita actualizado correctamente.",
  "patient-status-updated": "Estado del paciente actualizado correctamente.",
  "patient-deleted": "Paciente eliminado correctamente.",
};

export function SuccessMessage({ code }: { code?: string | null }) {
  if (!code) {
    return null;
  }

  return (
    <p className="mb-5 rounded-lg border border-[var(--brand)]/40 bg-[var(--brand)]/15 px-4 py-3 text-sm font-medium text-[#0F3D3A]">
      {messages[code] ?? "Acción completada correctamente."}
    </p>
  );
}
