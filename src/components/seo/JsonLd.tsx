import { SITE_URL } from "@/lib/constants";

/**
 * JSON-LD Structured Data Components for SEO
 * 
 * These components add schema.org structured data to pages,
 * improving search appearance with rich results.
 */

// Organization schema for the website
export function OrganizationJsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: "Mauritius Explored",
    alternateName: "MauritiusExplored",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/mauritius-explored-logo.svg`,
    },
    description: "Your ultimate guide to exploring Mauritius - beaches, activities, hotels, and travel tips.",
    sameAs: [
      "https://www.instagram.com/mauritius__explored",
      "https://www.facebook.com/MauritiusExplored",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website schema
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Mauritius Explored",
    url: SITE_URL,
    description: "Discover the best beaches, activities, and places to visit in Mauritius.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Beach/TouristDestination schema
interface BeachJsonLdProps {
  name: string;
  description: string;
  image?: string;
  url: string;
  region: string;
  latitude?: number;
  longitude?: number;
}

export function BeachJsonLd({
  name,
  description,
  image,
  url,
  region,
  latitude,
  longitude,
}: BeachJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Beach",
    name: name,
    description: description,
    ...(typeof image === "string" && image
      ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` }
      : {}),
    url: url,
    isAccessibleForFree: true,
    containedInPlace: {
      "@type": "Country",
      name: "Mauritius",
    },
    geo: latitude && longitude ? {
      "@type": "GeoCoordinates",
      latitude: latitude,
      longitude: longitude,
    } : undefined,
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Region",
      value: region,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Activity/TouristAttraction schema
interface ActivityJsonLdProps {
  name: string;
  description: string;
  image?: string;
  url: string;
  price?: number;
  category?: string;
  duration?: string;
  latitude?: number;
  longitude?: number;
}

export function ActivityJsonLd({
  name,
  description,
  image,
  url,
  price,
  category,
  duration,
  latitude,
  longitude,
}: ActivityJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: name,
    description: description,
    ...(typeof image === "string" && image
      ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` }
      : {}),
    url: url,
    isAccessibleForFree: !price,
    ...(price && {
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    }),
    ...(category && {
      additionalType: category,
    }),
    ...(duration && {
      duration: duration,
    }),
    geo: latitude && longitude ? {
      "@type": "GeoCoordinates",
      latitude: latitude,
      longitude: longitude,
    } : undefined,
    containedInPlace: {
      "@type": "Country",
      name: "Mauritius",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Place/TouristAttraction schema for places to visit pages
interface PlaceJsonLdProps {
  name: string;
  description: string;
  image?: string;
  url: string;
  category?: string;
  latitude?: number;
  longitude?: number;
}

export function PlaceJsonLd({
  name,
  description,
  image,
  url,
  category,
  latitude,
  longitude,
}: PlaceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    url,
    ...(typeof image === "string" && image
      ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` }
      : {}),
    ...(category && { additionalType: category }),
    geo: latitude && longitude ? {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    } : undefined,
    containedInPlace: {
      "@type": "Country",
      name: "Mauritius",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ schema
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  items: FAQItem[];
}

export function FAQJsonLd({ items }: FAQJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface EventItemData {
  name: string;
  description: string;
  startDate: string;
  url: string;
  locationName?: string;
}

interface EventListJsonLdProps {
  events: EventItemData[];
}

export function EventListJsonLd({ events }: EventListJsonLdProps) {
  const schema = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: event.url,
    location: {
      "@type": "Place",
      name: event.locationName ?? "Mauritius",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MU",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Mauritius Explored",
      url: SITE_URL,
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article/ListArticle schema for list pages like "Top 10 Things to Do"
interface ListItemData {
  position: number;
  name: string;
  url: string;
  image?: string;
  description?: string;
}

interface ItemListJsonLdProps {
  name: string;
  description: string;
  items: ListItemData[];
  itemType?: "Thing" | "Beach" | "TouristAttraction" | "Hotel" | "Service";
}

export function ItemListJsonLd({
  name,
  description,
  items,
  itemType = "Thing",
}: ItemListJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    description: description,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      item: {
        "@type": itemType,
        name: item.name,
        url: item.url,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  image: string;
  authorName: string;
  datePublished: string;
  dateModified: string;
  url: string;
  keywords?: string[];
  wordCount?: number;
}

export function ArticleJsonLd({
  headline,
  description,
  image,
  authorName,
  datePublished,
  dateModified,
  url,
  keywords,
  wordCount,
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "Article"],
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(typeof wordCount === "number" ? { wordCount } : {}),
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OfferData {
  name?: string;
  price?: string | number;
  priceCurrency?: string;
  description?: string;
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  offers?: OfferData[];
}

export function ProductJsonLd({
  name,
  description,
  url,
  image,
  offers = [],
}: ProductJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    ...(image ? { image } : {}),
    ...(offers.length
      ? {
          offers: offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
            price: offer.price,
            priceCurrency: offer.priceCurrency ?? "EUR",
            description: offer.description,
            availability: "https://schema.org/InStock",
            url,
          })),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string;
  telephone?: string;
  openingHours?: string;
  offers?: OfferData[];
}

export function ServiceJsonLd({
  name,
  description,
  url,
  serviceType,
  areaServed = "Mauritius",
  telephone,
  openingHours,
  offers = [],
}: ServiceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    serviceType,
    areaServed,
    ...(telephone ? { telephone } : {}),
    ...(openingHours ? { openingHours } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "MU",
    },
    ...(offers.length
      ? {
          makesOffer: offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
            price: offer.price,
            priceCurrency: offer.priceCurrency ?? "MUR",
            description: offer.description,
            availability: "https://schema.org/InStock",
            url,
          })),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface HowToStepData {
  name: string;
  text: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStepData[];
}

export function HowToJsonLd({ name, description, steps }: HowToJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface HotelData {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
  starRating?: string;
  addressLocality?: string;
}

interface HotelCollectionJsonLdProps {
  hotels: HotelData[];
}

export function HotelCollectionJsonLd({ hotels }: HotelCollectionJsonLdProps) {
  const schema = hotels.map((hotel) => ({
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.description,
    url: hotel.url,
    ...(hotel.image ? { image: hotel.image } : {}),
    ...(hotel.priceRange ? { priceRange: hotel.priceRange } : {}),
    ...(hotel.starRating
      ? {
          starRating: {
            "@type": "Rating",
            ratingValue: hotel.starRating.replace(/[^\d.]/g, ""),
          },
        }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: hotel.addressLocality,
      addressCountry: "MU",
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
