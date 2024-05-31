// {
//     "type_id": "string",
//     "color": "string",
//     "year": 0,
//     "mileage": 0,
//     "gearbox": "string",
//     "price": 0,
//     "description": "string",
//     "title": "string",
//     "fueltype": "string",
//     "accidentfree": true,
//     "imageurl": "string",
//     "vehicle_number": "string",
//     "origin": "string",
//     "horse_power": 0,
//     "make_id": "string",
//     "model": "string",
//     "vendor": "string",
//     "cubic_capacity": 0,
//     "other": "string"
//   }

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
