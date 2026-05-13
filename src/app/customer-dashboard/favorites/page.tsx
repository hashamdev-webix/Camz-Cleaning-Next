"use client";

import Link from "next/link";
import {
  Heart,
  Star,
  ArrowRight,
  Car,
  Home,
  Building2,
  Sparkles,
} from "lucide-react";

const favorites = [
  {
    id: 1,
    title: "Vehicle Detailing",
    description:
      "Professional exterior and interior car detailing service.",
    price: "CAD $40.00",
    type: "Fixed & Hourly",
    icon: <Car size={28} />,
  },

  {
    id: 2,
    title: "Residential Cleaning",
    description:
      "Complete home cleaning for bedrooms, kitchens, and bathrooms.",
    price: "CAD $120.00",
    type: "Fixed Price",
    icon: <Home size={28} />,
  },

  {
    id: 3,
    title: "Commercial Cleaning",
    description:
      "Professional office and commercial space cleaning solutions.",
    price: "CAD $200.00",
    type: "Monthly Plan",
    icon: <Building2 size={28} />,
  },

  {
    id: 4,
    title: "Deep Cleaning",
    description:
      "Detailed deep cleaning for homes and workplaces.",
    price: "CAD $180.00",
    type: "Fixed Price",
    icon: <Sparkles size={28} />,
  },
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white px-4 md:px-8 py-6">

      {/* Heading */}
      <div className="flex items-center gap-4 mb-10">

        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400">
          <Heart size={28} fill="currentColor" />
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Favorite Services
          </h1>

          <p className="text-gray-400 mt-2">
            Your saved cleaning services.
          </p>
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="rounded-[32px] border border-white/10 bg-[#071224] p-10 text-center">

          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-gray-500">
            <Heart size={40} />
          </div>

          <h3 className="text-3xl font-bold mb-4">
            No Favorites Yet
          </h3>

          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Save your favorite services to quickly book them later.
          </p>

          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl bg-[#4A86F7] px-8 py-4 font-bold hover:bg-[#2563EB] transition"
          >
            Browse Services
          </Link>
        </div>
      ) : (

       <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">

          {favorites.map((service) => (
            <div
              key={service.id}
              className="overflow-hidden rounded-[24px] border border-white/10 bg-[#071224] hover:border-[#4A86F7]/40 transition-all duration-300"
            >

              <div className="p-5">

                {/* Top */}
                <div className="flex items-start justify-between gap-4 mb-6">

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1B34] flex items-center justify-center text-[#4A86F7] flex-shrink-0">
                    {service.icon}
                  </div>

                  {/* Heart */}
                  <button className="text-red-400 hover:scale-110 transition">
                    <Heart size={24} fill="currentColor" />
                  </button>
                </div>

                {/* Verified */}
                <span className="inline-flex items-center gap-2 rounded-full bg-[#4A86F7]/10 px-4 py-2 text-xs font-semibold text-[#4A86F7] mb-5">
                  <Star size={14} fill="currentColor" />

                  VERIFIED
                </span>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-6 mb-6 text-sm">
                  {service.description}
                </p>

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">

                  {/* Price */}
                  <div>
                    <h4 className="text-2xl font-bold text-[#4A86F7]">
                      {service.price}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      {service.type}
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A86F7] px-5 py-3 text-sm font-semibold hover:bg-[#2563EB] transition"
                  >
                    Book Now

                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}