"use client";
import React from "react";
import { motion } from "framer-motion";

const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden bg-[#134D91] py-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/p4.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-[#134F95]/70" />

      {/* Content */}
      <div className="container-custom relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Badge */}
          <span className="mb-6 inline-block rounded-full border border-cyan-400 px-5 py-2 text-sm font-semibold text-cyan-400">
            Clean Starts Here.
          </span>

          {/* Heading */}
          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Ready To Book Cleaning Service?
          </h2>

          {/* Description */}
          <p className="max-w-3xl text-lg leading-9 text-blue-100 md:text-xl">
            Refresh your home or office today with Camz Cleaning, trusted
            experts delivering fast, reliable, and spotless results you can
            count on.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 rounded-xl border-2 border-white px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#004A8C]"
          >
            Get Free Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
