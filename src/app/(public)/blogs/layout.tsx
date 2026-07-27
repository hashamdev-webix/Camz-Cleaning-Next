import type { ReactNode } from "react";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Tips & Guides | Camz Cleaning Blog",
  description: "Read practical cleaning tips, checklists and service guides for homeowners, renters and businesses in Calgary and nearby communities.",
  path: "/blogs/",
});

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return <><PageJsonLd path="/blogs/" />{children}</>;
}
