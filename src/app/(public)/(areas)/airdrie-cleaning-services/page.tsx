import AirdrieCleaningServices from '@/components/airdrie/AirdrieCleaningServices'

import ProfessionalServicesGrid from "@/components/airdrie/ProfessionalServicesGrid"
import AreaCTA from '@/components/common/AreaCTA'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import AreasServed from '@/components/airdrie/AreaServed'

import CommonFAQ from '@/components/common/CommonFAQ'


export default function page() {
  const faqData = [
  {
    id: 1,
    question: "1. What areas do you provide fireplace and furnace cleaning in?",
    answer: "We serve Airdrie, Cochrane, Calgary, and Chestermere, delivering professional cleaning, inspections, and maintenance for safe, efficient homes.",
  },
  {
    id: 2,
    question: "2. What services are included in fireplace and furnace cleaning?",
    answer: "Our services include fireplace cleaning & inspection, furnace cleaning & maintenance, vent cleaning, and efficiency checks, with honest pricing.",
  },
  {
    id: 3,
    question: "3. How often should I have my fireplace and furnace cleaned?",
    answer: "For safety and efficiency, we recommend a professional cleaning at least once a year, or more frequently for heavy-use homes.",
  },
 
  {
    id: 4,
    question: "4. How much does fireplace and furnace cleaning cost?",
    answer: "Costs vary depending on the service and home size. We provide transparent, honest pricing and a detailed cost breakdown before starting.",
  },
];
  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/wp-admin/uploads/vehicle.webp" 
        title={
          <>
           Trusted Cleaning Services in Airdrie for <br /> Homes & Offices
          </>
        }
      />
     <AirdrieCleaningServices/>
      <ProfessionalServicesGrid/>
     <AreasServed/>
     <CommonFAQ faqs={faqData}/>
      <TestimonialsSection/>
      <AreaCTA/>
    </div>
  )
}
