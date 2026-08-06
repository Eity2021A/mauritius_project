"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getImageUrl } from "@/lib/image-url";
import { FAQJsonLd } from "@/components/seo/JsonLd";

type VisaType = "no-visa" | "visa-on-arrival-60" | "visa-on-arrival-14" | "visa-required";

interface Country {
  name: string;
  requirement: VisaType;
}

const countries: Country[] = [
  // No visa required
  { name: "Angola", requirement: "no-visa" },
  { name: "Antigua and Barbuda", requirement: "no-visa" },
  { name: "Argentina", requirement: "no-visa" },
  { name: "Australia", requirement: "no-visa" },
  { name: "Austria", requirement: "no-visa" },
  { name: "Bahamas", requirement: "no-visa" },
  { name: "Bahrain", requirement: "no-visa" },
  { name: "Barbados", requirement: "no-visa" },
  { name: "Belgium", requirement: "no-visa" },
  { name: "Belize", requirement: "no-visa" },
  { name: "Benin", requirement: "no-visa" },
  { name: "Botswana", requirement: "no-visa" },
  { name: "Brazil", requirement: "no-visa" },
  { name: "Brunei Darussalam", requirement: "no-visa" },
  { name: "Bulgaria", requirement: "no-visa" },
  { name: "Burundi", requirement: "no-visa" },
  { name: "Canada", requirement: "no-visa" },
  { name: "Cape Verde", requirement: "no-visa" },
  { name: "Chad", requirement: "no-visa" },
  { name: "Chile", requirement: "no-visa" },
  { name: "China", requirement: "no-visa" },
  { name: "Congo (Brazzaville)", requirement: "no-visa" },
  { name: "Croatia", requirement: "no-visa" },
  { name: "Cyprus", requirement: "no-visa" },
  { name: "Czech Republic", requirement: "no-visa" },
  { name: "Democratic Rep. of Congo", requirement: "no-visa" },
  { name: "Denmark", requirement: "no-visa" },
  { name: "Dominica", requirement: "no-visa" },
  { name: "Egypt", requirement: "no-visa" },
  { name: "Estonia", requirement: "no-visa" },
  { name: "Fiji", requirement: "no-visa" },
  { name: "Finland", requirement: "no-visa" },
  { name: "France", requirement: "no-visa" },
  { name: "Gabon", requirement: "no-visa" },
  { name: "Gambia", requirement: "no-visa" },
  { name: "Georgia", requirement: "no-visa" },
  { name: "Germany", requirement: "no-visa" },
  { name: "Ghana", requirement: "no-visa" },
  { name: "Greece", requirement: "no-visa" },
  { name: "Grenada", requirement: "no-visa" },
  { name: "Hong Kong", requirement: "no-visa" },
  { name: "Hungary", requirement: "no-visa" },
  { name: "Iceland", requirement: "no-visa" },
  { name: "India", requirement: "no-visa" },
  { name: "Ireland", requirement: "no-visa" },
  { name: "Israel", requirement: "no-visa" },
  { name: "Italy", requirement: "no-visa" },
  { name: "Jamaica", requirement: "no-visa" },
  { name: "Japan", requirement: "no-visa" },
  { name: "Kenya", requirement: "no-visa" },
  { name: "Kiribati", requirement: "no-visa" },
  { name: "Korea (South)", requirement: "no-visa" },
  { name: "Kuwait", requirement: "no-visa" },
  { name: "Latvia", requirement: "no-visa" },
  { name: "Lesotho", requirement: "no-visa" },
  { name: "Liechtenstein", requirement: "no-visa" },
  { name: "Lithuania", requirement: "no-visa" },
  { name: "Luxembourg", requirement: "no-visa" },
  { name: "Macau SAR", requirement: "no-visa" },
  { name: "Malawi", requirement: "no-visa" },
  { name: "Malaysia", requirement: "no-visa" },
  { name: "Maldives", requirement: "no-visa" },
  { name: "Malta", requirement: "no-visa" },
  { name: "Mexico", requirement: "no-visa" },
  { name: "Monaco", requirement: "no-visa" },
  { name: "Mozambique", requirement: "no-visa" },
  { name: "Namibia", requirement: "no-visa" },
  { name: "Nauru", requirement: "no-visa" },
  { name: "Netherlands", requirement: "no-visa" },
  { name: "New Zealand", requirement: "no-visa" },
  { name: "Norway", requirement: "no-visa" },
  { name: "Oman", requirement: "no-visa" },
  { name: "Papua New Guinea", requirement: "no-visa" },
  { name: "Paraguay", requirement: "no-visa" },
  { name: "Poland", requirement: "no-visa" },
  { name: "Portugal", requirement: "no-visa" },
  { name: "Qatar", requirement: "no-visa" },
  { name: "Romania", requirement: "no-visa" },
  { name: "Russia", requirement: "no-visa" },
  { name: "Rwanda", requirement: "no-visa" },
  { name: "Samoa", requirement: "no-visa" },
  { name: "San Marino", requirement: "no-visa" },
  { name: "Saudi Arabia", requirement: "no-visa" },
  { name: "Seychelles", requirement: "no-visa" },
  { name: "Sierra Leone", requirement: "no-visa" },
  { name: "Singapore", requirement: "no-visa" },
  { name: "Slovakia", requirement: "no-visa" },
  { name: "Slovenia", requirement: "no-visa" },
  { name: "Solomon Islands", requirement: "no-visa" },
  { name: "South Africa", requirement: "no-visa" },
  { name: "Spain", requirement: "no-visa" },
  { name: "Saint Kitts and Nevis", requirement: "no-visa" },
  { name: "Saint Lucia", requirement: "no-visa" },
  { name: "Saint Vincent & Grenadines", requirement: "no-visa" },
  { name: "Suriname", requirement: "no-visa" },
  { name: "Eswatini (Swaziland)", requirement: "no-visa" },
  { name: "Sweden", requirement: "no-visa" },
  { name: "Switzerland", requirement: "no-visa" },
  { name: "Tanzania", requirement: "no-visa" },
  { name: "Tonga", requirement: "no-visa" },
  { name: "Trinidad & Tobago", requirement: "no-visa" },
  { name: "Tunisia", requirement: "no-visa" },
  { name: "Turkey", requirement: "no-visa" },
  { name: "Tuvalu", requirement: "no-visa" },
  { name: "Uganda", requirement: "no-visa" },
  { name: "Ukraine", requirement: "no-visa" },
  { name: "United Arab Emirates", requirement: "no-visa" },
  { name: "United Kingdom", requirement: "no-visa" },
  { name: "United States", requirement: "no-visa" },
  { name: "Vanuatu", requirement: "no-visa" },
  { name: "Vatican", requirement: "no-visa" },
  { name: "Zambia", requirement: "no-visa" },
  { name: "Zimbabwe", requirement: "no-visa" },

  // Visa on arrival - 60 days
  { name: "Albania", requirement: "visa-on-arrival-60" },
  { name: "Andorra", requirement: "visa-on-arrival-60" },
  { name: "Armenia", requirement: "visa-on-arrival-60" },
  { name: "Azerbaijan", requirement: "visa-on-arrival-60" },
  { name: "Belarus", requirement: "visa-on-arrival-60" },
  { name: "Bhutan", requirement: "visa-on-arrival-60" },
  { name: "Bolivia", requirement: "visa-on-arrival-60" },
  { name: "Bosnia & Herzegovina", requirement: "visa-on-arrival-60" },
  { name: "Burkina Faso", requirement: "visa-on-arrival-60" },
  { name: "Cambodia", requirement: "visa-on-arrival-60" },
  { name: "Cameroon", requirement: "visa-on-arrival-60" },
  { name: "Central African Republic", requirement: "visa-on-arrival-60" },
  { name: "Colombia", requirement: "visa-on-arrival-60" },
  { name: "Costa Rica", requirement: "visa-on-arrival-60" },
  { name: "Cote D'Ivoire", requirement: "visa-on-arrival-60" },
  { name: "Cuba", requirement: "visa-on-arrival-60" },
  { name: "Djibouti", requirement: "visa-on-arrival-60" },
  { name: "Dominican Republic", requirement: "visa-on-arrival-60" },
  { name: "Ecuador", requirement: "visa-on-arrival-60" },
  { name: "El Salvador", requirement: "visa-on-arrival-60" },
  { name: "Equatorial Guinea", requirement: "visa-on-arrival-60" },
  { name: "Eritrea", requirement: "visa-on-arrival-60" },
  { name: "Ethiopia", requirement: "visa-on-arrival-60" },
  { name: "Guatemala", requirement: "visa-on-arrival-60" },
  { name: "Guinea", requirement: "visa-on-arrival-60" },
  { name: "Guinea Bissau", requirement: "visa-on-arrival-60" },
  { name: "Haiti", requirement: "visa-on-arrival-60" },
  { name: "Honduras", requirement: "visa-on-arrival-60" },
  { name: "Indonesia", requirement: "visa-on-arrival-60" },
  { name: "Jordan", requirement: "visa-on-arrival-60" },
  { name: "Kazakhstan", requirement: "visa-on-arrival-60" },
  { name: "Kyrgyzstan", requirement: "visa-on-arrival-60" },
  { name: "Lebanon", requirement: "visa-on-arrival-60" },
  { name: "Liberia", requirement: "visa-on-arrival-60" },
  { name: "Macedonia", requirement: "visa-on-arrival-60" },
  { name: "Marshall Islands", requirement: "visa-on-arrival-60" },
  { name: "Mauritania", requirement: "visa-on-arrival-60" },
  { name: "Micronesia", requirement: "visa-on-arrival-60" },
  { name: "Moldova", requirement: "visa-on-arrival-60" },
  { name: "Mongolia", requirement: "visa-on-arrival-60" },
  { name: "Montenegro", requirement: "visa-on-arrival-60" },
  { name: "Morocco", requirement: "visa-on-arrival-60" },
  { name: "Nepal", requirement: "visa-on-arrival-60" },
  { name: "Nicaragua", requirement: "visa-on-arrival-60" },
  { name: "Niger", requirement: "visa-on-arrival-60" },
  { name: "Palau", requirement: "visa-on-arrival-60" },
  { name: "Panama", requirement: "visa-on-arrival-60" },
  { name: "Peru", requirement: "visa-on-arrival-60" },
  { name: "Philippines", requirement: "visa-on-arrival-60" },
  { name: "Sao Tome & Principe", requirement: "visa-on-arrival-60" },
  { name: "Senegal", requirement: "visa-on-arrival-60" },
  { name: "Serbia", requirement: "visa-on-arrival-60" },
  { name: "Sri Lanka", requirement: "visa-on-arrival-60" },
  { name: "Tajikistan", requirement: "visa-on-arrival-60" },
  { name: "Taiwan", requirement: "visa-on-arrival-60" },
  { name: "Thailand", requirement: "visa-on-arrival-60" },
  { name: "Timor Leste", requirement: "visa-on-arrival-60" },
  { name: "Togo", requirement: "visa-on-arrival-60" },
  { name: "Turkmenistan", requirement: "visa-on-arrival-60" },
  { name: "Uruguay", requirement: "visa-on-arrival-60" },
  { name: "Uzbekistan", requirement: "visa-on-arrival-60" },
  { name: "Venezuela", requirement: "visa-on-arrival-60" },
  { name: "Vietnam", requirement: "visa-on-arrival-60" },

  // Visa on arrival - 14 days
  { name: "Algeria", requirement: "visa-on-arrival-14" },
  { name: "Comoros", requirement: "visa-on-arrival-14" },
  { name: "Iran", requirement: "visa-on-arrival-14" },
  { name: "Madagascar", requirement: "visa-on-arrival-14" },
  { name: "Myanmar", requirement: "visa-on-arrival-14" },
  { name: "Nigeria", requirement: "visa-on-arrival-14" },

  // Visa required prior to travel
  { name: "Afghanistan", requirement: "visa-required" },
  { name: "Bangladesh", requirement: "visa-required" },
  { name: "Guyana", requirement: "visa-required" },
  { name: "Iraq", requirement: "visa-required" },
  { name: "Korea (North)", requirement: "visa-required" },
  { name: "Laos", requirement: "visa-required" },
  { name: "Libya", requirement: "visa-required" },
  { name: "Mali", requirement: "visa-required" },
  { name: "Pakistan", requirement: "visa-required" },
  { name: "Palestine", requirement: "visa-required" },
  { name: "Saharawi Republic", requirement: "visa-required" },
  { name: "Somalia", requirement: "visa-required" },
  { name: "South Sudan", requirement: "visa-required" },
  { name: "Sudan", requirement: "visa-required" },
  { name: "Syria", requirement: "visa-required" },
  { name: "Yemen", requirement: "visa-required" },
];

const popularNationalityGuides = [
  "United Kingdom",
  "United States",
  "France",
  "Germany",
  "India",
  "South Africa",
  "Australia",
  "Canada",
  "United Arab Emirates",
  "China",
  "Italy",
  "Spain",
].map((name) => ({
  name,
}));

const countryCodeByName: Record<string, string> = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Andorra: "AD",
  Angola: "AO",
  "Antigua and Barbuda": "AG",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahamas: "BS",
  Bahrain: "BH",
  Bangladesh: "BD",
  Barbados: "BB",
  Belarus: "BY",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bhutan: "BT",
  Bolivia: "BO",
  "Bosnia & Herzegovina": "BA",
  Botswana: "BW",
  Brazil: "BR",
  "Brunei Darussalam": "BN",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Burundi: "BI",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  "Cape Verde": "CV",
  "Central African Republic": "CF",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Comoros: "KM",
  "Congo (Brazzaville)": "CG",
  "Costa Rica": "CR",
  "Cote D'Ivoire": "CI",
  Croatia: "HR",
  Cuba: "CU",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  "Democratic Rep. of Congo": "CD",
  Denmark: "DK",
  Djibouti: "DJ",
  Dominica: "DM",
  "Dominican Republic": "DO",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  Eritrea: "ER",
  Estonia: "EE",
  "Eswatini (Swaziland)": "SZ",
  Ethiopia: "ET",
  Fiji: "FJ",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Grenada: "GD",
  Guatemala: "GT",
  Guinea: "GN",
  "Guinea Bissau": "GW",
  Guyana: "GY",
  Haiti: "HT",
  Honduras: "HN",
  "Hong Kong": "HK",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kiribati: "KI",
  "Korea (North)": "KP",
  "Korea (South)": "KR",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  "Macau SAR": "MO",
  Macedonia: "MK",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Maldives: "MV",
  Mali: "ML",
  Malta: "MT",
  "Marshall Islands": "MH",
  Mauritania: "MR",
  Mexico: "MX",
  Micronesia: "FM",
  Moldova: "MD",
  Monaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nauru: "NR",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Palau: "PW",
  Palestine: "PS",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  Samoa: "WS",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent & Grenadines": "VC",
  "San Marino": "SM",
  "Saharawi Republic": "EH",
  "Sao Tome & Principe": "ST",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  "Solomon Islands": "SB",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Sudan": "SS",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Suriname: "SR",
  Sweden: "SE",
  Switzerland: "CH",
  Syria: "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  "Timor Leste": "TL",
  Togo: "TG",
  Tonga: "TO",
  "Trinidad & Tobago": "TT",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  Tuvalu: "TV",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Vanuatu: "VU",
  Vatican: "VA",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

function getLocalizedCountryName(name: string, locale: string) {
  const code = countryCodeByName[name];
  if (!code || locale === "en") return name;

  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? name;
  } catch {
    return name;
  }
}

export default function VisaRequirementsPage() {
  const locale = useLocale();
  const t = useTranslations("VisaRequirements");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const visaFaqs = t.raw("faqs") as { question: string; answer: string }[];
  const visaTypes = [
    { id: "all", label: t("filters.allCountries"), dot: "bg-gray-400" },
    { id: "no-visa", label: t("filters.noVisaRequired"), dot: "bg-green-500" },
    { id: "visa-on-arrival-60", label: t("filters.visaOnArrival60"), dot: "bg-indigo-500" },
    { id: "visa-on-arrival-14", label: t("filters.visaOnArrival14"), dot: "bg-yellow-400" },
    { id: "visa-required", label: t("filters.visaRequired"), dot: "bg-red-500" },
  ];

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) => {
        const matchesType = selectedType === "all" || country.requirement === selectedType;
        const localizedName = getLocalizedCountryName(country.name, locale);
        const normalizedQuery = searchQuery.toLowerCase();
        const matchesSearch =
          country.name.toLowerCase().includes(normalizedQuery) ||
          localizedName.toLowerCase().includes(normalizedQuery);
        return matchesType && matchesSearch;
      })
      .sort((a, b) =>
        getLocalizedCountryName(a.name, locale).localeCompare(getLocalizedCountryName(b.name, locale), locale),
      );
  }, [locale, selectedType, searchQuery]);

  const getRequirementBadge = (requirement: VisaType) => {
    const baseClasses = "inline-flex items-center justify-center w-24 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap";
    switch (requirement) {
      case "no-visa":
        return <span className={`${baseClasses} bg-green-200 text-green-800`}>{t("badges.noVisa")}</span>;
      case "visa-on-arrival-60":
        return <span className={`${baseClasses} bg-indigo-200 text-indigo-800`}>{t("badges.sixtyDays")}</span>;
      case "visa-on-arrival-14":
        return <span className={`${baseClasses} bg-yellow-200 text-yellow-800`}>{t("badges.fourteenDays")}</span>;
      case "visa-required":
        return <span className={`${baseClasses} bg-red-200 text-red-800`}>{t("badges.visaRequired")}</span>;
    }
  };

  return (
    <>
      <FAQJsonLd items={visaFaqs} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[44vh] min-h-[280px]">
          <Image
            src={getImageUrl("/images/banners/ile-aux-fouquets-lighthouse-mauritius.jpg")}
            alt={t("hero.imageAlt")}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {t("hero.title")}
              </h1>
              <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-6 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <p className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
              {t("lastUpdated", { date: t("lastUpdatedDate") })}
            </p>
          </div>
        </section>

        {/* Visa Types Info */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("types.title")}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{t("types.tourist.title")}</h3>
                <p className="text-sm text-gray-600">
                  {t("types.tourist.description")}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{t("types.business.title")}</h3>
                <p className="text-sm text-gray-600">
                  {t("types.business.description")}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{t("types.medical.title")}</h3>
                <p className="text-sm text-gray-600">
                  {t("types.medical.description")}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{t("types.premium.title")}</h3>
                <p className="text-sm text-gray-600">
                  {t("types.premium.description")}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              {t("source.label")} <a href="https://passport.govmu.org/passport/?page_id=605" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:text-orange-600 underline">{t("source.name")}</a>
            </p>
          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {t("popular.title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("popular.subtitle")}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularNationalityGuides.map((item) => (
                <article key={item.name} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-900">
                    {t("popular.cardTitle", { country: getLocalizedCountryName(item.name, locale) })}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{t("popular.cardAnswer")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Country List */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("countryList.title")}</h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="country-search" className="sr-only">{t("countryList.searchLabel")}</label>
                <input
                  id="country-search"
                  type="text"
                  placeholder={t("countryList.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {visaTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      selectedType === type.id
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${type.dot}`} />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-4">
              {t("countryList.showing", { count: filteredCountries.length })}
            </p>

            {/* Country Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredCountries.map((country) => (
                <div
                  key={country.name}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {getLocalizedCountryName(country.name, locale)}
                  </span>
                  {getRequirementBadge(country.requirement)}
                </div>
              ))}
            </div>

            <noscript>
              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("countryList.fullListTitle")}
                </h3>
                <ul className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2 lg:grid-cols-3">
                  {countries
                    .slice()
                    .sort((a, b) =>
                      getLocalizedCountryName(a.name, locale).localeCompare(
                        getLocalizedCountryName(b.name, locale),
                        locale,
                      ),
                    )
                    .map((country) => (
                      <li key={country.name}>
                        {getLocalizedCountryName(country.name, locale)}: {t(`requirementText.${country.requirement}`)}
                      </li>
                    ))}
                </ul>
              </div>
            </noscript>

            {filteredCountries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {t("countryList.empty")}
              </div>
            )}
          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("faqTitle")}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {visaFaqs.map((item) => (
                <article key={item.question} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">{item.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("important.title")}</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <ul className="space-y-3 text-sm text-gray-700">
                {(t.raw("important.items") as string[]).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-orange-500 font-semibold">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              {t("important.sourceBefore")} <a href="https://passport.govmu.org/passport/?page_id=605" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:text-orange-600 underline">{t("important.sourceLink")}</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
