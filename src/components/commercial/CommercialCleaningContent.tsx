"use client"
import Link from "next/link";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const CommercialCleaningContent = () => {
  const coverageItems = [
    "Office Desks and Workstations",
    "Meeting Rooms and Reception Areas",
    "Restrooms Cleaning and Sanitization",
    "Floor Cleaning and Maintenance",
    "High-Touch Surface Disinfection",
    "Waste Collection and Disposal",
  ];

  const carouselData = [
    { src: "/wp-admin/uploads/stairs cleaning.webp", alt: "Professional stairs cleaning service" },
    { src: "/wp-admin/uploads/floor cleaning of home.webp", alt: "Deep floor cleaning of home" },
    { src: "/wp-admin/uploads/floor cleaning of home-2.webp", alt: "Residential floor sanitization" },
    { src: "/wp-admin/uploads/floor cleaning of home-3.webp", alt: "Professional home floor maintenance" },
  ];

  return (
    <div className="space-y-12 text-gray-700">
      {/* Hero Section */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4E9B] leading-tight italic">
          Reliable Commercial Cleaning  Service for Businesses Across Alberta
        </h2>
        <div className="rounded-[2rem] overflow-hidden shadow-md">
          <img src="/commercial-cleaning.webp" alt="Clean Office Floor" className="w-full object-cover h-[300px] md:h-[400px]" />
        </div>
        <p className="leading-relaxed font-semibold">
          A clean and well-maintained workplace plays an important role in creating a positive impression on clients and supporting employee productivity. Dusty corners, stained carpets, and unclean surfaces can quickly make any office look unprofessional and uncomfortable. At <span className="text-[#0B4E9B] font-bold">Camz Cleaning</span>, we offer dependable Commercial Cleaning Services in Calgary, Airdrie, Cochrane, and Chestermere to keep your workspace spotless, sanitized, and welcoming.
        </p>
      </section>

      {/* Why Choose Section */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Why Choose Professional Commercial Cleaning Services?
        </h2>
        <p className="leading-relaxed">
          Professional cleaning creates a healthier, safer, and more productive environment. Hiring experts saves businesses time, reduces stress, and maintains high hygiene standards. With our commercial cleaning services, you get attention to detail, reliability, and a workspace that reflects professionalism.
        </p>
      </section>

      {/* Services List Section */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
          Our Commercial Cleaning Services
        </h2>
        <div className="space-y-6">
          {[
            { id: 1, title: "Business Cleaning Services", desc: "Customizable business cleaning services meet your unique needs from daily office cleaning to specialized tasks like kitchen or restroom care." },
            { id: 2, title: "Cleaning and Sanitization", desc: "High-touch areas like desks, doorknobs, and restrooms are sanitized with our Cleaning and Sanitization service, creating a safer workspace." },
            { id: 3, title: "Tile Cleaning Service", desc: "Our tile cleaning service removes grime and restores shine while keeping floors safe for staff and visitors." },
            { id: 4, title: "Commercial Office Cleaning", desc: "We cover dusting, vacuuming, and sanitizing. Our Commercial Office Cleaning ensures your workspace stays organized and welcoming." }
          ].map((item) => (
            <div key={item.id} className="space-y-1">
              <h3 className="text-xl font-bold text-[#0B4E9B]">{item.id}. {item.title}</h3>
              <p className="text-sm md:text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

  
   {/* Carousel & Coverage Section */}
<section className="space-y-6">
  <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B4E9B]">
    Our Commercial Cleaning Covers
  </h2>
  
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
          Schedule Your Service
        </h2>
        <p>
          Contact Camz Cleaning today to schedule your commercial cleaning service and maintain a spotless, professional business environment.
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

export default CommercialCleaningContent;