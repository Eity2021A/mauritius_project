"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  redirectTo?: string;
}

export default function AuthModal({ open, onClose, redirectTo }: AuthModalProps) {
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState("");

  const getNextPath = useCallback(() => {
    if (redirectTo?.startsWith("/")) return redirectTo;
    if (typeof window === "undefined") return "/";
    const next = `${window.location.pathname}${window.location.search}`;
    return next || "/";
  }, [redirectTo]);

  const buildCallbackUrl = useCallback(() => {
    if (typeof window === "undefined") return "/auth/callback";
    // When on localhost, always use current origin so OAuth redirects back here
    // (avoids env/cache issues; Supabase Redirect URLs must allow e.g. http://localhost:3000/**)
    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");
    const origin = isLocalhost
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL ||
        (typeof window !== "undefined" ? window.location.origin : "");
    const next = getNextPath();
    return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
  }, [getNextPath]);

  useEffect(() => {
    if (open) {
      setError("");
      setOauthLoading(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleGoogleSignIn = useCallback(async () => {
    setError("");
    setOauthLoading(true);
    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: buildCallbackUrl(),
          scopes: "email profile",
        },
      });
      if (oauthError) {
        setError(oauthError.message);
        setOauthLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setOauthLoading(false);
    }
  }, [buildCallbackUrl]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div
          className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to continue
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Sign in with your Google account to save itineraries and manage your trips.
            </p>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={oauthLoading}
              className="w-full px-4 py-3 min-h-[48px] border border-gray-200 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {oauthLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Redirecting...</span>
                </>
              ) : (
                <>
                  <img
                    src="/images/icons/google-icon-logo-svgrepo-com.svg"
                    alt=""
                    aria-hidden
                    className="w-5 h-5"
                  />
                  Continue with Google
                </>
              )}
            </button>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              By signing in, you agree to our terms of service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
