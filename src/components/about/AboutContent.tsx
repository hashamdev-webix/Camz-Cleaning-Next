import React from "react";
import { LuSend, LuBell } from "react-icons/lu";

const AboutContent = () => {
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
            <div className="flex items-start gap-6 p-6 rounded-2xl border border-gray-200 hover:border-[#0B4E9B] transition-colors group">
              <div className="bg-white p-3 rounded-lg text-[#0B4E9B]">
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
            <div className="flex items-start gap-6 p-6 rounded-2xl border border-gray-200 hover:border-[#0B4E9B] transition-colors group">
              <div className="bg-white p-3 rounded-lg text-[#0B4E9B]">
                <LuBell size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
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
        <div className="relative">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src="/p4.webp" 
              alt="Clean carpet and stairs" 
              className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutContent;