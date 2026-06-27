# Finding and Validating Accurate Coordinates for Map Pins

This document describes the process to find and validate GPS coordinates for places (beaches, attractions, landmarks) used on itinerary and map views in Mauritius Explored. Use this when adding new places or when a user reports that an icon’s position on the map looks wrong.

---

## 1. Where coordinates are stored

- **`src/data/itinerary-pool.ts`**  
  `PLACE_POSITIONS` – single source of truth for **places** that don’t have position elsewhere. Keys are place slugs (e.g. `caudan-waterfront`, `national-post`, `citadel-fort`). Values are `[latitude, longitude]` in decimal degrees.

- **`src/data/predesigned-itineraries.ts`**  
  Each stop in an itinerary has a `position: [lat, lng]`. For **pre-designed itineraries**, keep these in sync with `PLACE_POSITIONS` for the same slug (or with `itinerary.ts` / `beaches.ts` for beaches).

- **`src/data/itinerary.ts`**  
  `ITINERARY_BEACHES` – positions for beaches used in the itinerary builder.

- **`src/data/beaches.ts`**  
  `TOP_BEACHES` and region beach lists – some entries include `position`.

When you fix or add a coordinate, update **every** place that uses it (e.g. both `itinerary-pool.ts` and the relevant stop in `predesigned-itineraries.ts`).

---

## 2. How to find accurate coordinates

### Step 1: Identify the exact place

- Use the **place slug** and **display name** from `place-details.ts` or the itinerary.
- Be clear which building or feature you want (e.g. “historic General Post Office with clock tower” vs “Mauritius Post HQ”).

### Step 2: Prefer authoritative or precise sources

Use in this order when possible:

1. **GeoHack (Wikipedia)**  
   - URL pattern: `https://geohack.toolforge.org/geohack.php?pagename=PLACE_NAME&params=...`  
   - Or search: `"Place Name" site:geohack.toolforge.org` or `"Place Name" GeoHack coordinates`.  
   - GeoHack gives decimal degrees and links to OSM/Google Maps for visual check.

2. **Wikipedia**  
   - Article or infobox often has coordinates in DMS or decimal.  
   - Search: `"Place Name" Mauritius coordinates latitude longitude` or `"Place Name" Wikipedia`.

3. **Official / heritage sources**  
   - Government, UNESCO, national heritage, or tourism authority pages that state GPS or “exact location”.

4. **OpenStreetMap**  
   - Search the place on [openstreetmap.org](https://www.openstreetmap.org), right‑click → “Show address” / query the node or way for its coordinates.

5. **Geocoding / mapping APIs**  
   - Use only when the result clearly refers to the same place (e.g. same building name and street). Prefer “place” or “building” over a generic city center.

### Step 3: Convert to decimal degrees

- Store as **decimal degrees**: `[latitude, longitude]`.
- Latitude: negative for Southern Hemisphere (e.g. Mauritius ≈ -20.16).
- Longitude: positive for Eastern Hemisphere (e.g. Mauritius ≈ 57.50).
- If you only have DMS (e.g. 20°9′36″S, 57°30′6″E):
  - degrees + minutes/60 + seconds/3600, then negate latitude for S and keep longitude positive for E.

### Step 4: Cross-check

- Open **Google Maps** or **OpenStreetMap** with the decimal coordinates.
- Confirm the pin is on the correct building/beach/landmark (not a nearby street or wrong site).
- For cities (e.g. Port Louis), small differences (0.001–0.01°) can move the pin to the wrong building; prefer sources that refer to the specific building or entrance.

---

## 3. Validation checklist

Before committing new or changed coordinates:

- [ ] Source is named (e.g. “GeoHack”, “Wikipedia”, “Vintage Mauritius”) in a comment next to the coordinate.
- [ ] Same `[lat, lng]` is used in:
  - `PLACE_POSITIONS` in `itinerary-pool.ts` (for places), and
  - Any pre-designed itinerary stop using that slug in `predesigned-itineraries.ts`.
- [ ] Beaches: if the position lives in `itinerary.ts` or `beaches.ts`, update there and keep itinerary stops in sync.
- [ ] Optional: quick visual check on a map at zoom 15–17 to confirm the pin is on the correct spot.

---

## 4. Example: Fixing a wrong pin (National Post & Citadel Fort)

**Report:** “National Post and Citadel Fort icons on the map look wrong.”

1. **National Post (Port Louis)**  
   - Previous value: `-20.16406, 57.50508` (generic geocode).  
   - Search: “General Post Office Port Louis Mauritius coordinates”, “Central Post Office Port Louis GPS”.  
   - Result: Historic General Post Office (clock tower) at 20°9′35.99″S, 57°30′5.94″E → **-20.16, 57.50165**.  
   - Update `PLACE_POSITIONS["national-post"]` and the “1 Day in Port-Louis” stop for `national-post` to this value.

2. **Citadel Fort (Fort Adelaide)**  
   - Previous value: `-20.1625, 57.5012` (approximate).  
   - Search: “Fort Adelaide Citadel Port Louis GPS”, “Fort Adelaide GeoHack”.  
   - Result: GeoHack/Wikipedia **-20.163658, 57.510166** (Peter Bott Hill).  
   - Update `PLACE_POSITIONS["citadel-fort"]` and the “1 Day in Port-Louis” stop for `citadel-fort` to this value.

3. Add a short comment in code noting the source (e.g. “GeoHack/Wikipedia”, “Vintage Mauritius / Central Post Office”).

---

## 5. Quick reference: useful search phrases

- `"Place Name" Mauritius GPS coordinates`
- `"Place Name" latitude longitude decimal`
- `"Place Name" site:en.wikipedia.org`
- `"Place Name" GeoHack` or `geohack.toolforge.org "Place Name"`
- `"Place Name" OpenStreetMap` (then open OSM and get coords from the node/way)

Use this process whenever you add new places or correct map pin positions so that coordinates stay accurate and consistent across the app.
