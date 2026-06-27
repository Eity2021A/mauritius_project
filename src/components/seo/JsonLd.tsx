import { SITE_URL } from "@/lib/constants";

/**
 * JSON-LD Structured Data Components for SEO
 * 
 * These components add schema.org structured data to pages,
 * improving search appearance with rich results.
 */

// Organization schema for the website
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mauritius Explored",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: "Your ultimate guide to exploring Mauritius - beaches, activities, hotels, and travel tips.",
    sameAs: [
      "https://www.instagram.com/mauritius__explored",
      "https://www.facebook.com/mauritiusexplored/",
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
    name: "Mauritius Explored",
    url: SITE_URL,
    description: "Discover the best beaches, activities, and places to visit in Mauritius.",
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
}

export function ItemListJsonLd({ name, description, items }: ItemListJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    description: description,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.image && { image: item.image }),
      ...(item.description && { description: item.description }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
