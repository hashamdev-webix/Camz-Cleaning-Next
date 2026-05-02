
import ServiceSidebar from '@/components/common/ServiceSidebar';
import AreasServed from '@/components/home/AreasServed';

import TestimonialsSection from '@/components/home/TestimonialsSection';
import CommercialCTA from '@/components/commercial/CommercialCTA';
import CommonHeroSection from '@/components/common/CommonHeroSection';
import VehicleCleaningContent from '@/components/vehicle/VehicleCleaningContent';
import SeasonalPropertyContent from '@/components/seasonal/SeasonalPropertyContent';
import FaqSection from '@/components/seasonal/FaqSection';
import SeasonalCTA from '@/components/seasonal/SeasonalTA';

const page = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section stays at the top */}
      <CommonHeroSection 
        backgroundImage="/p4.webp" // <-- Put your image name here (e.g., "/car-cleaning.jpg")
        title={
          <>
            Affordable Vacation Rentals and Seasonal
            <br />  Property Cleaning & Care Service
          </>
        }
      />

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        {/* items-start is crucial here to allow the sidebar to be sticky */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Side: Sticky Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <ServiceSidebar  />
          </aside>

          {/* Right Side: Scrollable Content */}
          <article className="lg:col-span-2">
           <SeasonalPropertyContent/>
          </article>
          
        </div>
      </section>

      {/* Example of a Next Section to test the scroll-away effect */}
      <AreasServed/>
      <FaqSection/>
      <TestimonialsSection/>
      <SeasonalCTA/>
    </main>
  );
};

export default page;