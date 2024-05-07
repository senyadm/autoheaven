import { clientCars } from "../../../shared/api";
import { MotoPayload } from "../model/moto-payload";

export function postMoto(payload: MotoPayload) {
  return clientCars.post("/api/moto_listings/", payload);
}
