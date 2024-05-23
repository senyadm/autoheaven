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
  body_type: string;
  price: number;
  drivetrain: string;
  origin: null;
  make: string;
  description: string;
  istop: boolean;
  horse_power: null;
  model: string;
  seller_id: number;
  phone_number: string;
  color: string;
  created_at: string;
  vehicle_number: null;
  ext_color: null;
  year: number;
  title: string;
  consumption_winter: null;
  int_color: null;
  id: number;
  mileage: number;
  fueltype: string;
  consumption_summer: null;
  seats: null;
  gearbox: null;
  accidentfree: boolean;
  consumption_highway: null;
  istop_expiry: null;
  imageurl: string;
  type_id: string;
}

export interface CarType {
  created_at: string;
  car_type: string;
  updated_at: string;
  id: string;
}
