-- ============================================================================
-- MIGRATION: Itinerary Feature — User Auth + Itinerary Persistence + Community
-- Project: mauritius-explored (Supabase project wpktirmzveoovxjqbqpq)
--
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
--
-- Creates:
--   4 tables:   profiles, user_itineraries, itinerary_stops, itinerary_ratings
--   3 triggers:  auto-create profile, update stop count, update avg rating
--   4 views:    v_admin_user_stats, v_admin_itinerary_leaderboard,
--               v_admin_signup_trend, v_admin_popular_stops
--   RLS policies on all 4 tables
-- ============================================================================


-- ============================================================================
-- 1. PROFILES
-- ============================================================================

create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text,
  avatar_url    text,
  country       text,
  bio           text,
  trip_date     date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.profiles is 'Public user profiles, auto-created on signup.';
comment on column public.profiles.trip_date is 'Next trip to Mauritius — powers countdown widget.';

alter table public.profiles enable row level security;

create policy "profiles_select_public"
  on public.profiles for select
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      ''
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture',
      ''
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();


-- ============================================================================
-- 2. USER ITINERARIES
-- ============================================================================

create table if not exists public.user_itineraries (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  title         text not null default 'My Mauritius Trip',
  slug          text unique,
  description   text,

  trip_start    date,
  trip_end      date,
  duration_days smallint generated always as (
    case
      when trip_start is not null and trip_end is not null
      then (trip_end - trip_start) + 1
      else null
    end
  ) stored,

  start_name    text,
  start_lat     double precision,
  start_lng     double precision,

  tags          text[] not null default '{}',
  is_public     boolean not null default false,
  is_featured   boolean not null default false,
  cover_image   text,

  stop_count    smallint not null default 0,
  avg_rating    numeric(3,2) not null default 0,
  rating_count  integer not null default 0,
  view_count    integer not null default 0,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.user_itineraries is 'User-created and pre-designed itineraries.';
comment on column public.user_itineraries.start_name is 'Free-form starting point name (hotel, address, etc).';
comment on column public.user_itineraries.is_featured is 'Admin-set flag for Staff Picks.';
comment on column public.user_itineraries.stop_count is 'Denormalized; auto-updated by trigger.';
comment on column public.user_itineraries.avg_rating is 'Denormalized; auto-updated by trigger.';
comment on column public.user_itineraries.rating_count is 'Denormalized; auto-updated by trigger.';

create index idx_itineraries_user
  on public.user_itineraries(user_id);

create index idx_itineraries_public
  on public.user_itineraries(is_public)
  where is_public = true;

create index idx_itineraries_rating
  on public.user_itineraries(avg_rating desc)
  where is_public = true;

create index idx_itineraries_popular
  on public.user_itineraries(view_count desc)
  where is_public = true;

create index idx_itineraries_slug
  on public.user_itineraries(slug)
  where slug is not null;

create index idx_itineraries_featured
  on public.user_itineraries(is_featured)
  where is_featured = true;

alter table public.user_itineraries enable row level security;

create policy "itineraries_select_public_or_own"
  on public.user_itineraries for select
  using (is_public = true or auth.uid() = user_id);

create policy "itineraries_insert_own"
  on public.user_itineraries for insert
  with check (auth.uid() = user_id);

create policy "itineraries_update_own"
  on public.user_itineraries for update
  using (auth.uid() = user_id);

create policy "itineraries_delete_own"
  on public.user_itineraries for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger itineraries_set_updated_at
  before update on public.user_itineraries
  for each row
  execute function public.set_updated_at();


-- ============================================================================
-- 3. ITINERARY STOPS
-- ============================================================================

create table if not exists public.itinerary_stops (
  id             uuid primary key default gen_random_uuid(),
  itinerary_id   uuid not null references public.user_itineraries(id) on delete cascade,
  day_number     smallint not null default 1,
  stop_order     smallint not null,
  item_type      text not null,
  item_slug      text not null,
  name           text not null,
  latitude       double precision,
  longitude      double precision,
  image          text,
  notes          text,
  created_at     timestamptz not null default now()
);

comment on table public.itinerary_stops is 'Individual stops within an itinerary, ordered by day and position.';
comment on column public.itinerary_stops.item_type is 'beach, activity, place, nature — extensible for future types.';
comment on column public.itinerary_stops.item_slug is 'References explored_items.slug or static data slug.';

create index idx_stops_itinerary
  on public.itinerary_stops(itinerary_id, day_number, stop_order);

create index idx_stops_item
  on public.itinerary_stops(item_slug, item_type);

alter table public.itinerary_stops enable row level security;

create policy "stops_select_if_itinerary_visible"
  on public.itinerary_stops for select
  using (
    exists (
      select 1 from public.user_itineraries
      where id = itinerary_stops.itinerary_id
        and (is_public = true or user_id = auth.uid())
    )
  );

create policy "stops_insert_own"
  on public.itinerary_stops for insert
  with check (
    exists (
      select 1 from public.user_itineraries
      where id = itinerary_stops.itinerary_id
        and user_id = auth.uid()
    )
  );

create policy "stops_update_own"
  on public.itinerary_stops for update
  using (
    exists (
      select 1 from public.user_itineraries
      where id = itinerary_stops.itinerary_id
        and user_id = auth.uid()
    )
  );

create policy "stops_delete_own"
  on public.itinerary_stops for delete
  using (
    exists (
      select 1 from public.user_itineraries
      where id = itinerary_stops.itinerary_id
        and user_id = auth.uid()
    )
  );

-- Auto-update stop_count on parent itinerary
create or replace function public.update_stop_count()
returns trigger
language plpgsql
security definer
as $$
declare
  target_id uuid;
begin
  target_id := coalesce(new.itinerary_id, old.itinerary_id);
  update public.user_itineraries
  set stop_count = (
    select count(*)::smallint
    from public.itinerary_stops
    where itinerary_id = target_id
  )
  where id = target_id;
  return null;
end;
$$;

create trigger on_stop_change
  after insert or update or delete on public.itinerary_stops
  for each row
  execute function public.update_stop_count();


-- ============================================================================
-- 4. ITINERARY RATINGS
-- ============================================================================

create table if not exists public.itinerary_ratings (
  id             uuid primary key default gen_random_uuid(),
  itinerary_id   uuid not null references public.user_itineraries(id) on delete cascade,
  user_id        uuid not null references auth.users(id) on delete cascade,
  rating         smallint not null check (rating between 1 and 5),
  comment        text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique(itinerary_id, user_id)
);

comment on table public.itinerary_ratings is 'Star ratings (1-5) + optional comments. One per user per itinerary.';

create index idx_ratings_itinerary
  on public.itinerary_ratings(itinerary_id);

create index idx_ratings_user
  on public.itinerary_ratings(user_id);

alter table public.itinerary_ratings enable row level security;

create policy "ratings_select_public"
  on public.itinerary_ratings for select
  using (true);

create policy "ratings_insert_own"
  on public.itinerary_ratings for insert
  with check (
    auth.uid() = user_id
    and auth.uid() is not null
    and not exists (
      select 1 from public.user_itineraries
      where id = itinerary_ratings.itinerary_id
        and user_id = auth.uid()
    )
  );

create policy "ratings_update_own"
  on public.itinerary_ratings for update
  using (auth.uid() = user_id);

create policy "ratings_delete_own"
  on public.itinerary_ratings for delete
  using (auth.uid() = user_id);

-- Auto-update avg_rating and rating_count on parent itinerary
create or replace function public.update_itinerary_rating()
returns trigger
language plpgsql
security definer
as $$
declare
  target_id uuid;
begin
  target_id := coalesce(new.itinerary_id, old.itinerary_id);
  update public.user_itineraries
  set
    avg_rating = coalesce(
      (select round(avg(rating)::numeric, 2)
       from public.itinerary_ratings
       where itinerary_id = target_id),
      0
    ),
    rating_count = (
      select count(*)::integer
      from public.itinerary_ratings
      where itinerary_id = target_id
    )
  where id = target_id;
  return null;
end;
$$;

create trigger on_rating_change
  after insert or update or delete on public.itinerary_ratings
  for each row
  execute function public.update_itinerary_rating();

create trigger ratings_set_updated_at
  before update on public.itinerary_ratings
  for each row
  execute function public.set_updated_at();


-- ============================================================================
-- 5. ADMIN ANALYTICS VIEWS
-- ============================================================================

-- User stats overview (for admin Users page)
create or replace view public.v_admin_user_stats as
select
  p.id as user_id,
  p.display_name,
  p.avatar_url,
  p.country,
  p.created_at as signed_up_at,
  count(distinct i.id)                                    as itinerary_count,
  count(distinct i.id) filter (where i.is_public = true)  as public_itinerary_count,
  count(distinct r.id)                                    as ratings_given
from public.profiles p
left join public.user_itineraries i on i.user_id = p.id
left join public.itinerary_ratings r on r.user_id = p.id
group by p.id, p.display_name, p.avatar_url, p.country, p.created_at;

comment on view public.v_admin_user_stats is 'Admin view: user signup details with itinerary and rating counts.';

-- Itinerary leaderboard (top rated public itineraries)
create or replace view public.v_admin_itinerary_leaderboard as
select
  i.id,
  i.title,
  i.slug,
  p.display_name as author,
  p.avatar_url   as author_avatar,
  i.stop_count,
  i.avg_rating,
  i.rating_count,
  i.view_count,
  i.is_featured,
  i.tags,
  i.duration_days,
  i.created_at
from public.user_itineraries i
join public.profiles p on p.id = i.user_id
where i.is_public = true
order by i.avg_rating desc, i.rating_count desc;

comment on view public.v_admin_itinerary_leaderboard is 'Admin view: public itineraries ranked by rating.';

-- Daily signup trend
create or replace view public.v_admin_signup_trend as
select
  date_trunc('day', created_at)::date as signup_date,
  count(*) as signups
from public.profiles
group by 1
order by 1 desc;

comment on view public.v_admin_signup_trend is 'Admin view: daily signup counts.';

-- Most popular stops across all itineraries
create or replace view public.v_admin_popular_stops as
select
  item_slug,
  item_type,
  name,
  count(*)                     as times_added,
  count(distinct itinerary_id) as in_itineraries
from public.itinerary_stops
group by item_slug, item_type, name
order by times_added desc;

comment on view public.v_admin_popular_stops is 'Admin view: most frequently added stops across all itineraries.';


-- ============================================================================
-- 6. GRANT ACCESS TO VIEWS FOR SERVICE ROLE
-- ============================================================================

-- Views are accessible via the service role key (admin portal).
-- Anon/authenticated users cannot query views directly since
-- the underlying tables have RLS and views respect RLS by default.
-- The admin portal uses the service_role key which bypasses RLS.


-- ============================================================================
-- VERIFICATION QUERIES (run these after migration to confirm success)
-- ============================================================================

-- Uncomment and run individually to verify:

-- select count(*) as profile_count from public.profiles;
-- select count(*) as itinerary_count from public.user_itineraries;
-- select count(*) as stop_count from public.itinerary_stops;
-- select count(*) as rating_count from public.itinerary_ratings;

-- Check triggers exist:
-- select trigger_name, event_object_table
-- from information_schema.triggers
-- where trigger_schema = 'public'
-- order by event_object_table, trigger_name;

-- Check views exist:
-- select table_name from information_schema.views
-- where table_schema = 'public' and table_name like 'v_admin_%';

-- Check RLS is enabled:
-- select tablename, rowsecurity
-- from pg_tables
-- where schemaname = 'public'
--   and tablename in ('profiles', 'user_itineraries', 'itinerary_stops', 'itinerary_ratings');
