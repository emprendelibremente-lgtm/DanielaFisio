-- Permite dividir el cobro de una sesión entre efectivo y tarjeta.
-- Conserva amount_paid como total y rellena los importes históricos.

alter table public.treatment_sessions
  add column if not exists cash_amount numeric(10,2) not null default 0,
  add column if not exists card_amount numeric(10,2) not null default 0;

update public.treatment_sessions
set
  cash_amount = case
    when payment_method = 'cash' then coalesce(amount_paid, 0)
    else 0
  end,
  card_amount = case
    when payment_method = 'card' then coalesce(amount_paid, 0)
    else 0
  end;

alter table public.treatment_sessions
  drop constraint if exists treatment_sessions_payment_method_check;

alter table public.treatment_sessions
  add constraint treatment_sessions_payment_method_check
  check (
    payment_method is null or
    payment_method in (
      'cash', 'bizum', 'card', 'split', 'transfer', 'other', 'pending'
    )
  );

alter table public.treatment_sessions
  add constraint treatment_sessions_cash_amount_non_negative_check
  check (cash_amount >= 0),
  add constraint treatment_sessions_card_amount_non_negative_check
  check (card_amount >= 0),
  add constraint treatment_sessions_payment_allocation_check
  check (
    (payment_method = 'cash' and cash_amount = coalesce(amount_paid, 0) and card_amount = 0)
    or (payment_method = 'card' and card_amount = coalesce(amount_paid, 0) and cash_amount = 0)
    or (
      payment_method = 'split'
      and cash_amount > 0
      and card_amount > 0
      and cash_amount + card_amount = coalesce(amount_paid, 0)
    )
    or (
      (payment_method is null or payment_method in ('bizum', 'transfer', 'other', 'pending'))
      and cash_amount = 0
      and card_amount = 0
    )
  );
