"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";

import { CarSearchFilter } from "./CarSearchFilter";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, PlusCircle, TrashIcon, XIcon } from "lucide-react";
import { FilterPayload } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import {
  Filter,
  types,
  typeProps,
  bodyTypes,
  Trucks,
  Busses
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
  fetchBrands, fetchAllCars,
} from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import usePremiumStatus from "@/hooks/usePremiumStatus";
import { getlocales } from "@/app/actions";
import { FiltersDictionary } from "@/types";

type CarSidebarProps = {
  paramFilters: FilterPayload;
  dispatch: Function;
  offerNumber: number;
  lang: "en" | "fr" | "it" | "de" | "pl" | "es" | "cz" | "nl" | "pt" | "ro"
};

const CarSidebar:React.FC<CarSidebarProps> = ({ paramFilters, dispatch, offerNumber, lang }) => {
  const [menu, setMenu] = useState<FiltersDictionary | null>(null)

  useEffect(() => {
    console.log(lang)
    async function fetchData() {
      try {
        const { filters } = await getlocales(lang)
        setMenu(filters)
      } catch (error) {
        console.error('Error fetching tools data:', error)
      }
    }

    if (!menu) {
      fetchData()
    }
  }, [lang, menu])
  
  const {isPremium, premiumThreshold} = usePremiumStatus();
  const variablePriceMin = isPremium ? premiumThreshold : 1000;
  const filterDefault: Filter = {
    type: "",
    price: [variablePriceMin, 1000000],
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
      tempFilters["price"] = [paramFilters.price_min || 1000, paramFilters.price_max || 1000000];
      tempFilters["milage"] = [paramFilters.mileage_min || 0, paramFilters.mileage_max || 500000];
      tempFilters["year"] = [paramFilters.min_year, paramFilters.max_year];
      tempFilters["accidentFree"] = paramFilters.accidentfree || false;
      tempFilters["sortBy"] = paramFilters.sortBy || "newestFirst";
      console.log(tempFilters)
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
    setFilters((prev) => ({
      ...prev,
      [id]: selectorValue,
    }));
  };
  const handleBrandCheckboxChange = (brand: brandsWithModelsData) => {
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


  useEffect(() => {
    if (exists) {
      setTimeout(() => {
        setExists(false);
      }, 3000);
    }
  }, [exists])

  useEffect(() => {
    if (maximumFilters) {
      setTimeout(() => {
        setMaximumFilters(false);
      }, 3000);
    }
  }, [maximumFilters])

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
        price_min:  filters.price[0] || variablePriceMin,
        price_max: filters.price[1] || 1000000,
        mileage_min: filters.milage[0] || 0,
        mileage_max: filters.milage[1] || 500000,
        min_year: filters.year[0] || 1975,
        max_year: filters.year[1] || 2023,
        accident_free: filters.accidentFree || false,
        sortBy: filters.sortBy || "newestFirst"
      }
  
      const queryParam = Object.keys(payloadFilter)
      .map((key) => `${key}=${encodeURIComponent((payloadFilter as any)[key] || '')}`)
      .join('&');
      setPayloadFilters(queryParam)
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

  const handleDelete = (index?: number) => {
    if (!index) return;
    const temp = [...filterBrands];
    temp.splice(index, 1);
    setFilterBrands(temp);
  }

  const [currentModels, setCurrentModels] = useState<number>(10);
  const showMore = () => {
    setCurrentModels((prev) => prev + 10);
  }
  return (
    <div className="flex flex-col space-y-4 w-full p-4 px-6 bg-primary-foreground border border-gray-300 shadow-lg rounded-lg">
      <Label htmlFor="filter1" className="font-bold">
        Type
      </Label>
      <Select
        onValueChange={(selectorValue) =>
          handleSelectorChange("type", selectorValue)
        }
      >
        <SelectTrigger className="mb-2" currentValue={filters.type}>
          Chose Type
        </SelectTrigger>
        <SelectContent>
          {types.map((item: typeProps, index: number) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

  {filters.type === "Trucks" ? (
        <>  <Label htmlFor="filter1" className="font-bold">
          Body Type
        </Label>
        <Select
          onValueChange={(selectorValue) =>
            handleSelectorChange("carType", selectorValue)
          }
        >
          <SelectTrigger className="mb-2" currentValue={filters.vehicleBody}>
            Type
          </SelectTrigger>
          <SelectContent>
            {Trucks.map((item: string, index: number) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </>
  ) :
 filters.type === "Busses" ? (
    <>  <Label htmlFor="filter1" className="font-bold">
    Body Type
  </Label>
  <Select
    onValueChange={(selectorValue) =>
      handleSelectorChange("carType", selectorValue)
    }
  >
    <SelectTrigger className="mb-2" currentValue={filters.vehicleBody}>
      Type
    </SelectTrigger>
    <SelectContent>
      {Busses.map((item: string, index: number) => (
        <SelectItem key={index} value={item}>
          {item}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  </>
  )
  : 
  (
    <>
          <Label htmlFor="filter1" className="font-bold">
        Category
      </Label>
      <Select
        onValueChange={(selectorValue) =>
          handleSelectorChange("vehicleBody", selectorValue)
        }
      >
        <SelectTrigger className="mb-2" currentValue={filters.vehicleBody}>
         Choose Category
        </SelectTrigger>
        <SelectContent>
          {bodyTypes.map((item: string, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
  }

      <CarSearchFilter
        dict={menu}
        handleOfferNumbers={handleOfferNumbers}
        filter={filters}
        handleSliderChange={handleSliderChange}
        handleSelectorChange={handleSelectorChange}
      />

      <Separator />

      <div className="flex items-center justify-between">
        <div className="relative">
          <Label className="text-l font-semibold flex flex-row">
           {menu?.fromDealer || "From Dealer"}
            <div className="group inline-block ml-2 relative">
              <SvgIcon
                alt="?"
                filepath="/icons/question-mark.svg"
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
            {menu?.accidentFree || "Accident Free"}
            <div className="group inline-block ml-2 relative">
              <SvgIcon
                alt="?"
                filepath="/icons/question-mark.svg"
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
        <h2 className="text-l font-semibold mt-2 mb-2">{menu?.brandAndModel || "Brand and model"}</h2>
      </div>

      <Accordion type="multiple" className="w-full">
        {filterBrands.map((brand, index) => (
          <div className="flex" key={"accordion" + brand.brand}>
            <AccordionItem
              className=" border-none"
              key={index}
              value={`item-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
            <Checkbox
              className="mr-2"
              checked={brand.checkedAll}
              onCheckedChange={() => handleBrandCheckboxChange(brand)}
            />
              <AccordionTrigger isSideBar={true} handleDelete={() => handleDelete(index)} index={index} className="p-0 flex flex-grow flex justify-between items-center">
              <Label className="text-l text-foreground leading-none ml-2">
        {brand.brand}
      </Label>
              </AccordionTrigger>
              </div>
              <Button onClick={() => handleDelete?.(index)} className="bg-primary-foreground p-2 rounded hover:bg-gray-200 transition duration-150 shadow-none">
        <TrashIcon height={16} width={16} className="text-red-500"/>
      </Button>

              </div>
              <AccordionContent
    className={`${brand.checkedAll ? "animate-accordion-down" : "animate-accordion-up"}`}
  >
    {brand.models.slice(0, currentModels).map((model, modelIndex) => (
      <div
        key={modelIndex}
        className="flex items-center space-x-2 my-2 pl-4 text-foreground"
      >
        <Checkbox
          id={`${brand.brand}-${model.name}`}
          checked={model.checked}
          onCheckedChange={() => handleModelCheckboxChange(brand, model)}
        />
        <label className="text-l font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {model.name}
        </label>
      </div>
    ))}

    <div className="flex justify-between items-center">
      {brand.models.length > currentModels && (
        <Label
          onClick={() => setCurrentModels(prev => prev + 10)}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Show More Models
        </Label>
      )}

      {currentModels > brand.models.length && (
        <Label
          onClick={() => setCurrentModels(10)}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Show Less Models
        </Label>
      )}
    </div>
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

    <span className={exists || maximumFilters ? "text-red-500" : ""}>Add more brands</span>
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
                      if (newBrands.find((b) => b.brand === brand)) {
                        setExists(true);
                        return;
                      }
                      newBrands.push({
                        brand,
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
          <Label className="text-sm"> {offerNumber} offers </Label>
          <ChevronRight size={14} />
        </Button>
      </div>
      {exists && <span className="text-xs text-red-500 block transition-opacity">You ve already selected this brand</span>}
      {maximumFilters && <span className="text-xs text-red-500 block transition-opacity">You cannot select more than 5 car brands</span>}
    </div>
  );
};

export default CarSidebar;
