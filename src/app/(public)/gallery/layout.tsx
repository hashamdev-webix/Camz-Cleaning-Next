import type { ReactNode } from "react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Cleaning Project Gallery | Camz Cleaning",
  description: "View residential, commercial, vehicle and seasonal cleaning projects completed by Camz Cleaning across Calgary and nearby communities.",
  path: "/gallery/",
});

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
