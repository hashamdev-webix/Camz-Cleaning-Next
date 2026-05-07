
import AreaCTA from '@/components/common/AreaCTA'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ChestermereCleaningServices from '@/components/chestermere/ChestermereCleaningServices'
import ProfessionalServicesGrid from '@/components/chestermere/ProfessionalServicesGrid'
import AreasServed from '@/components/chestermere/AreasServed'

import CommonFAQ from '@/components/common/CommonFAQ'
export default function page() {

  const faqData = [
  {
    id: 1,
    question: "1. Which areas does Camz Cleaning serve?",
    answer: "We proudly provide professional cleaning services in Cochrane, Calgary, Airdrie, and Chestermere, covering homes, offices, and vehicles with reliable and thorough solutions.",
  },
  {
    id: 2,
    question: "2. What types of cleaning services are available in each area?",
    answer: "Our services include residential cleaning, commercial cleaning, deep kitchen and bathroom cleaning, steam carpet cleaning, and vehicle detailing, tailored to the unique needs of each community.",
  },
  {
    id: 3,
    question: "3. Can I book cleaning services for my home or office in Airdrie or Calgary?",
    answer: "Absolutely! Clients in Airdrie and Calgary trust Camz Cleaning for professional house cleaning services, commercial office cleaning, and specialized steam cleaning services at convenient times.",
  },
 
  {
    id: 4,
    question: "4. Are the cleaning services consistent across all areas?",
    answer: "Yes, we provide flexible scheduling options, including weekly, bi-weekly, one-time, and after-hours cleaning services to suit your convenience.",
  },
];
  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/p4.webp" 
        title={
          <>
         Professional Chestermere Cleaning <br /> Services Near You
          </>
        }
      />
     <ChestermereCleaningServices/>
      <ProfessionalServicesGrid/>
     <AreasServed/>
   <CommonFAQ faqs={faqData}/>
    <TestimonialsSection/>
    <AreaCTA/>
    </div>
  )
}
