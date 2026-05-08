
import BlogGrid from '@/components/blog/BlogGrid'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import GallerySection from '@/components/gallery/GallerySection'
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
