import { clientCars } from "../../app/GlobalRedux/client";

const pathByType = {
  "Passenger Car": "/api/cars",
  Motorcycle: "/api/moto_listings",
  Bus: "/api/bus_listings",
  truck: "/api/truck_listings",
};

export async function postVehicle(payload, vehicleType) {
  try {
    const response = await clientCars.post(pathByType[vehicleType], payload);
    return response.data.id;
  } catch (err: any) {
    return err.response.data;
  }
}
