"use client";

import PhotoGallery from "@/components/PhotoGallery";

interface PhotoGalleryWrapperProps {
  images: string[];
  beachName: string;
}

export default function PhotoGalleryWrapper({ images, beachName }: PhotoGalleryWrapperProps) {
  return <PhotoGallery images={images} beachName={beachName} />;
}
