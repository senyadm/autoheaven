import { euCountries, euCountriesCities } from "../model/countries-cities";

const countryNames = euCountries.map((country) => country.name.toLowerCase());

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
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
  // console.log("🚀 ~ isValidCity ~ cities:", cities);
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
  console.log("🚀 ~ [_, arg1, arg2, arg3, ...rest]:", [
    _,
    arg1,
    arg2,
    arg3,
    ...rest,
  ]);
  const isURLBrowseVehicles =
    pathname.includes("cars") ||
    pathname.includes("trucks") ||
    pathname.includes("buses") ||
    pathname.includes("motorcycles");
  if (isURLBrowseVehicles) {
    const locationURL = getLocationRedirectURL(arg3, arg2);
    const url = ["", arg1, country, city, ...rest].join("/").toLowerCase();
    console.log("🚀 ~ getNewLocationURL ~ url:", url);
    return url + (searchParams ? "?" + searchParams : "");
  } else {
    return pathname + searchParams ? "?" + searchParams : "";
  }
}
