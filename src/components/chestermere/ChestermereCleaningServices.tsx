import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ChestermereCleaningServices = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container-custom mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-block bg-[#00CEE6] text-white px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide">
           Cochrane
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#004A8C] leading-[1.1]">
        Expert Home Cleaning Services in Chestermere
          </h2>

          {/* Description Paragraphs */}
          <div className="space-y-5 text-gray-700 leading-relaxed font-medium">
            <p>
           A clean space does more than look good it creates comfort, productivity, and peace of mind. With busy routines, maintaining that level of cleanliness can be difficult. Camz Cleaning provides trusted Chestermere cleaning services that help homeowners and businesses enjoy spotless, healthy spaces without the stress of managing everything on their own.
            </p>
            <p>
            Our experienced team delivers professional residential, commercial, and vehicle cleaning services tailored to your needs. From kitchens, bathrooms, and carpets to offices and workspaces, every corner is cleaned with care and precision. Clients across Chestermere trust Camz Cleaning for dependable service, skilled cleaners, and flexible scheduling that keeps every property fresh, hygienic, and welcoming.
            </p>
          </div>

          {/* Subtitle / Promise */}
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#004A8C] pt-4">
            100% Satisfaction Assured
          </h3>

          {/* Call to Action Button */}
          <div className="pt-2">
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-[#0091C1] to-[#004A8C] text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-shadow duration-300 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Side: Image with premium styling */}
        <div className="relative group">
          {/* Decorative Background Element */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#00CEE6]/10 to-[#004A8C]/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500" />
          
          {/* Image Container with Border and Radius */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-[10px] border-white z-10">
            <Image
              src="/p4.webp" 
              alt="Professional Cleaning in Cochrane"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ChestermereCleaningServices