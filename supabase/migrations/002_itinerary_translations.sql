-- Itinerary translations for public/shared itinerary pages.
-- Matches the blog translation pattern: one row per locale with English fallback in frontend code.

create table if not exists public.user_itinerary_translations (
  id               uuid primary key default gen_random_uuid(),
  itinerary_id     uuid not null references public.user_itineraries(id) on delete cascade,
  locale           text not null check (locale in ('en', 'fr', 'de', 'it', 'es', 'ru')),
  title            text,
  subtitle         text,
  description      text,
  intro_paragraphs text[],
  info_points      text[],
  seo_title        text,
  seo_description  text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (itinerary_id, locale)
);

create table if not exists public.itinerary_stop_translations (
  id          uuid primary key default gen_random_uuid(),
  stop_id     uuid not null references public.itinerary_stops(id) on delete cascade,
  locale      text not null check (locale in ('en', 'fr', 'de', 'it', 'es', 'ru')),
  name        text,
  notes       text,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (stop_id, locale)
);

create index if not exists idx_user_itinerary_translations_lookup
  on public.user_itinerary_translations(itinerary_id, locale);

create index if not exists idx_itinerary_stop_translations_lookup
  on public.itinerary_stop_translations(stop_id, locale);

alter table public.user_itinerary_translations enable row level security;
alter table public.itinerary_stop_translations enable row level security;

create policy "itinerary_translations_select_if_itinerary_visible"
  on public.user_itinerary_translations for select
  using (
    exists (
      select 1 from public.user_itineraries
      where id = user_itinerary_translations.itinerary_id
        and (is_public = true or user_id = auth.uid())
    )
  );

create policy "itinerary_translations_insert_own"
  on public.user_itinerary_translations for insert
  with check (
    exists (
      select 1 from public.user_itineraries
      where id = user_itinerary_translations.itinerary_id
        and user_id = auth.uid()
    )
  );

create policy "itinerary_translations_update_own"
  on public.user_itinerary_translations for update
  using (
    exists (
      select 1 from public.user_itineraries
      where id = user_itinerary_translations.itinerary_id
        and user_id = auth.uid()
    )
  );

create policy "itinerary_translations_delete_own"
  on public.user_itinerary_translations for delete
  using (
    exists (
      select 1 from public.user_itineraries
      where id = user_itinerary_translations.itinerary_id
        and user_id = auth.uid()
    )
  );

create policy "stop_translations_select_if_itinerary_visible"
  on public.itinerary_stop_translations for select
  using (
    exists (
      select 1
      from public.itinerary_stops s
      join public.user_itineraries i on i.id = s.itinerary_id
      where s.id = itinerary_stop_translations.stop_id
        and (i.is_public = true or i.user_id = auth.uid())
    )
  );

create policy "stop_translations_insert_own"
  on public.itinerary_stop_translations for insert
  with check (
    exists (
      select 1
      from public.itinerary_stops s
      join public.user_itineraries i on i.id = s.itinerary_id
      where s.id = itinerary_stop_translations.stop_id
        and i.user_id = auth.uid()
    )
  );

create policy "stop_translations_update_own"
  on public.itinerary_stop_translations for update
  using (
    exists (
      select 1
      from public.itinerary_stops s
      join public.user_itineraries i on i.id = s.itinerary_id
      where s.id = itinerary_stop_translations.stop_id
        and i.user_id = auth.uid()
    )
  );

create policy "stop_translations_delete_own"
  on public.itinerary_stop_translations for delete
  using (
    exists (
      select 1
      from public.itinerary_stops s
      join public.user_itineraries i on i.id = s.itinerary_id
      where s.id = itinerary_stop_translations.stop_id
        and i.user_id = auth.uid()
    )
  );

create trigger user_itinerary_translations_set_updated_at
  before update on public.user_itinerary_translations
  for each row
  execute function public.set_updated_at();

create trigger itinerary_stop_translations_set_updated_at
  before update on public.itinerary_stop_translations
  for each row
  execute function public.set_updated_at();
