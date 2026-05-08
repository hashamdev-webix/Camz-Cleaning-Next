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
      title: "Residential Clean Service Calgary",
      description: "Expert residential cleaning in Calgary for homes, apartments, and condos. Trusted professionals delivering spotless results get your quote today",
      href: "/residential-cleaning-services",
      isDark: false
    },
    {
      title: "Commercial Cleaning in Calgary",
      description: "Trusted commercial and office cleaning in Calgary. Professional service for spotless workplaces. Schedule your office cleaning today.",
      href: "/commercial-cleaning-services",
      isDark: true
    },
    {
      title: "Vehicle Cleaning Services at Home Calgary",
      description: "Keep your vehicle spotless without leaving home in Cochrane. Camz Cleaning brings convenient, professional mobile car cleaning right to your doorstep today.",
      href: "/vehicle-cleaning-service",
      isDark: false
    },
    {
      title: "Seasonal Property Cleaning Services",
      description: "Keep your property clean year-round with spring deep cleaning, winter sanitizing, fall dust removal, summer refresh, and snow removal services.",
      href: "/seasonal-property-service",
      isDark: true
    },
    {
      title: "Move In Move Out Cleaning Calgary",
      description: "Start fresh or leave spotless in Calgary with our move-in and move-out cleaning services, delivering thorough, reliable care and a stress-free home-cleaning experience.",
      href: "/residential-cleaning-services", // Mapping to residential category
      isDark: false
    },
    {
      title: "Duct, Furnace & Fireplace Cleaning",
      description: "CamzCleaning helps you breathe easier. Our duct, furnace, and fireplace cleaning boosts airflow, cuts dust, and ensures safe, transparent service today.",
      href: "/commercial-cleaning-services", // Mapping to commercial/industrial category
      isDark: true
    }
  ];

  return (
    <section className="bg-[#EFFAFC] py-20 px-6 md:px-12 lg:px-24">
      <div className="container-custom mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B4E9B] text-center mb-16">
          Our Professional Cleaning Services Calgary
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