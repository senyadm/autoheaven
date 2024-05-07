import { clientCars } from "../../../shared/api";
import { BusPayload } from "../model/bus-payload";

export function postBus(payload: BusPayload) {
  return clientCars.post("/api/bus_listings/", payload);
}
