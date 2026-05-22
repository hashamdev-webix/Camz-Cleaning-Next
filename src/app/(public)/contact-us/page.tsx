import ContactHero from '@/components/contact/ContactHero'
import ContactSection from '@/components/contact/ContactSection'
import FAQSection from '@/components/contact/FaqSection'
import MapSection from '@/components/contact/MapSection'
import React from 'react'

export default function page() {
  return (
    <div><ContactHero/>
    <ContactSection/>
    <FAQSection/>
    <MapSection/>
    </div>
  )
}
