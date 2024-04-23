/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronRight, RotateCcw } from "lucide-react";
import SvgIcon from "../../SvgIcon";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import RangeSlider, { RangeSliderRef } from "../RangeSlider";

import { BUS_SUBCATEGORIES, TrucksComponentProps } from "../types";
import { createRef, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const fuelTypes: string[] = [
  "All",
  "Petrol",
  "Gas",
  "Electric",
  "Diesel",
  "Hybrid",
];

export function BusComponent({
  handleSliderChange,
  setSelectedIcon,
  setHoveredIcon,
  selectedIcon,
  hoveredIcon,
  filter,
  lang,
  dict,
  handleSelectorChange,
}: TrucksComponentProps) {
  const [offers, setOffers] = useState<number>(0);

  const router = useRouter();

  const sliderRefs = useRef([
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>(),
    createRef<RangeSliderRef>()
  ]);

  const handleReset = () => {
    handleSliderChange("cars", "price", [1000, 1000000]);
    handleSliderChange("cars", "milage", [0, 500000]);
    handleSliderChange("cars", "year", [1975, 2023]);
    handleSelectorChange("cars", "brandAndModel", "");
    handleSelectorChange("cars", "vehicleBody", "");
    handleSelectorChange("cars", "fuelType", "");
    sliderRefs.current.forEach((ref) => {
      ref.current?.reset();
    });
  }

  const handleNavigate = (e: any) => {
    e.preventDefault();
    router.push(`${lang}/cars`);
  };

  return (
    <Card className="bg-background border-0">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-around gap-6">
          {BUS_SUBCATEGORIES.map((subcategory, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              {" "}
              <button
                onClick={() => setSelectedIcon(index)}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(-1)}
                className={`subcategory-icon w-32 h-11 flex items-center justify-center rounded-md px-2 py-1.5 text-sm transition-transform duration-300 
          ${
            selectedIcon === index
              ? "border-2 border-primary"
              : "border border-border"
          } 
          ${hoveredIcon === index ? "bg-secondary" : "bg-background "}
      `}
              >
                <SvgIcon
                  alt={subcategory.value}
                  filepath={subcategory.icon}
                  width={32}
                  height={32}
                />
              </button>
              <Label className="ml-1.5 text-sm mt-2">{subcategory.label}</Label>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 mt-4 md:mt-0 mb-6">
          <RangeSlider
            ref={sliderRefs.current[0]}
            value={filter.price}
            fixedLowerText="1000 $"
            fixedUpperText="100000 $"
            filename="banknote.svg"
            id="price"
            min={1000}
            max={100000}
            step={1000}
            label="Price"
            onValueChange={(values) =>
              handleSliderChange("busses", "price", values)
            }
          />
          <RangeSlider
            ref={sliderRefs.current[1]}
            value={filter.milage}
            fixedLowerText="0 km"
            fixedUpperText="500000 km"
            filename="milage.svg"
            id="milage"
            min={0}
            max={500000}
            step={10000}
            label="Milage"
            onValueChange={(values) =>
              handleSliderChange("busses", "milage", values)
            }
          />
          <RangeSlider
            ref={sliderRefs.current[2]}
            value={filter.year}
            fixedLowerText="1975"
            fixedUpperText="2023"
            filename="calendar.svg"
            id="year"
            min={1975}
            max={2023}
            step={1}
            label="Year"
            onValueChange={(values) =>
              handleSliderChange("busses", "year", values)
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter1">Brand</Label>
              <SvgIcon
                filepath="icons/tick.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("busses", "brandAndModel", selectorValue)
              }
            >
              <SelectTrigger>Select brand...</SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter2">Model</Label>
              <SvgIcon filepath="icons/car.svg" alt="" width={16} height={16} />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("moto", "vehicleBody", selectorValue)
              }
              value={filter.brandAndModel}
            >
              <SelectTrigger currentValue={filter.vehicleBody}>
                Select body...
              </SelectTrigger>
              <SelectContent>
                {[].map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="filter3">Fuel type</Label>
              <SvgIcon
                filepath="icons/fuel.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("busses", "fuelType", selectorValue)
              }
              value={filter.fuelType}
            >
              <SelectTrigger currentValue={filter.fuelType}>
                Select fuel...
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((item: string, index: number) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid place-items-end">
      <div className="flex flex-row space-x-2">
        <Button variant="secondary" onClick={handleReset}>
          <span className="me-2">{dict?.reset || "Reset"}</span>
          <RotateCcw size={24} />
        </Button>
        <Button onClick={handleNavigate}>
          {offers || 0} {dict?.offers || "offers"}
          <ChevronRight />
        </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
