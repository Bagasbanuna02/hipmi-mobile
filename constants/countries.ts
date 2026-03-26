import { type CountryCode } from "libphonenumber-js";

/**
 * Country data for phone number input
 * Contains only country name and calling code (NO flags for maximum compatibility)
 */
export interface CountryData {
  code: CountryCode;
  name: string;
  callingCode: string;
}

/**
 * List of supported countries for phone number input
 * 
 * @description
 * This list includes major countries across different regions.
 * Countries are ordered by likelihood of use (Indonesia first as default).
 * 
 * @note
 * NO emoji flags used - only text-based country name and calling code
 * This ensures maximum compatibility across all platforms and iOS versions
 */
export const COUNTRIES: CountryData[] = [
  // Asia Pacific (Primary markets)
  { code: "ID", name: "Indonesia", callingCode: "62" },
  { code: "SG", name: "Singapore", callingCode: "65" },
  { code: "MY", name: "Malaysia", callingCode: "60" },
  { code: "AU", name: "Australia", callingCode: "61" },
  
  // Asia (Other)
  { code: "CN", name: "China", callingCode: "86" },
  { code: "JP", name: "Japan", callingCode: "81" },
  { code: "KR", name: "South Korea", callingCode: "82" },
  { code: "IN", name: "India", callingCode: "91" },
  
  // Middle East
  { code: "AE", name: "United Arab Emirates", callingCode: "971" },
  { code: "SA", name: "Saudi Arabia", callingCode: "966" },
  
  // Europe
  { code: "GB", name: "United Kingdom", callingCode: "44" },
  { code: "DE", name: "Germany", callingCode: "49" },
  { code: "FR", name: "France", callingCode: "33" },
  { code: "NL", name: "Netherlands", callingCode: "31" },
  
  // Americas
  { code: "US", name: "United States", callingCode: "1" },
];

/**
 * Default country for phone number input
 * Used when no country is selected (Indonesia by default)
 */
export const DEFAULT_COUNTRY: CountryData = COUNTRIES[0];

/**
 * Get country by calling code
 * @param callingCode - The calling code to search for (e.g., "62", "1")
 * @returns The matching country data or undefined if not found
 */
export function getCountryByCallingCode(callingCode: string): CountryData | undefined {
  return COUNTRIES.find((country) => country.callingCode === callingCode);
}

/**
 * Get country by country code (ISO 3166-1 alpha-2)
 * @param code - The country code to search for (e.g., "ID", "US")
 * @returns The matching country data or undefined if not found
 */
export function getCountryByCode(code: CountryCode): CountryData | undefined {
  return COUNTRIES.find((country) => country.code === code);
}

/**
 * Search countries by name or calling code
 * @param query - The search query (case-insensitive)
 * @returns Array of matching countries
 */
export function searchCountries(query: string): CountryData[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  return COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(normalizedQuery) ||
      country.code.toLowerCase().includes(normalizedQuery) ||
      country.callingCode.includes(normalizedQuery)
  );
}
