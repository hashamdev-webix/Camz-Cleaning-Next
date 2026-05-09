"use client"
import Link from "next/link";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const VehicleCleaningContent = () => {
  const coverageItems = [
    "Exterior Wash and Dry",
    "Interior Vacuum and Dusting",
    "Dashboard Cleaning and Polishing",
    "Seat and Carpet Cleaning",
    "Window Cleaning Inside Out",
    "Tire Cleaning and Shine",
  ];

  const services = [
    {
      id: 1,
      title: "Exterior Wash and Dry",
      desc: "Our exterior wash and dry service removes road dust, dirt, salt, and surface buildup without damaging your vehicle's paint. Each wash is handled carefully using safe cleaning products for a cleaner, fresher finish. This service helps protect your vehicle's exterior and keeps it looking clean through daily driving and seasonal weather.",
      bullets: [
        "Wheel cleaning to remove grime and brake dust",
        "Hand drying to reduce water spots and streaks",
        "Tire shine application for a polished exterior look",
        "Tire cleaning for a fresh, well-maintained appearance",
        "Complete exterior wash for dirt, dust, and road buildup"
      ]
    },
    {
      id: 2,
      title: "Interior Vacuum and Dusting",
      desc: "Dust, crumbs, pet hair, and hidden debris can build up inside your vehicle. Our interior vacuum and dusting service helps keep carpets, mats, and corners clean, fresh, and comfortable. This service helps maintain a cleaner, fresher, and more comfortable vehicle interior.",
      bullets: [
        "Floor mat cleaning for a fresher and cleaner interior look",
        "Corner and crevice cleaning for hard-to-reach areas",
        "Light dusting of dashboard, panels, and interior surfaces",
        "Seat and carpet vacuuming to remove dust, crumbs, and loose dirt"
      ]
    },
    {
      id: 3,
      title: "Dashboard Cleaning and Polishing",
      desc: "We provide comprehensive dashboard care using safe cleaning materials to ensure a smooth, professional finish without damage.",
      bullets: [
        "Complete car cleaning dashboard service",
        "Detailed car interior dashboard cleaning",
        "Safe use of car cleaning dashboard wipes",
        "Cleaning of control buttons and touch surfaces",
        "Application of interior shiner for a smooth finish",
        "Dust and stain removal from vents and panels",
        "Gentle application of car dashboard cleaning wipes",
        "Treatment to clean car-interior plastic without damage"
      ]
    },
    {
      id: 4,
      title: "Seat and Carpet Cleaning",
      desc: "Seats and carpets can absorb stains, dust, crumbs, pet hair, and odors from daily use. Our seat and carpet cleaning service helps refresh fabric, leather, mats, and flooring for a cleaner and more comfortable interior. Your interior will look refreshed, sanitized, and comfortable again.",
      bullets: [
        "Seat cleaning to remove dust, stains, and everyday buildup",
        "Carpet cleaning to refresh flooring and reduce trapped dirt",
        "Deep extraction cleaning for stains, odors, and hidden debris",
        "Floor mat cleaning for a cleaner and more polished interior look"
      ]
    },
    {
      id: 5,
      title: "Window Cleaning Inside & Out",
      desc: "",
      bullets: [
        "Interior and exterior glass deep cleaning",
        "Streak-free finish using professional glass solutions",
        "Removal of dust, fingerprints, and water spots",
        "Edge and corner detailing for complete clarity",
        "Safe cleaning for tinted windows",
        "Side mirrors and rearview mirror polishing",
        "Final shine check for crystal-clear visibility"
      ]
    },
    {
      id: 6,
      title: "Tire Cleaning and Shine",
      desc: "Tires and wheels collect road dust, brake dust, mud, and grime from daily driving and seasonal weather. Our tire cleaning and shine service helps restore a cleaner, sharper, and more polished exterior look.",
      bullets: [
        "Car wheel deep clean",
        "Complete deep cleaning car tires",
        "Long-lasting car wash tire shine",
        "Optional pressure check with car wash, tire air"
      ]
    }
  ];

 const carouselData = [
  { 
    src: "/wp-admin/uploads/vehicle.webp", 
    alt: "Professional mobile vehicle detailing service" 
  },
  { 
    src: "/wp-admin/uploads/vehicle-cleaning-1.webp", 
    alt: "Deep interior car seat and upholstery cleaning" 
  },
  { 
    src: "/wp-admin/uploads/vehicle-cleaning2.webp", 
    alt: "Exterior car wash and tire shine treatment" 
  },
  { 
    src: "/wp-admin/uploads/vehicle-cleaning3.webp", 
    alt: "Comprehensive dashboard and interior sanitization" 
  },
];

  return (
    <div className="space-y-12 text-gray-700">
      {/* Hero Section */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4E9B] leading-tight">
          Expert Detailing That Keeps Your Car Fresh & Flawless
        </h2>
        <div className="rounded-[2rem] overflow-hidden shadow-md">
          <img src="/wp-admin/uploads/vehicle.webp" alt="Professional Car Detailing" className="w-full object-cover h-[300px] md:h-[450px]" />
        </div>
        <div className="space-y-4 font-medium">
        
          <p className="leading-relaxed">
          Camz Cleaning provides professional vehicle cleaning and car detailing services for drivers, families, and busy professionals across Alberta. From exterior washing and dashboard polishing to carpet cleaning, window cleaning, and tire shine, our team helps keep your vehicle fresh, clean, and comfortable after every trip, commute, or seasonal change.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Expert Detailing That Keeps Your Car Fresh & Flawless
        </h2>

        <p className="leading-relaxed">
        At Camz Cleaning, we understand that your car is more than just transportation; it’s part of your lifestyle. Our complete car cleaning interior and exterior service is designed to restore shine, comfort, and hygiene.
          </p>
        <p className="leading-relaxed">
       If you’ve been searching for vehicle cleaning services, we provide reliable, affordable, and convenient detailing that fits your schedule. From basic refresh to full car exterior detailing, every service is handled with precision and care.
          </p>

           <h2 className=" mt-10 text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Our Professional Cleaning Services
        </h2>
        <div className="space-y-10">
          {services.map((item) => (
            <div key={item.id} className="space-y-4">
              <h3 className="text-2xl font-bold text-[#0B4E9B]">{item.title}</h3>
              <p className="text-sm md:text-base leading-relaxed">{item.desc}</p>
              {item.bullets && (
                <ul className="grid grid-cols-1 gap-y-3 gap-x-6 mt-4">
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
    Areas We Clean In Your Vehicle
  </h2>
  <p className="leading-relaxed mb-6">
    If you've been looking for a reliable <span className="font-bold">car tire cleaner nearby</span>, Camz Cleaning makes it simple and convenient.
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

    {/* CSS-Only Carousel - Updated for 2 images */}
    <div className="relative w-full overflow-hidden rounded-2xl h-[250px]">
      {/* Flex container set to w-[400%] 
        (Number of unique images / Images visible) * 2 (for loop) * 100%
        Assuming you still have 4 unique images, so (4 / 2) * 2 * 100% = 400%
      */}
      <div className="flex w-[400%] animate-slide h-full gap-4">
        {[...carouselData, ...carouselData].map((img, i) => (
          /* Each slide is w-1/2 (50% of the parent view) with padding for gap */
          <div key={i} className="w-1/2 h-full flex-shrink-0 px-2">
            <img 
              src={img.src} 
              className="w-full h-full object-cover rounded-2xl" 
              alt="Vehicle detail work" 
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
          Get Free Estimate
        </h2>
        <p>
          Contact Camz Cleaning today to schedule your vehicle cleaning service and enjoy a spotless, refreshed ride.
        </p>
        <Link href="/booking" className="inline-block bg-[#0091C1] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0B4E9B] transition-colors shadow-lg">
          Book Service
        </Link>
      </section>

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

export default VehicleCleaningContent;