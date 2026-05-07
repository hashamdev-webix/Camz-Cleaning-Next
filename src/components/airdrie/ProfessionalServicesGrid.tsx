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
      title: "Residential Cleaning Service Airdrie",
      description: "Camz Cleaning in Airdrie offers expert home cleaning-carpets, bathrooms, kitchens, fireplaces, and furnaces ensuring spotless, hygienic, and safe spaces.",
      href: "/residential-cleaning-services",
      isDark: false
    },
    {
      title: "Commercial Cleaning Airdrie",
      description: "Tailored commercial cleaning services in Airdrie for offices, restaurants, kitchens, and specialized spaces, delivering reliable, thorough, and professional cleaning solutions.",
      href: "/commercial-cleaning-services",
      isDark: true
    },
    {
      title: "Vehicle Cleaning Services Airdrie",
      description: "Get mobile vehicle cleaning in Airdrie today. From interior vacuuming and car seat cleaning to exterior detailing, we bring professional care to you.",
      href: "/vehicle-cleaning-service",
      isDark: false
    },
    {
      title: "Seasonal Property Services Airdrie",
      description: "Seasonal property care in Airdrie snow removal for homes & businesses, sidewalk clearing, plus lawn care services with flexible pricing & quotes.",
      href: "/seasonal-property-service",
      isDark: true
    },
    {
      title: "Move In Move Out Cleaning Airdrie",
      description: "Our Move-In/Move-Out Cleaning in Airdrie ensures homes and offices are spotless for new occupants, with deep kitchen, bathroom, and full sanitizing.",
      href: "/residential-cleaning-services", // Mapping to residential category
      isDark: false
    },
    {
      title: "Fireplace, Furnace & Vent Cleaning",
      description: "Ensure safety and clean air with Camz Cleaning. Expert fireplace and furnace cleaning in Airdrie, with inspections, honest pricing, and improved efficiency.",
      href: "/commercial-cleaning-services", // Mapping to commercial/industrial category
      isDark: true
    }
  ];

  return (
    <section className="bg-[#EFFAFC] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B4E9B] text-center mb-16">
          Complete Cleaning Solutions for Airdrie Homes & Businesses
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