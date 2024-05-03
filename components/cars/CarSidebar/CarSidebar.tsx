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
import { Filter } from "../../../interfaces/cars/cars";
import { useRouter, useSearchParams } from "next/navigation";
import { getCarModelsById, getNormalizedParams } from "../../../utils/cars";
import { parseModels } from "../../../utils/models";
type CarSidebarProps = {
  offerNumber: number;
  pageText: FiltersDictionary;
  carModels: Record<string, string[]>;
};

const CarSidebar: FC<CarSidebarProps> = ({
  offerNumber,
  pageText,
  carModels,
}) => {
  console.log("🚀 ~ carModels:", carModels);
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
  const addModel = (make: string, model: string) => {
    const currentModels = filters.makeModels?.[make] || [];
    currentModels.push(model);
    const newFilters = {
      ...filters,
      makeModels: {
        [make]: currentModels,
      },
    };
    setFiltersAndRedirect(newFilters as Filter);
  };
  // useEffect(() => {
  //   // rerender when filters change
  //   const newURLParams = new URLSearchParams(getNormalizedParams(filters));
  //   console.log("🚀 ~ useEffect ~ filters", filters);
  //   console.log("🚀 ~ newURLParams:", newURLParams.toString());
  //   const newURLStr = newURLParams.toString();
  //   const currentURLStr = new URLSearchParams(searchParams).toString();
  //   if (currentURLStr !== newURLStr) {
  //     console.log("🚀 ~ useEffect ~ newURLStr:", newURLStr);
  //     console.log("🚀 ~ useEffect ~ currentURLStr:", currentURLStr);
  //     // replace(`cars?${newURLStr}`);
  //     //   if (newURLStr !== currentURLStr) {
  //     //     replace(`cars?${newURLStr}`);
  //     //   }
  //     // }
  //     // replace(newURLParams.toString());
  //   }
  // }, [filters, paramFilters, replace, searchParams]);
  return (
    <div className="flex flex-col space-y-4 w-full p-4 px-6 bg-primary-foreground border border-gray-300 shadow-lg rounded-lg overflow-visible">
      <Label htmlFor="filter1" className="font-bold">
        Type
      </Label>
      <Select
        onValueChange={(selectorValue) =>
          handleSelectorChange("type", selectorValue)
        }
      >
        <SelectTrigger className="mb-2" currentValue={filters.type}>
          Choose Type
        </SelectTrigger>
        <SelectContent>
          {types.map((item: typeProps, index: number) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CarBodyType
        vehicleType={filters.type}
        currentVehicleBody={filters.body_type}
        handleSelectorChange={handleSelectorChange}
      />

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

      <ModelSelector
        pageText={pageText}
        carModels={carModels}
        setFilterValue={setFilterValue}
        offerNumber={offerNumber}
      />
    </div>
  );
};

export default CarSidebar;
