import { VehiclePayload } from "../../../entities/vehicle";
import { clientCars } from "../../../shared/api/client";
import { VehicleType } from "../../../shared/model/params";

export async function putVehicle(
  id: number,
  vehicleType: VehicleType,
  payload: VehiclePayload,
) {
  switch (vehicleType) {
    case VehicleType.Car:
      return clientCars.put(`/api/cars/${id}`, payload);
    case VehicleType.Bus:
      return clientCars.put(`/api/bus_listings/${id}`, payload);
    case VehicleType.Moto:
      return clientCars.put(`/api/moto_listings/${id}`, payload);
    case VehicleType.Truck:
      return clientCars.put(`/api/truck_listings/${id}`, payload);
    default:
      return clientCars.put(`/api/cars/${id}`, payload);
  }
}
