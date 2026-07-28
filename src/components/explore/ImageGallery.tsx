// src/components/explore/ImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  mainImage: string;
  title: string;
}

export default function ImageGallery({ mainImage, title }: ImageGalleryProps) {
  // Mock multiple images using variations/placeholders based on main image
  const galleryImages = [
    mainImage,
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  ];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="space-y-4">
      {/* Main Display Image */}
      <div className="relative h-[380px] w-full overflow-hidden rounded-[28px] bg-white shadow-sm md:h-[480px]">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* Media Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {galleryImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`relative h-20 w-full overflow-hidden rounded-2xl border-2 transition-all ${
              selectedImage === img
                ? "border-[#1F4B43] shadow-md ring-2 ring-[#1F4B43]/20"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${title} preview ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}