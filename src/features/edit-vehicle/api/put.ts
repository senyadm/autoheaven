import { VehiclePayload } from "../../../entities/vehicle";
import { clientCars, clientCarsForceAuth } from "../../../shared/api/client";
import { VehicleType } from "../../../shared/model/params";

export async function putVehicle(
  id: number,
  vehicleType: VehicleType,
  payload: VehiclePayload,
) {
  switch (vehicleType) {
    case VehicleType.Car:
      return clientCarsForceAuth.put(`/api/cars/${id}`, payload);
    case VehicleType.Bus:
      return clientCarsForceAuth.put(`/api/bus_listings/${id}`, payload);
    case VehicleType.Moto:
      return clientCarsForceAuth.put(`/api/moto_listings/${id}`, payload);
    case VehicleType.Truck:
      return clientCarsForceAuth.put(`/api/truck_listings/${id}`, payload);
    default:
      return clientCarsForceAuth.put(`/api/cars/${id}`, payload);
  }
}
