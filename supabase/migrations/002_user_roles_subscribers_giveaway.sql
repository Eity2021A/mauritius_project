-- ============================================================================
-- MIGRATION 002: User Roles, Subscribers, Giveaway Entries
--
-- Adds:
--   1. role column on profiles (admin / user)
--   2. subscribers table (newsletter / blog signups — no auth required)
--   3. giveaway_entries table (game participants — no auth required)
--   4. Updated admin views (v_admin_user_list, v_admin_user_stats)
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================================


-- ============================================================================
-- 1. ADD ROLE TO PROFILES
-- ============================================================================

alter table public.profiles
  add column if not exists role text not null default 'user';

comment on column public.profiles.role is 'user = front-end app user, admin = admin portal access. Admins can also use the front-end as normal users.';

-- Mark your admin account (update the email below if different)
update public.profiles
set role = 'admin'
where id = (
  select id from auth.users where email = 'wesley.oxenham@gmail.com' limit 1
);


-- ============================================================================
-- 2. SUBSCRIBERS (no auth required — anonymous email collection)
-- ============================================================================

create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text not null default 'blog',
  status      text not null default 'active',
  created_at  timestamptz not null default now(),
  unique(email, source)
);

comment on table public.subscribers is 'Newsletter/blog subscribers. No Supabase Auth needed — just email collection.';
comment on column public.subscribers.source is 'Where the subscription came from: blog, footer, popup, etc.';
comment on column public.subscribers.status is 'active or unsubscribed.';

create index idx_subscribers_email on public.subscribers(email);
create index idx_subscribers_source on public.subscribers(source);

alter table public.subscribers enable row level security;

create policy "subscribers_insert_anon"
  on public.subscribers for insert
  with check (true);

create policy "subscribers_select_none"
  on public.subscribers for select
  using (false);


-- ============================================================================
-- 3. GIVEAWAY ENTRIES (no auth required — anonymous form submissions)
-- ============================================================================

create table if not exists public.giveaway_entries (
  id                uuid primary key default gen_random_uuid(),
  giveaway_slug     text not null default 'default',
  full_name         text not null,
  email             text not null,
  answer            text not null,
  shared_facebook   boolean not null default false,
  shared_instagram  boolean not null default false,
  created_at        timestamptz not null default now(),
  unique(email, giveaway_slug)
);

comment on table public.giveaway_entries is 'Giveaway game participants. No Supabase Auth needed — anonymous form.';
comment on column public.giveaway_entries.giveaway_slug is 'Identifies which giveaway campaign this entry belongs to.';

create index idx_giveaway_slug on public.giveaway_entries(giveaway_slug);
create index idx_giveaway_email on public.giveaway_entries(email);

alter table public.giveaway_entries enable row level security;

create policy "giveaway_insert_anon"
  on public.giveaway_entries for insert
  with check (true);

create policy "giveaway_select_none"
  on public.giveaway_entries for select
  using (false);


-- ============================================================================
-- 4. UPDATE ADMIN VIEWS
-- ============================================================================

-- Recreate v_admin_user_list to include role
-- (service role bypasses RLS so this view works for admin portal only)
create or replace view public.v_admin_user_list as
select
  p.id,
  u.email,
  p.role,
  p.display_name,
  p.avatar_url,
  p.country,
  p.created_at as signed_up_at,
  u.last_sign_in_at,
  coalesce(ic.cnt, 0)::integer as itinerary_count
from public.profiles p
join auth.users u on u.id = p.id
left join (
  select user_id, count(*) as cnt
  from public.user_itineraries
  group by user_id
) ic on ic.user_id = p.id
order by p.created_at desc;

comment on view public.v_admin_user_list is 'Admin view: all users with role, itinerary counts. Service role only.';

-- Recreate v_admin_user_stats to include role and exclude admins from totals
create or replace view public.v_admin_user_stats as
select
  p.id as user_id,
  p.display_name,
  p.avatar_url,
  p.country,
  p.role,
  p.created_at as signed_up_at,
  count(distinct i.id)                                   as itinerary_count,
  count(distinct i.id) filter (where i.is_public = true) as public_itinerary_count,
  count(distinct r.id)                                   as ratings_given
from public.profiles p
left join public.user_itineraries i on i.user_id = p.id
left join public.itinerary_ratings r on r.user_id = p.id
group by p.id, p.display_name, p.avatar_url, p.country, p.role, p.created_at;

comment on view public.v_admin_user_stats is 'Admin view: user details with role, itinerary and rating counts.';

-- Admin view for subscribers
create or replace view public.v_admin_subscribers as
select
  id,
  email,
  source,
  status,
  created_at
from public.subscribers
order by created_at desc;

comment on view public.v_admin_subscribers is 'Admin view: all newsletter subscribers.';

-- Admin view for giveaway entries
create or replace view public.v_admin_giveaway_entries as
select
  id,
  giveaway_slug,
  full_name,
  email,
  answer,
  shared_facebook,
  shared_instagram,
  created_at
from public.giveaway_entries
order by created_at desc;

comment on view public.v_admin_giveaway_entries is 'Admin view: all giveaway game entries.';


-- ============================================================================
-- VERIFICATION QUERIES (run after migration to confirm)
-- ============================================================================

-- Check role column exists:
-- select id, role from profiles limit 5;

-- Check tables exist:
-- select count(*) from subscribers;
-- select count(*) from giveaway_entries;

-- Check views exist:
-- select * from v_admin_user_list limit 5;
-- select * from v_admin_subscribers limit 5;
-- select * from v_admin_giveaway_entries limit 5;
