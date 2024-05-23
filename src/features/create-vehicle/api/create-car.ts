import { clientCars } from "../../../shared/api";
import { CarPayload } from "../model/car-payload";

export function postMoto(payload: CarPayload) {
  return clientCars.post("/api/cars/", payload);
}
