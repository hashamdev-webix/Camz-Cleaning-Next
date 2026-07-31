import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Date of the last content/metadata update to the public pages.
const LAST_MODIFIED = new Date("2026-07-31");

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const entries: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services/", changeFrequency: "monthly", priority: 0.9 },
  {
    path: "/commercial-cleaning-services/",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/residential-cleaning-services/",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/vehicle-cleaning-service/",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/seasonal-property-service/",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calgary-cleaning-services/",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/airdrie-cleaning-services/",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/chestermere-cleaning-services/",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/cochrane-cleaning-services/",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/blogs/", changeFrequency: "weekly", priority: 0.7 },
  { path: "/gallery/", changeFrequency: "weekly", priority: 0.6 },
  { path: "/about-us/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact-us/", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
