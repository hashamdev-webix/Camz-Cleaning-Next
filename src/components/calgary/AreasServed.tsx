"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const AreasServed = () => {
  const images = [
    { src: "/wp-admin/uploads/clean wadrobe.webp", alt: "Clean wardrobe" },
    { src: "/wp-admin/uploads/cleaned floor.webp", alt: "Cleaned floor" },
    { src: "/wp-admin/uploads/whole bathroom cleaning.webp", alt: "Whole bathroom cleaning" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  const serviceAreas = [
    {
      city: "Calgary",
      description: "Professional Home and office cleaning with flexible scheduling and eco-friendly products. Trusted local cleaners delivering spotless and hygienic results every time."
    },
    {
      city: "Airdrie",
      description: "Reliable Residential and commercial cleaning tailored to your property needs. Affordable, detailed cleaning services to keep your space fresh and healthy."
    },
    {
      city: "Cochrane",
      description: "Expert Cleaners provides home, deep, and move-out cleaning solutions. We help maintain clean, organized, and comfortable living and working spaces."
    },
    {
      city: "Chestermere",
      description: "High-quality house and office cleaning with modern tools and safe products; flexible booking and dependable service for stress-free cleaning."
    }
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="container-custom mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Animated Image Slider */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#004A8C] mb-2">
            Areas We Serve
          </h2>

          <div className="space-y-4">
            {serviceAreas.map((area, index) => (
              <p key={index} className="text-gray-700 leading-relaxed text-sm md:text-base">
                <span className="font-black text-slate-800">{area.city}:</span> {area.description}
              </p>
            ))}
          </div>

          <p className="text-gray-700 font-medium text-sm md:text-base pt-2">
            We provide cleaning services across residential and commercial areas, with fast response teams ready to help.
          </p>

          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-[#0091C1] to-[#004A8C] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AreasServed;