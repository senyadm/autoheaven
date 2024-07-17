import { VehicleType } from "../../../shared/model/params";
import { Bus, BusMake } from "./bus";
import { Car } from "./car";
import { Moto, MotoMake } from "./moto";
import { Truck, TruckMake } from "./truck";

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
export const enum VehicleTypePage {
  Car = "cars",
  Bus = "buses",
  Moto = "motorcycles",
  Truck = "trucks",
}
export type Vehicle = Moto | Bus | Truck | Car;
export const vehicleTypeByPage: Record<VehicleTypePage, VehicleType> = {
  [VehicleTypePage.Car]: VehicleType.Car,
  [VehicleTypePage.Bus]: VehicleType.Bus,
  [VehicleTypePage.Moto]: VehicleType.Moto,
  [VehicleTypePage.Truck]: VehicleType.Truck,
};
export const pageByVehicleType: Record<VehicleType, VehicleTypePage> = {
  [VehicleType.Car]: VehicleTypePage.Car,
  [VehicleType.Bus]: VehicleTypePage.Bus,
  [VehicleType.Moto]: VehicleTypePage.Moto,
  [VehicleType.Truck]: VehicleTypePage.Truck,
};
export const vehicleTypePages = [
  VehicleTypePage.Car,
  VehicleTypePage.Bus,
  VehicleTypePage.Moto,
  VehicleTypePage.Truck,
];
export type Make = MotoMake | BusMake | TruckMake;
