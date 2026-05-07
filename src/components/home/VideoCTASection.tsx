"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, Star } from "lucide-react";

const VideoCTASection = () => {
  return (
    <section  className="relative py-20 px-6 md:px-12 lg:px-24 overflow-hidden text-white bg-cover bg-center"
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(0,74,140,0.9), rgba(0,74,140,0.85)),
      url('/video-bg.webp')
    `,
  }}>
      {/* Background Texture/Overlay - subtle darken */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6"
        >
          <span className="inline-block border border-cyan-400 text-cyan-400 px-4 py-1 rounded-full text-sm font-medium">
            Quality You Deserve
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Reliable Cleaning <br /> Delivered By Professionals
          </h2>

          <p className="text-blue-100 text-lg max-w-lg">
            We provide reliable, detailed cleaning services ensuring spotless
            spaces, healthier environments, and complete customer satisfaction
            every time.
          </p>

          {/* Ratings Divider Area */}
          <div className="pt-4 border-t border-white/20">
            <div className="flex flex-wrap items-center gap-6">
              {/* Avatar Group */}
<div className="flex -space-x-3">
  {[
    "/wp-admin/uploads/call-back-1.webp",
    "/wp-admin/uploads/call-back-2.webp",
    "/wp-admin/uploads/call-back-3.webp",
  ].map((src, index) => (
    <div
      key={index}
      className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-300"
    >
      <img
        src={src}
        alt={`client-${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>

              {/* Stars & Text */}
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="font-bold text-lg">Rated 5 Out Of 5 By Our Clients</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 flex flex-wrap items-center gap-8">
            <button className="border-2 border-white hover:bg-white hover:text-[#004A8C] text-white font-bold py-3 px-8 rounded-lg transition-all">
              Contact Us
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold">Call Us Anytime</p>
                <p className="text-xl font-bold">+1 587-837-1977</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Video Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-8 border-black/20">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/OBluXZ-qpOM"
              title="Camz Cleaning Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Decorative glow behind video */}
          <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full -z-10 group-hover:bg-cyan-500/30 transition-all"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoCTASection;