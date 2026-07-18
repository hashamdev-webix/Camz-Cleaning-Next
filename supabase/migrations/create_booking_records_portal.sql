create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and lower(role::text) = 'admin'
      and is_blocked = false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table if not exists public.booking_records (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  cleaning_type text not null,
  area text not null check (area in ('NE Calgary', 'SE Calgary', 'NW Calgary', 'SW Calgary', 'Downtown', 'Other area in Calgary')),
  focus_details text,
  service_date date not null,
  service_time time not null,
  full_address text not null,
  price numeric(12,2) not null check (price >= 0),
  show_price_to_cleaner boolean not null default false,
  email text not null,
  phone text not null,
  added_by text,
  added_by_user uuid references public.users(id) on delete set null,
  scope_of_work text,
  parking_instructions text,
  status text not null default 'pending' check (status in ('pending', 'ongoing', 'completed')),
  start_date date,
  start_time time,
  end_date date,
  end_time time,
  completion_remarks text,
  completed_by uuid references public.users(id) on delete set null,
  worked_hours numeric(8,2) not null default 0 check (worked_hours >= 0),
  hours_approved boolean not null default false,
  approved_hours numeric(8,2) not null default 0 check (approved_hours >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.booking_record_assignments (
  booking_id uuid not null references public.booking_records(id) on delete cascade,
  cleaner_id uuid not null references public.users(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references public.users(id) on delete set null,
  primary key (booking_id, cleaner_id)
);

create table if not exists public.booking_record_images (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.booking_records(id) on delete cascade,
  image_type text not null check (image_type in ('before', 'after')),
  url text not null,
  storage_path text,
  public_id text,
  name text,
  width integer,
  height integer,
  format text,
  uploaded_at timestamptz not null default now(),
  uploaded_by uuid references public.users(id) on delete set null
);

create index if not exists booking_records_service_date_idx on public.booking_records(service_date);
create index if not exists booking_records_status_idx on public.booking_records(status);
create index if not exists booking_records_area_idx on public.booking_records(area);
create index if not exists booking_record_images_booking_idx on public.booking_record_images(booking_id, image_type);

create or replace function public.set_booking_records_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists booking_records_set_updated_at on public.booking_records;
create trigger booking_records_set_updated_at
before update on public.booking_records
for each row execute function public.set_booking_records_updated_at();

create or replace function public.has_booking_portal_access()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and lower(role::text) in ('admin', 'data_entry', 'cleaner')
      and is_blocked = false
  );
$$;

revoke all on function public.has_booking_portal_access() from public;
grant execute on function public.has_booking_portal_access() to authenticated;

alter table public.booking_records enable row level security;
alter table public.booking_record_assignments enable row level security;
alter table public.booking_record_images enable row level security;

drop policy if exists "Portal users can read booking records" on public.booking_records;
create policy "Portal users can read booking records"
  on public.booking_records for select
  to authenticated
  using (public.has_booking_portal_access());

drop policy if exists "Portal users can insert booking records" on public.booking_records;
create policy "Portal users can insert booking records"
  on public.booking_records for insert
  to authenticated
  with check (public.has_booking_portal_access());

drop policy if exists "Portal users can update booking records" on public.booking_records;
create policy "Portal users can update booking records"
  on public.booking_records for update
  to authenticated
  using (public.has_booking_portal_access())
  with check (public.has_booking_portal_access());

drop policy if exists "Admins can delete booking records" on public.booking_records;
create policy "Admins can delete booking records"
  on public.booking_records for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "Portal users can read booking assignments" on public.booking_record_assignments;
create policy "Portal users can read booking assignments"
  on public.booking_record_assignments for select
  to authenticated
  using (public.has_booking_portal_access());

drop policy if exists "Portal users can manage booking assignments" on public.booking_record_assignments;
create policy "Portal users can manage booking assignments"
  on public.booking_record_assignments for all
  to authenticated
  using (public.has_booking_portal_access())
  with check (public.has_booking_portal_access());

drop policy if exists "Portal users can read booking images" on public.booking_record_images;
create policy "Portal users can read booking images"
  on public.booking_record_images for select
  to authenticated
  using (public.has_booking_portal_access());

drop policy if exists "Portal users can manage booking images" on public.booking_record_images;
create policy "Portal users can manage booking images"
  on public.booking_record_images for all
  to authenticated
  using (public.has_booking_portal_access())
  with check (public.has_booking_portal_access());

drop policy if exists "Portal users can upload booking record images" on storage.objects;
create policy "Portal users can upload booking record images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'job-images'
    and name like 'booking_records/%'
    and public.has_booking_portal_access()
  );

drop policy if exists "Portal users can read booking record images" on storage.objects;
create policy "Portal users can read booking record images"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'job-images'
    and name like 'booking_records/%'
    and public.has_booking_portal_access()
  );

alter table if exists public.before_after_pairs enable row level security;

alter table if exists public.before_after_pairs
  alter column after_image_url drop not null;

drop policy if exists "Portal users can read before after pairs" on public.before_after_pairs;
create policy "Portal users can read before after pairs"
  on public.before_after_pairs for select
  to authenticated
  using (public.has_booking_portal_access());

drop policy if exists "Portal users can insert before after pairs" on public.before_after_pairs;
create policy "Portal users can insert before after pairs"
  on public.before_after_pairs for insert
  to authenticated
  with check (public.has_booking_portal_access());

drop policy if exists "Portal users can delete before after pairs" on public.before_after_pairs;
create policy "Portal users can delete before after pairs"
  on public.before_after_pairs for delete
  to authenticated
  using (public.has_booking_portal_access());

drop policy if exists "Portal users can upload before after gallery images" on storage.objects;
create policy "Portal users can upload before after gallery images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'job-images'
    and name like 'before_after_gallery/%'
    and public.has_booking_portal_access()
  );

drop policy if exists "Portal users can read before after gallery images" on storage.objects;
create policy "Portal users can read before after gallery images"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'job-images'
    and name like 'before_after_gallery/%'
    and public.has_booking_portal_access()
  );

notify pgrst, 'reload schema';
