"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AreasServed = () => {
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/p4.webp" // Ensure you have the cabinet image in your public folder
            alt="Clean kitchen cabinets"
            fill
            className="object-cover"
          />
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