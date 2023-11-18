import { setModel } from '@/app/GlobalRedux/CreateCar/CreateCarSlice';
import { useAppStore } from '@/app/GlobalRedux/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { InputField } from '@/components/ui/input-field';
import { Label } from '@/components/ui/label';
import { ChevronRight, SearchIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react'

interface VehicleCreateParams {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
}

const ModelSelection = ({ onNext, onPrevious }: {onNext: () => void, onPrevious: () => void}) => {
  
  const [search, setSearch] = useState<string>('');
  const [showSimplified, setShowSimplified] = useState<boolean>(false);
  const [store, dispatch] = useAppStore(
    (state) => state?.createCarProgress
  )

  const sortedModelsWithHeadings = useMemo(() => {
    if (!store?.models || !store.models.length) return [];
  
    const sortedModels: string[] = [...store.models].sort();
    let lastLetter = '';
    let groupedModels: string[][] = [];
  
    sortedModels.forEach(model => {
      const firstLetter = model[0].toUpperCase();
      if (firstLetter !== lastLetter) {
        // Start a new group with the first letter
        groupedModels.push([firstLetter]);
        lastLetter = firstLetter;
      }
      groupedModels[groupedModels.length - 1].push(model);
    });
    if (search) {
      // Filter the groupedBrands based on the search term
      groupedModels = groupedModels.filter(grouped => 
        grouped.some(model => model.toLowerCase().includes(search.toLowerCase()))
      );
    }
    console.log(groupedModels);
    return groupedModels;
  }, [store, search]);

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
    <CardContent className={`border shadow-md border-rounded w-full p-8 ${showSimplified ? '' : 'column-container'}`} >
  {sortedModelsWithHeadings.map((group, index) => (
      <div key={index} className="break-inside-avoid mb-4">
        {group.map((model, index) => (
          <>
     {!index ? <Label className="text-xl font-bold text-primary">{group[0]}</Label>
     
     : <div key={model} className="my-1">
     <Checkbox
       isRounded={true}
       id={`model-${model}`}
       name="model"
       checked={store?.model === model}
       onClick={() => dispatch(setModel(model))}
       className="mr-2"
     />
     <label htmlFor={`model-${model}`}>{model}</label>
   </div>} 

          </>
        ))}
      </div>
    ))
  }
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

export default ModelSelection