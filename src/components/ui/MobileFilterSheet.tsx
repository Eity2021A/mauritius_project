"use client";

import { useEffect, type ReactNode } from "react";

interface MobileFilterSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onApply: () => void;
  onReset?: () => void;
  hasActiveFilters?: boolean;
  applyLabel?: string;
  children: ReactNode;
}

export default function MobileFilterSheet({
  open,
  title,
  onClose,
  onApply,
  onReset,
  hasActiveFilters = false,
  applyLabel = "Apply Filters",
  children,
}: MobileFilterSheetProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[120]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-[121] sm:hidden">
        <div
          className="bg-white rounded-t-2xl shadow-2xl max-h-[82vh] overflow-hidden animate-slide-up flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center gap-2">
              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    hasActiveFilters
                      ? "bg-orange-50 text-orange-700 hover:bg-orange-100"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  disabled={!hasActiveFilters}
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 -mr-1 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-gray-700"
                aria-label="Close filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto">{children}</div>

          <div
            className="p-4 border-t border-gray-200 bg-white"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}
          >
            <button
              type="button"
              onClick={onApply}
              className="w-full min-h-[48px] rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              {applyLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
