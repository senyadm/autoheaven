"use client"
import React, { Suspense, useEffect } from "react";
import { TypographyLarge } from "../ui/typography";
import ResultCarCard from "../shared/ResultCarCard";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import { FilterParams } from "../../interfaces/cars/cars";
import CarPagination from "./CarPagination";
interface CarSearchResultsProps {
  lang: "en" | "fr" | "it" | "de" | "pl" | "es" | "cz" | "nl" | "pt" | "ro";
  searchParams: FilterParams;
  carResultsData: {
    topCars: { title: string; data: any[] };
    nonTopCars: { title: string; data: any[] };
  };
}

const CarSearchResults = ({
  lang,
  searchParams,
  carResultsData,
  pageCount,
}: CarSearchResultsProps) => {
  const { topCars, nonTopCars } = carResultsData;
  useEffect(() => {
    console.log("Logging topCars data:", topCars.data);
  }, [topCars.data]);
  try {
    return (
      <div className="space-y-8">
        <div className="space-y-8">
          {[topCars, nonTopCars].map((cars, index) => (
            <div className="space-y-8" key={"isTop" + index}>
              <TypographyLarge className="mt-8">{cars.title}</TypographyLarge>
              <Suspense
                fallback={
                  <Skeleton className="flex w-[800px] h-[200px] border rounded-lg overflow-hidden" />
                }
              >
                {cars.data.map((carInfo, index) => (
                  <ResultCarCard
                    carDetails={carInfo}
                    key={`${index}${carInfo.imageurl}`}
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
