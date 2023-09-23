import React, {useState, useEffect, useRef }from 'react';
import {CarSearchFilter} from './CarSearchFilter'; 
import { Separator } from '@radix-ui/react-select';
import { ChevronRight, ChevronDown, ChevronUp} from "lucide-react";
import { Filter, FilterStates, TabKeys } from '../landing/types';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Checkbox } from '../ui/checkbox';

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { Label } from '../ui/label';
const CarSidebar = () => {

  const filterDefault: Filter = {
    type: "",
    price: [1000, 1000000],
    milage: [0, 500000],
    year: [1975, 2023],
    brandAndModel: "",
    vehicleBody: "",
    fuelType: "",
  };

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

type typeProps = {
  value: string 
  label: string
}

type modelType = {
  name: string
  checked: boolean
}

type brandsWithModelsData = {
  brand: string
  checkedAll: boolean
  models: modelType[]
}
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
      { name: "Tacoma", checked: false }
    ]
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
    ]
    }
]; 


  const types: typeProps[] = [
    {
      value: "cars",
      label: "Passenger Car",
    },
    {
      value: "moto",
      label: "Motorcycles",
    },
    {
      value: "trucks",
      label: "Trucks",
    },
    {
      value: "busses",
      label: "Busses",
    },
  ]

  const [offers, setOffers] = useState<number>(0);
  const [filterBrands, setFilterBrands] = useState<brandsWithModelsData[]>([]);
  const [filters, setFilters] = useState<Filter>(filterDefault);
  const handleOfferNumbers = (offerNumber: number) => {
    setOffers(offerNumber);
  };
  const handleSliderChange = (
    id: string,
    values: [number, number]
  ) => {
    setFilters((prev) => ({...prev, [id]: values}));
  };

const handleCheckboxChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    const { id } = event.target;
    console.log(id)
    // setFilters((prev) => ({...prev, [id]: checked}));
}
  const handleSelectorChange = (
    id: string,
    selectorValue: string
  ) => {
    console.log(id, selectorValue)
    setFilters((prev) => ({
      ...prev,
      [id]: selectorValue}));
  };
  const handleBrandCheckboxChange = (brand: brandsWithModelsData) => {
    const updatedBrands = filterBrands.map(b => {
  
      if (b.brand === brand.brand) {
        console.log(brand, b)
        return { ...b, checkedAll: !b.checkedAll, models: b.models.map(m => ({ ...m, checked: !b.checkedAll })) };
      }
      return b;
    });
    setFilterBrands(updatedBrands);
  };


  const handleModelCheckboxChange = (brand: brandsWithModelsData, model: modelType) => {
    // Logic to toggle the 'checked' property of the model
    const updatedBrands = filterBrands.map(b => {
      if (b.brand === brand.brand) {
        const updatedModels = b.models.map(m => {
          if (m.name === model.name) {
            return { ...m, checked: !m.checked };
          }
          return m;
        });
        const areAllModelsChecked = updatedModels.every(m => m.checked);
        return { ...b, models: updatedModels, checkedAll: areAllModelsChecked };
      }
      return b;
    });
    setFilterBrands(updatedBrands);
  };

  return (
    <div className="flex flex-col space-y-4 h-full h-[969px] p-4 px-6 bg-white border border-gray-300 shadow-lg">
    <h2 className='text-l font-semibold mt-2 mb-2'>Filters</h2>
    <Label htmlFor="filter1" className='font-bold'>Car Type</Label>
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
    <Label htmlFor="filter1" className='font-bold'>Car Category</Label>
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

<Separator/>

<div>
    <h2 className='text-l font-semibold mt-2 mb-2'>Brands and Models</h2>
</div>

<Accordion type="single" collapsible className="w-full">
  {brandsWithModels.map((brand, index) => (
    <>
      <AccordionItem key={index} value={`item-${index}`}>
      <AccordionTrigger>
        <div className="flex justify-between items-center w-full text-foreground text-l">
            <div className="flex mr-auto items-center space-x-2">
                <Checkbox
                    className='mr-2'
                    checked={brand.checkedAll}
                    onClick={() => handleBrandCheckboxChange(brand)}
                />
                <label className='text-l text-foreground'>{brand.brand}</label>
            </div>
            {brand.checkedAll ? <ChevronDown size={16}/> : <ChevronUp size={16}/>}
        </div>
    </AccordionTrigger>
        <AccordionContent>
          {brand.models.map((model, modelIndex) => (
            <div key={modelIndex} className="flex items-center space-x-2 my-2 pl-4 text-foreground">
              <Checkbox
                id={`${brand.brand}-${model.name}`}
                checked={model.checked}
                onChange={() => handleModelCheckboxChange(brand, model)}
              />
              <label className="text-l font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {model.name}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <Separator className="h-px bg-gray-300 mt-4 mb-4"/>
    </>
  ))}
</Accordion>

<div className="grid place-items-end">
          <Button>
            {offers} offers
            <ChevronRight />
          </Button>
        </div>

</div>
  );
}


export default CarSidebar;
