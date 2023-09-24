/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SvgIcon from "@/components/SvgIcon";
import { ChevronRight } from "lucide-react";
import RangeSlider from "@/components/landing/RangeSlider";
import { allData } from "@/components/landing/allData";
import {
    fetchAllCars,
  } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";

import { tempData } from "@/components/landing/tempData";

import {
  Filter,
  ResultsFilterProps,
  Car,
} from "@/components/landing/types";

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


  

export function CarSearchFilter({
    handleSliderChange,
    filter,
    handleSelectorChange,
    handleOfferNumbers,
  }: ResultsFilterProps) {
    const [carBrands, dispatch] = useAppStore(
        (state) => state.carFiltersAndResults.carBrands
      );
    //   [brands, setBrands] = useState<string[]>([]);
    const [carData, setCardata] = useState<Car[]>(allData);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [offers, setOffers] = useState<number>(0);
    const [activePopover, setActivePopover] = useState<string | null>(null);
    const handlePopoverToggle = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };
  
    const handleModelClick = (model: string) => {
        handleSelectorChange("brandAndModel", model);
        // Close dropdown, or take other desired actions here
      };
      
    const handleBrandClick = (brand: string) => {
      handleSelectorChange("brandAndModel", brand); 
      handlePopoverToggle();
      setActivePopover(brand)
    };
  
    const brands = tempData;
    // brands.push("All")
    useEffect(() => {
      if (!carBrands) {
        dispatch(fetchAllCars());
      }
    }, [dispatch, carBrands]);
  
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

    const [typedChars, setTypedChars] = useState('');

    const handleKeyup = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (e.key.length > 1) return;
        setTypedChars((prev) => {
            const newChars = prev + e.key;
            console.log(newChars); // Log to ensure characters are captured
            return newChars;
        });
    };

    useEffect(() => {
        if (!typedChars) return;
    
        const matchedBrand = brands.find(brand => brand.toLowerCase().startsWith(typedChars.toLowerCase()));
        
        console.log(matchedBrand); // Log the matched brand
        if (matchedBrand) {
            handleSelectorChange("brandAndModel", matchedBrand);
        }
    
        const timer = setTimeout(() => {
          setTypedChars('');
        }, 1000);
    
        return () => clearTimeout(timer);
    }, [typedChars, brands]);
    
    const handleDropdownClose = () => {
        setIsPopoverOpen(false);
        setTypedChars('');
    };

    return (
      <Card className="border-0">
        <CardContent className="space-y-2 mt-8">
          <div className="gap-7 mt-4 mb-6">
            <div className="mt-8">
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
                handleSliderChange("price", values)
              }
            />
            </div>
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
                handleSliderChange("milage", values)
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
                handleSliderChange("year", values)
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
          </div>
        </CardContent>

      </Card>
    );
  }