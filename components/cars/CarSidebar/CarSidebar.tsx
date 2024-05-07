"use client";
import { FC, useState } from "react";
import { Label } from "../../ui/label";
import CarSearchFilter from "./CarSearchFilter";
import { Separator } from "@/components/ui/separator";
import { HelpCircle } from "lucide-react";
import { types, typeProps } from "../../landing/types";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import CarBodyType from "../CarBodyType";
import ModelSelector from "./ModelSelector";
import { FiltersDictionary } from "@/types";
import { Checkbox } from "../../ui/checkbox";
import { Filter, VehicleType } from "../../../src/shared/model/params";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getCarModelsById,
  getNormalizedParams,
} from "../../../src/shared/api/cars";
import { vehicleTypes } from "../../../src/entities/vehicle/model/vehicle";
import { Make, MakeModelById } from "../../../src/shared/model";
import { MotoMake, MotoType } from "../../../src/entities/vehicle/model/moto";
import TypeSelect from "../../../src/entities/vehicle/ui/TypeSelect";
import MakeSelect from "../../../src/entities/vehicle/ui/MakeSelect";

type CarSidebarProps = {
  offerNumber: number;
  pageText: FiltersDictionary;
  vehicleUIData:
    | {
        models: Record<string, Make>;
        carModelsById: MakeModelById;
      }
    | {
        makes: MotoMake[];
        types: MotoType[];
      };
};
const typeLabel = {
  [VehicleType.Car]: "Passenger Car",
  [VehicleType.Bus]: "Bus",
  [VehicleType.Moto]: "Motorcycle",
  [VehicleType.Truck]: "Truck",
};
const CarSidebar: FC<CarSidebarProps> = ({
  offerNumber,
  pageText,
  vehicleUIData,
}) => {
  const { types, makes, models } = vehicleUIData;
  console.log("🚀 ~ carModels:", models);
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  function prepParams() {
    const normalized = getNormalizedParams(Object.fromEntries(searchParams));

    return normalized;
  }
  const paramFilters = prepParams();
  const [filters, setFilters] = useState<Filter>(paramFilters);
  console.log("🚀 ~ filters:", filters);
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
  // TODO: change so that URL can look like
  // https://www.aaaauto.eu/used-cars#makes=15-75&models-15=1437-2128-2214&models-75=33

  return (
    <div className="flex flex-col space-y-4 w-full p-4 px-6 bg-primary-foreground border border-gray-300 shadow-lg rounded-lg overflow-visible">
      <Label htmlFor="filter1" className="font-bold">
        Vehicle
      </Label>
      <Select
        onValueChange={(selectorValue) =>
          setFiltersAndRedirect({ type: selectorValue as VehicleType })
        }
      >
        <SelectTrigger className="mb-2" currentValue={typeLabel[filters.type]}>
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
          type={filters.type}
          filters={filters}
          types={types}
          handleSelectorChange={handleSelectorChange}
        />
      )}
      {makes && (
        <MakeSelect
          makes={makes}
          handleSelectorChange={handleSelectorChange}
          filters={filters}
        />
      )}

      {filters.type === VehicleType.Car && (
        <CarBodyType
          vehicleType={filters.type}
          currentVehicleBody={filters.body_type}
          handleSelectorChange={handleSelectorChange}
        />
      )}

      <CarSearchFilter
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
          checked={filters.fromDealer}
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
          checked={filters.accidentfree}
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
        />
      )}
    </div>
  );
};

export default CarSidebar;
