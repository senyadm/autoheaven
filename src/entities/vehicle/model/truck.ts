const sampleTruck = {
  mileage: 2,
  title: '',
  horse_power: 2,
  other: '',
  gearbox: 'RWD',
  fueltype: 'Electric',
  istop_expiry: null,
  id: '15c37f26-95fb-416c-932d-54d7ddc08d59',
  price: 2,
  accidentfree: false,
  make_id: 'e10526e6-c585-4659-8402-348978524974',
  description: '2',
  imageurl: '',
  model: '',
  type_id: '86e50b9b-aafa-4455-be06-83b5b317f535',
  seller_id: '5',
  istop: false,
  vendor: '',
  created_at: '2024-07-17T21:01:17.139373',
  phone_number: '(557)509-1958',
  cubic_capacity: 2,
  color: 'Gray',
  updated_at: null,
  vehicle_number: '0',
  year: 2024,
  origin: 'Åland Islands',
};
export interface Truck {
  accidentfree: boolean;
  color: string;
  created_at: string;
  cubic_capacity: number;
  description: string;
  fueltype: string;
  gearbox: string;
  horse_power: number;
  id: string;
  imageurl: string;
  istop: boolean;
  istop_expiry: string | null;
  make_id: string;
  mileage: number;
  origin: string;
  other: string;
  phone_number: string;
  price: number;
  seller_id: number;
  title: string;
  type_id: string;
  updated_at: string;
  vehicle_number: string;
  vendor: string;
  year: number;
}
export interface TruckMake {
  id: number;
  make: string;
}
export interface TruckType {
  id: number;
  type: string;
}
