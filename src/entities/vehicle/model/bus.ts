// sample bus object we receive from fetch for bus
// {
//     "gearbox": "string",
//     "fueltype": "string",
//     "istop_expiry": null,
//     "air_conditioning": "string",
//     "id": "8060407c-0cf6-42a6-946b-90e9f29db55f",
//     "price": 0,
//     "accidentfree": true,
//     "make_id": "05858aae-9ce2-4266-8178-a2d25e27c50a",
//     "interior_features": "string",
//     "description": "string",
//     "imageurl": "string",
//     "model": "string",
//     "seller_id": "4",
//     "istop": null,
//     "vendor": "string",
//     "type_id": "21f8efbf-95f1-42b9-9a7e-4cf22d9683eb",
//     "created_at": "2024-04-30T00:33:20.393633",
//     "phone_number": "string",
//     "cubic_capacity": 0,
//     "color": "string",
//     "updated_at": null,
//     "vehicle_number": "string",
//     "year": 0,
//     "title": "string",
//     "origin": "string",
//     "other": "string",
//     "mileage": 0,
//     "horse_power": 0
//   }
export interface Bus {
  accidentfree: boolean;
  air_conditioning: string;
  color: string;
  created_at: string;
  cubic_capacity: number;
  description: string;
  fueltype: string;
  gearbox: string;
  horse_power: number;
  id: string;
  imageurl: string;
  interior_features: string;
  istop: boolean;
  istop_expiry: string | null;
  make_id: string;
  mileage: number;
  model: string;
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
export interface BusType {
  moto_type: string;
  id: string;
}
export interface BusMake {
  make_name: string;
  id: string;
}
