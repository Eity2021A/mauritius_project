-- ============================================================================
-- MIGRATION 003: Admin user views from auth.users
--
-- Why:
-- - Ensure every authenticated user appears in admin user lists.
-- - Keep email sourced directly from auth.users for all login providers
--   (magic link, Google, Facebook).
-- - Avoid dropping users from admin views when a profile row is missing.
-- ============================================================================

create or replace view public.v_admin_user_list as
select
  u.id,
  u.email,
  coalesce(p.role, 'user') as role,
  p.display_name,
  p.avatar_url,
  p.country,
  coalesce(p.created_at, u.created_at) as signed_up_at,
  u.last_sign_in_at,
  coalesce(ic.cnt, 0)::integer as itinerary_count
from auth.users u
left join public.profiles p on p.id = u.id
left join (
  select user_id, count(*) as cnt
  from public.user_itineraries
  group by user_id
) ic on ic.user_id = u.id
order by coalesce(p.created_at, u.created_at) desc;

comment on view public.v_admin_user_list is
  'Admin view: all auth users with email, role, profile fields, itinerary counts.';

create or replace view public.v_admin_user_stats as
select
  u.id as user_id,
  p.display_name,
  p.avatar_url,
  p.country,
  coalesce(p.role, 'user') as role,
  coalesce(p.created_at, u.created_at) as signed_up_at,
  count(distinct i.id)                                   as itinerary_count,
  count(distinct i.id) filter (where i.is_public = true) as public_itinerary_count,
  count(distinct r.id)                                   as ratings_given
from auth.users u
left join public.profiles p on p.id = u.id
left join public.user_itineraries i on i.user_id = u.id
left join public.itinerary_ratings r on r.user_id = u.id
group by
  u.id,
  p.display_name,
  p.avatar_url,
  p.country,
  coalesce(p.role, 'user'),
  coalesce(p.created_at, u.created_at);

comment on view public.v_admin_user_stats is
  'Admin view: auth users with profile fields, itinerary and rating counts.';
