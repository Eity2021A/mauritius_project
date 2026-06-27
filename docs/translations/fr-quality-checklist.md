# French Translation QA Checklist

## Completed Checks

- Stable key namespaces are defined in `fr-translation-pack.md` and used in `fr-catalog.json`.
- The review deck keeps English and French side by side so wording can be approved before implementation.
- URL paths, slugs, image paths, external URLs, component names, import paths, schema fields, and environment variables are documented as non-translatable.
- Placeholder examples are preserved, including `%s`, `{year}`, and `{language}`.
- Core navigation, footer, language switcher, homepage, explore, listing filters, detail chrome, itinerary UI, account/trip UI, giveaway UI, blog UI, visa UI, best-time UI, about, contact, legal headings, region labels, category labels, seasons, cyclone labels, and months have French copy.
- Proper names are preserved where changing them would break recognition or SEO, including `Mauritius Explored`, `Planet Explored Ltd`, `Le Morne`, `Trou aux Biches`, `Flic-en-Flac`, `Grand Baie`, `Ile aux Cerfs`, `Chamarel`, `Port Louis`, and `Grand Bassin`.

## SEO Notes

- French root title proposal: `Mauritius Explored - Découvrez l'île paradisiaque | Guide de voyage 2026`.
- French root description proposal is natural but may exceed ideal SERP length depending on final metadata implementation. Review to keep important keywords early.
- Later code implementation should use `html lang="fr"`, `openGraph.locale = "fr_FR"`, localized `alternates.languages`, and localized sitemap entries.
- Existing English route paths can remain for the first implementation if the site uses `/fr/...` locale routing with stable slugs. Translating route slugs should be a separate SEO migration, not part of this translation pack.

## Legal Notes

- The privacy policy, terms, and giveaway terms are translated as editorial drafts only.
- Before publishing French legal copy, have a human/legal reviewer confirm accuracy, especially for GDPR language, limitation of liability, giveaway eligibility, prize obligations, and governing law.

## Implementation Notes

- `fr-copy-deck.md` is the review source for human approval.
- `fr-catalog.json` is the starting point for dictionaries, but long-form entity/blog/legal fields should be expanded into the same keying pattern during implementation.
- For Supabase-backed content, add French fields parallel to English content rather than replacing English source fields.
- Region and category labels should be translated through display maps, not by renaming internal keys.
- Country names from `src/data/countries.json` should be localized through a country-label map or locale-aware display utility.

## Final Manual Review Before Shipping

- Confirm every English key in the implementation dictionary has a French value.
- Confirm placeholder sets match exactly between English and French.
- Confirm translated metadata fits title and description length targets.
- Confirm all accent characters render correctly with the selected font subsets.
- Confirm mobile navigation still fits after longer French labels.
- Confirm pluralization for saved itineraries, views, stops, days, and counts uses French plural rules.
- Confirm no French copy changed a route path, slug, query parameter, schema field, or image path.
