import type { ReactNode } from "react";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "About Camz Cleaning | Cleaning Company",
  description: "Learn about Camz Cleaning, our local team, service standards and approach to reliable residential and commercial cleaning in the Calgary area.",
  path: "/about-us/",
});

export default function AboutUsLayout({ children }: { children: ReactNode }) {
  return <><PageJsonLd path="/about-us/" />{children}</>;
}
