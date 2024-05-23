import {
  ModelName,
  setModel,
  setTypeId,
} from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { SellClassicTranslations } from "@/types";
import { ChevronRight, SearchIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../../app/GlobalRedux/store";
import { VehicleType } from "../../../src/shared/model/params";
import { CarType, searchTypes } from "../../../src/entities/vehicle";

interface BodyTypeSelectionProps {
  onNext: () => void;
  onPrevious: () => void;
  dict: SellClassicTranslations | null;
  types: CarType[];
}

const BodyTypeSelection = ({
  onNext,
  onPrevious,
  dict,
  types,
}: BodyTypeSelectionProps) => {
  const carType = useAppSelector((state) => state?.createCarProgress?.carType);
  const [search, setSearch] = useState<string>("");

  const [store, dispatch] = useAppStore((state) => state?.createCarProgress);

  const filteredTypes = useMemo(() => {
    return searchTypes(search, types);
  }, [search, types]);

  return (
    <Card className="w-full h-full mx-auto bg-white border-none shadow-none">
      <CardHeader>
        <div className="flex items-center border rounded-md pl-2 h-10 w-full">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <InputField
            className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md text-muted-foreground"
            placeholder={dict?.model || "Search a model"}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </CardHeader>
      <CardContent className="border shadow-md border-rounded w-full p-8 column-container">
        {filteredTypes.map((type, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <div key={type.car_type} className="my-1">
              <Checkbox
                isRounded={true}
                id={`type-${type.car_type}`}
                name="type"
                checked={store?.type_id === type.id}
                onClick={() => dispatch(setTypeId(type.id))}
                className="mr-2"
              />
              <label htmlFor={`type-${type.car_type}`}>{type.car_type}</label>
            </div>
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
          disabled={!store?.type_id}
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

export default BodyTypeSelection;
