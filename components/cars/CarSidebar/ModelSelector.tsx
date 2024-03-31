import { useRef, useState } from "react";
import { FiltersDictionary } from "../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "../../ui/dropdown-menu";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "../../ui/label";
import { TrashIcon, PlusCircle, ChevronRight } from "lucide-react";
import { Make, Model } from "../../../interfaces/cars/models";
import { useSearchParams } from "next/navigation";
import { set } from "zod";
import { useRedirectParams } from "../../../hooks/useRedirectParams";

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
}
interface FilterModel extends Model {
  checked: boolean;
}
interface FilterMake extends Make {
  checked: boolean;
  models: FilterModel[];
  id: number;
}
const ModelSelector = ({
  pageText,
  carModels,
  addModel,
  offerNumber,
}: ModelSelectorProps) => {
  const searchParams = useSearchParams();
  const redirectParams = useRedirectParams();
  const [filterMakes, setFilterMakes] = useState<Record<string, FilterMake>>(
    {}
  );
  const [userWarnings, setUserWarnings] = useState(userWarningsDefault);
  // we count how many models we are showing
  const setMaximumFilters = (val: boolean) =>
    setUserWarnings((prev) => ({
      ...prev,
      maximumFilters: { ...prev.maximumFilters, show: val },
    }));
  const setExists = (val: boolean) =>
    setUserWarnings((prev) => ({
      ...prev,
      exists: { ...prev.exists, show: val },
    }));
  const handleDelete = (index?: number) => {
    if (!index) return;
    const temp = [...filterMakes];
    temp.splice(index, 1);
    setFilterBrands(temp);
  };
  const handleBrandDropdown = (make: string) => {
    // add 10 models
    setFilterMakes((prev) => {
      const newMakes = { ...prev };
      newMakes[make] = {
        ...newMakes[make],
        models: carModels[make].models
          .slice(0, 10)
          .map((m) => ({ ...m, checked: true })),
        checked: true,
      };
      return newMakes;
    });
  };
  const handleBrandCheckboxChange = (make: string) => {
    // if all models are unchecked, check all
    // else uncheck all
    setFilterMakes((prev) => {
      const newMakes = { ...prev };
      newMakes[make] = {
        ...newMakes[make],
        models: newMakes[make].models.map((m) => ({
          ...m,
          checked: !newMakes[make].checked,
        })),
        checked: !newMakes[make].checked,
      };
      return newMakes;
    });
  };

  const handleModelCheckboxChange = (make: string, model: FilterModel) => {
    let noneChecked = true;
    let allChecked = true;
    const newModels = filterMakes[make].models.map((m) => {
      if (m.name === model.name) {
        if (m.checked) noneChecked = false;
        return { ...m, checked: !m.checked };
      }
      if (!m.checked) allChecked = false;
      return m;
    });
    setFilterMakes((prev) => ({
      ...prev,
      [make]: {
        ...prev[make],
        models: newModels,
        checked: newModels.some((m) => m.checked),
      },
    }));
  };
  const showMore = (make) => {
    const shownModelsCount = filterMakes[make].models.length;
    const allModelsCount = carModels[make].models.length;
    setFilterMakes((prev) => {
      const newMakes = { ...prev };
      newMakes[make] = {
        ...newMakes[make],
        models: [
          ...newMakes[make].models,
          ...carModels[make].models
            .slice(shownModelsCount, shownModelsCount + 10)
            .map((m) => ({ ...m, checked: true })),
        ],
      };
      return newMakes;
    });
  };
  const showLess = (make) => {
    setFilterMakes((prev) => {
      const newMakes = { ...prev };
      newMakes[make] = {
        ...newMakes[make],
        models: newMakes[make].models.slice(0, 10),
      };
      return newMakes;
    });
  };

  console.log(filterMakes, "filterMakes");
  return (
    <div>
      <div>
        <h2 className="text-l font-semibold mt-2 mb-2">
          {pageText?.makeAndModel || "Model"}
        </h2>
      </div>

      <Accordion type="multiple" className="w-full">
        {Object.keys(filterMakes).map((make, index) => (
          <div className="flex" key={"accordion" + make}>
            <AccordionItem
              className=" border-none"
              key={index}
              value={`item-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    className="mr-2"
                    checked={filterMakes[make].checked}
                    onCheckedChange={() => handleBrandCheckboxChange(make)}
                  />
                  <AccordionTrigger
                    isSideBar={true}
                    handleDelete={() => handleDelete(index)}
                    index={index}
                    className="p-0 flex flex-grow flex justify-between items-center"
                  >
                    <Label className="text-l text-foreground leading-none ml-2">
                      {make}
                    </Label>
                  </AccordionTrigger>
                </div>
                <Button
                  onClick={() => handleDelete?.(index)}
                  className="bg-primary-foreground p-2 rounded hover:bg-gray-200 transition duration-150 shadow-none"
                >
                  <TrashIcon height={16} width={16} className="text-red-500" />
                </Button>
              </div>
              <AccordionContent
                className={`${
                  filterMakes[make]
                    ? "animate-accordion-down"
                    : "animate-accordion-up"
                }`}
              >
                {filterMakes[make].models.map((model, modelIndex) => (
                  <div
                    key={modelIndex}
                    className="flex items-center space-x-2 my-2 pl-4 text-foreground"
                  >
                    <Checkbox
                      id={`${make}-${model.name}`}
                      checked={model.checked}
                      onCheckedChange={() =>
                        handleModelCheckboxChange(make, model)
                      }
                    />
                    <label className="text-l font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {model.name}
                    </label>
                  </div>
                ))}

                <div
                  className="flex justify-b
                etween items-center"
                >
                  {filterMakes[make].models.length <
                    carModels[make].models.length && (
                    <Label
                      onClick={() => showMore(make)}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      Show More Models
                    </Label>
                  )}

                  {filterMakes[make].models.length > 10 && (
                    <Label
                      onClick={() => showLess(make)}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      Show Less Models
                    </Label>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>

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
                  .filter((make) => !Object.keys(filterMakes).includes(make))
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

        <Button className="flex-1">
          <Label className="text-sm"> {offerNumber} offers </Label>
          <ChevronRight size={14} />
        </Button>
      </div>
      {userWarnings.exists.show && (
        <span className="text-xs text-red-500 block transition-opacity">
          You ve already selected this make
        </span>
      )}
      {userWarnings.maximumFilters.show && (
        <span className="text-xs text-red-500 block transition-opacity">
          You cannot select more than 5 car makes
        </span>
      )}
    </div>
  );
};

export default ModelSelector;
