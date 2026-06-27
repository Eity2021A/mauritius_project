"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { DROPDOWN_CLOSE_DELAY } from "@/lib/constants";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import UserMenu from "@/components/UserMenu";

interface MenuItem {
  name: string;
  href: string;
  children?: { name: string; href: string; badge?: string }[];
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  {
    name: "About Mauritius",
    href: "/mauritius-island",
    children: [
      { name: "Welcome to Mauritius Island", href: "/mauritius-island" },
      { name: "Top 15 Things To Do", href: "/top-15-things-to-do-in-mauritius" },
      { name: "Best Time to Visit", href: "/best-time-to-visit-to-mauritius" },
      { name: "Visa Requirements", href: "/visa-requirements" },
      { name: "Festivals in Mauritius", href: "/festivals-in-mauritius" },
      { name: "Events in Mauritius", href: "/events-in-mauritius" },
      { name: "🎁 Giveaway", href: "/giveaway" },
    ],
  },
    { name: "Beaches", href: "/beaches-in-mauritius" },
    { name: "Best Place to Visit", href: "/best-places-to-visit-in-mauritius" },
    { name: "Activities", href: "/mauritius-activities" },
  {
    name: "Itinerary",
    href: "/itineraries-mauritius",
    children: [
      { name: "All itineraries", href: "/itineraries-mauritius" },
      { name: "Mauritius Itineraries", href: "/mauritius-itinerary" },
      { name: "Recommended itineraries", href: "/itineraries-mauritius" },
      { name: "Community itineraries", href: "/itineraries-mauritius#community" },
      // { name: "AI Itinerary", href: "/itineraries-mauritius/ai-generate", badge: "Beta" },
      { name: "Create your itinerary", href: "/itineraries-mauritius/create", badge: "New" },
    ],
  },
  // {
  //   name: "Explore",
  //   href: "/explore",
  //   children: [
  //     { name: "Beaches in Mauritius", href: "/beaches-in-mauritius" },
  //     { name: "Best Places to Visit", href: "/best-places-to-visit-in-mauritius" },
  //     { name: "Activities", href: "/mauritius-activities" },
  //   ],
  // },
  {
    name: "Transport",
    href: "/transport",
    children: [
      { name: "Car Rental", href: "/rental" },
      { name: "Transfer", href: "/transfer" },
      { name: "Taxi", href: "/taxi" },
    ],
  },

  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about" },
];

function DropdownMenu({ item }: { item: MenuItem }) {
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
        {item.name}
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
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
          {item.children.map((child) => (
            <Link
              key={child.name}
              href={child.href}
              className="flex items-center justify-between gap-2 px-4 py-3 min-h-[44px] text-sm text-gray-700 hover:bg-orange-500 hover:text-white transition-colors group"
            >
              <span>{child.name}</span>
              {child.badge && (
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                    child.badge.toLowerCase() === "beta"
                      ? "bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-500"
                      : "bg-orange-500 text-white group-hover:bg-white group-hover:text-orange-500"
                  }`}
                >
                  {child.badge}
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 relative flex items-center justify-between h-16">
        {/* Logo */}
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

        {/* Desktop Menu - Centered */}
        <div className="hidden lg:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.name} item={item} />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-800 transition-colors hover:text-orange-500 whitespace-nowrap"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Right: language switcher + user menu (desktop) */}
        <div className="hidden lg:flex items-center justify-end gap-1 min-w-[80px]">
          <LanguageSwitcher variant="dark" />
          <UserMenu />
        </div>

        {/* Mobile: user icon + hamburger */}
        <div className="lg:hidden flex items-center gap-1 z-10">
          <UserMenu />
          <button
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile Menu Overlay */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ease-out ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      {/* Menu Panel */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white shadow-xl z-50 overflow-y-auto transition-transform duration-200 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-gray-900">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="py-2">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedMobile(expandedMobile === item.name ? null : item.name)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-800 hover:bg-orange-500 hover:text-white min-h-[48px] transition-colors"
                  >
                    {item.name}
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        expandedMobile === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedMobile === item.name && (
                    <div className="bg-gray-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="flex items-center justify-between gap-2 px-8 py-3 text-sm text-gray-600 hover:bg-orange-500 hover:text-white min-h-[48px] transition-colors group"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{child.name}</span>
                          {child.badge && (
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                                child.badge.toLowerCase() === "beta"
                                  ? "bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-500"
                                  : "bg-orange-500 text-white group-hover:bg-white group-hover:text-orange-500"
                              }`}
                            >
                              {child.badge}
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <LanguageSwitcher compact variant="dark" onSelect={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </nav>
  );
}
