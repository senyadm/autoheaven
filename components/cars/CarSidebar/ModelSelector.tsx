import { SetStateAction, useMemo, useState } from "react";
import { FiltersDictionary } from "../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "../../ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Label } from "../../ui/label";
import { TrashIcon, PlusCircle, ChevronRight } from "lucide-react";
import { Make, Model, MakeModelById } from "../../../src/shared/model/models";
import { useSearchParams } from "next/navigation";
import { Filter } from "../../../src/shared/model/params";
import { parseModels, stringifyModels } from "../../../src/shared/utils/models";
import { MultiSelect } from "../../shared/MultiSelect";
import { useRouter } from "next/navigation";
import { getCarModelsById } from "../../../src/shared/api/cars";

const userWarningsDefault = {
  exists: {
    warningText: "You ve already selected this make",
    show: false,
  },
  maximumFilters: {
    warningText: "You cannot select more than 5 car makes",
    show: false,
  },
};
type modelType = {
  name: string;
  checked: boolean;
};
type makesWithModelsData = {
  make: string;
  checkedAll: boolean;
  models: modelType[];
};

interface ModelSelectorProps {
  pageText: FiltersDictionary;
  carModels: Record<string, Make>;
  offerNumber: number;
  setFilterValue?: (id: keyof Filter, value: string) => void;
  onOfferClick: () => void | null;
}

const ModelSelector = ({
  pageText,
  carModels,
  offerNumber,
  setFilterValue,
  onOfferClick,
}: ModelSelectorProps) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  function getInitialSelected() {
    const rawParamFilters = Object.fromEntries(
      searchParams.entries()
    ) as Filter;
    if (rawParamFilters.models) {
      return parseModels(rawParamFilters.models, getCarModelsById(carModels));
    }
    return {};
  }
  const [selected, setSelected] = useState<Record<string, Model[]>>(
    getInitialSelected()
  );

  const carModelsById = useMemo(
    () =>
      Object.entries(carModels).reduce((makesAcc, [makeName, make]) => {
        const models = make.models.reduce(
          (modelsAcc, m) => ({
            ...modelsAcc,
            [m.id]: {
              name: m.name,
            },
          }),
          {} as Record<number, { name: string }>
        );

        makesAcc[make.id] = {
          name: makeName,
          models: models,
        };
        return makesAcc;
      }, {} as MakeModelById),
    [carModels]
  );

  function setSelectedAndRedirect(
    newMakes: SetStateAction<Record<string, Model[]>>
  ) {
    // prepare params string
    setSelected((prevMakes) => {
      // Update filterMakes with the newMakes
      const updatedMakes =
        typeof newMakes === "function" ? newMakes(prevMakes) : newMakes;
      // Prepare params string using the updated filterMakes
      const modelParamsStr = stringifyModels(updatedMakes, carModels);
      const newParams = new URLSearchParams(searchParams.toString());
      if (modelParamsStr) {
        newParams.set("models", modelParamsStr);
      }

      push(`cars?${newParams.toString()}`);
      // const newFilterMakes = { ...carModels, ...parsedModels };
      // Return the updated filterMakes
      return updatedMakes;
    });
  }
  const [userWarnings, setUserWarnings] = useState(userWarningsDefault);

  const handleDelete = (brand: string) => {
    setSelectedAndRedirect((prev) => {
      const newSelected = { ...prev };
      delete newSelected[brand];
      return newSelected;
    });
  };
  const handleBrandDropdown = (make: string) => {
    setSelectedAndRedirect((prev) => ({
      ...prev,
      [make]: [],
    }));
  };

  const allModels: Model = {
    id: -1,
    name: "All models",
  };

  return (
    <div>
      <div>
        <h2 className="text-l font-semibold mt-2 mb-2">
          {pageText?.makeAndModel || "Model"}
        </h2>
      </div>
      {Object.entries(selected).map(([make, models]) => (
        <div className="flex flex-col" key={"selected" + make}>
          <div className="flex  items-center">
            <Label className="text-[#344054] text-sm font-medium">{make}</Label>
            <Button
              onClick={() => handleDelete?.(make)}
              className="bg-primary-foreground p-2 rounded hover:bg-gray-200 transition duration-150 shadow-none"
            >
              <TrashIcon height={16} width={16} className="text-red-500" />
            </Button>
          </div>

          <MultiSelect
            placeholder="Select"
            label={make}
            make={make}
            data={[allModels, ...carModels[make].models]}
            selected={selected}
            setSelected={setSelectedAndRedirect}
          />
        </div>
      ))}

      <div className="flex flex-row">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex-2 bg-secondary  hover:bg-gray-300 text-secondary-foreground mr-4">
            <Label className="flex items-center space-x-2 text-sm cursor-pointer p-2">
              <PlusCircle size={14} />

              <span
                className={
                  userWarnings.exists.show || userWarnings.maximumFilters.show
                    ? "text-red-500"
                    : ""
                }
              >
                Add more makes
              </span>
            </Label>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 h-[200px] overflow-y-auto">
            <DropdownMenuGroup>
              {carModels &&
                Object.keys(carModels)
                  .filter((make) => !Object.keys(selected).includes(make))
                  .map((make, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="flex items-center space-x-2 my-2 pl-4 text-foreground"
                      onClick={() => handleBrandDropdown(make)}
                    >
                      <label className="text-l font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {make}
                      </label>
                    </DropdownMenuItem>
                  ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="flex-1" onClick={onOfferClick}>
          <Label className="text-sm"> {offerNumber} offers </Label>
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
};

export default ModelSelector;
