import CommercialHero from '@/components/commercial/commercialHero';
import ServiceSidebar from '@/components/common/ServiceSidebar';
import CommercialCleaningContent from "@/components/commercial/CommercialCleaningContent"
import AreasServed from '@/components/home/AreasServed';
import FAQSection from '@/components/commercial/FaqSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CommercialCTA from '@/components/commercial/CommercialCTA';
import ResidentialCleaningContent from '@/components/residential/ResidentialCleaningContent';
import ResidentialHero from '@/components/residential/ResidentialHero';

const page = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section stays at the top */}
      <ResidentialHero/>

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
            <ResidentialCleaningContent />
          </article>
          
        </div>
      </section>

      {/* Example of a Next Section to test the scroll-away effect */}
      <AreasServed/>
      <FAQSection/>
      <TestimonialsSection/>
      <CommercialCTA/>
    </main>
  );
};

export default page;