// components/GallerySection.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type GalleryItem = {
  id: number;
  image: string;
};

const TOTAL_IMAGES = 60;
const IMAGES_PER_LOAD = 20;

// Dummy Unsplash images
const galleryData: GalleryItem[] = Array.from(
  { length: TOTAL_IMAGES },
  (_, index) => ({
    id: index + 1,
    image: `https://images.unsplash.com/photo-${
      [
        "1521791136064-7986c2920216",
        "1581578731548-c64695cc6952",
        "1520607162513-77705c0f0d4a",
        "1505693416388-ac5ce068fe85",
        "1484154218962-a197022b5858",
        "1513694203232-719a280e022f",
        "1497366754035-f200968a6e72",
        "1527515637462-cff94eecc1ac",
      ][index % 8]
    }?auto=format&fit=crop&w=1000&q=80`,
  })
);

export default function GallerySection() {
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_LOAD);

  const visibleImages = useMemo(
    () => galleryData.slice(0, visibleCount),
    [visibleCount]
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + IMAGES_PER_LOAD);
  };

  return (
    <section className="w-full bg-[#edf6f7] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-4 flex justify-center">
          <span className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow">
            Gallery
          </span>
        </div>

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0d4ea6] md:text-5xl">
            Latest Camz Cleaning Projects
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Explore our latest Camz Cleaning projects showcasing professional
            workmanship, detailed cleaning, and outstanding results for homes
            and businesses.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
          {visibleImages.map((item) => (
            <div
              key={item.id}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
            >
              <div className="relative w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={`Gallery Image ${item.id}`}
                  width={1000}
                  height={1000}
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < galleryData.length && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="rounded-full bg-[#0d4ea6] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#083b7e]"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}