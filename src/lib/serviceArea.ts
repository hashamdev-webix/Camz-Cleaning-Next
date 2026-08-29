export const SERVICE_CITIES = [
  "Calgary",
  "Airdrie",
  "Cochrane",
  "Chestermere",
] as const;

export const SERVICE_AREA_LABEL =
  "Calgary, Airdrie, Cochrane and Chestermere, Alberta";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function isSupportedAddress(address: string) {
  const value = normalize(address);
  if (!value) return false;

  return SERVICE_CITIES.some((city) =>
    value.includes(city.toLowerCase()),
  );
}

export function isSupportedCoordinates(lat: number, lng: number) {
  // Broad Calgary-region box covering the four advertised service cities.
  return lat >= 50.78 && lat <= 51.36 && lng >= -114.58 && lng <= -113.68;
}
