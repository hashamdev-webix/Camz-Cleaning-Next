import React from "react";
import Link from "next/link";
import { IoCheckmarkCircleOutline, IoCallOutline } from "react-icons/io5";

const ServiceSidebar = () => {
  const services = [
    { name: "Commercial Cleaning", href: "/services/commercial" },
    { name: "Residential Cleaning", href: "/services/residential" },
    { name: "Vehicle Cleaning Service", href: "/services/vehicle" },
    { name: "Seasonal Property Service", href: "/services/seasonal" },
  ];

  return (
    <div className="w-full space-y-8">
      {/* 1. Services List Card */}
      <div className="bg-[#0B4E9B] rounded-[1.5rem] p-8 text-white shadow-xl">
        <h3 className="text-2xl font-extrabold mb-6 tracking-tight">Services List</h3>
        <ul className="space-y-4">
          {services.map((service) => {
           
            return (
              <li key={service.name}>
                <Link
                  href={service.href}
                  className={`flex items-center gap-3 text-sm md:text-base font-bold transition-colors hover:text-[#00CFE8] `}
                >
                  <IoCheckmarkCircleOutline 
                    size={20} 
                    className= "text-white"
                  />
                  {service.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. Need Help CTA Card */}
      <div className="relative rounded-[1.5rem] overflow-hidden group h-[400px]">
        {/* Background Image */}
        <img
          src="/p4.webp"
          alt="Cleaning background"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Dark Blue Overlay */}
        <div className="absolute inset-0 bg-[#0B4E9B]/80 flex flex-col justify-center p-8 text-white">
          <div className="bg-white/20 w-fit p-3 rounded-full mb-6">
            <IoCallOutline size={30} className="rotate-12" />
          </div>
          
          <h3 className="text-3xl font-extrabold mb-4 leading-tight">
            Need any Kind of <br /> Help?
          </h3>
          
          <p className="text-sm text-white mb-8 leading-relaxed">
            <span className="text-white text-base">Need assistance with cleaning services? Our friendly team is ready to help anytime.</span>
          </p>
          
          <Link
            href="/contact"
            className="w-fit border-2 border-white/60 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white hover:text-[#0B4E9B] transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceSidebar;