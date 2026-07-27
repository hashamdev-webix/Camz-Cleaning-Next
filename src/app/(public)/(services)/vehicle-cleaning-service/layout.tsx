import type { ReactNode } from "react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Expert Vehicle Cleaning & Detailing Calgary",
  description: "Refresh your vehicle with interior and exterior cleaning, vacuuming, carpet and seat care, and detailing services in the Calgary area.",
  path: "/vehicle-cleaning-service/",
});

export default function VehicleCleaningLayout({ children }: { children: ReactNode }) {
  return children;
}
