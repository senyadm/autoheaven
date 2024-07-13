import Car from "@/public/icons/car.svg";
import Bus from "@/public/icons/CityBus.svg";
import Truck from "@/public/icons/truck.svg";
import Motorcycle from "@/public/icons/Bike.svg";
import { Filter, VehicleType } from "../../../entities/filters";
import { vehicleTypes } from "../../../entities/vehicle";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../shared/utils/cn";

const typeToIcon = {
  [VehicleType.Car]: Car,
  [VehicleType.Bus]: Bus,
  [VehicleType.Truck]: Truck,
  [VehicleType.Moto]: Motorcycle,
};

const typeButtons = vehicleTypes.map((type) => ({
  ...type,
  icon: typeToIcon[type.value],
}));

interface VehicleTypeTabButtonsProps {
  onTabClick: (id: keyof Filter, selectorValue: string) => void;
  currentTab?: VehicleType;
}

const VehicleTypeTabButtons = ({
  onTabClick,
  currentTab = VehicleType.Car,
}: VehicleTypeTabButtonsProps) => {
  return (
    <div className="flex bg-muted">
      {typeButtons.map((typeButton) => (
        <Button
          onClick={() => onTabClick("vehicleType", typeButton.value)}
          className={cn(
            "flex items-center w-full items-center space-x-1  m-1 hover:bg-white",
            currentTab === typeButton.value && "bg-white"
          )}
          key={typeButton.value}
          variant="ghost"
        >
          <h3>{typeButton.label}</h3>

          <typeButton.icon />
        </Button>
      ))}
    </div>
  );
};

export default VehicleTypeTabButtons;
