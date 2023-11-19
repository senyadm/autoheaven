"use client"
import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Car,
  CheckCheck,
  ClipboardList,
  Divide,
  Eye,
  Flame,
  Fuel,
  Heart,
  Sliders,
  Wind,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import SvgIcon from "../SvgIcon";
import { Button } from "../ui/button";
import ResultCarCardButtons from "./ResultCarCardButtons";
import { Label } from "../ui/label";
import { EyeClosedIcon } from "@radix-ui/react-icons";
const FuelTypeIcon = (fuelType) => {
  switch (fuelType) {
    case "petrol":
      return <Fuel width={16} height={16} />;
    default:
      return <Fuel width={16} height={16} />;
  }
};
const BodyStyleIcon = (bodyStyle) => {
  switch (bodyStyle) {
    case "sedan":
      return <Car width={16} height={16} />;
    default:
      return <Car width={16} height={16} />;
  }
};
const GearIcon = (gear) => {
  switch (gear) {
    case "automatic":
      return <Sliders width={16} height={16} />;
    default:
      return <Sliders width={16} height={16} />;
  }
};
const DrivetrainIcon = (drivetrain) => {
  switch (drivetrain) {
    case "fwd":
      return (
        <SvgIcon filepath="icons/cars/fwd.svg" alt="" width={16} height={16} />
      );
    default:
      return (
        <SvgIcon filepath="icons/cars/fwd.svg" alt="" width={16} height={16} />
      );
  }
};
const ResultCarCard = ({
  title,
  price,
  releaseYear,
  mileage,
  fuelType,
  drivetrain,
  bodyStyle,
  gear,
  phone_number,
  accidentFree,
  imageURL,
  id,
  isTop,
  pageDisplayed,
}: ResultCarCardInterface) => {
  const carInfo = [
    {
      icon: <Calendar width={16} height={16} />, // Replace with the actual CalendarIcon component
      label: releaseYear,
    },
    {
      icon: <Wind width={16} height={16} />, // Replace with the actual WindIcon component
      label: `${mileage} km`,
    },
    {
      icon: <FuelTypeIcon fuelType={fuelType} />, // Replace with the actual FuelTypeIcon component
      label: fuelType,
    },
    {
      icon: <BodyStyleIcon bodyStyle={bodyStyle} />, // Replace with the actual BodyStyleIcon component
      label: bodyStyle,
    },
    {
      icon: <GearIcon gear={gear} />, // Replace with the actual GearIcon component
      label: gear,
    },
    {
      icon: <DrivetrainIcon drivetrain={drivetrain} />, // Replace with the actual DrivetrainIcon component
      label: drivetrain,
    },
  ];
  const getAccidentStateIcon = () => {
    const iconColorClass = accidentFree ? "text-green-500" : "text-red-500";
    const iconProps = {
      width: 16,
      height: 16,
      className: `mr-1 ${iconColorClass}`,
    };
    return accidentFree ? (
      <>
        <CheckCheck {...iconProps} /> Accident free
      </>
    ) : (
      <>
        <ClipboardList {...iconProps} /> Incident history
      </>
    );
  };

const [eyeOpen, setEyeOpen] = useState(false);

  return (
    <div className="flex w-full bg-card border rounded-lg overflow-hidden">
      <img src={imageURL} alt={"Image"} width={256} height={130}></img>
      <div className="flex flex-col w-full">
        {isTop && (
          <div className="flex h-6 w-full bg-orange-500 space-x-2 text-primary-foreground items-center">
            <Flame width={16} height={16} className="mr-2 ml-6" /> Top
          </div>
        )}
        <div className="flex flex-col justify-between flex-1  px-6 py-4">
          <div className="flex text-sm justify-between">
            <p className="font-bold">{title}</p>
            <p className="font-medium whitespace-nowrap">€ {price}</p>
          </div>
          <div className="flex flex-wrap">
            {carInfo.map((el) => (
              <div className="flex mr-6 whitespace-nowrap" key={String(id) + el.label}>
                <div className="mr-1 flex items-center">{el.icon}</div>
                {el.label}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center">{getAccidentStateIcon()}</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
              <div onMouseLeave={() => setEyeOpen(false)} onMouseEnter={() => setEyeOpen(true)} className="flex space-x-2 hover:underline hover:transition duration-300 cursor-pointer">
               {eyeOpen ? <Eye
                  width={16}
                  height={16}
                  className="mr-1"
                /> : 
                <EyeClosedIcon width={16} height={16}/>} 
               <Label className="cursor-pointer">Show contact</Label> 
              </div>
              </TooltipTrigger>
              <TooltipContent>
                {phone_number}
              </TooltipContent>
              </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-end text-foreground">
              <ResultCarCardButtons pageDisplayed={pageDisplayed || 'cars'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCarCard;
