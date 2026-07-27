import type { ReactNode } from "react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Contact Camz Cleaning | Calgary Cleaning Services",
  description: "Contact Camz Cleaning for residential, commercial, vehicle or seasonal cleaning in Calgary and surrounding communities. Call or send a request.",
  path: "/contact-us/",
});

export default function ContactUsLayout({ children }: { children: ReactNode }) {
  return children;
}
