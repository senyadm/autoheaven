"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Label } from "../../../../components/ui/label";
import { Select, SelectTrigger } from "../../../../components/ui/select";
import { VirtualizedList } from "../../../../components/landing/filterComponents/VirtualizedList";
import { Filter } from "../../filters";

interface ModelSelectProps {
  models: any;
  filtersState: [Filter, (filter: Filter) => void];
  pageText?: any;
}

const ModelSelect = ({
  models,
  filtersState: [filters, onChange],
  pageText,
}: ModelSelectProps) => {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const toggleBrandsOpen = useCallback(() => {
    setBrandsOpen((prevState) => !prevState);
  }, []);

  const handleModelClick = useCallback(
    (make: string, model: string) => {
      const newFilters = { ...filters, make, model };
      onChange(newFilters as Filter);
    },
    [filters, onChange]
  );

  const handleBrandClick = useCallback(
    (make: string) => {
      const newFilters = { ...filters, make, model: undefined };
      onChange(newFilters as Filter);
    },
    [filters, onChange]
  );
  const makeAndModel = useMemo(() => {
    if (filters.make && filters.model) {
      return `${filters.make} - ${filters.model}`;
    } else if (filters.make) {
      return filters.make;
    } else {
      return "Choose a model";
    }
  }, [filters.make, filters.model]);
  return (
    models && (
      <div className="w-full relative z-10">
        {/* <div className="flex items-center space-x-2">
          <Label htmlFor="filter1">{pageText?.brandAndModel || "Model"}</Label>
        </div> */}
        <Label htmlFor="filter1" className="font-bold">
          {pageText?.brandAndModel || "Model"}
        </Label>

        <Select
          open={brandsOpen}
          onValueChange={(selectorValue) => {
            // handleSelectorChange("cars", "brandAndModel", selectorValue);
            toggleBrandsOpen();
          }}
          value={makeAndModel}
        >
          <SelectTrigger onClick={toggleBrandsOpen} currentValue={makeAndModel}>
            {makeAndModel || "Select a brand..."}
          </SelectTrigger>
          <VirtualizedList
            // dict={dict}
            hidden={!brandsOpen}
            toggleBrands={toggleBrandsOpen}
            entries={Object.entries(models)}
            filter={filters}
            // handleSelectorChange={handleSelectorChange}
            handleBrandClick={handleBrandClick}
            handleModelClick={handleModelClick}
          />
        </Select>
      </div>
    )
  );
};

export default ModelSelect;
