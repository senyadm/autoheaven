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
export const typePropertyName = {
  [VehicleType.Car]: "car_type",
  [VehicleType.Bus]: "bus_type",
  [VehicleType.Moto]: "moto_type",
  [VehicleType.Truck]: "truck_type",
};
