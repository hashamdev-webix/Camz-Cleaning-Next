import type { ReactNode } from "react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Services in Calgary | Camz Cleaning",
  description: "Explore residential, commercial, vehicle and seasonal property cleaning services available across Calgary and nearby communities.",
  path: "/services/",
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
