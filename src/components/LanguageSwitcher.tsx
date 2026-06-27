"use client";

import { useState, useRef, useEffect } from "react";

export type LocaleCode = "en" | "fr" | "de" | "zh" | "hi";

const LANGUAGES: { code: LocaleCode; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
];

interface LanguageSwitcherProps {
  /** When true, use dark text (e.g. scrolled/solid header or mobile menu). */
  variant?: "light" | "dark";
  /** Optional: compact layout for mobile drawer */
  compact?: boolean;
  /** Called when user selects a language (e.g. close mobile menu). */
  onSelect?: () => void;
}

export default function LanguageSwitcher({
  variant = "dark",
  compact = false,
  onSelect,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<LocaleCode>("en");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === selected) ?? LANGUAGES[0];
  const isLight = variant === "light";

  const buttonClass = compact
    ? "flex items-center gap-2 w-full px-4 py-3 text-left text-gray-800 hover:bg-orange-500 hover:text-white min-h-[48px] transition-colors"
    : `flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors min-h-[36px] min-w-[44px] justify-center ${
        isLight
          ? "border-white/40 text-white hover:bg-white/10"
          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100"
      }`;

  if (compact) {
    return (
      <div className="border-t pt-2 mt-2">
        <div className="px-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Select Language
        </div>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => {
              setSelected(lang.code);
              onSelect?.();
            }}
            className={`${buttonClass} flex items-center justify-between w-full`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none" aria-hidden>
                {lang.flag}
              </span>
              <span>{lang.name}</span>
            </div>
            {lang.code !== "en" && (
              <span className="text-[10px] font-medium text-gray-500 bg-gray-100 rounded px-1.5 py-0.5 shrink-0">
                Coming soon
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={buttonClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.name}. Choose language`}
      >
        <span className="text-2xl leading-none" aria-hidden>
          {current.flag}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute top-full right-0 mt-2 min-w-[200px] w-56 bg-white rounded-lg shadow-lg py-2 z-[60] border border-gray-100 overflow-hidden"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              type="button"
              aria-selected={selected === lang.code}
              onClick={() => {
                setSelected(lang.code);
                setOpen(false);
                // Dummy: ready for future i18n — e.g. router.push(`/${lang.code}${pathname}`)
              }}
              className={`flex items-center justify-between gap-2 w-full px-4 py-2.5 text-left text-sm transition-colors ${
                selected === lang.code
                  ? "bg-orange-50 text-orange-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xl leading-none shrink-0" aria-hidden>
                  {lang.flag}
                </span>
                <span className="truncate">{lang.name}</span>
              </div>
              {lang.code !== "en" && (
                <span className="text-[10px] font-medium text-gray-500 bg-gray-100 rounded px-1.5 py-0.5 shrink-0 whitespace-nowrap">
                  Coming soon
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
