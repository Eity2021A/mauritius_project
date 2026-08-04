# Itinerary Translation Tracking

## Implemented

- `roadtrip-mauritius` featured itinerary cards now pass the active locale into the featured itinerary loader.
- `roadtrip-mauritius` community itinerary cards now pass the active locale into the public itinerary loader.
- `itineraries/[slug]` featured itinerary detail pages now load itinerary data with the active locale.
- `roadtrip-mauritius/shared/[slug]` shared itinerary detail pages and metadata now load itinerary data with the active locale.
- Frontend/server loaders now fall back to English when the selected locale translation is missing.
- Supabase migration added for `user_itinerary_translations` and `itinerary_stop_translations`.

## Translation Tables

- `user_itinerary_translations`: stores itinerary-level translated `title`, `subtitle`, `description`, `intro_paragraphs`, `info_points`, `seo_title`, and `seo_description`.
- `itinerary_stop_translations`: stores translated stop `name`, `notes`, and `description`.

## Locales

- `en`
- `fr`
- `de`
- `it`
- `es`
- `ru`

## Still Needed In Admin/Data

- Insert translation rows for each public or featured itinerary in all required locales.
- Insert translation rows for each itinerary stop when stop names or notes should change by language.
