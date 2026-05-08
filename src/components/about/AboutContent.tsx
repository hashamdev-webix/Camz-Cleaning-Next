
"use client"
import { AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { LuSend, LuBell } from "react-icons/lu";
import { motion } from 'framer-motion';

const AboutContent = () => {

  const images = [
    "/wp-admin/uploads/stairs cleaning.webp",
    "/wp-admin/uploads/whole kitchen cleaning.webp"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevValue) => (prevValue + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length])
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content Column */}
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-block bg-[#00B7EB] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            who we are
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B4E9B] leading-tight">
            Professional Cleaning <br /> Services You Can Trust
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-lg">
            Camz Cleaning provides reliable residential and commercial cleaning services, 
            ensuring consistent quality, meticulous attention to detail, and total 
            customer satisfaction with every.
          </p>

          {/* Mission & Vision Cards */}
          <div className="space-y-4 pt-4">
            {/* Our Mission */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 p-8 rounded-[40px] border border-[#0B4E9B] md:border-gray-200 hover:border-[#0B4E9B] hover:bg-[#EFFAFC] transition-colors group">
              <div className="bg-white p-3 rounded-lg text-[#0B4E9B] flex justify-center">
                <LuSend size={32} strokeWidth={1.5} className="rotate-[330deg]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0B4E9B]">Our Mission</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  To make every home and workplace shine with trustworthy cleaning, 
                  unmatched care, and consistent excellence in every service.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 p-8 rounded-[40px] border border-[#0B4E9B] md:border-gray-200 hover:border-[#0B4E9B] hover:bg-[#EFFAFC] transition-colors group">
              <div className="bg-white p-3 rounded-lg text-[#0B4E9B] flex justify-center">
                <LuBell size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#0B4E9B]">Our Vision</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  To be the most trusted name in residential and commercial cleaning, 
                  setting the standard for quality, reliability, and care in every space we serve.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Column */}
      {/* Right Image Column - Updated with Smooth Transition */}
        <div className="relative h-[400px] md:h-[600px] w-full">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl w-full h-full relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="Professional Cleaning Services"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Subtle Overlay to match the premium theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

        
        </div>

      </div>
    </section>
  );
};

export default AboutContent;