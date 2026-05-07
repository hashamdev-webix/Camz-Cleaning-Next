"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Link from "next/link";

const projects = [

  {
    category: "Residential Cleaning",
    title: "Complete Home Care Solutions",
    description: "Experience spotless, hygienic homes with our complete cleaning solutions. From deep bathroom and kitchen cleaning to carpets, upholstery, and vents, we make every corner shine effortlessly.",
    image: "/wp-admin/uploads/stairs cleaning.webp", 
    url:"/gallery"
  },
  {
    category: "Commercial Cleaning",
    title: "Reliable Corporate Maintenance",
    description: "Keep your business and restaurant spotless with our reliable commercial cleaning services. From offices to kitchens, we provide tailored, professional solutions for every commercial space.",
    image: "/wp-admin/uploads/p4.webp",
    url:"/gallery"
  },
  {
    category: "Vehicle Cleaning",
    title: "Complete Car Care Service",
    description: "Transform your car inside and out with our Complete Car Care Service from deep interior vacuuming, car seat & carpet cleaning, to full exterior detailing for a spotless, showroom shine",
        image: "/wp-admin/uploads/p3.webp",
        url:"/gallery"
  },
  {
    category: "Seasonal Property",
    title: "Complete Seasonal Property Care",
    description: "Make every season stress-free with CamzCleaning's Seasonal Property Services. From snow removal to lawn care, we keep your home safe, clean, and perfectly maintained all year long.",
    image: "/wp-admin/uploads/p4.webp",
    url:"/gallery"
  },
];

const RecentProjects = () => {
 
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="bg-[#00B7EB] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#004A8C] mb-4">
              Our Recent Project
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Take a look at our recent cleaning projects showcasing detailed workmanship, 
              professional standards, and spotless results delivered for residential and commercial clients.
            </p>
          </div>
          <div className="max-w-md">
            <p className="text-gray-600 text-sm md:text-base border-l-4 border-[#00B7EB] pl-4">
              We proudly showcase completed cleaning projects highlighting our attention to detail, 
              professional standards, and consistently impressive results for every client.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="flex flex-col sm:flex-row bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image Side */}
              <div className="relative w-full sm:w-2/5 aspect-[4/5] sm:aspect-auto overflow-hidden p-4">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center">
                <span className="bg-[#00B7EB] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase w-fit mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#004A8C] mb-3 leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-4">
                  {project.description}
                </p>
                <Link href={project.url} className="text-[#004A8C] font-extrabold text-sm uppercase tracking-wider hover:text-[#00B7EB] transition-colors flex items-center gap-1">
                  Learn More...
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;