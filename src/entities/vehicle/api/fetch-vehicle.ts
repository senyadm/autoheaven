import { getCars } from "../../../shared/api";
import { getCarModelsById } from "../../../shared/api/cars";
import { FilterParams } from "../../../shared/model";
import { VehicleType } from "../../../shared/model/params";
import { fetchBusTypes, fetchBuses } from "./fetch-bus";
import { fetchCarModels, getCarResults } from "./fetch-car";
import { fetchMoto, fetchMotoTypes } from "./fetch-moto";

export function fetchVehiclesByParams(params: FilterParams) {
  const { type } = params;
  switch (type) {
    case VehicleType.Car:
      return getCarResults(params);
    // case VehicleType.truck:
    //   return fetchTrucks();
    case VehicleType.Moto:
      return fetchMoto(params);
    case VehicleType.Bus:
      return fetchBuses(params);
    default:
      return getCarResults(params);
  }
}

export async function fetchVehicleUIData(type: VehicleType) {
  switch (type) {
    case VehicleType.Car:
      return fetchCarModels();
    case VehicleType.Moto:
      return fetchMotoTypes();
    case VehicleType.Bus:
      return fetchBusTypes();
    default:
      return fetchCarModels();
  }
}
