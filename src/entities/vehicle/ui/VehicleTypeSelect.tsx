"use client";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import { VehicleType } from "../../../shared/model/params";
import { vehicleTypes } from "../../../entities/vehicle/model/vehicle";
import ResetButton from "../../../widgets/car-filters/ui/ResetButton";

const typeLabel = {
  [VehicleType.Car]: "Passenger Car",
  [VehicleType.Moto]: "Motorcycle",
  [VehicleType.Truck]: "Truck",
  [VehicleType.Bus]: "Bus",
};

const VehicleTypeSelect = ({ onChange, vehicleType }) => {
  const handleReset = () => {
    onChange({}, {isReset: true});
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="filter1" className="font-bold">
          Vehicle
        </Label>
        <ResetButton handleReset={handleReset} />
      </div>

      <Select
        value={vehicleType}
        onValueChange={(selectorValue: VehicleType) => {
          onChange({
            vehicleType: selectorValue as VehicleType,
          });
        }}
      >
        <SelectTrigger className="mb-2" currentValue={typeLabel[vehicleType]}>
          Choose A Vehicle Type
        </SelectTrigger>
        <SelectContent>
          {vehicleTypes.map((item, index: number) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VehicleTypeSelect;
