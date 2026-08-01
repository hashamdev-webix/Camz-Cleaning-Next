import CommonHeroSection from "@/components/common/CommonHeroSection";
import BlogCard from "@/components/blog/BlogCard";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { createPublicServerClient } from "@/lib/supabase/public-server";

export const revalidate = 300;

type Blog = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
};

export default async function BlogsPage() {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("id, title, description, image_url, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  const blogs = (data ?? []) as Blog[];

  return (
    <>
      <PageJsonLd path="/blogs/" />
      <div className="bg-[#f7f7f7] py-20">
        <CommonHeroSection
          backgroundImage="/wp-admin/uploads/blog-bg.webp"
          title="Our Blogs"
        />
        <div className="mx-auto container-custom px-4">
          {blogs.length === 0 ? (
            <div className="flex justify-center py-12">
              <p className="text-lg text-gray-600">No blogs yet</p>
            </div>
          ) : (
            <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
