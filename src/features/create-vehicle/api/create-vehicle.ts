import { clientCars } from "../../../shared/api/client";
import { VehicleType } from "../../../shared/model/params";
import { BusPayload } from "../model/bus-payload";
import { CarPayload } from "../model/car-payload";
import { MotoPayload } from "../model/moto-payload";

type VehiclePayload = BusPayload | MotoPayload | CarPayload;

export async function postVehicle(
  payload: VehiclePayload,
  vehicleType: VehicleType
) {
  switch (vehicleType) {
    case VehicleType.car:
      return clientCars.post("/api/car_listings/", payload);
    case VehicleType.bus:
      return clientCars.post("/api/bus_listings/", payload);
    case VehicleType.moto:
      return clientCars.post("/api/moto_listings/", payload);
    default:
      return clientCars.post("/api/car_listings/", payload);
  }
}
