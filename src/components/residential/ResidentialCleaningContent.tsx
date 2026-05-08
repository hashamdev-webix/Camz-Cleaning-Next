"use client"
import Link from "next/link";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ResidentialCleaningContent = () => {
  const coverageItems = [
    "Bedroom Cleaning and Dusting",
    "Kitchen Cleaning and Sanitization",
    "Bathroom Deep Cleaning Service",
    "Living Area Surface Cleaning",
    "Floor Vacuuming and Mopping",
    "Waste Removal and Disposal",
  ];

  const whyChooseItems = [
    "Trusted Vancouver deep cleaning services provider",
    "Flexible scheduling",
    "Experienced cleaning professionals",
    "Advanced equipment",
    "Reliable and detail-focused service"
  ];

  const services = [
    {
      id: 1,
      title: "Kitchen Cleaning and Sanitization",
      desc: "The kitchen is one of the busiest and most used areas in any home. Our detailed kitchen care includes:",
      bullets: [
        "Kitchen appliance cleaning service",
        "Best kitchen appliance cleaning service solutions",
        "Kitchen grease cleaning service",
        "Kitchen countertop cleaning services",
        "Cleaning exterior kitchen cabinets",
        "Cabinet exterior cleaning",
        "Cabinet exterior and interior cleaning"
      ],
      text:"We carefully clean refrigerator exterior surfaces, wipe microwaves, degrease stovetops, and sanitize sinks. Our team handles appliance exteriors and appliance interiors (oven, fridge, microwave) with precision."
    },
    {
      id: 2,
      title: "Bathroom Cleaning Service",
      desc: "Bathrooms require extra attention due to moisture and bacteria buildup. Camz Cleaning provides reliable bathroom cleaning services that leave your washrooms sparkling and sanitized.",
      bullets: [
        "Bathroom cleaning toilet",
        "Bathroom cleaning shower",
        "Bathroom cleaning tiles",
        "Washroom cleaning tiles",
        "Cleaning the bathroom sink",
        "Cleaning bathroom baseboards",
        "Deep bathroom cleaning services",
        "Deep bathroom cleaning services near me"
      ],
   text:" Our professional bathroom cleaning services remove soap scum, mold, and stains using safe but powerful bathroom cleaning liquid. From tile grout to mirrors, every surface is cleaned thoroughly.   "
   
    },
    {
      id: 3,
      title: "Living Area Surface Cleaning",
      desc: "Your living spaces should feel welcoming and comfortable. We eliminate dust, smudges, and allergens to improve indoor air quality and create a fresh environment for your family.",
      bullets: [
        "Dusting & wiping of surfaces",
        "Cleaning baseboards and walls",
        "Cleaning bathroom baseboards (when applicable)",
        "Wall washing",
        "Interior windows and tracks",
        "Baseboard cleaning"
      ],
      text:" We eliminate dust, smudges, and allergens to improve indoor air quality and create a fresh environment for your family. "
    },
    {
      id: 4,
      title: "Floor and Carpet Cleaning Service",
      desc: "Floors including carpets collect daily dirt, especially in high-traffic areas. Using a vacuum cleaner for deep carpet and vacuum cleaner carpet washer, we ensure deep extraction of dirt and debris. Hardwood floors are cleaned carefully to preserve their shine and durability.",
      bullets: [
        "Vacuum cleaner carpet and floor cleaning",
        "Vacuuming carpets and rugs",
        "Vacuuming wool carpets",
        "Carpets vacuuming & shampooing",
        "Mopping hardwood floors",
        "Mopping hard floors"
      ],
      text: " Using a vacuum cleaner for deep carpet and vacuum cleaner carpet washer, we ensure deep extraction of dirt and debris. Hardwood floors are cleaned carefully to preserve their shine and durability. "
    },
    {
      id: 5,
      title: "Cabinet and Appliance Detailing",
      desc: "Cabinets and appliances significantly impact your kitchen’s overall look. We thoroughly clean refrigerator exterior surfaces and sanitize interior shelves. Our best kitchen appliance cleaning service ensures grease, fingerprints, and food residue are removed safely and effectively.",
      bullets: [
        "Cabinet exterior cleaning",
        "Cabinet exterior and interior cleaning",
        "Cleaning exterior kitchen cabinets",
        "Cabinet interiors",
        "Appliance exteriors",
        "Appliance interiors (oven, fridge, microwave)"
      ],
      text:" We thoroughly clean refrigerator exterior surfaces and sanitize interior shelves. Our best kitchen appliance cleaning service ensures grease, fingerprints, and food residue are removed safely and effectively. "
    },
    {
      id: 6,
      title: "Move-In Move-Out Cleaning Service",
      desc: "Relocating can be overwhelming, but our Move-In Move-Out Cleaning Service ensures your property is spotless before or after moving.",
      bullets: [
        "Deep bathroom cleaning services",
        "Kitchen appliance cleaning service",
        "Kitchen grease cleaning service",
        "Kitchen countertop cleaning services",
        "Cleaning baseboards and walls",
        "Interior windows and tracks",
        "Wall washing"
      ]
    }
  ];

   const carouselData = [
  { 
    src: "/wp-admin/uploads/residential-hero.webp", 
    alt: "Professional residential cleaning hero view" 
  },
  { 
    src: "/wp-admin/uploads/residential-bg.webp", 
    alt: "Spacious residential living area cleaning" 
  },
  { 
    src: "/wp-admin/uploads/help-bg.webp", 
    alt: "Professional cleaning assistance background" 
  },
  { 
    src: "/wp-admin/uploads/stairs cleaning.webp", 
    alt: "Detailed stairs and carpet cleaning" 
  },
];
  return (
    <div className="space-y-12 text-gray-700">
      {/* Hero Section */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4E9B] leading-tight italic">
          Professional House Cleaning Services Across Alberta
        </h2>
        <div className="rounded-[2rem] overflow-hidden shadow-md">
          <img src="/wp-admin/uploads/residential-hero.webp" alt="Clean Home Interior" className="w-full object-cover h-[350px]" />
        </div>
        <p className="leading-relaxed font-medium">
          Keeping a home clean, fresh, and healthy can be challenging, especially with a busy schedule. Over time, dust, grease, allergens, and bacteria can build up in kitchens, bathrooms, carpets, and other living spaces, affecting both comfort and cleanliness. At <span className="text-[#0B4E9B] font-bold">Camz Cleaning</span>, our Residential Cleaning Services in Calgary, Airdrie, Cochrane, and Chestermere are designed to give homeowners a spotless, sanitized, and well-maintained home without the stress. We deliver reliable, professional house cleaning services that help create a cleaner, healthier, and more comfortable living environment for you and your family.
        </p>
      </section>

      {/* Why Choose Section */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Why Choose Camz Cleaning?
        </h2>
        <p className="leading-relaxed">
          With Camz Cleaning’s <span className="font-bold">Residential Cleaning Services</span>, your home stays cleaner, healthier, and stress-free.
        </p>
        <ul className="grid grid-cols-1  gap-4">
          {whyChooseItems.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 font-medium text-gray-700">
              {/* <IoCheckmarkCircleOutline size={22} className="shrink-0 text-[#0B4E9B]" /> */}
                <span>{idx+1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Services List Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          The Way We Serve You
        </h2>
        <div className="space-y-10">
          {services.map((item) => (
            <div key={item.id} className="space-y-4">
              <h3 className="text-2xl font-bold text-[#0B4E9B]">{item.title}</h3>
              <p className="text-sm md:text-base leading-relaxed">{item.desc}</p>
              {item.bullets && (
                <ul className="grid grid-cols-1  gap-y-3 gap-x-6 mt-4">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
                      {/* <IoCheckmarkCircleOutline size={20} className="text-[#0B4E9B] shrink-0 mt-0.5" /> */}
                        <span>{idx+1}</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            
            </div>
          ))}
        </div>
      </section>

      {/* Carousel & Coverage Section */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Areas We Clean In Your Home
        </h2>
        <p className="leading-relaxed mb-6">
          Our Move In Move Out Cleaning prepares homes for new occupants with professional-grade detailing and complete sanitization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden">
          {/* Checklist */}
          <ul className="space-y-3">
            {coverageItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 font-semibold text-[#0B4E9B]">
                {/* <IoCheckmarkCircleOutline size={22} className="shrink-0" /> */}
                <span>{idx+1}</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

         {/* CSS-Only Carousel - Showing 2 Images */}
    <div className="relative w-full overflow-hidden rounded-2xl h-[250px]">
     
      <div className="flex w-[400%] animate-slide h-full gap-4">
        {[...carouselData, ...carouselData].map((img, i) => (
          <div key={i} className="w-1/2 h-full flex-shrink-0 px-2"> 
            <img 
              src={img.src} 
              className="w-full h-full object-cover rounded-2xl" 
              alt={img.alt} 
            />
          </div>
        ))}
      </div>
    </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="space-y-6 pb-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Contact Our Team
        </h2>
        <p>
          Contact Camz Cleaning today to book your residential cleaning service and enjoy a fresh, spotless home.
        </p>
        <Link href="/contact" className="inline-block bg-[#0091C1] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0B4E9B] transition-colors shadow-lg">
          Book Service
        </Link>
      </section>
      {/* Internal CSS for Carousel Animation */}
     <style jsx>{`
  @keyframes slide {
    0% { transform: translateX(0); }
    /* We translate by 50% because we duplicated the array [...data, ...data] */
    100% { transform: translateX(-50%); }
  }
  .animate-slide {
    animation: slide 20s linear infinite;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
`}</style>
    </div>
  );
};

export default ResidentialCleaningContent;