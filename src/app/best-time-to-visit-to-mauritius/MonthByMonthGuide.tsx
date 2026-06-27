"use client";

import { useState } from "react";
import { MONTHS, SEASON_COLORS } from "@/data/best-time-months";

type MonthItem = (typeof MONTHS)[number];

export default function MonthByMonthGuide() {
  const [selectedMonth, setSelectedMonth] = useState<MonthItem>(MONTHS[3]); // Default to April

  return (
    <section className="pt-6 md:pt-8 pb-12 md:pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
          Month by Month Guide
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Select a month to see detailed weather information and what to expect
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-8">
          {MONTHS.map((month) => (
            <button
              key={month.name}
              onClick={() => setSelectedMonth(month)}
              className={`relative p-2.5 sm:p-3 md:p-4 min-h-[60px] rounded-lg font-medium transition-all ${
                selectedMonth.name === month.name
                  ? `bg-gradient-to-br ${SEASON_COLORS[month.season].gradient} text-white shadow-lg scale-105`
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
              }`}
            >
              <span className="block text-xs sm:text-sm font-bold">{month.name.substring(0, 3)}</span>
              <span className={`block text-xs md:text-sm font-bold leading-tight whitespace-nowrap ${selectedMonth.name === month.name ? "text-white" : "text-gray-900"}`}>
                {month.tempMin}–{month.tempMax}°
              </span>
              {selectedMonth.name === month.name && (
                <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent ${SEASON_COLORS[month.season].triangle}`} />
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className={`bg-gradient-to-r ${SEASON_COLORS[selectedMonth.season].gradient} px-4 py-3 md:px-5 md:py-4 text-white`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight">{selectedMonth.name}</h3>
                <p className="text-white/80 text-sm mt-0.5">{selectedMonth.season} Season</p>
              </div>
              <div className="text-right">
                <p className="text-xl md:text-2xl font-bold leading-tight">{selectedMonth.tempMin}°C – {selectedMonth.tempMax}°C</p>
                <p className="text-white/80 text-xs mt-0.5">Temperature range</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">What to Expect</h4>
              <p className="text-gray-700 leading-relaxed">{selectedMonth.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMonth.highlights.map((highlight) => (
                  <span key={highlight} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Best For</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMonth.bestFor.map((activity) => (
                  <span key={activity} className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                    ✓ {activity}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                <p className="text-gray-500 text-sm mb-1">Rainfall</p>
                <p className="text-lg font-semibold text-gray-900">{selectedMonth.rainfall}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                <p className="text-gray-500 text-sm mb-1">Humidity</p>
                <p className="text-lg font-semibold text-gray-900">{selectedMonth.humidity}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                <p className="text-gray-500 text-sm mb-1">Cyclone Risk</p>
                <p className="text-lg font-semibold text-gray-900">{selectedMonth.cycloneRisk}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
