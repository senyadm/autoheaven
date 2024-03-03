"use client";
import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useEffect, useState, useMemo } from "react";
import GradientHeading from "../landing/GradientHeading";
import { TypographyLarge } from "../ui/typography";
import ResultCarCard from "../shared/ResultCarCard";
import { Skeleton } from "@/components/ui/skeleton";

import {
  CarResult,
  FilterPayload,
} from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import AppDropdownMenu from "../shared/AppDropdownMenu";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { fetchWishlistCars } from "@/app/GlobalRedux/profile/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/GlobalRedux/store";
const CarSearchResults = ({
  store,
  setSort,
  lang,
}: {
  store: CarResult[][] | undefined;
  setSort: (
    value:
      | "newestFirst"
      | "oldestFirst"
      | "priceHighestFirst"
      | "priceLowestFirst"
      | "mileageHighestFirst"
      | "mileageLowestFirst"
  ) => void;
  lang: "en" | "fr" | "it" | "de" | "pl" | "es" | "cz" | "nl" | "pt" | "ro";
}) => {
  const [, wishlistDispatch] = useAppStore((state) => state?.user.wishlist);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      wishlistDispatch(fetchWishlistCars());
    }
  }, [isLoggedIn, wishlistDispatch]);

  const [currentPage, setCurrentPage] = useState(0);
  const currentData = useMemo(() => {
    if (!store) return;
    return store[currentPage];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, currentPage]);

  const [offers, setOffers] = useState<number>(0);
  useEffect(() => {
    if (store) {
      let i = 0;
      store.forEach((list: any[]) => list.forEach(() => i++));
      setOffers(i);
    }
  }, [store]);
  const paginationIconProps = {
    width: "16",
    height: "16",
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!store) return;
    if (currentPage < store.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(0);
  };

  const myChevronRight = <ChevronRight key={"cr"} {...paginationIconProps} />;

  const [resultsCardData, setResultsCardData] = useState<
    ResultCarCardInterface[]
  >([]);
  const [topCars, setTopCars] = useState<ResultCarCardInterface[]>([]);

  useEffect(() => {
    let topcars: ResultCarCardInterface[] = [];
    if (!currentData) return;
    const allCars = currentData
      .map((car) => {
        const alternativeTitle =
          car?.make && car?.model && `${car?.make} ${car?.model}`;
        const carData: ResultCarCardInterface = {
          title: car?.title || alternativeTitle || "",
          price: car?.price || 0,
          type: car?.type || "",
          year: car?.year || 0,
          mileage: car?.mileage || 0,
          fueltype: car?.fueltype || "",
          drivetrain: car?.drivetrain || "",
          body_type: car?.body_type || "",
          gearbox: car?.gearbox || "",
          accidentfree: car?.accidentfree || false,
          imageurl: car?.imageurl || "",
          id: car?.id || 0,
          phone_number: car?.phone_number || "",
          pageDisplayed: "cars",
          seller_id: car?.seller_id || 0,
        };

        if (car?.istop) {
          topcars.push(carData);
          return {};
        }

        return carData;
      })
      .filter((car) => Object.keys(car).length) as ResultCarCardInterface[];
    setTopCars(topcars);
    setResultsCardData(allCars);
    console.log("allCars", allCars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  return (
    <section className="mx-8">
      <div className="flex justify-between mt-8 md:mt-8">
        <GradientHeading title={`${offers} offers found`} />
        <AppDropdownMenu setSort={setSort} />
      </div>
      <div className="space-y-8">
        <div className="space-y-8">
          <div className="space-y-8">
            <TypographyLarge className="mt-8">Top offers</TypographyLarge>
            {topCars.length ? (
              topCars.map((carInfo, index) => (
                <ResultCarCard
                  carDetails={carInfo}
                  key={`${index}${carInfo.imageurl}`}
                />
              ))
            ) : (
              <Skeleton className="flex w-[800px] h-[200px] border rounded-lg overflow-hidden" />
            )}
          </div>
          <div className="space-y-8">
            <TypographyLarge className="mt-8">Main offers</TypographyLarge>
            {resultsCardData ? (
              resultsCardData.map((carInfo, index) => (
                <ResultCarCard
                  carDetails={carInfo}
                  key={`${index}${carInfo.imageurl}`}
                />
              ))
            ) : (
              <Skeleton className="flex w-[800px] h-[200px] border rounded-lg overflow-hidden" />
            )}
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
          <Button
            onClick={handleNext}
            disabled={currentPage + 1 === store?.length}
          >
            <ChevronRight key={"cr"} {...paginationIconProps} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarSearchResults;
