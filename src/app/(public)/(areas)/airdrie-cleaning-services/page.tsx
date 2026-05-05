import AirdrieCleaningServices from '@/components/airdrie/AirdrieCleaningServices'

import ProfessionalServicesGrid from "@/components/airdrie/ProfessionalServicesGrid"
import AreaCTA from '@/components/common/AreaCTA'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import AreasServed from '@/components/airdrie/AreaServed'
import FAQSection from '@/components/airdrie/FaqSection'


export default function page() {
  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/p4.webp" 
        title={
          <>
           Trusted Cleaning Services in Airdrie for <br /> Homes & Offices
          </>
        }
      />
     <AirdrieCleaningServices/>
      <ProfessionalServicesGrid/>
     <AreasServed/>
<FAQSection/>
      <TestimonialsSection/>
      <AreaCTA/>
    </div>
  )
}
