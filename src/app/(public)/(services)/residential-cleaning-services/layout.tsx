import type { ReactNode } from "react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Professional Residential Cleaning Services in Calgary",
  description: "Book reliable residential cleaning in Calgary, Airdrie, Cochrane or Chestermere for regular, deep and move-in or move-out cleaning needs.",
  path: "/residential-cleaning-services/",
});

export default function ResidentialCleaningLayout({ children }: { children: ReactNode }) {
  return children;
}
