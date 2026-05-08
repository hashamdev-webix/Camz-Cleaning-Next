"use client";
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronRightCircle } from "lucide-react";
import { useRouter } from 'next/navigation';

const services: { title: string; desc: string; highlighted: boolean; icon: string; url: string }[] = [
  {
    title: "Commercial Cleaning",
    desc: "Commercial Cleaning Services for offices, restaurants, and facilities, professional cleaning solutions designed to keep businesses spotless.",
    highlighted: false,
    icon:"/market.png",
    url:"/commercial-cleaning-services"
  },
  {
    title: "Residential Cleaning",
    desc: "Trusted Residential Cleaning Services for healthier homes. We provide dusting, vacuuming, room cleaning, sanitizing, furnace, and duct cleaning for fresh air.",
    highlighted: true,
    icon:"/house.png",
    url:"/residential-cleaning-services"
  },
  {
    title: "Vehicle Cleaning Service",
    desc: "Complete vehicle cleaning service including interior vacuuming, car seat & carpet cleaning, dashboard care, and exterior detailing for a spotless, refreshed ride.",
    highlighted: false,
    icon:"/clean.png",
    url:"/vehicle-cleaning-service"
  },
];

export default function Services() {
  const router=useRouter()
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
      <div className="container-custom mx-auto px-6 text-center">
        
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
  className={`rounded-xl border p-6 text-left transition flex flex-col h-full ${
    isMiddle
      ? "bg-[#0B4E9B] text-white border-transparent"
      : "bg-white border-[#0B4E9B]"
  }`}
>
  {/* Icon */}
  <div className="mb-5">
    <img
      src={service.icon}
      alt={`${service.title} icon`}
      className="w-16 h-16 object-contain"
    />
  </div>

  {/* Title */}
  <h3
    className={`text-2xl font-bold mb-4 leading-tight ${
      isMiddle ? "text-white" : "text-[#0B4E9B]"
    }`}
  >
    {service.title}
  </h3>

  {/* Content Area */}
  <div className="flex flex-col flex-1">

    {/* Description */}
    <p
      className={`flex-1 mb-8 leading-7 ${
        isMiddle ? "text-white/90" : "text-gray-600"
      }`}
    >
      {service.desc}
    </p>

    {/* Button */}
    <motion.button
      onClick={() => router.push(service.url)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex self-start items-center gap-2 px-5 py-3 cursor-pointer rounded-lg text-sm font-semibold transition ${
        isMiddle
          ? "border border-white text-white hover:bg-white hover:text-[#0B4E9B]"
          : "bg-[#0077AB] text-white hover:bg-[#0B4E9B]"
      }`}
    >
      Read More <ChevronRightCircle size={18} />
    </motion.button>
  </div>
</motion.div>
     
    );
  })}
</div>
      </div>
    </section>
  );
}