import React from "react";
import Image from "next/image";

const CommercialHero = () => {
  return (
    <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/wp-admin/uploads/commercial-kitchen-cleaning.webp"
          alt="Commercial cleaning service workspace"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#2D619B] opacity-84"></div>
      </div>

      <div className="relative z-10 px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md md:text-6xl">
          Commercial Cleaning Services in Calgary for Businesses
        </h1>
      </div>
    </section>
  );
};

export default CommercialHero;