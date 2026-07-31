import ServiceSidebar from "@/components/common/ServiceSidebar";
import AreasServed from "@/components/home/AreasServed";

import TestimonialsSection from "@/components/home/TestimonialsSection";

import CommonHeroSection from "@/components/common/CommonHeroSection";
import VehicleCleaningContent from "@/components/vehicle/VehicleCleaningContent";
import CommonFAQ from "@/components/common/CommonFAQ";
import VehicleCTA from "@/components/vehicle/VehicleCTA";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Vehicle Cleaning Services at Home | Camz Cleaning",
  description:
    "Mobile car cleaning at your doorstep: interior vacuuming, seat and carpet care, dashboard detailing, exterior wash, and tire shine in the Calgary area.",
  path: "/vehicle-cleaning-service/",
});

const page = () => {
  const vehicleFaqs = [
    {
      id: 1,
      question: "1. Do you provide vehicle cleaning services at home?",
      answer:
        "Yes, CamzCleaning offers complete interior car cleaning at home and exterior car washes at home. Our mobile team arrives fully equipped to deliver professional vehicle cleaning services at your doorstep",
    },
    {
      id: 2,
      question: "2. What is included in your car interior cleaning service?",
      answer:
        "Our interior car cleaning service includes interior vacuum cleaning, car seat cleaning, car carpet cleaning at home, car mat cleaning, car dashboard cleaning, and window cleaning inside out.",
    },
    {
      id: 3,
      question: "3. How much does car seat cleaning cost?",
      answer:
        "Car seat cleaning cost depends on the vehicle size, seat material (fabric or leather), and level of dirt. CamzCleaning provides affordable pricing with deep cleaning using car seat cleaning foam and professional extraction machines.",
    },

    {
      id: 4,
      question: "4. Do you offer exterior car detailing and tire cleaning?",
      answer:
        "Yes, we provide full car exterior detailing, including exterior car wash, car wheel deep clean, deep cleaning car tires, and car wash tire shine. Our service restores shine and protects your vehicle’s exterior.",
    },
  ];
  return (
    <main className="min-h-screen bg-white">
      <CommonHeroSection
        backgroundImage="/wp-admin/uploads/help-bg.webp"
        title={
          <>
            Affordable Vehicle Cleaning Services
            <br /> | Car Interior and Exterior Detailing
          </>
        }
      />

      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container-custom mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <ServiceSidebar />
          </aside>

          <article className="lg:col-span-2">
            <VehicleCleaningContent />
          </article>
        </div>
      </section>

      <AreasServed />
      <CommonFAQ faqs={vehicleFaqs} />
      <TestimonialsSection />
      <VehicleCTA />
    </main>
  );
};

export default page;
