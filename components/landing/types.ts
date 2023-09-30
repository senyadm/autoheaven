export interface Filter {
    type?: string
    price: [number, number];
    milage: [number, number];
    year: [number, number];
    brandAndModel: string;
    vehicleBody: string;
    fuelType: string;
    fromDealer?: boolean
}

export type TrucksComponentProps = {
    handleSliderChange: (tab: TabKeys, type: string, values: [number, number]) => void;
    handleSelectorChange: (tab: TabKeys, type: string, selectorValue: string) => void;
    setSelectedIcon: React.Dispatch<React.SetStateAction<number>>;
    setHoveredIcon: React.Dispatch<React.SetStateAction<number>>;
    selectedIcon: number;
    hoveredIcon: number;
    filter: Filter;
};

export type MotoComponentProps = {
    handleSliderChange: (tab: TabKeys, type: string, values: [number, number]) => void;
handleSelectorChange: (tab: TabKeys, type: string, selectorValue: string) => void;
    filter: Filter
};

export type TabKeys = 'cars' | 'moto' | 'trucks' | 'busses';

export type FilterStates = {
    cars: Filter;
    moto: Filter;
    trucks: Filter;
    busses: Filter;
};

export type CarComponentProps = {
    handleSliderChange: (tab: TabKeys, type: string, values: [number, number]) => void;
    handleSelectorChange: (tab: TabKeys, type: string, selectorValue: string) => void;
    handleOfferNumbers: (offerNumber: number) => void;
    filter: Filter
};


export type ResultsFilterProps = {
  handleSliderChange: (type: string, values: [number, number]) => void;
  handleSelectorChange: (type: string, selectorValue: string) => void;
  handleOfferNumbers: (offerNumber: number) => void;
  filter: Filter
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
      icon: "icons/Car.svg",
      label: "Passenger Car",
    },
    {
      value: "moto",
      icon: "icons/Bike.svg",
      label: "Motorcycles",
    },
    {
      value: "trucks",
      icon: "icons/Truck.svg",
      label: "Trucks",
    },
    {
      value: "busses",
      icon: "icons/CityBus.svg",
      label: "Busses",
    },
  ];


  export const PassengerCars = [
    {
      value: "Car",
      icon: "icons/Car.svg",
      label: "Tourist Bus",
    },
    {
      value: "Minivan",
      icon: "icons/CityBus.svg",
      label: "CityBus",
    },
    {
      value: "doubleDeckerBus",
      icon: "icons/DoubleDeckerBus.svg",
      label: "Double-Decker Bus",
    },
    {
      value: "electricBus",
      icon: "icons/ElectrictBus1.svg",
      label: "Electrict Bus",
    },
  ];

  export const BUS_SUBCATEGORIES = [
    {
      value: "touristBus",
      icon: "icons/TouristBus.svg",
      label: "Tourist Bus",
    },
    {
      value: "cityBus",
      icon: "icons/CityBus.svg",
      label: "City Bus",
    },
    {
      value: "doubleDeckerBus",
      icon: "icons/DoubleDeckerBus.svg",
      label: "Double-Decker Bus",
    },
    {
      value: "electricBus",
      icon: "icons/ElectricBus1.svg",
      label: "Electric Bus",
    },
    {
        value: "minivan",
        icon: "icons/Minivan.svg",
        label: "Minivan",
    }
  ];


  export const TRUCK_SUBCATEGORIES = [
    {
      value: "Truck",
      icon: "icons/Truck.svg",
      label: "Truck",
    },
    {
      value: "commercial",
      icon: "icons/CommercialVehicle.svg",
      label: "Commercial Vehicle",
    },
    {
      value: "truckTractor",
      icon: "icons/TruckTractor.svg",
      label: "Truck Tractor",
    },
    {
      value: "trailer",
      icon: "icons/Trailer.svg",
      label: "Trailer",
    },
    {
        value: "semitrailer",
        icon: "icons/SemiTrailler.svg",
        label: "Semitrailer",
    },
    {
        value: "tankTransport",
        icon: "icons/TankTransport.svg",
        label: "Tank Transport",
    }
  ];

 export type typeProps = {
    value: string 
    label: string
  }

 export const bodyTypes: string[] = [
    "All",
    "Sedan",
    "SUV",
    "Hatchback",
    "Pickup",
    "Example",
  ];
  
  export  const fuelTypes: string[] = [
    "All",
    "Petrol",
    "Gas",
    "Electric",
    "Diesel",
    "Hybrid",
  ];


 export const types: typeProps[] = [
    {
      value: "cars",
      label: "Passenger Car",
    },
    {
      value: "moto",
      label: "Motorcycles",
    },
    {
      value: "trucks",
      label: "Trucks",
    },
    {
      value: "busses",
      label: "Busses",
    },
  ]

