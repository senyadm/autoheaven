import { capitalizeFirstLetter } from "../../../shared/utils/text";
import { euCountries, euCountriesCities } from "../model/countries-cities";

const countryNames = euCountries.map((country) => country.name.toLowerCase());

// country in lowercase
export function isValidCountry(country: string) {
  if (!country) return false;
  if (country === "all") return true;
  return countryNames.includes(country);
}

// country and city in lowercase
export function isValidCity(city: string, country: string) {
  if (!city) return false;
  if (city === "all") return true;

  const cCity = capitalizeFirstLetter(city);
  const countryIndex = countryNames.findIndex((c) => c === country);
  const countryCode = euCountries[countryIndex]?.code;
  if (!countryCode) return false;
  const cities = euCountriesCities[countryCode];
  if (!cities) return false;
  return cities.find((c) => c === cCity);
}

export function getValidLocation(city, country) {
  if (!isValidCountry(country)) return ["all", "all"];
  if (!isValidCity(city, country)) return [country, "all"];
  return [city, country];
}

export function getLocationRedirectURL(city, country) {
  const [vCity, vCountry] = getValidLocation(city, country);
  return `/${vCity}/${vCountry}`;
}

// assume locale is there and is correct
export function getNewLocationURL(
  pathname: string,
  searchParams: string,
  city: string,
  country: string
): string {
  const [_, arg1, arg2, arg3, ...rest] = pathname.split("/");

  const isURLBrowseVehicles =
    pathname.includes("cars") ||
    pathname.includes("trucks") ||
    pathname.includes("buses") ||
    pathname.includes("motorcycles");
  if (isURLBrowseVehicles) {
    const url = ["", arg1, country, city, ...rest].join("/").toLowerCase();
    console.log("🚀 ~ getNewLocationURL ~ url:", url);
    return url + (searchParams ? "?" + searchParams : "");
  } else {
    return pathname + searchParams ? "?" + searchParams : "";
  }
}

export function getLocationText(country: string, city: string) {
  if (country === "all") return "Europe";
  const cCountry = capitalizeFirstLetter(country);
  if (city === "all") return cCountry;
  const cCity = capitalizeFirstLetter(city);
  return `${cCity}, ${cCountry}`;
}
export function getLocationShortText(
  country: string | undefined,
  city: string
) {
  if (country === "all" || !country) return "Europe";
  if (city === "all") return capitalizeFirstLetter(country);
  return capitalizeFirstLetter(city);
}

export function setCountryLS(country: string) {
  localStorage.setItem("country", country);
}
export function setCityLS(city: string) {
  localStorage.setItem("city", city);
}
export function getCountryLS() {
  return localStorage.getItem("country");
}
export function getCityLS() {
  return localStorage.getItem("city");
}
