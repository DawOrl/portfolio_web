begin;
grant usage on schema public to authenticated, service_role;
create table public.crm_admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.crm_admins enable row level security;
create policy read_self on public.crm_admins for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.crm_admins from authenticated;
grant select on public.crm_admins to authenticated;
revoke all on public.crm_admins from anon;

create table public.crm_clients (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.crm_admins(user_id),
 name text not null check (length(name) between 2 and 120), company text not null default '', email text not null default '', phone text not null default '', notes text not null default '',
 created_at timestamptz not null default now(), unique(id, owner_id)
);
create table public.crm_projects (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.crm_admins(user_id), client_id uuid not null,
 title text not null check (length(title) between 3 and 160), package text not null default 'custom' check (package in ('start','business','landing','custom')),
 stage text not null default 'inquiry' check (stage in ('inquiry','quote','accepted','progress','review','completed','archived')),
 amount bigint not null default 0 check (amount between 0 and 100000000), due_date date,
 scope text not null default '', notes text not null default '', materials_url text not null default '', source text not null default 'manual',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id, owner_id),
 foreign key(client_id, owner_id) references public.crm_clients(id, owner_id)
);
create table public.crm_tasks (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.crm_admins(user_id), project_id uuid not null,
 title text not null check(length(title) between 2 and 300), due_date date, done boolean not null default false, created_at timestamptz not null default now(),
 foreign key(project_id, owner_id) references public.crm_projects(id, owner_id) on delete cascade
);
create table public.crm_payments (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.crm_admins(user_id), project_id uuid not null,
 label text not null check(length(label) between 2 and 160), amount bigint not null check(amount between 1 and 100000000), paid_at date not null, created_at timestamptz not null default now(),
 foreign key(project_id, owner_id) references public.crm_projects(id, owner_id) on delete cascade
);
create table public.crm_offers (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.crm_admins(user_id), project_id uuid not null,
 number text not null check(length(number) between 1 and 80), title text not null, scope text not null, terms text not null,
 amount bigint not null check(amount between 1 and 100000000), deposit_percent integer not null check(deposit_percent between 0 and 100), valid_until date not null,
 status text not null default 'draft' check(status in ('draft','sent','accepted','rejected')), client_snapshot jsonb not null,
 created_at timestamptz not null default now(), unique(owner_id, number),
 foreign key(project_id, owner_id) references public.crm_projects(id, owner_id) on delete cascade
);
create table public.crm_briefs (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.crm_admins(user_id), project_id uuid not null,
 token_hash text unique not null check (length(token_hash) = 64), expires_at timestamptz not null,
 revoked boolean not null default false, answers jsonb, submitted_at timestamptz, created_at timestamptz not null default now(),
 foreign key(project_id, owner_id) references public.crm_projects(id, owner_id) on delete cascade
);
create index crm_projects_owner_date on public.crm_projects(owner_id, created_at desc);
create index crm_tasks_owner on public.crm_tasks(owner_id, due_date);
create index crm_payments_project on public.crm_payments(project_id);
create index crm_offers_project on public.crm_offers(project_id);
create index crm_briefs_project on public.crm_briefs(project_id);

-- Every row belongs to an explicitly provisioned administrator. Anonymous access is denied.
do $$ declare t text; begin
 foreach t in array array['crm_clients','crm_projects','crm_tasks','crm_payments','crm_offers','crm_briefs'] loop
  execute format('alter table public.%I enable row level security', t);
  execute format('create policy owner_only on public.%I for all to authenticated using (owner_id = (select auth.uid()) and exists (select 1 from public.crm_admins where user_id = (select auth.uid()))) with check (owner_id = (select auth.uid()) and exists (select 1 from public.crm_admins where user_id = (select auth.uid())))', t);
  execute format('revoke all on public.%I from authenticated', t);
  execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  execute format('revoke all on public.%I from anon', t);
 end loop;
end $$;

create function public.crm_touch_project() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = clock_timestamp(); return new; end $$;
create trigger crm_project_updated before update on public.crm_projects for each row execute function public.crm_touch_project();

-- Issuing a new link invalidates all unused links, but preserves completed briefs.
create function public.crm_issue_brief(p_project uuid, p_hash text) returns uuid
language plpgsql security invoker set search_path = '' as $$
declare result uuid; v_owner uuid;
begin
 select owner_id into v_owner from public.crm_projects where id=p_project for update;
 if v_owner is null then raise exception 'Project unavailable'; end if;
 update public.crm_briefs set revoked=true where project_id=p_project and submitted_at is null;
 insert into public.crm_briefs(owner_id,project_id,token_hash,expires_at)
 values(v_owner,p_project,p_hash,now()+interval '14 days') returning id into result;
 return result;
end $$;
revoke all on function public.crm_issue_brief(uuid,text) from public, anon;
grant execute on function public.crm_issue_brief(uuid,text) to authenticated;

-- Atomic compare-and-set prevents replay/concurrent replacement of a submitted brief.
create function public.crm_submit_brief(p_hash text, p_answers jsonb) returns boolean
language plpgsql security definer set search_path = '' as $$
declare n integer;
begin
 if jsonb_typeof(p_answers) <> 'object' or octet_length(p_answers::text)>120000 then return false; end if;
 update public.crm_briefs set answers=p_answers, submitted_at=now()
 where token_hash=p_hash and expires_at>now() and not revoked and submitted_at is null;
 get diagnostics n=row_count; return n=1;
end $$;
revoke all on function public.crm_submit_brief(text,jsonb) from public, anon, authenticated;
grant execute on function public.crm_submit_brief(text,jsonb) to service_role;

-- Contact capture is atomic. No partial client without its project on database failure.
create function public.crm_capture_inquiry(p_owner uuid,p_name text,p_email text,p_phone text,p_service text,p_message text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare c uuid; p uuid;
begin
 if not exists(select 1 from public.crm_admins where user_id=p_owner) then raise exception 'Unknown admin'; end if;
 insert into public.crm_clients(owner_id,name,email,phone) values(p_owner,p_name,p_email,p_phone) returning id into c;
 insert into public.crm_projects(owner_id,client_id,title,scope,source) values(p_owner,c,left(p_service || ' — ' || p_name,160),p_message,'website') returning id into p;
 return p;
end $$;
revoke all on function public.crm_capture_inquiry(uuid,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.crm_capture_inquiry(uuid,text,text,text,text,text) to service_role;
grant all on public.crm_clients,public.crm_projects,public.crm_tasks,public.crm_payments,public.crm_offers,public.crm_briefs,public.crm_admins to service_role;
commit;
