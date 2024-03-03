"use client";
import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useEffect, useState } from "react";
import ResultCarCard from "../../shared/ResultCarCard";
import AppDropdownMenu from "../../shared/AppDropdownMenu";
import ProfileAdsWillAppear from "./ProfileAdsWillAppear";
import { clientCars } from "@/app/GlobalRedux/client";
import { getToken } from "@/utils/auth";

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

const ProfileAds = () => {
  const [results, setResults] = useState<ResultCarCardInterface[]>([]);
  useEffect(() => {
    // fetch results
    clientCars.get("api/cars/wishlist/").then((response) => {
      setResults(response.data);
    });
  }, []);

  if (results.length === 0) {
    return <ProfileAdsWillAppear />;
  }
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <AppDropdownMenu options={sortingAdsOptions} />
      </div>
      <div className="flex flex-col space-y-3">
        {results?.map((car) => (
          <ResultCarCard
            carDetails={car}
            pageDisplayed="profileAds"
            key={car.title + car.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileAds;
