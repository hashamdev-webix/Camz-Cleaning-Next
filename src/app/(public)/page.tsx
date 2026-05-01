import AboutSection from '@/components/home/About'
import AreasServed from '@/components/home/AreasServed'
import FAQSection from '@/components/home/FAQSection'
import FinalCTASection from '@/components/home/FinalCTASection'
import Hero from '@/components/home/Hero'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import RecentProjects from '@/components/home/RecentProjects'
import Services from '@/components/home/Services'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import VideoCTASection from '@/components/home/VideoCTASection'
import React from 'react'

export default function Home() {
  return (
    <div>
      <Hero />
      <Services/>
      <AboutSection/>
      <HowItWorksSection/>
      <VideoCTASection/>
      <RecentProjects/>
      <AreasServed/>
      <FAQSection/>
      <TestimonialsSection/>
      <FinalCTASection/>
    </div>
  )
}
