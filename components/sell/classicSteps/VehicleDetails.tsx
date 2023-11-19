import { setDetails } from '@/app/GlobalRedux/CreateCar/CreateCarSlice';
import { useAppStore } from '@/app/GlobalRedux/useStore';
import { SketchPicker } from 'react-color';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { InputField } from '@/components/ui/input-field';
import { Label } from '@/components/ui/label';
import { ChevronRight, PenSquare, SearchIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { CarDetails } from '@/app/GlobalRedux/CreateCar/CreateCarSlice';
import { Input } from '@/components/ui/input';
import PhoneInput from 'react-phone-number-input'
import { Separator } from '@/components/ui/separator';
import 'react-phone-number-input/style.css'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SvgIcon from '@/components/SvgIcon';

const defaultCarDetails: CarDetails = {
  type: '',
  body_type: '',
  color: '',
  year: new Date().getFullYear(),
  mileage: 0,
  gearbox: '',
  price: 0,
  description: '',
  title: '',
  fueltype: '',
  accidentfree: false,
  imageurl: '',
  drivetrain: '',
  istop: false
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

const VehicleDetails = ({ onNext, onPrevious }: {onPrevious: () => void, onNext: (mode?: string) => void}) => {
  
  const [search, setSearch] = useState<string>('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState<string>(defaultCarDetails.body_type);
  const [selectedfuelType, setSelectedFuelType] = useState<string>(defaultCarDetails.fueltype);
  const [store, dispatch] = useAppStore(
    (state) => state?.createCarProgress
  )
  const [fileError, setFileError] = React.useState("");
  const [value, setValue] = useState<string | undefined>("")
  const [detailsData, setDetailsData] = useState<CarDetails>(defaultCarDetails);
  const [hidden, setHidden] = React.useState(false),
  toggle = () => setHidden(!hidden);

  const areDetailsValid = () => {
    return detailsData.type && detailsData.body_type && detailsData.color && detailsData.year && detailsData.description;

  };

  const sortedModelsWithHeadings = useMemo(() => {
    if (!store?.models || !store.models.length) return [];
  
    const sortedModels: string[] = [...store.models].sort();
    let lastLetter = '';
    let groupedModels: string[][] = [];
  
    sortedModels.forEach(model => {
      const firstLetter = model[0].toUpperCase();
      if (firstLetter !== lastLetter) {
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


  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    let errorMessage = "";
  
    if (files && files.length > 5) {
      errorMessage = "You can only upload up to 5 images.";
    } else if (files) {
      for (const file of files) {
        if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
          errorMessage = `The file type of ${file.name} is not allowed.`;
          break; // Exit the loop after the first error
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          errorMessage = `The file ${file.name} is too large.`;
          break; // Exit the loop after the first error
        }
      }
    }
  
    if (errorMessage) {
      setFileError(errorMessage);
      event.target.value = ''; // Reset the file input
    } else {
      setFileError("");
      // Process the files as required
    }
  };
  

  return (
<Card className="w-full mx-auto bg-white border-none shadow-none">
  <CardContent className="border shadow-md rounded w-full p-8 space-y-6">
    <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Vehicle body</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
            <Select
              name="body_type"
              value={detailsData.body_type}
              onValueChange={(selectorValue) => setDetailsData({...detailsData, body_type: selectorValue})}
            >
              <SelectTrigger currentValue={selectedBodyType}>
                Select body...
              </SelectTrigger>
              <SelectContent>
              {bodyTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
              </SelectContent>
            </Select>
            </div>
            <div className="space-y-2">
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
              name="fueltype"
              value={detailsData.fueltype}
              onValueChange={(selectorValue) => setDetailsData({...detailsData, fueltype: selectorValue})}
            >
              <SelectTrigger currentValue={detailsData.fueltype}>
                Select fuel...
              </SelectTrigger>
              <SelectContent>
              {fuelTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
              </SelectContent>
            </Select>
            </div>
            <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Price</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
      <Input className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
        type="number"
        id="year"
        name="year"
        placeholder="Price"
        value={store?.details?.price}
        onChange={(e) => setDetailsData({...detailsData, price: parseInt(e.target.value)})}
      />
      </div>
      <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Mileage</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
      <Input className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
        type="number"
        id="year"
        name="year"
        placeholder="Mileage"
        value={store?.details?.mileage}
        onChange={(e) => setDetailsData({...detailsData, mileage: parseInt(e.target.value)})}
      />
      </div>
            <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Year</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
      <Input className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
        type="number"
        id="year"
        name="year"
        placeholder="Year"
        value={store?.details?.year}
        onChange={(e) => setDetailsData({...detailsData, year: parseInt(e.target.value)})}
      />
      </div>
      <div className="space-y-2">
      <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Year</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
    <div className='flex justify-between flex-1'>
            <PhoneInput
                international
                defaultCountry="CZ"
                value={value}
                onChange={setValue}
                style={{ paddingLeft: '5px' }}
             
            />
        <Button className='self-end bg-white hover:bg-gray-300 text-secondary-foreground border border-gray-300 rounded-md mt-2 '> <PenSquare className='mr-2' size={16}/>Edit</Button>
    </div>
</div>
      <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Description</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
      <Textarea className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
        maxLength={500}
        id="desc"
        name="desc"
        placeholder="Say something about your car"
        value={store?.details?.description}
        onChange={(e) => setDetailsData({...detailsData, description: e.target.value})}
      />
      <div className="flex justify-end bottom-2 right-3 text-xs text-muted-foreground">
              {`${detailsData.description.length}/500`}
            </div>
      </div>
      <Separator/>
<div className='flex justify-between items-center'>
      <Label className=''>Accident Free</Label>
      <Checkbox
        id="accidentfree"
        name="accidentfree"
        checked={store?.details?.accidentfree || false}
        onClick={() => setDetailsData({...detailsData, accidentfree: !detailsData.accidentfree})}
        className="col-span-2"
      />
</div>
<Separator/>
<div className="grid w-full items-center gap-5">
      <Label htmlFor="picture">Pictures</Label>
      <div className="grid grid-cols-1 gap-4">   {fileError && (
        <div className="text-red-500 text-sm">
          {fileError}
        </div>
      )}
      <Input className={fileError ? 'border-red-500' : 'border-input'} id="picture" multiple onChange={handleFileSelection}  accept='image/png, image/jpeg'  type="file" />
      </div>
    </div>
      {/* <Select onValueChange={(selectorValue) => {
        setDetailsData({...detailsData, color: selectorValue})
      }} value={detailsData.color}>
              <SelectTrigger onClick={toggle}  currentValue={detailsData.color}>
              {detailsData.color || 'Select color...'}
              </SelectTrigger>
              <div     className={`relative w-full bg-white border border-gray-200 rounded shadow-md transition-transform transition-opacity duration-300 ease-in-out transform ${
      hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
    }`} >
          <SketchPicker
          className='w-full'
            color={detailsData.color}
            onChange={(selectorValue) => setDetailsData({...detailsData, color: selectorValue.hex})}
          />
</div>
       </Select> */}

  </CardContent>
  <CardFooter className="flex justify-between">
    <Button onClick={onPrevious} className="mt-4">
      Previous
    </Button>
    <Button onClick={() => onNext('final')} className="mt-4" disabled={!!areDetailsValid()}>
      Continue
    </Button>
  </CardFooter>
</Card>
  )
}
export default VehicleDetails