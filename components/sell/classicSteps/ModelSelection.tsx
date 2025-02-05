import {
  ModelName,
  setModel,
} from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
import { useAppStore } from '@/app/GlobalRedux/store';
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
import { searchModels } from "../../../src/entities/vehicle";

const ModelSelection = ({
  onNext,
  onPrevious,
  staticVehicleData,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const dict = useAppSelector((state) => state?.pageData.dict?.sell.classic);
  const { models } = staticVehicleData;
  const [search, setSearch] = useState<string>("");

  const [store, dispatch] = useAppStore((state) => state?.createCarProgress);
  const [make] = useAppStore((state) => state?.createCarProgress?.make);

  const sortedModelsWithHeadings = useMemo(() => {
    if (!make) return {};
    const modelNames: string[] = models[make]?.models.map((m) => m.name);
    const grouped = Object.groupBy(modelNames, (model) =>
      model[0].toUpperCase()
    );
    return grouped;
  }, [make, models]);

  const filteredModels = useMemo(() => {
    const lettersAndModels = Object.entries(
      searchModels(search, sortedModelsWithHeadings)
    );
    lettersAndModels.sort(([a], [b]) => a.localeCompare(b));
    return lettersAndModels;
  }, [search, sortedModelsWithHeadings]);

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
        {filteredModels.map(([letter, modelsArr]) => (
          <div key={letter} className="break-inside-avoid mb-4">
            <Label className="text-xl font-bold text-primary">{letter}</Label>
            {modelsArr?.map((model, index) => (
              <>
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
          disabled={!store?.make}
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
