// components/GallerySection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type GalleryItem = {
  id: string;
  image_url: string;
  created_at: string;
};

const IMAGES_PER_LOAD = 8;

export default function GallerySection() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_LOAD);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("Fetching gallery images...");
        const supabase = createClient();
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });

        console.log("Gallery data:", data);
        console.log("Gallery error:", error);

        if (error) {
          console.error("Supabase error:", error);
          setImages([]);
        } else {
          setImages(data || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setImages([]);
      } finally {
        setLoading(false); // ALWAYS set loading false
      }
    };

    fetchImages();
  }, []);

  const visibleImages = images.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + IMAGES_PER_LOAD);
  };

  return (
    <section className="w-full bg-[#edf6f7] py-20">
      <div className="mx-auto container-custom px-4 sm:px-6 lg:px-8">
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-cyan-500"></div>
              <p className="mt-4 text-gray-600">Loading gallery...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="flex justify-center py-12">
            <p className="text-lg text-gray-600">No images yet</p>
          </div>
        )}

        {/* Masonry Grid */}
        {!loading && images.length > 0 && (
          <>
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
              {visibleImages.map((item) => (
                <div
                  key={item.id}
                  className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
                >
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={item.image_url}
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
            {visibleCount < images.length && (
              <div className="mt-14 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="rounded-full bg-[#0d4ea6] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#083b7e]"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
