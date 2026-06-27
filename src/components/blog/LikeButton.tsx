"use client";

import { useState, useEffect, useRef } from "react";

interface LikeButtonProps {
  slug: string;
  initialLikes?: number;
}

export default function LikeButton({ slug, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const initializedRef = useRef(false);

  // Check if user has already liked this post (stored in localStorage)
  // Using ref to prevent React Strict Mode double-execution issues
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    // Defer state updates to next tick to avoid cascading renders
    const loadFromStorage = () => {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
      const storedLikes = JSON.parse(localStorage.getItem("blogLikes") || "{}");
      
      if (likedPosts[slug]) {
        setHasLiked(true);
      }
      if (storedLikes[slug] !== undefined) {
        setLikes(storedLikes[slug]);
      }
    };
    
    // Use requestAnimationFrame to batch state updates
    requestAnimationFrame(loadFromStorage);
  }, [slug]);

  const handleLike = () => {
    if (hasLiked) {
      // Unlike
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      setHasLiked(false);
      
      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
      delete likedPosts[slug];
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      
      const storedLikes = JSON.parse(localStorage.getItem("blogLikes") || "{}");
      storedLikes[slug] = newLikes;
      localStorage.setItem("blogLikes", JSON.stringify(storedLikes));
    } else {
      // Like
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      setIsAnimating(true);
      
      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
      likedPosts[slug] = true;
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      
      const storedLikes = JSON.parse(localStorage.getItem("blogLikes") || "{}");
      storedLikes[slug] = newLikes;
      localStorage.setItem("blogLikes", JSON.stringify(storedLikes));
      
      // Reset animation
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border transition-all duration-200 ${
        hasLiked
          ? "bg-red-50 border-red-200 text-red-600"
          : "bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500"
      }`}
      aria-label={hasLiked ? "Unlike this article" : "Like this article"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={hasLiked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={hasLiked ? 0 : 2}
        className={`w-5 h-5 transition-transform ${isAnimating ? "scale-125" : "scale-100"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span className="font-medium text-sm">{likes} {likes === 1 ? "Like" : "Likes"}</span>
    </button>
  );
}
