import { Filter, FilterParams, VehicleType } from "../model/params";
import { Make, MakeModelById } from "../model/models";
import page from "../../../app/[lang]/[[...slug]]/page";

export const defaultFilters: Filter = {
  price_min: 0,
  price_max: 1000000,
  mileage_min: 0,
  mileage_max: 500000,
  year_min: 1975,
  year_max: 2023,
};

export const defaultParams: FilterParams = {
  max_results: 100000,
  price_min: 0,
  price_max: 1000000,
  mileage_min: 0,
  mileage_max: 500000,
  year_min: 1975,
  year_max: 2023,
  page: 0,
  make: "",
  model: "",
  make_id: null,
  makeModels: "",
  type: "",
  type_id: "",
  vehicleType: VehicleType.Car,
  fromDealer: false,
  accidentfree: false,
  sortBy: "newestFirst",
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
    sortBy: defaultParams.sortBy,
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

export const getCarModelsById = (carModels: Record<string, Make>) => {
  return Object.entries(carModels).reduce((makesAcc, [makeName, make]) => {
    const models = make.models.reduce(
      (modelsAcc, m) => ({
        ...modelsAcc,
        [m.id]: {
          name: m.name,
        },
      }),
      {} as Record<number, { name: string }>
    );

    makesAcc[make.id] = {
      name: makeName,
      models: models,
    };
    return makesAcc;
  }, {} as MakeModelById);
};

export const vehicleTypeToApiKeyword = {
  [VehicleType.Car]: "",
  [VehicleType.Moto]: "/moto",
  [VehicleType.Truck]: "/truck",
  [VehicleType.Bus]: "/bus",
};