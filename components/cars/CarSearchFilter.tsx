/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import RangeSlider from "@/components/landing/RangeSlider";
import { allData } from "@/components/landing/allData";
import {
  Filter,
  ResultsFilterProps,
  Car,
} from "@/components/landing/types";


  import { useAppStore } from "@/app/GlobalRedux/useStore";
import usePremiumStatus from "@/hooks/usePremiumStatus";


  

export function CarSearchFilter({
    handleSliderChange,
    filter,
    dict,
    handleSelectorChange,
    handleOfferNumbers,
  }: ResultsFilterProps) {
    const {premiumThreshold, isPremium} = usePremiumStatus();
    const variablePriceMin = isPremium ? premiumThreshold : 1000;

    const [carBrands, dispatch] = useAppStore(
        (state) => state.carFiltersAndResults.carMakes
      );
    //   [brands, setBrands] = useState<string[]>([]);
    const [carData, setCardata] = useState<Car[]>(allData);
    const [offers, setOffers] = useState<number>(0);

  
    // const brands = tempData;
    // // brands.push("All")
    // useEffect(() => {
    //   if (!carBrands) {
    //     dispatch(fetchAllCars());
    //   }
    // }, [dispatch, carBrands]);
  
    const mileageInRange = (car: Car, range: [number, number]) =>
      car.mileage >= range[0] && car.mileage <= range[1];
    const priceInRange = (car: Car, range: [number, number]) =>
      car.price >= range[0] && car.price <= range[1];
    const yearInRange = (car: Car, range: [number, number]) =>
      car.year >= range[0] && car.year <= range[1];
    const isBrand = (car: Car, brand: string) =>
      car.make === brand || brand === "All";
    const bodyMatch = (car: Car, body: string) =>
      car.type === body || body === "All";
    // const fuelMatch = (car: Car, fuel: string) => car. === fuel || fuel === "All";
  
    const carMatchesFilters = (car: Car, filters: Filter) => {
      return (
        mileageInRange(car, filters.milage) &&
        priceInRange(car, filters.price) &&
        yearInRange(car, filters.year) &&
        isBrand(car, filters.brandAndModel) &&
        bodyMatch(car, filter.vehicleBody)
      );
    };
  
    useEffect(() => {

      if (carData && carMatchesFilters && filter) {
        const resData = carData.filter((car) => carMatchesFilters(car, filter));
        handleOfferNumbers(resData.length);
        setOffers(resData.length);
      }
    }, [carData, carMatchesFilters, filter]);
    
    return (
          <div className=" mt-4 mb-6">
            <div className="mt-8">
            <RangeSlider 
              value={filter.price}
              fixedLowerText={`${variablePriceMin} $`}
              fixedUpperText="1000000 $"
              filename="banknote.svg"
              id="price"
              min={variablePriceMin}
              max={1000000}
              step={1000}
              label={dict?.price || "Price"}
              onValueChange={(values) =>
                handleSliderChange("price", values)
              }
            />
            </div>
            <div className="mt-7">
            <RangeSlider
              value={filter.milage}
              fixedLowerText="0 km"
              fixedUpperText="500000 km"
              filename="milage.svg"
              id="milage"
              min={0}
              max={500000}
              step={10000}
              label={dict?.mileage || "Mileage"}
              onValueChange={(values) =>
                handleSliderChange("milage", values)
              }
            />
            </div>
            <div className="mt-7">
            <RangeSlider
              value={filter.year}
              fixedLowerText="1975"
              fixedUpperText="2023"
              filename="calendar.svg"
              id="year"
              min={1975}
              max={2023}
              step={1}
              label={dict?.year || "Year"}
              onValueChange={(values) =>
                handleSliderChange("year", values)
              }
            />
            </div>
          </div>
    );
  }