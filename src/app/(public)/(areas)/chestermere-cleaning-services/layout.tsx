import type { ReactNode } from "react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Services in Chestermere for Home & Businesses",
  description: "Book professional home and commercial cleaning in Chestermere with flexible service options and a dependable local cleaning team.",
  path: "/chestermere-cleaning-services/",
});

export default function ChestermereCleaningLayout({ children }: { children: ReactNode }) {
  return children;
}
