-- ============================================================================
-- MIGRATION 004: Giveaway entries — country instead of answer, terms flag
-- ============================================================================

-- Drop dependent view before altering columns
drop view if exists public.v_admin_giveaway_entries;

-- Add country; backfill from legacy answer column before drop
alter table public.giveaway_entries add column if not exists country text;

update public.giveaway_entries
set country = coalesce(nullif(trim(answer), ''), '—')
where country is null;

alter table public.giveaway_entries alter column country set not null;

alter table public.giveaway_entries drop column if exists answer;

alter table public.giveaway_entries add column if not exists agreed_to_terms boolean not null default false;

-- Historical rows: treat as having agreed (legacy form)
update public.giveaway_entries set agreed_to_terms = true where agreed_to_terms = false;

comment on column public.giveaway_entries.country is 'Participant country of residence (from select).';
comment on column public.giveaway_entries.agreed_to_terms is 'User agreed to giveaway terms and conditions at entry time.';

create or replace view public.v_admin_giveaway_entries as
select
  id,
  giveaway_slug,
  full_name,
  email,
  country,
  agreed_to_terms,
  shared_facebook,
  shared_instagram,
  created_at
from public.giveaway_entries
order by created_at desc;
