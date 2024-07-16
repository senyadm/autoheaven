/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, FC } from "react";
import RangeSlider from "@/components/landing/RangeSlider";
import { allData } from "@/components/landing/allData";
import { Car } from "@/components/landing/types";

import { useAppStore } from "@/app/GlobalRedux/useStore";
import usePremiumStatus from "@/src/shared/hooks/usePremiumStatus";
import { FiltersDictionary } from "../../../types";
import { Filter } from "../../../src/shared/model/params";
import { cn } from "../../../src/shared/utils/cn";

interface CarSearchFilterProps {
  handleSliderChange: (
    ids: [keyof Filter, keyof Filter],
    values: [number, number]
  ) => void;
  sliderRefs: any;
  filters: Filter;
  dict: FiltersDictionary;
  orientation?: "vertical" | "horizontal";
}
const CarSearchFilter = ({
  handleSliderChange,
  filters,
  dict,
  sliderRefs,
  orientation = "vertical",
}: CarSearchFilterProps) => {
  const { premiumThreshold, isPremium } = usePremiumStatus();
  const variablePriceMin = isPremium ? premiumThreshold : 1000;

  //   [brands, setBrands] = useState<string[]>([]);
  // const [offers, setOffers] = useState<number>(0);

  // const brands = tempData;
  // // brands.push("All")
  // useEffect(() => {
  //   if (!carBrands) {
  //     dispatch(fetchAllCars());
  //   }
  // }, [dispatch, carBrands]);

  // const mileageInRange = (car: Car, range: [number, number]) =>
  //   car.mileage >= range[0] && car.mileage <= range[1];
  // const priceInRange = (car: Car, range: [number, number]) =>
  //   car.price >= range[0] && car.price <= range[1];
  // const yearInRange = (car: Car, range: [number, number]) =>
  //   car.year >= range[0] && car.year <= range[1];
  // const isBrand = (car: Car, brand: string) =>
  //   car.make === brand || brand === "All";
  // const bodyMatch = (car: Car, body: string) =>
  //   car.type === body || body === "All";
  // const fuelMatch = (car: Car, fuel: string) => car. === fuel || fuel === "All";

  // const carMatchesFilters = (car: Car, filters: Filter) => {
  //   return (
  //     mileageInRange(car, filters.milage) &&
  //     priceInRange(car, filters.price) &&
  //     yearInRange(car, filters.year) &&
  //     isBrand(car, filters.brandAndModel) &&
  //     bodyMatch(car, filter.vehicleBody)
  //   );
  // };

  // useEffect(() => {

  //   if (carData && carMatchesFilters && filter) {
  //     const resData = carData.filter((car) => carMatchesFilters(car, filter));
  //     handleOfferNumbers(resData.length);
  //     setOffers(resData.length);
  //   }
  // }, [carData, carMatchesFilters, filter]);

  return (
    <div
      className={cn(
        "w-full mb-6",
        orientation === "horizontal"
          ? "lg:flex lg:space-x-4 items-center justify-between"
          : "mt-4"
      )}
    >
      <div className="mt-8">
        <RangeSlider
          value={[filters.price_min || 1000, filters.price_max || 1000000]}
          fixedLowerText={`${variablePriceMin} €`}
          fixedUpperText="1000000 €"
          ref={sliderRefs.current[0]}
          filename="banknote.svg"
          id="price"
          min={variablePriceMin}
          max={1000000}
          step={1000}
          label={dict?.price || "Price"}
          onValueChange={(values) =>
            handleSliderChange(["price_min", "price_max"], values)
          }
        />
      </div>
      <div className="mt-7">
        <RangeSlider
          ref={sliderRefs.current[1]}
          value={[filters.mileage_min || 0, filters.mileage_max || 500000]}
          fixedLowerText="0 km"
          fixedUpperText="500000 km"
          filename="milage.svg"
          id="milage"
          min={0}
          max={500000}
          step={10000}
          label={dict?.mileage || "Mileage"}
          onValueChange={(values) =>
            handleSliderChange(["mileage_min", "mileage_max"], values)
          }
        />
      </div>
      <div className="mt-7">
        <RangeSlider
          ref={sliderRefs.current[2]}
          value={[filters.year_min || 1975, filters.year_max || 2023]}
          fixedLowerText="1975"
          fixedUpperText="2023"
          filename="calendar.svg"
          id="year"
          min={1975}
          max={2023}
          step={1}
          label={dict?.year || "Year"}
          onValueChange={(values) =>
            handleSliderChange(["year_min", "year_max"], values)
          }
        />
      </div>
    </div>
  );
};

export default CarSearchFilter;
