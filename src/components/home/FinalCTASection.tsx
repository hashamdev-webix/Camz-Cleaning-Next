"use client";
import React from "react";
import { motion } from "framer-motion";

const FinalCTASection = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#134D91]">
    {/* Background Image */}
  <div 
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: "url('wp-admin/uploads/clean lobby.webp')", // Ensure the extension (.jpg, .png, etc.) matches your file
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  />

  {/* Overlay to ensure text readability */}
  <div className="absolute inset-0 bg-[#134F95] opacity-92 z-10" />

      <div className="container-custom mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start space-y-6"
        >
          {/* Badge */}
          <span className="inline-block border border-cyan-400 text-cyan-400 px-5 py-1.5 rounded-full text-sm font-semibold">
            Get In Touch
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Book Your Cleaning Service Today!
          </h2>

          {/* Description */}
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl leading-relaxed">
            Book your professional cleaning service today and experience a spotless, fresh, and hygienic 
            environment delivered by our trusted, skilled, and dependable cleaning team.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 border-2 border-white text-white font-bold py-3 px-10 rounded-xl hover:bg-white hover:text-[#004A8C] transition-all duration-300 text-lg"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;