/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter,  usePathname, useSearchParams } from 'next/navigation';

import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "../../ui/card";
import SvgIcon from "../../SvgIcon";
import { ChevronRight } from "lucide-react";
import RangeSlider from "../RangeSlider";
import {
  fetchBrands, fetchAllCars,
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
export type TabKeys = 'cars' | 'moto' | 'trucks' | 'busses';
type BrandEntry = [string, string[]];

type VirtualizedListProps = {
  entries: BrandEntry[];
  filter: Filter;
  toggleBrands: () => void;
  hidden: boolean;
  handleBrandClick: (brand: string) => void;
  handleSelectorChange: (tab: TabKeys, type: string, selectorValue: string) => void;
  handleModelClick: (model: string) => void;
};

interface GroupedEntries {
  [key: string]: [string, string[]][];
}


const VirtualizedList: React.FC<VirtualizedListProps> = React.memo(({ 
  entries,
  handleBrandClick,
  handleModelClick,
  toggleBrands,
  hidden,
}) => {
  const [showModels, setShowModels] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState("");
  const [typedChars, setTypedChars] = useState("");
  const [modelListTopPosition, setModelListTopPosition] = useState<number | undefined>(undefined);
  const [modelListBottomPosition, setModelListBottomPosition] = useState<number | undefined>(undefined);
  const [hoveringOverModels, setHoveringOverModels] = useState(false);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const brandRefs = entries.reduce((acc, [brand]) => {
    acc[brand] = React.createRef<HTMLDivElement>();
    return acc;
  }, {} as Record<string, React.RefObject<HTMLDivElement>>);

  let topPosition: number | undefined;
  if (hoveredBrand && brandRefs[hoveredBrand]?.current && brandRefs[hoveredBrand]) {
    topPosition = brandRefs[hoveredBrand]?.current?.offsetTop;
  }

  function scrollToBrand(brandElement: HTMLElement | null) {
    if (brandElement && brandElement.parentElement) {
        // Get the current scroll position of the container
        const containerScrollTop = brandElement.parentElement.scrollTop;

        // Determine the offset of the brandElement relative to its container
        const brandOffsetTop = brandElement.offsetTop;

        // Determine how much to adjust the scroll by
        const adjustment = 50; // You can adjust this value to set the preferred offset

        // Set the new scroll position
        brandElement.parentElement.scrollTop = brandOffsetTop - adjustment;
    }
}

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const char = event.key;
      if (['ArrowDown', 'ArrowUp', 'Space', 'x', 'f'].includes(char)) {
        event.preventDefault();
    }
      if (char.length === 1 && /[a-zA-Z]/.test(char)) {
  
        const newTypedChars = typedChars + char.toLowerCase();
   
        const matchingBrand = Object.keys(brandRefs).find(brand => brand.toLowerCase().startsWith(newTypedChars));
        if (matchingBrand && brandRefs[matchingBrand]?.current) {
          const brandElement = brandRefs[matchingBrand].current;
          scrollToBrand(brandElement);
        }
   
        setTypedChars(newTypedChars);
      }
   }
   

    function handleClickOutside(event: MouseEvent) {
      if (mainContainerRef.current && !mainContainerRef.current.contains(event.target as Node) && !hidden) {
        toggleBrands();
      }
    }
    
    if (!hidden) {
      document.addEventListener('keydown', handleKeyDown);
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hidden, typedChars]); 
  
  useEffect(() => {
    const clearCharsTimeout = setTimeout(() => {
      setTypedChars("");
    }, 1000);

    return () => {
      clearTimeout(clearCharsTimeout);
    };
  }, [typedChars]);
  const modelsDropdownRef = React.createRef<HTMLDivElement>();

  const sortedEntries = [...entries].sort((a, b) => a[0].localeCompare(b[0]));

  const groupedByLetter = sortedEntries.reduce<GroupedEntries>((acc, entry) => {
    const letter = entry[0][0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(entry);
    return acc;
  }, {});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mainContainerRef.current && !mainContainerRef.current.contains(event.target as Node) && !hidden) {
          toggleBrands();
      }
  }
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [hidden]);

  return (
    <div     className={`relative w-full bg-white border border-gray-200 rounded shadow-md transition-transform transition-opacity duration-300 ease-in-out transform ${
      hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
    }`}  ref={mainContainerRef}>

      <div className="w-full border-r h-[200px] absolute overflow-y-auto bg-white" 

>
{Object.entries(groupedByLetter).map(([letter, brandsForLetter]) => (
          <div key={letter}>
            <div className="font-bold text-xl p-2">{letter}</div>
            {brandsForLetter.map(([brand], brandIndex) => (
              <div
                key={brandIndex}
                ref={brandRefs[brand]}
                className="group relative hover:bg-gray-200 p-2 ml-1 cursor-pointer"
            
            onMouseEnter={() => {
              const brandRef = brandRefs[brand]?.current;
              if (brandRef) {
                  const container = brandRef.closest('.overflow-y-auto');
                  const brandTopPosition = brandRef.getBoundingClientRect().top;
                  const brandBottomPosition = brandRef.getBoundingClientRect().bottom;
                  const availableSpaceBelow = window.innerHeight - brandBottomPosition;
                  const availableSpaceAbove = brandTopPosition;
          
                  const dropdownHeight = modelsDropdownRef.current?.getBoundingClientRect().height || 0;
                  const adjustedTopPosition = brandRef.offsetTop - (container ? container.scrollTop : 0);
          
                  if (availableSpaceBelow < dropdownHeight && availableSpaceAbove < dropdownHeight) {
                      setModelListTopPosition(adjustedTopPosition);
                      setModelListBottomPosition(undefined);
                  } else if (availableSpaceBelow < dropdownHeight) {
                      setModelListTopPosition(adjustedTopPosition - dropdownHeight);
                      setModelListBottomPosition(undefined);
                  } else {
                      setModelListTopPosition(adjustedTopPosition);
                      setModelListBottomPosition(undefined);
                  }
              }
              setHoveredBrand(brand);
              setShowModels(true);
          }}
          
            onClick={() => handleBrandClick && handleBrandClick(brand)}
          >
        <Label>{brand}</Label>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showModels && (
            <div 
            className="absolute left-full mt-0 z-10 bg-white border border-gray-200 rounded shadow-md w-64 max-h-60 overflow-y-auto"
            style={{ top: modelListTopPosition, bottom: modelListBottomPosition }}
            onMouseEnter={() => setHoveringOverModels(true)}
            onMouseLeave={() => {
              setHoveringOverModels(false);
              setShowModels(false);
            }}
          >{entries.map(([brand, models]) => {
            if (brand === hoveredBrand) {
              return models.map((model, modelIndex) => (
                <div
                  key={modelIndex}
                  className="p-2 cursor-pointer hover:bg-gray-300"
                  onClick={() => handleModelClick && handleModelClick(`${brand} - ${model}`)}
                >
                  {model}
                </div>
              ));
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
});
VirtualizedList.displayName = "VirtualizedList";
export { VirtualizedList }


export const CarComponent = React.memo(function CarComponent ({
  handleSliderChange,
  filter,
  handleSelectorChange,
  handleOfferNumbers,
}: CarComponentProps) {
  const router = useRouter();
  const [carBrands, dispatch] = useAppStore(
    (state) => state?.carFiltersAndResults.brandsWithModels
  );

  const [carStore] = useAppStore(
    (state) => state?.carFiltersAndResults.filteredCars
  );

  const [entries, setEntries] = useState<[string, string[]][]>([]);
  const [brandsOpen, setBrandsOpen] = React.useState(false);
  const toggleBrandsOpen = useCallback(() => {
    setBrandsOpen(prevState => !prevState);
  }, []);

const handleModelClick = useCallback((model: string) => {
  handleSelectorChange("cars", "brandAndModel", model);
  toggleBrandsOpen();
}, [handleSelectorChange, toggleBrandsOpen]);

const handleBrandClick = useCallback((brand: string) => {
  handleSelectorChange("cars", "brandAndModel", brand);
  toggleBrandsOpen();
}, [handleSelectorChange, toggleBrandsOpen]);


  useEffect(() => {

    if(carBrands) {
      setEntries(Object.entries(carBrands || {}));
    }
  }, [carBrands]);

const handleNavigate = (e: any) => {
  e.preventDefault();
  router.push(`/cars?${payloadFilters}`);
}

const initMount = useRef(false); 

useEffect(() => {
  dispatch(fetchAllCars({
    max_results: 100000, 
    price_min: 0,
    price_max: 1000000,
    mileage_min: 0,
    mileage_max: 500000,
    min_year: 1975,
    max_year: 2023
  }))
  .then((res: any) => {
    initMount.current = true;
  });
  dispatch(fetchBrands())
 
}, [dispatch])  

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
      price_min:  0,
      price_max: filter.price[1] || 1000000,
      mileage_min: filter.milage[0] || 0,
      mileage_max: filter.milage[1] || 500000,
      min_year: filter.year[0] || 1975,
      max_year: filter.year[1] || 2023
    }

    const queryParam = Object.keys(payloadFilter)
    .map((key) => `${key}=${encodeURIComponent((payloadFilter as any)[key] || '')}`)
    .join('&');
    setPayloadFilters(queryParam)
    console.log(payloadFilter)
    dispatch(fetchAllCars(payloadFilter));
  }

  if (filter) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(sendRequest, 1000);
  }

  return () => {
    clearTimeout(debounceTimer);
  };
}, [filter])
  const [offers, setOffers] = useState<number>(0);
  useEffect(() => {
    
    if (carStore) {
      let i = 0;
      carStore.forEach((list: any[]) => list.forEach(() => i++))
      setOffers(i);
      handleOfferNumbers(i);
    }
  }, [carStore]);

  const [typedChars, setTypedChars] = useState("");

  // useEffect(() => {
  //   if (!typedChars || !carBrands) return;

  //   const matchedBrand = entries.find((brand) =>
  //     brand.toLowerCase().startsWith(typedChars.toLowerCase())
  //   );

  //   if (matchedBrand) {
  //     handleSelectorChange("cars", "brandAndModel", matchedBrand);
  //   }

  //   const timer = setTimeout(() => {
  //     setTypedChars("");
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [typedChars, entries]);

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

      <Select open={brandsOpen} onValueChange={(selectorValue) => {
        handleSelectorChange("cars", "brandAndModel", selectorValue);
        toggleBrandsOpen();
      }} value={filter.brandAndModel}>
  <SelectTrigger onClick={toggleBrandsOpen} currentValue={filter.brandAndModel}>{filter.brandAndModel || "Select a brand..."}</SelectTrigger>
  <VirtualizedList 
    hidden = {!brandsOpen}
    toggleBrands = {toggleBrandsOpen}
    entries={entries}
    filter={filter}
    handleSelectorChange={handleSelectorChange} 
    handleBrandClick={handleBrandClick} 
    handleModelClick={handleModelClick}
  />
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
 

        <Button onClick={handleNavigate}>
          {offers || 0} offers
          <ChevronRight />
        </Button>

      </CardFooter>
    </Card>
  );
});

