import { setModel } from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
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

const ModelSelection = ({
  onNext,
  onPrevious,
  dict,
}: {
  onNext: () => void;
  onPrevious: () => void;
  dict: SellClassicTranslations | null;
}) => {
  const [search, setSearch] = useState<string>("");

  const [store, dispatch] = useAppStore((state) => state?.createCarProgress);
  const carType = useAppSelector((state) => state?.createCarProgress?.carType);

  const sortedModelsWithHeadings = useMemo(() => {
    const modelNames =
      carType === "Passenger Car"
        ? store?.models?.models?.map((model) => model.name)
        : store?.models;

    if (!modelNames || !modelNames?.length) return [];

    const sortedModels: string[] = [...modelNames].sort();
    let lastLetter = "";
    let groupedModels: string[][] = [];

    sortedModels.forEach((model) => {
      if (!model[0]) {
        console.error("Model name is empty");

        return;
      }

      const firstLetter = model[0].toUpperCase();
      if (firstLetter !== lastLetter) {
        groupedModels.push([firstLetter]);
        lastLetter = firstLetter;
      }
      groupedModels[groupedModels.length - 1].push(model);
    });
    if (search) {
      // Filter the groupedBrands based on the search term
      groupedModels = groupedModels.filter((grouped) =>
        grouped.some((model) =>
          model.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    console.log(groupedModels);
    return groupedModels;
  }, [carType, store?.models, search]);
  console.log(
    "🚀 ~ sortedModelsWithHeadings ~ sortedModelsWithHeadings:",
    sortedModelsWithHeadings
  );

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
      <CardContent
        className="border shadow-md border-rounded w-full p-8 column-container"
      >
        {sortedModelsWithHeadings.map((group, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            {group.map((model, index) => (
              <>
                {!index ? (
                  <Label className="text-xl font-bold text-primary">
                    {group[0]}
                  </Label>
                ) : (
                  <div key={model} className="my-1">
                    <Checkbox
                      isRounded={true}
                      id={`model-${model}`}
                      name="model"
                      checked={store?.model === model}
                      onClick={() => dispatch(setModel(model))}
                      className="mr-2"
                    />
                    <label htmlFor={`model-${model}`}>{model}</label>
                  </div>
                )}
              </>
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
          disabled={!store?.brand}
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

export default ModelSelection;
