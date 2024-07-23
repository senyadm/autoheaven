import { Locale } from "../../app/i18n.config";
import { getLocationText } from "../../entities/location";
import {
  VehicleTypePage,
  vehicleTypePages,
  pageByVehicleType,
} from "../../entities/vehicle";
import { vehicleTypeByPage } from "../../entities/vehicle/model/vehicle";
import { defaultFilters, defaultParams } from "../api";
import { FilterParams, FilterWithLocation, VehicleType } from "../model/params";
import { capitalizeFirstLetter } from "./text";

export interface PageWithLocationParams {
  country?: string;
  city?: string;
  vehicleType?: VehicleType;
  make?: string;
  model?: string;
  isListHeaven?: boolean;
}

export interface FullPageParams extends PageWithLocationParams {
  lang: Locale;
}

export type AllParams = FullPageParams & FilterParams;

const paramsArray = ["vehicleType", "make", "model", "country", "city"];
// italy/rome/cars/audi/a4 => { country: 'italy', city: 'rome', vehicleType: 'cars', make: 'audi', model: 'a4' }
// italy/rome/cars/listheaven/audi/a4 => { isListHeaven: true, country: 'italy', city: 'rome', vehicleType: 'cars', make: 'audi', model: 'a4' }

// cars/audi/a4 => { vehicleType: 'cars', make: 'audi', model: 'a4' }
// cars => { vehicleType: 'cars' }
// null => {}
// italy/rome => { country: 'italy', city: 'rome' }

const paramOrder: (keyof PageWithLocationParams)[] = [
  "vehicleType",
  "make",
  "model",
];

export function parsePageParams(params: string[]) {
  let res: PageWithLocationParams = {};
  if (!params) return res;
  let vehicleTypeFound = false;
  let paramsOrderIndex = 0;
  for (let i = 0; i < params.length; i++) {
    const p = decodeURIComponent(params[i]);
    if (p === "listheaven") {
      res.isListHeaven = true;
      continue;
    }
    if (!p) break;
    const isSlugVehicleType = vehicleTypePages.includes(p as VehicleTypePage);

    if (vehicleTypeFound || isSlugVehicleType) {
      const paramKey = paramOrder[paramsOrderIndex++];
      if (!paramKey) return res;
      if (paramKey === "vehicleType") {
        res[paramKey] = vehicleTypeByPage[p];
      } else {
        res[paramKey] = p;
      }
      vehicleTypeFound = true;
      // if (params[i + 1]) res.make = params[i + 1];
      // if (params[i + 2]) res.model = params[i + 2];
    } else {
      // if the word is not a vehicle type
      if (i === 0) {
        res.country = p;
      } else if (i === 1) {
        res.city = p;
      }
    }
  }

  return res;
}

export function getPathnameFromParams(params: PageWithLocationParams) {
  let pathname = "";
  if (params.country) pathname += `/${params.country}`;
  if (params.city) pathname += `/${params.city}`;
  if (params.isListHeaven) pathname += `/listheaven`;
  if (params.vehicleType)
    pathname += `/${pageByVehicleType[params.vehicleType as string]}`;
  if (params.make) pathname += `/${params.make}`;
  if (params.model) pathname += `/${params.model}`;
  return pathname;
}

export function getUrlSearchParamsFromFilters(filters: FilterWithLocation) {
  const searchParams = new URLSearchParams();
  if (filters) {
    Object.keys(filters).forEach((key) => {
      if (!paramsArray.includes(key) && filters[key]) {
        searchParams.set(key, filters[key]);
      }
    });
  }
  return searchParams;
}

function excludeDefaults(filters: FilterWithLocation) {
  const res = { ...filters };
  Object.keys(defaultFilters).forEach((key) => {
    if (res[key] === defaultFilters[key]) {
      delete res[key];
    }
  });
  return res;
}

const defaultFiltersKeys = Object.keys(defaultParams);

function excludeNonFilterKeys(filters: FilterWithLocation) {
  // TODO: remove all non-filter keys
  const res = { ...filters };
  Object.keys(res).forEach((key) => {
    if (!defaultFiltersKeys.includes(key)) {
      delete res[key];
    }
  });
  return res;
}

export interface SetFiltersOpts{
  isReset?: boolean;
  useSearchParams?: boolean;
}

export function getUriFromFilters(filters: FilterWithLocation, opts?: SetFiltersOpts) {
  if (opts?.isReset) {
    delete filters.make;
    delete filters.model;
    return getPathnameFromParams({ ...filters } as PageWithLocationParams);
  }
  const pathname = getPathnameFromParams(filters as PageWithLocationParams);
  const filtersWithoutNonFilterKeys = excludeNonFilterKeys(filters);
  const filtersWithoutDefaults = excludeDefaults(filtersWithoutNonFilterKeys);
  const searchParams = getUrlSearchParamsFromFilters(filtersWithoutDefaults);
  if (searchParams) {
    return `${pathname}?${searchParams.toString()}`;
  }
  return pathname;
}

// Toyota Corolla cars in Italy, Rome

export function getMetadataFromParsedParams(params: PageWithLocationParams) {
  const { vehicleType, make, model, country, city, isListHeaven } = params;
  let title = "";
  if (isListHeaven) {
    title = "List Heaven";
  } else if (vehicleType) {
    if (make) title += ` ${make}`;
    if (model) title += ` ${model}`;
    if (vehicleType) title += ` ${pageByVehicleType[vehicleType]}`;
    title += ` in ${getLocationText(country, city)}`;
  } else {
    title = `Browse vehicles in ${getLocationText(country, city)}`;
  }
  title = capitalizeFirstLetter(title);
  return {
    title,
  };
}

export function getMetadataFromRawParams(params: {
  lang: Locale;
  slug: string[];
}) {
  const parsed = parsePageParams(params.slug);
  return getMetadataFromParsedParams(parsed);
}
