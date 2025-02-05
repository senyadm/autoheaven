import { Instrument_Serif } from "next/font/google";
import { clientCars, getCars, getNormalizedParams } from "../../../shared/api";
import { FilterParams } from "../../../shared/model";
import { MAX_RESULTS_PER_PAGE } from "../constants/constants";
import { Moto, MotoMake, MotoType } from "../model/moto";
import { fetchImageFileNames, getIdToFileNameObject } from "./image";
import { AxiosResponse } from "axios";
import { VehicleType } from '@/src/shared/model/params';

const vehicleTypeToApiPath = {
  [VehicleType.Moto]: "/api/motos/fetch/",
  [VehicleType.Bus]: "/api/buses/fetch/",
  [VehicleType.Truck]: "/api/trucks/fetch/",
};

export async function fetchVehiclesV2(
  vehicleType: VehicleType,
  searchParams: FilterParams
) {
  const normalizedParams = getNormalizedParams(searchParams);

  const topVehicles = {
      title: "Top offers",
      data: [] as Moto[],
    },
    nonTopVehicles = {
      title: "Main offers",
      data: [] as Moto[],
    };
  const fetchPath = vehicleTypeToApiPath[vehicleType];
  const type = normalizedParams.type;
  // Right Now no idea what the types are
  // Cars, cars, car all give zero results, wtf
  delete normalizedParams.type;
  try {
    // TODO optimize such that next page does not fetch the same data
    const results: Record<number, Moto[]> = (
      await clientCars.get(fetchPath, {
        params: normalizedParams,
      })
    )?.data;
    const pageCount = Object.keys(results).length;
    // if page is greater or equal (starts with 0) than pageCount, return first page
    const currentPage =
      normalizedParams.page >= pageCount ? 0 : normalizedParams.page;
    const carResultsForPage = results[currentPage];
    const offerCount = Object.values(results).reduce(
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
    const imageFileNames = await getIdToFileNameObject(carResultsForPage, vehicleType);

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
