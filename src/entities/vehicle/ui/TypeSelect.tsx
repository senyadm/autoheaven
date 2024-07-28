import React from "react";
import { MotoMake, MotoType } from "../model/moto";
import { Label } from "../../../../components/ui/label";
import { Filter, VehicleType } from "../../../shared/model/params";
import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectItem,
} from "../../../../components/ui/select";
import { BusMake } from "../model/bus";
import { TruckMake } from "../model/truck";
import { useSearchParams } from "next/navigation";
import { typePropertyName } from "../model/vehicle";
import { useAppSelector } from '@/app/GlobalRedux/store';
type Type = MotoType | BusMake | TruckMake;
interface TypeSelectProps {
  types: Type[];
  handleSelectorChange: (key: keyof Filter, value: string) => void;
  filters;
  carType: VehicleType;
}

const textEn = {
  [VehicleType.Car]: "Passenger Car",
  [VehicleType.Bus]: "Bus",
  [VehicleType.Moto]: "Motorcycle",
  [VehicleType.Truck]: "Truck",
};

const TypeSelect = ({
  types,
  handleSelectorChange,
  filters,
}: TypeSelectProps) => {
  const vehicleType = filters.vehicleType;
  const text = useAppSelector((state) => state.pageData.dict?.shared?.vehicleType);
  function findTypeById(id: string) {
    const foundType = types.find((type) => type.id === id);
    if (!foundType) return undefined;
    return foundType[typePropertyName[vehicleType]];
  }
  return (
    types && (
      <div className="w-full">
        <Label htmlFor="filter1" className="font-bold">
        {text ? text[vehicleType] : textEn[vehicleType]} Type
        </Label>
        <Select
          onValueChange={(selectorValue) => {
            handleSelectorChange("type_id", selectorValue);
            // setTypeName(findTypeById(selectorValue));
          }}
        >
          <SelectTrigger>
            {findTypeById(filters.type_id) || "Select Type"}
          </SelectTrigger>
          <SelectContent>
            {[
              {
                id: "",
                [typePropertyName[vehicleType]]: "All",
              },
              ...types,
            ].map((item, index: number) => (
              <SelectItem key={index} value={item.id}>
                {item[typePropertyName[vehicleType]]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  );
};

export default TypeSelect;
