"use client";

import Image from "next/image";
import Link from "next/link";
import {  Mic2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#1f5f9b] via-[#2c7fb8] to-[#02C0E6] text-white">
      
      {/* Background overlay pattern (optional later) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-cover bg-center" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          {/* Small badge */}
          <span className="inline-block mb-4 px-4 py-1 text-lg rounded-full bg-[#02C0E6] border border-white/30">
            Freshness You Feel
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Trusted Cleaning <br />
            Company Based in <br />
            Calgary
          </h1>

          {/* Description */}
          <p className="text-white mb-8 max-w-2xl w-full">
            <strong>Camz Cleaning</strong> provides professional cleaning services for homes,
            offices, and commercial spaces. Book trusted residential cleaning,
            move-in/move-out cleaning, and commercial cleaning services with a
            skilled team and flexible schedules to keep your space clean.
          </p>

          {/* CTA + Phone */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            <Link href="/services">
              <button className="px-6 py-3 rounded-md cursor-pointer  border border-white bg-transparent hover:bg-white hover:transition-all duration-300 transition-transform hover:text-black">
                Our Services
              </button>
            </Link>

            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Mic2 size={18} />
              </div>
              <div>
                <p className="text-sm ">HAVE ANY QUESTION ?</p>
                <p className="text-lg font-semibold">+1 587-837-1977</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center md:justify-end">
          <Image
            src="/Banner-Image.webp"
            alt="Cleaning Service"
            width={500}
            height={500}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,218.7C1120,235,1280,245,1360,250.7L1440,256L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}