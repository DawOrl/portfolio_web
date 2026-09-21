-- Safe to run after the initial migration, including if it was applied earlier.
-- Supabase may grant broad privileges by default. Remove TRUNCATE and admin writes explicitly.
begin;
revoke all on public.crm_admins from anon, authenticated;
grant select on public.crm_admins to authenticated;
do $$ declare t text; begin
 foreach t in array array['crm_clients','crm_projects','crm_tasks','crm_payments','crm_offers','crm_briefs'] loop
  execute format('revoke all on public.%I from anon, authenticated',t);
  execute format('grant select, insert, update, delete on public.%I to authenticated',t);
 end loop;
end $$;
commit;
