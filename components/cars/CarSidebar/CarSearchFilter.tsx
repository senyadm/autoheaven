/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createRef, useRef } from "react";
import RangeSlider, { RangeSliderRef } from "@/components/landing/RangeSlider";

import { useAppSelector } from '@/app/GlobalRedux/store';
import usePremiumStatus from "@/src/shared/hooks/usePremiumStatus";
import { Filter } from "../../../src/shared/model/params";
import { cn } from "../../../src/shared/utils/cn";

interface CarSearchFilterProps {
  handleSliderChange: (
    ids: [keyof Filter, keyof Filter],
    values: [number, number]
  ) => void;
  filters: Filter;
  orientation?: "vertical" | "horizontal";
}
const CarSearchFilter = ({
  handleSliderChange,
  filters,
  orientation = "vertical",
}: CarSearchFilterProps) => {
  const sliderRefs = useRef([
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
  ]);
  const { premiumThreshold, isPremium } = usePremiumStatus();
  const variablePriceMin = isPremium ? premiumThreshold : 1000;
  const dict = useAppSelector((state) => state.pageData.dict?.filters);
  return (
    <div
      className={cn(
        "w-full mb-6",
        orientation === "horizontal"
          ? "lg:flex lg:space-x-4 items-center justify-between"
          : "mt-4"
      )}
    >
      <div className="mt-8">
        <RangeSlider
          value={[filters.price_min || 1000, filters.price_max || 1000000]}
          fixedLowerText={`${variablePriceMin} €`}
          fixedUpperText="1000000 €"
          ref={sliderRefs.current[0]}
          filename="banknote.svg"
          id="price"
          min={variablePriceMin}
          max={1000000}
          step={1000}
          label={dict?.price || "Price"}
          onValueChange={(values) =>
            handleSliderChange(["price_min", "price_max"], values)
          }
        />
      </div>
      <div className="mt-7">
        <RangeSlider
          ref={sliderRefs.current[1]}
          value={[filters.mileage_min || 0, filters.mileage_max || 500000]}
          fixedLowerText="0 km"
          fixedUpperText="500000 km"
          filename="milage.svg"
          id="milage"
          min={0}
          max={500000}
          step={10000}
          label={dict?.mileage || "Mileage"}
          onValueChange={(values) =>
            handleSliderChange(["mileage_min", "mileage_max"], values)
          }
        />
      </div>
      <div className="mt-7">
        <RangeSlider
          ref={sliderRefs.current[2]}
          value={[filters.year_min || 1975, filters.year_max || 2023]}
          fixedLowerText="1975"
          fixedUpperText="2023"
          filename="calendar.svg"
          id="year"
          min={1975}
          max={2023}
          step={1}
          label={dict?.year || "Year"}
          onValueChange={(values) =>
            handleSliderChange(["year_min", "year_max"], values)
          }
        />
      </div>
    </div>
  );
};

export default CarSearchFilter;
