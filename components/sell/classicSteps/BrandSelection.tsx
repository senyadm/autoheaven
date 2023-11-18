import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, SearchIcon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import {
  fetchBrands,
} from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import { useAppStore } from "@/app/GlobalRedux/useStore";
interface VehicleCreateParams {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
}
import { setBrand, setModels } from '@/app/GlobalRedux/CreateCar/CreateCarSlice';
import { InputField } from '@/components/ui/input-field';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const BrandSelection = ({ onNext, onPrevious }: {onNext: () => void, onPrevious: () => void}) => {
const [search, setSearch] = useState<string>('');
const [showSimplified, setShowSimplified] = useState<boolean>(false);

const [brands, dispatchBrands] = useAppStore(
  (state) => state?.carFiltersAndResults?.brandsWithModels
)
const sortedBrandsWithHeadings = useMemo(() => {
  if (!brands) return [];

  // If brands is an object where keys are brand names, we first get the keys and sort them
  const sortedBrands: string[] = [...Object.keys(brands)].sort();
  let lastLetter = '';
  let groupedBrands: string[][] = []; // An array of arrays of strings

  sortedBrands.forEach(brand => {
    const firstLetter = brand[0].toUpperCase();
    if (firstLetter !== lastLetter) {
      // Start a new group with the first letter
      groupedBrands.push([firstLetter]);
      lastLetter = firstLetter;
    }
    groupedBrands[groupedBrands.length - 1].push(brand);
  });
  if (search) {
    // Filter the groupedBrands based on the search term
    groupedBrands = groupedBrands.filter(grouped => 
      grouped.some(brand => brand.toLowerCase().includes(search.toLowerCase()))
    );
  }
  console.log(groupedBrands);
  return groupedBrands;
}, [brands, search]);

const sortedAndGroupedBrands = useMemo(() => {
  if (!brands) return {};

  const sortedBrands: string[] = [...Object.keys(brands)].sort();

  // Group brands by the first letter
  const grouped = sortedBrands.reduce((acc: Record<string, string[]>, brand) => {
    const firstLetter = brand[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [brand];
    } else {
      acc[firstLetter].push(brand);
    }
    return acc;
  }, {});
  return grouped;
}, [brands]);


const [store, dispatch] = useAppStore(
  (state) => state?.createCarProgress
)
useEffect(() => {
  dispatchBrands(fetchBrands());
}, [dispatchBrands])

const handleBrand = (brand: string) => {
  if (!brands) return;

  dispatch(setBrand(brand));
  dispatch(setModels(brands[brand]));
}

  return (
 <Card className="w-full h-full mx-auto bg-white border-none shadow-none">
    <CardHeader>
    <div className="flex items-center border rounded-md pl-2 h-10 w-full">
              <SearchIcon className="w-5 h-5 text-gray-500" />
              <InputField
                className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md text-muted-foreground"
                placeholder="Search a brand"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
    </CardHeader>
    <CardContent className={`border shadow-md border-rounded w-full p-4 ${showSimplified ? '' : 'column-container'}`} >
  {showSimplified ? (
    // Simplified view for the first 6 brands
    Object.keys(sortedAndGroupedBrands).sort().slice(0, 6).map((brand) => (
      <div key={brand} className="flex items-center">
        <input
          type="checkbox"
          id={`simple-${brand}`}
          name="brand"
          checked={store?.brand === brand}
          onChange={() => dispatch(setBrand(brand))}
          className="mr-2"
        />
        <label htmlFor={`simple-${brand}`}>{brand}</label>
      </div>
    ))
  ) : (
    sortedBrandsWithHeadings.map((group, index) => (
      <div key={index} className="break-inside-avoid mb-4">
        {group.map((brand, index) => (
          <>
     {!index ? <Label className="text-xl font-bold text-primary">{group[0]}</Label>
     
     : <div key={brand} className="my-1">
     <Checkbox
       isRounded={true}
       id={`brand-${brand}`}
       name="brand"
       checked={store?.brand === brand}
       onClick={() => handleBrand(brand)}
       className="mr-2"
     />
     <label htmlFor={`brand-${brand}`}>{brand}</label>
   </div>} 

          </>
        ))}
      </div>
    ))
  )}
</CardContent>
<CardFooter className="flex justify-between">
  <Button
    onClick={onPrevious}
    className="mt-4 bg-white text-primary border-primary"
  >
    Previous
  </Button>
  <Button
    onClick={() => setShowSimplified(!showSimplified)}
    className="mt-4 bg-primary text-white disabled:opacity-50"
  >
    {showSimplified ? 'Full' : 'Simplified'}
  </Button>
  <Button
    disabled={!store?.brand}
    onClick={() => onNext()}
    className="mt-4 bg-primary text-white disabled:opacity-50"
  >
    Continue
    <ChevronRight/>
  </Button>
</CardFooter>
  </Card>
  )
}

export default BrandSelection