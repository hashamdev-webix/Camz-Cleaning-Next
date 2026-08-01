import type { ReactNode } from "react";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Our Cleaning Services | Camz Cleaning",
  description: "Explore residential, commercial, vehicle and seasonal property cleaning services available across Calgary and nearby communities.",
  path: "/services/",
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <><PageJsonLd path="/services/" />{children}</>;
}
