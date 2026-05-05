
import AreaCTA from '@/components/common/AreaCTA'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'

import CochraneCleaningServices from '@/components/cochrane/CochraneCleaningServices'
import ProfessionalServicesGrid from '@/components/cochrane/ProfessionalServicesGrid'
import AreasServed from '@/components/cochrane/AreasServed'
import FAQSection from '@/components/cochrane/FAQSection'


export default function page() {
  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/p4.webp" 
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
     <FAQSection/>
    <TestimonialsSection/>
    <AreaCTA/>
    </div>
  )
}
