export type VehiclePayload =
  | BusPayload
  | MotoPayload
  | CarPayload
  | TruckPayload;

export interface CarPayload {
  body_type: string;
  make: string;
  model: string;
  color: string;
  year: number;
  mileage: number;
  gearbox: string;
  price: number;
  description: string;
  title: string;
  fueltype: string;
  accidentfree: boolean;
  imageurl: string;
  drivetrain: string;
  istop: boolean;
  phone: string;
  vehicle_number: string;
  consumption_winter: number;
  consumption_summer: number;
  consumption_highway: number;
  origin: string;
  horse_power: number;
  ext_color: string;
  int_color: string;
  seats: number;
  type_id: string;
}

export interface CarFetchPayload {
  max_results: number;
  max_cars_per_page?: number;
  type_id?: string;
  body_type?: string;
  gearbox?: string;
  makeModels?: string;
  color?: string;
  year_min?: number;
  year_max?: number;
  mileage_min?: number;
  mileage_max?: number;
  price_min?: number;
  price_max?: number;
  fueltype?: string;
  accidentfree?: boolean;
  drivetrain?: string;
  istop?: boolean;
  sortBy?: string;
}

export const CarFetchPayloadKeys = [
  "max_results",
  "max_cars_per_page",
  "type_id",
  "body_type",
  "gearbox",
  "makeModels",
  "color",
  "year_min",
  "year_max",
  "mileage_min",
  "mileage_max",
  "price_min",
  "price_max",
  "fueltype",
  "accidentfree",
  "drivetrain",
  "istop",
  "sortBy",
] as const;

export interface MotoPayload {
  color: string;
  year: number;
  mileage: number;
  gearbox: string;
  price: number;
  description: string;
  title: string;
  fueltype: string;
  accidentfree: boolean;
  imageurl: string;
  driving_mode: string;
  vehicle_number: string;
  origin: string;
  horse_power: number;
  make_id: string;
  vendor: string;
  cubic_capacity: number;
  other: string;
  model: string;
  type_id: string;
}

export interface BusPayload {
  type_id: string;
  color: string;
  year: number;
  mileage: number;
  gearbox: string;
  price: number;
  description: string;
  title: string;
  fueltype: string;
  accidentfree: boolean;
  imageurl: string;
  vehicle_number: string;
  origin: string;
  horse_power: number;
  make_id: string;
  model: string;
  vendor: string;
  cubic_capacity: number;
  other: string;
  air_conditioning: string;
  interior_features: string;
}

export interface TruckPayload {
  type_id: string;
  color: string;
  year: number;
  mileage: number;
  gearbox: string;
  price: number;
  description: string;
  title: string;
  fueltype: string;
  accidentfree: boolean;
  imageurl: string;
  vehicle_number: string;
  origin: string;
  horse_power: number;
  make_id: string;
  model: string;
  vendor: string;
  cubic_capacity: number;
  other: string;
}
