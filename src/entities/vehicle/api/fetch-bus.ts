import { VehicleType } from '@/src/shared/model/params';
import { clientCars, getCars, getNormalizedParams } from "../../../shared/api";
import { FilterParams } from "../../../shared/model";
import { Bus, BusMake, BusType } from "../model/bus";
import { fetchVehiclesV2 } from "./fetch-v2";

export async function fetchBuses(searchParams: FilterParams) {
  return fetchVehiclesV2(VehicleType.Bus, searchParams);
}

const MAKES_PATH = "/api/bus_makes/";
const TYPES_PATH = "/api/bus_types/";

export async function fetchBusTypes() {
  const promises = [getCars(MAKES_PATH), getCars(TYPES_PATH)];
  const [makes, types] = (await Promise.all(promises)) as [
    BusMake[],
    BusType[]
  ];
  return { makes, types };
}
