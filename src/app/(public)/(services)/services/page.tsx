import CommonHeroSection from "@/components/common/CommonHeroSection";
import Commercial from "@/components/services/Commercial";
import FinalCTASection from "@/components/services/FinalCTASection";
import Property from "@/components/services/Property";
import Residential from "@/components/services/Residential";
import Services from "@/components/services/Services";
import Vehicle from "@/components/services/Vehicle";
import React from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Cleaning Services | Camz Cleaning",
  description:
    "Explore Camz Cleaning services: residential and commercial cleaning, vehicle detailing at home, and seasonal property care across the Calgary area.",
  path: "/services/",
});

export default function page() {
  return (
    <div>
      <CommonHeroSection
        backgroundImage="/wp-admin/uploads/vehicle.webp"
        title={<>Our Services</>}
      />
      <Services />
      <Residential />
      <Commercial />
      <Vehicle />
      <Property />
      <FinalCTASection />
    </div>
  );
}
