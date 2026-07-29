// components/GallerySection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export type GalleryItem = {
  id: string;
  image_url: string;
  created_at: string;
};

const IMAGES_PER_LOAD = 8;

const getAltFromUrl = (url: string): string => {
  const filename = url.split("/").pop() || "";
  const nameOnly = filename.split(".")[0];
  return nameOnly.replace(/-|_/g, " ");
};

export default function GallerySection({
  initialImages,
  initialHasMore,
}: {
  initialImages: GalleryItem[];
  initialHasMore: boolean;
}) {
  const [images, setImages] = useState<GalleryItem[]>(initialImages);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const supabase = createClient();
    const from = images.length;
    const { data, error } = await supabase
      .from("gallery")
      .select("id, image_url, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + IMAGES_PER_LOAD);

    if (!error) {
      const nextImages = (data ?? []) as GalleryItem[];
      setImages((current) => [
        ...current,
        ...nextImages.slice(0, IMAGES_PER_LOAD),
      ]);
      setHasMore(nextImages.length > IMAGES_PER_LOAD);
    }
    setLoadingMore(false);
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

        {/* Empty State */}
        {images.length === 0 && (
          <div className="flex justify-center py-12">
            <p className="text-lg text-gray-600">No images yet</p>
          </div>
        )}

        {/* Masonry Grid */}
        {images.length > 0 && (
          <>
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
                >
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={getAltFromUrl(item.image_url)}
                      width={1000}
                      height={1000}
                      className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-14 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-full bg-[#0d4ea6] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#083b7e]"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
