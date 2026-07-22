import type {
  AppointmentStatus,
  PackageStatus,
  PatientStatus,
} from "@/types/private";

type Status = PatientStatus | AppointmentStatus | PackageStatus;

const labels: Record<Status, string> = {
  active: "Activo",
  paused: "Pausado",
  discharged: "Alta",
  follow_up: "Seguimiento",
  exhausted: "Agotado",
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

const styles: Record<Status, string> = {
  active: "border-[var(--brand)]/45 bg-[var(--brand)]/18 text-[#0F3D3A]",
  exhausted: "border-rose-200 bg-rose-50 text-rose-700",
  paused: "border-[#C8BEB0] bg-[#F5EFE6] text-[var(--muted)]",
  discharged: "border-emerald-200 bg-emerald-50 text-emerald-800",
  follow_up: "border-[#BFC4C3] bg-white text-[var(--text)]",
  pending: "border-[#C8BEB0] bg-[#F5EFE6] text-[var(--muted)]",
  confirmed: "border-[var(--brand)]/45 bg-[var(--brand)]/18 text-[#0F3D3A]",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  cancelled: "border-rose-200 bg-rose-50 text-rose-700",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
