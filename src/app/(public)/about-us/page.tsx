import AboutContent from '@/components/about/AboutContent'
import AboutHero from '@/components/about/AboutHero'
import AboutSection from '@/components/about/AboutSection'
import CallToAction from '@/components/about/CallToAction'
import StatsSection from '@/components/about/StatsSection'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Camz Cleaning Calgary",
  description:
    "Learn about Camz Cleaning, a Calgary cleaning company focused on reliable, detail-driven residential and commercial cleaning and customer satisfaction.",
  path: "/about-us/",
})

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
