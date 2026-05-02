import React from "react";

const CommercialHero = () => {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1669101602108-fa5ba89507ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsZWFuaW5nfGVufDB8fDB8fHww')",
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
        Commercial Cleaning Services for <br /> Businesses
        </h1>
  
      </div>
    </section>
  );
};

export default CommercialHero;