import React, {useState, useEffect, useRef }from 'react';
import {CarSearchFilter} from './CarSearchFilter'; 
import { Separator } from '@/components/ui/separator';
import { ChevronRight, PlusCircle} from "lucide-react";
import { Filter, types, typeProps, bodyTypes,fuelTypes} from '../landing/types';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Checkbox } from '../ui/checkbox';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '../ui/label';
import SvgIcon from '../SvgIcon';

const CarSidebar = () => {
  const questionMarkPath = "@/public/icons/question-mark.svg"
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



  const [offers, setOffers] = useState<number>(0);
  const [filterBrands, setFilterBrands] = useState<brandsWithModelsData[]>(brandsWithModels);
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
    console.log(brand)
    const updatedBrands = filterBrands.map(b => {
      if (b.brand === brand.brand) {
      
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
    <div className="flex flex-col space-y-4 w-full p-4 px-6 bg-white border border-gray-300 shadow-lg rounded-lg">
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


<div className='flex items-center justify-between'>
  <div className="relative">
    <Label className='text-l font-semibold flex flex-row'>
      From Dealer 
      <div className="group inline-block ml-2 relative">
        <SvgIcon alt='?' filepath='icons/question-mark.svg' width={16} height={16} name='question-mark-circle' className='text-primary-foreground shadow-md hover:cursor-pointer' />
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs px-2 py-1 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity  w-48 break-words">
          This is some info about the From Dealer option.
        </span>
      </div>
    </Label>
  </div>

  <Checkbox className='mr-2'
    checked={filters.fromDealer}
    onCheckedChange={(e) => setFilters((prev) => ({...prev, fromDealer: !prev.fromDealer}))}
  />
</div>



<Separator/>

<div>
    <h2 className='text-l font-semibold mt-2 mb-2'>Brands and Models</h2>

</div>

<Accordion type="multiple" className="w-full" >
  {filterBrands.map((brand, index) => (
    <>
      <AccordionItem key={index} value={`item-${index}`}>
      <AccordionTrigger >
        <div className="flex justify-between items-center w-full text-foreground text-l">
            <div className="flex mr-auto items-center space-x-2">
            <Checkbox
            className='mr-2'
            checked={brand.checkedAll}
            onCheckedChange={() => handleBrandCheckboxChange(brand)}
            
            />
                <label className='text-l text-foreground'>{brand.brand}</label>
            </div>
        </div>
    </AccordionTrigger>
    <AccordionContent className={`${brand.checkedAll ? 'animate-accordion-down' : 'animate-accordion-up'}`}>

          {brand.models.map((model, modelIndex) => (
            <div key={modelIndex} className="flex items-center space-x-2 my-2 pl-4 text-foreground">
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
        </AccordionContent>
      </AccordionItem>
    </>
  ))}
</Accordion>

<div className="flex flex-row">
  <Button className='flex-2 bg-secondary  hover:bg-gray-300 text-secondary-foreground mr-4'>
    <Label className='flex items-center space-x-2 text-sm cursor-pointer'>
      <PlusCircle size={14}/>
      <span>Add more brands</span> 
    </Label>
  </Button>
  <Button className='flex-1'>
   <Label className='text-sm'> {offers} offers </Label>
     <ChevronRight size={14}/>
  </Button>
</div>


</div>
  );
}


export default CarSidebar;
