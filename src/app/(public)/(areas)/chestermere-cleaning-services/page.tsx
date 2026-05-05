
import AreaCTA from '@/components/common/AreaCTA'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'

import AreasServed from '@/components/cochrane/AreasServed'
import FAQSection from '@/components/cochrane/FAQSection'
import ChestermereCleaningServices from '@/components/chestermere/ChestermereCleaningServices'
import ProfessionalServicesGrid from '@/components/chestermere/ProfessionalServicesGrid'
export default function page() {
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
     <FAQSection/>
    <TestimonialsSection/>
    <AreaCTA/>
    </div>
  )
}
