/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "../../ui/card";
import SvgIcon from "../../SvgIcon";
import { ChevronRight } from "lucide-react";
import RangeSlider from "../RangeSlider";
import { tempData } from "../tempData";
import { allData } from "../allData";
import {
  fetchAllCars,
  fetchBrands,
  brandsWithModels,
} from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";

import { Filter, CarComponentProps, Car } from "../types";

const bodyTypes: string[] = [
  "All",
  "Sedan",
  "SUV",
  "Hatchback",
  "Pickup",
  "Example",
];

const fuelTypes: string[] = [
  "All",
  "Petrol",
  "Gas",
  "Electric",
  "Diesel",
  "Hybrid",
];
import { useAppStore } from "@/app/GlobalRedux/useStore";

export const CarComponent = React.memo(function CarComponent({
  handleSliderChange,
  filter,
  handleSelectorChange,
  handleOfferNumbers,
}: CarComponentProps) {
  const [carMakes, dispatch] = useAppStore(
    (state) => state?.carFiltersAndResults.carMakes
  );
  const [carBrands] = useAppStore(
    (state) => state?.carFiltersAndResults.brandsWithModels
  );
  //   [brands, setBrands] = useState<string[]>([]);
  const [carData, setCardata] = useState<Car[]>(allData);
  const [brandsWithModels, setBrandsWithModels] = useState<brandsWithModels[]>(
    []
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [offers, setOffers] = useState<number>(0);

  const handlePopoverToggle = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleModelClick = (model: string) => {
    handleSelectorChange("cars", "brandAndModel", model);
    // Close dropdown, or take other desired actions here
  };

  const handleBrandClick = (brand: string) => {
    handleSelectorChange("cars", "brandAndModel", brand);
    handlePopoverToggle();
  };

  const brands = tempData;
  // brands.push("All")
  useEffect(() => {
    console.log("fetching cars");
    dispatch(fetchBrands());
    dispatch(fetchAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (carBrands) {
      console.log(carBrands);
    }
  }, [carBrands]);

  // useEffect(() => {
  //   if (carMakes?.length) {

  //     dispatch(fetchBrands());

  //   }
  // }, [carMakes]);

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

  const [typedChars, setTypedChars] = useState("");

  useEffect(() => {
    if (!typedChars) return;

    const matchedBrand = brands.find((brand) =>
      brand.toLowerCase().startsWith(typedChars.toLowerCase())
    );

    console.log(matchedBrand);
    if (matchedBrand) {
      handleSelectorChange("cars", "brandAndModel", matchedBrand);
    }

    const timer = setTimeout(() => {
      setTypedChars("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [typedChars, brands]);

  return (
    <Card className="border-0 bg-background">
      <CardContent className="space-y-2 mt-8">
        <div className="grid grid-cols-3 gap-4 mt-4 mb-6">
          <RangeSlider
            value={filter.price}
            fixedLowerText="1000 $"
            fixedUpperText="1000000 $"
            filename="banknote.svg"
            id="price"
            min={1000}
            max={1000000}
            step={1000}
            label="Price"
            onValueChange={(values) =>
              handleSliderChange("cars", "price", values)
            }
          />
          <RangeSlider
            value={filter.milage}
            fixedLowerText="0 km"
            fixedUpperText="500000 km"
            filename="milage.svg"
            id="milage"
            min={0}
            max={500000}
            step={10000}
            label="Milage"
            onValueChange={(values) =>
              handleSliderChange("cars", "milage", values)
            }
          />
          <RangeSlider
            value={filter.year}
            fixedLowerText="1975"
            fixedUpperText="2023"
            filename="calendar.svg"
            id="year"
            min={1975}
            max={2023}
            step={1}
            label="Year"
            onValueChange={(values) =>
              handleSliderChange("cars", "year", values)
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter1">Brand and model</Label>
              <SvgIcon
                filepath="icons/tick.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("cars", "brandAndModel", selectorValue)
              }
              value={filter.brandAndModel}
            >
              <SelectTrigger>
                {filter.brandAndModel || "Select a brand..."}
              </SelectTrigger>
              <SelectContent>
                {/* {carBrands?.map((brandData, brandIndex) => (
                  <div key={brandIndex} className="mb-2">
                    <SelectItem
                      onClick={() => handleBrandClick(brandData.brand)}
                      value={brandData.brand}
                    >
                      <strong>{brandData.brand}</strong>
                    </SelectItem>
                    {brandData.models.map((model, modelIndex) => (
                      <div key={modelIndex} className="ml-6 mb-1">
                        <SelectItem
                          onClick={() => handleModelClick(model)}
                          value={model}
                        >
                          {model}
                        </SelectItem>
                      </div>
                    ))}
                  </div>
                ))} */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Vehicle body</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("cars", "vehicleBody", selectorValue)
              }
              value={filter.vehicleBody}
            >
              <SelectTrigger currentValue={filter.vehicleBody}>
                Select body...
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter3">Fuel type</Label>
              <SvgIcon
                filepath="icons/fuel.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("cars", "fuelType", selectorValue)
              }
              value={filter.fuelType}
            >
              <SelectTrigger currentValue={filter.fuelType}>
                Select fuel...
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid place-items-end">
        <Button>
          {offers} offers
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
});
