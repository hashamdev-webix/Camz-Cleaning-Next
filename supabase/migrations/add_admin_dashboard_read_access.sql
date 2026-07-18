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

do $$
declare
  table_name text;
  admin_tables text[] := array[
    'users', 'addresses', 'jobs', 'payments', 'services', 'categories',
    'help_tickets', 'leave_requests', 'manual_invoices', 'gallery',
    'blogs', 'before_after_pairs', 'app_settings', 'cleaner_availability',
    'cleaner_tracking', 'custom_cleaning_requests', 'reviews', 'ratings',
    'disputes', 'notifications', 'shifts'
  ];
begin
  foreach table_name in array admin_tables loop
    if to_regclass('public.' || table_name) is not null then
      execute format('alter table public.%I enable row level security', table_name);
      execute format('drop policy if exists "Admins can read all rows" on public.%I', table_name);
      execute format(
        'create policy "Admins can read all rows" on public.%I for select to authenticated using (public.is_admin())',
        table_name
      );
    end if;
  end loop;
end
$$;

do $$
begin
  if to_regclass('public.jobs') is not null then
    alter table public.jobs enable row level security;
    drop policy if exists "Admins can update bookings" on public.jobs;
    create policy "Admins can update bookings"
      on public.jobs for update
      to authenticated
      using (public.is_admin())
      with check (public.is_admin());
  end if;
end
$$;

do $$
declare
  table_name text;
  editable_tables text[] := array['categories', 'services', 'before_after_pairs'];
begin
  foreach table_name in array editable_tables loop
    if to_regclass('public.' || table_name) is not null then
      execute format('alter table public.%I enable row level security', table_name);
      execute format('drop policy if exists "Admins can insert rows" on public.%I', table_name);
      execute format('drop policy if exists "Admins can update rows" on public.%I', table_name);
      execute format('drop policy if exists "Admins can delete rows" on public.%I', table_name);
      execute format('create policy "Admins can insert rows" on public.%I for insert to authenticated with check (public.is_admin())', table_name);
      execute format('create policy "Admins can update rows" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', table_name);
      execute format('create policy "Admins can delete rows" on public.%I for delete to authenticated using (public.is_admin())', table_name);
    end if;
  end loop;
end
$$;

drop policy if exists "Admins can upload before after gallery images"
  on storage.objects;

create policy "Admins can upload before after gallery images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'job-images'
    and name like 'before_after_gallery/%'
    and public.is_admin()
  );

drop policy if exists "Authenticated staff can view custom cleaning photos"
  on storage.objects;

create policy "Authenticated staff can view custom cleaning photos"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'custom-cleaning-photos'
    and public.is_admin()
  );
