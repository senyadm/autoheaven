import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; 
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import SvgIcon from "@/components/SvgIcon";
import { Label } from '@/components/ui/label';
import { ChevronRight } from 'lucide-react';


interface VehicleCreateParams {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
}

const VehicleTypeSelection = ({ onNext }: {onNext: (param: keyof VehicleCreateParams, value: number | string) => void} ) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>();
  const vehicleTypes = [
    { name: 'Passenger car', iconPath: '/icons/Car.svg' },
    { name: 'Truck', iconPath: '/icons/Truck.svg' },
    { name: 'Motorcycle', iconPath: '/icons/Bike.svg' },
    { name: 'Bus', iconPath: '/icons/CityBus.svg' }   
  ];

  return (

      <Card className="w-full  mx-auto bg-white border-none shadow-none">
        <CardHeader>
          <CardTitle className='text-center text-foreground'>I want to sell a...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center border shadow-md border-rounded">
          {vehicleTypes.map((vehicle, index) => (
            <Button
              key={vehicle.name}
              onClick={() => setSelectedVehicleType(vehicle.name)}
              className={`my-2 flex items-center justify-center px-4 py-2 rounded-md transition-colors w-full shadow-none border-border
                ${selectedVehicleType === vehicle.name ? 'bg-primary text-white' : 'text-foreground bg-white'}
              `}
            >
              <SvgIcon width={24} height={24} alt={vehicle.name} filepath={vehicle.iconPath} className={`${selectedVehicleType === vehicle.name ? 'text-white' : 'text-foreground'}`}/>
              <Label className={`ml-2 ${selectedVehicleType === vehicle.name ? 'text-white' : 'text-foreground'}`}>{vehicle.name}</Label>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="grid place-items-end ">
          <Button
            disabled={!selectedVehicleType}
            onClick={() => selectedVehicleType && onNext('vehicleType', selectedVehicleType)}
            className={`mt-4 w-full bg-primary text-white disabled:opacity-50`}
          >
            Continue
            <ChevronRight/>
          </Button>
        </CardFooter>
      </Card>
  );
};

export default VehicleTypeSelection;
