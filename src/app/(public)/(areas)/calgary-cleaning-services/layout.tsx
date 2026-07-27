import type { ReactNode } from "react";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Services in Calgary for Homes & Businesses",
  description: "Choose Camz Cleaning for residential and commercial cleaning in Calgary, with flexible scheduling and detailed service for homes and workplaces.",
  path: "/calgary-cleaning-services/",
});

export default function CalgaryCleaningLayout({ children }: { children: ReactNode }) {
  return <><PageJsonLd path="/calgary-cleaning-services/" />{children}</>;
}
