"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AreasServed = () => {
  const serviceAreas = [
    {
      city: "Cochrane",
      description: "Professional residential and commercial cleaning services."
    },
    {
      city: "Calgary ",
      description: "Reliable home, office, and vehicle cleaning solutions."
    },
    {
      city: "Airdrie ",
      description: "Trusted deep cleaning, steam cleaning, and maintenance services."
    },
    {
      city: "Chestermere",
      description: "Expert residential, commercial, and seasonal cleaning services."
    }
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/wp-admin/uploads/Room cleaning.webp" // Ensure you have the cabinet image in your public folder
            alt="Room cleaning"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#004A8C] mb-2">
            Areas We Serve
          </h2>
<p className="text-gray-700 font-medium text-sm md:text-base pt-2">
            We proudly bring our professional cleaning services to communities across the region. No matter where you are, Camz Cleaning ensures every home, office, and vehicle is spotless, hygienic, and welcoming.
          </p>
          <div className="space-y-4">
            {serviceAreas.map((area, index) => (
              <p key={index} className="text-gray-700 leading-relaxed text-sm md:text-base">
                <span className="font-black text-slate-800">{area.city}:</span> {area.description}
              </p>
            ))}
          </div>

          

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