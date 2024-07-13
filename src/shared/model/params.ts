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
  vehicleType: VehicleType;
  body_type?: string;
  price_min?: number;
  price_max?: number;
  fromDealer?: boolean;
  mileage_min?: number;
  make?: string;
  model?: string;
  make_id?: string;
  mileage_max?: number;
  year_min?: number;
  year_max?: number;
  accidentfree?: boolean;
  makeModels?: string[];
}

export interface FilterWithLocation extends Filter {
  country: string;
  city: string;
}
