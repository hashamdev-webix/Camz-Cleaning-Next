
import ServiceSidebar from '@/components/common/ServiceSidebar';
import AreasServed from '@/components/home/AreasServed';

import TestimonialsSection from '@/components/home/TestimonialsSection';

import CommonHeroSection from '@/components/common/CommonHeroSection';
import VehicleCleaningContent from '@/components/vehicle/VehicleCleaningContent';
import CommonFAQ from '@/components/common/CommonFAQ';
import VehicleCTA from '@/components/vehicle/VehicleCTA';

const page = () => {

    const vehicleFaqs = [
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
            <ServiceSidebar  />
          </aside>

  
          <article className="lg:col-span-2">
            <VehicleCleaningContent/>
          </article>
          
        </div>
      </section>

  
      <AreasServed/>
    <CommonFAQ faqs={vehicleFaqs}/>
      <TestimonialsSection/>
      <VehicleCTA/>
    </main>
  );
};

export default page;