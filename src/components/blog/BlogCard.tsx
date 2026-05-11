// components/blogs/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  blog: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#0B4E9B] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-[240px] w-full overflow-hidden">
        <Image
          src={blog.image_url}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h5 className="text-2xl font-bold text-[#0B4E9B] line-clamp-2">
          {blog.title}
        </h5>

        <p className="text-gray-600 leading-7 line-clamp-3">
          {blog.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/blogs/${blog.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-[#0593C8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00B7EB]"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
