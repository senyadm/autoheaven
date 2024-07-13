import { FilterParams } from "../../../shared/model";
import { VehicleType } from "../../../shared/model/params";
import { AllParams, FullPageParams } from "../../../shared/utils/params";
import { fetchBusTypes, fetchBuses } from "./fetch-bus";
import { fetchCarModels, getCarResults } from "./fetch-car";
import { fetchMoto, fetchMotoTypes } from "./fetch-moto";
import { fetchTruckTypes, fetchTrucks } from "./fetch-truck";

export function fetchVehiclesByParams(allParams: AllParams) {
  const vehicleType = allParams.vehicleType;
  return fetchCarTypeByParams(vehicleType, allParams);
}

export function fetchCarTypeByParams(
  vehicleType: VehicleType,
  allParams: AllParams
) {
  switch (vehicleType) {
    case VehicleType.Car:
      return getCarResults(allParams);
    // case VehicleType.truck:
    //   return fetchTrucks();
    case VehicleType.Moto:
      return fetchMoto(allParams);
    case VehicleType.Bus:
      return fetchBuses(allParams);
    case VehicleType.Truck:
      return fetchTrucks(allParams);
    default:
      return getCarResults(allParams);
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
    case VehicleType.Truck:
      return fetchTruckTypes();
    default:
      return fetchCarModels();
  }
}
