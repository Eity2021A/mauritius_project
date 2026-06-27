"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import { getImageUrl } from "@/lib/image-url";

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

const visaTypes = [
  { id: "all", label: "All Countries", dot: "bg-gray-400" },
  { id: "no-visa", label: "No Visa Required", dot: "bg-green-500" },
  { id: "visa-on-arrival-60", label: "Visa on Arrival (60 days)", dot: "bg-indigo-500" },
  { id: "visa-on-arrival-14", label: "Visa on Arrival (14 days)", dot: "bg-yellow-400" },
  { id: "visa-required", label: "Visa Required", dot: "bg-red-500" },
];

export default function VisaRequirementsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) => {
        const matchesType = selectedType === "all" || country.requirement === selectedType;
        const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedType, searchQuery]);

  const getRequirementBadge = (requirement: VisaType) => {
    const baseClasses = "inline-flex items-center justify-center w-24 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap";
    switch (requirement) {
      case "no-visa":
        return <span className={`${baseClasses} bg-green-200 text-green-800`}>No Visa</span>;
      case "visa-on-arrival-60":
        return <span className={`${baseClasses} bg-indigo-200 text-indigo-800`}>60 days</span>;
      case "visa-on-arrival-14":
        return <span className={`${baseClasses} bg-yellow-200 text-yellow-800`}>14 days</span>;
      case "visa-required":
        return <span className={`${baseClasses} bg-red-200 text-red-800`}>Visa required</span>;
    }
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[44vh] min-h-[280px]">
          <Image
            src={getImageUrl("/images/banners/ile-aux-fouquets-lighthouse-mauritius.jpg")}
            alt="Mauritius Visa Requirements"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center px-4 max-w-4xl mx-auto translate-y-[2rem]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Visa Requirements
              </h1>
              <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
                Entry requirements for visiting Mauritius by nationality
              </p>
            </div>
          </div>
        </section>

        {/* Visa Types Info */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Visas</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Tourist Visa</h3>
                <p className="text-sm text-gray-600">
                  Allows visitors to stay for vacation purposes. Maximum period of 6 months may be granted per calendar year on a case-by-case basis.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Business Visa</h3>
                <p className="text-sm text-gray-600">
                  For establishing or conducting business. Maximum 120 days per calendar year, with each trip not exceeding 90 days.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Medical Visa</h3>
                <p className="text-sm text-gray-600">
                  Granted on arrival for medical treatment at registered private health institutions. Valid for duration of treatment, up to 6 months.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Premium Visa</h3>
                <p className="text-sm text-gray-600">
                  Long-stay visa for remote workers and retirees wishing to stay in Mauritius for extended periods.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Source: <a href="https://passport.govmu.org/passport/?page_id=605" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:text-orange-600 underline">Passport and Immigration Office, Government of Mauritius</a>
            </p>
          </div>
        </section>

        {/* Country List */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Visa Requirements by Country</h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="country-search" className="sr-only">Search country</label>
                <input
                  id="country-search"
                  type="text"
                  placeholder="Search your country..."
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
              Showing {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"}
            </p>

            {/* Country Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredCountries.map((country) => (
                <div
                  key={country.name}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                >
                  <span className="text-sm font-medium text-gray-900">{country.name}</span>
                  {getRequirementBadge(country.requirement)}
                </div>
              ))}
            </div>

            {filteredCountries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No countries found matching your search.
              </div>
            )}
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-orange-500 font-semibold">•</span>
                  A visa allows you to travel to Mauritius but does not guarantee entry. Final admission is at the discretion of the Immigration Officer.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-semibold">•</span>
                  Visas and extensions of stay are issued free of charge.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-semibold">•</span>
                  Travelers without a required visa may be repatriated at the carrier&apos;s cost.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-semibold">•</span>
                  Overstaying your visa period is an offense and may result in prosecution.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-semibold">•</span>
                  Students should only travel after their study application has been approved.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-semibold">•</span>
                  Holders of EU passports and diplomatic passports (except certain countries) are exempt from visa regulations.
                </li>
              </ul>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              For the most up-to-date information, please visit the official <a href="https://passport.govmu.org/passport/?page_id=605" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-500 hover:text-orange-600 underline">Passport and Immigration Office website</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
