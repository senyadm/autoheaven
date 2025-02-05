"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Label } from "../../../../components/ui/label";
import CarSearchFilter from "../../../../components/cars/CarSidebar/CarSearchFilter";
import { HelpCircle } from "lucide-react";

import { Checkbox } from "../../../../components/ui/checkbox";
import { Filter, VehicleType } from "../../../shared/model/params";
import { useRouter, useSearchParams } from "next/navigation";
import { TypeSelect, MakeSelect, ModelSelect } from "../../../entities/vehicle";
import {
  FullPageParams,
  getUriFromFilters,
  SetFiltersOpts,
} from "../../../shared/utils/params";
import VehicleTypeSelect from "../../../entities/vehicle/ui/VehicleTypeSelect";
import { cn } from "../../../shared/utils/cn";
import VehicleTypeTabButtons from "./VehicleTypeTabButtons";
import { getFilterData } from "../../../features/search-vehicles";
import LinkLikeButton from '@/src/shared/ui/LinkLikeButton';
import { useAppSelector } from '@/app/GlobalRedux/store';

type CarSidebarProps = {
  params: FullPageParams;
  mode: "default" | "compact";
  isFetchInstant?: boolean;
};



const CarSidebar: FC<CarSidebarProps> = ({
  params,
  mode = "default",
  isFetchInstant = true,
}) => {
 
  const { country, city, vehicleType, make, model } = params;
  const [vehicleUIData, setVehicleUIData] = useState<any>({});
 const pageText = useAppSelector((state) => state.pageData.dict?.filters);
  const redirectURI = useRef( getUriFromFilters({...params, vehicleType: VehicleType.Car}) );

  const { types, makes, models } = vehicleUIData;
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filter>({
    vehicleType: vehicleType || VehicleType.Car,
    price_min: Number(searchParams.get("price_min")) || 1000,
    price_max: Number(searchParams.get("price_max")) || 1000000,
    mileage_min: Number(searchParams.get("mileage_min")) || 0,
    mileage_max: Number(searchParams.get("mileage_max")) || 2000000,
    year_min: Number(searchParams.get("year_min")) || 1975,
    year_max: Number(searchParams.get("year_max")) || 2024,
    fromDealer: Boolean(searchParams.get("fromDealer")) || false,
    accidentfree: Boolean(searchParams.get("accidentfree")) || false,
    make: make,
    model: model,
    make_id: searchParams.get("make_id") || "",
    type: searchParams.get("type") || "",
    type_id: searchParams.get("type_id") || "",
    sortBy: searchParams.get("sortBy") || "newestFirst",
  });
  useEffect(() => {
    async function fetchFilterData() {
      const { vehicleUIData } = await getFilterData(
        filters.vehicleType,
        params.lang
      );
      setVehicleUIData(vehicleUIData);
    }
    fetchFilterData();
  }, [params.vehicleType, params.lang, filters.vehicleType]);


  const setFiltersAndRedirect = useCallback(
    (newFilters: Filter) => {
      setFilters(newFilters);
      replace(redirectURI.current);
    },
    [replace]
  );
  const setFiltersFn = useCallback(
    (newFilters: Filter, opts?: SetFiltersOpts) => {
      let fullFilters = { ...params, ...newFilters };
      if (params.vehicleType && (params.vehicleType !== newFilters.vehicleType)) {
        // delete fullFilters.make;
        // delete fullFilters.model;
        fullFilters.make = "";
        fullFilters.model = "";
      }
      const newUri = getUriFromFilters(fullFilters, opts);
      redirectURI.current = newUri;
      isFetchInstant
        ? setFiltersAndRedirect(newFilters)
        : setFilters(newFilters);
    },
    [isFetchInstant, params, setFiltersAndRedirect]
  );

  const handleSliderChange = (
    ids: [string, string],
    values: [number, number]
  ) => {
    const newFilters = { ...filters, [ids[0]]: values[0], [ids[1]]: values[1] };
    setFiltersFn(newFilters as Filter);
  };
  const setFilterValue = (id: keyof Filter, value: string) => {
    const newFilters = { ...filters, [id]: value };
    setFiltersFn(newFilters as Filter);
  };
  const handleSelectorChange = (id: keyof Filter, selectorValue: string) => {
    setFilterValue(id, selectorValue);
  };
  const handleCheckboxToggle = (id: keyof Filter) => {
    const newFilters = { ...filters, [id]: !filters[id] };
    setFiltersFn(newFilters as Filter);
  };

  return (
    <div
      className={cn(
        "flex flex-col  w-full p-4 px-6 bg-primary-foreground border border-gray-300 shadow-lg rounded-lg overflow-visible mx-auto ",
        mode === "compact"
          ? "z-10 mt-[19.5rem] max-w-[1152px]"
          : "max-w-[500px] "
      )}
    >
      <div className={cn("space-y-4", mode === "default" ? "" : "flex-col")}>
        {mode === "compact" && (
          <VehicleTypeTabButtons
            currentTab={filters.vehicleType}
            onTabClick={handleSelectorChange}
          />
        )}
        <div className={mode === "compact" ? "flex space-x-8" : "flex-col"}>
          {mode === "default" && (
            <VehicleTypeSelect
              onChange={setFiltersFn}
              vehicleType={filters.vehicleType}
            />
          )}

          {types && (
            <TypeSelect
              filters={filters}
              types={types}
              handleSelectorChange={handleSelectorChange}
            />
          )}
          {makes && (
            <MakeSelect
              makes={makes}
              onChange={setFiltersFn}
              filters={filters}
            />
          )}
          {models && (
            <ModelSelect
              models={models}
              filtersState={[filters, setFiltersFn]}
              pageText={pageText}
            />
          )}
        </div>
      </div>

      <CarSearchFilter
        filters={filters}
        handleSliderChange={handleSliderChange}
        orientation={mode === "default" ? "vertical" : "horizontal"}
      />

      <div
        className={
          mode === "compact"
            ? "lg:flex lg:flex-row flex-col space-y-1"
            : "flex-col space-y-3"
        }
      >
        <div
          className={cn(
            "flex items-center justify-between space-x-2",
            mode === "compact" ? " lg:mr-4" : ""
          )}
        >
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
        <div className="flex items-center justify-between space-x-2">
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
        {isFetchInstant || (
          <LinkLikeButton
            href={redirectURI.current}
            className="!ml-auto mr-0 w-full lg:w-auto"
          >
           {pageText?.offers || "See offers"}
          </LinkLikeButton>
        )}{" "}
        <LinkLikeButton href="listheaven" className='w-full lg:w-auto text-primary border bg-secondary hover:text-secondary'>ListHeaven</LinkLikeButton>
      </div>
    </div>
  );
};

export default CarSidebar;
