"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { 
  Building2, 
  Home, 
  Car, 
  CalendarClock, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sofa
} from 'lucide-react';
import CommonHeroSection from '@/components/common/CommonHeroSection';
import BookingModal from '@/components/models/Booking';


// --- Types ---
interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
  icon: React.ReactNode;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  dark?: boolean;
}

const BookingPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedServiceTitle, setSelectedServiceTitle] = useState("");
const handleBookNow = (title: string) => {
  setSelectedServiceTitle(title);
  setIsModalOpen(true);
};
 const categories: Category[] = [

   {
    id: "Residential",
    title: "Residential",
    description: "Homes & apartments",

    icon: <Home className="w-8 h-8" />,
  },

  {
    id: "Commercial",
    title: "Commercial",
    description: "Offices, retail & clinics",

    icon: <Building2 className="w-8 h-8" />,
  },
  {
    id: "Vehicle",
    title: "Vehicle",
    description: "Auto detailing & car cleaning",
  
    icon: <Car className="w-8 h-8" />,
  },

  {
    id: "Seasonal",
    title: "Property",
    description: "Carpet, sofa & move-in/out",

    icon: <Sofa className="w-8 h-8" />,
    dark: true,
  },

 
];

  const allServices: Service[] = [
    {
      id: "1",
      category: "Residential",
      title: "Residential Cleaning",
      description: "Sparkling homes, every visit.",
      price: "From $89",
      duration: "2-3 hrs",
      image: "/p4.webp", // Replace with your actual image paths
      icon: <Home className="w-5 h-5 text-blue-600" />,
      features: ["Kitchen & bathrooms", "Dusting & vacuuming", "Floor mopping", "Trash removal"],
    },
    {
      id: "2",
      category: "Residential",
      title: "Move-In / Move-Out",
      description: "Spotless transitions made easy.",
      price: "From $179",
      duration: "4-6 hrs",
      image: "/p4.webp",
      icon: <Home className="w-5 h-5 text-blue-600" />,
      features: ["Inside cabinets", "Appliance deep clean", "Walls & baseboards", "Window tracks"],
    },
    {
      id: "3",
      category: "Commercial",
      title: "Commercial Cleaning",
      description: "Professional offices & retail.",
      price: "Custom Quote",
      duration: "Flexible",
      image: "/p4.webp",
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      features: ["Daily / weekly plans", "Restroom sanitation", "Glass & lobby", "After-hours service"],
    },
    // Add more services for Vehicle and Seasonal categories here
  ];

  const filteredServices = activeCategory === "All" 
    ? allServices 
    : allServices.filter(s => s.category === activeCategory);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <CommonHeroSection 
        backgroundImage="/p4.webp" 
        title={
          <>
            Book Your Cleaning Service
          </>
        }
      />
  
    <main className="min-h-screen bg-[#F8FAFC] py-6 px-6 md:px-12 lg:px-24">

      
      <div className="container-custom mx-auto">
        
        {/* Header */}
        <div className="text-center">
          <span className="bg-[#00B7EB] text-white px-4 py-1 rounded-full text-sm font-bold uppercase">
            Our services
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#004A8C] mt-6 mb-4">
            Relax While We Handle Cleaning
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Relax and let the experts do the work. Camz Cleaning delivers meticulous cleaning, careful sanitization, and a sparkling space you'll love coming back to.
          </p>
        </div>

    
    {/* Category Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
  {categories.map((cat) => {
    const isActive = activeCategory === cat.id;

    return (
      <div
        key={cat.id}
        onClick={() =>
          setActiveCategory(isActive ? "All" : cat.id)
        }
        className={`relative overflow-hidden cursor-pointer rounded-[22px] p-6 transition-all duration-300 border min-h-[220px] ${
  isActive
    ? "border-white ring-2 ring-[#2F80FF]"
    : "border-transparent"
} bg-[#0B4E9B]`}
      >
        {/* Check Icon */}
        {isActive && (
          <div className="absolute right-5 top-5">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#2F80FF] fill-current"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          </div>
        )}

        {/* Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-white">
            {cat.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
          {cat.title}
        </h3>

        {/* Description */}
        <p className="text-white/80 leading-7 mb-8">
          {cat.description}
        </p>

        {/* Service Badge */}
        {/* <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
          1 service
        </div> */}
      </div>
    );
  })}
</div>

        {/* Services Display Section */}
        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold text-[#004A8C]">
            {activeCategory === "All" ? "All Services" : `${activeCategory} Services`}
          </h2>
          <p className="text-gray-500 my-4">From homes to offices, carpets to cars — professional cleaning for every need.</p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
                {/* Badges */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                  {service.price}
                </div>
                <div className="absolute top-4 right-4 bg-[#004A8C]/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-white flex items-center gap-1 shadow-sm">
                  <Clock size={14} /> {service.duration}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  {service.icon}
                  <h3 className="text-2xl font-extrabold text-[#004A8C]">{service.title}</h3>
                </div>
                <p className="text-gray-500 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <CheckCircle2 size={18} className="text-[#00B7EB]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button onClick={() => handleBookNow(service.title)} className="mt-auto flex items-center gap-2 text-[#00B7EB] font-bold hover:text-[#004A8C] transition-colors group cursor-pointer">
                  Book now <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No services found in this category yet.
          </div>
        )}
      </div>
      <BookingModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  serviceTitle={selectedServiceTitle} 
/>
    </main>
      </>
  );
};

export default BookingPage;