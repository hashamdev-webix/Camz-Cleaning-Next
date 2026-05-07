
import ServiceSidebar from '@/components/common/ServiceSidebar';
import AreasServed from '@/components/home/AreasServed';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ResidentialCleaningContent from '@/components/residential/ResidentialCleaningContent';
import ResidentialHero from '@/components/residential/ResidentialHero';
import CommonFAQ from '@/components/common/CommonFAQ';
import ResidentialCTA from '@/components/residential/ResidentialCTA';

const page = () => {

    const residentialFaqs = [
  {
    id: 1,
    question: "1. What is included in Camz Cleaning’s Residential Cleaning Service?",
    answer: "Our service covers bedrooms, bathrooms, kitchens, living areas, carpets, and upholstery, ensuring your home is spotless, fresh, and hygienic.",
  },
  {
    id: 2,
    question: "2. Can I schedule regular home cleaning in Chestermere?",
    answer: "Yes! We offer weekly, bi-weekly, or monthly cleaning to keep your home consistently clean and stress-free.",
  },
  {
    id: 3,
    question: "3. Are the cleaners trained and trustworthy?",
    answer: "Absolutely. Our certified and experienced cleaners use safe, eco-friendly products and follow strict standards to ensure quality service.",
  },
 
  {
    id: 4,
    question: "4. Do you provide specialized cleaning like steam or deep cleaning?",
    answer: "Yes, we offer professional steam cleaning, deep kitchen and bathroom cleaning, and carpet cleaning to handle even tough dirt and stains.",
  },
];
  return (
    <main className="min-h-screen bg-white">

      <ResidentialHero/>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
   
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
       
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <ServiceSidebar  />
          </aside>

          <article className="lg:col-span-2">
            <ResidentialCleaningContent />
          </article>
          
        </div>
      </section>

      {/* Example of a Next Section to test the scroll-away effect */}
      <AreasServed/>
      <CommonFAQ faqs={residentialFaqs} />
      <TestimonialsSection/>
      <ResidentialCTA/>
    </main>
  );
};

export default page;