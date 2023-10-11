import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React from "react";
import ResultCarCard from "../shared/ResultCarCard";
import AppDropdownMenu from "../shared/AppDropdownMenu";

const volkswagenCar4: ResultCarCardInterface = {
  title: "Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio",
  price: 21500,
  releaseYear: 2014,
  mileage: 10000,
  fuelType: "petrol",
  drivetrain: "fwd",
  bodyStyle: "sedan",
  gear: "automatic",
  accidentFree: true,
  imageURL: "/img/cars/Preview.png",
  id: 1,
  isTop: true,
};
const volkswagenCar2: ResultCarCardInterface = {
  title: "Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio",
  price: 21500,
  releaseYear: 2014,
  mileage: 10000,
  fuelType: "petrol",
  drivetrain: "fwd",
  bodyStyle: "sedan",
  gear: "automatic",
  accidentFree: true,
  imageURL: "/img/cars/volkswagen2.png",
  id: 2,
  isTop: true,
};
const volkswagenCar3: ResultCarCardInterface = {
  title: "Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio",
  price: 21500,
  releaseYear: 2014,
  mileage: 10000,
  fuelType: "petrol",
  drivetrain: "fwd",
  bodyStyle: "sedan",
  gear: "automatic",
  accidentFree: false,
  imageURL: "/img/cars/volkswagen3.png",
  id: 3,
  isTop: true,
};
const sortingAdsOptions = [
  "Latest added",
  "Listing (Oldest first)",
  "Price (Highest first)",
  "Price (Lowest first)",
  "Milage (Highest first)",
  "Milage (Lowest first)",
];
const ProfileCars = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <AppDropdownMenu options={sortingAdsOptions} />
      </div>
      <div className="flex flex-col space-y-3">
        <ResultCarCard
          {...volkswagenCar2}
          pageDisplayed="profileAds"
          isFavorite={true}
        />
        <ResultCarCard
          {...volkswagenCar3}
          pageDisplayed="profileAds"
          isFavorite={true}
        />
        <ResultCarCard
          {...volkswagenCar4}
          pageDisplayed="profileAds"
          isFavorite={true}
        />
      </div>
    </div>
  );
};

export default ProfileCars;
