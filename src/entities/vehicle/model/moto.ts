//sample motorcycle object we receive from fetch for moto
// {
//   "id": "f4c6f3e3-d6d1-47d5-9761-42cefd54fe65",
//   "seller_id": "4",
//   "driving_mode": "string",
//   "vendor": "string",
//   "color": "string",
//   "created_at": "2024-04-30T00:29:57.516496",
//   "istop": false,
//   "cubic_capacity": 0,
//   "updated_at": null,
//   "phone_number": "string",
//   "other": "string",
//   "year": 0,
//   "title": "string",
//   "vehicle_number": "string",
//   "mileage": 0,
//   "fueltype": "string",
//   "origin": "string",
//   "model": "string",
//   "gearbox": "string",
//   "accidentfree": true,
//   "horse_power": 0,
//   "type_id": "06dcf1b9-1c2a-42ae-8613-c2f9a1905141",
//   "price": 0,
//   "imageurl": "string",
//   "istop_expiry": null,
//   "description": "string",
//   "make_id": "032013df-f7ef-4d3c-af72-878c467e607d"
// }
export interface Moto {
  id: number;
  seller_id: string;
  driving_mode: string;
  vendor: string;
  color: string;
  created_at: string;
  istop: boolean;
  cubic_capacity: number;
  updated_at: null;
  phone_number: string;
  other: string;
  year: number;
  title: string;
  vehicle_number: string;
  mileage: number;
  fueltype: string;
  origin: string;
  model: string;
  gearbox: string;
  accidentfree: boolean;
  horse_power: number;
  type_id: string;
  price: number;
  imageurl: string;
  istop_expiry: null;
  description: string;
  make_id: string;
}
export interface MotoType {
  moto_type: string;
  id: string;
}
export interface MotoMake {
  make_name: string;
  id: string;
}
