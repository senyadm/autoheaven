import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, SearchIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@/app/GlobalRedux/useStore";
interface VehicleCreateParams {
  vehicleType: string;
  make: string;
  model: string;
  year: number;
}
import {
  setBrand,
  setModels,
} from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
import { InputField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SellClassicTranslations } from "@/types";
import { VehicleType } from "../../../src/shared/model/params";
import VehicleMakeCheckbox, {
  searchModels,
} from "../../../src/entities/vehicle";
import { useMake } from "../../../src/entities/vehicle";

function getMakesByCarType(
  carType: string,
  makes: string[] | { make_name: string }[]
): string[] {
  switch (carType) {
    case VehicleType.Car:
      return Object.keys(makes || {});
    case VehicleType.Moto:
      return makes?.map((item) => item.make_name);
    case VehicleType.Bus:
      return makes?.map((item) => item.make_name);
    case VehicleType.Truck:
      return makes?.map((item) => item.make_name);
    default:
      return Object.keys(makes || {});
  }
}

const MakeSelection = ({
  onNext,
  onPrevious,
  dict,
  staticVehicleData,
}: {
  onNext: () => void;
  onPrevious: () => void;
  dict: SellClassicTranslations | null;
}) => {
  const { makes, models } = staticVehicleData;
  const [search, setSearch] = useState<string>("");
  const { isMakeChosen } = useMake();
  const [carType] = useAppStore((state) => state?.createCarProgress?.carType);
  const isCar = carType === VehicleType.Car;
  const sortedModelsWithHeadings = useMemo(() => {
      if (!makes) return null;

    // const makeNames = getMakesByCarType(carType, makes || models);
    const grouped = isCar
      ? Object.groupBy(Object.keys(models), (make) => make[0].toUpperCase())
      : Object.groupBy(makes, (make) => make.make_name[0].toUpperCase());
    return grouped;
  }, [isCar, makes, models]);
  const filteredModels = useMemo(() => {
    if (!sortedModelsWithHeadings) return null;
    const lettersAndModels = Object.entries(
      // searchModels(search, sortedModelsWithHeadings)
      sortedModelsWithHeadings
    );
    lettersAndModels.sort(([a], [b]) => a.localeCompare(b));
    return lettersAndModels;
  }, [sortedModelsWithHeadings]);

  const [store, dispatch] = useAppStore((state) => state?.createCarProgress);

  const handleMake = (make: string) => {
    if (!make) return;

    dispatch(setBrand(make));
  };

  return (
    <Card className="w-full h-full mx-auto bg-white border-none shadow-none">
      <CardHeader>
        <div className="flex items-center border rounded-md pl-2 h-10 w-full">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <InputField
            className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md text-muted-foreground"
            placeholder={dict?.brand || "Search a make"}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </CardHeader>
      <CardContent className="border shadow-md border-rounded w-full p-4 column-container">
        {filteredModels?.map(([letter, modelsArr]) => (
          <div key={letter} className="break-inside-avoid mb-4">
            <Label className="text-xl font-bold text-primary">{letter}</Label>
            {modelsArr?.map((make, index) => (
              <VehicleMakeCheckbox key={index} make={make} />
            ))}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={onPrevious}
          className="mt-4 bg-white text-primary border-primary"
        >
          {dict?.previous || "Previous"}
        </Button>
        <Button
          disabled={!isMakeChosen}
          onClick={() => onNext()}
          className="mt-4 bg-primary text-white disabled:opacity-50"
        >
          {dict?.continue || "Continue"}
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MakeSelection;
