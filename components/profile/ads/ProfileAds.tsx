"use client";
import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useEffect, useState } from "react";
import ResultCarCard from "../../shared/ResultCarCard";
import AppCarDropdown from "../../shared/AppDropdownMenu";
import ProfileAdsWillAppear from "./ProfileAdsWillAppear";
import { clientCars, clientCarsForceAuth } from "@/src/shared/api/client";
import { getToken } from "@/src/shared/utils/auth";
import { parseArrayFromString } from '@/src/shared/utils/parse-string';
import { Vehicle } from '@/src/entities/vehicle';
import VehicleResult from '@/src/entities/vehicle/ui/VehicleResult';

const sortingAdsOptions = [
  "Latest added",
  "Listing (Oldest first)",
  "Price (Highest first)",
  "Price (Lowest first)",
  "Milage (Highest first)",
  "Milage (Lowest first)",
];

const ProfileAds = ({ lang }: any) => {
  const [results, setResults] = useState<Vehicle[]>([]);
  useEffect(() => {
    // fetch results
    clientCarsForceAuth.get("api/cars/wishlist/").then((response) => {
      setResults(response.data);
    });
  }, []);

  if (results.length === 0) {
    return <ProfileAdsWillAppear lang={lang} />;
  }
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <AppCarDropdown options={sortingAdsOptions} />
      </div>
      <div className="flex flex-col space-y-3">
        {results?.map((car) => (
            <VehicleResult
            key={car.id}
            carDetails={car}
            imageFileNames={parseArrayFromString(car.imageurl)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileAds;
