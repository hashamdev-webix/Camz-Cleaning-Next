-- Camz Cleaning security hardening
-- Date: 2026-08-27
-- Run AFTER the existing Camz Cleaning migrations.
--
-- Goals:
--   * distributed server-side rate-limit storage
--   * strict role helpers
--   * least-privilege Booking Calendar RLS
--   * restrict cleaner booking updates to status only
--   * secure booking image rows + Storage objects
--   * creator/admin ownership for Before/After pairs
--   * prevent public blog comments from self-approving
--   * tighten custom-request inserts and upload paths
--
-- This migration is written to be idempotent for re-runs.

-- ============================================================
-- 1) DISTRIBUTED RATE LIMIT BACKEND (server/service_role only)
-- ============================================================

create table if not exists public.security_rate_limits (
  key text primary key,
  hit_count integer not null default 0 check (hit_count >= 0),
  window_started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists security_rate_limits_updated_at_idx
  on public.security_rate_limits(updated_at);

alter table public.security_rate_limits enable row level security;

revoke all on table public.security_rate_limits from public, anon, authenticated;

create or replace function public.security_check_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_count integer;
begin
  if p_key is null
     or length(p_key) < 16
     or length(p_key) > 256
     or p_limit < 1
     or p_limit > 10000
     or p_window_seconds < 1
     or p_window_seconds > 86400 then
    return false;
  end if;

  insert into public.security_rate_limits (
    key,
    hit_count,
    window_started_at,
    updated_at
  )
  values (p_key, 1, v_now, v_now)
  on conflict (key) do update
  set
    hit_count = case
      when public.security_rate_limits.window_started_at
           + make_interval(secs => p_window_seconds) <= v_now
        then 1
      else public.security_rate_limits.hit_count + 1
    end,
    window_started_at = case
      when public.security_rate_limits.window_started_at
           + make_interval(secs => p_window_seconds) <= v_now
        then v_now
      else public.security_rate_limits.window_started_at
    end,
    updated_at = v_now
  returning hit_count into v_count;

  -- Opportunistic cleanup. The index above keeps this inexpensive.
  delete from public.security_rate_limits
  where updated_at < v_now - interval '48 hours';

  return v_count <= p_limit;
end;
$$;

revoke all on function public.security_check_rate_limit(text, integer, integer)
  from public, anon, authenticated;

grant execute on function public.security_check_rate_limit(text, integer, integer)
  to service_role;

-- ============================================================
-- 2) ROLE / AUTHORIZATION HELPERS
-- ============================================================

create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(role::text, ''))
  from public.users
  where id = auth.uid()
    and coalesce(is_blocked, false) = false
  limit 1;
$$;

revoke all on function public.current_app_role() from public, anon;
grant execute on function public.current_app_role() to authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() = 'admin';
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create or replace function public.has_booking_portal_access()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() in ('admin', 'data_entry', 'cleaner');
$$;

revoke all on function public.has_booking_portal_access() from public, anon;
grant execute on function public.has_booking_portal_access() to authenticated;

create or replace function public.can_access_booking(p_booking_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case public.current_app_role()
    when 'admin' then true

    when 'data_entry' then exists (
      select 1
      from public.booking_records br
      where br.id = p_booking_id
        and br.added_by_user = auth.uid()
    )

    when 'cleaner' then exists (
      select 1
      from public.booking_record_assignments bra
      where bra.booking_id = p_booking_id
        and bra.cleaner_id = auth.uid()
    )

    else false
  end;
$$;

revoke all on function public.can_access_booking(uuid) from public, anon;
grant execute on function public.can_access_booking(uuid) to authenticated;

create or replace function public.booking_id_from_storage_name(p_name text)
returns uuid
language plpgsql
stable
security definer
set search_path = public, storage
as $$
declare
  v_booking text;
begin
  -- Expected path:
  -- booking_records/<booking-uuid>/<filename>
  if (storage.foldername(p_name))[1] <> 'booking_records' then
    return null;
  end if;

  v_booking := (storage.foldername(p_name))[2];

  if v_booking is null
     or v_booking !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    return null;
  end if;

  return v_booking::uuid;
exception
  when others then
    return null;
end;
$$;

revoke all on function public.booking_id_from_storage_name(text) from public, anon;
grant execute on function public.booking_id_from_storage_name(text) to authenticated;

-- ============================================================
-- 3) BOOKING CALENDAR: REPLACE BROAD RLS POLICIES
-- ============================================================

alter table public.booking_records enable row level security;
alter table public.booking_record_assignments enable row level security;
alter table public.booking_record_images enable row level security;

-- Remove old broad policies from create_booking_records_portal.sql.
drop policy if exists "Portal users can read booking records"
  on public.booking_records;
drop policy if exists "Portal users can insert booking records"
  on public.booking_records;
drop policy if exists "Portal users can update booking records"
  on public.booking_records;
drop policy if exists "Admins can delete booking records"
  on public.booking_records;

drop policy if exists "Portal users can read booking assignments"
  on public.booking_record_assignments;
drop policy if exists "Portal users can manage booking assignments"
  on public.booking_record_assignments;

drop policy if exists "Portal users can read booking images"
  on public.booking_record_images;
drop policy if exists "Portal users can manage booking images"
  on public.booking_record_images;

-- Remove policies created by an earlier version of this migration, if any.
drop policy if exists "Booking records readable by authorized owner role"
  on public.booking_records;
drop policy if exists "Admins and data entry can create booking records"
  on public.booking_records;
drop policy if exists "Admins can update any booking record"
  on public.booking_records;
drop policy if exists "Assigned cleaners can update assigned booking records"
  on public.booking_records;
drop policy if exists "Only admins can delete booking records"
  on public.booking_records;

drop policy if exists "Booking assignments readable by authorized booking users"
  on public.booking_record_assignments;
drop policy if exists "Admins can manage booking assignments"
  on public.booking_record_assignments;
drop policy if exists "Data entry may assign cleaners on own bookings"
  on public.booking_record_assignments;

drop policy if exists "Booking images readable by authorized booking users"
  on public.booking_record_images;
drop policy if exists "Booking images insert for authorized booking users"
  on public.booking_record_images;
drop policy if exists "Booking images update for authorized booking users"
  on public.booking_record_images;
drop policy if exists "Booking images delete for authorized booking users"
  on public.booking_record_images;
drop policy if exists "Booking images update for admin or authorized uploader"
  on public.booking_record_images;
drop policy if exists "Booking images delete for admin or authorized uploader"
  on public.booking_record_images;

-- Read:
--   admin      -> every booking
--   data_entry -> only bookings they created
--   cleaner    -> only assigned bookings
create policy "Booking records readable by authorized owner role"
on public.booking_records
for select
to authenticated
using (public.can_access_booking(id));

-- Create:
--   admin/data_entry only. A data-entry user cannot spoof another creator.
create policy "Admins and data entry can create booking records"
on public.booking_records
for insert
to authenticated
with check (
  public.current_app_role() = 'admin'
  or (
    public.current_app_role() = 'data_entry'
    and added_by_user = auth.uid()
  )
);

-- Admin can edit all booking fields.
create policy "Admins can update any booking record"
on public.booking_records
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Cleaner can reach UPDATE only for an assigned booking.
-- The trigger below additionally restricts the changed columns to status only.
create policy "Assigned cleaners can update assigned booking records"
on public.booking_records
for update
to authenticated
using (
  public.current_app_role() = 'cleaner'
  and public.can_access_booking(id)
)
with check (
  public.current_app_role() = 'cleaner'
  and public.can_access_booking(id)
);

create policy "Only admins can delete booking records"
on public.booking_records
for delete
to authenticated
using (public.is_admin());

-- Prevent a cleaner from bypassing the API and changing price/address/etc.
create or replace function public.guard_booking_record_updates()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_role text := public.current_app_role();
begin
  if v_role = 'cleaner' then
    if (to_jsonb(new) - array['status', 'updated_at']::text[])
       is distinct from
       (to_jsonb(old) - array['status', 'updated_at']::text[]) then
      raise exception 'Cleaners may only update booking status'
        using errcode = '42501';
    end if;
  elsif v_role not in ('admin') then
    raise exception 'Booking update is not permitted for this role'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

drop trigger if exists booking_records_role_update_guard
  on public.booking_records;

create trigger booking_records_role_update_guard
before update on public.booking_records
for each row
execute function public.guard_booking_record_updates();

-- Assignments are readable only when the parent booking is readable.
create policy "Booking assignments readable by authorized booking users"
on public.booking_record_assignments
for select
to authenticated
using (public.can_access_booking(booking_id));

-- Assignment mutations are admin-only.
create policy "Admins can manage booking assignments"
on public.booking_record_assignments
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Booking image metadata follows the parent booking's authorization.
create policy "Booking images readable by authorized booking users"
on public.booking_record_images
for select
to authenticated
using (public.can_access_booking(booking_id));

create policy "Booking images insert for authorized booking users"
on public.booking_record_images
for insert
to authenticated
with check (
  public.can_access_booking(booking_id)
  and uploaded_by = auth.uid()
);

create policy "Booking images update for authorized booking users"
on public.booking_record_images
for update
to authenticated
using (public.can_access_booking(booking_id))
with check (
  public.can_access_booking(booking_id)
  and (public.is_admin() or uploaded_by = auth.uid())
);

create policy "Booking images delete for authorized booking users"
on public.booking_record_images
for delete
to authenticated
using (public.can_access_booking(booking_id));

-- ============================================================
-- 4) STORAGE: BOOKING IMAGE OBJECTS
-- ============================================================

drop policy if exists "Portal users can upload booking record images"
  on storage.objects;
drop policy if exists "Portal users can read booking record images"
  on storage.objects;
drop policy if exists "Portal users can update booking record images"
  on storage.objects;
drop policy if exists "Portal users can delete booking record images"
  on storage.objects;

drop policy if exists "Authorized users can read booking record image objects"
  on storage.objects;
drop policy if exists "Authorized users can upload booking record image objects"
  on storage.objects;
drop policy if exists "Authorized users can update booking record image objects"
  on storage.objects;
drop policy if exists "Authorized users can delete booking record image objects"
  on storage.objects;

create policy "Authorized users can read booking record image objects"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'job-images'
  and public.can_access_booking(
    public.booking_id_from_storage_name(name)
  )
);

create policy "Authorized users can upload booking record image objects"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'job-images'
  and public.can_access_booking(
    public.booking_id_from_storage_name(name)
  )
);

create policy "Authorized users can update booking record image objects"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'job-images'
  and public.can_access_booking(
    public.booking_id_from_storage_name(name)
  )
)
with check (
  bucket_id = 'job-images'
  and public.can_access_booking(
    public.booking_id_from_storage_name(name)
  )
);

create policy "Authorized users can delete booking record image objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'job-images'
  and public.can_access_booking(
    public.booking_id_from_storage_name(name)
  )
);

-- ============================================================
-- 5) BEFORE / AFTER GALLERY
-- ============================================================

do $security$
begin
  if to_regclass('public.before_after_pairs') is not null then
    execute 'alter table public.before_after_pairs enable row level security';

    execute 'drop policy if exists "Portal users can read before after pairs" on public.before_after_pairs';
    execute 'drop policy if exists "Portal users can insert before after pairs" on public.before_after_pairs';
    execute 'drop policy if exists "Portal users can delete before after pairs" on public.before_after_pairs';
    execute 'drop policy if exists "Portal users can update before after pairs" on public.before_after_pairs';

    execute 'drop policy if exists "Portal users can create own before after pairs" on public.before_after_pairs';
    execute 'drop policy if exists "Creator or admin can update before after pairs" on public.before_after_pairs';
    execute 'drop policy if exists "Creator or admin can delete before after pairs" on public.before_after_pairs';

    execute $p$
      create policy "Portal users can read before after pairs"
      on public.before_after_pairs
      for select
      to authenticated
      using (public.has_booking_portal_access())
    $p$;

    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'before_after_pairs'
        and column_name = 'created_by'
    ) then
      execute $p$
        create policy "Portal users can create own before after pairs"
        on public.before_after_pairs
        for insert
        to authenticated
        with check (
          public.has_booking_portal_access()
          and created_by::text = auth.uid()::text
        )
      $p$;

      execute $p$
        create policy "Creator or admin can update before after pairs"
        on public.before_after_pairs
        for update
        to authenticated
        using (
          public.is_admin()
          or created_by::text = auth.uid()::text
        )
        with check (
          public.is_admin()
          or created_by::text = auth.uid()::text
        )
      $p$;

      execute $p$
        create policy "Creator or admin can delete before after pairs"
        on public.before_after_pairs
        for delete
        to authenticated
        using (
          public.is_admin()
          or created_by::text = auth.uid()::text
        )
      $p$;
    else
      -- Fallback for an older schema without created_by:
      -- only admins may mutate rows.
      execute $p$
        create policy "Portal users can create own before after pairs"
        on public.before_after_pairs
        for insert
        to authenticated
        with check (public.is_admin())
      $p$;

      execute $p$
        create policy "Creator or admin can update before after pairs"
        on public.before_after_pairs
        for update
        to authenticated
        using (public.is_admin())
        with check (public.is_admin())
      $p$;

      execute $p$
        create policy "Creator or admin can delete before after pairs"
        on public.before_after_pairs
        for delete
        to authenticated
        using (public.is_admin())
      $p$;
    end if;
  end if;
end
$security$;

-- Gallery objects: portal users can upload/read, but no broad object UPDATE/DELETE.
drop policy if exists "Portal users can upload before after gallery images"
  on storage.objects;
drop policy if exists "Portal users can read before after gallery images"
  on storage.objects;
drop policy if exists "Admins can upload before after gallery images"
  on storage.objects;

create policy "Portal users can upload before after gallery images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'job-images'
  and (storage.foldername(name))[1] = 'before_after_gallery'
  and public.has_booking_portal_access()
);

create policy "Portal users can read before after gallery images"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'job-images'
  and (storage.foldername(name))[1] = 'before_after_gallery'
  and public.has_booking_portal_access()
);

-- ============================================================
-- 6) BLOG COMMENTS
-- ============================================================

do $security$
begin
  if to_regclass('public.blog_comments') is not null then
    execute 'alter table public.blog_comments enable row level security';

    execute 'drop policy if exists "Anyone can submit comments" on public.blog_comments';
    execute 'drop policy if exists "Only approved comments are visible" on public.blog_comments';
    execute 'drop policy if exists "Admins can see all comments" on public.blog_comments';
    execute 'drop policy if exists "Admins can update comments" on public.blog_comments';
    execute 'drop policy if exists "Admins can delete comments" on public.blog_comments';

    execute 'drop policy if exists "Public can submit pending comments" on public.blog_comments';
    execute 'drop policy if exists "Public can read approved comments" on public.blog_comments';

    -- Critical fix: public users cannot self-insert status=approved.
    execute $p$
      create policy "Public can submit pending comments"
      on public.blog_comments
      for insert
      to anon, authenticated
      with check (
        status = 'pending'
        and char_length(name) between 1 and 120
        and char_length(email) between 3 and 254
        and char_length(comment) between 1 and 2000
      )
    $p$;

    execute $p$
      create policy "Public can read approved comments"
      on public.blog_comments
      for select
      to anon, authenticated
      using (status = 'approved')
    $p$;

    execute $p$
      create policy "Admins can see all comments"
      on public.blog_comments
      for select
      to authenticated
      using (public.is_admin())
    $p$;

    execute $p$
      create policy "Admins can update comments"
      on public.blog_comments
      for update
      to authenticated
      using (public.is_admin())
      with check (public.is_admin())
    $p$;

    execute $p$
      create policy "Admins can delete comments"
      on public.blog_comments
      for delete
      to authenticated
      using (public.is_admin())
    $p$;
  end if;
end
$security$;

-- ============================================================
-- 7) BLOG ADMIN MUTATIONS
-- ============================================================

do $security$
begin
  if to_regclass('public.blogs') is not null then
    execute 'alter table public.blogs enable row level security';

    execute 'drop policy if exists "Admins can update blogs" on public.blogs';

    execute $p$
      create policy "Admins can update blogs"
      on public.blogs
      for update
      to authenticated
      using (public.is_admin())
      with check (public.is_admin())
    $p$;
  end if;
end
$security$;

-- ============================================================
-- 8) CUSTOM CLEANING REQUESTS
-- ============================================================

do $security$
begin
  if to_regclass('public.custom_cleaning_requests') is not null then
    execute 'alter table public.custom_cleaning_requests enable row level security';

    execute 'drop policy if exists "Anyone can submit a custom cleaning request" on public.custom_cleaning_requests';
    execute 'drop policy if exists "Admins can view custom cleaning requests" on public.custom_cleaning_requests';

    execute $p$
      create policy "Anyone can submit a custom cleaning request"
      on public.custom_cleaning_requests
      for insert
      to anon, authenticated
      with check (
        status = 'new'
        and assigned_cleaner_id is null
        and admin_notes is null
        and char_length(customer_name) between 1 and 160
        and char_length(email) between 3 and 254
        and char_length(phone) between 3 and 64
        and char_length(address) between 3 and 500
        and cardinality(service_types) between 1 and 20
      )
    $p$;

    execute $p$
      create policy "Admins can view custom cleaning requests"
      on public.custom_cleaning_requests
      for select
      to authenticated
      using (public.is_admin())
    $p$;
  end if;
end
$security$;

-- Tighten anonymous upload path. Bucket-level MIME and size restrictions
-- remain defined in create_custom_cleaning_requests.sql.
drop policy if exists "Customers can attach custom cleaning photos"
  on storage.objects;

create policy "Customers can attach custom cleaning photos"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'custom-cleaning-photos'
  and (storage.foldername(name))[1]
      ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
);

drop policy if exists "Authenticated staff can view custom cleaning photos"
  on storage.objects;

create policy "Authenticated staff can view custom cleaning photos"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'custom-cleaning-photos'
  and public.is_admin()
);

-- ============================================================
-- 9) BASIC PRIVILEGE HYGIENE
-- ============================================================

revoke all on table public.security_rate_limits from public, anon, authenticated;

notify pgrst, 'reload schema';
