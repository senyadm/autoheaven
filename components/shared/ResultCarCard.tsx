/* eslint-disable @next/next/no-img-element */
"use client";
import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useEffect, useState } from "react";
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
} from "@/components/ui/tooltip";
import SvgIcon from "../SvgIcon";
import { Button } from "../ui/button";
import ResultCarCardButtons from "./ResultCarCardButtons";
import { Label } from "../ui/label";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import usePremiumStatus from "@/hooks/usePremiumStatus";
import { getToken } from "@/utils/auth";
import {
  addToWishlistThunk,
  deleteFromWishlist,
  deleteFromWishlistThunk,
} from "@/app/GlobalRedux/profile/userSlice";
import Image from "next/image";
import {
  addChat,
  setCurrentChat,
} from "../../app/GlobalRedux/profile/chatSlice";
import { useRouter } from "next/navigation";
import { set } from "zod";
import { Chat, ChatListAPI } from "../../interfaces/profile/messages";
import { useAppSelector } from "../../app/GlobalRedux/store";
import { fetchAndSetUser } from "../../utils/user";

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
const ResultCarCard = ({
  carDetails,
  isTop,
  pageDisplayed,
}: ResultCarCardInterface) => {
  const {
    title,
    price,
    year,
    mileage,
    fueltype,
    drivetrain,
    body_type,
    gearbox,
    phone_number,
    accidentfree,
    imageurl,
    id,
    seller_id,
  } = carDetails;
  const { isPremium } = usePremiumStatus();
  const router = useRouter();
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
  ];
  const getAccidentStateIcon = () => {
    const iconColorClass = accidentfree ? "text-green-500" : "text-red-500";
    const iconProps = {
      width: 16,
      height: 16,
      className: `mr-1 ${iconColorClass}`,
    };
    return accidentfree ? (
      <>
        <CheckCheck {...iconProps} /> Accident free
      </>
    ) : (
      <>
        <ClipboardList {...iconProps} /> Incident history
      </>
    );
  };
  const userId = useAppSelector((state) => state.user.id);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [wishlist, dispatch] = useAppStore((state) => state?.user.wishlist);
  const [showNumber, setShowNumber] = useState(false);
  const onButtonClick = (type: string) => {
    // const item = getToken();
    if (!wishlist) return;
    if (!userId) {
      console.log("No user id");
      fetchAndSetUser(dispatch);
      return;
    }

    if (type === "advertise") {
      router.push("/payment");

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
        last_message_timestamp: "",
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
console.log(id)

  return (
    <div
      className={`flex text-sm md:text-base overflow-hidden w-full ${
        isPremium ? "bg-premium text-white" : "bg-background"
      } border rounded-lg overflow-hidden`}
    >
        <div className="block relative w-full max-w-[312px]">
          <Image
            alt=""
            src={`https://autoheven-cars.vercel.app/cars/download/${id}`}
            fill={true}
            sizes={"100%"}
            style={{
              objectFit: "cover",
            }}
          />
        </div>

      <div className="flex flex-col w-full ">
        {isTop && (
          <div className="flex h-6 w-full bg-orange-500 space-x-2 text-primary-foreground items-center">
            <Flame width={16} height={16} className="mr-2 ml-6" /> Top
          </div>
        )}
        <div className="flex flex-col justify-between flex-1 px-6 py-4">
          <div className="flex justify-between mb-1">
            <p className="font-bold">{title}</p>
            <p className="font-medium whitespace-nowrap">€ {price}</p>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-2 mb-1">
            {carInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-2">
                {info.icon}
                <span>{info.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div className="w-full md:w-auto">
              <div className="flex justify-start items-center mt-1 mb-2 md:mb-1">
                {getAccidentStateIcon()}
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
                        <Label className="cursor-pointer">Show contact</Label>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{phone_number}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex justify-between items-end text-foreground">
              <ResultCarCardButtons
                isWish={wishlist?.includes(id)}
                onButtonClick={onButtonClick}
                pageDisplayed={pageDisplayed || "cars"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCarCard;
