
import AreaCTA from '@/components/common/AreaCTA'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ChestermereCleaningServices from '@/components/chestermere/ChestermereCleaningServices'
import ProfessionalServicesGrid from '@/components/chestermere/ProfessionalServicesGrid'
import AreasServed from '@/components/chestermere/AreasServed'
import FAQSection from '@/components/chestermere/FAQSection'
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
