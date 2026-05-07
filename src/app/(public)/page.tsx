import CommonFAQ from '@/components/common/CommonFAQ'
import AboutSection from '@/components/home/About'
import AreasServed from '@/components/home/AreasServed'

import FinalCTASection from '@/components/home/FinalCTASection'
import Hero from '@/components/home/Hero'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import RecentProjects from '@/components/home/RecentProjects'
import Services from '@/components/home/Services'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import VideoCTASection from '@/components/home/VideoCTASection'
import React from 'react'

export default function Home() {

  const commercialFaqs = [
  {
    id: 1,
    question: "1. What cleaning services does CamzCleaning offer?",
    answer: "CamzCleaning provides professional cleaning services for homes and offices, including deep cleaning, carpet and steam cleaning, window cleaning, floor care, and seasonal property maintenance.",
  },
  {
    id: 2,
    question: "2. Do you offer residential and commercial cleaning?",
    answer: "Yes, CamzCleaning offers both residential and commercial cleaning services. Our team ensures clean, hygienic, and well-maintained spaces for homes, offices, and business properties.",
  },
  {
    id: 3,
    question: "3. How often should I schedule professional cleaning?",
    answer: "The frequency depends on your needs. Many homeowners choose weekly or monthly cleaning, while businesses often require regular office cleaning to maintain a healthy environment.",
  },
  {
    id: 5,
    question: "4. Do you offer move-in and move-out cleaning?",
    answer: "Yes, Camz Cleaning provides move-in and move-out cleaning services in Calgary, Airdrie, Cochrane and Chestermere for tenants, landlords, property managers, and homeowners. This service helps prepare a property before moving in or after moving out, making the space cleaner and more presentable.",
  },
  {
    id: 4,
    question: "5. Why should I choose CamzCleaning for cleaning services?",
    answer: "CamzCleaning focuses on reliable service, attention to detail, and professional equipment to deliver spotless results and a healthier living or working space.",
  },
];
  return (
    <div>
      <Hero />
      {/* <img src="/banner-shape.webp" alt="" /> */}
      <Services/>
      <AboutSection/>
      <HowItWorksSection/>
      <VideoCTASection/>
      <RecentProjects/>
      <AreasServed/>
      <CommonFAQ faqs={commercialFaqs}/>
      <TestimonialsSection/>
      <FinalCTASection/>
    </div>
  )
}
