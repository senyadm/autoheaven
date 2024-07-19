import { VehiclePayload } from "../../../entities/vehicle";
import { clientCars, clientCarsForceAuth } from "../../../shared/api/client";
import { VehicleType } from "../../../shared/model/params";

export async function postVehicle(
  payload: VehiclePayload,
  vehicleType: VehicleType
) {
  switch (vehicleType) {
    case VehicleType.Car:
      return clientCarsForceAuth.post("/api/cars", payload);
    case VehicleType.Bus:
      return clientCarsForceAuth.post("/api/bus_listings/", payload);
    case VehicleType.Moto:
      return clientCarsForceAuth.post("/api/moto_listings/", payload);
    case VehicleType.Truck:
      return clientCarsForceAuth.post("/api/truck_listings/", payload);
    default:
      return clientCarsForceAuth.post("/api/cars/", payload);
  }
}
