'use client';
import { Button } from '@/components/ui/button'; 
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import SvgIcon from "@/components/SvgIcon";
import { Label } from '@/components/ui/label';
import { ChevronRight } from 'lucide-react';
import { useAppStore } from '@/app/GlobalRedux/useStore';
import { setCarType } from '@/app/GlobalRedux/CreateCar/CreateCarSlice';
import { useState } from 'react';
import { SellClassicTranslations } from '@/types';

const VehicleTypeSelection = ({ onNext, dict }: {onNext: () => void, dict: SellClassicTranslations | null} ) => {
  const vehicleTypes = [
    { name: 'Passenger car', iconPath: '/icons/Car.svg' },
    { name: 'Truck', iconPath: '/icons/Truck.svg' },
    { name: 'Motorcycle', iconPath: '/icons/Bike.svg' },
    { name: 'Bus', iconPath: '/icons/CityBus.svg' }   
  ];

const [store, dispatch] = useAppStore(
  (state) => state?.createCarProgress
)

const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  return (

      <Card className="w-full  mx-auto bg-white border-none shadow-none">
        <CardHeader>
          <CardTitle className='text-center text-foreground'>{dict?.title || "I want to sell..."}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center border shadow-md border-rounded">
          {vehicleTypes.map((vehicle, index) => (
            <Button
              key={vehicle.name}
              onMouseEnter={() => setHoveredIcon(index)}
              onMouseLeave={() => setHoveredIcon(-1)}
              onClick={() => dispatch(setCarType(vehicle.name ?? ''))}
              className={`my-2 flex items-center justify-center px-4 py-2 rounded-md transition-colors w-full h-full shadow-none border-border
                ${store?.carType === vehicle.name ? 'bg-primary text-white' : 'text-foreground bg-white'}
                
                `}
            >
              <SvgIcon width={32} height={32} alt={vehicle.name} filepath={vehicle.iconPath} className={`${store?.carType === vehicle.name ? 'text-white' : 'text-foreground'}`}/>
              <Label className={`text-lg ml-2 ${store?.carType === vehicle.name ? 'text-white' : 'text-foreground'}`}>{vehicle.name}</Label>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="grid place-items-end ">
          <Button
            disabled={!store?.carType}
            onClick={() => onNext()}
            className={`mt-4 w-full bg-primary text-white disabled:opacity-50`}
          >
            {dict?.continue || "Continue"}
            <ChevronRight/>
          </Button>
        </CardFooter>
      </Card>
  );
};

export default VehicleTypeSelection;
