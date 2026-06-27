# French Translation Pack

This pack prepares the French copy for Mauritius Explored without changing application code. It is designed so the later i18n implementation can use stable route, component, and entity keys rather than brittle line numbers.

## Files In This Pack

- `docs/translations/fr-copy-deck.md`: review-friendly French translation grouped by page and section.
- `docs/translations/fr-catalog.json`: implementation-ready catalog with stable keys, English source, French translation, notes, and constraints.
- `docs/translations/fr-quality-checklist.md`: final QA notes for placeholders, SEO, slugs, legal copy, and implementation readiness.

## Keying Model

Use these namespaces when implementing French later:

- `ui.shell`: navigation, footer, language switcher, account menu, global actions.
- `ui.shared`: reusable buttons, empty states, filters, loaders, errors, labels.
- `pages.{routeId}`: visible page copy grouped by App Router route.
- `seo.{routeId}`: metadata titles, descriptions, Open Graph, Twitter, and JSON-LD copy.
- `entities.beach.{slug}`: beach list/detail names, descriptions, taglines, tips, and info labels.
- `entities.place.{slug}`: place list/detail names, descriptions, taglines, tips, and info labels.
- `entities.activity.{slug}`: activity list/detail names, descriptions, highlights, inclusions, tips, and pricing labels.
- `blog.post.{slug}`: blog titles, excerpts, headings, paragraphs, category labels, and tags.
- `itineraries.{slug}`: itinerary titles, descriptions, stops, route notes, and CTAs.
- `events.{idOrSlug}`: event titles, venue text, dates, descriptions, notices, and CTA labels.
- `legal.{routeId}`: privacy policy, terms, giveaway rules, disclaimers, and consent text.
- `data.enums`: display labels for regions, seasons, category names, month names, visa statuses, and country names.

## Preservation Rules

Do not translate or change:

- Existing URL paths such as `/beaches-in-mauritius`, `/mauritius-activities`, `/top-activities-mauritius`, and `/itineraries-mauritius`.
- `slug` values, category IDs, region keys, query parameter keys or values, Supabase field names, environment variable names, import paths, component names, function names, image filenames, image paths, and external URLs.
- Brand/legal names: `Mauritius Explored`, `Planet Explored Ltd`, `BRN C16136979`.
- Place names unless French usage is already common. Keep `Ile aux Cerfs`, `Le Morne`, `Trou aux Biches`, `Flic-en-Flac`, `Grand Baie`, `Chamarel`, `Port Louis`, `Grand Bassin`, and similar names recognizable.

Translate:

- Visible UI labels, buttons, headings, helper text, filter labels, error messages, empty states, metadata titles/descriptions, JSON-LD descriptions, body copy, blog content, activity/beach/place descriptions, tips, highlights, and legal/promo copy.
- Region display labels while keeping internal keys stable.
- Dates and units for display, while preserving meaning and numeric values.

## Glossary

| English | French |
| --- | --- |
| Mauritius | Maurice |
| Mauritius Island | l'île Maurice |
| travel guide | guide de voyage |
| itinerary | itinéraire |
| itineraries | itinéraires |
| road trip | road trip |
| beaches | plages |
| places to visit | lieux à visiter |
| activities | activités |
| hidden gems | pépites cachées |
| waterfalls | cascades |
| hiking | randonnée |
| snorkeling | snorkeling |
| scuba diving | plongée sous-marine |
| kitesurfing | kitesurf |
| windsurfing | planche à voile |
| honeymoon | lune de miel |
| family-friendly | adapté aux familles |
| local tips | conseils locaux |
| insider knowledge | bons plans d'initiés |
| coming soon | bientôt disponible |
| giveaway | jeu-concours |
| privacy policy | politique de confidentialité |
| terms and conditions | conditions générales |

## Tone Guide

Use polished, natural French for travelers. Prefer a warm second-person plural style where the English speaks directly to the visitor. Keep CTAs short and action-oriented. Avoid over-formal French on discovery and itinerary pages, but keep legal and privacy pages precise and formal.

## Later Implementation Notes

- The current `LanguageSwitcher` is cosmetic and should eventually route or persist locale selection.
- French implementation should set `html lang="fr"`, Open Graph locale `fr_FR`, localized metadata, and `alternates.languages` / `hreflang`.
- If using Supabase-backed content, add French fields parallel to existing English fields rather than overwriting English values.
- Add a key parity check so every English key has a French value before shipping.
