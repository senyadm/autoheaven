"use client";
import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Car,
  CheckCheck,
  ClipboardList,
  Eye,
  Flame,
  Fuel,
  Sliders,
  Wind,
} from "lucide-react";

import SvgIcon from "../SvgIcon";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import usePremiumStatus from "@/src/shared/hooks/usePremiumStatus";
import {
  addToWishlistThunk,
  deleteFromWishlistThunk,
  useWishlist,
} from "@/src/entities/user";
import Image from "next/image";
import {
  addChat,
  setCurrentChat,
} from "../../app/GlobalRedux/profile/chatSlice";
import { useRouter } from "next/navigation";
import { Chat } from "../../interfaces/profile/messages";
import { useAppSelector } from "../../app/GlobalRedux/store";
import { fetchAndSetUser } from "../../src/shared/utils/user";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from "../ui/card";
import ResultCarCardButtons from "./ResultCarCardButtons";
import { AspectRatio } from "../ui/aspect-ratio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { carsDomain } from "../../src/shared/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {OptionalCarousel, VehicleImage} from "@/src/entities/vehicle/ui/VehicleImage";
import { fetchVehicleUIData, findMakeById, findTypeById } from '@/src/entities/vehicle';

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
  carDetails: any;
  pageDisplayed?: string;
  imageFileNames: string[];
  vehicleUiData: ReturnType<typeof fetchVehicleUIData>; 
}
const ResultCarCard = ({
  carDetails,
  pageDisplayed,
  imageFileNames,
  vehicleUiData,
   vehicleType,
}: ResultCarCardProps) => {
  const {
    title,
    price,
    year,
    mileage,
    fueltype,
    drivetrain,
    body_type,
    gearbox,
    istop,
    phone_number,
    accidentfree,
    imageurl,
    make,
    model,
    make_id,
    type_id,
    id,
    seller_id,
  } = carDetails;
  const makeFromId = useMemo(()=>findMakeById(vehicleUiData.makes, make_id), [vehicleUiData.makes, make_id]);
  const typeFromId =  useMemo(()=>findTypeById(vehicleUiData.types, type_id, vehicleType), [vehicleUiData.types, type_id, vehicleType]);
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
      icon: <FuelTypeIcon fuelType={fueltype} />, // Replace with the actual FuelTypeIcon component
      label: fueltype,
    },
    {
      icon: <BodyStyleIcon bodyStyle={body_type} />, // Replace with the actual BodyStyleIcon component
      label: body_type,
    },
    {
      icon: <GearIcon gear={gearbox} />, // Replace with the actual GearIcon component
      label: gearbox,
    },
    {
      icon: <DrivetrainIcon drivetrain={drivetrain} />, // Replace with the actual DrivetrainIcon component
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
  const userId = useAppSelector((state) => state.user.id);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [wishlist, dispatch] = useAppStore((state) => state.user.wishlist);
  const [showNumber, setShowNumber] = useState(false);
  const onButtonClick = (type: string) => {
    // const item = getToken();
    if (!userId) {
      fetchAndSetUser(dispatch, true);
      return;
    }

    if (type === "advertise") {
      router.push(`/payment?id=${id}`);

      return;
    }

    if (type === "like") {
      if (wishlist?.includes(id)) {
        dispatch(deleteFromWishlistThunk(id));
      } else {
        dispatch(addToWishlistThunk(id));
      }
    }
    if (type === "contact") {
      const newChat: Chat = {
        product_id: id,
        chat_id: 0,
        last_message: null,
        buyer_id: userId,
        seller_id: seller_id,
        chatter_id: seller_id,
        carInfo: carDetails,
      };

      dispatch(addChat(newChat));
      dispatch(setCurrentChat(newChat));
      router.push("/profile/messages");
    }
  };

  return (
    <Card
      className={`text-sm md:text-base overflow-hidden ${
        isPremium ? "bg-premium text-white" : "bg-background"
      } w-full border rounded-lg`}
    >
      {istop && (
        <div className="flex h-6 w-full bg-orange-500 space-x-2 text-primary-foreground items-center">
          <Flame width={16} height={16} className="mr-2 ml-6" /> Top
        </div>
      )}
      <CardHeader className="px-3 pt-3">
        <CardTitle>{`${make || ""} ${model || ""} ${makeFromId || ""}`}</CardTitle>
        <CardDescription className="text-bold">€ {price}</CardDescription>
      </CardHeader>

      <CardContent className="md:py-0 flex space-x-2 md:space-x-4">
        <div className="w-52 h-full">
          {
            imageFileNames ? <OptionalCarousel imageFileNames={imageFileNames} imageOptions={{fill:true}}/>:
            <VehicleImage id={id} imageOptions={{fill:true}} />
            }
        </div>

        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 mb-1 ">
          {carInfo.map(
            (info, index) =>
              info.label && (
                <div key={index} className="flex items-center space-x-2">
                  {info.icon}
                  <span>{info.label}</span>
                </div>
              )
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="md:w-auto">
          <div className="flex justify-start items-center mt-1 mb-2 md:mb-1">
            <div className="md:hidden md:mb-2">
              <Button
                variant="ghost"
                className="hover:text-blue-700 transition duration-300"
                onClick={() => setShowNumber(!showNumber)}
              >
                {showNumber ? (
                  <Eye width={16} height={16} className="mr-1" />
                ) : (
                  <EyeClosedIcon width={16} height={16} />
                )}
                <Label className="cursor-pointer ml-2">
                  {showNumber ? phone_number : "Show contact"}
                </Label>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onMouseLeave={() => setEyeOpen(false)}
                    onMouseEnter={() => setEyeOpen(true)}
                    className="flex space-x-2 hover:underline hover:transition duration-300 cursor-pointer"
                  >
                    {eyeOpen ? (
                      <Eye width={16} height={16} className="mr-1" />
                    ) : (
                      <EyeClosedIcon width={16} height={16} />
                    )}
                    <Label className="cursor-pointer whitespace-nowrap	">
                      Show contact{" "}
                    </Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{phone_number}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <ResultCarCardButtons
          isWish={wishlist?.includes(id)}
          isMine={seller_id === userId}
          onButtonClick={onButtonClick}
          pageDisplayed={pageDisplayed || "cars"}
          productId={id}
        />
      </CardFooter>
    </Card>
  );
};

export default ResultCarCard;
