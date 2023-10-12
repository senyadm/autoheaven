"use client";
import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useState } from "react";
import GradientHeading from "../landing/GradientHeading";
import { TypographyLarge } from "../ui/typography";
import ResultCarCard from "../shared/ResultCarCard";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import AppDropdownMenu from "../shared/AppDropdownMenu";
const volkswagenCar1: ResultCarCardInterface = {
  title: "Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio",
  price: 21500,
  releaseYear: 2014,
  mileage: 10000,
  fuelType: "petrol",
  drivetrain: "fwd",
  bodyStyle: "sedan",
  gear: "automatic",
  accidentFree: true,
  imageURL: "/img/cars/volkswagen.png",
  id: 1,
};
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
};
const otherCars: ResultCarCardInterface[] = [1, 2, 3, 4, 5]
  .map((num) => `/img/cars/Preview-${num}.png`)
  .map((path) => ({
    title: "Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio",
    price: 21500,
    releaseYear: 2014,
    mileage: 10000,
    fuelType: "petrol",
    drivetrain: "fwd",
    bodyStyle: "sedan",
    gear: "automatic",
    accidentFree: true,
    imageURL: path,
    id: 3,
  }));
const sortingMenuOptions = [
  "Listing (Newest first)",
  "Listing (Oldest first)",
  "Price (Highest first)",
  "Price (Lowest first)",
  "Milage (Highest first)",
  "Milage (Lowest first)",
];
const backendURL = "https://autoheven-cars.vercel.app";
const CarSearchResults = () => {
  const paginationIconProps = {
    width: "16",
    height: "16",
  };
  const myChevronRight = <ChevronRight key={"cr"} {...paginationIconProps} />;
  const paginationButtonLabels = [
    <ChevronsLeft key={"csl"} {...paginationIconProps} />,
    <ChevronLeft key={"cl"} {...paginationIconProps} />,
    "...",
    22,
    23,
    "...",
    99,
    myChevronRight,
    <ChevronsRight key={"csr"} {...paginationIconProps} />,
  ];
  const [retrievedCarResults, setRetrievedCarResults] = useState([]);
  fetch(`${backendURL}/api/cars`).then((data) => setRetrievedCarResults(data));
  console.log(retrievedCarResults);
  return (
    <section className="mr-8">
      <div className="flex justify-between">
        <GradientHeading title="143 364 offers found" />
        <AppDropdownMenu options={sortingMenuOptions} />
      </div>
      <div className="space-y-8">
        <div className="space-y-8">
          {" "}
          {/* Added scrollable wrapper here */}
          <div className="space-y-8">
            <TypographyLarge className="mt-8">Top offers</TypographyLarge>
            <ResultCarCard {...volkswagenCar2} />
            <ResultCarCard {...volkswagenCar4} />
          </div>
          <div className="space-y-8">
            <TypographyLarge className="mt-8">Main offers</TypographyLarge>
            <ResultCarCard {...volkswagenCar1} />
            <ResultCarCard {...volkswagenCar3} />
            {otherCars.map((carInfo) => (
              <ResultCarCard {...carInfo} key={carInfo.imageURL} />
            ))}
            <ResultCarCard {...volkswagenCar3} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>See more {myChevronRight}</Button>
        </div>
        <div className="flex w-full justify-center space-x-2">
          {paginationButtonLabels.map((label, index) => (
            <Button
              className={`${
                index === 3
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-secondary-foreground"
              } `}
              key={index}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarSearchResults;
