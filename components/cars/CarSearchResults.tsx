import React, { Suspense } from "react";
import { TypographyLarge } from "../ui/typography";
import ResultCarCard from "../shared/ResultCarCard";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import { FilterParams } from "../../src/shared/model/params";
import CarPagination from "./CarPagination";
import { fetchVehicleUIData } from "@/src/entities/vehicle";
interface CarSearchResultsProps {
  lang: "en" | "fr" | "it" | "de" | "pl" | "es" | "cz" | "nl" | "pt" | "ro";
  searchParams: FilterParams;
  carResultsData: {
    topVehicles: { title: string; data: any[] };
    nonTopVehicles: { title: string; data: any[] };
  };
  pageCount: number;
  vehicleUiData: ReturnType<typeof fetchVehicleUIData>;
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
  try {
    return (
      <div className="space-y-8">
        <div className="space-y-8">
          {[topVehicles, nonTopVehicles].map((cars, index) => (
            <div className="space-y-8" key={"isTop" + index}>
              <TypographyLarge className="mt-8">{cars.title}</TypographyLarge>
              <Suspense
                fallback={
                  <Skeleton className="flex w-[800px] h-[200px] border rounded-lg overflow-hidden" />
                }
              >
                {cars.data.map((carInfo, index) => (
                  <ResultCarCard
                    imageFileNames={imageFileNames[carInfo.id]}
                    carDetails={carInfo}
                    key={`${index}${carInfo.imageurl}`}
                    vehicleUiData={vehicleUiData}
                    vehicleType={vehicleType}
                  />
                ))}
              </Suspense>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button>
            See more <ChevronRight width={16} height={16} />
          </Button>
        </div>
        <CarPagination searchParams={searchParams} pageCount={pageCount} />
      </div>
    );
  } catch (e) {
    console.error("🚀 ~ CarSearchResults ~ e", e);
  }
};

export default CarSearchResults;
