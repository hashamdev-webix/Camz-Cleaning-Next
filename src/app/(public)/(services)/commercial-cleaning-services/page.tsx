import CommercialHero from '@/components/commercial/commercialHero';
import ServiceSidebar from '@/components/common/ServiceSidebar';
import CommercialCleaningContent from "@/components/commercial/CommercialCleaningContent"
import AreasServed from '@/components/home/AreasServed';

import TestimonialsSection from '@/components/home/TestimonialsSection';
import CommercialCTA from '@/components/commercial/CommercialCTA';
import CommonFAQ from '@/components/common/CommonFAQ';

const page = () => {

  const commercialFaqs = [
  {
    id: 1,
    question: "1. What does your commercial cleaning cover?",
    answer: "We clean offices, shops, and restaurants, including floors, restrooms, trash, kitchens, and workspaces.",
  },
  {
    id: 2,
    question: "2. Are your business cleaning services reliable?",
    answer: "Yes, our trained team delivers consistent, professional cleaning every time.",
  },
  {
    id: 3,
    question: "3. Can services be customized for my business?",
    answer: "Absolutely! We tailor cleaning plans to your schedule and business needs.",
  },
 
  {
    id: 4,
    question: "4. Which areas do you serve?",
    answer: "We provide commercial cleaning in Chestermere, Calgary, Airdrie, and Cochrane.",
  },
];
  return (
    <main className="min-h-screen bg-white">
   
      <CommercialHero />

    
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <ServiceSidebar  />
          </aside>

          {/* Right Side: Scrollable Content */}
          <article className="lg:col-span-2">
            <CommercialCleaningContent />
          </article>
          
        </div>
      </section>
      <AreasServed/>
      <CommonFAQ faqs={commercialFaqs} />
      <TestimonialsSection/>
      <CommercialCTA/>
    </main>
  );
};

export default page;