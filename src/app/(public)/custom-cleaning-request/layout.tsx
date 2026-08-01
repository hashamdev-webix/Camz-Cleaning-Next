import PageJsonLd from "@/components/seo/PageJsonLd";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Custom Cleaning Request | Camz Cleaning",
  description:
    "Build a room-by-room cleaning checklist and request a custom quote from Camz Cleaning.",
  path: "/custom-cleaning-request/",
});

export default function CustomCleaningRequestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <><PageJsonLd path="/custom-cleaning-request/" />{children}</>;
}
