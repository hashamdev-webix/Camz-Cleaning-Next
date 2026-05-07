"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRightCircle } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string; // Added href prop
  isDark?: boolean;
}

const ServiceCard = ({ title, description, href, isDark = false }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-8 rounded-[1.5rem] shadow-lg flex flex-col h-full transition-all duration-300 ${
        isDark 
        ? "bg-[#0B4E9B] text-white border-transparent" 
        : "bg-white text-[#0B4E9B] border border-gray-100"
      }`}
    >
      <h3 className="text-2xl font-extrabold mb-4 leading-tight">
        {title}
      </h3>
      <p className={`text-sm mb-8 leading-relaxed font-medium flex-grow ${
        isDark ? "text-blue-50" : "text-gray-600"
      }`}>
        {description}
      </p>
      
      <div>
        <Link
          href={href} // Using specific service URL
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            isDark
            ? "border-2 border-white text-white hover:bg-white hover:text-[#0B4E9B]"
            : "bg-gradient-to-r from-[#0091C1] to-[#0B4E9B] text-white hover:shadow-md"
          }`}
        >
          Read More <ChevronRightCircle size={18} />
        </Link>
      </div>
    </motion.div>
  );
};

const ProfessionalServicesGrid = () => {
  const services = [
    {
      title: "Residential Cleaning Service Cochrane",
      description: "Enjoy a spotless, healthy Cochrane home with our expert residential cleaning service, delivering detailed care and a fresh, comfortable living space.",
      href: "/residential-cleaning-services",
      isDark: false
    },
    {
      title: "Commercial Cleaning Cochrane",
      description: "Maintain a spotless Cochrane workplace with Camz Cleaning’s professional and reliable commercial cleaning services, ensuring cleanliness and a healthy environment.",
      href: "/commercial-cleaning-services",
      isDark: true
    },
    {
      title: "Vehicle Cleaning Services at Home Cochrane",
      description: "CamzCleaning brings professional vehicle cleaning to your home in Cochrane, interior, exterior, and full detailing done carefully, saving you time and effort.",
      href: "/vehicle-cleaning-service",
      isDark: false
    },
    {
      title: "Seasonal Property Services Cochrane",
      description: "CamzCleaning Seasonal Property Services. Cochrane keeps your home safe in winter with snow removal and your lawn perfect in summer with expert care.",
      href: "/seasonal-property-service",
      isDark: true
    },
    {
      title: "Move In Move Out Cleaning Cochrane",
      description: "Make moving stress-free with CamzCleaning’s move-in/move-out cleaning in Cochrane, deep-cleaning kitchens, bathrooms, floors, and hidden corners.",
      href: "/residential-cleaning-services", 
      isDark: false
    },
    {
      title: "Duct, Furnace & Fireplace Cleaning",
      description: "Breathe cleaner air with CamzCleaning! Our duct, furnace, & fireplace cleaning improves airflow, reduces dust, and ensures safe operation with costs explained upfront.",
      href: "/commercial-cleaning-services", 
      isDark: true
    }
];

  return (
    <section className="bg-[#EFFAFC] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B4E9B] text-center mb-16">
         Keep Your Cochrane Home Fresh & Comfortable with Camz Cleaning
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              href={service.href}
              isDark={service.isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalServicesGrid;