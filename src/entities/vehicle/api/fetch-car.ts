
import { VehicleType } from '@/src/entities/filters';
import { clientCars, getCars, getNormalizedParams } from "../../../shared/api";
import { getCarModelsById } from "../../../shared/api/cars";
import {
  FilterParams,
  Make,
  MakeModelById,
  parseModels,
} from "../../../shared/model";
import { AllParams } from "../../../shared/utils/params";
import { CarFetchPayload, CarFetchPayloadKeys } from "../model/payloads";
import { fetchImageFileNames, getIdToFileNameObject } from "./image";

function getCarPayload(params: AllParams): CarFetchPayload {
  let carPayload;
  if (params.make) {
    const makeModels = {
      [params.make]: params.model ? [params.model] : [],
    };
    const makeModelsStr = JSON.stringify(makeModels);
    carPayload = {
      ...params,
      makeModels: makeModelsStr,
    };
  } else {
    carPayload = params;
  }

  let filteredPayload = {} as CarFetchPayload;
  for (const key in carPayload) {
    if (CarFetchPayloadKeys.includes(key)) {
      filteredPayload[key] = carPayload[key];
    }
  }
  const normalized = getNormalizedParams(filteredPayload);
  console.log("🚀 ~ getCarPayload ~ normalized:", normalized);

  return normalized;
}

export async function getCarResults(params: AllParams) {
  console.log("🚀 ~ getCarResults ~ params:", params);

  const topVehicles = {
      title: "Top offers",
      data: [] as Car[],
    },
    nonTopVehicles = {
      title: "Main offers",
      data: [] as Car[],
    };
  const carPayload = getCarPayload(params);
  const carPayloadStr = new URLSearchParams(
    carPayload as Record<string, string>
  ).toString();

  // const type = normalizedParams.type;
  // // Right Now no idea what the types are
  // // Cars, cars, car all give zero results, wtf
  // delete normalizedParams.type;
  try {
    // TODO optimize such that next page does not fetch the same data
    // const carResults: Record<number, Car[]> = (
    //   await getCars("api/cars/fetch", {
    //     params: carPayload,
    //   })
    // )?.data;
    const carResults = await getCars(`/api/cars/fetch?${carPayloadStr}`, {
      cache: "no-store",
    });
    const pageCount = Object.keys(carResults).length;
    // if page is greater or equal (starts with 0) than pageCount, return first page
    const currentPage = params.page >= pageCount ? 0 : params.page;
    console.log("🚀 ~ getCarResults ~ currentPage:", currentPage);
    const carResultsForPage = carResults[currentPage];
    console.log("🚀 ~ getCarResults ~ carResultsForPage:", carResultsForPage);
    const offerCount = Object.values(carResults).reduce(
      (acc, curr) => acc + curr.length,
      0
    );
    for (const carResult of carResultsForPage) {
      if (carResult.istop) {
        topVehicles.data.push(carResult);
      } else {
        nonTopVehicles.data.push(carResult);
      }
    }
    const imageFileNames = await getIdToFileNameObject(carResultsForPage, VehicleType.Car);
    return {
      topVehicles,
      nonTopVehicles,
      offerCount,
      pageCount,
      imageFileNames,
    };
  } catch (e) {
    console.error("🚀 ~ getCarResults ~ e", e);
    return {
      topVehicles,
      nonTopVehicles,
      offerCount: 0,
      pageCount: 0,
      imageFileNames: [],
    };
  }
}

const MODELS_PATH = "/api/car_models";
const TYPES_PATH = "/api/car_types/";

export async function fetchCarModels() {
  const promises = [getCars(MODELS_PATH), getCars(TYPES_PATH)];
  const [models, types] = await Promise.all(promises);
  const carModelsById = getCarModelsById(models);

  return { models, types, carModelsById };
}
