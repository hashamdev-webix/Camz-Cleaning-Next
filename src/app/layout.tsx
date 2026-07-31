import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  BUSINESS,
  AREAS_SERVED,
  SOCIAL_LINKS,
} from "@/lib/site-config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Professional Cleaning Services",
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Professional Cleaning Services",
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/`,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Cleaning Services",
    description: DEFAULT_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

// No street address, opening days, or ratings are published in the codebase,
// so those fields are intentionally omitted.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  description: DEFAULT_DESCRIPTION,
  url: `${SITE_URL}/`,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: "CA",
  },
  areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
  sameAs: [...SOCIAL_LINKS],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
