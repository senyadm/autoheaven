import { setDetails } from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import React, { useEffect, useMemo, useState } from "react";
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
import { Palette } from "lucide-react";
import countryList from "react-select-country-list";
import CountryFlag from "react-country-flag";
import { VehicleType } from "../../../interfaces/shared/vehicle";
import { useAppSelector } from "../../../app/GlobalRedux/store";

const carColors: string[] = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Blue",
  "Red",
  "Brown/Beige",
  "Green",
  "Yellow",
  "Gold",
  "Orange",
  "Purple",
];

interface CountrySelectorProps {
  onCountrySelect: (countryCode: string) => void;
}

const CountrySelector = ({ onCountrySelect }: CountrySelectorProps) => {
  const [value, setValue] = useState("");
  const options = countryList().getData();

  const changeHandler = (value: any) => {
    onCountrySelect(value);
    setValue(value);
  };

  return (
    <Select
      name="country"
      value={value}
      onValueChange={(selectorValue) => changeHandler(selectorValue)}
    >
      <SelectTrigger currentValue={value}>Select country...</SelectTrigger>
      <SelectContent>
        {options.map((type) => (
          <SelectItem key={type.value} value={type.label}>
            <CountryFlag
              countryCode={type.value}
              svg
              style={{ width: "2em", height: "2em", marginRight: "10px" }}
            />
            <span>{type.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const VehicleSpecs = ({
  onNext,
  onPrevious,
  dict,
}: {
  onPrevious: () => void;
  onNext: (mode?: string) => void;
  dict: SellClassicTranslations | null;
}) => {
  const [store, dispatch] = useAppStore(
    (state) => state?.createCarProgress.details
  );

  const [fuelConsumption, setFuelConsumption] = useState(0);
  const carType = useAppSelector((state) => state?.createCarProgress?.carType);

  useEffect(() => {
    if (store?.fuel_consumption) {
      const fuel = parseFloat(store?.fuel_consumption.toString());

      dispatch(setDetails({ ...store, fuel_consumption: fuel }));
    }
  }, [store?.fuel_consumption]);

  const handleNext = () => {
    dispatch(setDetails(store));
    onNext("final");
  };

  const handleCountrySelect = (countryCode: string) => {
    dispatch(setDetails({ ...store, country_origin: countryCode }));
  };

  const isDisabled = useMemo(() => {
    return (
      !store?.fueltype || !store?.year || !store?.drivetrain || !store?.gearbox
    );
  }, [store]);

  return (
    <Card className="w-full mx-auto bg-white border-none shadow-none">
      <CardContent className="border shadow-md rounded w-full p-8 space-y-6">
        {/* <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter2">
              Vehicle ID
            </Label>
            <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
          </div>
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="number"
            id="id"
            name="vehicleID"
            placeholder="ID"
            value={store?.vehicle_id}
            onChange={(e) =>
              dispatch(setDetails({ ...store, vehicle_id: e.target.value }))
            }
          />
        </div> */}
        {/* <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter3">
              Origin
            </Label>
            <SvgIcon filepath="/icons/fuel.svg" alt="" width={16} height={16} />
          </div>

          <CountrySelector onCountrySelect={handleCountrySelect} />
        </div> */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter2">
              Cubic Capacity
            </Label>
            <Label className="text-sm text-foreground">m^3</Label>
          </div>
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            id="year"
            defaultValue={new Date().getFullYear()}
            name="capacity"
            placeholder="Capacity"
            value={store?.cubic_capacity || ""}
            onChange={(e) => {
              const value = e.target.value;
              dispatch(setDetails({ ...store, cubic_capacity: value }));
            }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter2">
              Seats
            </Label>
          </div>
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            id="fuel"
            name="Fuel"
            value={store?.seats || ""}
            onChange={(e) => {
              const value = e.target.value;
              dispatch(
                setDetails({
                  ...store,
                  seats: value,
                })
              );
            }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-lg text-foreground" htmlFor="filter3">
              Color
            </Label>
            <Palette width={16} height={16} />
          </div>
          <Select
            name="color"
            value={store?.color}
            onValueChange={(selectorValue) =>
              dispatch(setDetails({ ...store, color: selectorValue }))
            }
          >
            <SelectTrigger currentValue={store?.color}>
              {"Select color..."}
            </SelectTrigger>
            <SelectContent>
              {carColors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {carType != VehicleType.moto && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label className="text-lg text-foreground" htmlFor="filter3">
                Interior
              </Label>
              <Palette
                strokeWidth={3}
                absoluteStrokeWidth
                width={16}
                height={16}
              />
            </div>
            <Select
              name="interior"
              value={store?.interior_color}
              onValueChange={(selectorValue) =>
                dispatch(
                  setDetails({ ...store, interior_color: selectorValue })
                )
              }
            >
              <SelectTrigger currentValue={store?.interior_color}>
                {"Select Interior..."}
              </SelectTrigger>
              <SelectContent>
                {carColors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
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
export default VehicleSpecs;
