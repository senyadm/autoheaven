import { addAppSpecificData } from '@/src/entities/vehicle/lib/typesAndMakes';
import { getCars } from "../../../shared/api";
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
export async function fetchVehiclesWithTypes(allParams: AllParams, vehicleUIData: any) {
  if (!allParams.vehicleType) throw new Error("Vehicle type is required");
  let vehiclesResponse;
  try {
    vehiclesResponse = await fetchVehiclesByParams(allParams);
  } catch (e) {
    console.error("Error fetching vehicles:", e);
    throw e;
  }

  const newDataTop = addAppSpecificData(vehiclesResponse.topVehicles.data, vehicleUIData, allParams.vehicleType)
  const newDataNonTop = addAppSpecificData(vehiclesResponse.nonTopVehicles.data, vehicleUIData, allParams.vehicleType)
  return {
    ...vehiclesResponse,
    topVehicles: { title: vehiclesResponse.topVehicles.title, data: newDataTop },
    nonTopVehicles: { title: vehiclesResponse.nonTopVehicles.title, data: newDataNonTop },
  }
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

export async function fetchCarById(id: number) {
  return await getCars(`/api/cars/${id}`);
}
