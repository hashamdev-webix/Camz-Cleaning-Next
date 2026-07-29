import CommonHeroSection from '@/components/common/CommonHeroSection'
import GallerySection from '@/components/gallery/GallerySection'
import { createPublicServerClient } from '@/lib/supabase/public-server'

export const revalidate = 300

export default async function GalleryPage() {
  const supabase = createPublicServerClient()
  const { data, error } = await supabase
    .from('gallery')
    .select('id, image_url, created_at')
    .order('created_at', { ascending: false })
    .range(0, 8)

  if (error) throw error
  const initialImages = data ?? []

  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/wp-admin/uploads/blog-bg.webp" 
        title={
          <>
      Gallery
          </>
        }
      />
    <GallerySection
      initialImages={initialImages.slice(0, 8)}
      initialHasMore={initialImages.length > 8}
    />
    
    </div>
  )
}
