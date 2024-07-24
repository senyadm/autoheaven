import { Card, CardContent } from "../../../../components/ui/card";
import { set } from "zod";
import { Car } from "../../../entities/vehicle/model/car";
import Image from "next/image";
import { carsDomain } from "../../../shared/api";
import { Badge } from "../../../../components/ui/badge";
import CarIcon from "@/public/icons/vehicle-category/car.svg";
import { Fuel, Heart, ThumbsDown } from "lucide-react";
import SteeringWheel from "@/public/icons/listheaven/steering-wheel.svg";
import Badges from "./Badges";
import DetailsTable from "./DetailsTable";
import { Button } from "../../../../components/ui/button";
import { VehicleImage } from "@/src/entities/vehicle";
import { OptionalCarousel } from '@/src/entities/vehicle/ui/VehicleImage';
import { parseArrayFromString } from '@/src/shared/utils/parse-string';
import { useMediaQuery } from 'usehooks-ts';
import { useMemo } from 'react';

interface SliderCarCardProps {
  carDetails: Car;
  className?: string;
  types: any;
  style?: any;
  buttonCallbacks: {
    likeOffer: () => void;
    dislikeOffer: () => void;
  };
}
function SliderCarCard({
  carDetails,
  className,
  types,
  style,
  buttonCallbacks: { likeOffer, dislikeOffer },
}: SliderCarCardProps) {
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
  const isMobile = useMediaQuery('(max-width: 640px)');
  const iconProps = useMemo(() => {
    return {
      width: isMobile ? 24 : 44,
      height: isMobile ? 24 : 44,
    }
  }, [isMobile]);
  const bodyType = types.find((type) => type.id === type_id)?.car_type;
  return (
    <SliderCard className={`relative p-8 ${className}`} style={style}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
        }}
        className="flex items-center justify-center w-full"
      >
        {/* <Image
          src={`${carsDomain}/api/cars/download/${id}`}
          alt={make + " " + model}
          width={1920}
          height={1080}
          className="min-[1920px]:w-[100vw] absolute top-0 left-0 h-full object-cover blur-sm"
          draggable={false}
        /> */}
        {/* <VehicleImage id={id} imageClassName="absolute" imageOptions={{
          // width: 1920,
          // height: 1080,
          fill: true,
          draggable: false,
        }}/> */}
        <OptionalCarousel imageFileNames={parseArrayFromString(imageurl)} imageClassName="absolute" imageOptions={{
          // width: 1920,
          // height: 1080,
          fill: true,
          draggable: false,
        }}/>
        
      </div>
      <div className="absolute text-primary bottom-0 left-0 text-white w-full p-8">
        <h1 className="text-2xl font-bold">{`${make} ${model}, ${year}`}</h1>
        <Badges badgeData={{ bodyType, fueltype, drivetrain }} />
        <DetailsTable carDetails={carDetails} />
        <div className="flex mt-4 justify-around">
          <Button
            className="rounded-full bg-white sm:h-20 sm:w-20 h-12 w-12"
            onClick={dislikeOffer}
          >
            <ThumbsDown
              {...iconProps}
              className="text-[#FF7176]"
              fill="#FF7176"
            />
          </Button>
          <Button
            className="rounded-full bg-[#60BAFF] sm:h-20 sm:w-20 h-12 w-12"
            onClick={likeOffer}
          >
            <Heart
               {...iconProps}
              className="text-white"
              fill="#ffffff"
            />
          </Button>
        </div>
      </div>
    </SliderCard>
  );
}
interface SliderCardProps {
  children: any;
  className?: string;
  style?: any;
}
export function SliderCard({ children, className, style }: SliderCardProps) {
  return (
    <Card className={`w-full h-full bg-black ${className}`} style={style}>
      <CardContent className="">{children}</CardContent>
    </Card>
  );
}

export default SliderCarCard;
