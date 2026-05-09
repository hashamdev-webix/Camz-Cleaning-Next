import React from "react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="relative py-10 px-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/wp-admin/uploads/about2.webp')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Deep Blue Gradient Overlay matching the design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E5D9E]/90 to-[#16497D]/80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-6">
        
        {/* Top Badge */}
        <div className="flex justify-center">
          <span className="bg-[#00CFE8] text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
            Spotless Professional Results
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Ready For A Professional Cleaning Service?
        </h2>

        {/* Subtext */}
        <p className="text-blue-50/90 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
          Transform your space today with Camz Cleaning's trusted experts providing thorough, 
          professional cleaning you can count on.
        </p>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            href="/contact" 
            className="inline-block px-8 py-3.5 border-2 border-white/60 rounded-xl font-bold text-sm md:text-base hover:bg-white hover:text-[#16497D] transition-all duration-300 backdrop-blur-sm"
          >
            Book Your Cleaning Today
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default CallToAction;