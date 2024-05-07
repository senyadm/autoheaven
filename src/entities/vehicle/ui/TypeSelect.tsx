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
type Type = MotoType | BusMake | TruckMake;
interface TypeSelectProps {
  type: VehicleType;
  types: Type[];
  handleSelectorChange: (key: keyof Filter, value: string) => void;
  filters;
}

const typeLabel = {
  [VehicleType.Car]: "Passenger Car",
  [VehicleType.Bus]: "Bus",
  [VehicleType.Moto]: "Motorcycle",
  [VehicleType.Truck]: "Truck",
};
const typePropertyName = {
  [VehicleType.Car]: "car_type",
  [VehicleType.Bus]: "bus_type",
  [VehicleType.Moto]: "moto_type",
  [VehicleType.Truck]: "truck_type",
};

const TypeSelect = ({
  types,
  handleSelectorChange,
  filters,
}: TypeSelectProps) => {
  const type = filters.type;
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
            {types.map((item, index: number) => (
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
