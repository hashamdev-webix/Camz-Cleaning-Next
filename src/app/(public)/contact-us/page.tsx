import ContactHero from '@/components/contact/ContactHero'
import ContactSection from '@/components/contact/ContactSection'
import FAQSection from '@/components/contact/FaqSection'
import MapSection from '@/components/contact/MapSection'
import React from 'react'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us | Camz Cleaning Calgary",
  description:
    "Contact Camz Cleaning for a free quote. Call +1 587-837-1977 or email info@camzcleaning.com to book home, office, vehicle, or seasonal cleaning in Calgary.",
  path: "/contact-us/",
})

export default function page() {
  return (
    <div><ContactHero/>
    <ContactSection/>
    <FAQSection/>
    <MapSection/>
    </div>
  )
}
