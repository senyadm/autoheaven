type FuelType = "petrol" | "electric";
type Drivetrain = "fwd" | "awd" | "rwd";
type BodyStyle = "sedan" | "suv";
type Gear = "automatic" | "manual";

export interface ResultCarCardInterface {
  title: string;
  price: number;
  releaseYear: number;
  mileage: number;
  fuelType: FuelType;
  drivetrain: Drivetrain;
  bodyStyle: BodyStyle;
  gear: Gear;
  accidentFree: boolean;
}
