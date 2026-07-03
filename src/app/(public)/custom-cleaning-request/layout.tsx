import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Cleaning Request | Camz Cleaning",
  description:
    "Build a room-by-room cleaning checklist and request a custom quote from Camz Cleaning.",
};

export default function CustomCleaningRequestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
