
import BlogGrid from '@/components/blog/BlogGrid'
import CommonHeroSection from '@/components/common/CommonHeroSection'
export default function page() {

  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/wp-admin/uploads/blog-bg.webp" 
        title={
          <>
           Our Blogs
          </>
        }
      />
      <BlogGrid/>
    
    </div>
  )
}
