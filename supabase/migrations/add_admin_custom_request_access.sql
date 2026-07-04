drop policy if exists "Admins can view custom cleaning requests"
  on public.custom_cleaning_requests;

create policy "Admins can view custom cleaning requests"
  on public.custom_cleaning_requests for select
  to authenticated
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid()
        and lower(users.role) = 'admin'
        and users.is_blocked = false
    )
  );

drop policy if exists "Authenticated staff can view custom cleaning photos"
  on storage.objects;

create policy "Authenticated staff can view custom cleaning photos"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'custom-cleaning-photos'
    and exists (
      select 1 from public.users
      where users.id = auth.uid()
        and lower(users.role) = 'admin'
        and users.is_blocked = false
    )
  );
