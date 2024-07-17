import { VehiclePayload } from "../../../entities/vehicle";
import { clientCars } from "../../../shared/api/client";
import { VehicleType } from "../../../shared/model/params";

export async function postVehicle(
  payload: VehiclePayload,
  vehicleType: VehicleType
) {
  switch (vehicleType) {
    case VehicleType.Car:
      return clientCars.post("/api/cars", payload);
    case VehicleType.Bus:
      return clientCars.post("/api/bus_listings/", payload);
    case VehicleType.Moto:
      return clientCars.post("/api/moto_listings/", payload);
    case VehicleType.Truck:
      return clientCars.post("/api/truck_listings/", payload);
    default:
      return clientCars.post("/api/cars/", payload);
  }
}
