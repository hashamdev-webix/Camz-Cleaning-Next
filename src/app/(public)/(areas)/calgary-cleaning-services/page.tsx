import AreasServed from '@/components/calgary/AreasServed'
import CalgaryCleaningServices from '@/components/calgary/CalgaryCleaningServices'

import ProfessionalServicesGrid from '@/components/calgary/ProfessionalServicesGrid'
import AreaCTA from '@/components/common/AreaCTA'
import CommonFAQ from '@/components/common/CommonFAQ'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'


export default function page() {
  const faqData = [
  {
    id: 1,
    question: "1. How much do cleaning services in Calgary cost?",
    answer: "Prices depend on home size and cleaning type. We offer affordable rates with clear pricing and no hidden charges.",
  },
  {
    id: 2,
    question: "2. Do you offer house and office cleaning?",
    answer: "Yes, we provide residential and commercial cleaning services in Calgary for homes, offices, and other spaces.",
  },
  {
    id: 3,
    question: "3. Are your cleaners trained?",
    answer: "Yes, our professional cleaners in Calgary are trained, experienced, and fully insured.",
  },
 
  {
    id: 4,
    question: "4. Can I book same-day cleaning?",
    answer: "Yes, same-day cleaning may be available depending on the schedule. We also offer flexible booking options.",
  },
];
  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/wp-admin/uploads/seasonal-1.webp" 
        title={
          <>
            Reliable Cleaning Services Calgary for <br /> Homes & Offices
          </>
        }
      />
      <CalgaryCleaningServices/>
      <ProfessionalServicesGrid/>
      <AreasServed/>
      <CommonFAQ faqs={faqData}/>
      <TestimonialsSection/>
      <AreaCTA/>
    </div>
  )
}
