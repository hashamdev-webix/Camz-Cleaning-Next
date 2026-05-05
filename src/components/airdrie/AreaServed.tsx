"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const AreasServed = () => {
  const serviceAreas = [
    {
      city: "Airdrie",
      description: "Fireplace & furnace cleaning"
    },
    {
      city: "Cochrane",
      description: "Vent cleaning & inspection"
    },
    {
      city: "Chestermere",
      description: "Safe, efficient cleaning with honest pricing"
    },
    {
      city: "Calgary",
      description: "Complete fireplace & furnace solutions"
    }
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/p4.webp" 
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

          <p className="text-gray-700 leading-relaxed font-medium">
            Camz Cleaning offers professional fireplace, furnace, and vent cleaning to keep your home safe, efficient, and fresh. Our expert team provides inspections, maintenance, and honest pricing for homes across multiple locations.
          </p>

          <div className="space-y-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-700 leading-relaxed text-sm md:text-lg">
                <IoCheckmarkCircleOutline size={24} className="text-[#004A8C] shrink-0" />
                <p>
                    <span className="font-bold text-slate-800">{area.city}</span> – {area.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-[#0091C1] to-[#004A8C] text-white px-10 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 active:scale-95"
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