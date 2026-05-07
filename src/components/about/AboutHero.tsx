import React from "react";

const AboutHero = () => {
  return (
    <section className="relative h-[260px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/wp-admin/uploads/commercial kitchen cleaning.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#265995] opacity-92"></div>
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