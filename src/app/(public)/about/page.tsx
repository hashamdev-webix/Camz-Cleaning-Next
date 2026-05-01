import AboutContent from '@/components/about/AboutContent'
import AboutHero from '@/components/about/AboutHero'
import AboutSection from '@/components/about/AboutSection'
import CallToAction from '@/components/about/CallToAction'
import StatsSection from '@/components/about/StatsSection'

import React from 'react'

export default function page() {
  return (
    <div>
      <AboutHero/>
      <AboutSection/>
      <StatsSection/>
      <AboutContent/>
      <CallToAction/>
    </div>
  )
}
