import React from "react";

// 1. Define the types for your props
interface HeroProps {
  backgroundImage: string;
  title: string | React.ReactNode; // ReactNode allows you to pass JSX/fragments for line breaks
}

// 2. Apply the interface to the component
const CommonHeroSection = ({ backgroundImage, title }: HeroProps) => {
  return (
    <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#265995] opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default CommonHeroSection;