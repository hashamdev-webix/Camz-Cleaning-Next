"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  {
    src: "/wp-admin/uploads/clean-wadrobe.webp",
    alt: "Clean wardrobe after a cleaning service",
  },
  {
    src: "/wp-admin/uploads/cleaned-floor.webp",
    alt: "Clean floor after a cleaning service",
  },
  {
    src: "/wp-admin/uploads/whole-bathroom-cleaning.webp",
    alt: "Clean bathroom after a cleaning service",
  },
];

const AreasServed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-white px-6 py-16 md:px-12 lg:px-24">
      <div className="container-custom mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <span className="inline-block rounded-full bg-[#00CEE6] px-5 py-1.5 text-sm font-semibold text-white">
            Calgary Service Area
          </span>
          <h2 className="text-4xl font-extrabold text-[#004A8C] md:text-5xl">
            Cleaning Coverage Across Calgary
          </h2>
          <p className="leading-relaxed text-gray-700">
            Camz Cleaning provides cleaning services for eligible homes,
            workplaces, vehicles and seasonal properties across Calgary.
            Service availability depends on the address, selected service,
            requested appointment and team availability.
          </p>
          <p className="leading-relaxed text-gray-700">
            Provide the Calgary address and relevant property or vehicle details
            when booking. Camz Cleaning reviews the request before confirming
            service coverage, scope and appointment availability.
          </p>
          <p className="leading-relaxed text-gray-700">
            If you are unsure whether a location is covered, include the address
            in the booking request so coverage can be confirmed before the
            appointment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AreasServed;
