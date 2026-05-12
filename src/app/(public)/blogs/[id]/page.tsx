

import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import {
  Calendar,
  User,
  MessageCircle,
  Search,
} from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailsPage({ params }: Props) {
    const { slug } = await params;

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-[#f7f7f7]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B4E9B] py-24">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
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
              <span>{blog.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{blog.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span>{blog.comments} Comments</span>
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
                src={blog.image}
                alt={blog.title}
                width={1200}
                height={700}
                className="w-full object-cover"
              />
            </div>

            {/* Intro */}
            <div className="space-y-6">
              {blog.content?.intro?.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-9 text-gray-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Sections */}
            {blog.content?.sections?.map((section, index) => (
              <div key={index} className="space-y-6">
                <h6 className="text-3xl font-medium text-gray-700">
                  {section.heading}
                </h6>

                {section.image && (
                  <div className="overflow-hidden rounded-3xl">
                    <Image
                      src={section.image}
                      alt={section.heading}
                      width={1200}
                      height={700}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                {section.paragraphs?.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-lg leading-9 text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            {/* Checklist Table */}
            {blog.content?.checklist && (
              <div className="space-y-6 overflow-x-auto">
                <h2 className="text-3xl font-medium text-gray-700">
                  {blog.content.checklist.title}
                </h2>

                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-[#0B4E9B] text-white">
                      <th className="border p-4 text-left">
                        Cleaning Category
                      </th>
                      <th className="border p-4 text-left">
                        Recommended Supplies
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {blog.content.checklist.rows.map((row, index) => (
                      <tr key={index}>
                        <td className="border p-4">{row[0]}</td>
                        <td className="border p-4">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Steps */}
            {blog.content?.steps && blog.content.steps.length > 0 && (
              <div className="space-y-10">
                {blog.content?.steps?.map((step, index) => (
                  <div key={index} className="space-y-4">
                    <h6 className="text-3xl font-medium text-gray-700">
                      {step.title}
                    </h6>

                    <p className="text-lg leading-9 text-gray-700">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* FAQ */}
            {blog.content?.faqs && blog.content.faqs.length > 0 && (
              <div className="space-y-8">
                <h6 className="text-3xl font-medium text-gray-700">
                  FAQ’s
                </h6>

                {blog.content?.faqs?.map((faq, index) => (
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
                  <label className="mb-2 block font-medium">
                    Comment
                  </label>

                  <textarea
                    rows={8}
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#0B4E9B]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Name
                  </label>

                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#0B4E9B]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Email
                  </label>

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
      Professional digital marketing agency delivering measurable online
      results.
    </p>
  </div>

  {/* Social Icons */}
  <div className="mt-8 flex items-center gap-4">
    <a
      href="https://www.instagram.com/camzcleaning"
      target="_blank"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
    >
      <FaInstagram size={16} />
    </a>

    <a
      href="https://x.com/camzcleaning"
      target="_blank"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
    >
      <FaXTwitter size={16} />
    </a>

    <a
      href="https://web.facebook.com/Camzcleaning1?_rdc=1&_rdr#"
      target="_blank"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
    >
      <FaFacebookF size={16} />
    </a>

    <a
      href="https://www.linkedin.com/company/camzcleaning"
      target="_blank"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B4E9B] text-white transition hover:bg-[#00B7EB]"
    >
      <FaLinkedinIn size={16} />
    </a>

    <a
      href="https://www.youtube.com/@CamzCleaning"
      target="_blank"
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
                {blogs.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/blogs/${item.slug}`}
                    className="block border-b pb-6 last:border-0"
                  >
                    <h4 className="text-xl font-semibold text-[#0B4E9B] hover:text-[#00B7EB]">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm text-gray-500">
                      {item.date}
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