
import ServiceSidebar from '@/components/common/ServiceSidebar';
import AreasServed from '@/components/home/AreasServed';

import TestimonialsSection from '@/components/home/TestimonialsSection';

import CommonHeroSection from '@/components/common/CommonHeroSection';

import SeasonalPropertyContent from '@/components/seasonal/SeasonalPropertyContent';

import SeasonalCTA from '@/components/seasonal/SeasonalTA';
import CommonFAQ from '@/components/common/CommonFAQ';

const page = () => {
     const seasonalFaqs = [
  {
    id: 1,
    question: "1. What are Seasonal Property Services?",
    answer: "Seasonal Property Services include maintenance tasks that keep your property clean and safe throughout the year, such as lawn care, snow removal, outdoor cleaning, and seasonal upkeep.",
  },
  {
    id: 2,
    question: "2. What services are included in seasonal property maintenance?",
    answer: "These services often include snow removal, sidewalk clearing, lawn care, yard cleanup, and general outdoor maintenance to keep your property looking neat in every season.",
  },
  {
    id: 3,
    question: "3. Who needs Seasonal Property Services?",
    answer: "Homeowners and businesses that want to keep their property well-maintained year-round benefit from seasonal property services, especially during winter snow and summer lawn care periods.",
  },
 
  {
    id: 4,
    question: "4. How often should Seasonal Property Services be scheduled?",
    answer: "Seasonal services are usually scheduled monthly or according to the season, such as regular lawn care in warmer months and snow removal during winter for continuous property care.",
  },
];
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section stays at the top */}
      <CommonHeroSection 
        backgroundImage="/wp-admin/uploads/residential-hero.webp" 
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
        <div className="container-custom mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
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
   <CommonFAQ faqs={seasonalFaqs}/>
      <TestimonialsSection/>
      <SeasonalCTA/>
    </main>
  );
};

export default page;