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
import { SellClassicTranslations } from '@/types';

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

const gearbox: {
  gear: string;
  key: string;
}[]
= [
  {
      gear: "Automatic",
      key: "auto"
  },
  {
      gear: "Manual",
      key: "manual"
  }
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

const VehicleModification = ({ onNext, onPrevious, dict }: {onPrevious: () => void, onNext: (mode?: string) => void,  dict: SellClassicTranslations | null}) => {
  
  const [store, dispatch] = useAppStore(
    (state) => state?.createCarProgress.details
  )

  const handleNext = () => {
    dispatch(setDetails(store));
    onNext('final')
}

  const handleYear = (year: string) => {
   if (Number(year) > new Date().getFullYear()) return;
    dispatch(setDetails({...store, year: parseInt(year)}));
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
              value={store?.body_type}
              onValueChange={(selectorValue) => dispatch(setDetails({...store, body_type: selectorValue}))}
            >
              <SelectTrigger currentValue={store?.body_type}>
                {dict?.selectbody || "Select body..."}
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
              <Label className='text-lg text-foreground' htmlFor="filter3">{dict?.fuel || "Fuel"}</Label>
              <SvgIcon
                filepath="/icons/fuel.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              name="fueltype"
              value={store?.fueltype}
              onValueChange={(selectorValue) => dispatch(setDetails({...store, fueltype: selectorValue}))}
            >
              <SelectTrigger currentValue={store?.fueltype}>
                {dict?.selectfuel || "Select fuel..."}
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
        value={store?.year}
        onChange={(e) => handleYear(e.target.value)}
      />
      </div>
      <div className="space-y-4">
    <div className="flex items-center space-x-2">
              <Label className='text-lg text-foreground' htmlFor="filter2">{dict?.drivetrain || 'Drive Train'}</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
            <div className='flex flex-row justify-between'>
    {driveTrain.map((item, index) => (
        <div key={index} className='items-center'>
<Checkbox isRounded={true}
       checked={store?.gearbox === item.key}
       onClick={() => {dispatch(setDetails({...store, gearbox: item.key}))}}
       className="mr-2"/>
      <Label htmlFor={`brand-${item.key}`} className='text-md text-foreground'>{item.driveTrain}</Label>
        </div>
    )

    )}  
      </div>
      </div>
      <div className="space-y-4">
    <div className="flex items-center space-x-2">
              <Label className='text-lg text-foreground' htmlFor="filter2">{dict?.gearbox || 'Gearbox'}</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
            <div className='flex flex-row space-x-8 items-center'>
    {gearbox.map((item, index) => (
        <div key={index} className='items-center'>
<Checkbox isRounded={true}
       checked={store?.drivetrain === item.key}
       onClick={() => {dispatch(setDetails({...store, drivetrain: item.key}))}}
       className="mr-2"/>
      <Label htmlFor={`brand-${item.key}`} className='text-md text-foreground'>{item.gear}</Label>
        </div>
    )

    )}  
      </div>
      </div>

  </CardContent>
  <CardFooter className="flex justify-between">
    <Button onClick={onPrevious} className="mt-4">
    {dict?.previous || 'Previous'}
    </Button>
    <Button onClick={handleNext} className="mt-4">
    {dict?.continue || 'Continue'}
    </Button>
  </CardFooter>
</Card>
  )
}
export default VehicleModification