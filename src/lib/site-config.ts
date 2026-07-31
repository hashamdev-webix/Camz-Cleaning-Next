export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://camzcleaning.com";

export const SITE_NAME = "Camz Cleaning";

export const DEFAULT_DESCRIPTION =
  "Camz Cleaning offers trusted residential and commercial cleaning services in Calgary. Book now for a spotless space!";

// Business NAP data. No street address is published anywhere in the codebase
// (contact page and footer only show "Calgary, AB, Canada"), so no street
// field is included here.
export const BUSINESS = {
  name: SITE_NAME,
  phone: "+1 587-837-1977",
  email: "info@camzcleaning.com",
  city: "Calgary",
  region: "AB",
  country: "Canada",
} as const;

export const AREAS_SERVED = [
  "Calgary",
  "Airdrie",
  "Chestermere",
  "Cochrane",
] as const;

export const SOCIAL_LINKS = [
  "https://www.instagram.com/camzcleaning",
  "https://x.com/camzcleaning",
  "https://web.facebook.com/Camzcleaning1",
  "https://www.linkedin.com/company/camzcleaning",
  "https://www.youtube.com/@CamzCleaning",
] as const;
