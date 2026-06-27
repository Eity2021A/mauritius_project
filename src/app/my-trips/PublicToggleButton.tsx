"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toggleItineraryPublic } from "@/lib/itinerary-actions";

interface Props {
  id: string;
  isPublic: boolean;
  isAnonymous: boolean;
}

export default function PublicToggleButton({ id, isPublic: initialPublic, isAnonymous: initialAnonymous }: Props) {
  const [isPublic, setIsPublic] = useState(initialPublic);
  const [isAnonymous, setIsAnonymous] = useState(initialAnonymous);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingAnonymous, setPendingAnonymous] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!showModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showModal]);

  const handleToggle = useCallback(async () => {
    if (isPublic) {
      setLoading(true);
      const result = await toggleItineraryPublic(id, false);
      if (result.ok) {
        setIsPublic(false);
        setIsAnonymous(false);
        router.refresh();
      }
      setLoading(false);
    } else {
      setPendingAnonymous(false);
      setShowModal(true);
    }
  }, [id, isPublic, router]);

  const confirmMakePublic = useCallback(async () => {
    setConfirmLoading(true);
    const result = await toggleItineraryPublic(id, true, pendingAnonymous);
    setConfirmLoading(false);
    setShowModal(false);
    if (result.ok) {
      setIsPublic(true);
      setIsAnonymous(pendingAnonymous);
      router.refresh();
    }
  }, [id, pendingAnonymous, router]);

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors disabled:opacity-60 ${
          isPublic
            ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
            : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
        }`}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
            <span>Loading...</span>
          </>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            {isPublic ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-3 0h15a2.25 2.25 0 012.25 2.25v5.25A2.25 2.25 0 0119.5 20.25h-15A2.25 2.25 0 012.25 18V12.75A2.25 2.25 0 014.5 10.5z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 8.25h-13.5a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25zM7.5 8.25V6.75a4.5 4.5 0 019 0" />
            )}
          </svg>
        )}
        {isPublic
          ? isAnonymous
            ? "Public (Anonymous)"
            : "Make Private"
          : "Make Public"}
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.777.515-3.434 1.404-4.832" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Share with the community</h3>
                <p className="text-sm text-gray-500">Your itinerary will be visible to everyone</p>
              </div>
            </div>

            <div className="mb-5">
              <label
                className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50/30 cursor-pointer transition-colors"
                htmlFor={`anon-toggle-${id}`}
              >
                <input
                  type="checkbox"
                  id={`anon-toggle-${id}`}
                  checked={pendingAnonymous}
                  onChange={(e) => setPendingAnonymous(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Hide my name</span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Your itinerary will show &quot;by Community User&quot; instead of your name
                  </p>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={confirmLoading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmMakePublic}
                disabled={confirmLoading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-wait"
              >
                {confirmLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>Loading...</span>
                  </>
                ) : (
                  "Make Public"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
