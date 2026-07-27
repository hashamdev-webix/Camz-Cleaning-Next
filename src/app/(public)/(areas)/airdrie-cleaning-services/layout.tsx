import type { ReactNode } from "react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Services in Airdrie for Homes & Businesses",
  description: "Book residential and commercial cleaning services in Airdrie with a dependable team serving homes, offices and local businesses.",
  path: "/airdrie-cleaning-services/",
});

export default function AirdrieCleaningLayout({ children }: { children: ReactNode }) {
  return children;
}
