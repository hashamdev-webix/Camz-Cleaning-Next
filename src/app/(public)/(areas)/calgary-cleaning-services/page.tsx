import AreasServed from '@/components/calgary/AreasServed'
import CalgaryCleaningServices from '@/components/calgary/CalgaryCleaningServices'
import FAQSection from '@/components/calgary/FaqSection'
import ProfessionalServicesGrid from '@/components/calgary/ProfessionalServicesGrid'
import AreaCTA from '@/components/common/AreaCTA'
import CommonHeroSection from '@/components/common/CommonHeroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import React from 'react'

export default function page() {
  return (
    <div>
          <CommonHeroSection 
        backgroundImage="/p4.webp" 
        title={
          <>
            Reliable Cleaning Services Calgary for <br /> Homes & Offices
          </>
        }
      />
      <CalgaryCleaningServices/>
      <ProfessionalServicesGrid/>
      <AreasServed/>
      <FAQSection/>
      <TestimonialsSection/>
      <AreaCTA/>
    </div>
  )
}
