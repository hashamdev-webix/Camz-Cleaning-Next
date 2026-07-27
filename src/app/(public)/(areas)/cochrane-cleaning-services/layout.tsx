import type { ReactNode } from "react";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Services in Cochrane for Homes & Businesses",
  description: "Get reliable residential and commercial cleaning in Cochrane with flexible scheduling and detailed service tailored to your property.",
  path: "/cochrane-cleaning-services/",
});

export default function CochraneCleaningLayout({ children }: { children: ReactNode }) {
  return <><PageJsonLd path="/cochrane-cleaning-services/" />{children}</>;
}
