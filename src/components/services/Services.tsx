"use client";

import Link from "next/link";
import {
  Building2,
  Home,
  Car,
  CalendarClock,
  ArrowRight,
  ChevronRightCircle,
} from "lucide-react";

const services = [
  {
    title: "Commercial Cleaning",
    description:
      "Professional commercial cleaning ensuring spotless, hygienic, and productive workspaces.",
    icon: <Building2 size={48} strokeWidth={1.8} />,
    dark: false,
    href: "/commercial-cleaning-services",
  },
  {
    title: "Residential Cleaning",
    description:
      "Reliable residential cleaning services delivering fresh, spotless, and comfortable living spaces for your home.",
    icon: <Home size={48} strokeWidth={1.8} />,
    dark: true,
    href: "/residential-cleaning-services",
  },
  {
    title: "Vehicle Cleaning Service",
    description:
      "Professional vehicle cleaning services restoring shine, freshness, comfort, and lasting protection.",
    icon: <Car size={48} strokeWidth={1.8} />,
    dark: false,
    href: "/vehicle-cleaning-service",
  },
  {
    title: "Seasonal Property Service",
    description:
      "Professional seasonal property cleaning ensuring freshness, maintenance, and reliable protection.",
    icon: <CalendarClock size={48} strokeWidth={1.8} />,
    dark: true,
    href: "/seasonal-property-service",
  },
];

export default function Services() {
  return (
    <section className="bg-[#EEF5F7] py-20">
      <div className="container-custom">
        {/* Top */}
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <span className="mb-5 inline-flex rounded-full bg-[#02C0E6] px-5 py-2 text-sm font-semibold text-white">
            Our services
          </span>

          <h2 className="mb-6 text-4xl md:text-5xl font-extrabold leading-tight text-[#0B4E9B]">
            Relax While We Handle Cleaning
          </h2>

          <p className="mx-auto max-w-3xl text-base md:text-lg leading-8 text-[#1A1A1A]">
            Relax and let the experts do the work. Camz Cleaning delivers
            meticulous cleaning, careful sanitization, and a sparkling space
            you’ll love coming back to.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 border border-[#0B4E9B] rounded-md shadow-lg flex flex-col h-full max-h-[400px] transition-all duration-300 ${
                service.dark
                  ? "bg-[#0B4E9B] text-white border-transparent"
                  : "bg-white text-[#0B4E9B] border border-gray-100"
              }`}
            >
              {/* Icon */}
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                  service.dark
                    ? "bg-white/10 text-white"
                    : "bg-[#EEF5F7] text-[#0B4E9B]"
                }`}
              >
                {service.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 items-start text-left">
                {/* Title */}
                <h3 className="text-3xl font-extrabold mb-4 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-base leading-8 font-medium ${
                    service.dark ? "text-blue-50" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>

                {/* Button */}
                <div className="mt-auto pt-6">
                  <Link
                    href={service.href}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      service.dark
                        ? "border border-white text-white hover:bg-white hover:text-[#0B4E9B]"
                        : "bg-gradient-to-r from-[#0091C1] to-[#0B4E9B] text-white hover:shadow-md"
                    }`}
                  >
                    Read More
                    <ChevronRightCircle size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
