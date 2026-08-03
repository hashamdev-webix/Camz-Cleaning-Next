import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Book a Cleaning Service in Calgary | Camz Cleaning",
  description: "Choose your cleaning service, preferred date and property details to request residential or commercial cleaning with Camz Cleaning.",
  path: "/booking/",
});

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PageJsonLd path="/booking/" />
      {children}
    </AuthProvider>
  );
}
