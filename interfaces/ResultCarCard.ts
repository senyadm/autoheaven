import { Car } from "./shared/Car";

type FuelType = "petrol" | "electric";
type Drivetrain = "fwd" | "awd" | "rwd";
type BodyStyle = "sedan" | "suv";
type Gear = "automatic" | "manual";
type PageDisplayed = "cars" | "profileCars" | "profileAds";

export interface ResultCarCardInterface {
  carDetails: Car;
  isTop?: boolean;
  pageDisplayed?: PageDisplayed;
}
