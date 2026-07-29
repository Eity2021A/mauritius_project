"use client";

import Image from "next/image";
import { useMemo, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { DROPDOWN_CLOSE_DELAY } from "@/lib/constants";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import UserMenu from "@/components/UserMenu";

interface MenuChild {
  nameKey: string;
  href: string;
  badge?: "new" | "beta";
}

interface MenuItem {
  nameKey: string;
  href: string;
  children?: MenuChild[];
}

function hasNavigableHref(href: string) {
  return href.trim() !== "";
}

const MENU_ITEMS: MenuItem[] = [
  { nameKey: "home", href: "/" },
  {
    nameKey: "aboutMauritius",
    href: "/mauritius-island",
    children: [
      { nameKey: "welcomeIsland", href: "/mauritius-island" },
      { nameKey: "top15Things", href: "/top-15-things-to-do-in-mauritius" },
      { nameKey: "bestTimeToVisit", href: "/best-time-to-visit-to-mauritius" },
      { nameKey: "visaRequirements", href: "/visa-requirements" },
      { nameKey: "festivals", href: "/festivals-in-mauritius" },
      { nameKey: "events", href: "/events-in-mauritius" },
      { nameKey: "giveaway", href: "/giveaway" },
    ],
  },
  {
    nameKey: "explore",
    href: "#",
    children: [
      { nameKey: "travelPlanner", href: "/travel-planner" },
      {
        nameKey: "familyHolidayGuide",
        href: "/family-holiday-guide-for-mauritius-island",
      },
      { nameKey: "culturalPlacesOfMauritius", href: "/cultural-places-of-mauritius" },
      { nameKey: "dayInPortLouis", href: "/a-day-in-port-louis" },
      { nameKey: "exploringGrandBaie", href: "/exploring-grandbaie" },
      { nameKey: "exploringChamarel", href: "/exploring-chamarel" },
      { nameKey: "exploringMahebourg", href: "/exploring-mahebourg" },
      { nameKey: "leMorneAndChamarels", href: "/le-morne-and-chamarel" },
      {
        nameKey: "natureReservesAndParks",
        href: "/nature-reserves-and-parks-in-mauritius",
      },
      {
        nameKey: "secretPlacesToDiscover",
        href: "/secret-places-to-discover-in-mauritius",
      },
      { nameKey: "sevenWaterfallsHike", href: "/seven-waterfalls-hike" },
     
      { nameKey: "conquerLeMorne", href: "/conquer-le-morne" },
      {
        nameKey: "whalesAndDolphins",
        href: "/whales-and-dolphins-in-mauritius",
      },

      {
        nameKey: "beachRestaurants",
        href: "/where-to-eat-beach-restaurants-in-mauritius",
      },

      { nameKey: "seeMonkeys", href: "/where-to-see-monkeys-in-mauritius" },
      { nameKey: "snorkel", href: "/where-to-snorkel-in-mauritius" },
    ],
  },
  {
    nameKey: "regions",
    href: "#",
    children: [
      { nameKey: "northGuide", href: "/north-mauritius-travel-guide" },
      { nameKey: "southGuide", href: "/south-mauritius-travel-guide" },
      { nameKey: "eastGuide", href: "/east-mauritius-travel-guide" },
      { nameKey: "westGuide", href: "/west-mauritius-travel-guide" },
      { nameKey: "centralGuide", href: "/central-mauritius-travel-guide" },
   
    ],
  },
  {
    nameKey: "bestof",
    href: "#",
    children: [
  
      { nameKey: "bestBeachesOfMauritius", href: "/best-beaches-of-mauritius" },
      { nameKey: "bestCatamaranCruises", href: "/best-catamaran-cruises-in-mauritius" },
      { nameKey: "bestHikesInMauritius", href: "/best-hikes-in-mauritius" },
      { nameKey: "bestMarketsOfMauritius", href: "/best-markets-of-mauritius" },
      { nameKey: "bestWaterfallsOfMauritius", href: "/best-waterfalls-of-mauritius" },
      {
        nameKey: "swimWithSeaTurtles",
        href: "/swim-with-sea-turtles-in-mauritius",
      },


    ],
  },
  { nameKey: "pocketGuide", href: "/pocket-guide" },
  { nameKey: "beaches", href: "/beaches-in-mauritius" },
  { nameKey: "placesToVisit", href: "/best-places-to-visit-in-mauritius" },
  { nameKey: "activities", href: "/mauritius-activities" },
  { nameKey: "search", href: "/search" },
  {
    nameKey: "itinerary",
    href: "/roadtrip-mauritius",
    children: [
      { nameKey: "allRoadTrip", href: "/roadtrip-mauritius" },
      { nameKey: "mauritiusItineraries", href: "/mauritius-itinerary" },
      { nameKey: "recommendedItineraries", href: "/roadtrip-mauritius" },
      {
        nameKey: "communityItineraries",
        href: "/roadtrip-mauritius#community",
      },
      {
        nameKey: "createItinerary",
        href: "/roadtrip-mauritius/create",
        badge: "new",
      },
    ],
  },
  {
    nameKey: "transport",
    href: "#",
    children: [
      { nameKey: "carRental", href: "/car-rental-mauritius" },
      { nameKey: "transfer", href: "/mauritius-transfer-airport-hotel" },
      { nameKey: "taxi", href: "/mauritius-taxi" },
    ],
  },
  { nameKey: "blog", href: "/blog" },
  {
    nameKey: "veranda",
    href: "/veranda-hotels",
    children: [
      {
        nameKey: "verandaPointeAuxBiches",
        href: "/veranda-hotels/veranda-pointe-aux-biches",
      },
      {
        nameKey: "verandaPaulVirginie",
        href: "/veranda-hotels/veranda-paul-virginie",
      },
      {
        nameKey: "verandaGrandBaie",
        href: "/veranda-hotels/veranda-grand-baie",
      },
      { nameKey: "verandaTamarin", href: "/veranda-hotels/veranda-tamarin" },
      {
        nameKey: "verandaPalmarBeach",
        href: "/veranda-hotels/veranda-palmar-beach",
      },
    ],
  },
];

function DropdownMenu({
  item,
  label,
  childLabels,
  badgeNew,
}: {
  item: MenuItem;
  label: string;
  childLabels: Record<string, string>;
  badgeNew: string;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), DROPDOWN_CLOSE_DELAY);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500 flex items-center gap-1 whitespace-nowrap"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Link>
      {open && item.children && (
        <div className="absolute top-full left-0 mt-2 w-70 max-w-[calc(100vw-2rem)] bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
          {item.children.map((child) => (
            <Link
              key={child.nameKey}
              href={child.href}
              className="flex items-center justify-between gap-2 px-4 py-3 min-h-[44px] text-sm text-gray-700 hover:bg-orange-500 hover:text-white transition-colors group"
            >
              <span className="whitespace-nowrap">
                {childLabels[child.nameKey]}
              </span>
              {child.badge && (
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                    child.badge === "beta"
                      ? "bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-500"
                      : "bg-orange-500 text-white group-hover:bg-white group-hover:text-orange-500"
                  }`}
                >
                  {badgeNew}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const labels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const item of MENU_ITEMS) {
      map[item.nameKey] = t(item.nameKey);
      item.children?.forEach((child) => {
        map[child.nameKey] = t(child.nameKey);
      });
    }
    return map;
  }, [t]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedMobile(null);
  };

  const handleMobileNavigate = (href: string) => {
    closeMobileMenu();
    router.push(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className=" px-10 mx-auto px-4 relative flex items-center justify-between h-16">
        <Link href="/" className="flex-shrink-0 z-10">
          <Image
            src="/images/mauritius-explored-logo.svg"
            alt="Mauritius Explored"
            width={140}
            height={40}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
          {MENU_ITEMS.map((item) =>
            item.children ? (
              <DropdownMenu
                key={item.nameKey}
                item={item}
                label={labels[item.nameKey]}
                childLabels={labels}
                badgeNew={tCommon("badgeNew")}
              />
            ) : (
              <Link
                key={item.nameKey}
                href={item.href}
                className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500 whitespace-nowrap"
              >
                {labels[item.nameKey]}
              </Link>
            ),
          )}
        </div>

        <div className="hidden lg:flex items-center justify-end gap-1 min-w-[80px]">
          <LanguageSwitcher variant="dark" />
          <UserMenu />
        </div>

        <div className="lg:hidden flex items-center gap-1 z-10">
          <UserMenu />
          <button
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? tCommon("closeMenu") : tCommon("openMenu")
            }
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ease-out ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />
      <div
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white shadow-xl z-50 overflow-y-auto transition-transform duration-200 ease-out ${
          mobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-gray-900">{tCommon("menu")}</span>
          <button
            onClick={closeMobileMenu}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={tCommon("closeMenu")}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="py-2">
          {MENU_ITEMS.map((item) => {
            const label = labels[item.nameKey];
            return (
              <div key={item.nameKey}>
                {item.children ? (
                  <>
                    <div className="flex items-stretch">
                      {hasNavigableHref(item.href) && item.href !== "#" ? (
                        <Link
                          href={item.href}
                          className="flex-1 px-4 py-3 text-gray-800 hover:bg-orange-500 hover:text-white min-h-[48px] flex items-center transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMobileNavigate(item.href);
                          }}
                        >
                          {label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMobile(
                              expandedMobile === item.nameKey
                                ? null
                                : item.nameKey,
                            )
                          }
                          className="flex-1 px-4 py-3 text-left text-gray-800 hover:bg-orange-500 hover:text-white min-h-[48px] flex items-center transition-colors"
                          aria-expanded={expandedMobile === item.nameKey}
                        >
                          {label}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMobile(
                            expandedMobile === item.nameKey
                              ? null
                              : item.nameKey,
                          )
                        }
                        className="px-4 py-3 text-gray-800 hover:bg-orange-500 hover:text-white min-h-[48px] flex items-center justify-center transition-colors border-l border-gray-100"
                        aria-label={
                          expandedMobile === item.nameKey
                            ? tCommon("collapse", { name: label })
                            : tCommon("expand", { name: label })
                        }
                        aria-expanded={expandedMobile === item.nameKey}
                      >
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            expandedMobile === item.nameKey ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                    {expandedMobile === item.nameKey && (
                      <div className="bg-gray-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.nameKey}
                            href={child.href}
                            className="flex items-center justify-between gap-2 px-8 py-3 text-sm text-gray-600 hover:bg-orange-500 hover:text-white min-h-[48px] transition-colors group"
                            onClick={(e) => {
                              e.preventDefault();
                              handleMobileNavigate(child.href);
                            }}
                          >
                            <span>{labels[child.nameKey]}</span>
                            {child.badge && (
                              <span
                                className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                                  child.badge === "beta"
                                    ? "bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-500"
                                    : "bg-orange-500 text-white group-hover:bg-white group-hover:text-orange-500"
                                }`}
                              >
                                {tCommon("badgeNew")}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-gray-800 hover:bg-orange-500 hover:text-white min-h-[48px] flex items-center transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNavigate(item.href);
                    }}
                  >
                    {label}
                  </Link>
                )}
              </div>
            );
          })}
          <LanguageSwitcher
            compact
            variant="dark"
            onSelect={() => setMobileMenuOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}
