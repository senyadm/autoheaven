import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React from "react";
import Image from "next/image";
import {
  Calendar,
  Car,
  CheckCheck,
  ClipboardList,
  Divide,
  Flame,
  Fuel,
  Heart,
  Sliders,
  Wind,
} from "lucide-react";
import SvgIcon from "../SvgIcon";
import { Button } from "../ui/button";
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
  accidentFree,
  imageURL,
  id,
  isTop,
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
  return (
    <div className="flex w-full bg-card border rounded-lg overflow-hidden">
      <Image src={imageURL} alt="" width={256} height={130}></Image>
      <div className="flex flex-col w-full">
        {isTop && (
          <div className="flex h-6 w-full bg-orange-500 space-x-2 text-primary-foreground items-center">
            <Flame width={16} height={16} className="mr-2 ml-6" /> Top
          </div>
        )}
        <div className="flex flex-col justify-between flex-1  px-6 py-4">
          <div className="flex text-sm justify-between">
            <p className="font-bold">{title}</p>
            <p className="font-medium">€ {price}</p>
          </div>
          <div className="flex">
            {carInfo.map((el) => (
              <div className="flex mr-6" key={String(id) + el.label}>
                <div className="mr-1 flex items-center">{el.icon}</div>
                {el.label}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center">{getAccidentStateIcon()}</div>
              <div className="flex">
                <SvgIcon
                  filepath="/icons/cars/eye-closed.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mr-1"
                />{" "}
                Show contact
              </div>
            </div>
            <div className="flex items-end">
              <Button className="bg-background text-primary hover:text-primary-foreground p-[0.625rem] mr-2">
                <Heart width={16} height={16} />
              </Button>
              <Button className="bg-primary text-secondary px-2 py-3">
                <SvgIcon
                  filepath="/icons/cars/envelope-closed.svg"
                  width={16}
                  height={16}
                  alt=""
                  className="invert mr-2"
                />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCarCard;
