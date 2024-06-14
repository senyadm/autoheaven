import { Card, CardContent } from "../../../../components/ui/card";
import { set } from "zod";
import { Car } from "../../../entities/vehicle/model/car";
import Image from "next/image";
import { carsDomain } from "../../../shared/api";
import { Badge } from "../../../../components/ui/badge";
import CarIcon from "@/public/icons/vehicle-category/car.svg";
import { Fuel } from "lucide-react";
import SteeringWheel from "@/public/icons/listheaven/steering-wheel.svg";
import Badges from "./Badges";
import DetailsTable from "./DetailsTable";

interface SliderCarCardProps {
  carDetails: Car;
  className?: string;
  types: any;
}
function SliderCarCard({ carDetails, className, types }: SliderCarCardProps) {
  console.log("🚀 ~ SliderCarCard ~ carDetails:", carDetails);
  const {
    title,
    make,
    model,
    imageurl,
    id,
    year,
    drivetrain,
    fueltype,
    type_id,
    mileage,
    accidentfree,
    price,
  } = carDetails;
  const bodyType = types.find((type) => type.id === type_id)?.car_type;
  return (
    <SliderCard className={`relative p-8 ${className}`}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
        }}
        className="flex items-center justify-center w-full"
      >
        <Image
          src={`${carsDomain}/api/cars/download/${id}`}
          alt={make + " " + model}
          width={1920}
          height={1080}
          className="min-[1920px]:w-[100vw] absolute top-0 left-0 h-full object-cover blur-sm"
        />
        <Image
          src={`${carsDomain}/api/cars/download/${id}`}
          alt={make + " " + model}
          width={1920}
          height={1080}
          className="min-[1920px]:w-[100vw] absolute"
        />
      </div>
      <div className="absolute text-primary bottom-0 left-0 text-white w-full p-8">
        <h1 className="text-2xl font-bold">{`${make} ${model}, ${year}`}</h1>
        <Badges badgeData={{ bodyType, fueltype, drivetrain }} />
        <DetailsTable carDetails={carDetails} />
      </div>
    </SliderCard>
  );
}
export function SliderCard({ children, className }) {
  return (
    <Card className={`w-full h-full bg-black ${className}`}>
      <CardContent className="">{children}</CardContent>
    </Card>
  );
}

export default SliderCarCard;
