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
  ArrowRight 
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
      id: "Commercial",
      title: "Commercial Cleaning",
      description: "Professional commercial cleaning ensuring spotless, hygienic, and productive workspaces.",
      icon: <Building2 className="w-10 h-10" />,
    },
    {
      id: "Residential",
      title: "Residential Cleaning",
      description: "Reliable residential cleaning services delivering fresh, spotless, and comfortable living spaces.",
      icon: <Home className="w-10 h-10" />,
      dark: true,
    },
    {
      id: "Vehicle",
      title: "Vehicle Cleaning Service",
      description: "Professional vehicle cleaning services restoring shine, freshness, comfort, and lasting protection.",
      icon: <Car className="w-10 h-10" />,
    },
    {
      id: "Seasonal",
      title: "Seasonal Property Service",
      description: "Professional seasonal property cleaning ensuring freshness, maintenance, and reliable protection.",
      icon: <CalendarClock className="w-10 h-10" />,
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
        backgroundImage="/p4.webp" // <-- Put your image name here (e.g., "/car-cleaning.jpg")
        title={
          <>
            Book Your Cleaning Service
          </>
        }
      />
  
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-6 md:px-12 lg:px-24">

      
      <div className="container-custom mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? "All" : cat.id)}
              className={`cursor-pointer group p-8 rounded-2xl shadow-sm border transition-all duration-300 ${
                activeCategory === cat.id ? 'ring-4 ring-[#00B7EB]' : ''
              } ${
                cat.dark 
                ? 'bg-[#004A8C] text-white border-transparent' 
                : 'bg-white text-gray-800 border-gray-100 hover:border-[#00B7EB]'
              }`}
            >
              <div className={`${cat.dark ? 'text-white' : 'text-[#00B7EB]'} mb-6`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{cat.title}</h3>
              <p className={`text-sm mb-8 leading-relaxed ${cat.dark ? 'text-blue-100' : 'text-gray-500'}`}>
                {cat.description}
              </p>
              <button className={`flex items-center gap-2 font-bold text-sm uppercase px-6 py-2 rounded-lg transition-colors ${
                cat.dark 
                ? 'bg-transparent border border-white text-white hover:bg-white hover:text-[#004A8C]' 
                : 'bg-[#00B7EB] text-white hover:bg-[#004A8C]'
              }`}>
                Read More <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Services Display Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#004A8C]">
            {activeCategory === "All" ? "All Services" : `${activeCategory} Services`}
          </h2>
          <p className="text-gray-500 mt-2">From homes to offices, carpets to cars — professional cleaning for every need.</p>
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