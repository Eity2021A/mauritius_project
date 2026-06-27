/**
 * Klook hotel booking URLs for "Hotels Nearby" on beach pages.
 * Only hotels with a Klook listing are linked; others render as plain text.
 * Links open in a new tab so users keep the site open.
 */

export const HOTEL_OFFICIAL_URLS: Record<string, string> = {
  // Beachcomber (Klook)
  "Trou aux Biches Beachcomber Golf Resort & Spa":
    "https://www.klook.com/hotels/detail/119145-trou-aux-biches-beachcomber-golf-resort--spa/",
  "Le Royal Palm Beachcomber":
    "https://www.klook.com/hotels/detail/268751-royal-palm-beachcomber-luxury/",
  "Royal Palm Beachcomber":
    "https://www.klook.com/hotels/detail/268751-royal-palm-beachcomber-luxury/",
  "Le Mauricia":
    "https://www.klook.com/hotels/detail/491520-mauricia-beachcomber-resort--spa/",
  // LUX* (Klook)
  "LUX Grand Gaube": "https://www.klook.com/hotels/detail/254221-lux-grand-gaube/",
  "LUX Le Morne": "https://www.klook.com/hotels/detail/432448-lux-le-morne/",
  "LUX Belle Mare": "https://www.klook.com/hotels/detail/255652-lux-belle-mare/",
  // Veranda (Klook)
  "Veranda Grand Baie":
    "https://www.klook.com/hotels/detail/43984-veranda-grand-baie-hotel--spa/",
  // Heritage (Klook)
  "Heritage Le Telfair":
    "https://www.klook.com/hotels/detail/564743-heritage-le-telfair-golf--wellness-resort/",
  "Heritage Awali":
    "https://www.klook.com/hotels/detail/100398-heritage-awali-golf--spa-resort--all-inclusive/",
  // Constance (Klook)
  "Constance Belle Mare Plage":
    "https://www.klook.com/hotels/detail/86691-constance-belle-mare-plage/",
  // Marriott / St Regis (Klook)
  "St. Regis Mauritius":
    "https://www.klook.com/hotels/detail/504566-the-st-regis-le-morne-resort-mauritius/",
  // Long Beach (Klook)
  "Long Beach Golf & Spa Resort":
    "https://www.klook.com/hotels/detail/420588-long-beach-mauritius/",
};

/**
 * Returns the Klook hotel URL for a hotel name, or undefined if not on Klook.
 */
export function getHotelOfficialUrl(hotelName: string): string | undefined {
  return HOTEL_OFFICIAL_URLS[hotelName];
}
