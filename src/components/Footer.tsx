import Link from "next/link";
import Image from "next/image";
import PlanTripButton from "@/components/PlanTripButton";
import { MapPinIcon, InstagramIcon, FacebookIcon, MailIcon } from "@/components/icons";
import { getImageUrl } from "@/lib/image-url";
import { FACEBOOK_PAGE_URL } from "@/lib/constants";
import FacebookSiteLikeEmbed from "@/components/FacebookSiteLikeEmbed";

export default function Footer() {
  return (
    <footer className="bg-black pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* About Section */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3 sm:mb-4">
              <Image
                src={getImageUrl("/images/Mauritius Explored logo round.svg")}
                alt="Mauritius Explored"
                width={120}
                height={120}
                className="h-auto w-20 sm:w-auto"
              />
            </Link>
            <p className="text-white/80 text-sm sm:text-base">
              Your guide to discovering the beauty of Mauritius. From pristine beaches to lush mountains, explore everything this island paradise has to offer.
            </p>
          </div>

          {/* Explore Section */}
          <div className="md:border-l md:border-neutral-700 md:pl-8">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Explore</h3>
            <ul className="space-y-1 sm:space-y-2">
              {[
                { name: "Beaches", href: "/beaches-in-mauritius" },
                { name: "Best Places to Visit", href: "/best-places-to-visit-in-mauritius" },
                { name: "Activities", href: "/mauritius-activities" },
                { name: "Plan Your Trip", href: "/itineraries-mauritius" },
                { name: "Giveaway", href: "/giveaway" },
              ].map((item) => (
                <li key={item.name}>
                  {item.name === "Plan Your Trip" ? (
                    <PlanTripButton
                      href={item.href}
                      className="text-white/80 text-base hover:text-orange-500 transition-colors py-2 min-h-[44px] flex items-center bg-transparent border-0 cursor-pointer w-full text-left disabled:opacity-50 disabled:cursor-wait"
                    >
                      {item.name}
                    </PlanTripButton>
                  ) : (
                    <Link href={item.href} className="text-white/80 text-base hover:text-orange-500 transition-colors py-2 min-h-[44px] flex items-center">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div className="lg:border-l lg:border-neutral-700 lg:pl-8">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">About</h3>
            <ul className="space-y-1 sm:space-y-2">
              {[
                { name: "Welcome", href: "/mauritius-island" },
                { name: "Festivals", href: "/festivals-in-mauritius" },
                { name: "Events", href: "/events-in-mauritius" },
                { name: "FAQ", href: "/faq-about-mauritius" },
                { name: "Privacy Policy", href: "/privacy-policy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/80 text-base hover:text-orange-500 transition-colors py-2 min-h-[44px] flex items-center">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="col-span-2 sm:col-span-1 lg:border-l lg:border-neutral-700 lg:pl-8">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3 mb-4 sm:mb-5">
              <a
                href="https://www.instagram.com/mauritius__explored"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#8A3AB9] via-[#E1306C] to-[#E95950] text-white hover:opacity-90 transition-opacity"
                aria-label="Follow Mauritius Explored on Instagram"
              >
                <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                aria-label="Like Mauritius Explored on Facebook"
              >
                <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <span className="flex items-center space-x-2 sm:space-x-3 text-white/80 text-base">
                  <MapPinIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span>Republic of Mauritius</span>
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
                  <span className="underline-offset-2 hover:underline">Contact Us</span>
                </Link>
              </li>
            </ul>

            <FacebookSiteLikeEmbed />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-6 sm:pt-8 text-center">
          <p className="text-white/60 text-sm sm:text-base">
            Copyright &copy; {new Date().getFullYear()} All rights reserved | Mauritius Explored
          </p>
        </div>
      </div>
    </footer>
  );
}
