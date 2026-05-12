"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Calendar, User, MessageCircle, Search } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

type Step = {
  title: string;
  description: string;
};

type Blog = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  faqs: FAQ[];
  steps: Step[];
  detail_images: string[];
};

export default function BlogDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching blog details for id:", id);
        const supabase = createClient();

        // Fetch current blog
        const { data: blogData, error: blogError } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        console.log("Blog data:", blogData);
        console.log("Blog error:", blogError);

        if (blogError) throw blogError;
        setBlog(blogData);

        // Fetch recent posts (top 3, excluding current)
        const { data: recentData } = await supabase
          .from("blogs")
          .select("*")
          .neq("id", id)
          .order("created_at", { ascending: false })
          .limit(3);

        console.log("Recent posts:", recentData);
        setRecentPosts(recentData || []);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <main className="bg-[#f7f7f7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-cyan-500"></div>
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </main>
    );
  }

  // Not Found State
  if (!blog) {
    return (
      <main className="bg-[#f7f7f7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Blog not found</h1>
          <Link
            href="/blogs"
            className="mt-6 inline-block rounded-lg bg-[#0B4E9B] px-6 py-3 text-white hover:bg-[#00B7EB]"
          >
            Back to Blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f7f7]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B4E9B] py-24">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {blog.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>Camz Cleaning</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(blog.created_at)}</span>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span>0 Comments</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="mx-auto grid container-custom grid-cols-1 gap-12 px-4 lg:grid-cols-3">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-10">
            {/* Featured Image */}
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={blog.image_url}
                alt={blog.title}
                width={1200}
                height={700}
                className="w-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div className="text-lg leading-9 text-gray-700 whitespace-pre-line">
                {blog.description}
              </div>
            </div>

            {/* Detail Images */}
            {blog.detail_images && blog.detail_images.length > 0 && (
              <div className="space-y-6">
                {blog.detail_images.map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-3xl">
                    <Image
                      src={img}
                      alt={`Detail ${index + 1}`}
                      width={1200}
                      height={700}
                      className="w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Steps */}
            {blog.steps && blog.steps.length > 0 && (
              <div className="space-y-10">
                {blog.steps.map((step, index) => (
                  <div key={index} className="space-y-4">
                    <h6 className="text-3xl font-medium text-gray-700">
                      {step.title}
                    </h6>
                    <p className="text-lg leading-9 text-gray-700 whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* FAQ */}
            {blog.faqs && blog.faqs.length > 0 && (
              <div className="space-y-8">
                <h6 className="text-3xl font-medium text-gray-700">
                  FAQ&apos;s
                </h6>

                {blog.faqs.map((faq, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-2xl font-semibold text-black">
                      {faq.question}
                    </h3>
                    <p className="text-lg leading-8 text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h6 className="text-3xl font-medium text-gray-700">
                Leave a Reply
              </h6>

              <p className="mt-3 text-gray-500">
                Your email address will not be published.
              </p>

              <form className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block font-medium">Comment</label>
                  <textarea
                    rows={8}
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#0B4E9B]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#0B4E9B]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#0B4E9B]"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-[#0B4E9B] px-8 py-4 font-semibold text-white transition hover:bg-[#00B7EB]"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-10">
            {/* Search */}
            <div className="rounded-3xl bg-white shadow-sm">
              <div className="flex overflow-hidden rounded-sm border">
                <input
                  type="text"
                  placeholder="Type to start searching..."
                  className="w-full px-4 py-5 outline-none"
                />
                <button className="bg-[#0B4E9B] px-6 text-white">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* About */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h4 className="text-3xl font-bold text-[#0B4E9B]">
                About Our Company
              </h4>

              {/* Logo */}
              <div className="mt-8">
                <Image
                  src="/logo.webp"
                  alt="Camz Cleaning"
                  width={180}
                  height={80}
                  className="h-auto w-auto"
                />
              </div>

              {/* Content */}
              <div className="mt-5">
                <h4 className="text-3xl font-bold text-[#0B4E9B]">
                  Camz Cleaning
                </h4>

                <p className="mt-4 text-lg leading-8 text-gray-700">
                  Professional digital marketing agency delivering measurable
                  online results.
                </p>
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://www.instagram.com/camzcleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
                >
                  <FaInstagram size={16} />
                </a>

                <a
                  href="https://x.com/camzcleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
                >
                  <FaXTwitter size={16} />
                </a>

                <a
                  href="https://web.facebook.com/Camzcleaning1?_rdc=1&_rdr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
                >
                  <FaFacebookF size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/company/camzcleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
                >
                  <FaLinkedinIn size={16} />
                </a>

                <a
                  href="https://www.youtube.com/@CamzCleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
                >
                  <FaYoutube size={16} />
                </a>
              </div>

              {/* Bottom Border */}
              <div className="mt-10 h-[1px] w-full bg-[#0B4E9B]/30" />
            </div>

            {/* Recent Posts */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-[#0B4E9B]">
                Recent Posts
              </h3>

              <div className="mt-8 space-y-8">
                {recentPosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blogs/${item.id}`}
                    className="block border-b pb-6 last:border-0"
                  >
                    <h4 className="text-xl font-semibold text-[#0B4E9B] hover:text-[#00B7EB]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-500">
                      {formatDate(item.created_at)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
