"use client";
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from "lucide-react";

const services: { title: string; desc: string; highlighted: boolean; icon: string }[] = [
  {
    title: "Commercial Cleaning",
    desc: "Commercial Cleaning Services for offices, restaurants, and facilities, professional cleaning solutions designed to keep businesses spotless.",
    highlighted: false,
    icon:"/market.png"
  },
  {
    title: "Residential Cleaning",
    desc: "Trusted Residential Cleaning Services for healthier homes. We provide dusting, vacuuming, room cleaning, sanitizing, furnace, and duct cleaning for fresh air.",
    highlighted: true,
    icon:"/house.png"
  },
  {
    title: "Vehicle Cleaning Service",
    desc: "Complete vehicle cleaning service including interior vacuuming, car seat & carpet cleaning, dashboard care, and exterior detailing for a spotless, refreshed ride.",
    highlighted: false,
    icon:"/clean.png"
  
  },
];

export default function Services() {
    const cardVariants: Variants = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  hiddenTop: { opacity: 0, y: -80 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Badge */}
        <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-[#02C0E6] text-white">
          Our services
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B4E9B] mb-4">
          Our Professional Cleaning Services
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-gray-600 mb-12 leading-relaxed">
          We provide complete cleaning solutions for homes and businesses. As one of the leading cleaning companies, we focus on detail, safety, and customer satisfaction.
        </p>

      {/* Cards */}
<div className="grid md:grid-cols-3 gap-6">
  {services.map((service, index) => {
    const isMiddle = service.highlighted;

    // Direction logic
    let initialVariant = "hiddenLeft";
    if (index === 1) initialVariant = "hiddenTop";
    if (index === 2) initialVariant = "hiddenRight";

    return (
      <motion.div
        key={index}
        variants={cardVariants}
        initial={initialVariant}
        whileInView="visible"
        viewport={{ once: true }}
        className={`rounded-xl border p-6 text-left transition ${
          isMiddle
            ? "bg-[#0B4E9B] text-white border-transparent"
            : "bg-white border-[#0B4E9B]"
        }`}
      >
        {/* Icon */}
        <div className="mb-4 text-4xl">
            <img src={service.icon} alt={`${service.title} icon`} className="w-16 h-16"/>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-semibold mb-3 ${
            isMiddle ? "text-white" : "text-[#0B4E9B]"
          }`}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className={`mb-6 ${
            isMiddle ? "text-white/90" : "text-gray-600"
          }`}
        >
          {service.desc}
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center gap-2 px-5 py-2.5 cursor-pointer rounded-lg text-sm font-medium transition ${
            isMiddle
              ? "border border-white text-white hover:bg-white hover:text-[#0B4E9B]"
              : "bg-[#02C0E6] text-white hover:opacity-90"
          }`}
        >
          Read More
        </motion.button>
      </motion.div>
    );
  })}
</div>
      </div>
    </section>
  );
}