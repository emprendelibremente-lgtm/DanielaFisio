-- Segmento 3: esquema inicial seguro para Daniela Ferreira.
-- Ejecutar en Supabase SQL Editor después de crear el proyecto.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text default 'owner',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  age integer,
  main_injury text,
  status text not null default 'active',
  start_date date,
  last_session_date date,
  next_appointment_date date,
  referred_by text,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint patients_status_check check (status in ('active', 'paused', 'discharged', 'follow_up'))
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete cascade,
  patient_name text,
  appointment_date date not null,
  appointment_time time not null,
  duration_minutes integer default 60,
  status text not null default 'pending',
  reason text,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint appointments_status_check check (status in ('pending', 'confirmed', 'completed', 'cancelled'))
);

create table if not exists public.treatment_sessions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete cascade,
  session_date date not null,
  reason text,
  treatment_summary text,
  used_indiba boolean default false,
  pain_before integer,
  pain_after integer,
  exercises_given text,
  evolution_notes text,
  next_recommendation text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint treatment_sessions_pain_before_check check (pain_before is null or pain_before between 0 and 10),
  constraint treatment_sessions_pain_after_check check (pain_after is null or pain_after between 0 and 10)
);

create table if not exists public.session_packages (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  patient_id uuid references public.patients(id) on delete cascade,
  package_name text default 'Bono de 5 sesiones',
  total_sessions integer default 5,
  used_sessions integer default 0,
  remaining_sessions integer default 5,
  status text not null default 'active',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint session_packages_status_check check (status in ('active', 'exhausted', 'pending')),
  constraint session_packages_only_five_check check (total_sessions = 5),
  constraint session_packages_remaining_check check (remaining_sessions between 0 and total_sessions),
  constraint session_packages_used_check check (used_sessions between 0 and total_sessions)
);

alter table public.profiles enable row level security;
alter table public.patients enable row level security;
alter table public.appointments enable row level security;
alter table public.treatment_sessions enable row level security;
alter table public.session_packages enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

create policy "profiles_insert_own" on public.profiles
  for insert with check (id = auth.uid());

create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "patients_owner_all" on public.patients
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "appointments_owner_all" on public.appointments
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "treatment_sessions_owner_all" on public.treatment_sessions
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "session_packages_owner_all" on public.session_packages
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create index if not exists patients_owner_id_idx on public.patients(owner_id);
create index if not exists appointments_owner_id_date_idx on public.appointments(owner_id, appointment_date);
create index if not exists treatment_sessions_owner_id_date_idx on public.treatment_sessions(owner_id, session_date);
create index if not exists session_packages_owner_id_idx on public.session_packages(owner_id);
