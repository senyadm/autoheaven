import { FilterParams } from "../../../shared/model";
import { VehicleType } from "../../../shared/model/params";
import { getCarResults } from "../../car/api/fetch";

export function fetchVehiclesByParams(params: FilterParams) {
  const { type } = params;
  switch (type) {
    case VehicleType.car:
      return getCarResults(params);
    // case VehicleType.truck:
    //   return fetchTrucks();
    // case VehicleType.moto:
    //   return fetchMotos();
    // case VehicleType.bus:
    //     return fetchBuses();
    default:
      return getCarResults(params);
  }
}
