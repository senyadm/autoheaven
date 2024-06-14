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
type Type = MotoType | BusMake | TruckMake;
interface TypeSelectProps {
  types: Type[];
  handleSelectorChange: (key: keyof Filter, value: string) => void;
  filters;
  carType: VehicleType;
}

const typeLabel = {
  [VehicleType.Car]: "Passenger Car",
  [VehicleType.Bus]: "Bus",
  [VehicleType.Moto]: "Motorcycle",
  [VehicleType.Truck]: "Truck",
};

const TypeSelect = ({
  types,
  handleSelectorChange,
  filters,
  carType,
}: TypeSelectProps) => {
  const type = carType;
  // const [typeName, setTypeName] = React.useState<string | undefined>(
  //   findTypeById(searchParams.get("type_id"))
  // );
  // console.log("🚀 ~ TypeSelect ~ typeName:", typeName);

  function findTypeById(id: string) {
    const foundType = types.find((type) => type.id === id);
    if (!foundType) return undefined;
    return foundType[typePropertyName[type]];
  }
  return (
    types && (
      <>
        <Label htmlFor="filter1" className="font-bold">
          {typeLabel[type]} Type
        </Label>
        <Select
          onValueChange={(selectorValue) => {
            handleSelectorChange("type_id", selectorValue);
            // setTypeName(findTypeById(selectorValue));
          }}
        >
          <SelectTrigger className="mb-2">
            {findTypeById(filters.type_id) || "Select Type"}
          </SelectTrigger>
          <SelectContent>
            {[
              {
                id: "",
                [typePropertyName[type]]: "All",
              },
              ...types,
            ].map((item, index: number) => (
              <SelectItem key={index} value={item.id}>
                {item[typePropertyName[type]]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    )
  );
};

export default TypeSelect;
