import { VehicleType } from '@/src/shared/model/params';
import { getCars } from "../../../shared/api";
import { FilterParams } from "../../../shared/model";
import { MotoMake, MotoType } from "../model/moto";
import { fetchVehiclesV2 } from "./fetch-v2";

export async function fetchMoto(searchParams: FilterParams) {
  return fetchVehiclesV2(VehicleType.Moto, searchParams);
}

const MAKES_PATH = "/api/moto_makes/";
const TYPES_PATH = "/api/moto_types/";

export async function fetchMotoTypes() {
  const promises = [getCars(MAKES_PATH), getCars(TYPES_PATH)];
  const [makes, types] = (await Promise.all(promises)) as [
    MotoMake[],
    MotoType[]
  ];
  return { makes, types };
}
