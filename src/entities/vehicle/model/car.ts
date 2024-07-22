// sample car object we receive from fetch for car
// {
//       "body_type": "Hatchback",
//       "price": 21312,
//       "drivetrain": "manual",
//       "origin": null,
//       "make": "HUMMER",
//       "description": "123123132",
//       "istop": false,
//       "horse_power": null,
//       "model": "H3T",
//       "seller_id": 5,
//       "phone_number": "+420123123",
//       "color": "",
//       "created_at": "2024-03-23T09:20:13.559530",
//       "vehicle_number": null,
//       "ext_color": null,
//       "year": 2024,
//       "title": "",
//       "consumption_winter": null,
//       "int_color": null,
//       "id": 175,
//       "mileage": 12312,
//       "fueltype": "Gas",
//       "consumption_summer": null,
//       "seats": null,
//       "gearbox": null,
//       "accidentfree": false,
//       "consumption_highway": null,
//       "istop_expiry": null,
//       "imageurl": "",
//       "type_id": null
// },
export interface Car {
  accidentfree: boolean;
  body_type: string;
  color: string;
  consumption_highway: number;
  consumption_summer: number;
  consumption_winter: number;
  created_at: string;
  description: string;
  drivetrain: string;
  ext_color: string;
  fueltype: string;
  gearbox: string;
  horse_power: number;
  id: number;
  imageurl: string;
  int_color: string;
  istop: boolean;
  istop_expiry: string | null;
  make: string;
  mileage: number;
  model: string;
  origin: string;
  phone_number: string;
  price: number;
  seats: number;
  seller_id: number;
  title: string;
  type_id: string;
  vehicle_number: string;
  year: number;
}

export interface CarType {
  created_at: string;
  car_type: string;
  updated_at: string;
  id: string;
}
