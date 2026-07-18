alter type public.user_role add value if not exists 'data_entry';

alter table public.users drop constraint if exists users_role_check;

notify pgrst, 'reload schema';
