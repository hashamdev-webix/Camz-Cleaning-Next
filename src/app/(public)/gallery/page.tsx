import CommonHeroSection from '@/components/common/CommonHeroSection'
import GallerySection from '@/components/gallery/GallerySection'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: "Our Cleaning Work Gallery | Camz Cleaning",
  description:
    "Browse photos of Camz Cleaning projects, including residential, commercial, and vehicle cleaning results from across Calgary and neighbouring communities.",
  path: "/gallery/",
})

export default function page() {

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
    <GallerySection/>
    
    </div>
  )
}
