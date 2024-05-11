import { setDetails } from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import "react-phone-number-input/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import SvgIcon from "@/components/SvgIcon";
import { SellClassicTranslations } from "@/types";
import { Kanban, Settings, ShipWheel, Snowflake, Sun, Zap } from "lucide-react";
import { VehicleType } from "../../../interfaces/shared/vehicle";
import { useAppSelector } from "../../../app/GlobalRedux/store";

// const defaultCarDetails: CarDetails = {
//   type: '',
//   body_type: '',
//   color: '',
//   year: new Date().getFullYear(),
//   mileage: 0,
//   gearbox: '',
//   price: 0,
//   description: '',
//   title: '',
//   fueltype: '',
//   accidentfree: false,
//   imageurl: '',
//   drivetrain: '',
//   istop: false
// };

const bodyTypes: string[] = ["Sedan", "SUV", "Hatchback", "Pickup", "Example"];

const fuelTypes: string[] = ["Petrol", "Gas", "Electric", "Diesel", "Hybrid"];

const gearbox: {
  gear: string;
  key: string;
}[] = [
  {
    gear: "Automatic",
    key: "auto",
  },
  {
    gear: "Manual",
    key: "manual",
  },
];

const driveTrain: {
  driveTrain: string;
  key: string;
}[] = [
  {
    driveTrain: "Front Wheel Drive",
    key: "FWD",
  },
  {
    driveTrain: "Rear Wheel Drive",
    key: "RWD",
  },
  {
    driveTrain: "All Wheel Drive",
    key: "AWD",
  },
];

const VehicleModification = ({
  onNext,
  onPrevious,
  dict,
}: {
  onPrevious: () => void;
  onNext: (mode?: string) => void;
  dict: SellClassicTranslations | null;
}) => {
  const carType = useAppSelector((state) => state?.createCarProgress?.carType);
  console.log("🚀 ~ carType:", carType);

  const [store, dispatch] = useAppStore(
    (state) => state?.createCarProgress.details
  );

  const handleNext = () => {
    dispatch(setDetails(store));
    onNext("final");
  };

  const handleYear = (year: string) => {
    if (Number(year) > new Date().getFullYear()) return;
    dispatch(setDetails({ ...store, year: parseInt(year) }));
  };

  const isDisabled = useMemo(() => {
    return (
      !store?.body_type ||
      !store?.fueltype ||
      !store?.year ||
      !store?.drivetrain ||
      !store?.gearbox
    );
  }, [store]);

  const handleHorsePower = (horsepower: string) => {
    dispatch(setDetails({ ...store, horsepower }));
  };

  const handleConsumption = (consumption: string, type: string) => {
    const numberCons = Number(consumption);

    if (isNaN(numberCons) || numberCons < 1) return;

    if (type === "summer") {
      dispatch(setDetails({ ...store, summerConsumption: numberCons }));
    } else if (type === "winter") {
      dispatch(setDetails({ ...store, winterConsumption: numberCons }));
    } else {
      dispatch(setDetails({ ...store, highwayConsumption: numberCons }));
    }
  };

  return (
    <Card className="w-full mx-auto bg-white border-none shadow-none">
      <CardContent className="border shadow-md rounded w-full p-8 space-y-6">
        {carType == VehicleType.car && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label className="text-lg text-foreground" htmlFor="filter2">
                Vehicle body
              </Label>
              <SvgIcon
                filepath="/icons/car.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              name="body_type"
              value={store?.body_type}
              onValueChange={(selectorValue) =>
                dispatch(setDetails({ ...store, body_type: selectorValue }))
              }
            >
              <SelectTrigger currentValue={store?.body_type}>
                {dict?.selectbody || "Select body..."}
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter3">
              {dict?.fuel || "Fuel"}
            </Label>
            <SvgIcon filepath="/icons/fuel.svg" alt="" width={16} height={16} />
          </div>
          <Select
            name="fueltype"
            value={store?.fueltype}
            onValueChange={(selectorValue) =>
              dispatch(setDetails({ ...store, fueltype: selectorValue }))
            }
          >
            <SelectTrigger currentValue={store?.fueltype}>
              {dict?.selectfuel || "Select fuel..."}
            </SelectTrigger>
            <SelectContent>
              {fuelTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter3">
              Consumption
            </Label>
            <SvgIcon filepath="/icons/fuel.svg" alt="" width={16} height={16} />
          </div>
          <div className="flex flex-row justify-between items-center space-x-4">
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="text"
            id="cons"
            name="cons"
            placeholder="Summer"
            value={store?.summerConsumption}
            onChange={(e) => handleConsumption(e.target.value, "summer")}
          />
          <Snowflake width={12} height={12} />
                    <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="text"
            id="cons"
            name="cons"
            placeholder="Winter"
            value={store?.winterConsumption}
            onChange={(e) => handleConsumption(e.target.value, "winter")}
          />
          <Sun width={12} height={12} />
                    <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="text"
            id="cons"
            min={0}
            max={5000}
            name="cons"
            placeholder="Highway"
            value={store?.highwayConsumption}
            onChange={(e) => handleConsumption(e.target.value, "highway")}
          />
          <Kanban width={12} height={12} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter2">
              Year
            </Label>
            <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
          </div>
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="number"
            id="year"
            defaultValue={new Date().getFullYear()}
            min={1970}
            max={new Date().getFullYear()}
            name="year"
            placeholder="Year"
            value={store?.year}
            onChange={(e) => handleYear(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter2">
              Horse Power
            </Label>
            <Zap width={16} height={16} />
          </div>
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="number"
            id="power"
            defaultValue={1}
            min={1}
            max={5000}
            name="power"
            placeholder="Horse Power"
            value={store?.horsepower}
            onChange={(e) => handleHorsePower(e.target.value)}
          />
        </div>

        {carType != VehicleType.moto && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label className="text-lg text-foreground" htmlFor="filter2">
                {dict?.drivetrain || "Drive Train"}
              </Label>
              <ShipWheel width={16} height={16} />
            </div>
            <div className="flex md:flex-row md:justify-between flex-col space-y-3">
              {driveTrain.map((item, index) => (
                <div key={index} className="items-center">
                  <Checkbox
                    isRounded={true}
                    checked={store?.gearbox === item.key}
                    onClick={() => {
                      dispatch(setDetails({ ...store, gearbox: item.key }));
                    }}
                    className="mr-2"
                  />
                  <Label
                    htmlFor={`brand-${item.key}`}
                    className="text-md text-foreground"
                  >
                    {item.driveTrain}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter2">
              {dict?.gearbox || "Gearbox"}
            </Label>
            <Settings width={16} height={16} />
          </div>
          <div className="flex flex-row space-x-8 items-center">
            {gearbox.map((item, index) => (
              <div key={index} className="items-center">
                <Checkbox
                  isRounded={true}
                  checked={store?.drivetrain === item.key}
                  onClick={() => {
                    dispatch(setDetails({ ...store, drivetrain: item.key }));
                  }}
                  className="mr-2"
                />
                <Label
                  htmlFor={`brand-${item.key}`}
                  className="text-md text-foreground"
                >
                  {item.gear}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onPrevious} className="mt-4">
          {dict?.previous || "Previous"}
        </Button>
        <Button disabled={isDisabled} onClick={handleNext} className="mt-4">
          {dict?.continue || "Continue"}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default VehicleModification;
