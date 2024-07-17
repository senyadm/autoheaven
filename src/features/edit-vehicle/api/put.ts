import { VehiclePayload } from "../../../entities/vehicle";
import { clientCars } from "../../../shared/api/client";
import { VehicleType } from "../../../shared/model/params";

export async function putVehicle(
  payload: VehiclePayload,
  vehicleType: VehicleType
) {
  switch (vehicleType) {
    case VehicleType.Car:
      return clientCars.put("/api/cars", payload);
    case VehicleType.Bus:
      return clientCars.put("/api/bus_listings/", payload);
    case VehicleType.Moto:
      return clientCars.put("/api/moto_listings/", payload);
    case VehicleType.Truck:
      return clientCars.put("/api/truck_listings/", payload);
    default:
      return clientCars.put("/api/cars/", payload);
  }
}
