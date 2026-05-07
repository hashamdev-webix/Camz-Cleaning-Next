
import AreaCTA from '@/components/common/AreaCTA'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'

import CochraneCleaningServices from '@/components/cochrane/CochraneCleaningServices'
import ProfessionalServicesGrid from '@/components/cochrane/ProfessionalServicesGrid'
import AreasServed from '@/components/cochrane/AreasServed'

import CommonFAQ from '@/components/common/CommonFAQ'


export default function page() {
  const faqData = [
  {
    id: 1,
    question: "Q1: What are the Cochrane Cleaning Services offered by Camz Cleaning?",
    answer: "Camz Cleaning provides professional Cochrane cleaning services for homes and offices, including dusting, deep kitchen and bathroom cleaning, floor polishing, and surface sanitization.",
  },
  {
    id: 2,
    question: "Q2: Why should I choose Camz Cleaning for Cochrane Cleaning Services?",
    answer: "Clients trust our Cochrane cleaning services for attention to detail, safe cleaning methods, consistency, and exceptional customer satisfaction.",
  },
  {
    id: 3,
    question: "Q3: Are your Cochrane Cleaning Services suitable for residential and commercial spaces?",
    answer: "Yes! Our services are designed for both residential and commercial properties, ensuring every space is spotless, hygienic, and well-maintained.",
  },
 
  {
    id: 4,
    question: "Q4: Do your Cochrane Cleaning Services guarantee long-term cleanliness?",
    answer: "Absolutely! We focus on thorough and professional cleaning techniques that maintain hygiene and keep your home or office fresh for the long term.",
  },
];
  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/wp-admin/uploads/seasonal-1.webp" 
        title={
          <>
          Top Cochrane Cleaning Services <br />
Residential & Commercial
          </>
        }
      />
     <CochraneCleaningServices/>
      <ProfessionalServicesGrid/>
     <AreasServed/>
     <CommonFAQ faqs={faqData}/>
    <TestimonialsSection/>
    <AreaCTA/>
    </div>
  )
}
