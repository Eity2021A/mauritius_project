"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getImageUrl } from "@/lib/image-url";

interface PhotoGalleryProps {
  images: string[];
  beachName: string;
}

function getResizedUrls(images: string[], width: number): string[] {
  return images
    .filter((src): src is string => typeof src === "string" && src.length > 0)
    .map((src) =>
      src.startsWith("http") ? src : getImageUrl(src, { width, quality: 75 })
    );
}

function getOriginalUrls(images: string[]): string[] {
  return images
    .filter((src): src is string => typeof src === "string" && src.length > 0)
    .map((src) => (src.startsWith("http") ? src : getImageUrl(src)));
}

export default function PhotoGallery({ images, beachName }: PhotoGalleryProps) {
  const thumbnailUrls = useMemo(() => getResizedUrls(images, 400), [images]);
  const lightboxUrls = useMemo(() => getOriginalUrls(images), [images]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    if (e.key === "Escape") {
      setSelectedImage(null);
    } else if (e.key === "ArrowRight") {
      setSelectedImage((prev) =>
        prev !== null ? (prev + 1) % lightboxUrls.length : null
      );
    } else if (e.key === "ArrowLeft") {
      setSelectedImage((prev) =>
        prev !== null
          ? (prev - 1 + lightboxUrls.length) % lightboxUrls.length
          : null
      );
    }
  }, [selectedImage, lightboxUrls.length]);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, handleKeyDown]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {thumbnailUrls.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 img-shimmer"
          >
            <img
              src={image}
              alt={`${beachName} Beach photo ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation - Previous (wraps to last image) */}
          {lightboxUrls.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(
                  (selectedImage - 1 + lightboxUrls.length) % lightboxUrls.length
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Navigation - Next (wraps to first image) */}
          {lightboxUrls.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((selectedImage + 1) % lightboxUrls.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div 
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxUrls[selectedImage]}
              alt={`${beachName} Beach photo ${selectedImage + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {selectedImage + 1} / {lightboxUrls.length}
          </div>
        </div>
      )}
    </>
  );
}
