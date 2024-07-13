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
import { TruckMake } from "../model/truck";
import { BusMake } from "../model/bus";
import { useSearchParams } from "next/navigation";
import { Make } from "../model/vehicle";
import { findMakeById } from "../lib/search";

interface MakeSelectProps {
  makes: Make[];
  onChange: (key: keyof Filter, value: string) => void;
  filters: Filter;
}

const MakeSelect = ({ filters, makes, onChange }: MakeSelectProps) => {
  return (
    makes && (
      <>
        <Label htmlFor="filter1" className="font-bold">
          Make
        </Label>
        <Select
          onValueChange={(selectorValue) => {
            const makeName = findMakeById(makes, selectorValue);
            console.log("🚀 ~ makeName:", makeName);
            onChange("make", makeName);
            // handleSelectorChange("make_id", selectorValue);
          }}
        >
          <SelectTrigger className="mb-2">
            {findMakeById(makes, filters.make_id) || "Select Make"}
          </SelectTrigger>
          <SelectContent>
            {[
              {
                id: "",
                make_name: "All",
              },
              ...makes,
            ].map((item, index: number) => (
              <SelectItem key={index} value={item.id}>
                {item.make_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    )
  );
};

export default MakeSelect;
