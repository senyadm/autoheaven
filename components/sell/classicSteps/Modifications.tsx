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
  "Sedan",
  "SUV",
  "Hatchback",
  "Pickup",
  "Example",
];

const fuelTypes: string[] = [
  "Petrol",
  "Gas",
  "Electric",
  "Diesel",
  "Hybrid",
];

const driveTrain: {
    driveTrain: string;
    key: string;
}[]
= [
    {
        driveTrain: "Front Wheel Drive",
        key: "FWD"
    },
    {
        driveTrain: "Rear Wheel Drive",
        key: "RWD"
    },
    {
        driveTrain: "All Wheel Drive",
        key: "AWD"
    }
    ];

const VehicleModification = ({ onNext, onPrevious }: {onPrevious: () => void, onNext: (mode?: string) => void}) => {
  
  const [store, dispatch] = useAppStore(
    (state) => state?.createCarProgress
  )
  const [detailsData, setDetailsData] = useState<CarDetails>(defaultCarDetails);

  const handleNext = () => {
    dispatch(setDetails({...store, ...detailsData}));
    onNext('final')
}

  const handleYear = (year: string) => {
   if (Number(year) > new Date().getFullYear()) return;
    setDetailsData({...detailsData, year: parseInt(year)});
  }

  return (
<Card className="w-full mx-auto bg-white border-none shadow-none">
  <CardContent className="border shadow-md rounded w-full p-8 space-y-6">
    <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label className='text-lg text-foreground' htmlFor="filter2">Vehicle body</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
            <Select
              name="body_type"
              value={detailsData.body_type}
              onValueChange={(selectorValue) => setDetailsData({...detailsData, body_type: selectorValue})}
            >
              <SelectTrigger currentValue={detailsData.body_type}>
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
              <Label className='text-lg text-foreground' htmlFor="filter3">Fuel type</Label>
              <SvgIcon
                filepath="/icons/fuel.svg"
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
              <Label className='text-lg text-foreground' htmlFor="filter2">Year</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
      <Input className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
        type="number"
        id="year"
        defaultValue={new Date().getFullYear()}
        min={1970}
        max={new Date().getFullYear()}
        name="year"
        placeholder="Year"
        value={detailsData?.year}
        onChange={(e) => handleYear(e.target.value)}
      />
      </div>

      <div className="space-y-4">
    <div className="flex items-center space-x-2">
              <Label className='text-lg text-foreground' htmlFor="filter2">Drive Train</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
            <div className='flex flex-row justify-between'>
    {driveTrain.map((item, index) => (
        <div key={index} className='items-center'>
<Checkbox isRounded={true}
       name="fwd"
       checked={detailsData.drivetrain === item.key}
       onClick={() => {setDetailsData({...detailsData, drivetrain: item.key})}}
       className="mr-2"/>
      <Label htmlFor={`brand-${item.key}`} className='text-md text-foreground'>{item.driveTrain}</Label>
        </div>
    )

    )}  
      </div>
      </div>

  </CardContent>
  <CardFooter className="flex justify-between">
    <Button onClick={onPrevious} className="mt-4">
      Previous
    </Button>
    <Button onClick={handleNext} className="mt-4">
      Continue
    </Button>
  </CardFooter>
</Card>
  )
}
export default VehicleModification