import type { ReactNode } from "react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Seasonal Property Cleaning & Care in Calgary",
  description: "Get dependable seasonal property and vacation-rental cleaning & care across Calgary, Airdrie, Cochrane and Chestermere. Request your service today.",
  path: "/seasonal-property-service/",
});

export default function SeasonalPropertyLayout({ children }: { children: ReactNode }) {
  return children;
}
