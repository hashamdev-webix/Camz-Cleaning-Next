create table if not exists public.custom_cleaning_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  service_types text[] not null check (cardinality(service_types) > 0),
  property_details jsonb not null default '{}'::jsonb,
  checklist jsonb not null default '{}'::jsonb,
  if_time_allows text,
  additional_notes text,
  preferred_contact text not null,
  preferred_date date,
  status text not null default 'new' check (status in ('new', 'reviewed', 'scheduled', 'assigned', 'completed', 'closed')),
  assigned_cleaner_id uuid references public.users(id) on delete set null,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists custom_cleaning_requests_status_created_idx
  on public.custom_cleaning_requests (status, created_at desc);

alter table public.custom_cleaning_requests enable row level security;

create policy "Anyone can submit a custom cleaning request"
  on public.custom_cleaning_requests for insert
  to anon, authenticated
  with check (status = 'new');

comment on table public.custom_cleaning_requests is
  'Mode B customer checklists for manual review and quotation in the future admin dashboard.';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'custom-cleaning-photos',
  'custom-cleaning-photos',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy "Customers can attach custom cleaning photos"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'custom-cleaning-photos');

create policy "Authenticated staff can view custom cleaning photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'custom-cleaning-photos');
