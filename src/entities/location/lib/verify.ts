import { capitalizeFirstLetter } from "../../../shared/utils/text";
import { euCountries, euCountriesCities } from "../model/countries-cities";
import { Location } from "../model/interfaces";

const countryNames = euCountries.map((country) => country.name.toLowerCase());

// country in lowercase
export function isValidCountry(country: string | undefined) {
  if (!country) return false;
  const lCountry = country?.toLowerCase();

  if (country === "all") return true;

  return countryNames.includes(lCountry);
}

// country and city in lowercase
export function isValidCity(
  city: string | undefined,
  country: string | undefined
) {
  if (!city || !country) return false;
  const lCountry = country.toLowerCase();
  if (city === "all") return true;

  const cCity = capitalizeFirstLetter(city);
  const countryIndex = countryNames.findIndex((c) => c === lCountry);
  const countryCode = euCountries[countryIndex]?.code;
  console.log("🚀 ~ isValidCity ~ countryCode:", countryCode);
  if (!countryCode) return false;
  const cities = euCountriesCities[countryCode];
  if (!cities) return false;

  return cities.find((c) => c === cCity);
}

export function getValidLocation(
  city: string | undefined,
  country: string | undefined
) {
  const lCountry = country?.toLowerCase();
  const lCity = city?.toLowerCase();
  if (!isValidCountry(country)) return ["all", "all"];
  if (!isValidCity(city, country)) return [lCountry, "all"];
  return [lCity, lCountry];
}

export function getLocationRedirectURL(
  city: string | undefined,
  country: string | undefined
) {
  const [vCity, vCountry] = getValidLocation(city, country);
  if (vCountry === "all") {
    return "";
  } else if (vCity === "all") {
    return `/${vCountry}`;
  } else {
    return `/${vCountry}/${vCity}`;
  }
}

// assume locale is there and is correct
export function getNewLocationURL(
  pathname: string,
  searchParams: string,
  city: string,
  country: string
): string {
  // null, locale, country or sth else, city or sth else, ...
  // basically if we see country or city we should replace it, else insert
  const [_, arg1, arg2, arg3, ...rest] = decodeURI(pathname).split("/");
  let url;
  if (isValidCountry(arg2)) {
    if (country === "all") {
      url = ["", arg1, ...rest].join("/").toLowerCase();
    } else if (isValidCity(arg3, arg2)) {
      if (city === "all") {
        url = ["", arg1, country, ...rest].join("/").toLowerCase();
      } else {
        url = ["", arg1, country, city, ...rest].join("/").toLowerCase();
      }
    } else {
      url = ["", arg1, country, city, arg3, ...rest].join("/").toLowerCase();
    }
  } else {
    url = ["", arg1, country, city, arg2, arg3, ...rest]
      .join("/")
      .toLowerCase();
  }
  return url + (searchParams ? "?" + searchParams : "");
  // const isURLBrowseVehicles =
  //   pathname.includes("cars") ||
  //   pathname.includes("trucks") ||
  //   pathname.includes("buses") ||
  //   pathname.includes("motorcycles");
  // const isLanding = !arg2 || isValidCountry(arg2);
  // if (isURLBrowseVehicles || isLanding) {
  //   if (country === "all") {
  //     country = "";
  //     city = "";
  //   } else if (city === "all") {
  //     city = "";
  //   }
  //   const url = ["", arg1, country, city, ...rest].join("/").toLowerCase();
  //   console.log("🚀 ~ url:", url);
  //   return url + (searchParams ? "?" + searchParams : "");
  // } else {
  //   return pathname + (searchParams ? "?" + searchParams : "");
  // }
}

export function getLocationText(
  country: string | undefined,
  city: string | undefined
) {
  if (!country) return "Europe";
  const cCountry = capitalizeFirstLetter(country);
  if (!city) return cCountry;
  const cCity = capitalizeFirstLetter(city);
  return `${cCity}, ${cCountry}`;
}
export function getLocationShortText(
  country: string | undefined,
  city: string
) {
  if (!country || country === "all") return "Europe";
  if (!city || city === "all") return capitalizeFirstLetter(country);
  return capitalizeFirstLetter(city);
}

export function setCountryLS(country: string) {
  localStorage.setItem("country", country);
}
export function setCityLS(city: string) {
  localStorage.setItem("city", city);
}
export function setLocationLS({city, country}: Location) {
  setCityLS(city);
  setCountryLS(country);
}
export function getCountryLS() {
  return localStorage.getItem("country");
}
export function getCityLS() {
   return localStorage.getItem("city");
}
export function getLocationLS(): Location {
  return {country: getCountryLS() || "", city: getCityLS() || ""};
}