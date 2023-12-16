export interface Car {
  accidentfree?: boolean;
  body_type: string;
  color?: string;
  created_at?: string;
  description?: string;
  drivetrain: string;
  fueltype: string;
  gearbox: string | null;
  id: number;
  imageurl: string;
  istop?: boolean;
  make?: string;
  mileage: number;
  model?: string;
  phone_number: string;
  price: number;
  seller_id: number;
  title: string;
  type: string;
  year: number;
}
