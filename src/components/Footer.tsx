"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PlanTripButton from "@/components/PlanTripButton";
import { MapPinIcon, InstagramIcon, FacebookIcon, MailIcon } from "@/components/icons";
import { getImageUrl } from "@/lib/image-url";
import { FACEBOOK_PAGE_URL } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  type FooterTranslationKey =
    | "beaches"
    | "bestPlaces"
    | "activities"
    | "planYourTrip"
    | "giveaway"
    | "aboutUs"
    | "welcome"
    | "festivals"
    | "events"
    | "faq"
    | "privacyPolicy";

  type FooterLink = {
    href: string;
    isPlanTrip?: boolean;
  } & (
    | { nameKey: FooterTranslationKey; label?: never }
    | { label: string; nameKey?: never }
  );

  const getFooterLinkLabel = (item: FooterLink) =>
    item.nameKey ? t(item.nameKey) : item.label;

  const exploreLinks: FooterLink[] = [
    { nameKey: "beaches" as const, href: "/beaches-in-mauritius" },
    { nameKey: "bestPlaces" as const, href: "/best-places-to-visit-in-mauritius" },
    { nameKey: "activities" as const, href: "/mauritius-activities" },
    { nameKey: "planYourTrip" as const, href: "/roadtrip-mauritius", isPlanTrip: true },
    { label: "Beach Finder", href: "/mauritius-beach-finder" },
    { nameKey: "giveaway" as const, href: "/giveaway" },
  ];

  const aboutLinks: FooterLink[] = [
    { nameKey: "aboutUs" as const, href: "/about" },
    { nameKey: "welcome" as const, href: "/mauritius-island" },
    { nameKey: "festivals" as const, href: "/festivals-in-mauritius" },
    { nameKey: "events" as const, href: "/events-in-mauritius" },
    { label: "eSIM & Internet", href: "/mauritius-esim-and-internet" },
    { label: "Media Kit", href: "/media-kit" },
    { nameKey: "faq" as const, href: "/faq-about-mauritius" },
    { nameKey: "privacyPolicy" as const, href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-black pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3 sm:mb-4">
              <Image
                src={getImageUrl("/images/mauritius-explored-logo-round.svg")}
                alt="Mauritius Explored"
                width={120}
                height={120}
                className="h-auto w-20 sm:w-auto"
              />
            </Link>
            <p className="text-white/80 text-sm sm:text-base">{t("tagline")}</p>
          </div>

          <div className="md:border-l md:border-neutral-700 md:pl-8">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              {t("explore")}
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {exploreLinks.map((item) => (
                <li key={getFooterLinkLabel(item)}>
                  {item.isPlanTrip ? (
                    <PlanTripButton
                      href={item.href}
                      className="text-white/80 text-base hover:text-orange-500 transition-colors py-2 min-h-[44px] flex items-center bg-transparent border-0 cursor-pointer w-full text-left disabled:opacity-50 disabled:cursor-wait"
                    >
                      {getFooterLinkLabel(item)}
                    </PlanTripButton>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white/80 text-base hover:text-orange-500 transition-colors py-2 min-h-[44px] flex items-center"
                    >
                      {getFooterLinkLabel(item)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-neutral-700 lg:pl-8">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              {t("about")}
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {aboutLinks.map((item) => (
                <li key={getFooterLinkLabel(item)}>
                  <Link
                    href={item.href}
                    className="text-white/80 text-base hover:text-orange-500 transition-colors py-2 min-h-[44px] flex items-center"
                  >
                    {getFooterLinkLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:border-l lg:border-neutral-700 lg:pl-8">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              {t("connect")}
            </h3>
            <div className="flex flex-wrap gap-3 mb-4 sm:mb-5">
              <a
                href="https://www.instagram.com/mauritius__explored"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#8A3AB9] via-[#E1306C] to-[#E95950] text-white hover:opacity-90 transition-opacity"
                aria-label={t("instagramAria")}
              >
                <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                aria-label={t("facebookAria")}
              >
                <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <span className="flex items-center space-x-2 sm:space-x-3 text-white/80 text-base">
                  <MapPinIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span>{t("location")}</span>
                </span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mauritius__explored"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 sm:space-x-3 text-white/80 text-base hover:text-orange-500 transition-colors group py-1"
                >
                  <InstagramIcon className="w-5 h-5 text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="underline-offset-2 hover:underline">@mauritius__explored</span>
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center space-x-2 sm:space-x-3 text-white/80 text-base hover:text-orange-500 transition-colors group py-1"
                >
                  <MailIcon className="w-5 h-5 text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="underline-offset-2 hover:underline">{t("contactUs")}</span>
                </Link>
              </li>
            </ul>

            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-orange-500 hover:text-orange-500"
            >
              Follow us on Facebook
            </a>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 sm:pt-8 text-center">
          <p className="text-white/60 text-sm sm:text-base">
            {t("copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
