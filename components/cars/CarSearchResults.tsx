import React, { Suspense } from "react";
import { TypographyLarge } from "../ui/typography";
import ResultCarCard from "../shared/ResultCarCard";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import { FilterParams } from "../../src/shared/model/params";
import CarPagination from "./CarPagination";
import { addTypesAndMakes, fetchVehicleUIData, findTypeById, Vehicle, VehicleOnCard } from "@/src/entities/vehicle";
import VehicleResult from '@/src/entities/vehicle/ui/VehicleResult';
interface CarSearchResultsProps {
  lang: "en" | "fr" | "it" | "de" | "pl" | "es" | "cz" | "nl" | "pt" | "ro";
  searchParams: FilterParams;
  carResultsData: {
    topVehicles: { title: string; data: VehicleOnCard[] };
    nonTopVehicles: { title: string; data: VehicleOnCard[] };
  };
  pageCount: number;
  vehicleUiData: Awaited<ReturnType<typeof fetchVehicleUIData>>;
}


const CarSearchResults = ({
  lang,
  searchParams,
  carResultsData,
  pageCount,
  vehicleUiData,
  allParams
}: CarSearchResultsProps) => {
  const { topVehicles, nonTopVehicles, imageFileNames } = carResultsData;
  const { vehicleType } = allParams;
  const results = [topVehicles, nonTopVehicles];
  try {
    return (
      <div className="space-y-8">
        <div className="space-y-8">
          {results.map((cars, index) => (
            <div className="space-y-8" key={"isTop" + index}>
              <TypographyLarge className="mt-8">{cars.title}</TypographyLarge>
              <Suspense
                fallback={
                  <Skeleton className="flex w-[800px] h-[200px] border rounded-lg overflow-hidden" />
                }
              >
                {cars.data.map((carInfo, index) => (
                  <VehicleResult
                    imageFileNames={imageFileNames[carInfo.id]}
                    carDetails={carInfo}
                    key={`${index}${carInfo.imageurl}`}
                  />
                ))}
              </Suspense>
            </div>
          ))}
        </div>
      
        <CarPagination searchParams={searchParams} pageCount={pageCount} />
      </div>
    );
  } catch (e) {
    console.error("🚀 ~ CarSearchResults ~ e", e);
  }
};

export default CarSearchResults;
