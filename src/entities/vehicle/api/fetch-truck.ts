import { VehicleType } from '@/src/shared/model/params';
import { getCars } from "../../../shared/api";
import { FilterParams } from "../../../shared/model";
import { TruckMake, TruckType } from "../model/truck";
import { fetchVehiclesV2 } from "./fetch-v2";

export async function fetchTrucks(searchParams: FilterParams) {
  return fetchVehiclesV2(VehicleType.Truck, searchParams);
}

const MAKES_PATH = "/api/truck_makes/";
const TYPES_PATH = "/api/truck_types/";

export async function fetchTruckTypes() {
  const promises = [getCars(MAKES_PATH), getCars(TYPES_PATH)];
  const [makes, types] = (await Promise.all(promises)) as [
    TruckMake[],
    TruckType[]
  ];
  return { makes, types };
}
