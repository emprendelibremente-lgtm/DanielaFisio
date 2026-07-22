-- Segmento 3 fix: permitir operaciones al rol authenticated.
-- RLS sigue activo y limita filas por owner_id = auth.uid().

grant usage on schema public to authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.patients to authenticated;
grant select, insert, update, delete on public.appointments to authenticated;
grant select, insert, update, delete on public.treatment_sessions to authenticated;
grant select, insert, update, delete on public.session_packages to authenticated;

grant usage, select on all sequences in schema public to authenticated;
