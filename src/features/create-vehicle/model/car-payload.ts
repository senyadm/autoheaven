// {
//     "body_type": "string",
//     "make": "string",
//     "model": "string",
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
//     "drivetrain": "string",
//     "istop": true,
//     "phone": "string",
//     "vehicle_number": "string",
//     "consumption_winter": 0,
//     "consumption_summer": 0,
//     "consumption_highway": 0,
//     "origin": "string",
//     "horse_power": 0,
//     "ext_color": "string",
//     "int_color": "string",
//     "seats": 0,
//     "type_id": "string"
//   }

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
