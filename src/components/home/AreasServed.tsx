"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const serviceAreas = [
  {
    city: "Calgary",
    description: "Comprehensive residential and commercial cleaning services across Calgary, delivered by trusted professionals focused on quality, reliability, and outstanding results.",
    bgColor: "bg-[#2964A8]", // Darker Blue
    url:"/calgary-cleaning-services"
  },
  {
    city: "Airdrie",
    description: "Affordable and reliable cleaning services for homes and businesses across Airdrie, tailored to meet your specific needs with consistent quality.",
    bgColor: "bg-[#00B7EB]", // Bright Cyan
    url:"/airdrie-cleaning-services"
  },
  {
    city: "Cochrane",
    description: "Professional home and office cleaning services in Cochrane, delivering spotless, hygienic, and carefully maintained spaces with reliable, consistent results.",
    bgColor: "bg-[#00B7EB]", // Bright Cyan
    url:"/cochrane-cleaning-services"
  },
  {
    city: "Chestermere",
    description: "High-quality residential and commercial cleaning services in Chestermere, providing flexible scheduling, detailed care, and consistently professional results.",
    bgColor: "bg-[#2964A8]", // Darker Blue
    url:"/chestermere-cleaning-services"

  },
];

const AreasServed = () => {

  const router=useRouter()
  return (
    <section className="bg-[#EFFAFC] py-20 px-6 md:px-12 lg:px-24">
      <div className="container-custom mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="bg-[#00B7EB] text-white px-5 py-1.5 rounded-full text-sm font-semibold mb-6 inline-block">
            Service Areas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#004A8C] mb-6">
            Areas Served By Camz Cleaning
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            We deliver reliable residential, commercial, vehicle, and seasonal cleaning services across 
            Calgary, providing consistent quality and dependable solutions.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`${area.bgColor} p-8 rounded-xl text-white flex flex-col justify-start min-h-[180px] cursor-pointer transition-transform duration-300 hover:scale-[1.02] shadow-lg`}
              onClick={()=>router.push(area.url)}
            >
              <h3 className="text-3xl font-bold mb-4">{area.city}</h3>
              <p className="text-white leading-relaxed text-base md:text-lg">
               <span className="text-white" > {area.description}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasServed;