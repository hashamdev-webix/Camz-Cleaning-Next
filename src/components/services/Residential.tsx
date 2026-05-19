"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const Residential = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container-custom mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left Side Image */}
        <div className="relative w-full h-[500px] rounded-[28px] overflow-hidden shadow-xl">
          <Image
            src="/wp-admin/uploads/clean wadrobe.webp"
            alt="Residential Cleaning"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Right Side Content */}
        <div>
          {/* Badge */}
          <span className="inline-flex rounded-full bg-[#02C0E6] px-5 py-1 text-sm font-semibold text-white mb-2">
            Residential Cleaning
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0B4E9B] mb-8">
            Guaranteed Spotless Home Cleaning
          </h2>

          {/* Description */}
          <p className="text-[#1A1A1A] text-lg md:text-[20px] leading-[42px] mb-8">
            Experience personalized <strong>home cleaning</strong> with Camz
            Cleaning weekly, deep, or one-time services delivered with care,
            precision, and guaranteed spotless results.
          </p>

          <p className="text-[#1A1A1A] text-lg md:text-[20px] leading-[42px] mb-10">
            Our tailored cleaning services fit your home and lifestyle
            perfectly. From bedrooms and kitchens to bathrooms and floors, our
            dedicated team handles dusting, sanitizing, vacuuming, and
            polishing, ensuring your home stays immaculate, hygienic, and
            welcoming.
          </p>

          {/* Checklist */}
          <div className="space-y-2 mb-10">
            <div className="flex items-center gap-4">
              <CheckCircle2
                size={22}
                className="text-[#0B4E9B] flex-shrink-0"
              />

              <p className="text-lg md:text-[20px] font-medium text-[#1A1A1A]">
                Bedroom, living room, and kitchen cleaning
              </p>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2
                size={22}
                className="text-[#0B4E9B] flex-shrink-0"
              />

              <p className="text-lg md:text-[20px] font-medium text-[#1A1A1A]">
                Bathroom deep cleaning and sanitization
              </p>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2
                size={22}
                className="text-[#0B4E9B] flex-shrink-0"
              />

              <p className="text-lg md:text-[20px] font-medium text-[#1A1A1A]">
                Floor vacuuming, mopping, and polishing
              </p>
            </div>
          </div>

          {/* Button */}
          <Link
            href="/residential-cleaning-services"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0091C1] to-[#0B4E9B] px-8 py-2 text-lg font-bold text-white transition-all duration-300 hover:shadow-xl"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Residential;
