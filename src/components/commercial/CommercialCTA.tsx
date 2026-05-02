import React from "react";
import Link from "next/link";

const CommercialCTA = () => {
  return (
    <section className="relative w-full py-16 px-6 overflow-hidden">
      {/* Background Image with Dark Blue Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/p4.webp')" }} // Ensure p3.webp is in your public folder
      >
        <div className="absolute inset-0 bg-[#0B4E9B]/90 mix-blend-multiply"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        
        {/* Top Badge */}
        <div className="flex justify-center">
          <span className="border-2 border-[#00CFE8] text-white text-[10px] md:text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest bg-transparent">
            Contacting Camz Cleaning
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Ready To Schedule Commercial Cleaning?
        </h2>

        {/* Subtext */}
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        <span className="text-white"> Book your commercial cleaning today and let our skilled professionals 
          keep your workplace spotless, hygienic, and running smoothly with reliable care.</span>
         
        </p>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            href="/contact" 
            className="inline-block border-2 border-white/60 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#0B4E9B] transition-all duration-300 shadow-xl"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommercialCTA;