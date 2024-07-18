"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SvgIcon from "@/components/SvgIcon";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { setCarType } from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
import { useEffect, useState } from "react";
import { SellClassicTranslations } from "@/types";
import { VehicleType } from "../../../src/shared/model/params";
import { useRouter } from "next/navigation";

const VehicleTypeSelection = ({
  onNext,
  dict,
}: {
  onNext: () => void;
  dict: SellClassicTranslations | null;
}) => {
  const { replace } = useRouter();
  const vehicleTypes = [
    { name: VehicleType.Car, iconPath: "/icons/Car.svg" },
    { name: VehicleType.Truck, iconPath: "/icons/Truck.svg" },
    { name: VehicleType.Moto, iconPath: "/icons/Bike.svg" },
    { name: VehicleType.Bus, iconPath: "/icons/CityBus.svg" },
  ];

  const [store, dispatch] = useAppStore((state) => state?.createCarProgress);

  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  function setTypeParam() {
    if (typeof store?.carType === "string") {
      onNext();
    }
  }
  function handleTypeSelect(vehicle) {
    if (vehicle) {
      dispatch(setCarType(vehicle.name ?? ""));
    }
  }

  return (
    <Card className="w-full  mx-auto bg-white border-none shadow-none ">
      <CardHeader>
        <CardTitle className="text-center text-foreground">
          {dict?.title || "I want to sell..."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col mt-4 md:mt-0 items-center border shadow-md border-rounded">
        {vehicleTypes.map((vehicle, index) => (
          <Button
            key={vehicle.name}
            onMouseEnter={() => setHoveredIcon(index)}
            onMouseLeave={() => setHoveredIcon(-1)}
            onClick={() => handleTypeSelect(vehicle)}
            className={`my-2 flex items-center justify-center px-4 py-2 rounded-md transition-colors w-full h-full shadow-none border-border
                ${
                  store?.carType === vehicle.name
                    ? "bg-primary text-white"
                    : "text-foreground bg-white"
                }
                
                `}
          >
            <SvgIcon
              width={32}
              height={32}
              alt={vehicle.name}
              filepath={vehicle.iconPath}
              className={`${
                store?.carType === vehicle.name
                  ? "text-white"
                  : "text-foreground"
              }`}
            />
            <Label
              className={`text-lg ml-2 ${
                store?.carType === vehicle.name
                  ? "text-white"
                  : "text-foreground"
              }`}
            >
              {vehicle.name}
            </Label>
          </Button>
        ))}
      </CardContent>
      <CardFooter className="grid place-items-end ">
        <Button
          disabled={!store?.carType}
          onClick={setTypeParam}
          className={`mt-4 w-full bg-primary text-white disabled:opacity-50`}
        >
          {dict?.continue || "Continue"}
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleTypeSelection;
