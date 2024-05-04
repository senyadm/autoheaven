import { Filter } from "../../src/shared/model/params";
import { Trucks, Busses, bodyTypes } from "../landing/types";
import { Label } from "../ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

interface CarBodyTypeProps {
  vehicleType: string | undefined;
  currentVehicleBody: string | undefined;
  handleSelectorChange: (key: keyof Filter, value: string) => void;
}
const CarBodyType = ({
  vehicleType,
  currentVehicleBody,
  handleSelectorChange,
}: CarBodyTypeProps) => {
  switch (vehicleType) {
    case "Trucks":
      return (
        <>
          <Label htmlFor="filter1" className="font-bold">
            Body Type
          </Label>
          <Select
            onValueChange={(selectorValue) =>
              handleSelectorChange("body_type", selectorValue)
            }
          >
            <SelectTrigger className="mb-2" currentValue={currentVehicleBody}>
              Type
            </SelectTrigger>
            <SelectContent>
              {Trucks.map((item: string, index: number) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      );
    case "Busses":
      return (
        <>
          <Label htmlFor="filter1" className="font-bold">
            Body Type
          </Label>
          <Select
            onValueChange={(selectorValue) =>
              handleSelectorChange("body_type", selectorValue)
            }
          >
            <SelectTrigger className="mb-2" currentValue={currentVehicleBody}>
              Type
            </SelectTrigger>
            <SelectContent>
              {Busses.map((item: string, index: number) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      );
    default:
      return (
        <>
          <Label htmlFor="filter1" className="font-bold">
            Category
          </Label>
          <Select
            onValueChange={(selectorValue) =>
              handleSelectorChange("body_type", selectorValue)
            }
          >
            <SelectTrigger className="mb-2" currentValue={currentVehicleBody}>
              Choose Category
            </SelectTrigger>
            <SelectContent>
              {bodyTypes.map((item: string, index: number) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      );
  }
};

export default CarBodyType;
