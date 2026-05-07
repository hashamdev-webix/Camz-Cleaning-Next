"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const blogs = [
  {
    id: "how-to-clean-a-neglected-house",
    title: "How to Clean a Neglected House Step by Step",
    excerpt: "Walking into a neglected house can feel stressful, especially when every room seems to need attention at the same time...",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070",
    category: "Home Care"
  },
  {
    id: "how-to-choose-commercial-cleaners",
    title: "How to Choose the Best Commercial Cleaning Company",
    excerpt: "Choosing the best cleaning provider is crucial for any business. Your commercial space reflects your professionalism...",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
    category: "Commercial"
  },
  {
    id: "7-day-cleaning-schedule",
    title: "7 Day Cleaning Schedule: A Simple Plan for Every Day",
    excerpt: "Keeping a home clean sounds simple until real life starts moving fast. Work deadlines, family commitments...",
    image: "https://images.unsplash.com/photo-1527515545081-5db817172677?q=80&w=1974",
    category: "Organization"
  }
];

const BlogGrid = () => {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col">
              <div className="relative h-64 w-full">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#004A8C] mb-4 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-600 mb-8 line-clamp-3 text-sm leading-relaxed">
                  {blog.excerpt}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={`/blog/${blog.id}`}
                    className="inline-block bg-gradient-to-r from-[#0091C1] to-[#004A8C] text-white px-8 py-3 rounded-lg font-bold text-sm hover:shadow-lg transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;