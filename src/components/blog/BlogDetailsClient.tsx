"use client";

import { useState } from "react";
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
import { Calendar, User, MessageCircle, Search, Loader2 } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

type Step = {
  title: string;
  description: string;
};

export type Blog = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  faqs: FAQ[];
  steps: Step[];
  detail_images: string[];
};

const getAltFromUrl = (url: string): string => {
  const filename = url.split("/").pop() || "";
  const nameOnly = filename.split(".")[0];
  return nameOnly.replace(/-|_/g, " ");
};

export default function BlogDetailsClient({
  blog,
  recentPosts,
}: {
  blog: Blog;
  recentPosts: Blog[];
}) {
  const id = blog.id;

  // Comment form state
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentName.trim() || !commentEmail.trim() || !commentText.trim()) {
      setCommentError("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(commentEmail)) {
      setCommentError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    setCommentError(null);
    setCommentSuccess(null);

    try {
      const supabase = createClient();

      const { error: insertErr } = await supabase.from("blog_comments").insert({
        blog_id: id,
        name: commentName.trim(),
        email: commentEmail.trim(),
        comment: commentText.trim(),
        status: "pending",
      });

      if (insertErr) {
        console.error("Insert error:", insertErr);

        // Check if table doesn't exist
        if (
          insertErr.message.includes("does not exist") ||
          insertErr.message.includes("schema cache")
        ) {
          throw new Error(
            "Comments feature is not yet set up. Please contact the administrator.",
          );
        }

        throw insertErr;
      }

      setCommentSuccess("Comment submitted! It will appear after approval.");
      setCommentName("");
      setCommentEmail("");
      setCommentText("");
    } catch (err: unknown) {
      console.error("Comment submission error:", err);
      setCommentError(
        err instanceof Error
          ? err.message
          : "Failed to submit comment. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

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
                alt={getAltFromUrl(blog.image_url)}
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
                      alt={getAltFromUrl(img)}
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

              {commentError && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-sm">
                  {commentError}
                </div>
              )}

              {commentSuccess && (
                <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-sm">
                  {commentSuccess}
                </div>
              )}

              <form onSubmit={handleCommentSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block font-medium">Comment</label>
                  <textarea
                    rows={8}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={submitting}
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#0B4E9B] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Name</label>
                  <input
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    disabled={submitting}
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#0B4E9B] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Email</label>
                  <input
                    type="email"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    disabled={submitting}
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#0B4E9B] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#0B4E9B] px-8 py-4 font-semibold text-white transition hover:bg-[#00B7EB] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
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
