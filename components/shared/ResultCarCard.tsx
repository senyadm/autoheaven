"use client";
import React from "react";
import {
  Calendar,
  Car,
  CheckCheck,
  ClipboardList,
  Flame,
  Fuel,
  Sliders,
  Wind,
} from "lucide-react";

import SvgIcon from "../SvgIcon";
import usePremiumStatus from "@/src/shared/hooks/usePremiumStatus";
import { useRouter } from "next/navigation";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from "../ui/card";
import VehicleActionButtons from "./VehicleActionButtons";
import {OptionalCarousel, VehicleImage} from "@/src/entities/vehicle/ui/VehicleImage";
import { VehicleOnCard } from '@/src/entities/vehicle';
import PhoneNumber from '@/src/entities/user/ui/PhoneNumber';
import { cn } from '@/src/shared/utils/cn';

const FuelTypeIcon = (fuelType: any) => {
  switch (fuelType) {
    case "petrol":
      return <Fuel width={16} height={16} />;
    default:
      return <Fuel width={16} height={16} />;
  }
};
const BodyStyleIcon = (bodyStyle: any) => {
  switch (bodyStyle) {
    case "sedan":
      return <Car width={16} height={16} />;
    default:
      return <Car width={16} height={16} />;
  }
};
const GearIcon = (gear: any) => {
  switch (gear) {
    case "automatic":
      return <Sliders width={16} height={16} />;
    default:
      return <Sliders width={16} height={16} />;
  }
};
const DrivetrainIcon = (drivetrain: any) => {
  switch (drivetrain) {
    case "fwd":
      return (
        <SvgIcon filepath="/icons/cars/fwd.svg" alt="" width={16} height={16} />
      );
    default:
      return (
        <SvgIcon filepath="/icons/cars/fwd.svg" alt="" width={16} height={16} />
      );
  }
};

interface ResultCarCardProps {
  carDetails: VehicleOnCard;
  imageFileNames: string[];
}
const ResultCarCard = ({
  carDetails,
  imageFileNames,
}: ResultCarCardProps) => {
  const {
    title,
    price,
    year,
    mileage,
    fueltype,
    drivetrain,
    gearbox,
    istop,
    phone_number,
    accidentfree,
    imageurl,
    make,
    type,
    model,
    make_id,
    type_id,
    id,
    seller_id,
  } = carDetails;
 
  const { isPremium } = usePremiumStatus();
  const router = useRouter();
  const iconProps = {
    width: 16,
    height: 16,
    className: `mr-1 ${accidentfree ? "text-green-500" : "text-red-500"}`,
  };
  const carInfo = [
    {
      icon: <Calendar width={16} height={16} />, // Replace with the actual CalendarIcon component
      label: year,
    },
    {
      icon: <Wind width={16} height={16} />, // Replace with the actual WindIcon component
      label: `${mileage} km`,
    },
    {
      icon: <FuelTypeIcon fuelType={fueltype} width={16} height={16}/>, // Replace with the actual FuelTypeIcon component
      label: fueltype,
    },
    {
      icon: <BodyStyleIcon bodyStyle={type} width={16} height={16}/>, // Replace with the actual BodyStyleIcon component
      label: type,
    },
    {
      icon: <GearIcon gear={gearbox} width={16} height={16}/>, // Replace with the actual GearIcon component
      label: gearbox,
    },
    {
      icon: <DrivetrainIcon drivetrain={drivetrain} width={16} height={16}/>, // Replace with the actual DrivetrainIcon component
      label: drivetrain,
    },
    {
      icon: accidentfree ? (
        <CheckCheck {...iconProps} />
      ) : (
        <ClipboardList {...iconProps} />
      ),
      label: accidentfree ? "Accident free" : "Incident history",
    },
  ]; 

  return (
    <Card
      className={`text-sm md:text-base overflow-hidden p-2 ${
        isPremium ? "bg-premium text-white" : "bg-background"
      } w-full border rounded-lg`}
    >
      {istop && (
        <div className="flex h-6 w-full bg-orange-500 space-x-2 text-primary-foreground items-center">
          <Flame width={16} height={16} className="mr-2 ml-6" /> Top
        </div>
      )}
      <CardHeader className="">
        <CardTitle>{`${make || ""} ${model || ""}`}</CardTitle>
        <CardDescription className="text-bold">€ {price}</CardDescription>
      </CardHeader>

      <CardContent className={cn("flex flex-col space-y-2", "", "sm:flex-row sm:space-y-0")}>
        <div className="w-full sm:w-52 h-full">
          {
            imageFileNames ? <OptionalCarousel imageFileNames={imageFileNames} imageOptions={{fill:true}}/>:
            <VehicleImage id={id} imageOptions={{fill:true}} />
            }
        </div>

        <div className="flex flex-wrap space-x-4 sm:gap-2 mb-1 -ml-4 sm:ml-0">
          {carInfo.map(
            (info, index) =>
              info.label && (
                <div key={index} className={cn("flex items-center space-x-2 w-fit", index || "ml-4")}>
                  <div className=''>{info.icon}</div>
                  <span className='whitespace-nowrap'>{info.label}</span>
                </div>
              )
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
       <PhoneNumber phone_number={phone_number} className="z-10"/>

        <VehicleActionButtons
          carDetails={carDetails}
          className="z-10"
        />
      </CardFooter>
    </Card>
  );
};

export default ResultCarCard;
