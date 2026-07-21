create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text not null,
  detail_images text[] not null default '{}',
  steps jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.blogs
  add column if not exists detail_images text[] not null default '{}',
  add column if not exists steps jsonb not null default '[]'::jsonb,
  add column if not exists faqs jsonb not null default '[]'::jsonb;

alter table public.blogs enable row level security;

drop policy if exists "Anyone can read blogs" on public.blogs;
create policy "Anyone can read blogs"
  on public.blogs for select
  using (true);

drop policy if exists "Admins can insert blogs" on public.blogs;
create policy "Admins can insert blogs"
  on public.blogs for insert
  with check (
    exists (
      select 1
      from public.users
      where id = auth.uid()
        and lower(role::text) = 'admin'
        and is_blocked = false
    )
  );

drop policy if exists "Admins can delete blogs" on public.blogs;
create policy "Admins can delete blogs"
  on public.blogs for delete
  using (
    exists (
      select 1
      from public.users
      where id = auth.uid()
        and lower(role::text) = 'admin'
        and is_blocked = false
    )
  );

notify pgrst, 'reload schema';
