/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  fetchAllCars,
  fetchBrands,
} from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronRight, RotateCcw } from "lucide-react";
import SvgIcon from "../../SvgIcon";
import { Card, CardContent, CardFooter } from "../../ui/card";
import RangeSlider, { RangeSliderRef } from "../RangeSlider";

import { useAppStore } from "@/app/GlobalRedux/useStore";
import { FiltersDictionary } from "@/types";
import { CarComponentProps, Filter } from "../types";
import { VirtualizedList } from "./VirtualizedList";

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

export const CarComponent = React.memo(function CarComponent({
  handleSliderChange,
  dict,
  filter,
  lang,
  handleSelectorChange,
  handleOfferNumbers,
}: CarComponentProps) {
  const sliderRefs = useRef([
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
  ]);

  const router = useRouter();
  const [carBrands, dispatch] = useAppStore(
    (state) => state?.carFiltersAndResults.brandsWithModels
  );

  type BrandEntry = [
    string,
    { id: number; models: { name: string; id: number }[] }
  ];

  const [carStore] = useAppStore(
    (state) => state?.carFiltersAndResults.filteredCars
  );
  const pathname = usePathname();

  const [entries, setEntries] = useState<BrandEntry[]>([]);
  const [brandsOpen, setBrandsOpen] = React.useState(false);
  const toggleBrandsOpen = useCallback(() => {
    setBrandsOpen((prevState) => !prevState);
  }, []);

  const handleModelClick = useCallback(
    (model: string) => {
      handleSelectorChange("cars", "brandAndModel", model);
      toggleBrandsOpen();
    },
    [handleSelectorChange, toggleBrandsOpen]
  );

  const handleReset = () => {
    handleSliderChange("cars", "price", [1000, 1000000]);
    handleSliderChange("cars", "milage", [0, 500000]);
    handleSliderChange("cars", "year", [1975, 2023]);
    handleSelectorChange("cars", "brandAndModel", "");
    handleSelectorChange("cars", "vehicleBody", "");
    handleSelectorChange("cars", "fuelType", "");
    sliderRefs.current.forEach((ref) => {
      ref.current?.reset();
    });
  };

  const handleBrandClick = useCallback(
    (brand: string) => {
      handleSelectorChange("cars", "brandAndModel", brand);
      toggleBrandsOpen();
    },
    [handleSelectorChange, toggleBrandsOpen]
  );

  useEffect(() => {
    if (carBrands) {
      setEntries(Object.entries(carBrands || {}));
    }
  }, [carBrands]);

  const handleNavigate = (e: any) => {
    e.preventDefault();
    router.push(`${pathname}/cars?${payloadFilters}`);
  };

  const initMount = useRef(false);

  useEffect(() => {
    dispatch(
      fetchAllCars({
        max_results: 100000,
        price_min: 0,
        price_max: 1000000,
        mileage_min: 0,
        mileage_max: 500000,
        min_year: 1975,
        max_year: 2023,
      })
    ).then((res: any) => {
      initMount.current = true;
    });
    dispatch(fetchBrands());
  }, [dispatch]);

  const [payloadFilters, setPayloadFilters] = useState<string>("");

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;

    const sendRequest = () => {
      const splitData = filter.brandAndModel?.split(" - ") || [];
      const make = splitData[0];
      const model = splitData[1];
      const payloadFilter = {
        max_results: 100000,
        body_type: filter.vehicleBody || "",
        make: make || "",
        model: model || "",
        fueltype: filter.fuelType || "",
        price_min: 0,
        price_max: filter.price[1] || 1000000,
        mileage_min: filter.milage[0] || 0,
        mileage_max: filter.milage[1] || 500000,
        min_year: filter.year[0] || 1975,
        max_year: filter.year[1] || 2023,
      };

      const queryParam = Object.keys(payloadFilter)
        .map(
          (key) =>
            `${key}=${encodeURIComponent((payloadFilter as any)[key] || "")}`
        )
        .join("&");

      setPayloadFilters(queryParam);
      dispatch(fetchAllCars(payloadFilter));
    };

    if (filter) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(sendRequest, 1000);
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [filter]);
  const [offers, setOffers] = useState<number>(0);
  useEffect(() => {
    if (carStore) {
      let i = 0;
      carStore.forEach((list: any[]) => list.forEach(() => i++));
      setOffers(i);
      handleOfferNumbers(i);
    }
  }, [carStore]);
  return (
    <Card className="border-0 bg-background">
      <CardContent className="space-y-2 mt-8">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mt-4 mb-6">
          <RangeSlider
            ref={sliderRefs.current[0]}
            value={filter.price}
            fixedLowerText="1000 €"
            fixedUpperText="1000000 €"
            filename="banknote.svg"
            id="price"
            min={1000}
            max={1000000}
            step={1000}
            label={dict?.price || "Price"}
            onValueChange={(values) =>
              handleSliderChange("cars", "price", values)
            }
          />
          <RangeSlider
            ref={sliderRefs.current[1]}
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
              handleSliderChange("cars", "milage", values)
            }
          />
          <RangeSlider
            ref={sliderRefs.current[2]}
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
              handleSliderChange("cars", "year", values)
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div
              className="flex items-center space-x-2"
              style={{
                minHeight: "2rem",
              }}
            >
              <Label htmlFor="filter1">{dict?.brandAndModel || "Model"}</Label>
              <SvgIcon
                filepath="icons/tick.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>

            <Select
              open={brandsOpen}
              onValueChange={(selectorValue) => {
                handleSelectorChange("cars", "brandAndModel", selectorValue);
                toggleBrandsOpen();
              }}
              value={filter.brandAndModel}
            >
              <SelectTrigger
                onClick={toggleBrandsOpen}
                currentValue={filter.brandAndModel}
              >
                {filter.brandAndModel || "Select a brand..."}
              </SelectTrigger>
              <VirtualizedList
                dict={dict}
                hidden={!brandsOpen}
                toggleBrands={toggleBrandsOpen}
                entries={entries}
                filter={filter}
                handleSelectorChange={handleSelectorChange}
                handleBrandClick={handleBrandClick}
                handleModelClick={handleModelClick}
              />
            </Select>
          </div>

          <div className="space-y-1">
            <div
              className="flex items-center space-x-2"
              style={{
                minHeight: "2rem",
              }}
            >
              <Label htmlFor="filter2">{dict?.body || "Vehicle body"}</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("cars", "vehicleBody", selectorValue)
              }
              value={filter.vehicleBody}
            >
              <SelectTrigger currentValue={filter.vehicleBody}>
                {dict?.selectBody || "Select body..."}
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
            <div
              className="flex items-center space-x-2"
              style={{
                minHeight: "2rem",
              }}
            >
              <Label htmlFor="filter3">{dict?.fuel || "Fuel type"}</Label>
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
                {dict?.selectFuel || "Select fuel..."}
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
      <CardFooter className="grid place-items-end md:mt-0 mt-2">
        <div className="flex flex-row space-x-2">
          <Button variant="secondary" onClick={handleReset}>
            <span className="me-2">{dict?.reset || "Reset"}</span>
            <RotateCcw size={24} />
          </Button>
          <Button onClick={handleNavigate}>
            {offers || 0} {dict?.offers || "offers"}
            <ChevronRight />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});
