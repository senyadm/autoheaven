export enum VehicleType {
  Car = "car",
  Truck = "truck",
  Moto = "moto",
  Bus = "bus",
}

export interface FilterParams extends Filter {
  max_results: number;
  max_cars_per_page?: number;
  gearbox?: string;
  color?: string;
  fueltype?: string;
  drivetrain?: string;
  istop?: string;
  sortBy?: string;
  page: number;
}
export interface Filter {
  type: VehicleType;
  body_type?: string;
  price_min?: number;
  price_max?: number;
  mileage_min?: number;
  mileage_max?: number;
  year_min?: number;
  year_max?: number;
  accidentfree?: boolean;
  makeModels?: string[];
}
