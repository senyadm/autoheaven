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

  const [cCity, cCountry] = [city, country].map((c) =>
    capitalizeFirstLetter(c)
  );
  const cities = euCountriesCities[cCountry];
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
