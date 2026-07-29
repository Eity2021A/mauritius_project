import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";
import Navbar from "@/components/Navbar";
import { getVerandaHotelsListingData } from "@/lib/content";
import type { VerandaHotel } from "@/data/veranda-hotels";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Veranda Hotels",
  description:
    "Discover all five Veranda hotels in Mauritius, from barefoot family beaches to adults-only romance and west-coast surf-town style.",
  alternates: { canonical: "/veranda-hotels" },
};

const styleCards = [
  {
    title: "Family & Barefoot",
    description: "Kids' clubs, water sports and easy beach days.",
    icon: "family",
  },
  {
    title: "Adults-Only Romance",
    description: "Couples-only calm, spa time and sunset dinners.",
    icon: "heart",
  },
  {
    title: "Lively All-Inclusive",
    description: "In the heart of the village, with plenty included.",
    icon: "glass",
  },
  {
    title: "Surf & Bohemian",
    description: "Retro-chic surf town, dolphins and glowing sunsets.",
    icon: "palm",
  },
];

function getVerandaHotelLinkByName(
  hotels: VerandaHotel[],
  name: string,
): string {
  return `/veranda-hotels/${hotels.find((hotel) => hotel.name === name)?.slug ?? ""}`;
}

function formatHotelCardRating(rating: string): string {
  return rating.replace(/\s*stars?$/i, "");
}

function formatHotelCardPrice(priceFrom: string): string {
  return priceFrom.replace(/^from\s+/i, "");
}

function formatHotelTag(tag: string): string {
  return tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildHotelRegions(hotels: VerandaHotel[]) {
  const regionMeta: Record<string, { label: string; order: number }> = {
    north: { label: "North Coast", order: 0 },
    west: { label: "West Coast", order: 1 },
    east: { label: "East Coast", order: 2 },
    south: { label: "South Coast", order: 3 },
    central: { label: "Central", order: 4 },
  };

  const groups = hotels.reduce<Record<string, VerandaHotel[]>>((acc, hotel) => {
    const key = hotel.region.toLowerCase();
    acc[key] ??= [];
    acc[key].push(hotel);
    return acc;
  }, {});

  return Object.entries(groups)
    .sort(
      (a, b) =>
        (regionMeta[a[0]]?.order ?? 99) - (regionMeta[b[0]]?.order ?? 99),
    )
    .map(([regionKey, regionHotels]) => ({
      name: regionMeta[regionKey]?.label ?? regionKey,
      hotels: regionHotels.map((hotel) => ({
        name: hotel.name,
        location: hotel.location,
        region: regionMeta[regionKey]?.label ?? regionKey,
        rating: formatHotelCardRating(hotel.rating),
        style: hotel.style,
        tagline: hotel.tagline,
        tags: hotel.tags.map(formatHotelTag),
        price: formatHotelCardPrice(hotel.priceFrom),
        heroImage: hotel.heroImage,
        gradient: hotel.accent,
        href: `/veranda-hotels/${hotel.slug}`,
      })),
    }));
}

function getMapHotels(hotels: VerandaHotel[]) {
  return [
    {
      name: "Veranda Grand Baie",
      label: "Lively & All-Inclusive",
      location: "Grand Baie",
      description:
        "A bright all-inclusive hotel in the heart of the island's most vibrant coastal village.",
      align: "top",
    },
    {
      name: "Veranda Paul & Virginie",
      label: "Adults-Only Romance",
      location: "Grand Gaube",
      description:
        "An intimate, couples-only boutique beach retreat in an authentic fishing village.",
      align: "right-top",
    },
    {
      name: "Veranda Pointe aux Biches",
      label: "Family & Barefoot",
      location: "Pointe aux Piments",
      description:
        "A relaxed barefoot beach hotel with a dedicated adults-only wing, spa and freshwater pools.",
      align: "left-top",
    },
    {
      name: "Veranda Tamarin",
      label: "Surf & Bohemian",
      location: "Tamarin Bay",
      description:
        "A laid-back, surf-inspired boutique on a bay famous for dolphins and golden sunsets.",
      align: "left-bottom",
    },
    {
      name: "Veranda Palmar Beach",
      label: "Relaxed Family Beach",
      location: "Palmar / Belle Mare",
      description:
        "A family-friendly resort on a long white-sand beach beside a calm, protected lagoon.",
      align: "right-bottom",
    },
  ].map((hotel) => ({
    ...hotel,
    href: getVerandaHotelLinkByName(hotels, hotel.name),
  }));
}

function getChooseRows(hotels: VerandaHotel[]) {
  return [
    {
      question: "Want nightlife, shopping and all-inclusive convenience?",
      answer: "Veranda Grand Baie",
    },
    {
      question: "Planning a honeymoon or a romantic escape?",
      answer: "Veranda Paul & Virginie",
    },
    {
      question: "Travelling as a family but still want adult time?",
      answer: "Veranda Pointe aux Biches",
    },
    {
      question: "Chasing surf, sunsets and west-coast character?",
      answer: "Veranda Tamarin",
    },
    {
      question: "After a stunning east-coast beach and great value?",
      answer: "Veranda Palmar Beach",
    },
  ].map((row) => ({
    ...row,
    href: getVerandaHotelLinkByName(hotels, row.answer),
  }));
}

const whyItems = [
  {
    title: "Authentic island style",
    description:
      "Character-filled, home-grown hotels that make you feel genuinely Mauritian.",
    icon: "heart",
  },
  {
    title: "Seven Colours Spa wellness",
    description:
      "Signature Seven Colours spas for rest, renewal and a slower island rhythm.",
    icon: "spark",
  },
  {
    title: "Genuine, honest value",
    description:
      "Great-value comfort across every star tier, so more of the budget goes to exploring.",
    icon: "badge",
  },
  {
    title: "Green Key certified",
    description:
      "Eco-conscious credentials and a lighter-footprint approach across the collection.",
    icon: "leaf",
  },
];

function VerandaIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const props = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "family":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M12 21c5-3 8-7 8-11a4 4 0 0 0-8-1 4 4 0 0 0-8 1c0 4 3 8 8 11Z" />
        </svg>
      );
    case "glass":
      return (
        <svg {...props}>
          <path d="M6 4h12l-6 7Z" />
          <path d="M12 11v7" />
          <path d="M8 21h8" />
        </svg>
      );
    case "palm":
      return (
        <svg {...props}>
          <path d="M4 20h16" />
          <path d="M12 20V9" />
          <path d="M12 9a7 7 0 0 1 8 4" />
          <path d="M12 9a7 7 0 0 0-8 4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7Z" />
          <path d="M19 16l.8 2 .2.2-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
        </svg>
      );
    case "badge":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2 0 0 1 5 0c0 1.5-2.5 1.6-2.5 3" />
          <path d="M12 16.5v.01" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...props}>
          <path d="M4 20c0-8 6-14 16-14 0 10-6 15-12 15a4 4 0 0 1-4-4Z" />
          <path d="M4 20c4-4 7-6 11-7" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
    default:
      return null;
  }
}

function HotelCard({
  hotel,
}: {
  hotel: {
    name: string;
    location: string;
    region: string;
    rating: string;
    style: string;
    tagline: string;
    tags: string[];
    price: string;
    heroImage: string;
    gradient: string;
    href: string;
  };
}) {
  const isExternal = hotel.href.startsWith("http");
  const content = (
    <>
      <div
        className={`relative aspect-[16/11] bg-gradient-to-br ${hotel.gradient}`}
      >
        {hotel.heroImage ? (
          <>
            <img
              src={getImageUrl(hotel.heroImage, { width: 800, quality: 72 })}
              alt={hotel.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />
          </>
        ) : null}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#1c2a2e]">
          {hotel.name}
        </span>
        <span className="absolute right-3 top-3 text-xs tracking-[0.18em] text-white drop-shadow">
          {hotel.rating}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-[#e8601c] px-3 py-1 text-[11px] font-semibold text-white">
          {hotel.region}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-sans text-[21px] font-semibold leading-tight text-[#1c2a2e]">
          {hotel.name}
        </h3>
        <p className="flex-1 text-sm leading-6 text-[#5f7378]">
          {hotel.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {hotel.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f2f8f8] px-3 py-1 text-[11.5px] font-medium text-[#12909c]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-[#e4eeee] pt-4">
          <div>
            <span className="font-sans text-base font-semibold text-[#1c2a2e]">
              from {hotel.price}
            </span>
            <span className="ml-1 text-xs text-[#5f7378]">/ night</span>
          </div>
          <span className="text-sm font-semibold text-[#12909c]">
            Discover -&gt;
          </span>
        </div>
      </div>
    </>
  );

  const className =
    "flex h-full flex-col overflow-hidden rounded-2xl border border-[#e4eeee] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(12,90,100,0.14)]";

  if (isExternal) {
    return (
      <a
        href={hotel.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={hotel.href} className={className}>
      {content}
    </Link>
  );
}

function ChoiceLink({
  href,
  question,
  answer,
}: {
  href: string;
  question: string;
  answer: string;
}) {
  const isExternal = href.startsWith("http");
  const className =
    "flex flex-col gap-2 rounded-2xl border border-[#e4eeee] bg-white px-5 py-4 transition duration-200 hover:translate-x-1 hover:shadow-[0_14px_30px_rgba(12,90,100,0.1)] sm:flex-row sm:items-center sm:justify-between sm:gap-4";

  const content = (
    <>
      <div className="text-[15.5px] font-medium text-[#1c2a2e]">{question}</div>
      <div className="whitespace-nowrap font-sans text-[14.5px] font-semibold text-[#12909c]">
        {answer} -&gt;
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default async function VerandaCollectionPage() {
  const { allHotels } = await getVerandaHotelsListingData();
  const hotelRegions = buildHotelRegions(allHotels);
  const mapHotels = getMapHotels(allHotels);
  const chooseRows = getChooseRows(allHotels);


  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0d6167,#137d86_58%,#2fa6b2)] px-4 pt-28 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl("/images/veranda-pointe-aux-biches-sunset-beach.webp", { width: 1800, quality: 78 })}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-00 scale-[1.05]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.38)_38%,rgba(0,0,0,0.46)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.72)_24%,rgba(0,0,0,0.48)_48%,rgba(0,0,0,0.2)_72%,rgba(0,0,0,0.08)_100%)]" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end pb-32 sm:min-h-[76vh] lg:min-h-[82vh]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]">
              Authentic Island Living Across Five Mauritian Hotels
            </p>
            <h1 className="mt-4 font-sans text-4xl font-bold leading-[0.95] tracking-[-0.02em] text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.34)] sm:text-5xl lg:text-[68px]">
              Veranda Hotels in Mauritius
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/95 [text-shadow:0_2px_14px_rgba(0,0,0,0.32)] sm:text-lg sm:leading-8">
              Five relaxed, authentic and great-value island hotels, from
              barefoot family beaches to adults-only romance and laid-back
              surf-town cool.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#collection"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#e8601c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c94f12]"
              >
                Choose your style
              </Link>
              <Link
                href="#choose"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e4eeee] bg-white px-6 py-3 text-sm font-semibold text-[#1c2a2e] transition hover:bg-[#f8fbfb]"
              >
                Which is right for me?
              </Link>
            </div>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 h-[74px] w-full"
          viewBox="0 0 1440 74"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M0,18 C160,34 308,32 430,24 C576,14 695,8 842,18 C976,28 1102,40 1248,34 C1324,31 1388,24 1440,18 L1440,74 L0,74 Z"
          />
        </svg>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              The collection
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold leading-tight text-[#1c2a2e] sm:text-4xl">
              Feel Mauritian, not just visit
            </h2>
            <p className="mt-4 text-base leading-7 text-[#42565b]">
              Some hotels sell you Mauritius. Veranda Resorts lets you live it.
              This home-grown collection of five boutique hotels, part of the
              Mauritian group Rogers Hospitality, is built around one simple
              promise: to make you feel Mauritian.
            </p>
            <p className="mt-4 text-base leading-7 text-[#42565b]">
              Instead of vast, look-alike complexes, you get intimate,
              character-filled properties where local flavours, sega rhythms,
              barefoot ease and the warmth of island hospitality matter far more
              than marble lobbies.
            </p>
            <p className="mt-4 text-base leading-7 text-[#42565b]">
              The five hotels span the whole spice-box of a Mauritian holiday,
              from relaxed 3-star retreats to polished 4-star-plus resorts, and
              from the buzzing north to the wild west and the postcard-perfect
              east.
            </p>
          </div>

          <div className="grid gap-4 rounded-2xl border border-[#e4eeee] bg-[#f2f8f8] p-6 sm:grid-cols-2">
            {[
              { value: "5", label: "Boutique hotels" },
              { value: "3", label: "Coasts of the island" },
              { value: "3-4+", label: "Comfort tiers" },
              { value: "Green Key", label: "Eco-certified" },
            ].map((fact) => (
              <div key={fact.label}>
                <div className="font-sans text-3xl font-semibold text-[#12909c]">
                  {fact.value}
                </div>
                <div className="mt-1 text-[12.5px] uppercase tracking-[0.07em] text-[#5f7378]">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {styleCards.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#e4eeee] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(12,90,100,0.12)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2f8f8] text-[#12909c]">
                <VerandaIcon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-sans text-base font-semibold text-[#1c2a2e]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5f7378]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="collection" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              Explore by region
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-[#1c2a2e] sm:text-[34px]">
              The five Veranda hotels
            </h2>
            <p className="mt-3 text-base leading-7 text-[#5f7378]">
              Pick your coast and your mood, then open the hotel that feels
              right for your trip.
            </p>
          </div>

          <div className="space-y-9">
            {hotelRegions.map((region) => (
              <div key={region.name}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8601c]">
                    {region.name}
                  </span>
                  <div className="h-px flex-1 bg-[#e4eeee]" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {region.hotels.map((hotel) => (
                    <HotelCard key={hotel.name} hotel={hotel} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              Where to stay
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-[#1c2a2e] sm:text-[34px]">
              Where are the Veranda Hotels?
            </h2>
            <p className="mt-3 text-base leading-7 text-[#5f7378]">
              Five relaxed, great-value island hotels, pick your coast and your
              style.
            </p>
          </div>

          {/* <div className="hidden lg:block">
            <div className="mx-auto max-w-[1200px]">
              <svg
                viewBox="0 0 1200 600"
                className="h-auto w-full"
                aria-hidden="true"
              >
                <image
                  href="/images/map.png"
                  x="410"
                  y="120"
                  width="400"
                  height="400"
                  preserveAspectRatio="xMidYMid meet"
                />

                <path
                  d="M686.2,160.96 L767.1,160.96 L767.1,178 L848,178"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M484.6,207.76 L422.3,207.76 L422.3,208 L360,208"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M453.64,414.4 L406.82,414.4 L406.82,470 L360,470"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M772.6,348.16 L810.3,348.16 L810.3,444 L848,444"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {[
                  { x: 567.4, y: 149.44 },
                  { x: 686.2, y: 160.96 },
                  { x: 484.6, y: 207.76 },
                  { x: 453.64, y: 414.4 },
                  { x: 772.6, y: 348.16 },
                ].map((pin) => (
                  <g key={`${pin.x}-${pin.y}`}>
                    <circle
                      cx={pin.x}
                      cy={pin.y + 9}
                      r="8"
                      fill="rgba(20,40,45,.12)"
                    />
                    <circle cx={pin.x} cy={pin.y} r="15" fill="#E8601C" />
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="15"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.5"
                    />
                    <circle cx={pin.x} cy={pin.y} r="5" fill="#fff" />
                  </g>
                ))}

                <foreignObject x="392" y="6" width="330" height="104">
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: ".16em",
                          color: "#12909C",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Lively &amp; All-Inclusive
                      </div>
                      <div
                        style={{
                          fontSize: "19px",
                          fontWeight: 600,
                          color: "#1C2A2E",
                          margin: "2px 0 4px",
                          lineHeight: 1.1,
                        }}
                      >
                        Veranda Grand Baie
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#5F7378",
                          lineHeight: 1.5,
                        }}
                      >
                        A bright all-inclusive hotel in the heart of the
                        island&apos;s most vibrant coastal village.
                      </div>
                      <div
                        style={{
                          marginTop: "7px",
                          fontWeight: 600,
                          fontSize: "13px",
                          color: "#1C2A2E",
                        }}
                      >
                        Grand Baie
                      </div>
                    </div>
                  </div>
                </foreignObject>

                <foreignObject x="848" y="132" width="344" height="126">
                  <div
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: ".16em",
                        color: "#12909C",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Adults-Only Romance
                    </div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 600,
                        color: "#1C2A2E",
                        margin: "2px 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      Veranda Paul &amp; Virginie
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5F7378",
                        lineHeight: 1.5,
                      }}
                    >
                      An intimate, couples-only boutique beach retreat in an
                      authentic fishing village.
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1C2A2E",
                      }}
                    >
                      Grand Gaube
                    </div>
                  </div>
                </foreignObject>

                <foreignObject x="8" y="150" width="352" height="132">
                  <div
                    style={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: ".16em",
                        color: "#12909C",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Family &amp; Barefoot
                    </div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 600,
                        color: "#1C2A2E",
                        margin: "2px 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      Veranda Pointe aux Biches
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5F7378",
                        lineHeight: 1.5,
                      }}
                    >
                      A relaxed barefoot beach hotel with a dedicated
                      adults-only wing, spa and freshwater pools.
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1C2A2E",
                      }}
                    >
                      Pointe aux Piments
                    </div>
                  </div>
                </foreignObject>

                <foreignObject x="8" y="432" width="352" height="118">
                  <div
                    style={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: ".16em",
                        color: "#12909C",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Surf &amp; Bohemian
                    </div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 600,
                        color: "#1C2A2E",
                        margin: "2px 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      Veranda Tamarin
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5F7378",
                        lineHeight: 1.5,
                      }}
                    >
                      A laid-back, surf-inspired boutique on a bay famous for
                      dolphins and golden sunsets.
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1C2A2E",
                      }}
                    >
                      Tamarin Bay
                    </div>
                  </div>
                </foreignObject>

                <foreignObject x="848" y="398" width="344" height="126">
                  <div
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: ".16em",
                        color: "#12909C",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Relaxed Family Beach
                    </div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 600,
                        color: "#1C2A2E",
                        margin: "2px 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      Veranda Palmar Beach
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5F7378",
                        lineHeight: 1.5,
                      }}
                    >
                      A family-friendly resort on a long white-sand beach beside
                      a calm, protected lagoon.
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1C2A2E",
                      }}
                    >
                      Palmar / Belle Mare
                    </div>
                  </div>
                </foreignObject>

                <path
                  d="M567.4,118 L567.4,149.44"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div> */}

          <div>
            <Image
              src="/images/veranda_hotels_map.jpeg"
              alt="Map of Mauritius showing the locations of the five Veranda hotels"
              width={1200}
              height={600}
              className=" h-auto w-full rounded-2xl"
            />
          </div>

          {/* <div className="lg:hidden">
            <div className="overflow-hidden rounded-3xl border border-[#e4eeee] bg-white">
              <div className="border-b border-[#e4eeee] bg-[#f8fbfb] p-4 sm:p-6">
                <div className="relative mx-auto aspect-[1.08] max-w-[680px] rounded-[28px] bg-[linear-gradient(180deg,#f8fbfb,#eef5f5)]">
                  <svg
                    viewBox="0 0 900 620"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <path
                      d="M360 90 390 100 430 120 455 145 470 175 500 205 530 250 550 300 575 355 588 410 575 460 550 505 510 550 465 575 410 585 360 580 310 565 275 540 250 550 255 510 272 470 268 420 278 375 268 330 275 290 300 245 315 210 310 175 330 145Z"
                      fill="#dde6e6"
                      stroke="#c7d6d6"
                      strokeWidth="2"
                    />

                    {[
                      { x: 465, y: 135 },
                      { x: 565, y: 150 },
                      { x: 395, y: 205 },
                      { x: 375, y: 395 },
                      { x: 635, y: 330 },
                    ].map((pin) => (
                      <g key={`${pin.x}-${pin.y}`}>
                        <circle
                          cx={pin.x}
                          cy={pin.y + 10}
                          r="11"
                          fill="rgba(20,40,45,.12)"
                        />
                        <circle cx={pin.x} cy={pin.y} r="17" fill="#E8601C" />
                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r="17"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="3"
                        />
                        <circle cx={pin.x} cy={pin.y} r="5" fill="#fff" />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                {mapHotels.map((hotel) => (
                  <div
                    key={hotel.name}
                    className="rounded-2xl border border-[#e4eeee] bg-white p-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12909c]">
                      {hotel.label}
                    </p>
                    <h3 className="mt-1 font-sans text-lg font-semibold text-[#1c2a2e]">
                      {hotel.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#5f7378]">
                      {hotel.description}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1c2a2e]">
                      <VerandaIcon
                        name="pin"
                        className="h-4 w-4 text-[#12909c]"
                      />
                      {hotel.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              Why book a Veranda hotel
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-[#1c2a2e] sm:text-[34px]">
              Made for a real island holiday
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {whyItems.map((item) => (
              <article key={item.title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2f8f8] text-[#12909c]">
                  <VerandaIcon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[#1c2a2e]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5f7378]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="choose" className="bg-[#f2f8f8] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              Find your match
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-[#1c2a2e] sm:text-[34px]">
              Which Veranda is right for you?
            </h2>
          </div>

          <div className="mx-auto flex max-w-4xl flex-col gap-3">
            {chooseRows.map((row) => (
              <ChoiceLink
                key={row.answer}
                href={row.href}
                question={row.question}
                answer={row.answer}
              />
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-4xl text-center text-[15px] leading-7 text-[#42565b]">
            Whichever you choose, all five share the same Veranda DNA: warm,
            genuinely Mauritian service, a strong sense of place, eco-conscious
            Green Key credentials, and the flavours, music and easygoing spirit
            that make the island so easy to fall for.
          </p>
        </div>
      </section>

      <footer className="mt-6 bg-[#0f2a30] px-4 py-14 text-[#cfe0e2] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            <div>
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <Image
                  src={getImageUrl("/images/mauritius-explored-logo.svg")}
                  alt="Mauritius Explored"
                  width={170}
                  height={48}
                  className="h-9 w-auto"
                />
              </div>
              <p className="mt-4 max-w-[280px] text-sm leading-7 text-[#9db8bb]">
                Your guide to discovering the beauty of Mauritius. From pristine
                beaches to lush mountains, explore everything this island
                paradise has to offer.
              </p>
            </div>

            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white">
                Explore
              </h3>
              <div className="mt-4 space-y-3 text-sm text-[#a9c4c7]">
                <Link href="/itineraries-mauritius">Itineraries</Link>
                <Link href="/beaches-in-mauritius">Beaches</Link>
                <Link href="/best-places-to-visit-in-mauritius">
                  Nature & Wildlife
                </Link>
                <Link href="/veranda-hotels">Hotels</Link>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white">
                About
              </h3>
              <div className="mt-4 space-y-3 text-sm text-[#a9c4c7]">
                <Link href="/about">About Us</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/about">FAQs</Link>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white">
                Connect
              </h3>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2b4a50] text-[#cfe0e2]"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/MauritiusExplored/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2b4a50] text-[#cfe0e2]"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
                  </svg>
                </a>
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 rounded-full border border-[#2b4a50] bg-[#123339] px-4 py-2 text-sm text-white outline-none placeholder:text-[#8fb0b3]"
                />
                <button className="rounded-full bg-[#12909c] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b6a74]">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[#23464c] pt-5 text-sm text-[#8fabae] sm:flex-row sm:items-center sm:justify-between">
            <span>Copyright 2026 Mauritius Explored. All rights reserved.</span>
            <span>Privacy - Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
