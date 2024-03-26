import { useState } from "react";
import { FiltersDictionary } from "../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

import { Label } from "../../ui/label";
import { TrashIcon, PlusCircle, ChevronRight } from "lucide-react";

const userWarningsDefault = {
  exists: {
    warningText: "You ve already selected this brand",
    show: false,
  },
  maximumFilters: {
    warningText: "You cannot select more than 5 car brands",
    show: false,
  },
};
type modelType = {
  name: string;
  checked: boolean;
};
type brandsWithModelsData = {
  brand: string;
  checkedAll: boolean;
  models: modelType[];
};

interface ModelSelectorProps {
  pageText: FiltersDictionary;
  carModels: Record<string, string[]>;
}
const ModelSelector = ({
  pageText,
  carModels,
  addModel,
  offerNumber,
}: ModelSelectorProps) => {
  const [filterBrands, setFilterBrands] = useState([]);
  const [userWarnings, setUserWarnings] = useState(userWarningsDefault);
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
    const temp = [...filterBrands];
    temp.splice(index, 1);
    setFilterBrands(temp);
  };
  const handleBrandCheckboxChange = (brand: brandsWithModelsData) => {
    const updatedBrands = filterBrands.map((b) => {
      if (b.brand === brand.brand) {
        return {
          ...b,
          checkedAll: !b.checkedAll,
          models: b.models.map((m) => ({ ...m, checked: !b.checkedAll })),
        };
      }
      return b;
    });
    setFilterBrands(updatedBrands);
  };
  const handleModelCheckboxChange = (
    brand: brandsWithModelsData,
    model: modelType
  ) => {
    const updatedBrands = filterBrands.map((b) => {
      if (b.brand === brand.brand) {
        const updatedModels = b.models.map((m) => {
          if (m.name === model.name) {
            return { ...m, checked: !m.checked };
          }
          return m;
        });
        const areAllModelsChecked = updatedModels.every((m) => m.checked);
        return { ...b, models: updatedModels, checkedAll: areAllModelsChecked };
      }
      return b;
    });
    setFilterBrands(updatedBrands);
    addModel(brand, model);
  };
  const [currentModels, setCurrentModels] = useState<number>(10);
  const showMore = () => {
    setCurrentModels((prev) => prev + 10);
  };
  return (
    <div>
      <div>
        <h2 className="text-l font-semibold mt-2 mb-2">
          {pageText?.brandAndModel || "Model"}
        </h2>
      </div>

      <Accordion type="multiple" className="w-full">
        {filterBrands.map((brand, index) => (
          <div className="flex" key={"accordion" + brand.brand}>
            <AccordionItem
              className=" border-none"
              key={index}
              value={`item-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    className="mr-2"
                    checked={brand.checkedAll}
                    onCheckedChange={() => handleBrandCheckboxChange(brand)}
                  />
                  <AccordionTrigger
                    isSideBar={true}
                    handleDelete={() => handleDelete(index)}
                    index={index}
                    className="p-0 flex flex-grow flex justify-between items-center"
                  >
                    <Label className="text-l text-foreground leading-none ml-2">
                      {brand.brand}
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
                  brand.checkedAll
                    ? "animate-accordion-down"
                    : "animate-accordion-up"
                }`}
              >
                {brand.models
                  .slice(0, currentModels)
                  .map((model, modelIndex) => (
                    <div
                      key={modelIndex}
                      className="flex items-center space-x-2 my-2 pl-4 text-foreground"
                    >
                      <Checkbox
                        id={`${brand.brand}-${model.name}`}
                        checked={model.checked}
                        onCheckedChange={() =>
                          handleModelCheckboxChange(brand, model)
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
                  {brand.models.length > currentModels && (
                    <Label
                      onClick={() => setCurrentModels((prev) => prev + 10)}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      Show More Models
                    </Label>
                  )}

                  {currentModels > brand.models.length && (
                    <Label
                      onClick={() => setCurrentModels(10)}
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
                Add more brands
              </span>
            </Label>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 h-[200px] overflow-y-auto">
            <DropdownMenuGroup>
              {carModels &&
                Object.keys(carModels).map((brand, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center space-x-2 my-2 pl-4 text-foreground"
                    onClick={() => {
                      const newBrands = [...filterBrands];
                      if (newBrands.find((b) => b.brand === brand)) {
                        setExists(true);
                        return;
                      }
                      newBrands.push({
                        brand,
                        checkedAll: false,
                        models: carModels[brand].map((model) => ({
                          name: model,
                          checked: false,
                        })),
                      });
                      if (newBrands.length > 5) {
                        setMaximumFilters(true);
                        return;
                      }
                      setFilterBrands(newBrands);
                    }}
                  >
                    <label className="text-l font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {brand}
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
          You ve already selected this brand
        </span>
      )}
      {userWarnings.maximumFilters.show && (
        <span className="text-xs text-red-500 block transition-opacity">
          You cannot select more than 5 car brands
        </span>
      )}
    </div>
  );
};

export default ModelSelector;
