"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import CommonHeroSection from "@/components/common/CommonHeroSection";
import BlogCard from "@/components/blog/BlogCard";

type Blog = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("Fetching blogs...");
        const supabase = createClient();
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });

        console.log("Blogs data:", data);
        console.log("Blogs error:", error);

        if (error) {
          console.error("Supabase error:", error);
          setBlogs([]);
        } else {
          setBlogs(data || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setBlogs([]);
      } finally {
        setLoading(false); // ALWAYS set loading false
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-[#f7f7f7] py-20">
      <CommonHeroSection
        backgroundImage="/wp-admin/uploads/blog-bg.webp"
        title={<>Our Blogs</>}
      />
      <div className="mx-auto container-custom px-4">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-cyan-500"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <div className="flex justify-center py-12">
            <p className="text-lg text-gray-600">No blogs yet</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 py-12">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
