"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { CarSearchFilter } from "./CarSearchFilter";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, PlusCircle } from "lucide-react";
import { FilterPayload } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import {
  Filter,
  types,
  typeProps,
  bodyTypes,
  fuelTypes,
} from "../landing/types";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, } from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import SvgIcon from "../SvgIcon";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import {
  fetchAllCarMakes,
  fetchBrands, fetchAllCars,
 CarResult,
} from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

type CarSidebarProps = {
  paramFilters: FilterPayload;
  dispatch: Function; // Adjust the type as per the function you're passing
};

const CarSidebar:React.FC<CarSidebarProps> = ({ paramFilters, dispatch }) => {
  const filterDefault: Filter = {
    type: "",
    price: [1000, 1000000],
    milage: [0, 500000],
    year: [1975, 2023],
    brandAndModel: "",
    vehicleBody: "",
    fuelType: "",
  };

  type modelType = {
    name: string;
    checked: boolean;
  };

  type brandsWithModelsData = {
    brand: string;
    checkedAll: boolean;
    models: modelType[];
  };

  const brandsWithModels: brandsWithModelsData[] = [
    {
      brand: "Toyota",
      checkedAll: false,
      models: [
        { name: "Camry", checked: false },
        { name: "Corolla", checked: false },
        { name: "Prius", checked: false },
        { name: "RAV4", checked: false },
        { name: "4Runner", checked: false },
        { name: "Tacoma", checked: false },
      ],
    },
    {
      brand: "Honda",
      checkedAll: false,
      models: [
        { name: "Accord", checked: false },
        { name: "Civic", checked: false },
        { name: "Fit", checked: false },
        { name: "CR-V", checked: false },
        { name: "Pilot", checked: false },
      ],
    },
  ];

  const [offers, setOffers] = useState<number>(0);
  const [filterBrands, setFilterBrands] =
    useState<brandsWithModelsData[]>([]);
  const [filters, setFilters] = useState<Filter>(filterDefault);
  const [maximumFilters, setMaximumFilters] = useState<boolean>(false);
  const [exists, setExists] = useState<boolean>(false);
  const [carBrands] = useAppStore(
    (state) => state?.carFiltersAndResults.brandsWithModels
  );
  const brandsList = useMemo(() => {
    if (!carBrands) return [];
    return Object.keys(carBrands);
  }
  , [carBrands])
    
  useEffect(() => {
    if (!carBrands) return
    Object.entries(carBrands).map(([key, value]) => {
      if (key === paramFilters.make) {
        setFilterBrands((prev) => {
          const newBrands = [...prev];
          newBrands.push({
            brand: key,
            checkedAll: false,
            models: value.map((model) => ({
              name: model,
              checked: false,
            })),
          });
          return newBrands;
        })
      }
    }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carBrands])

    useEffect(() => {
      dispatch(fetchBrands())

      const tempFilters = {...filters};
      tempFilters["brandAndModel"] = paramFilters.make + " - " + paramFilters.model;
      tempFilters["type"] = paramFilters.type;
      tempFilters["vehicleBody"] = paramFilters.body_type || "";
      tempFilters["fuelType"] = paramFilters.fueltype || "";
      tempFilters["price"] = [paramFilters.price_min, paramFilters.price_max];
      tempFilters["milage"] = [paramFilters.mileage_min, paramFilters.mileage_max];
      tempFilters["year"] = [paramFilters.min_year, paramFilters.max_year];
      tempFilters["accidentFree"] = paramFilters.accidentfree || false;
      setFilters(tempFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramFilters])

  const handleOfferNumbers = (offerNumber: number) => {
    setOffers(offerNumber);
  };
  const handleSliderChange = (id: string, values: [number, number]) => {
    setFilters((prev) => ({ ...prev, [id]: values }));
  };

  const handleSelectorChange = (id: string, selectorValue: string) => {
    console.log(id, selectorValue);
    setFilters((prev) => ({
      ...prev,
      [id]: selectorValue,
    }));
  };
  const handleBrandCheckboxChange = (brand: brandsWithModelsData) => {
    console.log(brand);
    const updatedBrands = filterBrands.map((b) => {
      if (b.brand === brand.brand) {
        return {
          ...b,
          checkedAll: !b.checkedAll,
          models: b.models.map((m) => ({ ...m, checked: !b.checkedAll })),
        };
      }
      return b;
    });
    setFilterBrands(updatedBrands);
  };

  const handleModelCheckboxChange = (
    brand: brandsWithModelsData,
    model: modelType
  ) => {

    const updatedBrands = filterBrands.map((b) => {
      if (b.brand === brand.brand) {
        const updatedModels = b.models.map((m) => {
          if (m.name === model.name) {
            return { ...m, checked: !m.checked };
          }
          return m;
        });
        const areAllModelsChecked = updatedModels.every((m) => m.checked);
        return { ...b, models: updatedModels, checkedAll: areAllModelsChecked };
      }
      return b;
    });
    setFilterBrands(updatedBrands);
  };

  const deleteBrand = (brand: string) => {
    
  }

  const [payloadFilters, setPayloadFilters] = useState<string>("");
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  
    const sendRequest = () => {
      const splitData = filters.brandAndModel?.split(" - ") || [];
      const make = splitData[0];
      const model = splitData[1];
      const payloadFilter = {
        from_dealer: filters.fromDealer || false,
        max_results: 100000,
        body_type: filters.vehicleBody || "",
        make: make || "",
        model: model || "",
        fueltype: filters.fuelType || "",
        price_min:  filters.price[0] || 1000,
        price_max: filters.price[1] || 1000000,
        mileage_min: filters.milage[0] || 0,
        mileage_max: filters.milage[1] || 500000,
        min_year: filters.year[0] || 1975,
        max_year: filters.year[1] || 2023,
        accident_free: filters.accidentFree || false,

      }
  
      const queryParam = Object.keys(payloadFilter)
      .map((key) => `${key}=${encodeURIComponent((payloadFilter as any)[key] || '')}`)
      .join('&');
      setPayloadFilters(queryParam)
      console.log(payloadFilter)
      dispatch(fetchAllCars(payloadFilter));
    }
  
    if (filters) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(sendRequest, 1000);
    }
  
    return () => {
      clearTimeout(debounceTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])
  return (
    <div className="flex flex-col space-y-4 w-full p-4 px-6 bg-white border border-gray-300 shadow-lg rounded-lg">
      <h2 className="text-l font-semibold mt-2 mb-2">Filters</h2>
      <Label htmlFor="filter1" className="font-bold">
        Car Type
      </Label>
      <Select
        onValueChange={(selectorValue) =>
          handleSelectorChange("type", selectorValue)
        }
      >
        <SelectTrigger className="mb-2" currentValue={filters.type}>
          Car Type
        </SelectTrigger>
        <SelectContent>
          {types.map((item: typeProps, index: number) => (
            <SelectItem key={index} value={item.value}>
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label htmlFor="filter1" className="font-bold">
        Car Category
      </Label>
      <Select
        onValueChange={(selectorValue) =>
          handleSelectorChange("vehicleBody", selectorValue)
        }
      >
        <SelectTrigger className="mb-2" currentValue={filters.vehicleBody}>
          Category
        </SelectTrigger>
        <SelectContent>
          {bodyTypes.map((item: string, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CarSearchFilter
        handleOfferNumbers={handleOfferNumbers}
        filter={filters}
        handleSliderChange={handleSliderChange}
        handleSelectorChange={handleSelectorChange}
      />

      <Separator />

      <div className="flex items-center justify-between">
        <div className="relative">
          <Label className="text-l font-semibold flex flex-row">
            From Dealer
            <div className="group inline-block ml-2 relative">
              <SvgIcon
                alt="?"
                filepath="icons/question-mark.svg"
                width={16}
                height={16}
                name="question-mark-circle"
                className="text-primary-foreground shadow-md hover:cursor-pointer"
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
          onCheckedChange={(e) =>
            setFilters((prev) => ({ ...prev, fromDealer: !prev.fromDealer }))
          }
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="relative">
          <Label className="text-l font-semibold flex flex-row">
            Accident Free
            <div className="group inline-block ml-2 relative">
              <SvgIcon
                alt="?"
                filepath="icons/question-mark.svg"
                width={16}
                height={16}
                name="question-mark-circle"
                className="text-primary-foreground shadow-md hover:cursor-pointer"
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs px-2 py-1 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity  w-48 break-words">
                This is some info about the Accident free option.
              </span>
            </div>
          </Label>
        </div>

        <Checkbox
          className="mr-2"
          checked={filters.accidentFree}
          onCheckedChange={(e) =>
            setFilters((prev) => ({ ...prev, accidentFree: !prev.accidentFree }))
          }
        />
      </div>

      <Separator />

      <div>
        <h2 className="text-l font-semibold mt-2 mb-2">Brands and Models</h2>
      </div>

      <Accordion type="multiple" className="w-full">
        {filterBrands.map((brand, index) => (
          <div className="flex" key={"accordion" + brand.brand}>
            <Checkbox
              className="mr-2"
              checked={brand.checkedAll}
              onCheckedChange={() => handleBrandCheckboxChange(brand)}
            />
            <AccordionItem
              renderDeleteButton={(brand) => {
                return <button onClick={() => deleteBrand(brand)}>Delete</button>;
              }}
              className=" border-none mb-4"
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger className="p-0">
                <div className="flex justify-between items-center w-full text-foreground text-l">
                  <div className="flex mr-auto items-center">
                    <label className="text-l text-foreground leading-none	ml-2">
                      {brand.brand}
                    </label>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent
                className={`${
                  brand.checkedAll
                    ? "animate-accordion-down"
                    : "animate-accordion-up"
                }`}
              >
                {brand.models.map((model, modelIndex) => (
                  <div
                    key={modelIndex}
                    className="flex items-center space-x-2 my-2 pl-4 text-foreground"
                  >
                    <Checkbox
                      id={`${brand.brand}-${model.name}`}
                      checked={model.checked}
                      onCheckedChange={() =>
                        handleModelCheckboxChange(brand, model)
                      }
                    />

                    <label className="text-l font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {model.name}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>

      <div className="flex flex-row">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex-2 bg-secondary  hover:bg-gray-300 text-secondary-foreground mr-4">
          <Label className="flex items-center space-x-2 text-sm cursor-pointer p-2">
            <PlusCircle size={14}/>
            {
  maximumFilters ? (
    <span>You cannot select more than 5 car brands</span>
  ) :  (
    <span>Add more brands</span>
  )
}
          </Label>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 h-[200px] overflow-y-auto">
          <DropdownMenuGroup>
                {carBrands && Object.keys(carBrands).map((brand, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center space-x-2 my-2 pl-4 text-foreground"
                    onClick={() => {
                      const newBrands = [...filterBrands];
                      newBrands.push({
                        brand: brand,
                        checkedAll: false,
                        models: carBrands[brand].map((model) => ({
                          name: model,
                          checked: false,
                        })),
                      });
                      if (newBrands.length > 5) {
                        setMaximumFilters(true);
                        return;
                      }
                      setFilterBrands(newBrands);
                    }}
                  >
                    <label className="text-l font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {brand}
                    </label>
                  </DropdownMenuItem>
                ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
        </DropdownMenu>
        <Button className="flex-1">
          <Label className="text-sm"> {offers} offers </Label>
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
};

export default CarSidebar;
