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
import { ChevronRight } from "lucide-react";
import SvgIcon from "../../SvgIcon";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import RangeSlider from "../RangeSlider";

import { TRUCK_SUBCATEGORIES, TrucksComponentProps } from "../types";

const fuelTypes: string[] = [
  "All",
  "Petrol",
  "Gas",
  "Electric",
  "Diesel",
  "Hybrid",
];

export function TrucksComponent({
  handleSliderChange,
  setSelectedIcon,
  setHoveredIcon,
  selectedIcon,
  hoveredIcon,
  filter,
  handleSelectorChange,
}: TrucksComponentProps) {
  return (
    <Card className="bg-background border-0">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-center align-items-center gap-6">
          {TRUCK_SUBCATEGORIES.map((subcategory, index) => (
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
          ${hoveredIcon === index ? "bg-secondary" : "bg-background"}
      `}
              >
                <SvgIcon
                  filepath={subcategory.icon}
                  alt={subcategory.value}
                  height={32}
                  width={32}
                />
              </button>
              <Label className="ml-1.5 text-sm mt-2">{subcategory.label}</Label>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mt-4 mb-4">
          <RangeSlider
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
              handleSliderChange("trucks", "price", values)
            }
          />
          <RangeSlider
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
              handleSliderChange("trucks", "milage", values)
            }
          />
          <RangeSlider
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
              handleSliderChange("trucks", "year", values)
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              {" "}
              {/* Flex container */}
              <Label htmlFor="filter1">Brand and model</Label>
              <SvgIcon
                filepath="icons/tick.svg"
                alt=""
                width={16}
                height={16}
              />
            </div>
            <Select
              onValueChange={(selectorValue) =>
                handleSelectorChange("trucks", "brandAndModel", selectorValue)
              }
            >
              <SelectTrigger>Select brand...</SelectTrigger>
              <SelectContent>
                {/* Add your SelectItems here */}
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
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
                handleSelectorChange("trucks", "fuelType", selectorValue)
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

        {/* New Sliders */}
      </CardContent>
      <CardFooter className="grid place-items-end">
        <Button>
          100000 offers
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
