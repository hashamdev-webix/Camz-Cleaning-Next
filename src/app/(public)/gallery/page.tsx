import CommonHeroSection from "@/components/common/CommonHeroSection";
import GallerySection from "@/components/gallery/GallerySection";
import { createPublicServerClient } from "@/lib/supabase/public-server";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Project Gallery | Camz Cleaning",
  description:
    "View recent residential, commercial, vehicle and seasonal property cleaning projects completed by Camz Cleaning.",
  path: "/gallery/",
});

export const revalidate = 300;

export default async function GalleryPage() {
  const supabase = createPublicServerClient();

  const { data, error } = await supabase
    .from("gallery")
    .select("id, image_url, created_at")
    .order("created_at", { ascending: false })
    .range(0, 8);

  if (error) throw error;

  const initialImages = data ?? [];

  return (
    <div>
      <CommonHeroSection
        backgroundImage="/wp-admin/uploads/blog-bg.webp"
        title={<>Cleaning Project Gallery</>}
      />

      <GallerySection
        initialImages={initialImages.slice(0, 8)}
        initialHasMore={initialImages.length > 8}
      />
    </div>
  );
}