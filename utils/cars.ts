import { Filter, FilterParams } from "../interfaces/cars/cars";

export const defaultFilters: Filter = {
  price_min: 0,
  price_max: 1000000,
  mileage_min: 0,
  mileage_max: 500000,
  year_min: 1975,
  year_max: 2023,
  type: "cars",
  body_type: "sedan",
};

export const defaultParams: FilterParams = {
  max_results: 100000,
  price_min: 0,
  price_max: 1000000,
  mileage_min: 0,
  mileage_max: 500000,
  year_min: 1975,
  year_max: 2023,
  type: "cars",
  body_type: "sedan",
  page: 0,
};

/**
 * Normalizes filter parameters by filling in missing values with defaults.
 * @param {Filter | null | undefined} params - The filter parameters to normalize.
 * @returns {FilterParams} The normalized filter parameters.
 */
export function getNormalizedParams(
  params: Filter | null | undefined
): FilterParams {
  const necessaryParams = {
    max_results: defaultParams.max_results,
    page: defaultParams.page,
  };
  if (!params) return necessaryParams;
  const normalized = Object.entries(params).reduce((acc, [key, value]) => {
    let finalValue = value;
    if (value === null || value === undefined || value === "") {
      return acc;
    }
    return { ...acc, [key]: finalValue };
  }, {});
  // normalized can override necessaryParams due to how spread operator in this syntax works
  return { ...necessaryParams, ...normalized };
}
