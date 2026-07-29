"use client";

import { useTransition, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { ReactNode } from "react";

interface PlanTripButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Optional loading content (defaults to spinner + translated "Loading...") */
  loadingContent?: ReactNode;
}

export default function PlanTripButton({
  href,
  children,
  className = "",
  loadingContent,
}: PlanTripButtonProps) {
  const router = useRouter();
  const t = useTranslations("Buttons");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);

  const defaultLoadingContent = (
    <>
      <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      <span>{t("loading")}</span>
    </>
  );

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.push(href))}
      disabled={isPending}
      className={className}
      aria-busy={isPending}
      aria-label={isPending ? t("loadingItineraries") : undefined}
    >
      {isPending ? (
        <span className="inline-flex items-center gap-2 justify-center">
          {loadingContent ?? defaultLoadingContent}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
