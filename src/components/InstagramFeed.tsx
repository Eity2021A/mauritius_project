"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import SocialFollowButtons from "@/components/SocialFollowButtons";
import { getImageUrl } from "@/lib/image-url";

const instagramPosts = [
  { 
    id: "DEr7Wv0BCHS", 
    url: "https://www.instagram.com/mauritius/reel/DEr7Wv0BCHS/",
    video: "/videos/Welcome to Mauritius.mp4",
    poster: "ile-aux-cerfs-drone-shot.jpg",
    caption: "Welcome to Mauritius"
  },
  { 
    id: "DT7bV0jE2PZ", 
    url: "https://www.instagram.com/mauritius_explored/reel/DT7bV0jE2PZ/",
    video: "/videos/Le Morne.mp4",
    poster: "beach-of-le-morne-in-the-morning.jpg",
    caption: "Le Morne"
  },
  { 
    id: "DThdVzukzIS", 
    url: "https://www.instagram.com/mauritius_explored/reel/DThdVzukzIS/",
    video: "/videos/Not a bad place to relax.mp4",
    poster: "belle-mare-beach-on-the-east-coast.jpg",
    caption: "Not a bad place to relax"
  },
];

function VideoCard({ post }: { post: typeof instagramPosts[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Intersection Observer - only load video when card is visible
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const playVideo = () => {
    if (videoRef.current) {
      playPromiseRef.current = videoRef.current.play();
      playPromiseRef.current
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Ignore AbortError - happens when pause() is called before play() resolves
        });
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      const doPause = () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      };

      if (playPromiseRef.current) {
        playPromiseRef.current.then(doPause).catch(doPause);
      } else {
        doPause();
      }
    }
  };

  const handleMouseEnter = () => playVideo();
  const handleMouseLeave = () => pauseVideo();

  const handleTouchStart = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  return (
    <a
      ref={cardRef}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-[200px] sm:w-56 md:w-72 aspect-[9/16] rounded-lg overflow-hidden snap-start cursor-pointer bg-neutral-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={(e) => {
        e.preventDefault();
        handleTouchStart();
      }}
      onClick={(e) => {
        if (!isPlaying && 'ontouchstart' in window) {
          e.preventDefault();
        }
      }}
    >
      {/* Poster Image - shows immediately while video loads */}
      <Image
        src={getImageUrl(post.poster, { width: 480, quality: 72 })}
        alt={post.caption}
        fill
        sizes="(max-width: 768px) 200px, 288px"
        className="object-cover"
        loading="lazy"
      />
      
      {/* Video - only render when visible */}
      {isVisible && (
        <video
          ref={videoRef}
          src={post.video}
          loop
          muted
          playsInline
          poster={getImageUrl(post.poster, { width: 480, quality: 72 })}
          preload="none"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      
      {/* Play Button */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
          isPlaying || !videoLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      
      {/* Instagram Icon Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </div>
      </div>
      
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p className="text-white font-medium text-sm md:text-base">
          {post.caption}
        </p>
        <p className="text-white/70 text-xs sm:text-sm mt-1 hidden sm:block">
          {isPlaying ? "Tap to watch on Instagram" : "Hover to preview"}
        </p>
        <p className="text-white/70 text-xs sm:text-sm mt-1 sm:hidden">
          {isPlaying ? "Tap again for Instagram" : "Tap to play"}
        </p>
      </div>
    </a>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function InstagramFeed() {
  const isMobile = useIsMobile();

  return (
    <section className="py-10 md:py-12 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-5 md:mb-6">
          <span className="text-orange-500 text-xs md:text-sm font-medium tracking-wider uppercase">
            @mauritius__explored
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            Follow Our Adventures
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Discover stunning destinations through our Instagram feed
          </p>
        </div>

        {/* Video Cards - desktop only; hidden on mobile for faster load */}
        {!isMobile && (
          <div className="flex justify-center gap-4 flex-wrap">
            {instagramPosts.map((post) => (
              <VideoCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <SocialFollowButtons className="mt-6" />
      </div>
    </section>
  );
}
