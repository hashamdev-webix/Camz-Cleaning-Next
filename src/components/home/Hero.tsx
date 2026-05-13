"use client";

import Image from "next/image";
import Link from "next/link";
import {  Mic2 } from "lucide-react";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export default function Hero() {
  return (
    <section 
     className="  relative overflow-hidden text-white bg-cover bg-center"
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(31,95,155,0.9), rgba(2,192,230,0.9)),
      url('/hero-bg.webp')
    `,
  }}
    >
      
      {/* Background overlay pattern (optional later) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-cover bg-center" />

      <div className="relative container-custom  grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div className="mb-28">
          {/* Small badge */}
          <span className="inline-block mb-4 px-4 py-1 text-base rounded-full bg-[#02C0E6] border border-white/30">
            Freshness You Feel
          </span>

          {/* Heading */}
          <h5 className="text-4xl md:text-[55px]  font-extrabold leading-tight mb-6">
            Trusted Cleaning <br />
            Company Based in <br />
            Calgary
          </h5>

          {/* Description */}
          <p className="text-white mb-8 max-w-2xl w-full">
            <strong>Camz Cleaning</strong> provides professional cleaning services for homes,
            offices, and commercial spaces. Book trusted residential cleaning,
            move-in/move-out cleaning, and commercial cleaning services with a
            skilled team and flexible schedules to keep your space clean.
          </p>

          {/* CTA + Phone */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            <Link href="/booking">
              <button className="px-6 py-3 rounded-md cursor-pointer  border border-white bg-transparent hover:bg-white hover:transition-all duration-300 transition-transform hover:text-black">
                Our Services
              </button>
            </Link>

            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <TfiHeadphoneAlt size={24} />

              </div>
              <div>
                <p className="text-sm ">HAVE ANY QUESTION ?</p>
                <p className="text-lg font-semibold">+1 587-837-1977</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
         <div className="relative flex justify-center md:justify-end mt-10">
      <Image
        src="/Banner-Image.webp"
        alt="Cleaning Service"
        width={650}
        height={650}
        className="object-contain scale-105"
        priority
      />
    </div>
      </div>

      {/* Bottom curve */}
    {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
  <svg
    className="relative block w-full h-[100px]"
    viewBox="0 0 1440 320"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M0,256L120,245.3C240,235,480,213,720,218.7C960,224,1200,256,1320,272L1440,288L1440,320L0,320Z"
    />
  </svg>
</div> */}
    </section>
  );
}