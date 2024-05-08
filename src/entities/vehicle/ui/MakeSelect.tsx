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

type Make = MotoMake | BusMake | TruckMake;
interface MakeSelectProps {
  makes: Make[];
  handleSelectorChange: (key: keyof Filter, value: string) => void;
  filters: Filter;
}

const MakeSelect = ({
  filters,
  makes,
  handleSelectorChange,
}: MakeSelectProps) => {
  const searchParams = useSearchParams();

  function findMakeById(id: string) {
    return makes.find((make) => make.id === id)?.make_name;
  }

  return (
    makes && (
      <>
        <Label htmlFor="filter1" className="font-bold">
          Make
        </Label>
        <Select
          onValueChange={(selectorValue) => {
            handleSelectorChange("make_id", selectorValue);
          }}
        >
          <SelectTrigger className="mb-2">
            {findMakeById(filters.make_id) || "Select Make"}
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
