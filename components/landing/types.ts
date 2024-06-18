import { FiltersDictionary } from "@/types";

export interface Filter {
  type: "cars" | "motos" | "trucks" | "busses";
  price: [number, number];
  milage: [number, number];
  year: [number, number];
  brandAndModel: string;
  vehicleBody: string;
  fuelType: string;
  fromDealer?: boolean;
  accidentFree?: boolean;
  sortBy?:
    | "newestFirst"
    | "oldestFirst"
    | "priceHighestFirst"
    | "priceLowestFirst"
    | "mileageHighestFirst"
    | "mileageLowestFirst";
}

export interface FilterMoto extends Omit<Filter, "brandAndModel"> {
  brand: string;
  model: string;
  type_id?: string;
}

export interface FilterBusses extends Omit<Filter, "brandAndModel"> {
  brand: string;
  model: string;
  type_id?: string;
}

interface ComponentProps {
  handleSliderChange: (
    tab: TabKeys,
    type: string,
    values: [number, number]
  ) => void;
  handleSelectorChange: (
    tab: TabKeys,
    type: string,
    selectorValue: string
  ) => void;
  filter: Filter;
  lang: string;
  dict: FiltersDictionary;
}

export interface TrucksComponentProps extends Omit<ComponentProps, "filter"> {
  filter: FilterBusses;
  setSelectedIcon: React.Dispatch<React.SetStateAction<number>>;
  setHoveredIcon: React.Dispatch<React.SetStateAction<number>>;
  selectedIcon: number;
  hoveredIcon: number;
  busList: motoMake[];
}

export type busType = {
  bus_type: string;
  id: string;
};

export type motoType = {
  moto_type: string;
  id: string;
};

export type motoMake = {
  make_name: string;
  id: string;
};

export interface MotoComponentProps extends Omit<ComponentProps, "filter"> {
  motoList: motoMake[];
  handleSliderChange: (
    tab: TabKeys,
    type: string,
    values: [number, number]
  ) => void;
  handleSelectorChange: (
    tab: TabKeys,
    type: string,
    selectorValue: string
  ) => void;
  filter: FilterMoto;
  motoTypes: motoType[];
}

export type TabKeys = "cars" | "motos" | "trucks" | "busses";

export type FilterStates = {
  cars: Filter;
  motos: FilterMoto;
  trucks: FilterBusses;
  busses: FilterBusses;
};

export interface CarComponentProps extends ComponentProps {
  handleOfferNumbers: (offerNumber: number) => void;
}

export type ResultsFilterProps = {
  handleSliderChange: (type: string, values: [number, number]) => void;
  handleSelectorChange: (type: string, selectorValue: string) => void;
  handleOfferNumbers: (offerNumber: number) => void;
  filter: Filter;
  dict: FiltersDictionary | null;
};

export type Car = {
  id: number;
  type: string;
  make: string;
  model: string;
  color: string;
  year: number;
  mileage: number;
  price: number;
  description: string;
  seller_id: number;
  created_at: string;
};

export const tabsTriggersInfo = [
  {
    value: "cars",
    icon: "/icons/Car.svg",
    label: "Passenger Car",
  },
  {
    value: "moto",
    icon: "/icons/Bike.svg",
    label: "Motorcycles",
  },
  {
    value: "trucks",
    icon: "/icons/Truck.svg",
    label: "Trucks",
  },
  {
    value: "busses",
    icon: "/icons/CityBus.svg",
    label: "Busses",
  },
];

export const PassengerCars = [
  {
    value: "Car",
    icon: "/icons/Car.svg",
    label: "Tourist Bus",
  },
  {
    value: "Minivan",
    icon: "/icons/CityBus.svg",
    label: "CityBus",
  },
  {
    value: "doubleDeckerBus",
    icon: "/icons/DoubleDeckerBus.svg",
    label: "Double-Decker Bus",
  },
  {
    value: "electricBus",
    icon: "/icons/ElectrictBus1.svg",
    label: "Electrict Bus",
  },
];

export const BUS_SUBCATEGORIES = [
  {
    value: "touristBus",
    icon: "/icons/TouristBus.svg",
    label: "Coach",
    id: "21f8efbf-95f1-42b9-9a7e-4cf22d9683eb",
  },
  {
    value: "cityBus",
    icon: "/icons/CityBus.svg",
    label: "City",
    id: "b27a6100-7eb3-4bf6-9c50-c45680d6412d",
  },
  {
    value: "doubleDeckerBus",
    icon: "/icons/DoubleDeckerBus.svg",
    label: "Double Decker",
    id: "81ff71b5-3410-407d-8813-a39297a456cd",
  },
  {
    value: "electricBus",
    icon: "/icons/ElectricBus1.svg",
    label: "Inter City",
    id: "8e253fcb-2562-4303-aad6-9e74b161658b",
  },
  {
    value: "minivan",
    icon: "/icons/Minivan.svg",
    label: "Other",
    id: "2e61381e-3d4f-4e77-8376-8be50cc42c04",
  },
];

export const TRUCK_SUBCATEGORIES = [
  {
    value: "Truck",
    icon: "/icons/Truck.svg",
    label: "Truck",
    id: "87f0fb37-34b1-4a9d-9cf6-756fce067196",
  },
  {
    value: "commercial",
    icon: "/icons/CommercialVehicle.svg",
    label: "Commercial",
    id: "0e6c8268-1a33-49d1-8188-4a69c1278a5f",
  },
  {
    value: "truckTractor",
    icon: "/icons/TruckTractor.svg",
    label: "Tractor",
    id: "0b3ec5bf-9f6b-41c3-8ca0-3bbdaa46b2b8",
  },
  {
    value: "trailer",
    icon: "/icons/Trailer.svg",
    label: "Trailer",
    id: "0b3ec5bf-9f6b-41c3-8ca0-3bbdaa46b2b8",
  },
  {
    value: "semitrailer",
    icon: "/icons/SemiTrailler.svg",
    label: "Semitrailer",
    id: "0b3ec5bf-9f6b-41c3-8ca0-3bbdaa46b2b8",
  },
  {
    value: "tankTransport",
    icon: "/icons/TankTransport.svg",
    label: "Tank",
    id: "cc52633d-093a-4a49-b2d5-cf55c0591c37",
  },
];

export type typeProps = {
  value: string;
  label: string;
};

export const bodyTypes: string[] = [
  "All",
  "Sedan",
  "SUV",
  "Hatchback",
  "Pickup",
  "Example",
];

export const fuelTypes: string[] = [
  "All",
  "Petrol",
  "Gas",
  "Electric",
  "Diesel",
  "Hybrid",
];

export const types: typeProps[] = [
  {
    value: "Cars",
    label: "Passenger Car",
  },
  {
    value: "Moto",
    label: "Motorcycles",
  },
  {
    value: "Trucks",
    label: "Trucks",
  },
  {
    value: "Busses",
    label: "Busses",
  },
];

export const Trucks = [
  "Truck",
  "Commercial",
  "TruckTractor",
  "Trailer",
  "Semitrailer",
  "TankTransport",
];

export const Busses = [
  "TouristBus",
  "CityBus",
  "DoubleDeckerBus",
  "ElectricBus",
  "Minivan",
];
