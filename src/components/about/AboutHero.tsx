import React from "react";
import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="relative h-[260px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/wp-admin/uploads/commercial-kitchen-cleaning.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#255892]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
          About Us
        </h1>
      </div>
    </section>
  );
};

export default AboutHero;
