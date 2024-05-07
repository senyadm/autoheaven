import { VehicleType } from "../../../shared/model/params";

export const vehicleTypes: {
  value: VehicleType;
  label: string;
}[] = [
  {
    value: VehicleType.Car,
    label: "Passenger Car",
  },
  {
    value: VehicleType.Moto,
    label: "Motorcycle",
  },
  {
    value: VehicleType.Truck,
    label: "Truck",
  },
  {
    value: VehicleType.Bus,
    label: "Bus",
  },
];
