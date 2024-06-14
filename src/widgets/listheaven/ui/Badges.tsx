import React from "react";
import { Badge } from "../../../../components/ui/badge";
import CarIcon from "@/public/icons/vehicle-category/car.svg";
import { Fuel } from "lucide-react";
import SteeringWheel from "@/public/icons/listheaven/steering-wheel.svg";

const Badges = ({ badgeData }) => {
  const { drivetrain, fueltype, bodyType } = badgeData;

  return (
    <div className="flex capitalize [&>*]:text-sm [&>*]:font-bold space-x-2 h-7 my-2 overflow-x-scroll">
      {bodyType && (
        <Badge className="flex space-x-2 text-white whitespace-nowrap">
          <CarIcon width={20} height={20} viewBox="0 0 28 22" fill="#ffffff" />
          <p>{bodyType}</p>
        </Badge>
      )}

      {fueltype && (
        <Badge>
          <Fuel width={20} height={20} />
          <p>{fueltype}</p>
        </Badge>
      )}
      {drivetrain && (
        <Badge>
          <SteeringWheel width={20} height={20} />
          <p>{drivetrain}</p>
        </Badge>
      )}
    </div>
  );
};

export default Badges;
