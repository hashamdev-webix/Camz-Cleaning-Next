import React from "react";

interface CommonHeroProps {
  backgroundImage: string;
  title: string | React.ReactNode;
}

const CommonHero = ({ backgroundImage, title }: CommonHeroProps) => {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-[#265995] opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md whitespace-pre-line">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default CommonHero;