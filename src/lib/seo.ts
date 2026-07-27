import type { Metadata } from "next";

const siteUrl = "https://camzcleaning.com";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function pageSeo({ title, description, path, noIndex = false }: SeoOptions): Metadata {
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Camz Cleaning",
      type: "website",
    },
  };
}
