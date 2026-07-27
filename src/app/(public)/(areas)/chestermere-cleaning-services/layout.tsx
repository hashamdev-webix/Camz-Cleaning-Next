import type { ReactNode } from "react";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Services in Chestermere for Home & Businesses",
  description: "Book professional home and commercial cleaning in Chestermere with flexible service options and a dependable local cleaning team.",
  path: "/chestermere-cleaning-services/",
});

export default function ChestermereCleaningLayout({ children }: { children: ReactNode }) {
  return <><PageJsonLd path="/chestermere-cleaning-services/" />{children}</>;
}
