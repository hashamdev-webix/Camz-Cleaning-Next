"use client"
import Link from "next/link";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const SeasonalPropertyContent = () => {
  const coverageItems = [
    "Deep Cleaning of All Rooms",
    "Dust and Debris Removal",
    "Window Cleaning and Polishing",
    "Floor Cleaning and Treatment",
    "Exterior Area Cleaning",
    "Property Preparation and Inspection",
  ];

  const services = [
    {
      id: 1,
      title: "Snow Removal",
      desc: "Winter can be tough on homes and driveways. CamzCleaning's snow removal services ensure your property is safe and accessible. We offer:",
      bullets: [
        "Residential snow removal services for homes and rental properties",
        "Driveway, sidewalk, and walkway snow clearing for safer access",
        "Seasonal snow removal support for property owners and managers",
        "Residential snow removal services for homes and rental properties",
      ],
      footer: "With CamzCleaning, snow won't slow you down or put your family at risk."
    },
    {
      id: 2,
      title: "Garden Cleaning and Landscaping",
      desc: "Spring and summer demand regular yard upkeep. CamzCleaning's garden cleaning and landscaping services include:",
      bullets: [
        "Lawn care and yard cleanup for cleaner outdoor spaces",
        "Pruning, trimming, and plant care for a well-maintained garden",
        "Garden waste removal after seasonal cleanup or landscaping work",
        "Seasonal garden cleaning services for homes and rental properties",
        "Outdoor property care to improve curb appeal and guest readiness"
      ],
      footer: "Camz Cleaning helps keep your outdoor space clean, healthy, and well-maintained throughout the year with lawn care, garden cleanup, and seasonal maintenance services."
    },
    {
      id: 3,
      title: "Deep Cleaning of All Rooms",
      desc: "A clean home is a healthy home. Our deep cleaning service ensures every corner of your property is spotless:",
      bullets: [
        "Full house cleaning and residential deep cleaning",
        "Room-by-room cleaning for a meticulous approach",
        "Intensive home cleaning for homes needing extra care",
        "Dust removal service and home debris cleanup",
        "Indoor dust cleaning and dusting and cleaning services"
      ],
      footer: "With CamzCleaning, every surface shines, creating a healthier, more comfortable living space."
    },
    {
      id: 4,
      title: "Dust and Debris Removal",
      desc: "Accumulated dust and debris can affect both cleanliness and air quality. Our residential debris removal services include:",
      bullets: [
        "Safe and efficient removal of indoor and outdoor debris",
        "Preventative cleaning to reduce allergens",
        "Ensuring your home is ready for property preparation and inspection"
      ]
    },
    {
      id: 5,
      title: "Window Cleaning and Polishing",
      desc: "Clear, sparkling windows make a home feel fresh and inviting. CamzCleaning's window cleaning service provides the following:",
      bullets: [
        "Residential window cleaning and window shine service",
        "Glass cleaning and polishing for interior and exterior windows",
        "Interior and exterior window cleaning for complete clarity"
      ],
      footer: "Our experts ensure every window reflects the care you put into your property."
    },
    {
      id: 6,
      title: "Floor Cleaning and Treatment",
      desc: "Floors can collect dirt, stains, and wear from daily use, pets, guests, and seasonal weather. Camz Cleaning helps keep your surfaces clean, polished, protected, and well-maintained.",
      bullets: [
        "Hardwood floor cleaning and tile floor cleaning",
        "Floor care and treatment to protect surfaces",
        "Floor polishing service for a professional finish"
      ],
      footer: "We maintain your flooring's beauty and durability year-round."
    },
    {
      id: 7,
      title: "Exterior Area Cleaning",
      desc: "Camz Cleaning helps keep patios, driveways, walkways, and outdoor areas clean, safe, and well-maintained. We make sure your exterior spaces look fresh and ready to use.",
      bullets: [
        "Patio and driveway cleaning to remove dirt, dust, stains, and surface buildup",
        "Backyard cleaning support to keep outdoor spaces neat, clean, and organized",
        "Walkway and entrance cleaning to improve safety, access, and curb appeal",
        "Outdoor surface cleaning for decks, patios, paths, and high-traffic exterior areas"
      ],
      footer: "Keep your property's exterior safe, inviting, and well-maintained every season."
    },
    {
      id: 8,
      title: "Property Preparation for Rentals, Sales & Seasonal Homes",
      desc: "We help prepare your property for guests, tenants, buyers, or seasonal use. From cleaning and inspection support to property care, we make sure your space stays clean and organized.",
      bullets: [
        "Seasonal property preparation before weather changes or guest visits",
        "Pre-sale and rental cleaning to make the property look presentable",
        "Property checks to spot cleaning or maintenance concerns early",
        "Interior and exterior cleaning support for a ready-to-use space"
      ],
      footer: "Camz Cleaning's seasonal property services help reduce stress, save time, and keep your property in excellent condition throughout the year."
    }
  ];

  const carouselImages = ["/p4.webp", "/p4.webp", "/p4.webp", "/p4.webp"];

  return (
    <div className="space-y-12 text-gray-700">
      {/* Hero Section */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4E9B] leading-tight">
          Professional Vacation Rentals & Seasonal Property Services Across Alberta
        </h2>
        <div className="rounded-[2rem] overflow-hidden shadow-md">
          <img src="/seasonal.webp" alt="Professional Seasonal Property Cleaning" className="w-full object-cover h-[300px] md:h-[450px]" />
        </div>
        <div className="space-y-4 font-medium">
          <p className="leading-relaxed">
            <span className="text-[#0B4E9B] font-bold">Camz Cleaning</span> provides vacation rental cleaning and seasonal property care services across Calgary, Airdrie, Cochrane, Chestermere, and nearby Alberta areas. From Airbnb turnover cleaning and deep cleaning to snow removal and seasonal cleanup, the team helps keep properties clean, safe, and ready for guests or family use.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Features of CamzCleaning Seasonal Property Services
        </h2>
        <p className="leading-relaxed">
          Our services cover everything your property needs across every season. Whether it's snow removal, garden maintenance, or deep cleaning, CamzCleaning provides reliable, professional solutions to keep your home safe, clean, and beautiful all year round.
        </p>
      </section>

      {/* Services List Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Our Professional Services Provide
        </h2>
        <p className="leading-relaxed">
          We focus on delivering practical solutions for all aspects of home care, integrating both indoor and outdoor maintenance. Our offerings include:
        </p>

        <div className="space-y-10">
          {services.map((item) => (
            <div key={item.id} className="space-y-4">
              <h3 className="text-2xl font-bold text-[#0B4E9B]">{item.title}</h3>
              <p className="text-sm md:text-base leading-relaxed">{item.desc}</p>
              {item.bullets && (
                <ul className="grid grid-cols-1 gap-y-3 gap-x-6 mt-4">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
                      <IoCheckmarkCircleOutline size={20} className="text-[#0B4E9B] shrink-0 mt-0.5" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {item.footer && (
                <p className="text-sm md:text-base leading-relaxed pt-2">
                  {item.footer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Carousel & Coverage Section */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Seasonal Property Care Coverage
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden">
          {/* Checklist */}
          <ul className="space-y-3">
            {coverageItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 font-semibold text-[#0B4E9B]">
                <IoCheckmarkCircleOutline size={22} className="shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          {/* CSS-Only Carousel */}
          <div className="relative w-full overflow-hidden rounded-2xl h-[250px]">
            <div className="flex w-[200%] animate-slide h-full gap-4">
              {[...carouselImages, ...carouselImages].map((img, i) => (
                <div key={i} className="w-full h-full flex-shrink-0">
                  <img src={img} className="w-full h-full object-cover rounded-2xl" alt="Seasonal property maintenance" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="space-y-6 pb-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Schedule Your Cleaning
        </h2>
        <p>
          Contact Camz Cleaning today to schedule your seasonal property service and keep your space fresh and well-maintained all year round.
        </p>
        <Link href="/contact" className="inline-block bg-[#0091C1] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0B4E9B] transition-colors shadow-lg">
          Book Service
        </Link>
      </section>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SeasonalPropertyContent;