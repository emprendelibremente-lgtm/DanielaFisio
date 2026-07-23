-- Segmento 6: control económico manual por sesión.
-- No crea pagos online ni facturación. RLS permanece activo.

alter table public.treatment_sessions
  add column if not exists duration_minutes integer,
  add column if not exists base_price numeric(10,2),
  add column if not exists discount_amount numeric(10,2) default 0,
  add column if not exists amount_paid numeric(10,2),
  add column if not exists payment_method text,
  add column if not exists payment_notes text;

alter table public.treatment_sessions
  add constraint treatment_sessions_duration_positive_check
  check (duration_minutes is null or duration_minutes > 0);

alter table public.treatment_sessions
  add constraint treatment_sessions_base_price_non_negative_check
  check (base_price is null or base_price >= 0);

alter table public.treatment_sessions
  add constraint treatment_sessions_discount_non_negative_check
  check (discount_amount is null or discount_amount >= 0);

alter table public.treatment_sessions
  add constraint treatment_sessions_amount_paid_non_negative_check
  check (amount_paid is null or amount_paid >= 0);

alter table public.treatment_sessions
  add constraint treatment_sessions_payment_method_check
  check (
    payment_method is null or
    payment_method in ('cash', 'bizum', 'card', 'transfer', 'other', 'pending')
  );

create index if not exists treatment_sessions_owner_session_date_report_idx
  on public.treatment_sessions(owner_id, session_date);
