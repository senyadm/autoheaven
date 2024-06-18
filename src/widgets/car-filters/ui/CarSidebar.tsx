"use client";
import { FC, createRef, useEffect, useRef, useState } from "react";
import { Label } from "../../../../components/ui/label";
import CarSearchFilter from "../../../../components/cars/CarSidebar/CarSearchFilter";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, RotateCcw } from "lucide-react";
import { types, typeProps } from "../../../../components/landing/types";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import CarBodyType from "../../../../components/cars/CarBodyType";
import ModelSelector from "../../../../components/cars/CarSidebar/ModelSelector";
import { FiltersDictionary } from "@/types";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Filter, VehicleType } from "../../../shared/model/params";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getCarModelsById,
  getNormalizedParams,
} from "../../../shared/api/cars";
import { vehicleTypes } from "../../../entities/vehicle/model/vehicle";
import { Make, MakeModelById } from "../../../shared/model";
import { MotoMake, MotoType } from "../../../entities/vehicle/model/moto";
import TypeSelect from "../../../entities/vehicle/ui/TypeSelect";
import MakeSelect from "../../../entities/vehicle/ui/MakeSelect";
import { Button } from "@/components/ui/button";
import { RangeSliderRef } from "@/components/landing/RangeSlider";

type CarSidebarProps = {
  offerNumber: number;
  pageText: FiltersDictionary;
  isVehicleTypeAParam?: boolean;
  vehicleTypeState?: {
    type: VehicleType;
    isParam: boolean;
  };
  vehicleUIData:
    | {
        models: Record<string, Make>;
        carModelsById: MakeModelById;
      }
    | {
        makes: MotoMake[];
        types: MotoType[];
      };
  onOfferClick?: () => void;
};
const typeLabel = {
  [VehicleType.Car]: "Passenger Car",
  [VehicleType.Bus]: "Bus",
  [VehicleType.Moto]: "Motorcycle",
  [VehicleType.Truck]: "Truck",
};
const pageNameByVehicleType = {
  [VehicleType.Car]: "cars",
  [VehicleType.Bus]: "buses",
  [VehicleType.Moto]: "motorcycles",
  [VehicleType.Truck]: "trucks",
};
const CarSidebar: FC<CarSidebarProps> = ({
  offerNumber,
  pageText,
  vehicleUIData,
  isVehicleTypeAParam = true,
  vehicleTypeState = { type: VehicleType.Car, isParam: true },
  onOfferClick = null,
}) => {
  const sliderRefs = useRef([
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
  ]);

  const { types, makes, models } = vehicleUIData;
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  function prepParams() {
    const normalized = getNormalizedParams(Object.fromEntries(searchParams));

    return normalized;
  }
  const paramFilters = prepParams();
  const [filters, setFilters] = useState<Filter>({
    type: VehicleType.Car,
    price_min: 1000,
    price_max: 1000000,
    mileage_min: 0,
    mileage_max: 500000,
    year_min: 1975,
    year_max: 2023,
    fromDealer: false,
    accidentfree: false,
  });

  useEffect(() => {
    setFilters(paramFilters);
  }, []);

  const setFiltersAndRedirect = (newFilters: Filter) => {
    setFilters(newFilters);
    const normalizedFilters = getNormalizedParams(newFilters);
    // normalizedFilters.makeModels = ["M5", "M6"];
    const newURLParams = new URLSearchParams(normalizedFilters);
    replace(`cars?${newURLParams.toString()}`);
  };
  const handleSliderChange = (
    ids: [string, string],
    values: [number, number]
  ) => {
    const newFilters = { ...filters, [ids[0]]: values[0], [ids[1]]: values[1] };
    setFiltersAndRedirect(newFilters as Filter);
  };
  const setFilterValue = (id: keyof Filter, value: string) => {
    const newFilters = { ...filters, [id]: value };
    setFiltersAndRedirect(newFilters as Filter);
  };
  const handleSelectorChange = (id: keyof Filter, selectorValue: string) => {
    setFilterValue(id, selectorValue);
  };
  const handleCheckboxToggle = (id: keyof Filter) => {
    const newFilters = { ...filters, [id]: !filters[id] };
    setFiltersAndRedirect(newFilters as Filter);
  };

  const handleReset = () => {
    // const resetFilters = {
    //   ...filters,
    //   price_min: 1000,
    //   price_max: 1000000,
    //   mileage_min: 0,
    //   fromDealer: false,
    //   accitendfree: false,
    //   mileage_max: 500000,
    //   year_min: 1975,
    //   year_max: 2023,
    //   body_type: "",
    //   make_id: "",
    // };

    setFiltersAndRedirect({});

    // sliderRefs.current.forEach((ref) => {
    //   ref.current?.reset();
    // });
  };

  // TODO: change so that URL can look like
  // https://www.aaaauto.eu/used-cars#makes=15-75&models-15=1437-2128-2214&models-75=33

  return (
    <div className="flex flex-col space-y-4 w-full p-4 px-6 bg-primary-foreground border border-gray-300 shadow-lg rounded-lg overflow-visible">
      <div className="flex justify-between items-center">
        <Label htmlFor="filter1" className="font-bold">
          Vehicle
        </Label>
        <Button variant="ghost" onClick={handleReset}>
          <RotateCcw size={20} />
        </Button>
      </div>
      <Select
        value={filters.type}
        onValueChange={(selectorValue) => {
          if (vehicleTypeState.isParam) {
            setFiltersAndRedirect({ type: selectorValue as VehicleType });
          } else {
            replace(`${pageNameByVehicleType[selectorValue as VehicleType]}`);
            setFilters({});
          }
        }}
      >
        <SelectTrigger
          className="mb-2"
          currentValue={
            typeLabel[
              vehicleTypeState.isParam ? filters.type : vehicleTypeState.type
            ]
          }
        >
          Choose Type
        </SelectTrigger>
        <SelectContent>
          {vehicleTypes.map((item, index: number) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {types && (
        <TypeSelect
          filters={filters}
          types={types}
          handleSelectorChange={handleSelectorChange}
          carType={
            vehicleTypeState.isParam ? filters.type : vehicleTypeState.type
          }
        />
      )}
      {makes && (
        <MakeSelect
          makes={makes}
          handleSelectorChange={handleSelectorChange}
          filters={filters}
        />
      )}

      {/* No longer needed => replaced with types
      {filters.type === VehicleType.Car && (
        <CarBodyType
          vehicleType={filters.type}
          currentVehicleBody={filters.body_type}
          handleSelectorChange={handleSelectorChange}
        />
      )} */}

      <CarSearchFilter
        sliderRefs={sliderRefs}
        dict={pageText}
        filters={filters}
        handleSliderChange={handleSliderChange}
      />

      <Separator />

      <div className="flex items-center justify-between">
        <div className="relative">
          <Label className="text-l font-semibold flex flex-row">
            {pageText?.fromDealer || "From Dealer"}
            <div className="group inline-block ml-2 relative">
              <HelpCircle
                width={16}
                height={16}
                className="hover:cursor-pointer"
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs px-2 py-1 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity  w-48 break-words">
                This is some info about the From Dealer option.
              </span>
            </div>
          </Label>
        </div>

        <Checkbox
          className="mr-2"
          checked={filters.fromDealer || false}
          onCheckedChange={(e) => handleCheckboxToggle("fromDealer")}
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="relative">
          <Label className="text-l font-semibold flex flex-row">
            {pageText?.accidentFree || "Accident Free"}
            <div className="group inline-block ml-2 relative">
              <HelpCircle
                width={16}
                height={16}
                className="hover:cursor-pointer"
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs px-2 py-1 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity  w-48 break-words">
                This is some info about the Accident free option.
              </span>
            </div>
          </Label>
        </div>

        <Checkbox
          className="mr-2"
          checked={filters.accidentfree || false}
          onCheckedChange={(e) => handleCheckboxToggle("accidentfree")}
        />
      </div>

      <Separator />

      {models && (
        <ModelSelector
          pageText={pageText}
          carModels={models}
          setFilterValue={setFilterValue}
          offerNumber={offerNumber}
          onOfferClick={onOfferClick}
        />
      )}
    </div>
  );
};

export default CarSidebar;
