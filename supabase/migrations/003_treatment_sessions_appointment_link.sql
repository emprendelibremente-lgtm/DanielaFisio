-- Segmento 3.4: vincular sesiones con citas de forma opcional.
-- RLS permanece activo y las policies existentes siguen limitando por owner_id.

alter table public.treatment_sessions
  add column if not exists appointment_id uuid references public.appointments(id) on delete set null;

create index if not exists treatment_sessions_appointment_id_idx
  on public.treatment_sessions(appointment_id);

create unique index if not exists treatment_sessions_owner_appointment_once_idx
  on public.treatment_sessions(owner_id, appointment_id)
  where appointment_id is not null;
