import CommonHeroSection from "@/components/common/CommonHeroSection";
import Commercial from "@/components/services/Commercial";
import FinalCTASection from "@/components/services/FinalCTASection";
import Property from "@/components/services/Property";
import Residential from "@/components/services/Residential";
import Services from "@/components/services/Services";
import Vehicle from "@/components/services/Vehicle";
import React from "react";

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
