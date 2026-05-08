
import { blogs } from "@/data/blogs";
import CommonHeroSection from '@/components/common/CommonHeroSection'
import BlogCard from "@/components/blog/BlogCard";
export default function page() {

  return (
    <div className="bg-[#f7f7f7] py-20">
     
          <CommonHeroSection 
        backgroundImage="/wp-admin/uploads/blog-bg.webp" 
        title={
          <>
           Our Blogs
          </>
        }
      />
     <div className="mx-auto max-w-7xl px-4">

     
    {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 py-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
         </div>
    </div>
  )
}
