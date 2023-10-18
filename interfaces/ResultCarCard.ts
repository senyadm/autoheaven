type FuelType = "petrol" | "electric";
type Drivetrain = "fwd" | "awd" | "rwd";
type BodyStyle = "sedan" | "suv";
type Gear = "automatic" | "manual";
type PageDisplayed = "cars" | "profileCars" | "profileAds";

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
  imageURL: string;
  id: number;
  isTop?: boolean;
  pageDisplayed?: PageDisplayed;
  isFavorite?: boolean;
}
