"use client";
import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useEffect, useState, useMemo } from "react";
import GradientHeading from "../landing/GradientHeading";
import { TypographyLarge } from "../ui/typography";
import ResultCarCard from "../shared/ResultCarCard";

import { wrapper } from "@/app/GlobalRedux/provider";
import { useRouter,  usePathname, useSearchParams } from 'next/navigation';
import { CarResult, FilterPayload } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import AppDropdownMenu from "../shared/AppDropdownMenu";
type SortValue = "newestFirst" | "oldestFirst" | "priceHighestFirst" | "priceLowestFirst" | "mileageHighestFirst" | "mileageLowestFirst";

const sortingMenuDisplayMap: { [key: string]: SortValue } = {
  "Listing (Newest first)": "newestFirst",
  "Listing (Oldest first)": "oldestFirst",
  "Price (Highest first)": "priceHighestFirst",
  "Price (Lowest first)": "priceLowestFirst",
  "Mileage (Highest first)": "mileageHighestFirst",
  "Mileage (Lowest first)": "mileageLowestFirst",
};


const CarSearchResults = ({ store, setSort }: { store: CarResult[][] | undefined, setSort: (value: "newestFirst" | "oldestFirst" | "priceHighestFirst" | "priceLowestFirst" | "mileageHighestFirst" | "mileageLowestFirst") => void }) => {

 const [currentPage, setCurrentPage] = useState(0);
 const currentData = useMemo(() => {
  if (!store) return;
    return store[currentPage];
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [store, currentPage]);

  const paginationIconProps = {
    width: "16",
    height: "16",
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!store) return;
    if (currentPage < store.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(0);
   
  };

  const myChevronRight = <ChevronRight key={"cr"} {...paginationIconProps} />;

  const [resultsCardData, setResultsCardData] = useState<ResultCarCardInterface[]>([]);
  const [topCars, setTopCars] = useState<ResultCarCardInterface[]>([]);


  useEffect(() => {
    let topcars: ResultCarCardInterface[] = [];
    if (!currentData) return;
    const allCars = currentData.map((car) => {
        const carData = {
            title: car?.title || "",
            price: car?.price || 0,
            releaseYear: car?.year || 0,
            mileage: car?.mileage || 0,
            fuelType: car?.fueltype || "",
            drivetrain: car?.drivetrain || "",
            bodyStyle: car?.body_type || "",
            gear: car?.gearbox || "",
            accidentFree: car?.accidentfree || false,
            imageURL: car?.imageurl || "",
            id: car?.id || 0
        };

        if (car?.istop) {
            topcars.push(carData);
            return {};
        }

        return carData;
    }).filter((car) => Object.keys(car).length) as ResultCarCardInterface[];
    setTopCars(topcars);
    setResultsCardData(allCars);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentData]);

  return (
    <section className="mr-8">
      <div className="flex justify-between">
        <GradientHeading title={`${store?.length} offers found`} />
        <AppDropdownMenu 
  options={sortingMenuDisplayMap} 
  setSort={setSort}
/>
      </div>
      <div className="space-y-8">
        <div className="space-y-8">
          <div className="space-y-8">
            <TypographyLarge className="mt-8">Top offers</TypographyLarge>
            {topCars?.map((carInfo, index) => (
            <ResultCarCard {...carInfo} key={`${index}${carInfo.imageURL}`} />
            ))}
          </div>
          <div className="space-y-8">
            <TypographyLarge className="mt-8">Main offers</TypographyLarge>
            {resultsCardData?.map((carInfo, index) => (
              <ResultCarCard {...carInfo} key={`${index}${carInfo.imageURL}`} />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button>See more {myChevronRight}</Button>
        </div>
        <div className="flex w-full justify-center space-x-2">
      <Button onClick={goToFirstPage} disabled={!currentPage}>
        <ChevronsLeft key={"csl"} {...paginationIconProps} />
      </Button>
      <Button onClick={handlePrevious} disabled={!currentPage}>
        <ChevronLeft key={"cl"} {...paginationIconProps} />
      </Button>
      <Button onClick={handleNext} disabled={currentPage+1 === store?.length}>
        <ChevronRight key={"cr"} {...paginationIconProps} />
      </Button>
    </div>
      </div>
    </section>
  );
};

export default CarSearchResults;



