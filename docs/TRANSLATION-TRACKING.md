# Translation Tracking

This file tracks page-by-page translation work for the multilingual site.

## Languages

- English (`en`)
- French (`fr`)
- German (`de`)
- Italian (`it`)
- Spanish (`es`)
- Russian (`ru`)

## Already Translated Before This Tracker

- Shared navigation: `Nav`
- Footer: `Footer`
- Common UI labels: `Common`
- Shared buttons/actions: `Buttons`
- Language switcher: `LanguageSwitcher`

## Page Translation Queue

| Status | Page / Area | Route / File | Notes |
| --- | --- | --- | --- |
| Done | Homepage | `src/app/[locale]/page.tsx` | First page pass: intro, section headings, service cards, CTA, stats |
| Pending | SEO metadata | `src/lib/seo.ts`, page metadata exports | Titles/descriptions after visible page text |
| Done | Blog index | `src/app/[locale]/blog/page.tsx` | Blog page UI, grid labels, filter sheet, metadata and Blog schema translated; article titles/excerpts need separate blog-data pass |
| Done | Beaches hub | `src/app/[locale]/beaches-in-mauritius` | Hub UI, filters, intro, schema and layout metadata translated; shared beach card descriptions need separate data pass |
| Done | Places hub | `src/app/[locale]/best-places-to-visit-in-mauritius` | Hub UI, filters, tips, schema and layout metadata translated; shared place card descriptions need separate data pass |
| Done | Activities hub | `src/app/[locale]/mauritius-activities` | Hub UI, filters, CTA, schema and layout metadata translated; shared activity card descriptions need separate data pass |
| Done | Travel guide pages | Port Louis, North, South, East, West, Central guides | Fixed guide pages wired to multilingual copy |
| Done | Planning pages | Travel Planner, Family Holiday Guide, Best Time, Visa, Festivals | High SEO/planning pages translated |
| Done | Transport pages | Taxi, Transfer, Car Rental | Full visible copy, metadata, schemas, cards, fares, FAQ and transfer form translated |
| Done | Pocket Guide | `src/app/[locale]/pocket-guide/page.tsx` | Full visible page copy, metadata, FAQ/Product schema translated |
| Done | Search | `src/app/[locale]/search/page.tsx` | Page UI, metadata, result labels and static search cards translated |
| Done | Itinerary pages | Itinerary hub and roadtrip pages | Main hub, roadtrip list, itinerary alias, detail views and create-itinerary UI translated |
| Done | Exploring place guides | Grand Baie, Chamarel, Mahébourg, Le Morne & Chamarel | Fixed place guide pages wired to multilingual copy |
| Done | Main info pages | About, Contact, FAQ, Privacy Policy, Media Kit, Events | Full visible page copy, metadata where supported, and event UI labels translated |
| Done | Utility pages | Beach Finder, Mauritius by Car, eSIM & Internet, Mauritius Road Trips, My Trips | Full visible copy where present plus metadata/action labels translated |
| Done | Activity article pages | Best-of, culture, nature, wildlife, food and snorkel guides | Exact body/card sentence translations added across French, German, Italian, Spanish and Russian; true place names are preserved |
| Done | Remaining static/tools pages | Mauritius Island, Top 15, giveaway terms | Wired through the static page localizer for 6-language visible text coverage |
| Done | Remaining static/tool shell pages | Conquer Le Morne, Top Activities metadata, checkout metadata, AI itinerary, explore redirects, Veranda hotels hub/detail | Static labels, metadata where applicable, generated AI itinerary states and Veranda hub/detail UI translated in 6 languages |
| Done | Main remaining frontend templates | Visa, giveaway, transport pages, blog/detail slugs, beach/detail slugs, activity/detail slugs, place/detail slugs | Verified as frontend routes; fixed visible template labels, form labels, category badges, country-name localization and detail-page helper copy in 6 languages |
| Pending | Forms/errors | Form validation and state messages | After main page copy |
| Pending | Image alt/captions | Data files and page image labels | Final polish pass |

## Completed

- Homepage: `src/app/[locale]/page.tsx`
  - Added `Home` namespace in all language files.
  - Translated intro, photo mosaic heading, itinerary section labels, service cards, CTA and stats.
- Pocket Guide: `src/app/[locale]/pocket-guide/page.tsx`
  - Added `PocketGuide` namespace in all language files.
  - Translated metadata, product schema text, FAQ schema, stats, reasons, inside cards, CTA blocks and image alt text.
- Beaches hub: `src/app/[locale]/beaches-in-mauritius`
  - Added `BeachesHub` namespace in all language files.
  - Translated hero, intro, filter labels, empty states, mobile filter controls, region/category labels, ItemList schema text and layout metadata.
- Places hub: `src/app/[locale]/best-places-to-visit-in-mauritius`
  - Added `PlacesHub` namespace in all language files.
  - Translated hero, filters, empty states, mobile filter controls, region/category labels, tips block, ItemList schema text and layout metadata.
- Activities hub: `src/app/[locale]/mauritius-activities`
  - Added `ActivitiesHub` namespace in all language files.
  - Translated hero, intro, filters, empty states, mobile filter controls, region/category labels, CTA, ItemList schema text and layout metadata.
- Search: `src/app/[locale]/search/page.tsx`
  - Added `SearchPage` namespace in all language files.
  - Translated metadata, heading, form labels, result summary, result type labels and static guide cards.
- Blog index: `src/app/[locale]/blog/page.tsx`
  - Added `BlogIndex` namespace in all language files.
  - Translated metadata, Blog schema, hero, newsletter CTA, author box, category/tag filters, mobile filter sheet, search labels, result labels and listing headings.
- Travel Planner: `src/app/[locale]/travel-planner/page.tsx`
  - Added `TravelPlanner` namespace in all language files.
  - Translated metadata, hero, timing cards, arrival checklist, coast cards and supporting labels.
- Family Holiday Guide: `src/app/[locale]/family-holiday-guide-for-mauritius-island/page.tsx`
  - Added `FamilyHolidayGuide` namespace in all language files.
  - Translated metadata, hero, family paradise cards, best-time cards, budget cards, adventure cards and coast cards.
- Best Time to Visit: `src/app/[locale]/best-time-to-visit-to-mauritius/page.tsx`
  - Added `BestTimeToVisit` namespace in all language files.
  - Translated metadata, hero, intro, weather labels, month selector, month summaries, FAQ, seasonal copy, activity cards and CTA.
- Visa Requirements: `src/app/[locale]/visa-requirements/page.tsx`
  - Added `VisaRequirements` namespace in all language files.
  - Translated hero, date label, visa type cards, source labels, popular nationality cards, filters, badges, FAQ and important notes.
- Festivals: `src/app/[locale]/festivals-in-mauritius/page.tsx`
  - Added `Festivals` namespace in all language files.
  - Translated metadata, hero, intro, festival cards, visitor tips, event schema copy and CTA.
- Transport pages: Car Rental, Transfer, Taxi
  - Added `src/data/transport-translations.ts` for English, French, German, Italian, Spanish and Russian transport copy.
  - Translated Car Rental page metadata, hero, offer block, vehicle category labels, add-ons, driving notes, FAQ and road-trip section labels.
  - Translated Transfer page metadata, how-it-works cards, transfer type cards, trust notice, fares, FAQ and full request form labels/messages.
  - Translated Taxi page metadata, service list, trust notice, comfort/help cards, fare section, FAQ and road-trip section labels.
- Mauritius Itinerary hub: `src/app/[locale]/mauritius-itinerary/page.tsx`
  - Added `src/data/itinerary-translations.ts` for English, French, German, Italian, Spanish and Russian itinerary hub copy.
  - Translated metadata, Article/Breadcrumb/ItemList schema text, hero, intro, day selector, route summary card, planning notes, section headings, stay regions, travel tips, FAQ and CTA.
- Itinerary menu pages and builder UI
  - Reused `src/data/itinerary-translations.ts` for roadtrip/list/detail/create itinerary labels.
  - Translated `src/app/[locale]/roadtrip-mauritius/page.tsx` and `src/app/[locale]/itineraries/page.tsx` metadata, hero, filters, create card, community section and stop labels.
  - Translated shared itinerary detail UI in `src/components/ItineraryDetailView.tsx` and `src/components/SharedItineraryDetailView.tsx`.
  - Translated create-itinerary builder UI in `src/app/[locale]/roadtrip-mauritius/create/page.tsx`.
  - Added `src/data/localized-predesigned-itineraries.ts` for predesigned itinerary card/detail titles, subtitles, intro text, tips and region labels.
- Port Louis and regional travel guides
  - Added `src/data/quick-guide-translations.ts` for English, French, German, Italian, Spanish and Russian guide copy.
  - Translated `src/app/[locale]/a-day-in-port-louis/page.tsx`.
  - Translated `src/app/[locale]/north-mauritius-travel-guide/page.tsx`.
  - Translated `src/app/[locale]/south-mauritius-travel-guide/page.tsx`.
  - Translated `src/app/[locale]/east-mauritius-travel-guide/page.tsx`.
  - Translated `src/app/[locale]/west-mauritius-travel-guide/page.tsx`.
  - Translated `src/app/[locale]/central-mauritius-travel-guide/page.tsx`.
- Exploring place guides
  - Added `src/data/exploring-guide-translations.ts` for English, French, German, Italian, Spanish and Russian exploring guide copy.
  - Translated `src/app/[locale]/exploring-grandbaie/page.tsx`.
  - Translated `src/app/[locale]/exploring-chamarel/page.tsx`.
  - Translated `src/app/[locale]/exploring-mahebourg/page.tsx`.
  - Translated `src/app/[locale]/le-morne-and-chamarel/page.tsx`.
- Main info pages
  - Added `src/data/main-info-translations.ts` for About, Contact, Privacy Policy, Media Kit and Events page copy in English, French, German, Italian, Spanish and Russian.
  - Added `src/data/faq-info-translations.ts` for FAQ page copy in English, French, German, Italian, Spanish and Russian.
  - Translated `src/app/[locale]/about/page.tsx`.
  - Translated `src/app/[locale]/contact/page.tsx`.
  - Translated `src/app/[locale]/faq-about-mauritius/page.tsx`.
  - Translated `src/app/[locale]/privacy-policy/page.tsx`.
  - Translated `src/app/[locale]/media-kit/page.tsx`.
  - Translated `src/app/[locale]/events-in-mauritius/page.tsx` and the event calendar/detail labels in `src/components/events/EventsInteractiveSection.tsx`.
- Utility pages
  - Added `src/data/utility-page-translations.ts` for English, French, German, Italian, Spanish and Russian utility-page copy.
  - Translated `src/app/[locale]/mauritius-beach-finder/page.tsx`.
  - Translated `src/app/[locale]/mauritius-esim-and-internet/page.tsx`.
  - Added localized metadata for `src/app/[locale]/mauritius-by-car/page.tsx`.
  - Added localized metadata for `src/app/[locale]/mauritius-road-trips/page.tsx`.
  - Translated `src/app/[locale]/my-trips/page.tsx` and the share title in `src/app/[locale]/my-trips/ShareItineraryButton.tsx`.
- Activity and editorial guide pages
  - Added `src/lib/static-page-localizer.tsx` to localize existing static guide layouts without changing their design blocks.
  - Wired localization into `src/app/[locale]/best-beaches-of-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/best-catamaran-cruises-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/best-hikes-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/best-markets-of-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/best-waterfalls-of-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/cultural-places-of-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/nature-reserves-and-parks-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/secret-places-to-discover-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/seven-waterfalls-hike/page.tsx`.
  - Wired localization into `src/app/[locale]/swim-with-sea-turtles-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/whales-and-dolphins-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/where-to-eat-beach-restaurants-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/where-to-see-monkeys-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/where-to-snorkel-in-mauritius/page.tsx`.
  - Added guide-polish labels for the 14 activity and editorial guide pages in French, German, Italian, Spanish and Russian.
  - Removed unsafe phrase/word fallback after audit showed it could create mixed-language sentences.
  - Added exact French sentence translations for the remaining guide card/body copy, including the waterfall cards shown in the French audit screenshot.
  - Current audit for the 14 guide pages: French has only proper-name holdouts; German, Italian, Spanish and Russian still need exact body/card sentence dictionaries before they can be marked complete.
  - Completed exact German, Italian, Spanish and Russian body/card sentence pass for `best-beaches-of-mauritius`, `best-catamaran-cruises-in-mauritius` and `best-hikes-in-mauritius`.
  - Completed exact French, German, Italian, Spanish and Russian body/card sentence pass for `best-markets-of-mauritius`, `best-waterfalls-of-mauritius`, `cultural-places-of-mauritius`, `nature-reserves-and-parks-in-mauritius`, `secret-places-to-discover-in-mauritius`, `seven-waterfalls-hike`, `swim-with-sea-turtles-in-mauritius`, `whales-and-dolphins-in-mauritius`, `where-to-eat-beach-restaurants-in-mauritius`, `where-to-see-monkeys-in-mauritius` and `where-to-snorkel-in-mauritius`.
  - Final source audit leaves only true place names such as `Allée de Beau Vallon`, `Île aux Aigrettes` and `La Cambuse` unchanged by design.
- Remaining static and tool pages
  - Wired localization into `src/app/[locale]/conquer-le-morne/page.tsx`.
  - Wired localization into `src/app/[locale]/mauritius-island/page.tsx`.
  - Wired localization into `src/app/[locale]/top-15-things-to-do-in-mauritius/page.tsx`.
  - Added localized metadata for `src/app/[locale]/top-activities-in-mauritius/page.tsx`.
  - Wired localization into `src/app/[locale]/giveaway/terms/page.tsx`.
  - Added localized metadata for `src/app/[locale]/pocket-guide/checkout/page.tsx`.
  - Added client-side localized labels for `src/app/[locale]/roadtrip-mauritius/ai-generate/page.tsx`.
  - Confirmed `src/app/[locale]/explore/page.tsx` reuses the already-translated `AcrossMauritius` component.
  - Confirmed `src/app/[locale]/explore/beaches/page.tsx` redirects to the translated beaches hub.
  - Confirmed `src/app/[locale]/explore/activities/page.tsx` redirects to the translated activities hub.
  - Wired localization into `src/app/[locale]/veranda-hotels/page.tsx`.
  - Added completion translations for Conquer Le Morne static body labels.
  - Added localized generated AI itinerary titles, loading labels and result tips in `src/app/[locale]/roadtrip-mauritius/ai-generate/page.tsx`.
  - Added localized static labels and metadata text for `src/app/[locale]/veranda-hotels/[slug]/page.tsx`.
  - Added completion translations for the Veranda hotels hub UI.
- Remaining frontend translation review batch
  - Confirmed requested routes are frontend pages under `src/app/[locale]`.
  - Added `src/data/detail-page-translations.ts` for shared detail-page and giveaway labels in English, French, German, Italian, Spanish and Russian.
  - Translated visible giveaway form text, social-share labels, terms text, submit states and dropdown labels in `src/app/[locale]/giveaway/page.tsx`.
  - Added localized country display names on `src/app/[locale]/visa-requirements/page.tsx`; coverage check confirms every visa country has a mapping.
  - Localized category badges in `src/components/ui/CategoryBadges.tsx` for detail templates.
  - Localized fixed labels on `src/app/[locale]/blog/[slug]/page.tsx`, including share text, table of contents, author box, newsletter CTA and related article labels.
  - Localized fixed labels on `src/app/[locale]/beaches-in-mauritius/[slug]/page.tsx`, including gallery, info card, availability labels, hotels and related beach copy.
  - Localized fixed labels on `src/app/[locale]/top-activities-mauritius/[slug]/page.tsx`, including booking notes, highlights, included, what to bring, pricing, info card and related activity copy.
  - Localized fixed labels on `src/app/[locale]/best-places-to-visit-in-mauritius/[slug]/page.tsx`, including gallery, info card, booking note and related place copy.
  - Re-confirmed transport pages use the existing 6-language `src/data/transport-translations.ts` copy.
  - Added `src/data/system-page-translations.ts` for English, French, German, Italian, Spanish and Russian system text.
  - Localized `src/app/[locale]/error.tsx`, `src/app/[locale]/not-found.tsx`, `src/app/[locale]/giveaway/loading.tsx` and `src/app/[locale]/roadtrip-mauritius/loading.tsx`.
  - Localized remaining static layout metadata for Best Time to Visit, FAQ, Giveaway, Mauritius Island, Visa Requirements, AI itinerary generator and Create Itinerary.
  - Localized shared itinerary social metadata in `src/app/[locale]/roadtrip-mauritius/shared/[slug]/page.tsx`.
  - Latest route scan result: no obvious untranslated frontend route files without a localization source.
