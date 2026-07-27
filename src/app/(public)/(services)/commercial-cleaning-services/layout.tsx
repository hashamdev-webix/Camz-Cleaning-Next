import type { ReactNode } from "react";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Commercial Cleaning & Janitorial Services in Calgary",
  description: "Keep offices, restaurants and commercial facilities clean with flexible commercial cleaning services in Calgary and surrounding communities.",
  path: "/commercial-cleaning-services/",
});

export default function CommercialCleaningLayout({ children }: { children: ReactNode }) {
  return <><PageJsonLd path="/commercial-cleaning-services/" />{children}</>;
}
